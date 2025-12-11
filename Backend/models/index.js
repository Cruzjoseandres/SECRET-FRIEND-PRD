const { sequelize } = require("../config/db.config")

const ParticipantesModel = require("./participantes.models")(sequelize);
const SorteosModel = require("./sorteo.models")(sequelize);
const UsuarioModel = require("./usuario.models")(sequelize);
const authToken = require("./authToken")(sequelize);
const DeseosModel = require("./deseo.models")(sequelize);

//relaciones 

UsuarioModel.hasMany(authToken, { foreignKey: "idUsuario", as: "authTokens" });
authToken.belongsTo(UsuarioModel, { foreignKey: "idUsuario", as: "usuario" });


SorteosModel.belongsTo(UsuarioModel, {foreignKey: 'idUsuario', as: 'usuario'});
UsuarioModel.hasMany(SorteosModel, {foreignKey: 'idUsuario', as: 'sorteos'});

ParticipantesModel.belongsTo(SorteosModel, {foreignKey: 'idSorteo', as:'sorteo'});
SorteosModel.hasMany(ParticipantesModel, {foreignKey: 'idSorteo', as:'participantes'});

ParticipantesModel.belongsTo(ParticipantesModel, {foreignKey: 'idParticipanteAsignado', as:'participanteAsignado'});


ParticipantesModel.hasMany(DeseosModel, {foreignKey: 'idParticipante', as:'deseos'});
DeseosModel.belongsTo(ParticipantesModel, {foreignKey: 'idParticipante', as:'participante'});

module.exports = {
    ParticipantesModel,
    SorteosModel,
    UsuarioModel,
    authToken,
    DeseosModel,
    sequelize,
    Sequelize: sequelize.Sequelize
}




