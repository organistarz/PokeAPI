import Joi, {ValidationError} from "joi";
import {POKE_ENDPOINTS} from "../../../poke/endpoints";
import axios from "axios";
import {Router} from "express";
import {logger} from "../../../logger";
import {RestifyError} from "../../../restify";

const router = Router();

const requestDetails = Joi.object({
	endpoint: Joi.string()
		.required()
		.valid(...POKE_ENDPOINTS),
	idOrName: Joi.string()
		.required()
});
router.get('/:endpoint/:idOrName', async (req, res, next) => {
	try {
		// Valída la información de entrada del endpoint
		const input = await requestDetails.validateAsync({
			endpoint: req.params.endpoint,
			idOrName: req.params.idOrName
		});
		const data = await axios.get(`https://pokeapi.co/api/v2/${input.endpoint}/${input.idOrName}`, {})
			.then(response => {
				return response.data;
			})
			.catch(err => {
				logger.error({ error: err }, "error:");
				throw err;
			});
		// Envía la respuesta de la solicitud
		return res.status(200).json(data);
		//
	} catch (e) {
		// Verifica si es un error de validación
		if (e instanceof ValidationError)
			return next(RestifyError.badRequest({ type: "VALIDATION_ERROR", message: e.message }));
		//
		logger.error({ error: e }, "error:");
		return next(e);
	}
});

export { router as pokeAPIEndpointDetailsProxyRouter }