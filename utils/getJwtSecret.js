import dotenv from 'dotenv';
dotenv.config();

//convert secret into UNIT8ARRAY
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);