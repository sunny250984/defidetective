import { useEffect, useState } from "react";
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CButton,
    CFormInput,
    CRow,
    CCol
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { changePwd } from "src/store/actions/app.actions"


const PasswordModal = (props) => {
    const dispatch = useDispatch();
    const [pwd, setPwdState] = useState({});
    const { userInfo } = useSelector(state => state.sapp);

    const handleChange = (e) => {
        setPwdState({ ...pwd, [e.target.id]: e.target.value })
    }

    const handleClickSubmit = async() => {
        if(pwd.pwd == "") return;
        if( pwd.pwd !== pwd.confirm_pwd ){
            alert("Password doesn't match"); return;
        }
        await dispatch(changePwd({
            username: userInfo.name,
            password: pwd.pwd
        }));
        props.setMVisible(false)
    }


    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>CHANGE PASSWORD</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={6}>
                        <CFormInput
                            type="password"
                            id="pwd"
                            label="PASSWORD"
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={6}>
                        <CFormInput
                            type="password"
                            id="confirm_pwd"
                            label="CONFORM PASSWORD"
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => handleClickSubmit()}>SAVE</CButton>
                <CButton color="secondary" onClick={() => props.setMVisible(false)}>
                    CLOSE
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export default PasswordModal;