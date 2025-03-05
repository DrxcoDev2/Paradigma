import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { dbPromise } from './backend/db';
import { Context } from 'koa';

// Definir una interfaz para los datos del usuario en la solicitud POST
interface UserRequest {
    name: string;
    email: string;
}

const app = new Koa();
const router = new Router();

// Middleware para manejar errores
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err: any) {  // Tipo expl�cito 'any' para manejar el error
        console.error('Error en la solicitud:', err);
        ctx.status = err.status || 500;
        ctx.body = { error: err.message || 'Internal Server Error' };
    }
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser());

// Ruta para obtener todos los usuarios
router.get('/users', async (ctx: Context) => {
    try {
        const db = await dbPromise;
        const users = await db.all('SELECT * FROM users');

        if (users.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No users found' };
            return;
        }

        ctx.body = users;
    } catch (err: any) {  // Tipo expl�cito 'any' para manejar el error
        console.error('Error al obtener los usuarios:', err);
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch users' };
    }
});

// Ruta para agregar un nuevo usuario
router.post('/users', async (ctx: Context) => {
    try {
        // Asegurarse de que el cuerpo tiene los datos correctos
        const { name, email }: UserRequest = ctx.request.body as UserRequest; // Asertar tipo expl�citamente

        // Verificar que los datos del usuario sean v�lidos
        if (!name || !email) {
            ctx.status = 400;
            ctx.body = { error: 'Name and email are required' };
            return;
        }

        const db = await dbPromise;
        const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

        ctx.status = 201;
        ctx.body = { id: result.lastID, name, email };
    } catch (err: any) {  // Tipo expl�cito 'any' para manejar el error
        console.error('Error al agregar el usuario:', err);
        ctx.status = 500;
        ctx.body = { error: 'Failed to add user' };
    }
});

// Inicializar la base de datos y asegurarse de que la tabla 'users' exista
(async () => {
    try {
        const db = await dbPromise;

        // Crear la tabla si no existe
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL
            );
        `);

        // Insertar un usuario de prueba si la tabla est� vac�a
        const users = await db.all('SELECT * FROM users');
        if (users.length === 0) {
            await db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['John Doe', 'john@example.com']);
            console.log('Usuario de prueba agregado');
        }
    } catch (err: any) {  // Tipo expl�cito 'any' para manejar el error
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
