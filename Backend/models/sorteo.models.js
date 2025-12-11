const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Sorteo = sequelize.define('Sorteo', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Sorteo;
}
