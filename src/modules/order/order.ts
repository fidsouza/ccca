import Cpf from '../../infra/validatecpf';
export default class Order {
  private orderItens: any[];
  cpf: Cpf;
  discount: number;

  constructor(cpf: string, discount?: number) {
    this.cpf = new Cpf(cpf);
    this.discount = discount || 0;
    this.orderItens = [];
  }

  addItem(description: string, price: number, quantity: number) {
    this.orderItens.push({ description, price, quantity });
  }
  totalItems() {
    return this.orderItens.length;
  }
  getTotal() {
    let total = 0;
    this.orderItens.map((item) => {
      if (this.discount > 0) {
        return (total += item.price - (item.price * this.discount) / 100);
      }
      total += item.price;
    });
    return total;
  }
}
