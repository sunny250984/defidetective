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
    const [influencerState, setInfluencerState] = useState({});

    const handleChange = (e) => {
        setInfluencerState({ ...influencerState, [e.target.id]: e.target.value })
    }

    const handleClickSubmit = async() => {
        await dispatch(props.saveData(influencerState));
        props.setMVisible(false)

    }

    useEffect(() => {
        setInfluencerState({
            ...props.selectedData,
        });
    }, [props.selectedData])

    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>PARTNER</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="name"
                            label="NAME"
                            value={influencerState.name || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="url"
                            label="URL"
                            value={influencerState.url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="logo_url"
                            label="LOGO"
                            value={influencerState.logo_url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="website"
                            label="WEBSITE"
                            value={influencerState.website || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="telegram"
                            label="TELEGRAM"
                            value={influencerState.telegram || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="twitter"
                            label="TWITTER"
                            value={influencerState.twitter || ""}
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
export default Modal;