const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(height, timestamp, transactions=[], previousHash=''){
        this.height = height;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
        this.difficulty = 4;
    }

    calculateHash(){
        return SHA256(this.height + this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.difficulty).toString();
    }
}

module.exports.Block = Block;