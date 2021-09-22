import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _, { map, includes, filter, isEmpty, isArray, isObject } from 'lodash';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  Container,
  StyledText,
  StyledRow,
  StyledCol,
  TagContainer,
  MenuDiv,
  IconDiv,
  TitleDiv,
  TagWrapper,
  EvidenceTableWrapper,
  RowDiv,
  ExecuteBtn,
} from './StyledComponents';
import Pencil from '../../../../../assets/svgIcon/pencil';
import FourBox from '../../../../../assets/svgIcon/fourBox';
import SimpleTag from '../../../../../components/UploadedItem';
import DropdownTag from '../../../../../components/SPMultilevelDropdown';
import SPButton from '../../../../../components/SPButton';
import AddArtifactPopup from '../addArtifactPopup';
import Ellipsis from '../../../../../assets/svgIcon/ellipsis';
import { SModal } from '../../../assets/components/TemplateModal/StyledComponents';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import { Row, Col, Button } from 'antd';
import {
  CloseOutlined,
  ConsoleSqlOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const validationSchema = Yup.object({
  // app_execute_type: Yup.string().required('Required'),
});

const initialValues = value => {
  return null;
  // return value.map(v => {
  //   return { v: '' };
  // });
};

function EvidenceTable({
  evidences,
  onRemoveTag,
  onSelectOption,
  executeAction,
  getThreatDetails,
  addArtifactAction,
  addExectionData,
  fileDowload,
  multiConfigExecutionAction,
}) {
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [mount, setMount] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [showAddExecutionModal, setShowAddExecutionModal] = useState(false);
  const [executeAddOptions, setExecuteAddOptions] = useState([]);
  const [temp, setTemp] = useState('');
  const [initValues, setInitValues] = useState({});
  const [multiValue, setMultiValue] = useState([])
  const [configs, setConfigs] = useState();
  const [options, setOptions] = useState();
  const [currentKey, setCurrentKey] = useState();

  const onSelectTag = (type, tag) => {
    if (
      type !== selectedType ||
      selectedType === undefined ||
      selectedType === null
    ) {
      setSelectedType(type);
      setSelectedTag([...[], tag]);
    } else {
      const selected = includes(selectedTag, tag);
      let list;
      if (selected) {
        list = filter(selectedTag, item => item !== tag);
      } else {
        list = [...selectedTag, tag];
      }
      if (isEmpty(list)) {
        setSelectedType(undefined);
      }
      setSelectedTag(list);
    }
  };
  useEffect(() => {
    setMount(false);
  }, [])

  useEffect(() => {
    if (addExectionData && !mount) {
      if (addExectionData[0] == 'success') {
        getThreatDetails();
      } else if (isArray(addExectionData)) {
        if (_.isObject(addExectionData?.[0]?.[0]?.['multi_config_menu'])) {
          const Multivalue = [];
          Object.entries(addExectionData?.[0]?.[0]?.['multi_config_menu']).map(([key, value], i) => {
            Multivalue.push({ key: key, label: value, value: key })
          })
          setMultiValue(Multivalue)
        }
        if (addExectionData && addExectionData[0]['pop-up-data']) {
          const updatedExectutionAction = [],
            init = {},
            confs = [];
          Object.entries(addExectionData[0]['pop-up-data']).map(([key, value], i) => {
            if (key != 'multi_config_menu') {
              Object.assign(init, { [key.replace('sel_', "")]: '', [key]: '' })
              const arr = [];
              value.map(key => {
                arr.push({ key: key, label: key.replaceAll('||||', " "), value: key })
              }),
                confs.push({
                  [key.replace('sel_', "")]: true
                })
              updatedExectutionAction.push({
                key,
                inputKey: key.replace('sel_', ""),
                label: key.replace('sel_', ""),
                value: arr
              });
            }
          }
          )
          setInitValues(init);
          setConfigs(confs)
          setExecuteAddOptions(updatedExectutionAction);
          setShowAddExecutionModal(true);
        }
      } else {
        if (addExectionData && addExectionData['pop-up-data']) {
          const updatedExectutionAction = [];
          updatedExectutionAction.push({
            key: Object.keys(addExectionData['pop-up-data']),
            label: addExectionData['pop-up-data'],
            value: addExectionData['pop-up-data'],
          });
          const options = [];
          Object.keys(updatedExectutionAction[0].value?.multi_config_menu).map(
            data => {
              options.push({
                label: data,
                value: updatedExectutionAction[0].value?.multi_config_menu[data],
              });
            }
          );
          setExecuteAddOptions(updatedExectutionAction);
          setShowAddExecutionModal(true);
          setOptions(options);
        }
      }
    }
  }, [addExectionData]);

  function getOpacity(type, tag) {
    const selected = includes(selectedTag, tag);
    if (type === selectedType && !selected) return '50%';
  }

  const submitForm = async (values, isConfig) => {
    const multi_config_menu = [];
    let payload;
    Object.keys(values).map(d => multi_config_menu.push(values[d]));
    if (isArray(addExectionData) && !isConfig) {
      payload = {
        act_is_multiinput: addExectionData?.[0]['form-data']?.act_is_multiinput,
        app_multi_config_allowed:
          addExectionData[0]['form-data'].app_multi_config_allowed,
        t_ID: addExectionData[0]['form-data'].t_ID,
        act: addExectionData[0]['form-data'].act,
        input: addExectionData[0]['form-data'].input,
        module: addExectionData[0]['form-data'].module,
        multi_step: addExectionData[0]['form-data'].multi_step,
        app: addExectionData[0]['form-data'].app,
        ...values,
        // multi_config_menu:
      };
    } else {
      payload = {
        act_is_multiinput: addExectionData['form-data'].act_is_multiinput,
        app_multi_config_allowed: addExectionData['form-data'].app_multi_config_allowed,
        t_ID: addExectionData['form-data'].t_ID,
        act: addExectionData['form-data'].act,
        input: addExectionData['form-data'].input,
        module: addExectionData['form-data'].module,
        multi_step: addExectionData['form-data'].multi_step,
        app: addExectionData['form-data'].app,
        multi_config_menu: values?.configuration,
      };
    }
    await multiConfigExecutionAction(payload);
    await setShowAddExecutionModal(false);
    getThreatDetails();
  };

  const configHandle = fieldName => {
    const configData = configs;
    configData[fieldName] = !configData[fieldName];
    setConfigs(configData);
    setTemp(moment());
  };

  return (
    <Container>
      <SModal
        title="Configuration"
        maskClosable={false}
        visible={showAddExecutionModal}
        onCancel={() => {
          setShowAddExecutionModal(false);
        }}
        width="825px"
        footer={[]}
      >

      </SModal>
      <SModal
        title="Configuration"
        maskClosable={false}
        visible={showAddExecutionModal}
        onCancel={() => {
          setShowAddExecutionModal(false);
        }}
        width="825px"
        footer={[]}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initValues}
          onSubmit={(values, { resetForm }) => {
            if (values?.configuration) {
              submitForm(values, true);
            } else {
              submitForm(values, false)
            }
            resetForm()
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
          }) => {
            useEffect(() => {
              resetForm()
            }, [showAddExecutionModal])
            return (
              <Form>
                <>
                  <RowDiv>
                    <SelectBox
                      mode="tags"
                      id="multi_config_menu"
                      name="multi_config_menu"
                      label="Select Applicaiton Configuration"
                      placeholder="Configuration"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.multi_config_menu}
                      value={values.multi_config_menu}
                      touched={touched.multi_config_menu}
                      width={575}
                      isHide={!addExectionData?.[0]?.[0]?.['multi_config_menu']}
                      options={multiValue}
                    />
                  </RowDiv>
                  {executeAddOptions && executeAddOptions.map((fields, i) => {
                    return configs ?
                      (
                        <>
                          {configs?.[fields.key] ?
                            <RowDiv>
                              <InputBox
                                id={fields.key}
                                key={i}
                                label={fields.label}
                                name={fields.key}
                                type="text"
                                width={575}
                                placeholder={fields.label}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values[fields.key]}
                                errorMessage={errors[fields.key]}
                                touched={touched[fields.key]}
                              />
                              <Button
                                onClick={() => {
                                  setFieldValue(fields.key, '')
                                  configHandle(fields.key);
                                }}
                                type="primary"
                                className="cross-add-btn"
                                style={{
                                  borderColor: 'red',
                                  background: 'red',
                                  margin: '2px',
                                }}
                                icon={<CloseOutlined />}
                                size="small"
                              /></RowDiv>
                            : <RowDiv>
                              <SelectBox
                                id={fields.key}
                                key={i}
                                label={fields.label}
                                name={fields.key}
                                type="text"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                width={575}
                                value={values[fields.key]}
                                errorMessage={errors[`${fields.key}`]}
                                touched={touched[`${fields.key}`]}
                                options={fields.value}
                              />
                              <Button
                                onClick={() => {
                                  setFieldValue(fields.key, '')
                                  configHandle(fields.key);
                                }}
                                type="primary"
                                className="cross-add-btn"
                                style={{
                                  borderColor: '#33C758',
                                  background: '#33C758',
                                  margin: '2px',
                                }}
                                icon={<PlusOutlined />}
                                size="small"
                              /></RowDiv>}
                        </>
                      ) : <>
                        <RowDiv>
                          <SelectBox
                            mode="tags"
                            id="configuration"
                            name="configuration"
                            label="Select Applicaiton Configuration"
                            placeholder="Configuration"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.configuration}
                            value={values.configuration}
                            touched={touched.configuration}
                            width={575}
                            options={options}
                          />
                        </RowDiv>
                      </>;
                  })}
                </>
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
            )
          }}
        </Formik>
      </SModal>

      <EvidenceTableWrapper>
        {map(evidences, evidence => {
          return (
            <StyledRow key={evidence.key} >
              <StyledCol flex="150px">
                <TitleDiv>
                  <StyledText >{evidence.label}</StyledText>
                </TitleDiv>
              </StyledCol>
              <StyledCol flex="auto">
                <TagWrapper>
                  <TagContainer>
                    {map(evidence.tags, (tag, key) => {
                      let element;
                      if (tag.tag_type === 'simple') {
                        element = (
                          <SimpleTag
                            key={tag.tag_key}
                            name={tag.tag_label}
                            margin="3px 7px"
                            onRemove={() => {
                              onRemoveTag(
                                evidence.key,
                                tag.tag_key,
                                evidence.label
                              );
                            }}
                          />
                        );
                      } else {
                        element = (
                          <DropdownTag
                            items={tag?.applications}
                            mode="tag"
                            key={tag.tag_key}
                            name={tag.tag_label}
                            margin="3px 7px"
                            onRemove={() => {
                              const artifact_name = `Artifact_${evidence.label.replace(
                                / /g,
                                '_'
                              )}`;

                              if ([artifact_name][0] === "Artifact_Header" || [artifact_name][0] === "Artifact_File") {
                                onRemoveTag({
                                  [artifact_name]: [
                                    ...evidence.tags
                                      .filter(t => {
                                        return t.tag_key === tag.tag_key;
                                      })
                                      .map(temp => {
                                        return temp?.tag_key;
                                      }),
                                  ].join(','),
                                });
                              } else {
                                onRemoveTag({
                                  [artifact_name]: [
                                    ...evidence.tags
                                      .filter(t => {
                                        return t.tag_key !== tag.tag_key;
                                      })
                                      .map(temp => {
                                        return temp?.tag_key;
                                      }),
                                  ].join(','),
                                });
                              }
                            }}
                            onSelectTag={() => {
                              onSelectTag(evidence.key, tag.tag_key);
                            }}
                            onSelect={(key, details) => {
                              if (details?.key === 'download') {
                                fileDowload({
                                  url: details?.details?.link,
                                  name: 'evidence',
                                  ext: _.isString(details?.details?.link)
                                    ? details?.details?.link.split(
                                      '.'
                                    )?.[
                                    details?.details?.link.split(
                                      '.'
                                    ).length - 1
                                    ]
                                    : 'zip',
                                });
                                return;
                              }
                            }}
                            inputName={evidence.tags[key].tag_key}
                            executeAction={executeAction}
                          />
                        );
                      }
                      return element;
                    })}
                  </TagContainer>
                </TagWrapper>
                <MenuDiv>
                  <IconDiv
                    role="presentation"
                    onClick={e => {
                      const left = e.nativeEvent.pageX - 400;
                      const top = e.nativeEvent.pageY;
                      setPosition({ left: left, top: top });
                      setAddPopupVisible(true);
                      setCurrentKey(evidence.key);
                    }}
                  >
                    {addPopupVisible && evidence.key === currentKey && (
                      <AddArtifactPopup
                        inputPlaceHolder={evidence.label}
                        right={10}
                        top={-60}
                        onClose={e => {
                          e.stopPropagation();
                          setAddPopupVisible(false);
                          setCurrentKey(null);
                        }}
                        onAdd={(e, text) => {
                          e.stopPropagation();
                          setAddPopupVisible(false);
                          setCurrentKey(null);
                          const artifact_name = `${evidence.label.replace(
                            / /g,
                            '_'
                          )}`;

                          addArtifactAction({
                            [artifact_name]: [
                              ...evidence.tags.map(tag => {
                                return tag?.tag_key;
                              }),
                              text,
                            ].join(','),
                          });
                        }}
                        title="Associated-email-addresses"
                      />
                    )}
                    <Pencil />
                  </IconDiv>
                  <IconDiv>
                    <FourBox />
                  </IconDiv>
                  {/* {selectedType === evidence.key && (
                    <DropdownTag
                      items={DropdownList}
                      key={evidence.key}
                      margin="0px 0px"
                      icon={
                        <IconDiv>
                          <Ellipsis />
                        </IconDiv>
                      }
                    />
                  )} */}
                </MenuDiv>
              </StyledCol>
            </StyledRow>
          );
        })}
      </EvidenceTableWrapper>
    </Container>
  );
}

export default EvidenceTable;

EvidenceTable.propTypes = {};
