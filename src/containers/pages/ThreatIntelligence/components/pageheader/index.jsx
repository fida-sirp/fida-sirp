import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { StyledDiv, StyledText, StyledButton } from './StyledComponents';
import { useHistory } from 'react-router-dom'
import SPButton from '../../../../../components/SPButton';
import BackArrowOutline from '../../../../../assets/svgIcon/backArrowOutline';
import PlayButton from '../../../../../assets/svgIcon/playButton';
import SPDrawer from '../../../../../components/SPDrawer';
import OpenCase from '../openCase';


const PageHeader = ({
  incidentId,
  onClickSendEmail,
  onAdvisoryExportAsPDF,
  data,
  showConfirm,
}) => {
  const [isVisibleDrawerOpenCase, setIsVisibleDrawerOpenCase] = useState(false);
  const history = useHistory();

  const onOpenCaseDrawerOpen = () => {
    setIsVisibleDrawerOpenCase(true);
  };

  const onOpenCaseDrawerClose = () => {
    setIsVisibleDrawerOpenCase(false);
  };
  return (
    <StyledDiv>
      <StyledDiv>
        <StyledButton
          onClick={() => history.push(`/threatIntelligence`)}
        >
          <BackArrowOutline />
        </StyledButton>
        <StyledText bold={true}>Threat Intelligence #{data?.adv_tid} :</StyledText>
        <StyledText>{data?.adv_title}</StyledText>
      </StyledDiv>
      <Row gutter={[15, 3]} justify="end">
        <Col>
          {data?.adv_status === 'Release' && (<SPButton
            size="small"
            title={data?.advCase ? "View Case" : "Open Case"}
            type={data?.advCase ? "secondary" : "danger"}
            onButtonClick={data?.advCase !== null ? () => history.push(`/cases/details/${data?.advCase?.iti_id}`) : onOpenCaseDrawerOpen}
          />)}
          <SPDrawer
            title="Open Case"
            isVisible={isVisibleDrawerOpenCase}
            onClose={onOpenCaseDrawerClose}
            drawerWidth={800}
          >
            <OpenCase isVisible={isVisibleDrawerOpenCase} onOpenCaseDrawerClose={() => onOpenCaseDrawerClose()} />
          </SPDrawer>
        </Col>
        <Col>
          <SPButton onButtonClick={showConfirm} size="small" title="Run Playbook" image={<PlayButton />} />
        </Col>
        <Col>
          <SPButton
            size="small"
            onButtonClick={onClickSendEmail}
            title="Send Email"
          />
        </Col>
        <Col>
          <SPButton
            size="small"
            title="Export PDF"
            onButtonClick={() => onAdvisoryExportAsPDF(incidentId)}
          />
        </Col>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Col>
      </Row>
    </StyledDiv>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  incidentId: PropTypes.number,
};
