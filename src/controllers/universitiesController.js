const db = require("../config/supabase");

// Get All Universities
const getUniversities = async (req, res) => {
    try {

        const { data, error } = await db.from("universities").select('*');

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

// Get Single University
const getUniversityById = async (req, res) => {
    try {

        const { university_name } = req.body;

        const { data, error } = await db
            .from("universities")
            .select("*")
            .eq("university_name", university_name)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                message: "University not found"
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
    getUniversities,
    getUniversityById
};