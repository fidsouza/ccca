import Cpf from './validatecpf';
describe('Validate Cpf', () => {
  test('should be verified if cpf is valid', () => {
    const cpfValid = '619.443.000-15';
    const cpf = new Cpf(cpfValid);
    expect(cpf.value).toBe(cpfValid);
  });
  test('should be verified if cpf is incorrect', () => {
    const cpfInvalid = '111.111.111-11';
    expect(() => new Cpf(cpfInvalid)).toThrow(new Error('Invalid CPF'));
  });
});
