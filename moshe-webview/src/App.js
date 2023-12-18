import WertModule from '@wert-io/module-react-component';
import './App.css';

function App() {

  const wertConfig = {
    partner_id: '01H1KB0PWMXFTWRJWAWHJCDCCY',
    // click_id: uuidv4(), // unique id of purhase in your system
    origin: 'https://widget.wert.io',
    // width: 400,
    // height: 600,
    commodity: 'ETH',
    network: 'ethereum',
    // theme: 'dark',
    // address: account,
    // commodities: PROD ? WERT_COMMODITIES_PROD : WERT_COMMODITIES_TEST,
    // commodity_amount: MINT_PRICE_WEI,
    // sc_address: UtilService.getMarketAddress(chainId),
    // sc_input_data,
    // signature,
    // color_buttons: '#ff4b7e',
    // buttons_border_radius: '99',
    // color_background: "#222",
  }

  return (
    <div className="App">
      <WertModule
        options={wertConfig}
        style={{ height: 600 }}
      />
    </div>
  );
}

export default App;
