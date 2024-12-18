import React, { useState, useEffect } from 'react'
import { CFooter } from '@coreui/react'
import { useSelector } from 'react-redux';
import { myFunctions } from 'src/utils/functions';

const AppFooter = () => {

  // advertise dispaly
  const { advertises } = useSelector(state => state.adss);
  const [ ads_level_3, setAds_level_3 ] = useState({});
  useEffect(()=>{
    const ads_roi = myFunctions.AdsAry(advertises,"R");
    ads_roi['level_3'][0] && setAds_level_3(ads_roi['level_3'][0]);
    // console.log("ads_roi ===>  ",ads_roi);
    let adsInd = 0;
    let adsInterval = setInterval(()=>{
      ads_roi['level_3'][adsInd] && setAds_level_3(ads_roi['level_3'][adsInd]);
      adsInd++;
      if(adsInd >= ads_roi['level_3'].length) adsInd = 0;
    }, 30000)
  },[advertises])


  return (
    <CFooter>
      <div className="m-auto">
        {
          ads_level_3.img && 
          <a target="_blank" href={ ads_level_3.link }>
            <img src={ process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + ads_level_3.img } style={{maxWidth:'100%'}} alt="BNBMiner-S" />
          </a>
        }
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
