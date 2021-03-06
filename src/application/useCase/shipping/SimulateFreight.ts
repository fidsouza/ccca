import Freight from '../../../domain/entity/freightCalculator';
import ItemRepository from '../../../domain/repository/ItemRepository';
import SimulateFreightInput from './dto/SimulateFreightInput';
import SimulateFreightOutPut from './dto/SimulateFreightOutPut';

export default class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly freightCalculator: Freight
  ) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutPut> {
    let freight = 0;
    for (const itemInput of input.items) {
      const item = await this.itemRepository.findById(itemInput.idItem);
      if (!item) throw new Error('Item not found');
      freight += this.freightCalculator.calculate(item) * itemInput.quantity;
    }
    return new SimulateFreightOutPut(freight);
  }
}
