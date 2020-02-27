
# Backend con NODEJS - Carlos Hernández

# Presentacion -v1

Crear todo el Backend y la API de un chat como telegram. Vamos desde crear el servidor , servir estáticos, arquitectura escalable de un proyecto pequeño a muy grande.

## ¿Qué es nodejs y como instalarlo? - v2

Node js es ejecutar javascript en un entorno distinto al navegador (Terminal o servidor) y que se ejecuta con el motor v8.

Con node se pueden crear herramientas como:

* WebPack
* Babel
* PM2
* Electrón
* VsCode hecho en JS y ejecutado con electron hecho con node.
* TypeScript, etc.

Instalar node:

Para sistemas basados en debian instalar con los comandos:
```
sudo apt update
sudo apt install node
```

## ¿Qué son y como funcionan las peticiones HTTP? - v3

Una petición HTTP es un protocolo de comunicación que permite las transferencias de información entre cualquier elemento que esté en la web (servidores, maquinas, clientes, puntos de IoT) en la web.

Es el lenguaje común para todas las comunicaciones.

¿Cómo es una petición?

cliente -> Internet -> Servidor -> internet -> cliente
```
GET /index.html HTTP/1.1
Host: www.example.com
Referer: www.google.com
User-Agent: Mozilla/5.0
Connection: keep-alive
```

¿Como es una respuesta?
```
HTTP/1.1 200 OK
Date: Fri, 31 jun 2020
23:59:59 GMT
Content-Type: text/html
Content-Length: 1221


<html>... </html>
```
Puntos claves a tener en cuenta en toda petición HTTP:

* Métodos: Qué quieres hacer.

* Estado: Cómo ha ido la operación. (Fue bien, fue mal, ha redirigido a otro sitio, hay un error, ha dado error el servidor, tengo un error).

* Cuerpo: Lo que el servidor devuelve. (Información o archivos que se piden).

## Metodos, Cabeceras, y estados - v4

### Metodos.
Métodos HTTP: Es el verbo que le va pedir, decir o indicar en la petición que es lo que queremos hacer, de es manera sabemos si queremos coger, dejar, actualizar información. Los verbos principales son: 

* **GET:** Recoger información del servidor. **Ejemplo**: Informacion de un producto, listado de elementos, Ver pagina html o archivo css.

* **POST:** Añadir información al servidor. **Ejemplo**: Anadir producto, añadir formulario, crear un nuevo chat...
* **PUT:** Reemplazar información en el servidor. **Ejemplo**: Cambiar el contenido de una pagina, reaamplazar un producto por otro, Editar un mensaje...
* **PATCH:** Actualizar parte de la información. **Ejemplo**: Cambiar perfil de usuario, Modificar precio de un producto...
* **DELETE:** Eliminar totalmente información del servidor. **Ejemplo**: Eliminar un mensaje, eliminar producto del carrito de compras...
* **OPTIONS:** Pedir información sobre métodos (saber si podemos ejecutar alguno de los métodos anteriores). **Ejemplo**: Saber si podemos ejecutar POST, PUT, PATCH, DELETE...


### Cabeceras.

Dan Información contextual de la petición. **No es lo que quiero hacer, sino como quiero hacerlo**

Las cabeceras serán el envío al servidor de cómo queremos hacer la petición.

Que tipo de informacion pueden mandarlas:

#### En la request
* POST
* PUT
* PATCH

Podemos tener cabeceras de:

* Autenticación
* Caché
* Indicaciones
* Condiciones
* Cors: **Cross Origin Resource Sharing** que es compartir recursos entre diferentes origenes. Manejar información desde fuera de nuestro servicio (Access-Control-Allow-Origin)
* Cookies: Compartir información entre peticiones.

#### Accept
Define el tipo de contenido que acepta el sevidor.
* Accept
* Accept-Charset
* Accept-Encoding

#### Authorization
Utilizada para autenticación y para segurarme que puedo pedir cosas al servidor.

#### Caché
Que es un almacenamiento temporal. Le va ecir al cliente durante cuanto tiempo, la respuesta va ser la misma.
* Cache-Control
* Expires


### Los estados
Son números que indica el estado de la petición (si fue bien, fue mal, se ha redirigido...):

2XX: Todo ha ido bien.
* 200: ok
* 201: Crated

3XX: La petición se ha redirigido.
* 301: Moved permanently
* 304: Not modified

4XX: Errores del cliente.
* 400: Bad request
* 401: Unauthorized
* 403: Forbidden
* 404: Not found

5XX: Errores del servidor. Ha habido un error al procesar la petición.
* 500: Internal server error.


## Cuerpo y query de la petición - v5

### **El cuerpo** de la petición
El cuerpo de la petición es la información en sí que queremos añadir, enviar, editar o que el servidor nos devuelva.

#### ¿Qué tiene y como viene?
Depende de las cabeceras: 
* **Content-Type**
    * text/html
    * text/css
    * application/json
    * image/jpeg
    * application/json
    * aplication/xml

* **Content-Length**
    * 

### Las queries
Es información extra.
Van a permitirte añadir información extra a los datos que queramos enviarle al servidor.
* Orden en que quieres se devuelvan los datos.
* Parametros que quieres medir.

    **Ejemplo**: https://www.youtube.com/watch?v=WJ8KdQGFjEU&list=RDWJ8KdQGFjEU&start_radio=1

Es tambien una forma de compartir datos con el FrontEnd. Se debe tener cuidado ya que el usuario ve todos los datos que se envían. Nunca enviar información sensible.

Forma de envíar información:
* miweb.com/**utm_source**
* miweb.com/**?color=red**

#### Estructura de una query
Añadir: **?** al final de una URL, luego poner la estructura **nombre=valor**, si quiero poner más de uno van separados por **&** y de nuevo **clave=valor**.

## Crear un servidor HTTP desde NodeJS.
Iniciar npm y configurar:
```
npm init
```

Instalar npm y express:
(express es una librería para creación de servidores)
```
npm i
npm i express
```
Esta es la forma que tiene **nodejs** de traer modulos de cualquier otro sitio.
```
const express = require('express');
```
o tambien sirve la sintaxis de es6:
```
import express from 'express';
```
Iniciamos express:
```
var app = express();
```
Pedir que devuelva algo para ver que funciona:
```
app.use('/', (req, res) => res.send('Hola soy Server'));

o'

app.use('/', function (req, res) { res.send('Hola soy Server')
)};
```
Como la ponemos a ejecutarse y escuchar el server:
```
app.listen(3000);
console.log('La aplicación está escuchando http://localhost:3000');
```
Finalmente ejecutamos en consola:
```
node server
```

## ¿Como pueden venir las peticiones?

Una aplicación muy interesante para resolver peticiones HTTP es **'insomnia'**.

Primero definimos 'router' de 'express':
```
const router = express.Router();
```
El 'router' permite separar cabeceras, metodos, por URL... Usando router con cualquiera de los métodos (get, post, ...). Con esto tenemos acceso a todos los metodos y ruas que queramos crear en nuestro servidor.

## Recibir información desde el cliente: Body y Query

Para evitar levantar y tumbar el servidor en cada cambio realizado en código es recomendable usar la herramienta/paquete 'nodemon' que permite en cada cambio actualizar todo. Instalalo con:
```
sudo npm i -g nodemon
```
Luego de ello se ejecutará el server con:
```
nodemon server
```
### Body parser
Es un modulo de express que permite trabajar con el body de la petición de forma sencilla. Lo instalamos con:
```
npm i body-parser
```
Agregando al documento (server.js):
```
const bodyParser = require('body-parser');

```


