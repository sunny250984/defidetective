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
import { useDispatch } from "react-redux";


const Modal = (props) => {
    const dispatch = useDispatch();
    const [roiAppState, setRoiAppState] = useState({});

    const handleChange = (e) => {
        setRoiAppState({ ...roiAppState, [e.target.id]: e.target.value })
    }

    const handleClickSubmit = async() => {
        // console.log(roiAppState);
        if(!Boolean(roiAppState.token)) {
            alert("Please Fill Token Field."); return;
        } else if(!Boolean(roiAppState.contract)) {
            alert("Please Fill Contract Field."); return;
        } else if(!Boolean(roiAppState.level)) {
            alert("Please Fill Level Field."); return;
        }
        await dispatch(props.saveAppInfo(roiAppState));
        props.setMVisible(false)
    }

    useEffect(() => {
        setRoiAppState({
            ...props.selectedData,
            mining_group_name: props.selectedData.mining_group,
            age: props.selectedData.ages,
            token: props.selectedData.coin_token,
            showflag: props.selectedData.show_flag ? "show" : "hide",
            level: props.selectedData.level || 1
        });
    }, [props.selectedData])

    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>Add ROI DAPP</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="mining_group_url"
                            label="WEBSITE URL"
                            value={roiAppState.mining_group_url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: https://wealthmountain.app/binance"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="mining_group_name"
                            label="WEBSITE"
                            value={roiAppState.mining_group_name || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: Wealth Mountain"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="defi_badge"
                            label="DEFI BADGE"
                            value={roiAppState.defi_badge || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="DEFI BADGE"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="logo_url"
                            label="LOGO"
                            value={roiAppState.logo_url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="tg_group"
                            label="TELEGRAM"
                            value={roiAppState.tg_group || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://t.me/WCMdineBUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="discode_link"
                            label="DISCORD"
                            value={roiAppState.discode_link || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://discord.gg/Pgj3XqFy4d"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="twitter_link"
                            label="TWITTER"
                            value={roiAppState.twitter_link || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://twitter.com/WolfdOfCrypto885"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="token"
                            label="TOKEN"
                            value={roiAppState.token || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="BUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="contract"
                            label="CONTRACT"
                            value={roiAppState.contract || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://bscscan.com/address/0xbcae54cdf6a1b1cd0ec3d44114b452179a96c1e3"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="audit"
                            label="AUDIT"
                            value={roiAppState.audit || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://georgestamp.xyz/2022/09/wc-miner/"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="fees"
                            label="FEES"
                            value={roiAppState.fees || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: 10% / 2%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="datetime-local"
                            id="age"
                            value={roiAppState.age || ""}
                            onChange={(e) => handleChange(e)}
                            label="AGE(LAUNCH DATE)"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="daily"
                            label="DAILY%"
                            value={roiAppState.daily || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: 5%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="tvl"
                            label="TVL"
                            value={roiAppState.tvl || ""}
                            onChange={(e) => handleChange(e)}
                            disabled
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="level">LEVEL</label>
                            <select
                                id="level"
                                value={roiAppState.level || ""}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value={0}></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                    </CCol>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="showflag">SHOW/HIDE</label>
                            <select
                                id="showflag"
                                value={roiAppState.showflag}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value=""></option>
                                <option value="show">SHOW</option>
                                <option value="hide">HIDE</option>
                            </select>
                        </div>
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
export default Modal;