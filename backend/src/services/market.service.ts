const BINANCE_API = 'https://api.binance.com';

export async function fetchPrices(symbols: string[]) {
  const param = encodeURIComponent(JSON.stringify(symbols));
  const url = `${BINANCE_API}/api/v3/ticker/24hr?symbols=${param}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance error ${res.status}`);
  return res.json();
}

export async function fetchKlines(symbol: string, interval: string = '1h', limit = 100) {
  const url = `${BINANCE_API}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance error ${res.status}`);
  return res.json();
}
