const express = require("express");

const router = express.Router();

const {
    getCourses,
    getCourseById
} = require("../controllers/courseController");

router.get("/courses", getCourses);

router.get("/:course_id", getCourseById);

module.exports = router;