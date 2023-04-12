import createError from "http-errors";
const auth = async (req, res, next) => {
    try {
        const a = true;
        if (a) {
            throw createError.NotFound("Hello");
        }
        res.status(200).json({
            message: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export { auth };
