import React from 'react';
import { Menu, Dropdown, Modal, Row, Col } from 'antd';
import SPCog from '../../../../../components/SPCog';
import { Form, Formik } from 'formik';
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
import * as Yup from 'yup';
import { isArray, isEmpty, isObject, toArray } from 'lodash';
import { SModal } from '../../../assets/components/TemplateModal/StyledComponents';
import InputBox from '../../../../../components/InputBox';
import SPButton from '../../../../../components/SPButton';
import { ExecuteBtn, RowDiv } from '../evidenceTable/StyledComponents';
import { CodeSandboxCircleFilled } from '@ant-design/icons';

const validationSchema = Yup.object({
  // app_execute_type: Yup.string().required('Required'),
});

const initialValues = value => {
  return null;
  // return value.map(v => {
  //   return { v: '' };
  // });
};

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

function Report({
  actions,
  executed,
  addEvidence,
  onClearRawData,
  getRawData,
  threatIntelligenceRawOutput,
}) {
  const [activeAction, setActiveAction] = React.useState({});
  const [activeSubAction, setActiveSubAction] = React.useState({});
  const [rowInputModalVisible, setRowInputModalVisible] = React.useState(false);
  const [rowJsonToView, setRowJsonToView] = React.useState({});
  const [actId, setActId] = React.useState('');
  const [
    evidenceInputModalVisible,
    setEvidenceInputModalVisible,
  ] = React.useState(false);
  const [outputHtml, setOutputHtml] = React.useState('');

  React.useEffect(() => {
    setActId(actions?.[0]?.act_id);
  }, [actions]);


  React.useEffect(() => {
    if (!isEmpty(actions) && !isEmpty(executed)) {
      const arr = executed[0].filter(e => {
        return e?.ina_action_id == actions?.[0]?.act_id;
      })
      setActiveAction(arr?.[0]);
    }
  }, [executed || actions])

  React.useEffect(() => {
    if (!isEmpty(executed)) {
      const arr = executed[0].filter(e => {
        return e?.ina_action_id == actId;
      })
      setActiveAction(arr?.[0]);
    }
  }, [actId])

  React.useEffect(() => {
    setActiveSubAction(dataSourceForSubActions()[6]);
  }, [activeAction]);

  React.useEffect(() => {
    if (threatIntelligenceRawOutput && threatIntelligenceRawOutput.ina_output) {
      const jsonToConsider = threatIntelligenceRawOutput.ina_output;
      let rowJson = {};
      if (jsonToConsider) {
        try {
          const jsonObj = JSON.parse(jsonToConsider);
          rowJson = isObject(jsonObj) ? jsonObj : JSON.parse(jsonObj);
        } catch (e) {
          rowJson = jsonToConsider;
        }
      }

      setRowJsonToView(rowJson);
      setRowInputModalVisible(true);
    }
  }, [threatIntelligenceRawOutput]);

  function callback(key) {
    setActId(actions[key - 1].act_id);
  }

  const dataSourceForMainActions = isArray(executed)
    ? executed[0].sort((a, b) => new Date(b.ina_executed_at).getTime() -
      new Date(a.ina_executed_at).getTime()
    ).filter(e => {
      return e?.ina_action_id == actId;
    })
    : [];

  const dataSourceForSubActions = () => {
    if (!isEmpty(activeAction)) {
      const objectArray = Object.entries(activeAction);
      const arr = [];
      for (var key in activeAction) {
        if (activeAction.hasOwnProperty(key)) {
          arr.push({ [key]: activeAction[key] });
        }
      }
      return arr;
    }
    return [];
  };
  let jsonEditorIntance = null;
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

  if (jsonEditorIntance) {
    jsonEditorIntance.set(rowJsonToView);
  }
  return (
    <StyledBox>
      <SModal
        title="Add to Evidence"
        visible={evidenceInputModalVisible}
        onCancel={() => {
          setEvidenceInputModalVisible(false);
        }}
        width="825px"
        footer={[]}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            addEvidence({ values, outputHtml });
            setEvidenceInputModalVisible(false);
            // setOutputHtml('');
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => (
            <Form>
              <RowDiv>
                <InputBox
                  id={'heading'}
                  label={'Heading'}
                  name={'heading'}
                  type="text"
                  placeholder={'Input Heading'}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.heading}
                  value={values.heading}
                  touched={touched.heading}
                  width={575}
                />
              </RowDiv>
              <RowDiv>
                <Row gutter={[19, 10]}>
                  <Col>
                    <ExecuteBtn>
                      <SPButton
                        onButtonClick={handleSubmit}
                        title="Select and execute"
                        size="small"
                      />
                    </ExecuteBtn>
                  </Col>
                </Row>
              </RowDiv>
            </Form>
          )}
        </Formik>
      </SModal>
      <Modal
        style={{ color: '#fff' }}
        visible={rowInputModalVisible}
        cancelText="close"
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setRowInputModalVisible(false), onClearRawData();
        }}
        width="825px"
        height="400px"
        footer={null}
      >
        <StyleEditor
          ref={setRef}
          mode={'view'}
          value={rowJsonToView}
          onChange={() => null}
        />
      </Modal>
      <StyledTab defaultActiveKey="1" onChange={callback}>
        {actions.map((item, i) => {

          return (
            <StyleTabPane tab={item.act_name} key={i + 1}>
              <StyleFlex>
                <TimeListMain>
                  <ListStyle
                    dataSource={dataSourceForMainActions}
                    renderItem={item => {
                      return (
                        <ListStyle.Item onClick={() => setActiveAction(item)} style={
                          activeAction === item
                            ? {
                              borderLeft: '5px solid #33C758',
                            }
                            : {
                              borderLeft: '5px solid #2C2C38',
                            }
                        }>
                          <ListLabelStyle>{item?.ina_executed_at}</ListLabelStyle>
                          <RightOutlinedStyle />
                        </ListStyle.Item>
                      )
                    }}
                  />
                </TimeListMain>
                <DomainListMain>
                  <ListStyle
                    dataSource={dataSourceForSubActions()}
                    renderItem={item => {
                      if (item?.['ina_input'])
                        return (
                          <ListStyle.Item
                            onClick={() => setActiveSubAction(item)}
                            style={
                              !isEmpty(activeSubAction) && activeSubAction['ina_input'] === item['ina_input']
                                ? {
                                  borderLeft: '5px solid #33C758',
                                }
                                : {
                                  borderLeft: '5px solid #2C2C38',
                                }
                            }
                          >
                            <ListLabelStyle>{item['ina_input']}</ListLabelStyle>
                            <RightOutlinedStyle />
                          </ListStyle.Item>
                        );
                    }}
                  />
                </DomainListMain>
                <ReportBox>
                  <Row>
                    <Col span={16}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: activeAction?.ina_output_html,
                        }}
                      ></div>
                    </Col>
                    {(activeAction?.ina_output_html ||
                      dataSourceForSubActions()?.['ina_output_html']) && (
                        <Col span={2}>
                          <Dropdown
                            overlay={() => (
                              <Menu>
                                <Menu.Item
                                  onClick={async item => {
                                    await getRawData({ id: activeAction.ina_id });
                                    // }
                                    // setRowJsonToView(rowJson);
                                    // setRowInputModalVisible(true);
                                    // const jsonToConsider =
                                    //   activeAction?.ina_output_html;
                                    // let rowJson = {};
                                    // if (jsonToConsider) {
                                    //   rowJson = JSON.parse(
                                    //     JSON.parse(jsonToConsider)
                                    //   );
                                    // }
                                    // setRowJsonToView(rowJson);
                                    // setRowInputModalVisible(true);
                                  }}
                                >
                                  Show Row Output
                                </Menu.Item>
                                <Menu.Item
                                  onClick={item => {
                                    setOutputHtml(activeAction?.ina_output_html);
                                    setEvidenceInputModalVisible(true);
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
                      )}
                  </Row>
                </ReportBox>
              </StyleFlex>
            </StyleTabPane>
          );
        })}

        {/* <StyleTabPane tab="Get URl Report" key="2"></StyleTabPane> */}
      </StyledTab>
    </StyledBox>
  );
}

export default Report;
