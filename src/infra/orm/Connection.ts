export default interface Connection {
  isConnected(): Promise<String>;
}
