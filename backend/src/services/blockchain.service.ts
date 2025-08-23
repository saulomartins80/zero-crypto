import crypto from 'crypto';

export class BlockchainService {
  private readonly FINACASH_DECIMALS = 18;
  private readonly FEE_PERCENTAGE = 0.0025; // 0.25%

  // Gerar nova carteira
  async createWallet() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const publicKey = this.generatePublicKey(privateKey);
    const address = this.generateAddress(publicKey);

    return {
      address,
      publicKey,
      privateKey
    };
  }

  // Obter saldo da carteira (simulado - integrar com Substrate depois)
  async getBalance(address: string): Promise<number> {
    // Por enquanto, simulação - depois integrar com Substrate RPC
    return Math.floor(Math.random() * 10000);
  }

  // Transferir tokens
  async transfer(
    fromAddress: string,
    toAddress: string,
    amount: number,
    privateKey: string
  ): Promise<string> {
    // Calcular taxa
    const fee = amount * this.FEE_PERCENTAGE;
    const totalAmount = amount + fee;

    // Validar assinatura (simplificado)
    const transaction = {
      from: fromAddress,
      to: toAddress,
      amount,
      fee,
      timestamp: Date.now(),
      nonce: Math.floor(Math.random() * 1000000)
    };

    // Gerar hash da transação
    const txHash = this.generateTransactionHash(transaction);

    // Simular broadcast para a rede (depois integrar com Substrate)
    console.log(`Transação enviada: ${txHash}`);

    return txHash;
  }

  // Validar endereço
  isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  // Gerar chave pública a partir da privada
  private generatePublicKey(privateKey: string): string {
    return crypto.createHash('sha256').update(privateKey).digest('hex');
  }

  // Gerar endereço a partir da chave pública
  private generateAddress(publicKey: string): string {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return '0x' + hash.substring(0, 40);
  }

  // Gerar hash da transação
  private generateTransactionHash(transaction: any): string {
    const txString = JSON.stringify(transaction);
    return crypto.createHash('sha256').update(txString).digest('hex');
  }

  // Converter para unidade menor (como wei no Ethereum)
  toSmallestUnit(amount: number): bigint {
    return BigInt(Math.floor(amount * Math.pow(10, this.FINACASH_DECIMALS)));
  }

  // Converter da unidade menor para FINA
  fromSmallestUnit(amount: bigint): number {
    return Number(amount) / Math.pow(10, this.FINACASH_DECIMALS);
  }
}

export const blockchainService = new BlockchainService();
