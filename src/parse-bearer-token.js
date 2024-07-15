export function parseBearerToken(token) {
	if (/^Bearer\s(.*)$/.test(token)) {
		return token.match(/^Bearer\s(.*)$/)[1];
	} else {
		return undefined;
	}
}