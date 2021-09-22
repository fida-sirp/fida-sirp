import { Row, Col, Modal, Image } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  threatIntelligenceDetail
} from '../../../../../actions/threatIntelligence';
import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';
import editIcon from '../../../../../assets/images/Shape.png';
import TextAreaBox from '../../../../../components/TextAreaBox';
import TextEditorBox from '../../../../../components/TextEditorBox';
// import EditableContainer  from '../editableContainer/index'

import {
  Header,
  StyledRow,
  StyledDiv,
  Separator,
  RowDiv,
  ImagePDiv,
  SImage,
  Container,
  Text,
  Simg,
  PRelativeDiv,
} from './StyledComponents';
import SPRiskTag from '../../../../../components/SPRiskTag';
import SPButton from '../../../../../components/SPButton';
import InfoTab from '../infoTab';
import SPDrawer from '../../../../../components/SPDrawer';
import { updateAdvisory } from '../../../../../actions/threatIntelligence';
import EditTicket from '../editTicket';
import TextEditBox from '../TextEditCommon';

const ThreatIntelligenceDetailsbox = ({
  threatIntelligence,
  threatIntelligenceUpdateAdversory,
  updateDetailsActions,
  onThreatIntelligenceDetail,
  onUpdateThreatIntel,
}) => {
  const [Status, setStatus] = useState('Pending');
  const [isEdit, setisEdit] = useState(true);


  useEffect(() => {
    if (threatIntelligence?.adv_status) {
      setStatus(threatIntelligence?.adv_status);
    }
  }, [threatIntelligence?.adv_status]);

  const outerRef = useRef(null);

  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const onEditDrawerOpen = () => {
    // onThreatIntelligenceDetailHandler()
    setIsEditDrawerVisible(true);
    localStorage.setItem('isEdit', 1);
  };

  const onEditDrawerClose = (imported = false) => {
    setIsEditDrawerVisible(false);
    localStorage.setItem('isEdit', 0);
    // onThreatIntelligenceDetail()
    onThreatIntelligenceDetail(threatIntelligence?.adv_id);
    // incidentDetails(ionThreatIntelligenceDetaild);
  };


  function setPriorityType(adv_severity) {
    let type = 'danger';
    if (adv_severity === 'High') {
      type = 'danger';
    }
    if (adv_severity === 'Medium') {
      type = 'warning';
    }
    if (adv_severity === 'Low') {
      type = 'success';
    }
    return type;
  }
  const StatusItem = [
    {
      key: 'Pending',
      label: 'Pending',
    },
    {
      key: 'Release',
      label: 'Release',
    },
  ];

  const showConfirm = key => {
    Modal.confirm({
      title: 'Are You Sure You Want to Change Status',
      centered: true,
      okText: 'Confirm',
      onOk() {
        setStatus(key);
        onUpdateThreatIntel('adv_status', key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const Row1 = (
    <StyledDiv>
      <TextEditBox
        title="Summary"
        data={threatIntelligence?.adv_analysis_summary}
        isEditableEnabled={true}
        closeEditView={isEdit}
        editDetails={data => {
          setisEdit(false);
          onUpdateThreatIntel('adv_analysis_summary', data);
        }}
      />
    </StyledDiv>
  );

  const Row2 = (
    <StyledDiv>
      <TextEditBox
        title="Description"
        data={threatIntelligence?.adv_description}
        isEditableEnabled={true}
        closeEditView={isEdit}
        editDetails={data => {
          setisEdit(false);
          onUpdateThreatIntel('adv_description', data);
        }}
      />
    </StyledDiv>
  );
  const Row3 = (
    <StyledDiv>
      <TextEditBox
        title="Impact"
        data={threatIntelligence?.adv_impact}
        isEditableEnabled={true}
        closeEditView={isEdit}
        editDetails={data => {
          setisEdit(false);
          onUpdateThreatIntel('adv_impact', data);
        }}
      />
    </StyledDiv>
  );

  const updateDetails = (id, value) => {
    updateDetailsActions(id, value, "", false);
    onEditDrawerClose();
  };

  return (
    <>
      <Header>
        <RowDiv>
          <InfoTab
            label="Category"
            value={threatIntelligence?.advCategory?.adc_name}
          />
          <InfoTab
            label="Type"
            value={threatIntelligence?.advDisposition?.add_name}
          />
          <InfoTab
            label="Severity"
            value={
              <SPRiskTag
                text={threatIntelligence?.adv_severity}
                type={setPriorityType(threatIntelligence?.adv_severity)}
              />
            }
          />
          <InfoTab
            label="Released Date"
            value={threatIntelligence?.adv_release_date}
          />
        </RowDiv>
        <StyledRow gutter={15} justify="end">
          <Col>
            <SPButton
              type="secondary"
              title="Edit"
              size="small"
              onButtonClick={onEditDrawerOpen}
            />
            <SPDrawer
              title="Edit Threat Intel"
              isVisible={isEditDrawerVisible}
              onClose={onEditDrawerClose}
              maskClosable={false}
            >
              <EditTicket
                selectedThreatIntelligence={threatIntelligence}
                type="edit"
                updateUserTicket={(id, value) => updateDetails(id, value)}
                onCloseDrawer={onEditDrawerClose}
              />
            </SPDrawer>
          </Col>
          <Col style={{ height: 33 }}>
            <SPSingleSelectDropdown
              title={Status}
              items={StatusItem}
              onSelect={({ key }) => showConfirm(key)}
              selectedItems={Status}
              type="secondary"
              size="small"
            />
          </Col>
        </StyledRow>
      </Header>
      <Container ref={outerRef}>
        {Row1}
        <Separator />
        {Row2}
        <Separator />
        {Row3}
      </Container>
    </>
  );
};

ThreatIntelligenceDetailsbox.propTypes = {
  threatIntelligence: PropTypes.object,
};

const mapStateToProps = state => ({
  threatIntelligenceUpdateAdversory: state.threatIntelligenceUpdateAdversory,
});

const mapDispatchToProps = dispatch => ({
  updateDetailsActions: (...args) => dispatch(updateAdvisory(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreatIntelligenceDetailsbox);
