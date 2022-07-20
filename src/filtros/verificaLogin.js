const conexao = require('../conexao');
const jwt = require('jsonwebtoken');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.SENHA_HASH);

        const usuarios = await conexao('usuarios').where({id}).first();

        if (!usuarios) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...usuario } = usuarios;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin