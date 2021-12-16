import Item from '../../../../domain/entity/item';

export default class SimulateFreightInput {
  constructor(readonly items: Item[]) {}
}
