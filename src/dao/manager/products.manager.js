import {productsModel} from '../models/products.model.js'
import Manager from './manager.js'

class ProductsManager extends Manager{
    constructor(){
        super(productsModel)
    }
    async findAll(options){
        const {limit, page, query, sort} = options
        const opt = {
            limit : limit? limit : 10,
            page : page? page : 1,
            sort : sort
        }
        return productsModel.paginate(query, options)

        const info = {
            // estructura de como mostrar la info.
        }
    }
}

export const productsManager = new ProductsManager();
