import { Schema, model } from "mongoose";

const productSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
})

const cartSchema = new Schema({
    cart: {
        type: [productSchema],
        default: []
    }
})

export const cartsModel = model('Carts', cartSchema)