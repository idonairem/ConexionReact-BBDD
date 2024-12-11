# Proyecto de Gestión de Usuarios

Este proyecto es una aplicación web para agregar y mostrar usuarios. Está compuesto por un backend en **Node.js** con **MySQL** y un frontend en **React.js**. El backend proporciona una API REST para interactuar con los usuarios y el frontend permite agregar nuevos usuarios y ver una lista de los existentes.

## Características

- **Agregar usuarios**: Puedes agregar nuevos usuarios mediante un formulario en el frontend.
- **Ver usuarios**: Los usuarios existentes se muestran en una tabla en la misma página.
- **Alertas**: Cuando un usuario es agregado correctamente, se muestra una alerta en el navegador.

## Tecnologías usadas

### Backend

- **Node.js**: Entorno de ejecución para el servidor backend.
- **Express**: Framework para Node.js para facilitar la creación de la API.
- **MySQL**: Base de datos relacional para almacenar la información de los usuarios.

### Frontend

- **React.js**: Biblioteca de JavaScript para la creación de la interfaz de usuario.
- **CSS**: Estilos para la aplicación.

## Requisitos previos

- Tener **Node.js** y **npm** instalados en tu máquina.
- Tener una base de datos **MySQL** en funcionamiento.

## Instalación

### Backend

1. Clona el repositorio
   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   
2.Navega al directorio del backend
   ```bash
  cd backend

3.Instala las dependencias
   ```bash
   npm install

4.Configura la base de datos MySQL
Crea una base de datos llamada usuarios_db.
Crea una tabla llamada usuarios con las siguientes columnas
   ```bash
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  email VARCHAR(255)
);

