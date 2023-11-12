import { productsModel } from '../models/products.model.js'
import Manager from './manager.js'

class ProductsManager extends Manager {
    constructor() {
        super(productsModel)
    }

    async findAllPg(options) {
        const { limit, page, category, status, sort } = options
        let filters = {}

        const opt = {
            page : page ? page : 1,
            limit : limit ? limit : 10,
            sort : sort == "-1" ? {price : -1} : {price : 1}
        }

        if(status){
            filters.status = status
        }
        if(category){
            filters.category = category
        }

        const products = await productsModel.paginate( filters, opt )
        const info = {
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null
        }

        return info
    }
}


export const productsManager = new ProductsManager();

/*
"totalDocs":17,
"offset":0,
"limit":10,
"totalPages":2,
"page":1,
"pagingCounter":1,
"hasPrevPage":false,
"hasNextPage":true,
"prevPage":null,
"nextPage":2}
*/