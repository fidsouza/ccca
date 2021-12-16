export default class OrderCode {
  orderCode: string;
  constructor(private sequence: number) {
    this.orderCode = this.generateCode(this.sequence);
  }

  private generateCode(sequence: number) {
    const year = new Date().getFullYear();
    const sequenceOrder = `${sequence}`.padStart(8, '0');
    return `${year}${sequenceOrder}`;
  }
}
