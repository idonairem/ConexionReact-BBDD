import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';
import icono from './img/icono.png'; 

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditadoId, setUsuarioEditadoId] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener los usuarios:', error);
    }
  };

  // Función para validar el correo electrónico
  const esCorreoValido = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es)$/;
    return regex.test(email);
  };

  const agregarUsuario = async () => {
    if (!nombre || !email) {
      alert('Por favor, introduce todos los datos.');
      return;
    }

    // Validar correo
    if (!esCorreoValido(email)) {
      alert('El correo electrónico debe terminar en .com o .es');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:5000/api/usuarios', {
        nombre,
        email,
      });
      console.log('Usuario agregado:', respuesta.data);
      obtenerUsuarios();
      setNombre('');
      setEmail('');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const abrirModalEdicion = (usuario) => {
    setModalAbierto(true);
    setUsuarioEditadoId(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditadoId(null);
    setNombre('');
    setEmail('');
  };

  const guardarEdicion = async () => {
    if (!nombre || !email) {
      alert('Por favor, introduce todos los datos.');
      return;
    }

    // Validar correo
    if (!esCorreoValido(email)) {
      alert('El correo electrónico debe terminar en .com o .es');
      return;
    }

    try {
      console.log(`Guardando cambios para usuario con ID: ${usuarioEditadoId}`);
      const respuesta = await axios.put(`http://localhost:5000/api/usuarios/${usuarioEditadoId}`, {
        nombre,
        email,
      });
      console.log('Usuario actualizado:', respuesta.data);
      obtenerUsuarios();
      cerrarModal();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };
  
  const eliminarUsuario = async (id) => {
    // Confirmación antes de eliminar
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (!confirmacion) return; // Si el usuario cancela, no hacer nada

    try {
      console.log(`Eliminando usuario con ID: ${id}`);
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
      console.log(`Usuario con ID ${id} eliminado.`);
      obtenerUsuarios(); // Actualiza la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {}
        <img
          src=  {icono}
          alt="Logo"
          style={{
            width: '150px', // Tamaño de la imagen
            height: 'auto', // Mantener la proporción de la imagen
            marginBottom: '20px', // Espacio entre la imagen y el título
          }}
        />
        <h1>Gestión de Usuarios</h1>

        <div>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            style={{ width: '250px', padding: '10px', fontSize: '16px' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            style={{ width: '250px', padding: '10px', fontSize: '16px' }}
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
            Añadir Usuario
          </button>
        </div>

        <table border="1" style={{ marginTop: '20px', width: '80%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    onClick={() => abrirModalEdicion(usuario)}
                    style={{
                      marginRight: '10px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(usuario.id)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    style={{
                      marginLeft:'10px',
                      padding:'8px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }
                    }
                    >
                    Buscar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>

      {modalAbierto && (
        <div className="modal" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          width: '400px',
        }}>
          <h2>Editar Usuario</h2>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            style={{ width: '80%', padding: '12px', fontSize: '16px', marginBottom: '10px' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            style={{ width: '80%', padding: '12px', fontSize: '16px', marginBottom: '18px' }}
          />
          <button
            onClick={guardarEdicion}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '18px',
            }}
          >
            Guardar Cambios
          </button>
          <button
            onClick={cerrarModal}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '18px',
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {modalAbierto && (
        <div className="overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }} onClick={cerrarModal}></div>
      )}
    </div>
  );
}

export default App;

