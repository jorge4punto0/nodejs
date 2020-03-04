
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

## Crear un servidor HTTP desde NodeJS - v6
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

## ¿Como pueden venir las peticiones? - v7

Una aplicación muy interesante para resolver peticiones HTTP es **'insomnia'**.

Primero definimos 'router' de 'express':
```
const router = express.Router();
```
El 'router' permite separar cabeceras, metodos, por URL... Usando router con cualquiera de los métodos (get, post, ...). Con esto tenemos acceso a todos los metodos y ruas que queramos crear en nuestro servidor.

## Recibir información desde el cliente: Body y Query - v8

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


## Información contextual: Leer las cabeceras - v9

Nos diran de donde viene la petición.

## Tipos de respuesta: Vacía, plana, con datos y estructurada -v10

Es debido ponerle sentido a lo que se responde.

Podemos enviar respuestas vacías, plana, con datos y estructurada. Respuestas:

* Vacía
```
res.send();
```
* Plana
```
res.status(201).send();
```
* Estructurada (un objeto con una serie de información)
```
res.status(201).send({error: '', body: 'Creado correctamente'});
```
Tecnicamente podemos devolver como respuesta lo que queramos. arrays, objetos y todo lo anidado que se quiera.

## Respuestas coherentes - v11

Es importante que las respuestas de una petición http sean coherentes, fácil de entender, fácil de usar. Para ello es importante **'crear un módulo'** que se encargue de responder nuestras peticiones. Ese modulo es 'response.js'

## Servir archivos estaticos

Algo importante es servir estaticos (html, css, js) javascript y nodejs es buenisimo para servir cualquier tipo de petición porque no se bloquéa. Pa hacerlo debemos usar el servidor de estaticos de express:
```
app.use('/app', express.static('public'));
```
A partir de aquí todas las rutas que pidamos las va ir a buscar en la carpeta **'public'**. Usar la capeta 'public' es buena practica.
Así que si ya tenemos una aplicacion de frontend la monemos en dicha carpeta y podemos servirla.

## Errores: como presentarlos e implicaciones en seguridad.

Es importante entender las implicaciones de construir un Backend. Al usuario es importante darle información mínima, no podemos andar dandole información de que por ejemplo existe un usuario. Es decir separar la información de los errores que es importante que sepamos a detalle y por otra parte la que se le ofrece al usuario que debe ser mínima, coherente y pertinente ya que esto podria tener implicaciones en la seguridad de nuestro sitio o para el mismo usuario. Para ello tenemos los **'logs'** para que nosotros si podamos saber con exactitud lo que ha pasado.

Puedo tener en mi petición de 'response' los **'details'** y tener los detalles del error:
```
exports.error = function (req, res, message, status, details) {
    console.error(details);
    
    res.status(status || 500).send({
        error: message,
        body: '',
    });
}
```
Que me va permitir? - Tener siempre un 'log' de lo sucedido y un mensaje que le doy al usuario que no tiene porqué ser el mismo.

## Conceptualmente: Rutas, controladores y bases de datos.

¿cómo va a ser toda la arquitectura de nuestra aplicación?

Separar conceptualmente rutas, controladores y almecenamiento y saber que es importante separarlo tanto en conceptos como en archivos.

Ver de donde van a llegar las peticiones (servidor, ordenador, telefono, ...)

* **Internet**: es de donde vienen las peticiones. el cual las envía al servidor.

* **Servidor**:El que globaliza o contine los servicios de este. Dentro de el están:
    * **server.js**: Que se encarga de comprobar que las peticiones son correctas para poder entrarlas en nuestro servidor o directamente cancelarlas si algo no anda bien. Tambien de encarga de configurar toda la info importante (**dase de datos, cabeceras, todo todo,...**) ¿Donde enviara server.js esa info? Para ello vamos a tener un archivo llamado **router.js**. 

    * **router.js**: Este archivo es exclusivamente de red. Donde van a estar gestionadas todas nuestras rutas. Va ver hacia donde quiere ir la petición y llama al **'componente'** adecuado.

    * **response.js.js**: Encargado de manejar TODAS las respuestas de nuestro server.

    * **components**: Es una carpeta que aloja los diferente componentes de nuestro server y que irá cada uno en su propia carpeta la cual debería tener el nombre de sus componetes (message).
        * **Carpeta message**: Va tener toda la info de nuestros mensajes (endpoints, acciones, lógica relacionada, donde se almacena, etc.)
            * **network.js**: Es un archivo de rutas. Vamos a poner endpoints e info relacionado con el protocolo HTTP.
            * **controller.js**: Es el que va tener toda la **lógica** de nuestro componente de mensajes (fecha, llamados a otros componentes modificar mensaje, comprobaciones, etc) Es lo que le llama **lógica de negócio**.
            * **store.js**: Encargado exclusivamente de manejar las bases de datos. Donde y como se guarda la información.
        * **Carpeta user**: Va tener toda la info de nuestroS usuaríos (endpoints, acciones, lógica relacionada, donde se almacena, etc.) De la misma manera que message pero para los usuarios.
            * **network.js**
            * **controller.js**
            * **store.js**

