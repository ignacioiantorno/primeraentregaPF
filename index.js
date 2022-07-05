import {products, cupones} from './data.js'

const cart = [];

class ProductCart{
    constructor(obj, qty){
        this.id = obj.id,
        this.name = obj.name,
        this.price = obj.price,
        this.quantity = qty
    }
}

const addProductToCart = (id, quantity=1) =>{

    const product = products.find(p => p.id == id)
    if(!product){
        return "El producto no existe";
    }
    if(product.stock <= quantity){
        return "No hay suficiente stock"
    }

    const productCart = cart.find(p => p.id == id);
    if(productCart){
        productCart.quantity += quantity
    }
    else{
        cart.push((new ProductCart(product, quantity)))
    }   
    
    product.quantity -= quantity;
    return cart;
}




const delProductToCart = (id, quantity=1) =>{
    const product = cart.find(p =>  p.id == id);
    if(!product){
        return "El producto no existe en el carrito"
    }

    product.quantity -= quantity;

    if(product.quantity < 1){
        const idx = cart.indexOf(p => p.id == id);
        cart.splice(idx-1,1);
        console.log('Producto ${product.name} eliminado del carrito');
    }

    return cart

}

const addCupon = (cupon) =>{
    const cuponFound = cupones.find(c => c.name == cupon && !c.apply);
    if(!cuponFound){
        return "El cupon no fue encontrado";
    }

    cuponFound.apply = true;

    cart.forEach((p) => {p.price = p.price * 0.85});
    return cart;
}

const precioTotal = () =>{
    const suma = cart.reduce((suma, p) => suma + (p.price * p.quantity), 0);    
    return `Total: ${suma}`
}

const searchProduct = (product  ) => {
    const productsFounds = products.filter(p => p.name.includes(product));
    if(productsFounds.length == 0){
        return "El producto no se ecuentra en el sitio";
    }

    return productsFounds;
}

console.table(addProductToCart(1,5));
console.table(addProductToCart(2,4));
console.table(addProductToCart(7,3));
console.table(delProductToCart(7,3));

const cupon = prompt("Ingrese su cupon de descuento").toUpperCase();
console.table(addCupon(cupon));
console.table(precioTotal());
const inputProd = prompt("Bienvenido a Guitar Store, Ingrese el nombre de la guitarra que busca ").toUpperCase();
console.table(searchProduct(inputProd)) 