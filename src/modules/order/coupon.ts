export default class Coupon {
  constructor(
    readonly code: String,
    readonly discount: number,
    readonly dateExpiration?: Date
  ) {}
  isExpired(today: Date = new Date()) {
    if (!this.dateExpiration) return false;
    return this.dateExpiration.getTime() < today.getTime();
  }
}
