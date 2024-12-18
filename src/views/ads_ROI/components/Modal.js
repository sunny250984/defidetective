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
    const [adsState, setAdsState] = useState({level:1, kind:0});

    const handleChange = (e) => {
        setAdsState({ ...adsState, [e.target.id]: e.target.value })
    }
    
    // create image section start---
    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setAdsState({
                ...adsState,
                ads_img: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }

    const handleChangeFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        createImage(files[0]);
    }
    // create image section end---

    // const handleChooseAds = (e) => {
    //     setAdsState({
    //         ...adsState,
    //         level: '1',
    //     });
    // }

    const handleClickSubmit = async() => {
        // console.log(adsState)
        await dispatch(props.saveData(adsState));
        props.setMVisible(false)
    }


    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>ADVERTISE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={6}>
                        <CFormInput
                            type="file"
                            id="ads_img"
                            label="IMAGE"
                            onChange={(e) => handleChangeFile(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={6}>
                        <CFormInput
                            type="text"
                            id="ads_url"
                            label="URL"
                            value={adsState.ads_url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="kind">ROI/TOKEN</label>
                            <select
                                id="kind"
                                value={adsState.kind}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value={0}>ROI</option>
                                <option value={1}>TOKEN</option>
                            </select>
                        </div>
                    </CCol>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="level">LEVEL</label>
                            <select
                                id="level"
                                value={adsState.level || ""}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value={0}></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
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