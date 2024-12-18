import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CAvatar,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilMenu, cilAccountLogout, cilLockLocked } from '@coreui/icons'

import { ctrlSidebar, logout } from 'src/store/actions/app.actions'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/provider/AuthProvider';
import { myFunctions } from 'src/utils/functions'
import PasswordModal from './header/PasswordModal'

const AppHeader = () => {
  const {address, connect, disconnect } = useAuthContext();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loginState, sidebarShow } = useSelector((state) => state.sapp);
  const [ mVisible, setMVisible ] = useState(false); // modal visible state;

  const handleLogout = () => {
    dispatch( logout(localStorage.getItem("app_token")) );
    navigate("/dapps");
  }

  const handleChangePwd = () => {
    setMVisible(!mVisible);
  }

  return (
    <CHeader position="sticky" className="">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch( ctrlSidebar(!sidebarShow) )}
        >
          <CIcon icon={cilMenu} className="text-white" size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CLink href='https://t.me/defidetective' className='header-join-group' target='_blank'>
            Join Defi Detective Group
          </CLink>
        </CHeaderNav>
        <CHeaderNav>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          {
            loginState === "success" &&
            <>
              <CLink onClick={()=>handleChangePwd()} className="me-4">
                <CIcon icon={ cilLockLocked } className="text-white" size="lg" />
              </CLink>
              <CLink onClick={()=>handleLogout()}>
                <CIcon icon={ cilAccountLogout } className="text-white" size="lg" />
              </CLink>
              <PasswordModal
                  visible={mVisible}
                  setMVisible={setMVisible}
              />
            </>
          }
          {
            loginState !== "success" && 
            <>
              {/* <CLink href="https://t.me/DefiDetectiveapp" target="_blank">
                <CAvatar src="/images/logo-icon.png" size="md" />
              </CLink> */}
              <CLink className='connectBtn py-1 px-3' onClick={ address ? disconnect : connect }>
                {address ? myFunctions.shorten(address) : 'Connect'}
              </CLink>
            </>
          }
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
