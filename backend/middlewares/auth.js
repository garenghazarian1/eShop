export default function auth (req, res, next) {
    try {
        console.log("Auth here", req.cookies);

        next();
        
        
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while trying to authenticate.' });
    }
}