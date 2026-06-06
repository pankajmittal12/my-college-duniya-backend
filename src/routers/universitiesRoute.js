const express = require("express");

const router = express.Router();

const {
    getUniversities,
    getUniversityById
} = require("../controllers/universitiesController");

router.get("/", getUniversities);

router.get("/:university_id", getUniversityById);

module.exports = router;
