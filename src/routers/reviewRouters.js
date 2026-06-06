const express = require("express");
const router = express.Router();

const validate = require("../middleware/reviewValidate");

const {
    createReviewSchema
} = require("../validators/reviewValidator");

const {
    createReview,
    getReviews
} = require("../controllers/reviewController");

router.get("/getReviews", getReviews);

router.post(
    "/createReview",
    validate(createReviewSchema),
    createReview
);

module.exports = router;