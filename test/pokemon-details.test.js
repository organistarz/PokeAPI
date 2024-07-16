const axios = require('axios');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: '.env.development'});

describe('GET /pokemon/pikachu', function() {
	it('Debería responde la información de Pikachu', async () => {
		const token = jwt.sign({}, process.env.JWT_SECRET_TOKEN);
		const res = await axios.get('http://127.0.0.1:3001/pokemon/pikachu', { headers: { "Authorization": `Bearer ${token}` } });
		//
		expect(res.status).toEqual(200);
		expect(res.data).toHaveProperty("abilities");
		expect(res.data).toHaveProperty("base_experience");
		expect(res.data).toHaveProperty("cries");
		expect(res.data).toHaveProperty("forms");
		expect(res.data).toHaveProperty("game_indices");
	});
});