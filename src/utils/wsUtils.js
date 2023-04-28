

export async function fillSymbols() {
  const response = await fetch(`https://localhost:7156/market/list`);
  const data = await response.json();
  return data;
}

export function fillWebSocketUrl(symbols) {
  let url = "wss://stream.binance.com:9443/ws";
  symbols.forEach((symbol) => {
    url += "/" + symbol.toLowerCase() + "@ticker";
  });
  return url;
}


export function handleMessage(data, updatedCoins) {
    const cryptoIndex = updatedCoins.findIndex((coin) => coin.s === data.s);
    if (cryptoIndex !== -1) {
      const crypto = updatedCoins[cryptoIndex];
      crypto.c = data.c;
      crypto.P = data.P;
    } else {
      updatedCoins.push(data);
    }
  }
