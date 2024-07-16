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
		.valid("pokemon-custom"),
	idOrName: Joi.string()
		.required()
});
router.get('/pokemon-custom/:idOrName', async (req, res, next) => {
	try {
		// Valída la información de entrada del endpoint
		const input = await requestDetails.validateAsync({
			endpoint: "pokemon-custom",
			idOrName: req.params.idOrName
		});
		// Obtiene la información del pokemon
		const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.idOrName}`, {})
			.then(response => {
				return response.data;
			})
			.catch(err => {
				logger.error({ error: err }, "error:");
				throw err;
			});
		logger.trace({ pokemon: pokemon }, "pokemon:");
		// Envía la respuesta de la solicitud
		return res.status(200).json({
			abilities: pokemon.abilities
		});
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

export { router as pokeAPIEndpointCustomProxyRouter }