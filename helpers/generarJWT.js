import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    return jwt.sign({ id }, 'miClavePrivada', {
        expiresIn: '10h',
    });
};

export default generarJWT;
