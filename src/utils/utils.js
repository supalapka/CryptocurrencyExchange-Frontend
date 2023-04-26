import axios from "axios";

export async function fillTop100Symbols() {
  const response = await axios.get(`https://localhost:7156/market/list`);
  return response.data;
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
