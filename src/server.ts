import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { dbPromise } from './backend/db'; // Aseg�rate de que esto est� configurado correctamente
import { Context } from 'koa';

// Definir una interfaz para los datos de la solicitud POST
interface FavoriteRequest {
    url: string;
    fav: boolean;
}

const app = new Koa();
const router = new Router();

// Middleware para manejar errores
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err: any) {
        console.error('Error en la solicitud:', err);
        ctx.status = err.status || 500;
        ctx.body = { error: err.message || 'Internal Server Error' };
    }
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser());

// Ruta para obtener todos los favoritos
router.get('/favorites', async (ctx: Context) => {
    try {
        const db = await dbPromise;
        const favorites = await db.all('SELECT * FROM favorites');

        if (favorites.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No favorites found' };
            return;
        }

        ctx.body = favorites;
    } catch (err: any) {
        console.error('Error al obtener los favoritos:', err);
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch favorites' };
    }
});

// Ruta para agregar un nuevo favorito
router.post('/favorites', async (ctx: Context) => {
    try {
        const { url, fav }: FavoriteRequest = ctx.request.body as FavoriteRequest;

        if (!url || fav === undefined) {
            ctx.status = 400;
            ctx.body = { error: 'URL and fav are required' };
            return;
        }

        const db = await dbPromise;
        const result = await db.run('INSERT INTO favorites (url, fav) VALUES (?, ?)', [url, fav]);

        ctx.status = 201;
        ctx.body = { id: result.lastID, url, fav };
    } catch (err: any) {
        console.error('Error al agregar el favorito:', err);
        ctx.status = 500;
        ctx.body = { error: 'Failed to add favorite' };
    }
});


// Inicializar la base de datos y asegurarse de que la tabla 'favorites' exista
(async () => {
    try {
        const db = await dbPromise;

        // Crear la tabla si no existe
        await db.exec(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                fav BOOLEAN NOT NULL
            );
        `);

        // Insertar un favorito de prueba si la tabla est� vac�a
        const favorites = await db.all('SELECT * FROM favorites');
        if (favorites.length === 0) {
            await db.run('INSERT INTO favorites (url, fav) VALUES (?, ?)', ['https://example.com', true]);
            console.log('Favorito de prueba agregado');
        }
    } catch (err: any) {
        console.error('Error al inicializar la base de datos:', err);
    }
})();

// Registrar las rutas en la aplicaci�n
app.use(router.routes());
app.use(router.allowedMethods());

// Iniciar el servidor
const port = 3020;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
