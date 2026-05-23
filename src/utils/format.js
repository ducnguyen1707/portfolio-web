// Format Zod validation errors into a readable string for client response
export const formatvalidationError = (error) => {
    if(!error || !error.issues) return  'Validation error';
    if(Array.isArray(error.issues)) return error.issues.map(issue => issue.message).join(', ');
    return JSON.stringify(error);
}