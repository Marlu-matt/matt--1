const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'marlusql',      
    password: 'Marlu112953@', 
    database: 'databasappmat'   
});

// Conecccion a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ejemplo de ruta para obtener datos
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error en la consulta' });
        } else {
            res.json(results);
        }
    });
});

app.post('/registrar', (req, res) => {
    console.log("Datos recibidos:", req.body);
    const { nombre, correo, password, apellido, usuario } = req.body;
    if (!nombre || !apellido || !usuario || !correo || !password ) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    // Verificacion si el correo o el usuario ya existen
    const sqlCheck = 'SELECT * FROM usuarios WHERE correo = ? OR usuario = ?';
    db.query(sqlCheck, [correo, usuario], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la consulta' });
        if (results.length > 0) {
            // Determinar si el conflicto es por correo o usuario
            const conflict = results[0].correo === correo ? 'correo' : 'usuario';
            return res.status(400).json({ error: `El ${conflict} ya está registrado` });
        }
        // Si no existe, registrar
        const sql = 'INSERT INTO usuarios (nombre, correo, contraseña, apellido, usuario) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [nombre, correo, password, apellido, usuario], (err, result) => {
            if (err) {
                console.error(' Error en INSERT:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.json({ mensaje: 'Usuario registrado correctamente' });
        });
    });
});

app.post('/login', (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
      const sql = 'SELECT * FROM usuarios WHERE correo = ? AND `contraseña` = ?';
        db.query(sql, [correo, password ], (err, results) => {
        if (err) {
            console.error('error en el login:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }
        if (results.length > 0) {
            res.json({ mensaje: 'Login exitoso', usuario: results[0] });
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
