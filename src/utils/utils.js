//export const baseUrl = 'https://cryptocurrencyexchange.azurewebsites.net/'; //api
export const baseUrl = "https://localhost:44363"; //api

export const allCryptoSymbols = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "ATOMUSDT",
  "SOLUSDT",
  "XRPUSDT",

  "MATICUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "TRXUSDT",
  "AVAXUSDT",
  "LTCUSDT",

  "LINKUSDT",
  "APTUSDT",
  "MANAUSDT",
  "AAVEUSDT",
  "DASHUSDT",
  "CAKEUSDT",

  "UNIUSDT",
  "XMRUSDT",
  "FTMUSDT",
  "EOSUSDT",
  "STXUSDT",
  "QNTUSDT",

  "NEOUSDT",
  "SUSHIUSDT",
  "XLMUSDT",
  "FILUSDT",
];

export function sortByChanges(sortOptions, updatedCoins) {
  if (!sortOptions.isChangesSorted) {
    updatedCoins.sort((a, b) => b.P - a.P);
    sortOptions.isChangesSorted = true;
  } else {
    updatedCoins.sort((a, b) => a.P - b.P);
    sortOptions.isChangesSorted = false;
  }
}

export function sortByPrice(sortOptions, updatedCoins) {
  if (!sortOptions.isPriceSorted) {
    updatedCoins.sort((a, b) => b.p - a.p);
    sortOptions.isPriceSorted = true;
  } else {
    updatedCoins.sort((a, b) => a.p - b.p);
    sortOptions.isPriceSorted = false;
  }
}
