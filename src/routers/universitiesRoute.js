const express = require("express");

const router = express.Router();

const {
    getUniversities,
    getUniversityById
} = require("../controllers/universitiesController");

router.get("/", getUniversities);

router.get("/:university_name", getUniversityById);

module.exports = router;
