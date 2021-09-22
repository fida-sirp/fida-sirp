import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  map,
  includes,
  filter,
  isEmpty,
  isArray,
  isString,
  isObject,
} from 'lodash';
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
  ListMain,
  ListStyle,
  ListLabelStyle,
  ContentDiv,
} from './StyledComponents';
import Pencil from '../../../../../assets/svgIcon/pencil';
import FourBox from '../../../../../assets/svgIcon/fourBox';
import SimpleTag from '../../../../../components/UploadedItem';
import DropdownTag from '../../../../../components/SPMultilevelDropdown';
import SPButton from '../../../../../components/SPButton';
import AddArtifactPopup from '../addArtifactPopup';
import Ellipsis from '../../../../../assets/svgIcon/ellipsis';
import TabReportBox from '../tabReportBox';
import { Col, Row } from 'antd';
import { SModal } from '../../../assets/components/TemplateModal/StyledComponents';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import { Formik } from 'formik';
import Form from 'antd/lib/form/Form';
import { RowDiv } from '../incidentDetailsBox/StyledComponents';
import { ExecuteBtn } from '../../../ThreatIntelligence/components/evidenceTable/StyledComponents';
import * as Yup from 'yup';
import API from '../../../../../config/endpoints.config';
import { clearRunAction } from '../../../../../actions/caseMasterData';
const category = [
  {
    key: 'Evidence',
    value: 'Evidence',
  },
  {
    key: 'VirusTotal',
    value: 'VirusTotal',
  },
  {
    key: 'SIRP',
    value: 'SIRP',
  },
  {
    key: 'NESSUS',
    value: 'NESSUS',
  },
];

const DropdownList = [
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
];

