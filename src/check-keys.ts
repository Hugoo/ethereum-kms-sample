import { KeyManagementServiceClient } from '@google-cloud/kms';
import 'dotenv/config';
import createKeccakHash from 'keccak';
import Web3 from 'web3';

const web3 = new Web3();

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the key name
const versionName = client.cryptoKeyVersionPath(
  process.env.PROJECT_ID,
  process.env.LOCATION_ID,
  process.env.KEY_RING_ID,
  process.env.KEY_ID,
  process.env.VERSION_ID,
);

const main = async () => {
  // Get public key
  const [publicKey] = await client.getPublicKey({
    name: versionName,
  });

  console.log(publicKey);

  const pem = publicKey.pem;

  const b64Final = pem
    .replace(/\n/g, '')
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '');

  const buffer = Buffer.from(b64Final, 'base64');
  const pemHex = buffer.toString('hex');

  const pemHexWithoutHeader = pemHex.slice(2 * 24);

  const hash = createKeccakHash('keccak256')
    .update(Buffer.from(pemHexWithoutHeader, 'hex'))
    .digest();
  const address = '0x' + hash.slice(-20).toString('hex');

  console.log('Checksum address:', web3.utils.toChecksumAddress(address));
};

main();
