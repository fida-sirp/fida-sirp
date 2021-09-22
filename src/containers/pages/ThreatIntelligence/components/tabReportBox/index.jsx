import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button, Modal, Row, Col } from 'antd';
import SPCog from '../../../../../components/SPCog';
import {
  StyledCategoryBox,
  ListMain,
  StyledBox,
  ListStyle,
  ListLabelStyle,
} from './StyledComponents';
import { isArray } from 'lodash';
import EvidenceTable from '../evidenceTable';
import Report from './Report';
import { addArtifactAction } from '../../../../../actions/incidentMasterData';

function TabReportBox({
  threatIntelligenceDetails,
  evidenceList,
  addEvidence,
  showConfirm,
  executeAction,
  addExectionData,
  incidentActionsMapped,
  executed,
  addArtifactAction,
  actions,
  multiConfigExecutionAction,
  getRawData,
  onClearRawData,
  getThreatDetails,
  threatIntelligenceRawOutput,
  downloadFile
}) {
  const [activeAction, setActiveAction] = React.useState({});
  const [rowJsonToView, setRowJsonToView] = React.useState({});
  const [activeTab, setActiveTab] = useState({
    key: 'evidence',
  });

  React.useEffect(() => {
    setActiveAction(actions?.[0]);
  }, [actions]);

  const jsonEditorRef = React.useRef(null);

  React.useEffect(() => {
    if (jsonEditorRef.current !== null) {
      jsonEditorRef.current.set(rowJsonToView);
    }
  }, [rowJsonToView]);

  const setRef = instance => {
    if (instance) {
      jsonEditorRef.current = instance.jsonEditor;
    } else {
      jsonEditorRef.current = null;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          2nd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const onAddArtifactAction = data => {
    addArtifactAction(data);
  };
  const showArtifactsTabDetails = () => {
    if (activeTab?.key === 'evidence') {
      return (
        <EvidenceTable
          evidences={evidenceList}
          onRemoveTag={showConfirm}
          getThreatDetails={getThreatDetails}
          onSelectOption={key => alert("Hello")}
          executeAction={executeAction}
          addExectionData={addExectionData}
          multiConfigExecutionAction={multiConfigExecutionAction}
          fileDowload={downloadFile}
          addArtifactAction={data => {
            onAddArtifactAction(data);
          }}
        />
      );
    }

    return isArray(incidentActionsMapped?.applications)
      ? incidentActionsMapped?.applications.map(app => {
        if (app?.app_id === activeTab?.key) {
          return (
            <Report
              threatIntelligenceRawOutput={threatIntelligenceRawOutput}
              getRawData={getRawData}
              addEvidence={addEvidence}
              onClearRawData={onClearRawData}
              actions={
                isArray(incidentActionsMapped?.actions)
                  ? incidentActionsMapped?.actions.filter(act => {
                    return act?.act_app_id === activeTab?.key;
                  })
                  : []
              }
              executed={
                isArray(incidentActionsMapped?.executed)
                  ? incidentActionsMapped?.executed
                  : []
              }
            />
          );
        }
        return null;
      })
      : null;
  };

  return (
    <StyledCategoryBox>
      <ListMain>
        {[
          {
            key: 'evidence',
            value: 'evidence',
            label: 'Evidence',
          },
          ...(isArray(incidentActionsMapped?.applications)
            ? incidentActionsMapped?.applications.map(app => {
              return {
                key: app.app_id,
                value: app.app_id,
                label: app.app_product_name,
                details: app,
              };
            })
            : []),
        ].map(cat => (
          <ListStyle.Item role="button" onClick={() => setActiveTab(cat)} style={
            activeTab?.key === cat?.key
              ? {
                borderLeft: '5px solid #33C758',
                paddingLeft: 10,
                width: 100
              }
              : {
                borderLeft: '5px solid #2C2C38',
                paddingLeft: 10, width: 100
              }
          }  >
            <ListLabelStyle>{cat.label}</ListLabelStyle>
          </ListStyle.Item>
        ))}
      </ListMain>
      <StyledBox>{showArtifactsTabDetails()}</StyledBox>
    </StyledCategoryBox>
  );
}

export default TabReportBox;
