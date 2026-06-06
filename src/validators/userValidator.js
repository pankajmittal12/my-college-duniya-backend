const { z } = require('zod');

const createUserSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name is too long'),

    email: z
        .email('Invalid email address'),

    password_hash: z
        .string()
        .min(8, 'Password must be at least 8 characters'),

    phone_number: z
        .string()
        .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    city: z
        .string()
        .min(2, 'City is required'),

    course: z
        .string()
        .min(3, 'Course name is required')
});

module.exports = {
    createUserSchema
};