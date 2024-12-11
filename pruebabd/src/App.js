import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  // Obtener los usuarios desde el servidor al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:5000/usuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los usuarios:', error);
      });
  }, []);

  // Función para agregar un usuario
  const agregarUsuario = async () => {
    if (!nombre || !email) {
      alert('Por favor, introduce todos los datos.');
      return;
    }
    try {
      const respuesta = await axios.post('http://localhost:5000/api/usuarios', {
        nombre,
        email,
      });
      console.log('Usuario agregado:', respuesta.data);

      // Actualiza la lista de usuarios sin recargar
      setUsuarios([...usuarios, { nombre, email }]);
      setNombre('');
      setEmail('');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Usuarios</h1>

        {/* Formulario para agregar un nuevo usuario */}
        <div>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            style={{ width: '300px', padding: '10px', fontSize: '16px' }} // Ancho ajustado
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            style={{ width: '300px', padding: '10px', fontSize: '16px' }} // Ancho ajustado
          />
          <button
            onClick={agregarUsuario}
            style={{
              marginLeft: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Agregar Usuario
          </button>
        </div>

        {/* Tabla para mostrar los usuarios */}
        <table border="1" style={{ marginTop: '20px', width: '80%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
