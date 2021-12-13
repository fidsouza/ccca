import Item from './item';

export default interface Freight {
  calculate(item: Item): number;
}
