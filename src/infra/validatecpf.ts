export default class Cpf {
  private CPF_VALID_LENGTH = 11;
  private FIRST_VERIFIED_DIGIT = 10;
  private SECOND_VERIFIED_DIGIT = 11;
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF');
    this.value = value;
  }

  validate(cpf: string) {
    if (!cpf) return false;
    const rawcpf = this.cleanCpf(cpf);
    if (rawcpf.length !== this.CPF_VALID_LENGTH) return false;
    if (this.allDigitsCpfEqual(rawcpf)) return false;
    const verifiedFirstDigitCpf = this.calculateDigit(
      rawcpf,
      this.FIRST_VERIFIED_DIGIT
    );
    const verifiedSecondDigitCpf = this.calculateDigit(
      `${rawcpf}${verifiedFirstDigitCpf}`,
      this.SECOND_VERIFIED_DIGIT
    );

    const verifiedDigit = this.extractVerifierDigit(rawcpf);
    const calculateDigitCpf = `${verifiedFirstDigitCpf}${verifiedSecondDigitCpf}`;
    return verifiedDigit == calculateDigitCpf;
  }
  allDigitsCpfEqual(rawcpf: string) {
    return rawcpf.split('').every((c) => c === rawcpf[0]);
  }
  calculateDigit(rawcpf: string, verifiedDigit: number) {
    let total = 0;

    for (let nCount = 1; nCount < rawcpf.length - 1; nCount++) {
      const digitcpf = parseInt(rawcpf.substring(nCount - 1, nCount));
      total += digitcpf * verifiedDigit--;
    }
    const rest = total % 11;

    const teste = rest < 2 ? 0 : 11 - rest;
    return teste;
  }
  cleanCpf(cpf: string) {
    return cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace(' ', '');
  }
  extractVerifierDigit(rawcpf: string) {
    return rawcpf.slice(9);
  }
}
