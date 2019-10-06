export const getNetworkName = async web3 => {
  if (web3 === null) {
    return;
  }

  if (typeof web3.eth === 'undefined' || typeof web3.eth.net === 'undefined') {
    return;
  }
  const networkId = await web3.eth.net.getId();

  console.log('Network id: ' + networkId);

  let networkName = '';
  switch (networkId) {
    case 1:
      console.log('This is mainnet');
      break;
    case 2:
      console.log('This is the deprecated Morden test network.');
      break;
    case 3:
      console.log('This is the ropsten test network.');
      break;
    case 4:
      console.log('This is the rinkeby test network.');
      break;
    default:
      console.log('This is an unknown network.');
  }
};
