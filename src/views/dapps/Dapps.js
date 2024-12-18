import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
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
import { cilPlus, cibExpertsExchange, cilPen, cilSortAscending, cilSortDescending } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import Web3 from 'web3';

import {
  getDppList,
  // calcTVL,
  saveAppInfo,
  deleteRowById
} from "src/store/actions/dapps.actions"
import { getData as adsGetData } from "src/store/actions/advertise.actions"
import Modal from "./components/Modal"
import BUSDModal from "./components/BUSDModal"
import "./dapp.scss";
import { config } from "../../config";
import tradeJoeRounterAbi from "../../abis/tradeJoeRouterAbi.json";
import { useAuthContext } from 'src/provider/AuthProvider';
import { useContractContext } from 'src/provider/ContractProvider';
import { myFunctions } from 'src/utils/functions';
// table data
let appData = {};
let selectedData = {};
let rows = [];

const Dapps = () => {
  const dispatch = useDispatch();
  const { chainId, switchNetwork } = useAuthContext();
  const { getBnbBalance, getBusdBalance, getMaticBalance, fromWei } = useContractContext();
  const [newChainId, setNewChainId] = useState(null);
  useEffect(() => {
    setNewChainId(chainId);
  }, [chainId]);
  console.log("Dapps ChainID: ", chainId);

  const { loginState } = useSelector(state => state.sapp);
  const { dappList } = useSelector(state => state.dapps);
  const { advertises } = useSelector(state => state.adss);

  const [mVisible, setMVisible] = useState(false); // modal visible state;
  const [busdMVisible, setBUSDMVisible] = useState(false); // modal visible state;
  const [columns, setColumns] = useState([]);  // table rows
  const [items, setItems] = useState([]);  // table rows

  const [bnbPrice, setBnbPrice] = useState(0);
  const [maticPrice, setMaticPrice] = useState(0);
  const [avaxPrice, setAvaxPrice] = useState(0);

  // initial data  ---------------
  const getTokenPrice = async () => {
    let res = await axios.get(`https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${config.BSC_API_KEY}`);
    const bnbPrice = res.data.result.ethusd;
    setBnbPrice(bnbPrice);
    // console.log('BNB Price: ', bnbPrice);

    res = await axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=${config.POLYGON_API_KEY}`);
    const maticPrice = res.data.result.maticusd;
    setMaticPrice(maticPrice);
    // console.log("Matic Price: ", maticPrice);

    const Web3Instance = new Web3('https://api.avax.network/ext/bc/C/rpc');
    const TradeJoeRounterContract = new Web3Instance.eth.Contract(tradeJoeRounterAbi, config.TradeJoeRouterAddress);
    const avaxPrice = await TradeJoeRounterContract.methods.getAmountsOut(Web3.utils.toWei('1'), ["0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"]).call();
    setAvaxPrice(avaxPrice[1] / 1000000);
    // console.log('Avax Price: ', avaxPrice[1] / 1000000);
  };

  const calcTVL = async (chainId, tokenPrice, contractAddress, tokenKind) => {
    if (contractAddress == null) return 0;

    contractAddress = contractAddress.slice(contractAddress.length-42);
    let res, balance;
    if (chainId == 56) {
        if (tokenKind.toLowerCase() == 'bnb') {
            try {
                balance = await getBnbBalance(contractAddress);
                // res = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${config.BSC_API_KEY}`);
                // console.log("bnb Amount: ", fromWei(balance), " = ", contractAddress);
                
                return fromWei(balance) * tokenPrice;
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'busd') {
            try {
                balance = await getBusdBalance(contractAddress);
                // console.log("BUSD Amount: ", fromWei(balance), " = ", contractAddress);
                
                return fromWei(balance);
                // res = await axios.get(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&address=${contractAddress}&tag=latest&apikey=${config.BSC_API_KEY}`);
                // return res.data.result / Math.pow(10, 18);
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
            try {
                res = await axios.get(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x55d398326f99059fF775485246999027B3197955&address=${contractAddress}&tag=latest&apikey=YGKJFMK5FW1H9T9GR9VTGIT2UC5PXUTDTB`);
                return res.data.result / Math.pow(10, 18);
            } catch {
                return 0;
            }
        } else {
            return 0;
        }
    } else if (chainId == 137) { //Polygon
      console.log("Polygon: ", tokenKind.toLowerCase());
        if (tokenKind.toLowerCase() == 'matic') {
            try {
              balance = await getMaticBalance(contractAddress);
              console.log("Matic Amount= ", fromWei(balance));
              return fromWei(balance) * tokenPrice;

                // res = await axios.get(`https://api.polygonscan.com/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${config.POLYGON_API_KEY}`);
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
            try {
                res = await axios.get(`https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&address=${contractAddress}&tag=latest&apikey=${config.POLYGON_API_KEY}`);
                return res.data.result / Math.pow(10, 6);
            } catch {
                return 0;
            }
        } else {
            return 0;
        }
    } else if (chainId == 43114) { 
        if (tokenKind.toLowerCase() == 'avax') {
            try {
                res = await axios.get(`https://api.snowtrace.io/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=ZVI4N9MEVBXDANDD4NPSXQI2NZEC9SYESU`);
                balance = res.data.result / Math.pow(10, 18);
                return balance * tokenPrice;
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
        
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

useEffect(() => {
    dispatch(getDppList()); // get dapp list
    dispatch(adsGetData()); // get advertise list

    getTokenPrice();
  }, []);

  useEffect(()=>{
    let sflag = localStorage.getItem('sflag');
    let scolumn = localStorage.getItem('scolumn');
    let chFlag = scolumn + "_" + sflag;
    // table header
    let theader = [
      { key: 'logo', label: 'BADGE', _props: { scope: 'col' }, },
      { key: 'website', label: 
        <div className="__sort" onClick={() => sortData("website")}>
          WEBSITE <CIcon icon={chFlag==="website_1"?cilSortDescending:cilSortAscending} className="text-white" size="sm" />
        </div>, _props: { scope: 'col' }, },
      { key: 'defi_badge', label: 'DEFI BADGE', _props: { scope: 'col' }, },
      { key: 'telegram', label: 'TELEGRAM', _props: { scope: 'col' }, },
      { key: 'discord', label: 'DISCORD', _props: { scope: 'col' }, },
      { key: 'twitter', label: 'TWITTER', _props: { scope: 'col' }, },
      { key: 'token', label: 'TOKEN', _props: { scope: 'col' }, },
      { key: 'contract', label: 'CONTRACT', _props: { scope: 'col' }, },
      { key: 'audit', label: 'AUDIT', _props: { scope: 'col' }, },
      { key: 'fees', label: 'FEES', _props: { scope: 'col' }, },
      { key: 'age', label: 
        <div className="__sort" onClick={() => sortData("age_realval")}>
          AGE <CIcon icon={chFlag==="age_realval_1"?cilSortDescending:cilSortAscending} className="text-white" size="sm" />
          </div>, _props: { scope: 'col' }, },
      { key: 'daily_percent', label: 'DAILY%', _props: { scope: 'col' }, },
      { key: 'tvl', label: 
        <div className="__sort" onClick={() => sortData("tvl")}>
          TVL <CIcon icon={chFlag==="tvl_1"?cilSortDescending:cilSortAscending} className="text-white" size="sm" />
        </div>, _props: { scope: 'col' }, },
    ]

    if (loginState === "success") {
      theader.push({
        key: "action",
        label: "E / D",
        _props: { scope: 'col', style:{ minWidth:"60px" } }
      });
    } else if (loginState !== "success") {
      theader.push({
        key: "userAction",
        label: "Tools",
        _props: { scope: 'col' }
      });
    }
    setColumns(theader);
  },[items, loginState])

  // sort func
  const sortData = (column) => {
    if(!Boolean(localStorage.getItem('sflag'))) localStorage.setItem('sflag', 0);
    let sflag = localStorage.getItem('sflag') == "0" ? 1 : 0;
    localStorage.setItem('sflag', sflag);
    localStorage.setItem('scolumn', column);
    
    const sortRes = myFunctions.sortData(rows, column, sflag);
    setItems([ ...sortRes ]);
  }
  
  // advertise dispaly
  const [ads_level_1, setAds_level_1] = useState({});
  const [ads_level_2, setAds_level_2] = useState({});
  useEffect(() => {
    const ads_roi = myFunctions.AdsAry(advertises, "R");
    ads_roi['level_1'][0] && setAds_level_1(ads_roi['level_1'][0]);
    ads_roi['level_2'][0] && setAds_level_2(ads_roi['level_2'][0]);
    // console.log("ads_roi ===>  ",ads_roi);
    let adsInd = 0;
    let adsInterval = setInterval(() => {
      ads_roi['level_1'][adsInd] && setAds_level_1(ads_roi['level_1'][adsInd]);
      ads_roi['level_2'][adsInd] && setAds_level_2(ads_roi['level_2'][adsInd]);
      adsInd++;
      if (adsInd >= ads_roi['level_1'].length) adsInd = 0;
    }, 30000)
  }, [advertises])
  // console.log("ads_level_1 ====> ", ads_level_1);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
}
  const [refAddress, setRefAddress] = useState('0xc3daa82D79660898b5F31fE2F1f53B620c927faa');
  const query = useQuery();
  const getRef = () => {
      const ref = Web3.utils.isAddress(query.get("ref"))
          ? query.get("ref")
          : "0xc3daa82D79660898b5F31fE2F1f53B620c927faa"; // "0x0000000000000000000000000000000000000000";
      return ref;
  };
  // if admin, add the actions
  useEffect(() => {
    const ref = getRef();
    setRefAddress(ref);
  }, [])

  // handle click applybtn
  const handleClickApplyBtn = () => {
    if (loginState == "success") { // a user can open if logined
      selectedData = {};
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

  const getChainIdfromContract = (contract) => { // e.x. https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3
    if (contract == null) return;
    return contract.includes('bsc') ? 56 : (contract.includes('polygon') ? 137 : (contract.includes('snowtrace') ? 43114 : 0));
  }

  const handleClickUserAction = (rId) => {
    selectedData = appData[rId];
    const contractChainId = getChainIdfromContract(selectedData.contract);
    // console.log("selectedData: ", selectedData, chainId, parseInt(chainId), contractChainId);
    console.log("UserAction: ", selectedData, Web3.utils.toHex(newChainId), Web3.utils.toHex(contractChainId));
    if (Web3.utils.toHex(contractChainId) == Web3.utils.toHex(newChainId)) {

      setBUSDMVisible(true);
    } else {

      switchNetwork(contractChainId);
    }
  }




  // making table rows
  useEffect(() => {
    if (columns.length == 0) return;
    rows = [];
    const getItems = async()=>{
      await Promise.all(dappList.map(async (val, ind) => {
        appData[val.id] = val;
        const chainId = getChainIdfromContract(val.contract);
        let tokenPrice = 0;
        if (chainId == 56) {
          if (bnbPrice == 0) {
            tokenPrice = (await axios.get(`https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${config.BSC_API_KEY}`)).data.result.ethusd;
            setBnbPrice(tokenPrice);
          } else {
            tokenPrice = bnbPrice;
          }
        } else if (chainId == 137) {
          if (maticPrice == 0) {
            tokenPrice = (await axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=${config.POLYGON_API_KEY}`)).data.result.maticusd;
            setMaticPrice(tokenPrice);
          } else {
            tokenPrice = maticPrice;
          }
        } else if (chainId == 43114) {
          if (avaxPrice == 0) {
            const Web3Instance = new Web3('https://api.avax.network/ext/bc/C/rpc');
            const TradeJoeRounterContract = new Web3Instance.eth.Contract(tradeJoeRounterAbi, config.TradeJoeRouterAddress);
            const avaxPrice = await TradeJoeRounterContract.methods.getAmountsOut(Web3.utils.toWei('1'), ["0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"]).call();
            tokenPrice = avaxPrice[1] / 1000000
            setAvaxPrice(tokenPrice);
          } else {
            tokenPrice = avaxPrice;
          }
        }
        // console.log("chainId: ", chainId, tokenPrice);
        let splitbar = "";
        if (dappList[ind + 1] && val.level !== dappList[ind + 1].level) {
          splitbar = "split-row-" + val.level;
        }

        const age_val = myFunctions.getCountdown(val.ages);
        const tvl = await calcTVL(chainId, tokenPrice, val.contract, val.coin_token);
        
        let item = {
          logo: <div style={{ width: 50, height: 50 }}><img src={val.logo_url} alt="" width={val.logo_url && "100%"} /></div>,
          website: <CLink
            className="website_link"
            target="_blank"
            href={val.mining_group_url}
          >{val.mining_group}</CLink>,
          defi_badge: <CLink
            target="_blank"
            href={val.kyc}
          >
            <span className="badge bg-success-gradient">{val.kyc && "defi badge"}</span>
          </CLink>,
          telegram: <CLink
            target="_blank"
            href={val.tg_group}
          >
            <span className="badge bg-success-gradient">{val.tg_group && "telegram"}</span>
          </CLink>,
          discord: <CLink
            target="_blank"
            href={val.discode_link}
          >
            <span className="badge bg-success-gradient">{val.discode_link && "discord"}</span>
          </CLink>,
          twitter: <CLink
            target="_blank"
            href={val.twitter_link}
          >
            <span className="badge bg-success-gradient">{val.twitter_link && "twitter"}</span>
          </CLink>,
          token: val.coin_token ? val.coin_token : " ",
          contract: <CLink
            target="_blank"
            href={val.contract}
          >
            <span className="badge bg-success-gradient">{val.contract && "contract"}</span>
          </CLink>,
          audit: <CLink
            target="_blank"
            href={val.audit}
          >
            <span className="badge bg-success-gradient">{val.audit && "audit"}</span>
          </CLink>,
          fees: val.fees ? val.fees : " ",
          age: val.ages ? age_val : " ",
          age_realval: val.ages,
          daily_percent: val.daily ? val.daily : " ",
          tvl: '$' + Number(tvl).toFixed(2),
          _props: {
            className: "level_" + val.level + " " + splitbar
          }
        }
        // admin action
        item['action'] = <>
          <CIcon onClick={() => handleClickActions(val.id, 'E')} icon={cilPen} className="text-white" size="sm" /> | &nbsp;
          <CIcon onClick={() => handleClickActions(val.id, 'D')} icon={cibExpertsExchange} className="text-white" size="sm" />
        </>
        // user action
        item['userAction'] = <>
          <button onClick={() => handleClickUserAction(val.id)} className={val.show_flag == 0 ? "actionBtn mx-1 disabledBtn" : "actionBtn mx-1"} size="sm">Action</button>
        </>

        rows[ind] = item;
      }));
      // console.log(rows)
      setItems([ ...rows ]);
    }
    getItems();
  },[dappList, loginState])

  return (
    <div className='dapps-page'>
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
                        <a target="_blank" href={ads_level_1.link}>
                          <img src={process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + ads_level_1.img} width="100%" alt="BNBMiner-S" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CCol>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-lg-start justify-content-center">
                  <div className="phcol partnership" id="partnership">
                    <div className="sponsor">
                      <div className="content">
                        <a target="_blank" href={ads_level_2.link}>
                          <img src={process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + ads_level_2.img} width="100%" alt="BNBMiner-S" />
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
        saveAppInfo={saveAppInfo}
        selectedData={selectedData}
      />
      <BUSDModal
        visible={busdMVisible}
        setMVisible={setBUSDMVisible}
        selectedData={selectedData}
        refAddress={getRef()}
      />
    </div>
  )
}

export default Dapps
