import Freight from './freightCalculator';
import item from './item';

export default class DefaultFreight implements Freight {
  calculate(item: item): number {
    if (!item.weight || !item.width || !item.height || !item.length) return 0;
    const distance = 1000;
    const freight = (distance * item.getVolume() * item.getDensity()) / 100;
    const minFreight = 10;
    return Math.max(minFreight, freight);
  }
}
