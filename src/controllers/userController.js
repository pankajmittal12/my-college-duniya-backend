const db = require("../config/supabase");
const bcrypt = require("bcrypt");

// Get all users
const getUsers = async (req, res) => {
  try {
    const { data, error } = await db.from("usersData").select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, password_hash, phone_number, city, course } = req.body;

    const hashedPassword = await bcrypt.hash(password_hash, 12);

    // Create Auth User
    const { data: authData, error: authError } = await db
      .from("usersData")
      .insert({
        name,
        email,
        password_hash: hashedPassword,
        phone_number,
        city,
        course,
      });

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message,
      });
    }

    if (!authData.user) {
      return res.status(400).json({
        success: false,
        message: "User creation failed",
      });
    }

    // Save Profile Data
    const { data, error } = await db
      .from("usersData")
      .insert([
        {
          id: authData.user.id,
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
      message: "User created successfully",
      user: data,
      access_token: authData.session?.access_token || null,
      refresh_token: authData.session?.refresh_token || null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
