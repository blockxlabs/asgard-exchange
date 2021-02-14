import { CoinIconsFromTrustWallet } from 'src/app/_const/icon-list';
import { Chain } from '@xchainjs/xchain-util';

export class Asset {

  chain: Chain;
  symbol: string;
  ticker: string;
  iconPath: string;

  constructor(poolName: string) {
    const {chain, symbol, ticker } = this.getAssetFromString(poolName);
    this.chain = chain;
    this.symbol = symbol;
    this.ticker = ticker;

    const trustWalletMatch = CoinIconsFromTrustWallet[this.ticker];

    if (trustWalletMatch) {
      this.iconPath = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/${trustWalletMatch}/logo.png`;
    } else {
      // Override token icons when not found in trustwallet
      switch (poolName){
        case 'BNB.BNB':
          this.iconPath = 'assets/images/token-icons/bnb.png';
          break;

        case 'BTC.BTC':
          this.iconPath = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BTCB-1DE/logo.png';
          break;

        case 'THOR.RUNE':
          this.iconPath = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/RUNE-B1A/logo.png';
          break;

        case 'DOT.DOT':
          this.iconPath = 'assets/images/token-icons/polkadot.svg';
          break;
  
        default:
          console.warn(`Icon not available for poolName ${poolName}. Add override in src\\app\\_classes\\asset.ts`);
          this.iconPath = 'assets/images/token-icons/unknown.png';
          break;
      }
    }

  }

  getAssetFromString(poolName: string): {
    chain: Chain;
    symbol: string;
    ticker: string;
  } {
    let chain: Chain;
    let symbol: string;
    let ticker: string;

    const data = poolName.split('.');
    if (poolName.includes('.')) {
      chain = data[0] as Chain;
      symbol = data[1];
    } else {
      symbol = data[0];
    }
    if (symbol) {
      ticker = symbol.split('-')[0];
    }

    return { chain, symbol, ticker };
  }

}
