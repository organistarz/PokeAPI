const axios = require('axios');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: '.env.development'});

describe('GET /pokemon-custom/pikachu', function() {
	it('Debería responde la información de Pikachu', async () => {
		const token = jwt.sign({}, process.env.JWT_SECRET_TOKEN);
		const res = await axios.get('http://127.0.0.1:3001/pokemon-custom/pikachu', { headers: { "Authorization": `Bearer ${token}` } });
		//
		expect(res.status).toEqual(200);
		expect(res.data).toHaveProperty("abilities");
	});
});