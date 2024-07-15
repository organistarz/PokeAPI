const {JsonWebTokenError, NotBeforeError, TokenExpiredError} = require("jsonwebtoken");
const {parseBearerToken} = require("./parse-bearer-token");
const {logger} = require("./logger");
const {RestifyError} = require("./restify");
const jwt = require("jsonwebtoken");

const { Request, Response, NextFunction } = require("express");

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function authorization(req, res, next) {
	try {
		logger.debug({ method: req.method });
		// Verifica si se ha solicitado el método OPTIONS
		if (req.method.toUpperCase() === "OPTIONS")
			return next();
		// Obtiene la información del Bearer token
		const token = parseBearerToken(req.headers.authorization);
		logger.debug({ token });
		//
		if (!authorization)
			throw RestifyError.unauthorized({ type: "BEARER_TOKEN_NOT_FOUND" });
		// TODO SecretToken
		const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		// Verifica si el token es válido
		if (typeof data === "object" && data.constructor === Object) {
			return next();
		} else throw RestifyError.unauthorized({ type: "BEARER_TOKEN_INVALID" });
		//
	} catch (e) {
		//
		if (e instanceof RestifyError)
			return next(e);
		//
		logger.debug({ e });
		if (e instanceof SyntaxError) {
			logger.debug({ e }, "SyntaxError:");
			return next(RestifyError.unauthorized({ type: "BEARER_TOKEN_SYNTAX_ERROR" }));
		}
		if (e instanceof TokenExpiredError) {
			logger.debug({ e }, "TokenExpiredError:");
			return next(RestifyError.unauthorized({ type: "BEARER_TOKEN_EXPIRED" }));
		}
		if (e instanceof NotBeforeError) {
			logger.debug({ e }, "NotBeforeError:");
			return next(RestifyError.unauthorized({ type: "BEARER_TOKEN_NOT_BEFORE" }));
		}
		if (e instanceof JsonWebTokenError) {
			logger.debug({ e }, "JsonWebTokenError:");
			switch (e.message) {
				case "jwt malformed":
					return next(RestifyError.unauthorized({
						type: "BEARER_TOKEN_MALFORMED"
					}));
				case "invalid signature":
					return next(RestifyError.unauthorized({
						type: "BEARER_TOKEN_INVALID_SIGNATURE"
					}));
				case "invalid token":
					return next(RestifyError.unauthorized({
						type: "BEARER_TOKEN_INVALID"
					}));
				case "jwt signature is required":
					return next(RestifyError.unauthorized({
						type: "BEARER_TOKEN_SIGNATURE_IS_REQUIRED"
					}));
				default:
					return next(RestifyError.unauthorized({
						type: "BEARER_TOKEN_UNEXPECTED"
					}));
			}
		}
		return next(e);
	}
}