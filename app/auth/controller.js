const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('./passport');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({ where: { email } });

        if (!user) {
            // User doesn't exist, create a new one
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ email, password: hashedPassword });
        } else {
            // User exists, check the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Неверный пароль' });
            }
        }

        // Create a JWT token
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }, jwtOptions.secretOrKey, {
            expiresIn: 24 * 60 * 60 // Token duration: 1 day
        });

        res.status(200).json({ message: 'Вход выполнен успешно', token });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send(error);
    }
};

module.exports = {signIn}