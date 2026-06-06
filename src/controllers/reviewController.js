const db = require("../config/supabase");

// Get All Reviews
const getReviews = async (req, res) => {
  try {
    const { data, error } = await db
      .from("reviews")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create Review
const createReview = async (req, res) => {
  try {
    const {
      user_email,
      user_university_name,
      rating,
      review_title,
      review_text,
      is_verified,
      likes_count,
    } = req.body;

    const { data, error } = await db
      .from("reviews")
      .insert([
        {
          user_id: await db
            .from("usersData")
            .select("id")
            .eq("email", user_email)
            .single()
            .then((res) => res.data.id),
          user_university_name: await db
            .from("universities")
            .select("university_id")
            .eq("university_name", user_university_name)
            .single()
            .then((res) => res.data.university_id),
          rating,
          review_title,
          review_text,
          is_verified,
          likes_count,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getReviews,
  createReview,
};
