// // const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
// 	const token = req.header("token");
// 	if (!token)
// 		return res.status(401).send("Access denied. Not authenticated...");
// 	try {
// 		const jwtSecretKey = "nbZiLp5DVj";
// 		const decoded = jwt.verify(token, jwtSecretKey);

// 		req.user = decoded;
// 		next();
// 	} catch (ex) {
// 		res.status(400).send("Invalid auth token...");
// 	}
// };

// // const isUser = (req, res, next) => {
// // 	auth(req, res, () => {
// // 		if (req.user._id === req.params.id || req.user.isAdmin) {
// // 			next();
// // 		} else {
// // 			res.status(403).send("Access denied. Not authorized...");
// // 		}
// // 	});
// // };

// // For Admin
// const isAdmin = (req, res, next) => {
// 	auth(req, res, () => {
// 		if (req.user.isAdmin === true) {
// 			next();
// 		} else {
// 			res.status(403).send("Access denied. Not authorized...", req.user);
// 		}
// 	});
// };

// module.exports = { isAdmin };
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).send("Access denied. Not authorized...");
};

module.exports = { isAdmin };
