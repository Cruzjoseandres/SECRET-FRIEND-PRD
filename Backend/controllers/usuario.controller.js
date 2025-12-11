const db = require("../models/");
const bcrypt = require('bcrypt');
const { generateAuthToken } = require("../utilities/text.utilities");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await db.UsuarioModel.findOne({ where: { username } });
        if (!usuario) {
            return res.status(401).json({ error: 'Username o contraseña incorrectos' });
        }
        if (!await bcrypt.compare(password, usuario.password)) {
            return res.status(401).json({ error: 'Username o contraseña incorrectos' });
        }
        const authToken = await generateAuthToken(usuario.username);
        const nuevoToken = await db.authToken.create({
            token: authToken,
            idUsuario: usuario.id
        });
        res.json({ token: nuevoToken.token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}
exports.register = async (req, res) => {
    const { nombre, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await db.UsuarioModel.create({
            nombre,
            username,
            password: hashedPassword
        });
        res.status(201).json(
            {
                id: nuevoUsuario.id,
                username: nuevoUsuario.username,
                nombre: nuevoUsuario.nombre
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}

exports.getUsuarioById = async (req, res) => {
    const usuario = req.obj;
    try {
        res.json({
            id: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}


exports.getSorteoByUsuarioId = async (req, res) => {
    console.log("entro al controlador")
    const usuario = req.user;
    try {
        const sorteos = await db.SorteosModel.findAll({ where: { idUsuario: usuario.id } });
        res.json(sorteos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}
