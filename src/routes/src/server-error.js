import { RestifyError } from "../../restify";
import { logger } from "../../logger";

function serverErrorNotFound(req, res, next) {
	if (!res.headersSent) {
		return next(RestifyError.notFound({
			type: "CATCH_ENDPOINT_NOT_FOUND",
			message: "El endpoint no está disponible en este momento."
		}));
	}
}
function serverError(err, req, res, next) {
	if (res.headersSent) return;
	//
	if (err instanceof RestifyError) {
		return res.status(err.statusCode).json(err.body);
	}
	return (error => {
		return res.status(error.statusCode).json(err.body);
	})(RestifyError.internalServerError({
		type: "CATCH_ERROR_CANNOT_BE_CAUGHT",
		message: "Ocurrió un error interno en el servidor, por favor contacte con el administrador."
	}));
}
export const serverErrorEndpoint = [serverErrorNotFound, serverError];