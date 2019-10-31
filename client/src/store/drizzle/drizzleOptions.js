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
    ChainBizz: [
      'NewProject',
      'UpdateProject',
      'RemoveProject',
      'PublishedProject',
      'UnpublishedProject',
      'OfferSubmitted',
      'OfferCanceled',
      'AcceptProposal',
      'RejectProposal',
      'ProjectDelivered',
      'ServicesCanceled',
      'DeliveryAccepted',
      'DeliveryRejected',
      'ContractCanceled'
    ]
  }
};

export default drizzleOptions;
