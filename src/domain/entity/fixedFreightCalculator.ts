import Freight from './freightCalculator';
import Item from './item';

export default class FixedFreightCalculator implements Freight {
  calculate(item: Item): number {
    return 10;
  }
}
