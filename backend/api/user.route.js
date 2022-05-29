import express from "express";

const router = express.Router()

router.route('/:user').get((req, res) => {
    console.log(req.params);
    res.status(200).json({
        login: "mpivet-p",
        level: 16.16,
        image: "https://profile.intra.42.fr/users/el-fourbo/photo",
    });
});

export default router;