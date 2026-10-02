import { Keypair, TransactionBuilder } from "@stellar/stellar-sdk"

function signTransactionXdr(xdr: string, networkPassphrase: string, secretKey: string) {
  const keypair = Keypair.fromSecret(secretKey)
  const transaction = TransactionBuilder.fromXDR(xdr, networkPassphrase)
  transaction.sign(keypair)
  return transaction.toXDR()
}

export { signTransactionXdr }
