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
    const [tokenState, setTokenState] = useState({});

    const handleChange = (e) => {
        setTokenState({ ...tokenState, [e.target.id]: e.target.value })
    }

    const handleClickSubmit = async() => {
        // console.log(tokenState);
        await dispatch(props.saveData(tokenState));
        props.setMVisible(false)

    }

    useEffect(() => {
        setTokenState({
            ...props.selectedData,
            showflag: props.selectedData.show_flag ? "show" : "hide"
        });
    }, [props.selectedData])

    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>Token</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="coin"
                            label="COIN"
                            value={tokenState.coin || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="name"
                            label="NAME"
                            value={tokenState.name || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="website"
                            label="WEBSITE"
                            value={tokenState.website || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://website.com"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="presale_buy"
                            label="PRESALE / BUY"
                            value={tokenState.presale_buy || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="chart"
                            label="CHART"
                            value={tokenState.chart || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="chain"
                            label="CHAIN"
                            value={tokenState.chain || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="telegram"
                            label="TELEGRAM"
                            value={tokenState.telegram || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://t.me/WCMdineBUSD"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="discord"
                            label="DISCORD"
                            value={tokenState.discord || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://discord.gg/Pgj3XqFy4d"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="twitter"
                            label="TWITTER"
                            value={tokenState.twitter || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://twitter.com/WolfdOfCrypto885"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="audit"
                            label="AUDIT"
                            value={tokenState.audit || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://georgestamp.xyz/2022/09/wc-miner/"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="contract"
                            label="CONTRACT"
                            value={tokenState.contract || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://bscscan.com/address/0xbcae54cdf6a1b1cd0ec3d44114b452179a96c1e3"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="kyc"
                            label="DEFI BADGE"
                            value={tokenState.kyc || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="DEFI BADGE"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <CFormInput
                            type="date"
                            id="launch"
                            value={tokenState.launch || ""}
                            onChange={(e) => handleChange(e)}
                            label="LAUNCH"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="number"
                            id="price"
                            label="DECIMALS"
                            value={tokenState.price || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="level">LEVEL</label>
                            <select
                                id="level"
                                value={tokenState.level || ""}
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
                                value={tokenState.showflag}
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