//match the req.headers.authorization with the token with process.env.SECRET_KEY


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    //MATCH THE TOKEN WITH THE SECRET KEY
    if (token !== process.env.SECRET_KEY) return res.status(401).json({ message: 'Unauthorized' });
    next();
};

module.exports = verifyToken;