function EvidenceTable({
  evidences,
  onRemoveTag,
  onSelectOption,
  incidentActionsMapped,
  onRunAction,
  addArtifactAction,
  incidentMasterActionRun,
  downloadFile,
  onAddArtifactAction,
  formMaster,
  addEvidence,
  ina_incident_id,
  onClearRunAction,
  checkAccess,
}) {
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedTag, setSelectedTag] = useState([]);
  const [fieldsVisiblity, setFieldsVisiblity] = useState({});
  const [fields, setFields] = useState({});
  const [selectedType, setSelectedType] = useState();
  const [activeTab, setActiveTab] = useState({
    key: 'evidence',
  });
  const [currentKey, setCurrentKey] = useState();
  const [showAddExecutionModal, setShowAddExecutionModal] = useState(false);
  const [executeAddOptions, setExecuteAddOptions] = useState([]);
  const [options, setOptions] = useState([]);
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

  function getOpacity(type, tag) {
    const selected = includes(selectedTag, tag);
    if (type === selectedType && !selected) return '50%';
  }
  

  useEffect(() => {
    if (
      isObject(
        incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
      ) &&
      Object.keys(
        incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
      ).length > 0
    ) {
      setOptions(
        Object.keys(
          incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
        ).map(k => {
          return {
            label:
              incidentMasterActionRun?.result?.['pop-up-data']
                ?.multi_config_menu?.[k],
            key: k,
            value: k,
          };
        })
      );
      if(incidentMasterActionRun?.result['form-data'].app_multi_config_allowed == "true"){
        setShowAddExecutionModal(true);
      }
  
    }

    else if (
      Array.isArray(
        incidentMasterActionRun?.result
      ) &&
      isObject(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ) &&
      Object.keys(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ).length > 0
    ) {
      setOptions(
        Object.keys(
          incidentMasterActionRun?.result[0][0]['multi_config_menu']
        ).map(k => {
          return {
            label:
            incidentMasterActionRun?.result[0][0]['multi_config_menu']?.[k],
            key: k,
            value: k,
          };
        })
      );

      let myArray = incidentMasterActionRun?.result[0]?.['pop-up-data']
      var size = Object.keys(myArray).length;
      var data = {};
      var initialObject = {};
      for (let index = 0; index < size; index++) {
        data[Object.keys(myArray)[index]] = false;
        initialObject[Object.keys(myArray)[index]] = [];
      }
      setFieldsVisiblity(data);
      setFields(initialObject);
      if(incidentMasterActionRun?.result[0]['form-data'].app_multi_config_allowed == "true"){
        setShowAddExecutionModal(true);
      }
   

    }
    console.log(incidentMasterActionRun);
    
  }, [incidentMasterActionRun]);


  function isActionConfigVisible(){
    
    if(isObject(
      incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
    ) &&
    Object.keys(
      incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
    ).length > 0){
      return true;
    }
    else if (
      Array.isArray(
        incidentMasterActionRun?.result
      ) &&
      isObject(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ) &&
      Object.keys(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ).length > 0
    ) {
      return true;
    }else{
      return false;
    }
    
  }

  function getExtraFields(){
    if (
      Array.isArray(
        incidentMasterActionRun?.result
      ) &&
      isObject(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ) &&
      Object.keys(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ).length > 0
    ) {
      let myArray = incidentMasterActionRun?.result[0]?.['pop-up-data']
      
      var size = Object.keys(myArray).length;
      var initialObject = {};
      var data = {};
      for (let index = 0; index < size; index++) {
        initialObject[Object.keys(myArray)[index]] = [];
        data[Object.keys(myArray)[index]] = false;
      }
      //setFieldsVisiblity(data);

      return initialObject;
    }else{
      return {};
    }
  }

  function getRequestPayload(){
    if(isObject(
      incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
    ) &&
    Object.keys(
      incidentMasterActionRun?.result?.['pop-up-data']?.multi_config_menu
    ).length > 0){

      return  {
        act_is_multiinput:
          incidentMasterActionRun?.result?.['form-data']?.[
          'act_is_multiinput'
          ],
        app_multi_config_allowed:
          incidentMasterActionRun?.result?.['form-data']?.[
          'app_multi_config_allowed'
          ],
        t_ID: incidentMasterActionRun?.result?.['form-data']?.['t_ID'],
        act: incidentMasterActionRun?.result?.['form-data']?.['act'],
        input: incidentMasterActionRun?.result?.['form-data']?.['input'],
        module:
          incidentMasterActionRun?.result?.['form-data']?.['module'],
        multi_step:
          incidentMasterActionRun?.result?.['form-data']?.['multi_step'],
        app: incidentMasterActionRun?.result?.['form-data']?.['app'],
       
      };
      
    }
    else if (
      Array.isArray(
        incidentMasterActionRun?.result
      ) &&
      isObject(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ) &&
      Object.keys(
        incidentMasterActionRun?.result[0]?.['pop-up-data']
      ).length > 0
    ) {

      return  {
        act_is_multiinput:
          incidentMasterActionRun?.result[0]?.['form-data']?.[
          'act_is_multiinput'
          ],
        app_multi_config_allowed:
          incidentMasterActionRun?.result[0]?.['form-data']?.[
          'app_multi_config_allowed'
          ],
        t_ID: incidentMasterActionRun?.result[0]?.['form-data']?.['t_ID'],
        act: incidentMasterActionRun?.result[0]?.['form-data']?.['act'],
        input: incidentMasterActionRun?.result[0]?.['form-data']?.['input'],
        module:
          incidentMasterActionRun?.result[0]?.['form-data']?.['module'],
        multi_step:
          incidentMasterActionRun?.result[0]?.['form-data']?.['multi_step'],
        app: incidentMasterActionRun?.result[0]?.['form-data']?.['app'],
       
      };
      
    }
  }

  return (
    <Container>
      <SModal
        maskClosable = {false}
        title="Configuration"
        visible={
          showAddExecutionModal 
       
        }
        onCancel={() => {
          setShowAddExecutionModal(false);
          onClearRunAction();
        }}
        width="825px"
        footer={[]}
      >
        <Formik
        enableReinitialize 
          id="formik"
          validationSchema={Yup.object({
            configuration: Yup.array()
              .of(Yup.string())
              .required('Please select'),
          })}
          initialValues={{ configuration: [],...fields }}
          onSubmit={(values, { resetForm }) => {
            setShowAddExecutionModal(false);
            resetForm();
            
            var payload = getRequestPayload();
            payload['multi_config_menu'] = values?.configuration;
            var payload = {...payload,...values}
            delete payload['configuration'];
           

            // multiConfigExecutionAction
            onRunAction({
              ...payload,
              url: API.incidentManagementModule.runMultiConfigActions,
            });
            setShowAddExecutionModal(false);
            onClearRunAction();
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
          
        
          return (
            <Form>
          
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
              
              {
                Object.keys(getExtraFields()).map((value,key) =>{

                 var optionsData =  incidentMasterActionRun?.result[0]?.['pop-up-data'][value].map(k => {
                    return {
                      label:
                      k,
                      key: k,
                      value: k,
                    };
                  })
                
                  return (
                      <RowDiv>
                        {!fieldsVisiblity[value] ?
                          <SelectBox
                            mode="select"
                            id={value}
                            name={value}
                            label={value.replace("sel_", "")}
                            placeholder={value.replace("sel_", "")}
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors[value]}
                            value={values[value]}
                            touched={touched[value]}
                            width={575}
                            options={
                              
                              optionsData
                            }
                          />

                          :
                          <InputBox
                      
                            id={value}
                            name={value}
                            label={value.replace("sel_", "")}
                            placeholder={value.replace("sel_", "")}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors[value]}
                            value={values[value]}
                            touched={touched[value]}
                            width={575}
                      
                          />
                          }
                          <div className="btn-item-plus" 
                            onClick={e => {
                          
                              console.log('test')
                         
                              var fieldsVisiblitydata = fieldsVisiblity;
                              fieldsVisiblitydata[value] = !fieldsVisiblitydata[value];
                              setFieldsVisiblity(fieldsVisiblitydata);
                              setFields({...fields,test:""})
                            }}
                         >+</div>
                        </RowDiv>
                  )
                })
              }



              
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

            }
        }
        </Formik>
      </SModal>

      <Row>
        <Col span={3}>
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
              <ListStyle
                role="button"
                onClick={() => setActiveTab(cat)}
                style={
                  activeTab?.key === cat?.key
                    ? {
                      borderLeft: '5px solid #33C758',
                    }
                    : {
                      borderLeft: '5px solid #2C2C38',
                    }
                }
              >
                <ListLabelStyle>{cat.label}</ListLabelStyle>
              </ListStyle>
            ))}
          </ListMain>
        </Col>
        <Col span={21}>
          <ContentDiv>
            {activeTab?.key === 'evidence' && (
              <>
                {map(evidences, evidence => {
                  return (
                    <StyledRow key={evidence.key}>
                      <StyledCol flex="150px">
                        <TitleDiv>
                          <StyledText>{evidence.label}</StyledText>
                        </TitleDiv>
                      </StyledCol>
                      <StyledCol flex="auto">
                        <TagWrapper>
                          <TagContainer>
                            {map(evidence.tags, tag => {
                             
                              let element;
                              if (tag.tag_type === 'simple') {
                                element = (
                                  <SimpleTag
                                    key={tag.tag_key}
                                    name={tag.tag_label}
                                    margin="3px 7px"
                                    onRemove={() =>
                                      onRemoveTag(evidence.key, tag.tag_key)
                                    }
                                  />
                                );
                              } else {
                                element = (
                                  <DropdownTag
                                    showMenuOnWholeTagClick
                                    menuMode="vertical-left"
                                    placement="bottomLeft"
                                    items={tag?.applications}
                                    mode="tag"
                                    key={tag.tag_key}
                                    name={tag.tag_label}
                                    margin="3px 7px"
                                    checkAccess = {checkAccess}
                                    opacity={() =>
                                      getOpacity(evidence.key, tag.tag_key)
                                    }
                                    onRemove={() => {
                                      const artifact_name = `Artifact_${evidence.label.replace(
                                        / /g,
                                        '_'
                                      )}`;

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
                                    }}
                                    onSelectTag={() => {
                                      
                                    }}
                                    onSelect={(key, details) => {
                                      if (details?.key === 'download') {
                                        downloadFile({
                                          url: details?.details?.link,
                                          name: 'evidence',
                                          ext: isString(details?.details?.link)
                                            ? details?.details?.link.split(
                                              '.'
                                            )?.[
                                            details?.details?.link.split(
                                              '.'
                                            ).length - 1
                                            ]
                                            : 'zip',
                                        });
                                        // let link = details?.details?.link;
                                        // if (isString(link)) {
                                        //   link = link.replace('api/v1/', '');
                                        // }
                                        // window.open(link);
                                        return;
                                      }

                                      const reqData = {
                                        act_is_multiinput:
                                          details?.act_is_multiinput,
                                        app_multi_config_allowed:
                                          details?.appDetails
                                            ?.app_multi_config_allowed,
                                        act: details?.details?.act_id,
                                        input: details?.app,
                                        module: 'Incident',
                                        multi_step: false,
                                        app: details?.appDetails?.app_id,
                                      };
                                      onRunAction(reqData);
                                      if (
                                        details?.appDetails
                                          ?.app_multi_config_allowed
                                      ) {
                                        
                                       // setShowAddExecutionModal(true);
                                      }
                                    }}
                                  />
                                );
                              }
                              return element;
                            })}
                          </TagContainer>
                        </TagWrapper>
                        <MenuDiv>
                         {checkAccess ?
                          <IconDiv
                            role="presentation"
                            onClick={e => {
                          
                              const left = e.nativeEvent.screenX - 400;
                              const top = e.nativeEvent.screenY;
                           
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
                                  const artifact_name = `Artifact_${evidence.label.replace(
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
                          </IconDiv> :""}
                          <IconDiv>
                            <FourBox />
                          </IconDiv>
                          {selectedType === evidence.key && (
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
                          )}
                        </MenuDiv>
                      </StyledCol>
                    </StyledRow>
                  );
                })}
              </>
            )}
            {isArray(incidentActionsMapped?.applications)
              ? incidentActionsMapped?.applications.map(app => {
                if (app?.app_id === activeTab?.key) {
                  return (
                    <TabReportBox
                     ina_incident_id = {ina_incident_id}
                      formMaster={formMaster}
                      addEvidence = {addEvidence}
                      onAddArtifactAction={onAddArtifactAction}
                      actions={
                        isArray(incidentActionsMapped?.actions)
                          ? incidentActionsMapped?.actions.filter(act => {
                            return act?.act_app_id === activeTab?.key;
                          })
                          : []
                      }
                      executed={
                        isArray(incidentActionsMapped?.executed) &&
                          incidentActionsMapped?.executed.length > 0
                          ? incidentActionsMapped?.executed?.[0]
                          : []
                      }
                    />
                  );
                }
                return null;
              })
              : null}
          </ContentDiv>
        </Col>
      </Row>
    </Container>
  );
}

export default EvidenceTable;

EvidenceTable.propTypes = {};
