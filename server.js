const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const universityRoutes = require("./src/routers/universitiesRoute");
const courseRoutes = require("./src/routers/courseRoute");

dotenv.config();

const userRoutes = require('./src/routers/userRouter');

const reviewRoutes = require('./src/routers/reviewRouters');

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'My College Duniya API Running 🚀'
    });
});

// Routes
app.use('/api/users', userRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/universities", universityRoutes);

app.use("/api/courses", courseRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );
});