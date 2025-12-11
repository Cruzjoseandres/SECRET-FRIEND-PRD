const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Deseos = sequelize.define('Deseos', {
        wishlist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idParticipante: {
            type: DataTypes.INTEGER,
            allowNull: false
        }       
    });

    return Deseos;
}
