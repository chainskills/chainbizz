import ChainBizz from '../../contracts/ChainBizz.json';

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [ChainBizz],
  events: {
    ChainBizz: ['NewProject', 'PublishedProject']
  },
  polls: {
    accounts: 150000
  }
};

export default drizzleOptions;
