export default class PlaceOrderInput {
  constructor(
    readonly cpf: string,
    readonly orderItems: { id_item: number; quantity: number }[],
    readonly date: Date,
    readonly coupon?: string
  ) {}
}
