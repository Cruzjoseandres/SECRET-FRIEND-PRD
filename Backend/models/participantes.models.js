const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Participantes = sequelize.define('Participantes', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identificadorUnico: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        linkParticipante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idSorteo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idParticipanteAsignado: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Participantes;
}
