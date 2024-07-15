import axios from 'axios';
import e, { Router } from 'express';
import Joi, {ValidationError} from 'joi';
import {POKE_ENDPOINTS} from "../../../poke/endpoints";
import {logger} from "../../../logger";
import {RestifyError} from "../../../restify";

const router = Router();

const request = Joi.object({
	endpoint: Joi.string()
		.required()
		.valid(...POKE_ENDPOINTS),
	limit: Joi.number()
		.optional()
		.default(20),
	offset: Joi.number()
		.optional()
		.default(0)
});


router.get('/:endpoint', async (req, res, next) => {
	try {
		// Valída la información de entrada del endpoint
		const input = await request.validateAsync({
			endpoint: req.params.endpoint,
			limit: req.query.limit,
			offset: req.query.offset
		})
		const data = await axios.get(`https://pokeapi.co/api/v2/${input.endpoint}`, { params: { limit: input.limit, offset: input.offset } })
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


export { router as pokeAPIEndpointProxyRouter }
