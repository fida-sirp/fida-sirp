import React from 'react';
import { Menu, Dropdown, Modal, Row, Col } from 'antd';
import SPCog from '../../../../../components/SPCog';
import {
  StyledBox,
  StyledTab,
  StyleTabPane,
  StyleFlex,
  TimeListMain,
  DomainListMain,
  ListStyle,
  ListLabelStyle,
  RightOutlinedStyle,
  ReportBox,
  ReportTable,
  StyleEditor,
} from './StyledComponents';
import { isArray, isObject } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getActionRowOutputAction } from './../../../../../actions/actionRowOutput';
import { getArtifactListAction } from './../../../../../actions/incidentMasterData';
 

import { SModal } from '../SendEmailModal/StyledComponents';
import AddToArtifact from '../addToArtifact';
const data = [
  {
    key: '1',
    value: 'John Brown',
  },
  {
    key: '2',
    value: 'Jim Green',
  },
  {
    key: '3',
    value: 'Joe Black',
  },
  {
    key: '4',
    value: 'Jim Red',
  },
  {
    key: '5',
    value: 'Jake White',
  },
];

function TabReportBox({
  ina_incident_id,
  actions,
  executed,
  actionRowOutput,
  getActionRowOutputAction,
  onAddArtifactAction,
  formMaster,
  getArtifactListAction,
  addEvidence
}) {
  const [activeAction, setActiveAction] = React.useState({});
  const [activeSubAction, setActiveSubAction] = React.useState({});
  const [ htmlOutPut, setHtmlOutPut] =  React.useState(null);
  const [ isType, setIsType] =  React.useState(false);
  const [
    activeSubActionThirdLevel,
    setActiveSubActionThirdLevel,
  ] = React.useState({});
  const [rowInputModalVisible, setRowInputModalVisible] = React.useState(false);
  const [rowJsonToView, setRowJsonToView] = React.useState({});
  const [artifactModalVisible, setArtifactModalVisible] = React.useState(false);

  React.useEffect(() => {
    setActiveAction(actions?.[0]);
  }, [actions]);
  const subActions = isArray(executed)
    ? executed.filter(e => {
      return e?.ina_action_id === activeAction?.act_id;
    })
    : [];

  let dataSourceForSubActions = {};
  subActions
    .sort(
      (a, b) =>
        new Date(b.ina_executed_at).getTime() -
        new Date(a.ina_executed_at).getTime()
    )
    .forEach(subAction => {
      if (dataSourceForSubActions?.[subAction?.ina_executed_at]) {
        dataSourceForSubActions[subAction?.ina_executed_at] = {
          actions: [
            ...dataSourceForSubActions?.[subAction?.ina_executed_at]?.actions,
            subAction,
          ],
        };
      } else {
        dataSourceForSubActions[subAction?.ina_executed_at] = {
          actions: [subAction],
        };
      }
    });

  React.useEffect(() => {
    setActiveSubAction(Object.keys(dataSourceForSubActions)?.[0]);
    console.log({ dataSourceForSubActions });
    setActiveSubActionThirdLevel(
      dataSourceForSubActions[Object.keys(dataSourceForSubActions)?.[0]]
        ?.actions?.[0]
    );
  }, [activeAction]);

  React.useEffect(() => {
    console.log('setActiveSubActionThirdLevel');
    console.log({ dataSourceForSubActions });
    setActiveSubActionThirdLevel(
      dataSourceForSubActions[activeSubAction]?.actions?.[0]
    );
  }, [activeSubAction]);

  function callback(key) {
    setActiveAction(actions?.[key - 1]);
  }

  console.log({ activeSubActionThirdLevel });

  let jsonEditorIntance = null;
  const jsonEditorRef = React.useRef(null);

  React.useEffect(() => {
    try {
      if (
        jsonEditorRef.current !== null &&
        actionRowOutput?.result?.ina_output
      ) {
        console.log('json ', actionRowOutput?.result?.ina_output);
        jsonEditorRef.current.set(
          JSON.parse(actionRowOutput?.result?.ina_output)
        );
      }
    } catch (error) {
      console.log({ error });
      jsonEditorRef.current.set({});
    }
  }, [actionRowOutput]);

  const setRef = instance => {
    if (instance) {
      jsonEditorRef.current = instance.jsonEditor;
    } else {
      jsonEditorRef.current = null;
    }
  };

  console.log({ TabReportBox: formMaster });
  return (
    <StyledBox>
      <AddToArtifact
        isType  = {isType }
        htmlOutPut = {htmlOutPut}
        artifact_type={
          isObject(formMaster?.incidenArtifactList?.result)
            ? Object.keys(formMaster?.incidenArtifactList?.result).map(k => {
              return {
                label: formMaster?.incidenArtifactList?.result[k],
                value: k,
              };
            })
            : []
        }
        onClose={() => {
          setArtifactModalVisible(false);
        }}
        onAdd={values => {
          setArtifactModalVisible(false);
          if(isType){
            
            addEvidence({
             
                values:{
                  heading:values.heading
                },
                ina_output_html:values.ina_output_html
              
            }
              ,ina_incident_id
              );
          }else{
            onAddArtifactAction(values);
          }
          
        }}
        visible={artifactModalVisible}
      />

      <SModal
        title="Raw Output"
        visible={rowInputModalVisible}
        onCancel={() => setRowInputModalVisible(false)}
        width="825px"
        height="400px"
        footer={[]}
      >
        <StyleEditor
          ref={setRef}
          mode={'view'}
          value={rowJsonToView}
          onChange={() => null}
        />
      </SModal>

      <StyledTab defaultActiveKey="1" onChange={callback}>
        {actions?.map((action, index) => {
          return (
            <StyleTabPane tab={action?.act_name} key={index + 1}>
              <StyleFlex>
                <TimeListMain>
                  <ListStyle
                    dataSource={Object.keys(dataSourceForSubActions)}
                    renderItem={item => (
                      <ListStyle.Item
                        style={
                          activeSubAction === item
                            ? {
                              borderLeft: '5px solid #33C758',
                            }
                            : {
                              borderLeft: '5px solid #2C2C38',
                            }
                        }
                        onClick={() => setActiveSubAction(item)}
                      >
                        <ListLabelStyle>{item}</ListLabelStyle>
                        <RightOutlinedStyle />
                      </ListStyle.Item>
                    )}
                  />
                </TimeListMain>
                <DomainListMain>
                  <ListStyle
                    dataSource={
                      isArray(
                        dataSourceForSubActions?.[activeSubAction]?.actions
                      )
                        ? dataSourceForSubActions?.[activeSubAction]?.actions
                        : []
                    }
                    renderItem={item => (
                      <ListStyle.Item
                        style={
                          activeSubActionThirdLevel === item
                            ? {
                              borderLeft: '5px solid #33C758',
                            }
                            : {
                              borderLeft: '5px solid #2C2C38',
                            }
                        }
                        onClick={() => setActiveSubActionThirdLevel(item)}
                      >
                        <ListLabelStyle>{item?.ina_input}</ListLabelStyle>
                        <RightOutlinedStyle />
                      </ListStyle.Item>
                    )}
                  />
                </DomainListMain>
                <ReportBox>
                  <Row>
                    <Col span={16}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: activeSubActionThirdLevel?.ina_output_html
                            ? activeSubActionThirdLevel?.ina_output_html
                            : '<pre>Execution in progress</pre>',
                        }}
                      ></div>
                    </Col>
                    <Col span={2}>
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              onClick={item => {
                                const ina_id =
                                  activeSubActionThirdLevel?.ina_id;
                                getActionRowOutputAction(ina_id);
                                setRowInputModalVisible(true);
                              }}
                            >
                              Show Raw Output
                            </Menu.Item>
                            <Menu.Item
                              onClick={item => {
                                setIsType(true);
                                getArtifactListAction();
                                setHtmlOutPut(activeSubActionThirdLevel?.ina_output_html);
                                setArtifactModalVisible(true);
                              }}
                            >
                              Add to evidence
                            </Menu.Item>
                          </Menu>
                        )}
                        placement="bottomLeft"
                      >
                        <div>
                          <SPCog />
                        </div>
                      </Dropdown>
                    </Col>
                  </Row>
                </ReportBox>
              </StyleFlex>
            </StyleTabPane>
          );
        })}
      </StyledTab>
    </StyledBox>
  );
}
//

const mapStateToProps = state => {
  return {
    actionRowOutput: state.actionRowOutput,
  };
};

const mapDispatchToProps = {
  getActionRowOutputAction,
  getArtifactListAction,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  TabReportBox
);
