import React, { useEffect, useState } from 'react'
import "./login.scss";

import { CContainer, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "src/store/actions/app.actions"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value })
  }

  const { loginState, userInfo } = useSelector(state=>state.sapp);
  // console.log(loginState, userInfo);
  useEffect(()=>{
    if(loginState==="success"){
      navigate("/dapps");
    }
  },[loginState])

  const handleClickSubmit = ()=>{
    dispatch( login(loginData) );
  }

  return (
    <div className="login-page min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="wrapper">
          <div className="card card-authentication1 mx-auto my-5">
            <div className="card-body">
              <div className="card-content p-2">
                <div className="text-center">
                  <img src="/images/logo-icon.png" alt="logo icon" width="40%" />
                </div>
                <div className="card-title text-uppercase text-center py-3">Sign In</div>
                <form>
                  {
                    loginState === 'error' &&
                    <div className='error-message'>{ userInfo.message }</div>
                  }
                  <div className="form-group">
                    <label htmlFor="username" className="sr-only">Username</label>
                    <div className="position-relative has-icon-right">
                      <input type="text" id="username" onChange={ (e)=>handleChange(e) } className="form-control input-shadow" placeholder="Enter Username" />
                      <div className="form-control-position">
                        <i className="icon-user"></i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd" className="sr-only">Password</label>
                    <div className="position-relative has-icon-right">
                      <input type="password" id="pwd" onChange={ (e)=>handleChange(e) } className="form-control input-shadow" placeholder="Enter Password" />
                      <div className="form-control-position">
                        <i className="icon-lock"></i>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={()=>handleClickSubmit()} className="btn btn-light btn-block signin_btn">Sign In</button>

                </form>
              </div>
            </div>
          </div>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
