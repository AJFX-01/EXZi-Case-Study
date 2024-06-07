import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';


function Chart() {
  const container = useRef();

  const cryptoPair = useSelector((state) => state.app.cryptoPair);
  const formattedCryptoPair = useSelector((state) => state.app.formattedCryptoPair);

  const createScript = useMemo(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "800",
        "height": "auto",
        "symbol": "BINANCE:${cryptoPair.toUpperCase()}",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    return script;
  }, [cryptoPair]);
  
  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''; // Clear previous script
      container.current.appendChild(createScript);
    }
  }, [createScript]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{marginTop: "20px"}}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default Chart;

