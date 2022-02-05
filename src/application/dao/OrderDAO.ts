export default interface OrderDAO {
  get(code: string): Promise<any>;
}
