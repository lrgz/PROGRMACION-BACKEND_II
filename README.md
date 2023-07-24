# Programacion Backend

Este repositorio contiene las entregas de la _comision 51380_

<br>
<br>

## Segunda pre-entrega  de tu Proyecto final 🚀

Deberás entregar el proyecto que has venido armando, cambiando persistencia en base de datos, 
además de agregar algunos endpoints nuevos a tu ecommerce

- Contarás con Mongo como sistema de persistencia principal

- Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos

- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.


<br>
<br>

## Segunda pre-entrega 🚀

Se debera realizar una clase llamada _ProductManager_ que gestione un conjunto de productos

- Debe contar con un método _updateProduct_ el cual debe buscar en el
  arreglo el producto que coincida con el id

        - En caso de no coincidir ningún id, mostrar en consola un error  
          “Not found”
        - En caso de estar todo ok se va a mostar en consola el siguiente mensaje
          “Product update”


- Debe contar con un método _deleteProduct_ el cual debe buscar en el
  arreglo el producto que coincida con el id

        - En caso de no coincidir ningún id, mostrar en consola un error  
          “Not found” 
        - En caso de estar todo ok se va a mostar en consola el siguiente mensaje
          “Product delete”

- Se incorpora el manejo de archico para almacenar los productos

<br>
<br>


## Tercera pre-entrega 🚀

Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:


- Ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto agregar el soporte para recibir por query 
  param el valor ?limit= el cual recibirá un límite de resultados

        - Si no se recibe query de límite, se devolverán todos los productos
        - Si se recibe un límite, sólo devolver el número de productos solicitados
        

- Ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, 
  en lugar de todos los productos

## Primera Practica Integradora 🚀

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos


- Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.

- Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus     
  respectivos schemas.

- Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una 
  carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase

- Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”

- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem

- __NO ELIMINAR__ FileSystem de tu proyecto.

- Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.

## Implementación de login. 🚀

Ajustar nuestro servidor principal para trabajar con un sistema de login.


- Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el 
  login. 

- En lugar de realizar una redirección a la vista “/profile”, realizar la redirección directamente a la vista de productos.

- Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario

- Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y una contraseña predefinida 
  por ti, el usuario de la sesión además tenga un campo 

- Todos los usuarios que no sean admin deberán contar con un rol “usuario”.

- Usuario admin 
                - email:adminCoder@coder.com,
                - password:CH851

<br>
<br>

# Primera Practica Integradora 🚀

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos


- Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.

- Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus     
  respectivos schemas.

- Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una 
  carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase

- Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”

- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem

- __NO ELIMINAR__ FileSystem de tu proyecto.

- Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.





<br>
<br>

## Construido con 🛠️

Para la construccion de este proeycto se utilizaron lasssss siguientes herramientas : 

* [Nodejs](https://nodejs.org/en) 
* [ExpressJS](https://expressjs.com/) 
* [ECMAScript](https://tc39.es/ecma262/)
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [vsCode](https://code.visualstudio.com/)

<br>
<br>

## Autor(es) ✒️


* **Rodrigo Zerrezuela** - *Trabajo Inicial / Proyecto * - [lrgz](https://github.com/lrgz)


<br>
<br>

---
⌨️ por [lrgz](https://github.com/lrgz) 😊