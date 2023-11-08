import { cartsModel } from '../models/carts.model.js'
import Manager from './manager.js';
import { productsManager } from './products.manager.js';

class CartsManager extends Manager {
    constructor() {
        super(cartsModel)
    }



    async addProdToCart(cid, pid) {
        // TEST: http://localhost:8080/api/carts/654acfec48a93452f4574154/product/6530cc0f5485577be08cd83e
        try {
            let cart = await this.findByID(cid)
            let product = await productsManager.findByID(pid)

            if (!cart) {
                throw new Error("Cart not found");
            }

            if (!product) {
                throw new Error("Cart not found");
            }

            const prod = cart.cart.find(
                (p) => p.product == pid
            );

            if (prod){
                // agregar 1 en el quantity
                prod.quantity+=1
            } else {
                // agregar el producto por primera vez
                const obj = {
                    cart: [
                        {
                            product: pid,
                            quantity: 1
                        }
                    ]
                }

                cart.cart = [ ...cart.cart, ...obj.cart]
            }
            const res = await this.updateOne(cart._id, cart)
            return res;
        } catch (error) {
            return error
        }
    }

    async deleteProdFromCart(cid, pid) {
        try {
            const cart = await this.findByID(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const product = cart.products.find(
                (product) => product.productId === pid
            );
            if (!product) {
                throw new Error("This product doesn't exists.");
            }
            if (product.quantity > 1) {
                let arr = cart.products.map(objeto => {
                    if (objeto.productId === pid) {
                        objeto.quantity--;
                    }
                    return { ...objeto };
                });
                cart.products = arr
            } else {
                cart.products = cart.products.filter(
                    (product) => product.productId !== pid
                );
            }
            const res = await this.updateOne(cid, cart)
            return "Product deleted";
        } catch (error) {
            return error
        }
    }

}

export const cartsManager = new CartsManager();
