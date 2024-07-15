import * as http2 from "node:http2";
import {logger} from "./logger";

class RestifyError extends Error {
	/** @type {number} */
	statusCode;
	/** @type {{ type: string; message?: string; details?: any}} */
	body;
	/**
	 * @param {number} statusCode
	 * @param {{ type: string; message?: string; details?: any }} body */
	constructor(statusCode, body) {
		super(body.type);
		//
		this.statusCode = statusCode;
		this.body = { error: body };
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static badRequest(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_BAD_REQUEST, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_BAD_REQUEST"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static unauthorized(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_UNAUTHORIZED, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_UNAUTHORIZED"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static forbidden(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_UNAUTHORIZED, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_UNAUTHORIZED"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static notFound(body) {
		logger.trace({ body });
		console.log({ body });
		return new RestifyError(http2.constants.HTTP_STATUS_NOT_FOUND, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_NOT_FOUND"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static internalServerError(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_INTERNAL_SERVER_ERROR"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static notImplemented(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_NOT_IMPLEMENTED, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_NOT_IMPLEMENTED"
		});
	}
	/**
	 * @param {{ type: string; message?: string; details?: any; }} body */
	static serviceUnavailable(body) {
		return new RestifyError(http2.constants.HTTP_STATUS_SERVICE_UNAVAILABLE, body ?? {
			type: "RESTIFY_EXCEPTION_HTTP_STATUS_SERVICE_UNAVAILABLE"
		});
	}
}

export { RestifyError };