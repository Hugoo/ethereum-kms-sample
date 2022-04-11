import 'dotenv/config';
import { ethers } from 'ethers';
import { GcpKmsSigner } from 'ethers-gcp-kms-signer';

const kmsCredentials = {
  projectId: process.env.PROJECT_ID, // your project id in gcp
  locationId: process.env.LOCATION_ID, // the location where your key ring was created
  keyRingId: process.env.KEY_RING_ID, // the id of the key ring
  keyId: process.env.KEY_ID, // the name/id of your key in the key ring
  keyVersion: process.env.VERSION_ID, // the version of the key
};

// (see EtherscanProvider above for other network examples)
const provider = new ethers.providers.AlchemyProvider(
  'ropsten',
  process.env.ALCHEMY_API_KEY,
);

let signer = new GcpKmsSigner(kmsCredentials);
signer = signer.connect(provider);

const main = async () => {
  const tx = await signer.sendTransaction({
    to: '0xE94E130546485b928C9C9b9A5e69EB787172952e',
    value: ethers.utils.parseEther('0.001'),
  });
  console.log(tx);
};

main();
