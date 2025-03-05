import Koa, { Context } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import sqlite3 from 'sqlite3';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// Configura la base de datos SQLite
const db = new sqlite3.Database('./mydatabase.db');

// Aseg�rate de que la tabla exista
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

// Ruta para obtener todos los usuarios
router.get('/users', async (ctx: Context) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      ctx.status = 500;
      ctx.body = { error: 'Database error' };
      return;
    }
    ctx.body = rows;
  });
});

// Ruta para crear un nuevo usuario
router.post('/users', async (ctx: Context) => {
  const { name, email } = ctx.request.body as { name: string; email: string };

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      ctx.status = 500;
      ctx.body = { error: 'Database error' };
      return;
    }
    ctx.body = {
      id: this.lastID, // Devuelve el id del nuevo usuario insertado
      name,
      email,
    };
  });
});

// Usar las rutas
app.use(router.routes()).use(router.allowedMethods());

// Iniciar el servidor en el puerto 3020
app.listen(3020, function () {
  console.log('Server listening on port 3020');
});
