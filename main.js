const { Block } = require('./block');
const { Chain } = require('./chain');

tyrocoin = new Chain();

tyrocoin.addBlock(new Block(1, Date.now(), {from: 'Bob', to: 'Alice', amount: 50}));
tyrocoin.addBlock(new Block(2, Date.now(), {from: 'Alice', to: 'Grace', amount: 15}));

console.log(JSON.stringify(tyrocoin, null, 4));
