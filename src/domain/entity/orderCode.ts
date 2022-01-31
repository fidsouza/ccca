export default class OrderCode {
  readonly orderCode: string;
  constructor(private sequence: number, private year: Date) {
    this.orderCode = this.generateCode(this.sequence);
  }

  private generateCode(sequence: number) {
    const year = new Date(this.year).getFullYear();
    const sequenceOrder = `${sequence}`.padStart(8, '0');
    return `${year}${sequenceOrder}`;
  }
}
