import { signUpSchema } from '../validations/auth.validation.js';
import { formatvalidationError } from '../utils/format.js';
import logger from '../config/logger.js';
import {createUser} from '../services/auth.services.js';
import {jwttoken} from '../utils/jwt.js';
import {cookies} from '../utils/cookie.js';



// Handle user signup request
// 1. Validate request body using Zod
// 2. If validation fails → return 400 with formatted error
// 3. Extract validated data from request
// 4. (TODO) Check if user already exists in DB
// 5. (TODO) Hash password if provided
// 6. (TODO) Save user to database
// 7. Log signup activity for debugging/monitoring
// 8. Return 201 response with created user data
// 9. Handle errors:
//    - Return 409 if user already exists
//    - Pass other errors to global error handler

    export const signUp = async (req, res, next) => {
        try{
            const validationResult = signUpSchema.safeParse(req.body);

            if(!validationResult.success) {
                return res.status(400).json({
                    error: "Validation error",
                    details: formatvalidationError(validationResult.error)
                });
            }

        const {name, email, password, role } = validationResult.data;

        const user = await createUser({name, email, password, role}) ;// still not done add git and linked

        const token =  jwttoken.sign({id: user.id, email: user.email, role: user.role});

        cookies.set(res, 'token', token);

        logger.info(`Signup request for email: ${email}, name: ${name}, role: ${role}`);
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id, name: user.name, email: user.email, role: user.role
            }
        })

        }catch (e) {
            logger.error('Signup error', e);
            if(e.message === 'user already exists') {
                return res.status(409).json({message: e.message});
        }
        next(e); 
        }
    }   