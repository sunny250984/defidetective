import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CTable
} from '@coreui/react'
import { cilPlus, cibExpertsExchange, cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import {
  getData,
  saveData,
  deleteRowById
} from "src/store/actions/tokens.actions"
import Modal from "./components/Modal"
import "./token.scss";
import { myFunctions } from 'src/utils/functions';

// table header
const columns = [
  { key: 'coin', label: 'BADGE', _props: { scope: 'col' }, },
  { key: 'name', label: 'NAME', _props: { scope: 'col' }, },
  { key: 'website', label: 'WEBSITE', _props: { scope: 'col' }, },
  { key: 'kyc', label: 'DEFI BADGE', _props: { scope: 'col' }, },
  { key: 'presale_buy', label: 'PRESALE/BUY', _props: { scope: 'col' }, },
  { key: 'chart', label: 'CHART', _props: { scope: 'col' }, },
  { key: 'chain', label: 'CHAIN', _props: { scope: 'col' }, },
  { key: 'telegram', label: 'TELEGRAM', _props: { scope: 'col' }, },
  { key: 'discord', label: 'DISCORD', _props: { scope: 'col' }, },
  { key: 'twitter', label: 'TWITTER', _props: { scope: 'col' }, },
  { key: 'audit', label: 'AUDIT', _props: { scope: 'col' }, },
  { key: 'contract', label: 'CONTRACT', _props: { scope: 'col' }, },
  { key: 'launch', label: 'LAUNCH', _props: { scope: 'col' }, },
];
// table data
let appData = {};
let selectedData = {};

export const numberWithCommas = (x, digits = 3) => {
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

const Tokens = () => {
  const dispatch = useDispatch();
  const { loginState } = useSelector(state => state.sapp);
  const [mVisible, setMVisible] = useState(false); // modal visible state;

  // initial data  ---------------
  useEffect(() => { dispatch(getData()) }, []);
  const { tokenList } = useSelector(state => state.tokens);

  const getTokenPrice = async (tokenAddress) => {
    try {
      let res = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`);
      if (res.data[tokenAddress.toLowerCase()] != undefined) {
        if (res.data[tokenAddress.toLowerCase()].usd != undefined)
          return res.data[tokenAddress.toLowerCase()].usd.toFixed(3);
      }
      return 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  const getTotalSupply = async (tokenAddress, chainId) => {
    try {
      if (chainId.toUpperCase() == "ETH") {
        // const TokenContract = new ethers.Contract(tokenAddress, tokenAbi.abi, providerE);
        // console.log("TokenContract: ", TokenContract);
        let res = await axios.get(`https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}`);
        console.log("ETH: ", res.data.result);
        return res.data.result;
      } else if (chainId.toUpperCase() == "BSC") {
        // const TokenContract = new ethers.Contract(tokenAddress, tokenAbi.abi, providerB);
        // const [decimals, totalSupply] = await Promise.all([TokenContract.decimals(), TokenContract.totalSupply()]);
        // console.log("decimals: ", decimals);
        // console.log("totalSupply: ", totalSupply);
        let res = await axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=YGKJFMK5FW1H9T9GR9VTGIT2UC5PXUTDTB`);
        console.log("BSC: ", res.data.result);
        return res.data.result;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  // handle click applybtn
  const handleClickApplyBtn = () => {
    if (loginState == "success") { // a user can open if logined
      setMVisible(!mVisible);
    } else {
      window.open("https://t.me/DefiSpammerAdmin", "_blank");
    }
  }

  // handle click actions(edit || delete)
  const handleClickActions = (rId, action) => {
    if (action === "D") {
      if (!confirm("Do you delete this item?")) return true;
      dispatch(deleteRowById(rId));
    } else {
      selectedData = appData[rId]
      setMVisible(true);
    }
  }

  // advertise dispaly
  const { advertises } = useSelector(state => state.adss);
  const [ ads_level_1, setAds_level_1 ] = useState({});
  const [ ads_level_2, setAds_level_2 ] = useState({});
  useEffect(()=>{
    const ads_roi = myFunctions.AdsAry(advertises,"T");
    ads_roi['level_1'][0] && setAds_level_1(ads_roi['level_1'][0]);
    ads_roi['level_2'][0] && setAds_level_2(ads_roi['level_2'][0]);
    // console.log("ads_roi ===>  ",ads_roi);
    let adsInd = 0;
    let adsInterval = setInterval(()=>{
      ads_roi['level_1'][adsInd] && setAds_level_1(ads_roi['level_1'][adsInd]);
      ads_roi['level_2'][adsInd] && setAds_level_2(ads_roi['level_2'][adsInd]);
      adsInd++;
      if(adsInd >= ads_roi['level_1'].length) adsInd = 0;
    }, 30000)
  },[advertises])

  // making table rows
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (loginState === "success" && columns[columns.length - 1]['key'] !== "action") {
      columns[columns.length - 1]['key'] === "t_price" && columns.pop() && columns.pop();
      columns.push({
        key: "price",
        label: "DECIMALS",
        _props: { scope: 'col' }
      });
      columns.push({
        key: "action",
        label: "E / D",
        _props: { scope: 'col' }
      });
    } else if (loginState !== "success" && columns[columns.length - 1]['key'] !== "t_price") {
      columns[columns.length - 1]['key'] === "action" && columns.pop() && columns.pop();
      columns.push({
        key: "mcap",
        label: "MARKET CAP",
        _props: { scope: 'col' }
      });
      columns.push({
        key: "t_price",
        label: "PRICE",
        _props: { scope: 'col' }
      });
    }

    let items = [];
    const getItem = async () => {
      await Promise.all(tokenList.map(async (val, ind) => {
        appData[val.id] = val;

        let splitbar = "";
        if (tokenList[ind + 1] && val.level !== tokenList[ind + 1].level) {
          splitbar = "split-row-" + val.level;
        }
        const tokenAddress = val.contract.slice(val.contract.length - 42);
        const price_val = await getTokenPrice(tokenAddress);
        const chainId = val.contract.includes('bsc') ? 'bsc' : (val.contract.includes('polygon') ? 'polygon' : (val.contract.includes('snowtrace') ? 'avax' : 'undefined'));
        const totalSupply = await getTotalSupply(tokenAddress, chainId);
        const decimal = val.price;
        const mcap_val = numberWithCommas((price_val * totalSupply / Math.pow(10, decimal)).toFixed(2));
        const age_val = myFunctions.getCountdown(val.launch);
        console.log('decimal: ', decimal);
        console.log('totalSupply: ', totalSupply);
        let item = {
          coin: <div style={{ width: 50, height: 50 }}><img src={val.coin}  width={val.coin && "100%"} alt="" /></div>,
          name: val.name || " ",
          website: <CLink
            className="website_link"
            target="_blank"
            href={val.website}
          ><span className="badge bg-success-gradient">{val.website && "website"}</span></CLink>,
          kyc: <CLink
            target="_blank"
            href={val.kyc}
          >
            <span className="badge bg-success-gradient">{val.kyc && "defi badge"}</span>
          </CLink>,
          presale_buy: <CLink
            target="_blank"
            href={val.presale_buy}
          >
            <span className="badge bg-success-gradient">{val.presale_buy && "presale/buy"}</span>
          </CLink>,
          chart: <CLink
            target="_blank"
            href={val.chart}
          >
            <span className="badge bg-success-gradient">{val.chart && "chart"}</span>
          </CLink>,
          chain: val.chain || "  ",
          telegram: <CLink
            target="_blank"
            href={val.telegram}
          >
            <span className="badge bg-success-gradient">{val.telegram && "telegram"}</span>
          </CLink>,
          discord: <CLink
            target="_blank"
            href={val.discord}
          >
            <span className="badge bg-success-gradient">{val.discord && "discord"}</span>
          </CLink>,
          twitter: <CLink
            target="_blank"
            href={val.twitter}
          >
            <span className="badge bg-success-gradient">{val.twitter && "twitter"}</span>
          </CLink>,
          audit: <CLink
            target="_blank"
            href={val.audit}
          >
            <span className="badge bg-success-gradient">{val.audit && "audit"}</span>
          </CLink>,
          contract: <CLink
            target="_blank"
            href={val.contract}
          >
            <span className="badge bg-success-gradient">{val.contract && "contract"}</span>
          </CLink>,
          launch: val.launch ? age_val : " ",
          _props: {
            className: "level_" + val.level + " " + splitbar
          }
        }
        // admin actions
        item['price'] = val.price || " ";
        item['action'] = <>
          <CIcon onClick={() => handleClickActions(val.id, 'E')} icon={cilPen} className="text-white" size="sm" /> | &nbsp;
          <CIcon onClick={() => handleClickActions(val.id, 'D')} icon={cibExpertsExchange} className="text-white" size="sm" />
        </>
        // user actions
        item['mcap'] = '$' + mcap_val.toString();
        item['t_price'] = '$' + price_val.toString();
        // return item;
        items[ind] = item;
      }));
      console.log("Token items ", items);
      setItems([
        ...items
      ]);
    }
    getItem();
  }, [tokenList, loginState])

  return (
    <div className='tokens-page'>
      <CRow className='mt-3 px-lg-3'>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='phcols p-md-1 p-lg-2 pt-md-3 pt-lg-4'>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-lg-end justify-content-center">
                  <div className="phcol title">
                    <div className="title1">LINKS</div>
                    <div>
                      <a href="https://t.me/defidetectiveapp" alt="owner telegram" target="_blank">Contact Us</a>
                    </div>
                    <div className="title1">FOLLOW US</div>
                    <div className="social">
                      <a target="_blank" href="https://t.me/defidetective" alt="telegram">
                        <img src="/images/telegram.png" alt="telegram" />
                      </a>
                      <a target="_blank" href="https://twitter.com/defidetectorapp" alt="twitter">
                        <img src="/images/twitter.svg" alt="telegram" />
                      </a>
                      <a target="_blank" href="https://discord.gg/tXBq6HkJMc" alt="discord">
                        <img src="/images/discord.png" alt="telegram" />
                      </a>
                      <a target="_blank" href="./defidetective.app.pdf" alt="whitepaper">
                        <img src="/images/doc.png" alt="telegram" />
                      </a>
                    </div>
                  </div>
                </CCol>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-center">
                  <div className="phcol partnership" id="partnership">
                    <div className="sponsor">
                      <div className="content">
                        <a target="_blank" href={ ads_level_1.link }>
                          <img src={ process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + ads_level_1.img } width="100%" alt="BNBMiner-S" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CCol>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-lg-start justify-content-center">
                  <div className="phcol partnership" id="partnership">
                    <div className="sponsor">
                      <div className="content">
                        <a target="_blank" href={ ads_level_2.link }>
                          <img src={ process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + ads_level_2.img } width="100%" alt="BNBMiner-S" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CButton className="apply-listing d-flex" onClick={() => handleClickApplyBtn()}>
                <CIcon icon={cilPlus} className="text-white" size="sm" /> APPLY LISTING
              </CButton>
              <CTable columns={columns} items={items} responsive />
              {
                !items.length && 
                <div style={{ textAlign:"center", margin:"0 auto" }}>
                  <img src="/Half-Moon-Loading.svg" alt="" />
                </div>
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Modal
        visible={mVisible}
        setMVisible={setMVisible}
        saveData={saveData}
        selectedData={selectedData}
      />
    </div>
  )
}

export default Tokens
