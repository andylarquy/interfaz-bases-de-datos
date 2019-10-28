# TP Bases de Datos 2019 - Angular

Este proyecto se divide en:
- **Client**
- **Server**

Para correrlo es preciso instalar todas las dependencias necesarias del cliente y el servidor y ponerlos a correr:
### Cliente:

```
cd client
npm install
ng s -o
```

### Server:
```
cd server
npm install
npm run build
```
En una nueva terminal:
```
cd server
npm run dev
```

## API Rest:
En el server tenemos corriendo una API Rest.
El archivo index.ts es el encargado de inicializar y configurar el servicio.

Para añadir una solicitud http es preciso agregarla en el metodo routes:

```
 routes(): void {
        this.aplicacion.use('/',indexRoutes)
        this.aplicacion.use('/videos/getVideo', indexRoutes)
    }
```

Donde '/videos/getVideo' es la URL donde se aloja el servicio.

indexRoutes.ts es un archivo que contiene el codigo que se va a ejecutar al realizar una petición http
en un metodo config:
```
 config(): void {
        this.router.get('/', (req, res) => res.send('La API Rest está funcionando'))
        this.router.get('/videos/getVideo', indexController.getVideos())
 }
```
Es importante que las URL's esten bien escritas en ambos archivos.

indexController.ts es el archivo que tiene los metodos que se van a llamar para ejecutar las acciones. De modo que si hay que ejecutar muchas lineas de codigo al recibir una peticion el codigo sea legible.