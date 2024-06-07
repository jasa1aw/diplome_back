const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('./passport');

const signUp = async(req, res) => {
    try {
        if(
            req.body.email.length > 0 &&
            req.body.full_name.length > 0 &&
            req.body.password.length > 0
        ){
            const findUser = await User.findOne({where: {email: req.body.email}});
            if(findUser){
                res.status(401).send({message: 'such a user already exists'});
            }else{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, function(err, hash){
                        const user = User.create({
                            email: req.body.email,
                            full_name: req.body.full_name,
                            password: hash,
                        });
                        res.status(200).send(user);
                    });
                });
            }
        }else{
            res.status(401).send({message: 'fill in the blanks'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const signIn = async (req, res) =>{
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user){
            return res.status(401).json({message: 'Нет такого пользователя'});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(401).json({message: 'Неверный пароль'});
        }
        // Проверка имени пользователя и пароля в базе данных
        // При успешной аутентификации, создайте JWT токен
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            isAdmin: user.isAdmin
        }, jwtOptions.secretOrKey,
        {
            // продолжительность токена
            expiresIn: 24 * 60 * 60
        });
        res.status(200).json({message: 'Вход выполнен успешно', token});
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {signUp, signIn}