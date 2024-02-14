// Código del backend
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sistema_de_gestion',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

const verifyRole = (requiredRole) => (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }

  jwt.verify(token, '123', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    const { nombre_del_rol } = decoded;

    if (nombre_del_rol !== "Administrador") {
      return res.status(403).json({ mensaje: 'Acceso prohibido para este rol' });
    }

    next();
  });
};




app.get('/usuario', verifyRole("Miembro"), (req, res) => {
  res.json({ mensaje: 'Acceso permitido para usuarios normales' });
});

app.get('/dashboard', verifyRole("Administrador"), (req, res) => {
  res.json({ mensaje: 'Acceso permitido al dashboard' });
});

//OBTENER

app.get('/equipos', (req, res) => {
  db.query('SELECT * FROM equipos', (error, results) => {
    if (error) {
      console.error('Error al consultar datos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    } else {
      res.json({ mensaje: 'Datos obtenidos correctamente', datos: results });
    }
  });
});

app.get('/proyectos', (req, res) => {
  db.query('SELECT * FROM proyectos', (error, results) => {
    if (error) {
      console.error('Error al consultar datos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    } else {
      res.json({ mensaje: 'Datos obtenidos correctamente', datos: results });
    }
  });
});

app.get('/usuarios', (req, res) => {
  const sql = 'Select * from usuarios';
  db.query(sql, (error, results) => {
    
    if (error) {
      console.error('Error al obtener los miembros:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    results.forEach(member => {
      if (member.IDEquipo === null) {
        member.NombreEquipo = 'Sin equipo';
      }
    });

    res.json({ datos: results });
  });
});


//CREAR

app.post("/crearusuario", (req, res) => {
  const { correo_electronico, contrasenia, nombre_del_usuario, especialidad, nombre_del_rol, equipo } = req.body;

  // Verificar si el correo electrónico ya está registrado
  db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', correo_electronico, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    if (results.length > 0) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    // Generar el hash de la contraseña
    bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      // Almacenar el usuario en la base de datos con la contraseña encriptada
      db.query('INSERT INTO usuarios(correo_electronico, contrasenia, nombre_del_usuario, especialidad, nombre_del_rol, IDEquipo) VALUES(?,?,?,?,?,?)',
        [correo_electronico, hash, nombre_del_usuario, especialidad, nombre_del_rol, equipo],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
          } else {
            return res.send("Usuario registrado con éxito");
          }
        }
      );
    });
  });
});


app.post("/crearequipo", (req, res) => {
  const { nombre_del_equipo, descripcion_equipo } = req.body;

  db.query('INSERT INTO equipos (nombre_del_equipo, descripcion_equipo) VALUES(?,?)',
    [nombre_del_equipo, descripcion_equipo],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      } else {
        res.send("Equipo registrado con éxito");
      }
    }
  );
});

app.post("/crearproyecto", (req, res) => {
  const { nombre_proyecto, descripcion, estado_del_proyecto } = req.body;

  db.query('INSERT INTO proyectos (nombre_proyecto, descripcion, estado_del_proyecto) VALUES(?,?,?)',
    [nombre_proyecto, descripcion, estado_del_proyecto],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      } else {
        res.send("Proyecto registrado con éxito");
      }
    }
  );
});

//Eliminar

app.delete("/eliminarUsuario/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM usuarios WHERE id_usuarios = ?;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      return;
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

app.delete("/eliminarEquipo/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM equipos WHERE id_equipos = ?;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el equipo:', err);
      return;
    }
    res.json({ message: 'Equipo eliminado correctamente' });
  });
});

app.delete("/eliminarProyecto/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM proyectos WHERE id_proyectos = ?;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el proyecto:', err);
      return;
    }
    res.json({ message: 'Proyecto eliminado correctamente' });
  });
});


//EDITAR

