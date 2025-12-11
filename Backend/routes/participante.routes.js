const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const checkDuplicate = require('../middlewares/checkDuplicate.middleware');
const {validateUser} = require('../middlewares/validateUser.middleware');
const { participanteSchema } = require('../validators/participanteSchema');

const db = require('../models');
module.exports = app => {
	const router = require('express').Router();
	const participanteController = require('../controllers/participante.controller');

	router.get('/', participanteController.getAllParticipantes);
	router.post('/:link', isJsonRequestValid, validationJson(participanteSchema), participanteController.addParticipantebySorteoLink);
	router.get('/sorteo/:id',validateUser, participanteController.asignarParticipantes);
	router.post('/:linkParticipante/wishlist', isJsonRequestValid, participanteController.createWishlistItem);
	router.get('/:linkParticipante', participanteController.getParticipanteByToken);
	// router.get('/:link', participanteController.getParticipantesBySorteoLink);
	// router.get('/share/:id', participanteController.shareParticipanteLink);
	// router.get('/:id', getObjectOr404(db.SorteosModel), sorteoController.getSorteoById);
	// router.put('/:id/update', isJsonRequestValid, validationJson(sorteoSchema), getObjectOr404(db.SorteosModel), sorteoController.updateSorteo);
	// router.delete('/:id', getObjectOr404(db.SorteosModel), sorteoController.deleteSorteo);

	app.use('/participantes', router);
};
