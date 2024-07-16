import Express from 'express';
import bodyparser from 'body-parser';
import pinoHttp from 'pino-http';
import {logger} from "./src/logger";
import {authorization} from "./src/authorization";
import * as routes from "./src/routes";
console.log(routes);
const app = Express();

if (process.env.NODE_ENV === 'production') {
	require('dotenv').config({path: '.env.production'});
} else {
	require('dotenv').config({path: '.env.development'});
}

// Cabeceras HTTP desactivadas
app.disable("etag");
app.disable("x-powered-by");
// Body
app.use(bodyparser.json({}));
// Logger
app.use(pinoHttp({ logger: logger }));
// Authorization (Bearer)
app.use(authorization);
Object.values(routes).forEach((route) => app.use(route));
// Configura el puerto de la aplicación
const port = process.env.PORT || 3001;
// Inicializa el servidor
app.listen(typeof port === "string" ? parseInt(port) : port, async () => {
	logger.info({ port }, "port:")
	logger.info({ server: "http://127.0.0.1:" + port }, "server:")
});
