import TronWeb from 'tronweb';

const TRON_NETWORK = 'https://api.shasta.trongrid.io'; // Use Shasta Testnet for testing

// Initialize TronWeb instance
const tronWeb = new TronWeb({
  fullHost: TRON_NETWORK,

});

// Add the TronLink integration
if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  tronWeb.setProvider(window.tronWeb);
}

export default tronWeb;