Una las grandes ventajas de sepapar conceptual y fisicamente componentes es que al momento de realizar modificaciones solo tendremos que tocar unos de los componentes en especifico.
De este modo es 100% escalable y poder crecer todo lo que queramos.
    

## Rutas y capa de red: Responsabilidades y limite

Cualquier aplicación va a tener tres puntos de responsabilidad, que deben responder a tres preguntas:

* ¿Cómo me comunico con ella?
* ¿Qué hace?
* ¿Dónde y cómo se guardan los resultados?


La respuesta a estos tres puntos, corresponden a las tres capas que vamos a generar:
* Capa de red(en inglés “network”)
* Capa controladora(en inglés, “controller”)
* Capa de almacenamiento(en inglés, “store”)

(De esto hablo en profundidad en la clase anterior.)

La primera capa es una capa de red, porque la conexión con la aplicación se hace a través del protocolo de comunicación en red HTTP. Es la responsable de comunicar al cliente HTTP con nuestro código del controlador.

Si recuerdas las primeras clases, verás que el protocolo HTTP construye una petición con una dirección (route), un verbo (method), unas cabeceras (headers) y un mensaje (body).

Por esto, cada uno de nuestros componentes, tendrá un archivo “network.js” encargado de traducir la petición del cliente HTTP a la acción que queremos realizar en nuestro controlador.

Así, lo que hace nuestro código (la funcionalidad) no está acoplado a unos requisitos de red, y puede ser reutilizado con otras fuentes de entrada (colas MQTT, una biblioteca externa, microservicios…).
.
La opción que planteas, llamarlo “interface” en lugar de network es también una opción válida. En caso de que tu carpeta se llame interface (o, quizá mejor, “interfaces”), llama a tu archivo “http-response.js” para poder generar nuevas interfaces de escucha o/y respuesta no HTTP.

## Controladores: Definiendo la lógica del negocio

Ya teniendo la capa de red separada, falta una parte de gan importancia, y es la **'lógica'**, que es lo que va suceder con nuestros archivos.

controller : encargado de definir todo lo que se hace creando las funciones necesarias.

## Almacenando informacion en una base de datos - v17

Una parte importante por agregar es donde guardaremos toda la información.
Se separara toda la lógica de almacenamiento en **'store.js'** creando un **mock** para simular que todo anda bien.

## Tipos de DB: Relacionales y no relacionales - v18

**Bases de Datos Relacionales:** no es una base de datos muy flexible, pero tiene a favor su gran soporte y el enorme desarrollo en herramientas para su uso. Si necesitamos cambiar un valor de un campo debemos hacerlo con todos los campos de nuestra BD, en cambio con NoSQL o No Relacional no es así.

Postgre

**Bases de Datos NO Relacionales:** son de bases de datos sin una tabla fija como las que sí se encuentran en las bases de datos relacionales, lo que permite una alta escalabilidad en ellas. Además, es abierta y por lo tanto flexible a diferentes tipos de datos y no necesita tantos recursos para ejecutarse; de hecho, el hardware necesario no cuesta mucho.
Algunos tipos de NoSQL:

* clave-valor
* Documentales
* Grafos

## Creacion de la DB en MongoDB Atlas - v19


## MongoDB 1: Almacenar y leer datos - v20

MongoDB no tiene 'esquemas' pero no es buena practica trabajar sin esquemas porque no sabemos el tipo de informacion que habra en nuestra DB y es muy importante saber lo que almacenamos, como lo almacenamos y porqué.

Para solucionarlo usaremos una librería llamada 'mongoose', que permite crear esquemas por software/código para nuestra DB y poder definir y cambiarlos de forma muy sencilla. Se encarga de hacer la validación de datos y en caso de que no validen no los guarda en la DB,  esto previene de ataques o fallos de consistencia dentro de la información o base DB.

Nota: MongoDB es de esquema libre, lo que implica que cada registro puede tener un esquema de datos distinto.

Creamos 'model.js' e instalamos 'mongoose'
```
npm i mongoose
```

## MongoDB 2: Actualizar datos - v21

* Actualizacion de datos
* Consultas más especificas
* Como eliminar registros

## MongoDB 3: Consultar datos - v22

## MongoDB 3: Eliminar datos - v23






