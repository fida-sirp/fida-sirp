import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';
import { StyledDiv, StyledText, StyledButton } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import SPMultilevelDropdown from '../../../../../components/SPMultilevelDropdown';
import BackArrowOutline from '../../../../../assets/svgIcon/backArrowOutline';
import PlayButton from '../../../../../assets/svgIcon/playButton';
import NineDot from '../../../../../assets/svgIcon/nineDot';
import { isArray } from 'lodash';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const AppList = [
  {
    key: 'sirp',
    label: 'SIRP',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'virusTotal',
    label: 'Virus Total',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'ipInfo_io',
    label: 'IPInfo.io',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'maxMind',
    label: 'MaxMind',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'abuseIPDM',
    label: 'AbuseIPDM',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'mxToolBox',
    label: 'MXToolBox',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'whoIsXML',
    label: 'WhoisXML',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'fireEyeHX',
    label: 'FIREEYE HX',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
  {
    key: 'wsaProxy',
    label: 'WSA Proxy',
    items: [
      {
        subKey: 'action1',
        subLabel: 'Action 1',
      },
      {
        subKey: 'action2',
        subLabel: 'Action 2',
      },
      {
        subKey: 'action3',
        subLabel: 'Action 3',
      },
    ],
  },
];

function PageHeader({
  incidentId,
  incidentTitle = '',
  onClickSendEmail,
  onExportPDF,
  incidentMasterActionApps,
  onClose,
  type,
  setRunPlayBook,
  onRunAction,
  access
}) {
  const history = useHistory();

  return (
    <StyledDiv>
      <StyledDiv>
        <StyledButton
          onClick={() => {
            history.goBack && history.goBack();
          }}
        >
          <BackArrowOutline />
        </StyledButton>
        <StyledText bold={true} style={{textTransform:'capitalize'}}>
          {type} #{incidentId} :
        </StyledText>
        <StyledText>{incidentTitle}</StyledText>
      </StyledDiv>
      <Row gutter={[15, 3]} justify="end">
        { (access!==undefined && (access.includes("all-super-admin") || access.includes("create-playbooks-queue"))) &&
        <Col>
          <SPButton
            onButtonClick={setRunPlayBook}
            size="small"
            title="Run Playbook"
            image={<PlayButton />}
          />
        </Col> }
        {(access!==undefined && (access.includes("all-super-admin") || access.includes("send-email-incident-tickets"))) &&
        <Col>
          <SPButton
            size="small"
            onButtonClick={onClickSendEmail}
            title="Send Email"
          />
        </Col> }
        {(access!==undefined && (access.includes("all-super-admin") || access.includes("pdf-incident-tickets"))) &&
        <Col>
          <SPButton
            size="small"
            title="Export PDF"
            onButtonClick={onExportPDF}
          />
        </Col> }
        {isArray(incidentMasterActionApps) &&
          incidentMasterActionApps.length > 0 && (
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SPMultilevelDropdown
                icon={<NineDot />}
                items={
                  isArray(incidentMasterActionApps)
                    ? incidentMasterActionApps.map(incidentMasterActionApp => {
                        return {
                          key: incidentMasterActionApp?.actApp?.app_id,
                          value: incidentMasterActionApp?.actApp?.app_id,
                          label:
                            incidentMasterActionApp?.actApp?.app_product_name,
                          items: [
                            {
                              subKey: incidentMasterActionApp?.act_id,
                              value: incidentMasterActionApp?.act_id,
                              subLabel: incidentMasterActionApp?.act_name,
                              incidentMasterActionApp,
                            },
                          ],
                        };
                      })
                    : []
                }
                onSelect={(key, details) => {
                  console.log({ details });
                  const reqData = {
                    act_is_multiinput: Boolean(
                      details?.incidentMasterActionApp?.act_is_multiinput
                    ),
                    app_multi_config_allowed: Boolean(false),
                    act: details?.incidentMasterActionApp?.act_id,
                    input: details?.incidentMasterActionApp?.act_description,
                    module: 'Incident',
                    multi_step:
                      details?.incidentMasterActionApp?.act_is_multistep,
                    app: details?.incidentMasterActionApp?.act_app_id,
                  };
                  onRunAction(reqData);
                }}
              />
            </Col>
          )}
        <Col>
          {(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-tickets"))) &&
          <SPButton
            onButtonClick={() => {
              Modal.confirm({
                title: `Are you sure you want to close this ${type}?`,
                centered: true,
                okText: 'Yes',
                cancelText: 'No',
                icon: <ExclamationCircleOutlined />,
                onOk() {
                  onClose();
                },
                onCancel() {},
              });
            }}
            size="small"
            title="Close"
            type="danger"
          /> }
        </Col>
      </Row>
    </StyledDiv>
  );
}

export default PageHeader;

PageHeader.propTypes = {
  incidentId: PropTypes.number,
};
