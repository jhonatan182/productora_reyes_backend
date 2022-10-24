import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '10h',
    });
};

export default generarJWT;
