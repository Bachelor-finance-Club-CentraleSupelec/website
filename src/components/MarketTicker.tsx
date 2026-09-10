// Decorative marquee of mock market quotes. Purely visual (aria-hidden).
const QUOTES = [
  { sym: 'CAC 40', chg: '+0.62%', up: true },
  { sym: 'S&P 500', chg: '+0.28%', up: true },
  { sym: 'EURO STOXX', chg: '-0.14%', up: false },
  { sym: 'NASDAQ', chg: '+0.91%', up: true },
  { sym: 'EUR/USD', chg: '-0.06%', up: false },
  { sym: 'BRENT', chg: '+1.20%', up: true },
  { sym: 'GOLD', chg: '+0.34%', up: true },
  { sym: 'BTC', chg: '-2.10%', up: false },
  { sym: 'FTSE 100', chg: '+0.19%', up: true },
  { sym: '10Y OAT', chg: '+3bps', up: true },
];

function Row() {
  return (
    <div className="flex shrink-0">
      {QUOTES.map((q, i) => (
        <span
          key={`${q.sym}-${i}`}
          className="flex items-center gap-2 whitespace-nowrap px-6 py-2 text-xs uppercase tracking-wide"
        >
          <span className="font-medium text-paper">{q.sym}</span>
          <span className={q.up ? 'text-paper/80' : 'text-paper/50'}>
            {q.up ? '▲' : '▼'} {q.chg}
          </span>
          <span className="text-paper/20">/</span>
        </span>
      ))}
    </div>
  );
}

export function MarketTicker() {
  return (
    <div
      className="overflow-hidden border-y border-ink bg-ink text-paper"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
