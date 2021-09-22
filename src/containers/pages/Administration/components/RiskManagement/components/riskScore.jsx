import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
    changeTitleRequest,
    getFormulaForProbabilty,
    updateFormulaForProbabilty,
} from '../../../../../../actions/administration';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import * as Yup from 'yup'
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components'
import RickScoreForm from './riskScoreChangeForm'
import { Radio, Input, Space } from 'antd';
import _ from 'lodash';
import PageHeader from '../../../../../layout/pageHeader';


const CustomView = styled.div`
`

const View = styled.div`
`
const Label = styled.div`
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
`
const AutoCalculationValue = styled.div`
   border:1px solid grey;
   display:flex;
   justify-content:center;
   align-items:center;
   margin-top:5rem;
`
const AutoLabel = styled.div`
   font-size:30px;

`

const RiskScore = ({
    selectedFormula,
    getSelectedFormula,
    changeNameHandler,
    updateFormula,
    changeTitle,
    riskScore,
    access
}) => {
    const { confirm } = Modal;
    const history = useHistory();
    const [showChangeTitleModal, setShowChangeTitleModal] = useState();
    const [selectCalculation, setSelectCalculation] = useState("Asset")
 
    const handleCalculation = (e) => {
        setSelectCalculation(e.target.value)
        const payload = {
            rks_select: e.target.value
        }
        updateFormula(payload, true)
    }
    const change = (values) => {
        if (!_.isEmpty(values)) {
            changeNameHandler(values)
        }
        setShowChangeTitleModal(false)
    }
    let validationSchemaStandard = Yup.object({
        lhv_label: Yup.string().required('Required'),
    });

    const handleSubmit = (values) => {
        if (values) {
            changeTitle(values, true)
        }
        setShowChangeTitleModal(false)
    }

    useEffect(()=>{
        getSelectedFormula();
    }, [])

    useEffect(()=>{
        if(selectedFormula){
            setSelectCalculation(selectedFormula.rks_select  ||  "Asset" );
        }
    }, [selectedFormula]);

    return (
        <View>
            <SPDrawer
                title={`Change Title`}
                isVisible={showChangeTitleModal}
                onClose={() => setShowChangeTitleModal(false)}
            >
                <RickScoreForm
                    closeDrawer={() => setShowChangeTitleModal(false)}
                    isVisible={showChangeTitleModal}
                    onCancle={() => setShowChangeTitleModal(false)}
                    changeHandler={handleSubmit}
                    riskScore={riskScore}
                />
            </SPDrawer>
            <PageHeader
                title={riskScore?.rks_label}
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("change-title-risk-score"))) &&
                    <SPButton
                        title="Change Title"
                        onButtonClick={() => {
                            setShowChangeTitleModal(true);
                        }}
                        size="small"
                    />
                ]}
            />
            <Row>
                <Col span={12} style={{ marginBottom: 20 }}>
                    {(access!==undefined && (access.includes("all-super-admin") || access.includes("index-risk-score"))) &&
                    <Radio.Group onChange={handleCalculation} value={selectCalculation}>
                        <Space direction="vertical">
                            <Radio value="Asset" style={{ color: "#fff" }}>{riskScore?.rks_label} = Asset Value X Change tit</Radio>
                            <Radio value="Business" style={{ color: "#fff" }}>{riskScore?.rks_label} = Business Impact X Change title</Radio>
                        </Space>
                    </Radio.Group> }
                </Col>
            </Row>
            {selectCalculation === "Business" && (
                <Row>
                    <Col span={24}>
                        <AutoCalculationValue>
                            <AutoLabel>{riskScore?.rks_label} = Business Impact X Change title</AutoLabel>
                        </AutoCalculationValue>
                    </Col>
                </Row>

            )}
            {selectCalculation === "Asset" && (
                <Row>
                    <Col span={24}>
                        <AutoCalculationValue>
                            <AutoLabel>{riskScore?.rks_label} = Asset Value X Change title</AutoLabel>
                        </AutoCalculationValue>
                    </Col>
                </Row>

            )}
        </View>
    );
};

const mapStateToProps = state => ({
    selectedFormula: state.administration.riskManagement?.selectedFormula,
    isLoading: state.administration.riskManagement.loading,
    riskScore: state.administration?.allTabsHeading?.listData?.riskScore,
});

const mapDispatchToProps = dispatch => ({
    getSelectedFormula:() => dispatch(getFormulaForProbabilty()),
    updateFormula: (...args) => dispatch(updateFormulaForProbabilty(...args)),
    changeTitle: (...args) => dispatch(changeTitleRequest(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(RiskScore);
