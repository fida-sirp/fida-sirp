import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as _ from 'lodash';

import { onGetRiskMetaList, onRiskMetaLabelUpdate, onUpdateRiskMeta } from "../../../../../../actions/administration";
import AuthTokenHOC from "../../../../../../HOCs/AuthTokenHOC";
import SetDocumentTitleHOC from "../../../../../../HOCs/SetDocumentTitleHOC";
import { Card, Col, Row } from "antd";
import SPToggleSwitch from "../../../../../../components/SPToggleSwitch";
import { Label } from "../../../../../../components/InputBox/StyledComponents";
import { FormOutlined } from "@ant-design/icons";
import SPButton from "../../../../../../components/SPButton";
import { Fonts } from "../../../../../../theme";
import SPDrawer from "../../../../../../components/SPDrawer";
import RiskMetaForm from './RiskMetaForm';



const RiskMeta = ({
    onGetRiskMetaList,
    riskMetaList,
    isSuccess,
    riskMetaLabelUpdate,
    onUpdateRiskMeta,
    access
}) => {

    const [riskMetaLists, setRiskMetaLists] = useState([]);
    const [treatmentMetaList, setTreatmentMetaList] = useState([]);
    const [drawerStatus, setDrawerStatus] = useState(false);
    const [labelValue, setLabelValue] = useState('');
    const [selectedId, setSelectedId] = useState();

    useEffect(() => {
        onGetRiskMetaList()
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setRiskFieldValues();
            setTreatmentFieldValues();
        }

    }, [isSuccess]);


    const setRiskFieldValues = () => {
        const riskFields = [];
        for (let riskKey in riskMetaList.risk_fields) {
            const isRenamable = riskMetaList?.risk_renamable_fields.find(item => item?.rrl_key === riskKey);
            console.log(isRenamable);
            const isSelected = riskMetaList?.risk_selected_fields.some(item => item === riskKey);
            riskFields.push({
                key: riskKey,
                label: riskMetaList.risk_fields[riskKey],
                isEnabled: isSelected ? true : false,
                renamableKey: isRenamable ? Number(isRenamable.rrl_id) : null,
                isRenamable: isRenamable ? true : false
            })
        }
        // debugger;
        setRiskMetaLists(riskFields);
        //   debugger;
    }

    const setTreatmentFieldValues = () => {
        const treatmentFields = [];
        for (let treatmentKey in riskMetaList.treatment_fields) {
            const isRenamable = riskMetaList?.treatment_renamable_fields.find(item => item?.rrl_key === treatmentKey);
            const isSelected = riskMetaList?.treatment_selected_fields.some(item => item === treatmentKey);
            treatmentFields.push({
                key: treatmentKey,
                label: riskMetaList.treatment_fields[treatmentKey],
                isEnabled: isSelected ? true : false,
                renamableKey: isRenamable ? Number(isRenamable.rrl_id) : null,
                isRenamable: isRenamable ? true : false
            })
        }
        setTreatmentMetaList(treatmentFields);
    }

    const toggleRiskSwitch = (index, key) => {
        const riskMeta = [...riskMetaLists];
        const status = riskMeta[index].isEnabled;
        riskMeta[index].isEnabled = !status;
        setRiskMetaLists(riskMeta);
    }

    const toggleTreatmentSwitch = (index, key) => {
        const treatmentMeta = [...treatmentMetaList];
        const status = treatmentMeta[index].isEnabled;
        treatmentMeta[index].isEnabled = !status;
        setTreatmentMetaList(treatmentMeta);
    }


    const handleLabelSubmit = (payload) => {
        // debugger
        setDrawerStatus(false);
        setLabelValue(payload.rrl_value);
        riskMetaLabelUpdate(selectedId, payload)
    }

    const updateRiskMeta = () => {

        const selectedRisk = riskMetaLists.filter(item => item.isEnabled === true).map(item => item.key).join(',');
        const selectedTreatments = treatmentMetaList.filter(item => item.isEnabled === true).map(item => item.key).join(',');
        const payload = {
            rkm_risk_fields: selectedRisk,
            rkm_treatment_fields: selectedTreatments
        }
        onUpdateRiskMeta(payload);
    }


    return (
        <>
            <Card style={{ background: '#13131A' }}>
                <Row>
                    {
                        _.map(riskMetaLists, (item, index) => {
                            return <Col span={8} style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
                                <SPToggleSwitch onChecked={item.isEnabled} onChange={() => toggleRiskSwitch(index, item.key)} />
                                <span style={{ paddingLeft: 10, color: '#FFF', fontSize: 15, fontWeight: '600' }}>
                                    {item.label}
                                    {
                                        item.isRenamable ?
                                            <FormOutlined
                                                onClick={() => {
                                                    setLabelValue(item.label);
                                                    setDrawerStatus(true);
                                                    setSelectedId(item.renamableKey)
                                                }}
                                                style={{ color: '#FFF', cursor: 'pointer', paddingLeft: 10 }} />
                                            : null
                                    }

                                </span>

                            </Col>
                        })
                    }

                </Row>

                <Row style={{ marginTop: 50 }}>
                    {
                        _.map(treatmentMetaList, (item, index) => {
                            return <Col span={8} style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
                                <SPToggleSwitch onChecked={item.isEnabled} onChange={() => toggleTreatmentSwitch(index, item.key)} />
                                <span style={{ paddingLeft: 10, color: '#FFF', fontSize: 15, fontWeight: '600' }}>
                                    {item.label}
                                    {
                                        item.isRenamable ?
                                            <FormOutlined
                                                onClick={() => {
                                                    setLabelValue(item.label);
                                                    setDrawerStatus(true);
                                                    setSelectedId(item.renamableKey)
                                                }}
                                                style={{ color: '#FFF', cursor: 'pointer', paddingLeft: 10 }} />
                                            : null
                                    }
                                </span>
                            </Col>
                        })
                    }

                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col>
                        <SPButton
                            title="Update"
                            onButtonClick={() => updateRiskMeta()}
                            size="small"
                        />
                    </Col>
                </Row>

            </Card>
            <SPDrawer
                title={`Update Risk Labels`}
                isVisible={drawerStatus}
                // drawerWidth={600}
                onClose={() => setDrawerStatus(false)}
            >
                {/* <RiskMetaForm></RiskMetaForm> */}
                <RiskMetaForm
                    recordValue={labelValue}
                    submit={handleLabelSubmit}
                    closeDrawer={() => setDrawerStatus(false)}
                />
            </SPDrawer>
        </>
    )
}




const mapStateToProps = state => ({
    riskMetaList: state.administration.riskMetaList.listData,
    isSuccess: state.administration.riskMetaList.isSuccess,
});

const mapDispatchToProps = dispatch => ({
    onGetRiskMetaList: () => dispatch(onGetRiskMetaList()),
    riskMetaLabelUpdate: (...args) => dispatch(onRiskMetaLabelUpdate(...args)),
    onUpdateRiskMeta: (payload) => dispatch(onUpdateRiskMeta(payload)),
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(RiskMeta);
