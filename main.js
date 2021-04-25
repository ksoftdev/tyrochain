const { Block } = require('./block');
const { Chain } = require('./chain');

const { Transaction } = require('./transaction');

tyrocoin = new Chain();

tyrocoin.createTransaction(new Transaction('Bob', 'Alice', 100));
tyrocoin.createTransaction(new Transaction('Alice', 'Bob', 10));

console.log('\n Starting the miner...');
tyrocoin.minePendingTransactions('Cesar');

console.log('\nBalance of Cesar is', tyrocoin.getBalanceOfAddress('Cesar'));

console.log('\n Starting the miner again...');
tyrocoin.minePendingTransactions('Cesar');

console.log('\nBalance of Cesar is', tyrocoin.getBalanceOfAddress('Cesar'));

console.log(JSON.stringify(tyrocoin, null, 4));
