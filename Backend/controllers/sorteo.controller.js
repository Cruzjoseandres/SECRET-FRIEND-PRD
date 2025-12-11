const db = require("../models/");
const crypto = require("crypto");

exports.createSorteo = async (req, res) => {
    const { nombre, fecha } = req.body;
    const idUsuario = req.user.id;

    try {
        const token = await crypto.randomBytes(16).toString("hex");
        const sorteo = await db.SorteosModel.create({
            nombre,
            fecha,
            estado: true,
            link: token,
            idUsuario
        });

        const usuario = await db.UsuarioModel.findByPk(idUsuario);
        const nuevoSorteo = {
            id: sorteo.id,
            nombre: sorteo.nombre,
            fecha: sorteo.fecha,
            estado: sorteo.estado,
            link: sorteo.link,
            usuario: usuario.nombre
        };

        res.status(201).json(nuevoSorteo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el sorteo' });
    }
};

exports.getAllSorteos = async (req, res) => {
    try {
        const sorteos = await db.SorteosModel.findAll();
        res.status(200).json(sorteos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los sorteos' });
    }
}

exports.getSorteoByLink = async (req, res) => {
    const { link } = req.params;
    try {
        const sorteo = await db.SorteosModel.findOne({ where: { link } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        } 
        const usuario = await db.UsuarioModel.findByPk(sorteo.idUsuario);
        const participantes = await db.ParticipantesModel.findAll({ where: { idSorteo: sorteo.id } });

        const nuevoSorteo = {
            id: sorteo.id,
            nombre: sorteo.nombre,
            fecha: sorteo.fecha,
            estado: sorteo.estado,
            link: sorteo.link,
            usuario: usuario.nombre,
            participantes
        };
        res.status(200).json(nuevoSorteo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el sorteo' });
    }
};


exports.shareSorteoLink = async (req, res) => {
    const { id } = req.params;
    try {
        const sorteo = await db.SorteosModel.findOne({ where: { id } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        }
        const link = sorteo.link;
        const host = req.get('host');
        const fullLink = `http://${host}/sorteos/${link}`;
        res.status(200).json({ message: 'Link del sorteo compartido', link: fullLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al compartir el link del sorteo' });
    }
};


exports.updateSorteo = async (req, res) => {
    const { link } = req.params;
    const { nombre, fecha } = req.body;
    try {
        const sorteo = await db.SorteosModel.findOne({ where: { link } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        }

        sorteo.nombre = nombre;
        sorteo.fecha = fecha;
        await sorteo.save();

        res.status(200).json({ message: 'Sorteo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el sorteo' });
    }
};

exports.habilitarSorteo = async (req, res) => {
    const { link } = req.params;
    try {
        const sorteo = await db.SorteosModel.findOne({ where: { link } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        }
        sorteo.estado = true;
        await sorteo.save();

        res.status(200).json({ message: 'Sorteo habilitado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar el sorteo' });
    }
};

exports.desHabilitarSorteo = async (req, res) => {
    const { link } = req.params;
    try {
        const sorteo = await db.SorteosModel.findOne({ where: { link } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        }

        sorteo.estado = false;
        await sorteo.save();

        res.status(200).json({ message: 'Sorteo deshabilitado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar el sorteo' });
    }
};

exports.deleteSorteo = async (req, res) => {
    const { link } = req.params;

    try {
        const sorteo = await db.SorteosModel.findOne({ where: { link } });
        if (!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado' });
        }

        await db.SorteosModel.destroy({ where: { link } });
        res.status(200).json({ message: 'Sorteo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el sorteo' });
    }
};
