export default class OrderItem {
    constructor(readonly price:number, readonly quantity:number){}
    
    getTotal(){
        return this.quantity * this.price
    }

}