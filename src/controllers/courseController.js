const db = require("../config/supabase");

// Get All Courses
const getCourses = async (req, res) => {
    try {

        const { data, error } = await db
            .from("courses")
            .select("*")
            .order("course_name", {
                ascending: true
            });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get Single Course
const getCourseById = async (req, res) => {
    try {

        const { course_id } = req.params;

        const { data, error } = await db
            .from("courses")
            .select("*")
            .eq("course_id", course_id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getCourses,
    getCourseById
};