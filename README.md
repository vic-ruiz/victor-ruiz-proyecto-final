# Proyecto Back-End

## Es un proyecto de **Back-End** de una aplicación de **e-commerce**

## Variables de Entorno

- **PORT** - Puerto que utilizara nuestro servidor
- **MODO** - Determinar modo fork o cluster
- **MONGO_PASS** - String de conexion que brinda MongoDB para conectar base de datos a nuestra coleccion.
- **JWT_PRIVATE_KEY** - Clave de la firma de nuestro Token*emphasized text*
- **USER_SENDINGBLUE** - Usuario de nuestro servicio SMTP
- **PASS_SENDINGBLUE** - Password de nuestro servicio SMTP

Modificar en la carpeta public /js/index.js la variable **baseUrl** según la URL de nuestra api

### Tecnologías y dependecias 

1.  Node.Js
2.  MongoDB
3.  bcrypt
4.  dotenv
5.  ejs
6.  express
7.  express-session
8.  jsonwebtoken
9.  mongoose
10. nodemailer
11. socket.io
12. nodemon
13. webSockets
14. cluster
15. os
16. Bootstrap


### Instalar Dependencias

    npm install

### Levantar el servidor

**Modo Producción**

    npm start

**Modo Desarrollo (tener instalado Nodemon)**

    npm run mon

## Endpoints (link a documentacion de postman)

https://documenter.getpostman.com/view/20912596/UzBqo5VU

---

