import Cpf from './validatecpf';
describe('Validate Cpf', () => {
  test('Deve verificar se um cpf valido', () => {
    const cpfValid = '619.443.000-15';
    const cpf = new Cpf(cpfValid);
    expect(cpf.value).toBe(cpfValid);
  });
  test('Deve verificar se e um cpf inválido', () => {
    const cpfInvalid = '111.111.111-11';
    expect(() => new Cpf(cpfInvalid)).toThrow(new Error('Invalid CPF'));
  });
});
