import * as CONFIG from "../config/keys";

class UtilService {

  static getERC20Address = (chain) => {
    switch (chain) {
      case '0x13881':
        return CONFIG.MUMBAI_ERC20_ADDRESS;
      case '0x61':
        return CONFIG.BSCT_ERC20_ADDRESS;
      case '0x4':
        return CONFIG.RINKEYBY_ERC20_ADDRESS;
      case '0x3':
        return CONFIG.ROPSTEN_ERC20_ADDRESS;
      case '0x1':
      default:
        return CONFIG.MAIN_ERC20_ADDRESS;
    }
  }

  static getMarketAddress = (chain) => {
    switch (chain) {
      case '0x13881':
        return CONFIG.MUMBAI_MARKETPLACE_ADDRESS;
      case '0x61':
        return CONFIG.BSCT_MARKETPLACE_ADDRESS;
      case '0x4':
        return CONFIG.RINKEYBY_MARKETPLACE_ADDRESS;
      case '0x3':
        return CONFIG.ROPSTEN_MARKETPLACE_ADDRESS;
      case '0x1':
      default:
        return CONFIG.MAIN_MARKETPLACE_ADDRESS;
    }
  }

  static getChain = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'Mumbai';
      case '0x61':
        return 'Binance Smart Chain Testnet';
      case '0x4':
        return 'Rinkeby';
      case '0x3':
        return 'Ropsten';
      case '0x1':
      default:
        return 'eth';
    }
  }

  static getChain2 = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'Polygon Mumbai network';
      case '0x61':
        return 'Binance Smart Chain network';
      case '0x4':
        return 'Rinkeby network';
      case '0x3':
        return 'Ropsten network';
      case '0x1':
      default:
        return 'Ethereum network';
    }
  }

  static getChain3 = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'MATIC';
      case '0x61':
        return 'BSC';
      case '0x4':
      case '0x3':
      case '0x1':
      default:
        return 'ETH';
    }
  }

  static checkHexa = (num) => {
    return Boolean(num.match(/^0x[0-9a-f]+$/i))
  }

  static toHex = (bytes) => {
    return bytes.reduce(function (string, byte) {
      return string + ("00" + byte.toString(16)).substr(-2);
    }, '');
  }

  static CurrencyIcon(e) {
    if (e === '0x13881') return 'https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png'
    else if (e === '0x61') return 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/128/Binance-Coin-icon.png'
    else return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png'
  }

  static getMint721Address = (chain) => {
    switch (chain) {
      case '0x13881':
        return CONFIG.MUMBAI_MINT721_ADDRESS;
      case '0x61':
        return CONFIG.BSCT_MINT721_ADDRESS;
      case '0x4':
        return CONFIG.RINKEYBY_MINT721_ADDRESS;
      case '0x3':
        return CONFIG.ROPSTEN_MINT721_ADDRESS;
      case '0x1':
      default:
        return CONFIG.MAIN_MINT721_ADDRESS;
    }
  }

  static getMint1155Address = (chain) => {
    switch (chain) {
      case '0x13881':
        return CONFIG.MUMBAI_MINT1155_ADDRESS;
      case '0x61':
        return CONFIG.BSCT_MINT1155_ADDRESS;
      case '0x4':
        return CONFIG.RINKEYBY_MINT1155_ADDRESS;
      case '0x3':
        return CONFIG.ROPSTEN_MINT1155_ADDRESS;
      case '0x1':
      default:
        return CONFIG.MAIN_MINT1155_ADDRESS;
    }
  }

  static FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  static truncate = (address) => {
    if (!address) {
      return '-'
    }
    return address?.substr(0, 6) + '...' + address?.substr(-4);
  }

  static truncate2 = (address) => {
    if (!address) {
      return '-'
    }
    return address?.substr(0, 9) + '...' + address?.substr(-9);
  }
}

export default UtilService;