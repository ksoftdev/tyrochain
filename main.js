const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const { Block } = require('./block');
const { Chain } = require('./chain');

const { Transaction } = require('./transaction');

tyrocoin = new Chain();

const myKey = ec.keyFromPrivate('8ce9813b023cd2b5e95282e7ebaa585c6df8b42f5206d9d256ba9043064947ea');
const myWalletAddress = myKey.getPublic('hex');

const tx1 = new Transaction(myWalletAddress, '0460560258ed029823325c9251eacc7518a3cf7ba0c22650db184c41b01a5d86fd207043cb3507151236809a90ca3414c40c3ef42beb2d55b2dc4961a28df9869a', 10);
tx1.signTransaction(myKey);
tyrocoin.addTransaction(tx1);

const tx2 = new Transaction(myWalletAddress, '0460560258ed029823325c9251eacc7518a3cf7ba0c22650db184c41b01a5d86fd207043cb3507151236809a90ca3414c40c3ef42beb2d55b2dc4961a28df9869a', 5);
tx2.signTransaction(myKey);
tyrocoin.addTransaction(tx2);

console.log('\n Starting the miner...');
tyrocoin.minePendingTransactions('041d8be5ceffb9d20a810025b8b99b008a40237b32b477d56668b0050269f2df4fa8a4f16eb79d7940d9104209a71484ebecf9904a014a12c387820de0c796e8ae');

console.log('\nBalance of Cesar is', tyrocoin.getBalanceOfAddress(myWalletAddress));

console.log(JSON.stringify(tyrocoin, null, 4));

console.log('Is blockchain valid? ', tyrocoin.isChainValid());