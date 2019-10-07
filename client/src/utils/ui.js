export const getNetworkName = async web3 => {
  if (web3 === null) {
    return;
  }

  if (typeof web3.eth === 'undefined' || typeof web3.eth.net === 'undefined') {
    return;
  }
  const networkId = await web3.eth.net.getId();

  let networkName = '';
};
