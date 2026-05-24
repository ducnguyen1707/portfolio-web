import aj from '../config/arcjet.js';
import logger from '../config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
    try{
        const role = req.user?.role|| "guest";
        let limit;
        let message;
        switch(role){
            case "admin":
                limit=20
                message = "Admin request limit exceeded 20minute";
            break;
            case "user":
                limit=10
                message = "User request limit exceeded 10 minute";
            break;
            case "guest":
                limit=5
                message = "Guest request limit exceeded 5 minute";
            break;
        }
        const client = aj.withRule(slidingWindow({mode: 'LIVE', interval: '1m', max: limit, name: `${role}-rate-limt`}));
        const decision = await client.protect(req);

        if(decision.isDenied() && decision.reason.isBot())
            {
                logger.warn('Bot decteced', {
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    path: req.path,
                });
                return res.status(403).json({error: "Fobbiden", message: "Bot detected. Access denied."});
        };  
        
        if(decision.isDenied() && decision.reason.isShield())
            {
                logger.warn('Shield block request', {
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    path: req.path,
                    method: req.method,
                });
                return res.status(403).json({error: "Fobbiden", message: "This request has been block by security policies."});
        }; 

        if(decision.isDenied() && decision.reason.isRateLimit())
            {
                logger.warn('Rate limit exceeded', {
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    path: req.path,
                });
                return res.status(403).json({error: "Fobbiden", message: "Too many request. Are u try to attck me???"});
        }; 

        next();

    }catch(e){
        console.error("Arcjet Middleware error");
        res.status(500).json({error: "Internal server error", message: "something went wrong with the security middleware"});
    }
}
export default securityMiddleware;