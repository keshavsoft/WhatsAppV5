import express from 'express';

const router = express.Router();

router.get("/TimeSpan", (req, res) => {
    res.end(process.env.TimeSpan);
});

export { router };