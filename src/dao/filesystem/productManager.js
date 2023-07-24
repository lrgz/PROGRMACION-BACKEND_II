/**
 * SECCION IMPORT
 */
const fs = require("fs");


/**
 * ProductManager clase que implementa los siguientes metodos:
 *
 *   - addProduct ( incorporacion de un nuevo producto)
 *   - getProducts ( retorna todos los productos)
 *   - getProductById ( retorna un producto por su id de identificacion)
 *
 * @author  Rodrigo Zerrezuela (RZ)
 * @version 2.0.0
 * @since   2023-04
 */
class ProductManager {
  /**
   * fields  atributo que contiene los campos obligatorios del objeto
   */
  fields = ["title", "description", "code","price","status","stock","category"]; //lista de campos obligatorios

  /**
   * Constructor  metodo de inicial del objeto
   * en el cual se inicializa los atributos del objeto
   * @param   file ruta y nombre del archivo donde se almacenaran los productos
   */
  constructor(file) {
    this.products = []; // array de productos
    this.id = 1; // id unico de identificacion de producto autoincremental
    this.path = file; // ruta y nombre del archivo de productos
     // creo el archivo de producto si es necesario y cargo el atributo products
  }

  /**
   * addProduct  metodo para agregar un producto
   * @param product  contiene los datos del producto a agregar
   * @return
   *           - 'This code already exists' - se informo un producto con code ya existente
   *           - 'Fields missing' - esta faltando informar un campo requerido
   *           - 'Product added' - proceso exitoso se agrego el producto
   */
  async addProduct(product) {
     /**
     * SECCION DE VERIFICACIONES
     */


    //verifico codigo producto unico
    let verifyCode = this.products.find((p) => p.code === product.code);

    // ya exite un producto con el codigo informado
    if (verifyCode) {
      throw new Error ("This code already exists");         
    }

    //Esta faltando algun campo obligatorio
    if (!this._checkFiels(product, this.fields)) {
      throw new Error  ("Fields missing")
     
    }

    /**
     * SECCION DE PROCESO
     */

    let newProduct = { ...product, id: this.id }; // incorporo el id al producto informado
    this.products.push(newProduct); // agrego el producto al listado de productos
    this.id++; // incremento el id

    //grabo en el archivo
    await this._saveDataFS(this.products);

    return "OK"
  }

  /**
   * getProducts  metodo para buscar un producto por el id
   * @return
   *           - product - se retorna el listado de productos
   *           - 'Empty list of products' - en caso de que la lista este vacia
   */
  async getProducts() {
    this.products = await this._getDataFS();
    let answer =
      this.products.length === 0
        ? "Empty list of products"
        :this.products;
    return answer;
  }

  /**
   * getById  metodo para buscar un producto por el id
   * @param id  es el id del producrto que se desea buscar
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - product - se retorna el producto encontrado con el id informado
   */
  async getById(id) {
    // leo el archivo y cargo los productos
    let arrayProducts = await this._getDataFS();

    //busco el producto
    let searchProduct = (nameKey, arrayProducts) => {
      for (let i = 0; i < arrayProducts.length; i++) {       
         
        if (arrayProducts[i].id === nameKey) {                    
          return arrayProducts[i];
        }
      }
      return "Not found";
    };
    return searchProduct(parseInt(id), arrayProducts);
  }

  /**
   * updateProduct metodo para actualizar un producto por el id
   * @param id  es el id del producrto que se desea buscar
   * @param product  es el nuevo set de datos del producto
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - 'Fields missing' - el producto no esta completo en sus atributos
   *           - 'Product update' - proceso exitoso se actualizo el producto
   */
  async updateProduct(id, product) {    

    
    //verifico que este bien la informacion del producto
    //Esta faltando algun campo obligatorio
    if (!this._checkFiels(product, this.fields)) {
      return "Fields missing";
    }

    //busco el index del elemento a modicar
    const indexElement = this.products.findIndex((pr) => pr.id == id);

    //verifo si existe para reralizar elcambio
    if (indexElement >= 0) {
      let newProduct = [...this.products];
      newProduct[indexElement] = { ...product, id: id };
      this.products = newProduct;
      await this._saveDataFS(this.products);
      return "Product update";
    } else {
      return "Not found";
    }
  }

  /**
   * deleteProduct  metodo para eliminar un producto por el id
   * @param id  es el id del producrto que se desea eliminar
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - 'Product update' - proceso exitoso se actualizo el producto
   */
  async deleteProduct(id) {
    //busco el index del elemento a modicar
    let indexElement = this.products.findIndex((pr) => pr.id == id);

    //verifo si existe para reralizar elcambio
    if (indexElement >= 0) {
      // elimino el producto
      this.products.splice(indexElement, 1);
      await this._saveDataFS(this.products);
      return "Product delete";
    } else {
      return "Not found";
    }
  }

  /**
   * _initFS  metodo para crear el archivo de prtoductos si no existe
   */
  async _initFS() {
    // verifico si exite el archivo lo borro y lo inicializo
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, "[]", "utf8");
    }
    this.products = await this._getDataFS();
  }

  /**
   * _getDataFS  metodo para obteer el contenido del archivo
   *
   * @return
   *           - Lista de todos  productos
   */
  async _getDataFS() {
    const fileContent = await fs.promises.readFile(this.path, "utf8");
    const result = JSON.parse(fileContent)    
    this.id=this._getMax(result,'id') + 1
    return result;
  }

  /**
   * _saveDataFS  metodo para almacenar los producrtos en el archivo
   * @param info  es el objetio que contiene a todos los productos
   */
  async _saveDataFS(info) {
    await fs.promises.writeFile(this.path, JSON.stringify(info));
  }

  /*+
   * checkFiels  metodo para verificar que el producto informado cuenta con toda la data
   * @param product  contiene el producto a verificar
   * @param fields   contiene los atributos a controlar del producto
   * @return
   *           - true - el producto esta ok
   *           - false - el producto tiene atributos faltantes
   */
  _checkFiels(product, fields) {
    for (let x = 0; x < fields.length; x++) {
      if (!Object.keys(product).includes(fields[x])) {
        return false;
      }
    }
    return true;
  }

   _getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max.id;
}
}

module.exports = ProductManager;