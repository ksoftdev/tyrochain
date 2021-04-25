const { Block } = require('./block');
const { Transaction } = require('./transaction');

class Chain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.height = 0;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), [], "0x0000");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        this.height++;

        let block = new Block(this.height, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);
        console.log('Block successfully mined!!');

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];

        console.log('New miner transfer to: ', miningRewardAddress, ' of value: ', this.miningReward);
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address ){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()){
                console.log('Blockchain has invalid transactions!');
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log('Block hash is inconsistent!');
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                console.log('Previous block hash is not valid!');
                return false;
            }
        }
        return true;
    }
}

module.exports.Chain = Chain;