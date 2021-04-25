const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(height, timestamp, transactions=[], previousHash=''){
        this.height = height;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
        this.difficulty = 0;
    }

    calculateHash(){
        return SHA256(this.height + this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.difficulty).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.difficulty++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

module.exports.Block = Block;