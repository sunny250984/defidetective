import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContent, AppSidebar, AppHeader, AppFooter } from '../components/index'

import { checkLogin } from "src/store/actions/app.actions"
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loginState } = useSelector(state=>state.sapp);
  
  useEffect(()=>{
    // if(loginState==="error"){
    //   navigate("/dapps");
    // }
  },[loginState])

  useEffect(()=>{
    dispatch( checkLogin(localStorage.getItem("app_token")) );  
  },[])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-default">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
