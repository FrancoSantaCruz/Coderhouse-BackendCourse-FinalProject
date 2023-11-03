import {messagesModel} from '../models/messages.model.js'

class MessagesManager {
    async findAll(){
        return messagesModel.find().lean()
    }
    async findByID(id){
        return messagesModel.findById({_id: id}).populate('chats.autor')
    }
    async createOne(obj){
        return messagesModel.create(obj)
    }
    async updateOne(id, obj){
        return messagesModel.updateOne({_id: id}, obj)
    }
    async deleteOne(id){
        return messagesModel.deleteOne({_id: id})
    }
}

export const messagesManager = new MessagesManager();

