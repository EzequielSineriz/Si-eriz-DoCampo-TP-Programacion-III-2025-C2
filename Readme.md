# 🎮🧩 DualPlay – Plataforma Full-Stack de Venta de Videojuegos y Juegos de Mesa<h1>


DualPlay es un proyecto full-stack desarrollado como Trabajo Final de la asignatura Programación III.
La aplicación combina un backend en Node.js/Express con un frontend estático y un panel administrativo con EJS para la gestión completa del catálogo de productos.

El objetivo es construir un entorno donde la empresa ficticia DualPlay pueda administrar videojuegos y juegos de mesa, gestionar ventas, y exhibir un catálogo público para los clientes.

## 📁 Estructura del Proyecto

El proyecto está dividido en dos grandes áreas: Back y Front.

### 🔵 Backend (Node + Express + Sequelize)
```
📁Back
├── 📁config
│   └── multer.config.js
├── 📁controllers
│   ├── juegodemesa.controller.js
│   ├── productos.controller.js
│   ├── ventas.controller.js
│   └── videojuego.controller.js
├── 📁db
│   ├── database.sqlite
│   └── sequelize.js
├── 📁edicion
│   ├── editarProducto.html
│   └── nuevoProducto.html
├── 📁middleware
│   ├── juegosdemesa.middleware.js
│   └── videojuegos.middleware.js
├── 📁models
│   ├── admin.js
│   ├── asociaciones.js
│   ├── juegoDeMesa.js
│   ├── productos.js
│   ├── ventas.js
│   ├── ventasProductos.js
│   └── videoJuegos.js
├── 📁public
│   ├── 📁css
│   ├── 📁favicon
│   └── 📁js
├── 📁routes
│   ├── juegoDeMesa.routes.js
│   ├── productos.routes.js
│   ├── ventas.routes.js
│   └── videoJuegos.routes.js
└── 📁views
    ├── altaProducto.ejs
    ├── dashboard.ejs
    ├── editarProducto.ejs
    └── login.ejs

```
  
### 🟠 Frontend Público
```
📁Front
├── 📁Bienvenido
├── 📁Carrito
├── 📁img
├── 📁JuegosDeMesa
├── 📁Productos
├── 📁Ticket
└── 📁Videojuegos
```
El frontend se sirve como archivos estáticos desde el servidor, permitiendo independencia del panel admin.

# ⚙️ Tecnologías Utilizadas
## 🟦 Backend

+ Node.js

+ Express.js

+ Sequelize

+ SQLite / MySQL

+ EJS (server-side rendering para el panel admin)

+ bcrypt (hash de contraseñas)

+ multer (subida de imágenes)

+ Zod (validaciones)


## 🟨 Frontend

+ HTML5

+ CSS3

+ JavaScript

+ Integración con APIs del backend

## 🔐 Panel Administrativo (SSR con EJS)

El administrador puede:

- Loguearse
- Crear/editar/eliminar videojuegos
- Crear/editar/eliminar juegos de mesa
- Gestionar ventas
- Administrar productos unificados (tabla Productos)
- Controlar stock, imágenes, precios y descripciones

Las vistas EJS permiten un backend seguro, controlado y rápido de renderizar.

## 🌐 Frontend Público

El cliente puede:

- Ver videojuegos
- Ver juegos de mesa
- Agregar ítems al carrito
- Generar un ticket de compra
- Descargar PDF del ticket (html2pdf.js)


## 🏗️ Relación entre Entidades

#### Videojuegos y Juegos de Mesa

Son entidades independientes, cada una con su propia tabla.

#### Productos (catálogo unificado)

###### La tabla Productos vincula:

* tipo_producto ⇒ "videojuego" o "juegodemesa"

* id_origen ⇒ referencia al ID de Videojuego o JuegoDeMesa

##### Esto permite tener un carrito único para ambos tipos.

#### Ventas y VentasProductos

* Relación muchos a muchos entre Ventas y Productos.

## 📦 Instalación y ejecución

```bash
git clone <repo>
cd Back
npm install
npm start
```
#### Variables de entorno `(.env):`

* ``` PORT=3000 ```
* ``` DB_DIALECT=sqlite ```
* ``` ADMIN_USER=admin ```
* ``` ADMIN_PASS=1234 ```

## 🚀 Mejoras futuras 

* Token JWT para el login admin

* Panel de gráficas de ventas

* Sistema de usuarios clientes registrados

* Pasarela de pagos

## 👨‍💻 Autores

### Ezequiel Siñeriz
### Ezequiel Do Campo
Trabajo Final – Programación III
Universidad Tecnologica Argentina – Año 2025


