import DefaultFreight from '../entity/defaultFreight';
import FixedFreightCalculator from '../entity/fixedFreightCalculator';

export default class FreightFactoryBuilder {
  static create(type: string) {
    if (type === 'fixed') return new FixedFreightCalculator();
    return new DefaultFreight();
  }
}
