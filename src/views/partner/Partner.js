import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CLink,
  CRow,
  CTable
} from '@coreui/react'
import { cibExpertsExchange, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  getData,
  saveData,
  deleteRowById
} from "src/store/actions/partner.actions"
import Modal from "./components/Modal"
import "./partner.scss";

let appData = {};
let selectedData = {};

const Partner = () => {
  const dispatch = useDispatch();
  const { loginState } = useSelector(state => state.sapp);
  const [mVisible, setMVisible] = useState(false); // modal visible state;

  // initial data  ---------------
  useEffect(() => { dispatch(getData()) }, []);
  const { partners } = useSelector(state => state.partners);

  // handle click actions(edit || delete)
  const handleClickActions = (rId)=>{
    if(!confirm("Do you delete this item?")) return true;
    dispatch(deleteRowById(rId));
  }

  const handleClickApplyBtn = () => {
    if (loginState == "success") { // a user can open if logined
      setMVisible(!mVisible);
    }
  }

  // making table rows
  const items = partners.map((val, ind) => {
    appData[val.id] = val;
    let item = {
      logo_url: <div style={{ width: 50, height: 50 }}><img src={val.logo_url}  width={val.logo_url && "100%"} alt="" /></div>,
      name: <CLink
        target="_blank"
        href={val.url}
      >
        {val.name || ""}
      </CLink>,
      social: <><CLink
        target="_blank"
        href={val.website}
      >
        <img src="/images/website.svg" width="30" alt="" />
      </CLink> 
        <CLink
          className='mx-4'
          target="_blank"
          href={val.telegram}
        >
          <img src="/images/telegram.svg" width="30" alt="" />
        </CLink>
        <CLink
          target="_blank"
          href={val.twitter}
        >
          <img src="/images/twitter.svg" width="30" alt="" />
        </CLink>
      </>,
      contract: <CLink
        target="_blank"
        href="https://t.me/DefiDetectiveapp"
      >
        <button type="button" className="btn px-3">Contact</button>
      </CLink>,
    }
    if(loginState === "success"){
      item['action'] = <>
        <CIcon onClick={()=>handleClickActions(val.id)} icon={ cibExpertsExchange } className="text-white" size="sm" />  
      </>
    }
    return item;
  })

  return (
    <div className='partner-page'>
      <CRow className='mt-3 px-lg-3'>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              {
                loginState == "success" &&
                <CButton className="apply-listing d-flex px-5" onClick={() => handleClickApplyBtn()}>
                  <CIcon icon={cilPlus} className="text-white" size="sm" /> APPLY
                </CButton>
              }
              <CTable items={items} responsive />
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

export default Partner
