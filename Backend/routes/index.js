module.exports = app => {
    // require('./sorteo.routes')(app);
    // require('./participante.routes')(app);
    require('./usuario.routes')(app);
    require('./sorteo.routes')(app);
    require('./participante.routes')(app);
};