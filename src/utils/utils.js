export const baseUrl = 'http://crypto-api.fsdrfua4cwaeaeg2.westeurope.azurecontainer.io'; //api


export async function fillTop100Symbols() {
  var data = [
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
  return data;
}

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
