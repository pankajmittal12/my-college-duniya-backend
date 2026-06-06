const { z } = require("zod");

const createReviewSchema = z.object({
    user_email: z
        .string()
        .email('Invalid email address'),

    user_university_name: z
        .string()
        .min(2, "University name must be at least 2 characters")
        .max(100, "University name cannot exceed 100 characters"),

    rating: z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),

    review_title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(150, "Title cannot exceed 150 characters"),

    review_text: z
        .string()
        .min(20, "Review must be at least 20 characters")
        .refine(
            (text) => text.trim().split(/\s+/).length <= 1000,
            {
                message: "Review cannot exceed 1000 words"
            }
        ),

    is_verified: z.boolean().default(false),

    likes_count: z.number().int().min(0).default(0)
});

module.exports = {
    createReviewSchema
};