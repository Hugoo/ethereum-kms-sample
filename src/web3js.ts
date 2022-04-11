import Web3 from 'web3';
import { Account } from 'web3-core';

const web3 = new Web3();

// export interface Account {
//     address: string;
//     privateKey: string;
//     signTransaction: (
//         transactionConfig: TransactionConfig,
//         callback?: (signTransaction: SignedTransaction) => void
//     ) => Promise<SignedTransaction>;
//     sign: (data: string) => Sign;
//     encrypt: (password: string) => EncryptedKeystoreV3Json;
// }

const web3js = async () => {
  const kmsAccount: Account = {
    address: '0x',
    privateKey: undefined,
    signTransaction: undefined,
    sign: undefined,
    encrypt: undefined,
  };

  //   Object - The account object with the following structure:

  //   address - string: The account address.
  //   privateKey - string: The accounts private key. This should never be shared or stored unencrypted in localstorage! Also make sure to null the memory after usage.
  //   signTransaction(tx [, callback]) - Function: The function to sign transactions. See web3.eth.accounts.signTransaction() for more.
  //   sign(data) - Function: The function to sign transactions. See web3.eth.accounts.sign() for more.

  web3.eth.accounts.wallet.add(kmsAccount);
};

web3js();
