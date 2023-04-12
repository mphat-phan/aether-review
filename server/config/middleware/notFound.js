import createError from "http-errors";
const NotFound = (req, res) => {
    throw createError.NotFound("This route is not exist");
};

export default NotFound;