app.put("/editarusuario", async (req, res) => {
  const { id_usuarios, correo_electronico, contrasenia, nombre_del_usuario, nombre_del_rol, especialidad, IDEquipo } = req.body;

  try {
    // Hashea la contraseña antes de actualizar
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const updateQuery = `
      UPDATE usuarios
      SET correo_electronico=?, contrasenia=?, nombre_del_usuario=?, nombre_del_rol=?, especialidad=?, IDEquipo=?
      WHERE id_usuarios=?
    `;

    db.query(
      updateQuery,
      [correo_electronico, hashedPassword, nombre_del_usuario, nombre_del_rol, especialidad, IDEquipo, id_usuarios],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error al actualizar usuario");
        } else {
          res.send("Usuario actualizado con éxito");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar usuario");
  }
});

app.put("/editarproyecto", (req, res) => {
  const id = req.body.id_proyectos;
  const proyecto = req.body.nombre_proyecto;
  const estado = req.body.estado_del_proyecto;
  const descripcion = req.body.descripcion;

  db.query(
    'UPDATE proyectos SET nombre_proyecto=?, estado_del_proyecto=?, descripcion=? WHERE id_proyectos=?',
    [proyecto, estado, descripcion, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Proyecto actualizado con éxito");
      }
    }
  );
});

app.put("/editarequipo", (req, res) => {
  const id = req.body.id_equipos;
  const equipo = req.body.nombre_del_equipo;
  const descripcion = req.body.descripcion_equipo;

  db.query(
    'UPDATE equipos SET nombre_del_equipo=?, descripcion_equipo=? WHERE id_equipos=?',
    [equipo, descripcion, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Equipo actualizado con éxito");
      }
    }
  );
});

//CÓDIGO
app.post('/guardarCodigo', (req, res) => {
  const { correo_electronico, codigo } = req.body;
  const sql = 'UPDATE usuarios SET codigo_autenticacion = ? WHERE correo_electronico = ?';
  db.query(sql, [codigo, correo_electronico], (error, results) => {
    if (error) {
      console.error('Error al guardar el código de autenticación:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.json({ mensaje: 'Código de autenticación guardado correctamente' });
  });
});

// Después de la definición del endpoint '/guardarCodigo'

// Endpoint para eliminar el código de autenticación
app.post('/eliminarCodigo', (req, res) => {
  const { correo_electronico } = req.body;
  const sql = 'UPDATE usuarios SET codigo_autenticacion = NULL WHERE correo_electronico = ?';
  db.query(sql, [correo_electronico], (error, results) => {
    if (error) {
      console.error('Error al eliminar el código de autenticación:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.json({ mensaje: 'Código de autenticación eliminado correctamente' });
  });
});



// Verificar código de autenticación
app.post('/verificarCodigo', (req, res) => {
  const { correo_electronico, codigo } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE correo_electronico = ? AND codigo_autenticacion = ?';
  db.query(sql, [correo_electronico, codigo], (error, results) => {
    if (error) {
      console.error('Error al verificar el código de autenticación:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    if (results.length > 0) {
      // Si el código es válido, puedes realizar acciones adicionales aquí si es necesario
      res.json({ mensaje: 'Código de autenticación válido' });
    } else {
      res.status(401).json({ mensaje: 'Código de autenticación inválido' });
    }
  });
});


// Ruta /acceso en el backend
app.post('/acceso', async (req, res) => {
  const { correo_electronico, contrasenia } = req.body;
  const sql = 'SELECT *, nombre_del_rol FROM usuarios WHERE correo_electronico = ?';
  db.query(sql, [correo_electronico], async (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length > 0) {
      const user = results[0];

      const tokenPayload = {
        id_usuario: user.id_usuarios,
        nombre_del_rol: user.nombre_del_rol // Asegúrate de que este campo contenga el rol del usuario
      };

      const token = jwt.sign(tokenPayload, '123', { expiresIn: '1d' });

      // Generar código de autenticación aleatorio
      const verificationCode = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos

      // Actualizar el código de autenticación en la base de datos
      const updateCodeResponse = await fetch('http://localhost:3000/guardarCodigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico, codigo: verificationCode }),
      });

      if (!updateCodeResponse.ok) {
        return res.status(500).json({ mensaje: 'Error al actualizar el código de autenticación en la base de datos' });
      }

      // Enviar el código de autenticación por correo electrónico, pasando la dirección de correo electrónico del usuario
      const emailResponse = await fetch('http://localhost:3000/enviarCorreo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico, codigo: verificationCode }),
      });

      // Envía el token JWT y los datos del usuario al front-end
      res.cookie('token', token);
      return res.json({ Estatus: 'CORRECTO', Usuario: { token, user } });
    } else {
      return res.json({ Estatus: 'ERROR', Error: 'Usuario o Contraseña Incorrecta' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});