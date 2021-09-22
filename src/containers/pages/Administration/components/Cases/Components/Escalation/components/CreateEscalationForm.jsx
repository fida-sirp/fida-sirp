import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Form, Formik } from "formik";
import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as Yup from 'yup';
import { isEmpty, uniqBy } from 'lodash';
import { administratorCasesSlaViewLog, administratorCasesSlaViewRule, getCasesCategoryList, getCasesDespositionList } from "../../../../../../../../actions/administration";
import InputBox from "../../../../../../../../components/InputBox";
import { Label } from "../../../../../../../../components/InputBox/StyledComponents";
import SelectBox from "../../../../../../../../components/SelectBox";
import SPButton from "../../../../../../../../components/SPButton";
import SPToggleSwitch from "../../../../../../../../components/SPToggleSwitch";
import { Switches, SwitchesContainer } from './StyleComponent';



const CreateEscalationForm = (
  {
    containerList,
    onDispositionList,
    onCategoryList,
    dispositionList,
    assetsTypeList,
    usersList,
    classificationList,
    onAdministratorCasesSlaViewRule,
    userGroupList,
    riskRateList,
    severityList,
    categoryList,
    recordValue,
    isCreate,
    submit,
    closeDrawer,
    onClose
  }) => {

  // console.log(recordValue);
  // debugger;

  const [priorityStatus, setPriorityStatus] = useState(true);
  const [severityStatus, setSeverityStatus] = useState(true);
  const [riskRateStatus, setRiskRateStatus] = useState(true);
  const [classificationStatus, setClassificationStatus] = useState(true);
  const [assetsValueStatus, setAssetValueStatus] = useState(true);
  const [expireNotify, setExpireNotify] = useState(false);
  const [disabledPriority, setDisablePriority] = useState(true);
  const [disabledSeverity, setDisableSeverity] = useState(true);
  const [disabledRiskRate, setDisableRiskRate] = useState(true);
  const [disabledClassification, setDisableClassification] = useState(true);
  const [disabledAssetValue, setDisableAssetValue] = useState(true);

  const [showPriority, setShowPriority] = useState(true);
  const [showSeverity, setShowSeverity] = useState(true);
  const [showRiskRate, setShowRiskRate] = useState(true);
  const [showClassification, setShowClassification] = useState(true);
  const [showAssetValue, setShowAssetValue] = useState(true);
  const [isShowSeveritySwitch, setIsShowSeveritySwitch] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState('');
  const [containerSectectItems, setContainerSelectItems] = useState([]);
  const [dispositionSelectItems, setDispositionSectedItems] = useState([]);
  const [categorySelectItems, setCategorySectedItems] = useState([]);
  const [userGroupListItems, setUserGroupList] = useState([]);
  const [usersListItems, setUsersList] = useState([]);
  const [riskRateListItems, setRiskRateList] = useState([]);
  const [severityListItems, setSeverityList] = useState([])
  const [classificationListItems, setClassificationList] = useState([]);
  const [assetsTypeListItems, setAssetsTypeList] = useState([]);
  const [conditions, setConditions] = useState([{ key: 'AND', value: 'AND', label: 'AND' }, { key: 'OR', value: 'OR', label: 'OR' }]);
  const [priority, setPriority] = useState([{ value: 'High', key: 'Hight', label: 'High' }, { value: 'Medium', key: 'Meduim', label: 'Medium' }, { value: 'Low', key: 'Low', label: 'Low' },]);
  const [vulnerabilityCasesItems, setVulnerabilityCasesItems] = useState([
    { key: 'Has no response', value: 'Has no response', label: 'Has no response' },
    { key: 'Has not been closed', value: 'Has not been closed', label: 'Has not been closed' }
  ])
  // const [disabledseverity, setDisablePriority] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState();

  let validationSchemaStandard = Yup.object({
    slas_rule_name: Yup.string().required('Required'),
    slas_disposition: Yup.string().required('Required'),
    slas_container: Yup.string().required('Required'),
    slas_category: Yup.string().required('Required'),
    slas_container_response: Yup.string().required('Required'),
  });



  useEffect(() => {
    // debugger
    // checkEditOrCreate();

    const containerItems = Object.entries(containerList).map(([key, value], index) => {
      return {
        key: key,
        value: key,
        label: value,
      }
    });

    // console.log(classificationList)

    const severityListItems = Object.entries(severityList).map(([key, value], index) => {
      return {
        key: key,
        value: key,
        label: value,
      }
    });

    const riskRateItems = Object.entries(riskRateList).map(([key, value], index) => {
      return {
        key: key,
        value: key,
        label: value,
      }
    });

    const classificationListItems = classificationList?.items.map((item, index) => {
      return {
        key: String(item.asc_id),
        value: String(item.asc_id),
        label: item.asc_name,
      }
    });

    const assetValueItems = Object.entries(assetsTypeList || {}).map(([key, value], index) => {
      return {
        key: key,
        value: key,
        label: value,
      }
    });

    if (isArray(userGroupList)) {
      const data = Object.keys(userGroupList.reduce(function (result, obj) {
        return Object.assign(result, obj);
      }, {}));
      // debugger;
      const userGroupsListData = data.map((item, index) => {
        return {
          key: item,
          value: item,
          label: userGroupList[index][item],
        }
      });
      setUserGroupList(userGroupsListData);
    }

    if (isArray(usersList)) {
      const data = Object.keys(usersList.reduce(function (result, obj) {
        return Object.assign(result, obj);
      }, {}));
      // debugger;
      const userListData = data.map((item, index) => {
        return {
          key: item,
          value: item,
          label: usersList[index][item],
        }
      });

      setUsersList(userListData);
    }


    setContainerSelectItems(containerItems);
    setSeverityList(severityListItems);
    setRiskRateList(riskRateItems);
    setClassificationList(classificationListItems);
    setAssetsTypeList(assetValueItems);

  }, []);


  const checkEditOrCreate = () => {
    if (!isCreate) {

      onCategoryList(recordValue.slas_container);
      onDispositionList(recordValue.slas_container);

      // const data = recordValue;
      let data = {};
      for (let obj in recordValue) {

        if (typeof recordValue[obj] === 'string') {
          if (recordValue[obj].includes('{') && recordValue[obj].includes('}')) {
            // console.log(recordValue[obj]);
            const stringObj = recordValue[obj];
            const value = JSON.parse(stringObj);
            data = { ...data, [obj]: value };
          } else {
            data = { ...data, [obj]: recordValue[obj] };
          }
        } else {
          if (obj === 'slas_category') {
            data = { ...data, [obj]: recordValue[obj] === null ? 'Any' : String(recordValue[obj]) };
          } else {
            data = { ...data, [obj]: recordValue[obj] };
          }

        }
      }

      setShowPriority(recordValue.status.priority);
      setShowSeverity(recordValue.status.severity);
      // setShowRiskRate(!recordValue.status.severity);
      setShowClassification(recordValue.status.classification);
      setShowAssetValue(recordValue.status.value);

      setPriorityStatus(recordValue.status.priority);
      setSeverityStatus(recordValue.status.severity);
      // setRiskRateStatus(recordValue.status.severity);
      setClassificationStatus(recordValue.status.classification)
      setShowAssetValue(recordValue.status.value);
      setExpireNotify(recordValue.status.breach);

      setDisablePriority(false)
      setDisableSeverity(false)
      setDisableRiskRate(false)
      setDisableClassification(false)
      setDisableAssetValue(false)

      // if (data.slas_if_value_1.hasOwnProperty('Severity')) {
      //   setShowSeverity(true);
      //   setShowRiskRate(false);
      // } else if (data.slas_if_value_1.hasOwnProperty('RiskRate')) {
      //   setShowRiskRate(true);
      //   setShowSeverity(false);
      // } else if (data.slas_if_value_1.hasOwnProperty('Priority')) {
      //   setShowPriority(true)
      // } else { }

      setFormInitialValues(data);
    } else {
      setFormInitialValues({
        slas_rule_name: '',
        slas_disposition: '',
        slas_container: '',
        slas_category: '',
        slas_if_key_1: '',
        slas_operator_2: '',
        slas_if_value_1: { Priority: [''], Operator: [''], Severity: [''], RiskRate: [''] },
        slas_operator_1: '',
        slas_asset_classification: { classification: [''] },
        slas_operator_1: '',
        slas_asset_type_value: { value: [''] },
        slas_container_response: '',
        slas_minute: { minutes: [] },
        slas_hours: { hours: [] },
        slas_days: { days: [] },
        slas_weeks: { weeks: [] },
        slas_user_mode: '',
        slas_individual_user: { individual: [] },
        slas_user_groups: { group: [] },
        slas_external_user: { external: [] },
        slas_on_expired_notify: {
          minutes: [],
          hours: [],
          days: [],
          weeks: [],
          individual: [],
          group: [],
          external: [],
        }
      })

    }
  }

  useState(() => {
    checkEditOrCreate()
  }, [])



  useEffect(() => {
    const dispositionItems = Object.entries(dispositionList).map(([key, value], index) => {
      return {
        key: String(key),
        value: String(key),
        label: value,
      }
    });
    if (isEmpty(dispositionList) && selectedContainer !== '') {
      setDisablePriority(true);
      setPriorityStatus(false);
      setShowPriority(false);

      setFormInitialValues({
        ...formInitialValues,
        slas_disposition: '',
        slas_category: '',
      })
    }

    const categoryItems = Object.entries(categoryList).map(([key, value], index) => {
      return {
        key: String(key),
        value: String(key),
        label: value,
      }
    });
    setDispositionSectedItems(dispositionItems);
    setCategorySectedItems(categoryItems);
  }, [dispositionList, categoryList]);



  const addPriority = (values) => {
    const priorityData = { ...values.slas_if_value_1 };

    const length = priorityData.Priority.length;

    priorityData.Priority.push('');
    setFormInitialValues({
      ...values,
      slas_if_value_1: priorityData
    })
  }


  const removePriority = (values, i) => {
    const priorityData = { ...values.slas_if_value_1 };
    priorityData.Priority.splice(i, 1);
    console.log(priorityData);
    setFormInitialValues({
      ...values,
      slas_if_value_1: priorityData
    })
  }


  const addSeverity = (values) => {
    const severityData = { ...values.slas_if_value_1 };

    const length = severityData.Severity.length;

    severityData.Severity.push('');
    setFormInitialValues({
      ...values,
      slas_if_value_1: severityData
    })
  }


  const removeSeverity = (values, i) => {
    const severityData = { ...values.slas_if_value_1 };
    severityData.Severity.splice(i, 1);
    setFormInitialValues({
      ...values,
      slas_if_value_1: severityData
    })
  }

  const addRiskRate = (values) => {
    const riskRateData = { ...values.slas_if_value_1 };

    riskRateData.RiskRate.push('');
    setFormInitialValues({
      ...values,
      slas_if_value_1: riskRateData
    })
  }


  const removeRiskRate = (values, i) => {
    const riskRateData = { ...values.slas_if_value_1 };
    riskRateData.RiskRate.splice(i, 1);
    setFormInitialValues({
      ...values,
      slas_if_value_1: riskRateData
    })
  }


  const addAssetClassification = (values) => {
    const classificationData = { ...values.slas_asset_classification };

    classificationData.classification.push('');

    setFormInitialValues({
      ...values,
      slas_asset_classification: classificationData
    })
  }

  const removeAssetClassification = (values, i) => {
    const classificationData = { ...values.slas_asset_classification };
    classificationData.classification.splice(i, 1);
    setFormInitialValues({
      ...values,
      slas_asset_classification: classificationData
    })
  }

  const addAssetsTypeValue = (values) => {
    const assetTypeValue = { ...values.slas_asset_type_value };
    assetTypeValue.value.push('');
    setFormInitialValues({
      ...values,
      slas_asset_type_value: assetTypeValue
    });

  }


  const removeAssetTypeValue = (values, i) => {
    const assetTypeValue = { ...values.slas_asset_type_value };
    assetTypeValue.value.splice(i, 1);
    setFormInitialValues({
      ...values,
      slas_asset_type_value: assetTypeValue
    })
  }


  const addSinceForm = (values, index) => {
    const forms = { ...values };

    forms.slas_minute[`minutes_${index}`] = [];
    forms.slas_hours[`hours_${index}`] = [];
    forms.slas_days[`days_${index}`] = [];
    forms.slas_weeks[`weeks_${index}`] = [];
    forms.slas_individual_user[`individual_${index}`] = [];
    forms.slas_user_groups[`group_${index}`] = [];
    forms.slas_external_user[`external_${index}`] = []

    setFormInitialValues({
      ...values,
      slas_minute: forms.slas_minute,
      slas_hours: forms.slas_hours,
      slas_days: forms.slas_days,
      slas_weeks: forms.slas_weeks,
      slas_individual_user: forms.slas_individual_user,
      slas_user_groups: forms.slas_user_groups,
      slas_external_user: forms.slas_external_user
    })
  }

  const removeSinceForm = (values, index) => {
    const forms = { ...values };
    const keys = Object.keys(forms.slas_minute);
    for (let elIndex in keys) {
      const i = Number(elIndex)
      if (i >= index) {
        // debugger
        forms.slas_minute[`minutes_${i}`] = forms.slas_minute[`minutes_${i + 1}`] ? forms.slas_minute[`minutes_${i + 1}`] : [];
        forms.slas_hours[`hours_${i}`] = forms.slas_hours[`hours_${i + 1}`] ? forms.slas_hours[`hours_${i + 1}`] : [];
        forms.slas_days[`days_${i}`] = forms.slas_days[`days_${i + 1}`] ? forms.slas_days[`days_${i + 1}`] : [];
        forms.slas_weeks[`weeks_${i}`] = forms.slas_weeks[`weeks_${i + 1}`] ? forms.slas_weeks[`weeks_${i + 1}`] : [];
        forms.slas_individual_user[`individual_${i}`] = forms.slas_individual_user[`individual_${i + 1}`] ? forms.slas_individual_user[`individual_${i + 1}`] : [];
        forms.slas_user_groups[`group_${i}`] = forms.slas_user_groups[`group_${i + 1}`] ? forms.slas_user_groups[`group_${i + 1}`] : [];
        forms.slas_external_user[`external_${i}`] = forms.slas_external_user[`external_${i + 1}`] ? forms.slas_external_user[`external_${i + 1}`] : [];
      }

      if (keys.length - 1 === i) {
        delete forms.slas_minute[`minutes_${i}`];
        delete forms.slas_hours[`hours_${i}`];
        delete forms.slas_days[`days_${i}`];
        delete forms.slas_weeks[`weeks_${i}`];
        delete forms.slas_individual_user[`individual_${i}`];
        delete forms.slas_user_groups[`group_${i}`];
        delete forms.slas_external_user[`external_${i}`];

      }
    }


    setFormInitialValues({
      ...values,
      forms
    })
  }


  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          if (showSeverity) {
            delete values.slas_if_value_1.RiskRate;
          } else {
            delete values.slas_if_value_1.Severity;
          }

          if (values.slas_disposition === 'Any') {
            values.slas_disposition = ''
          }

          if (values.slas_category === 'Any') {
            values.slas_category = ''
          }

          if (!expireNotify) {
            values.slas_on_expired_notify.days = [];
            values.slas_on_expired_notify.group = [];
            values.slas_on_expired_notify.hours = [];
            values.slas_on_expired_notify.weeks = [];
            values.slas_on_expired_notify.minutes = [];
            values.slas_on_expired_notify.external = [];
            values.slas_on_expired_notify.individual = [];
            values.slas_on_expired_notify.external = [];
          }
          submit(values);
          resetForm();
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
            <InputBox
              id={'slas_rule_name'}
              label={'Name'}
              name={'slas_rule_name'}
              placeholder={'Name'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.slas_rule_name}
              errorMessage={errors.slas_rule_name}
              touched={touched.slas_rule_name}
              // width={345}
              noBorderValidation
            />
            <Row gutter={20}>
              <Col>
                <SelectBox
                  showSearch={true}
                  id="slas_container"
                  label="Container"
                  name="slas_container"
                  onInputChange={(field, value, validate) => {
                    setFieldValue(field, value, validate);
                    setSelectedContainer(value);
                    setFieldValue('slas_disposition', 'Any');
                    setFieldValue('slas_category', 'Any')
                    onDispositionList(value);
                    onCategoryList(value);
                    setDisablePriority(false);
                    setDisableAssetValue(false);
                    setDisableClassification(false);
                    setDisableAssetValue(false);
                    setDisableRiskRate(false);
                    setDisableSeverity(false);
                    setPriorityStatus(true);
                    setShowPriority(true);
                    // debugger
                    if (value === 'Risk') {

                      setShowSeverity(false);
                      setShowRiskRate(true);
                      values.slas_if_value_1.RiskRate = ['']
                      setIsShowSeveritySwitch(false);

                    } else {
                      setShowRiskRate(false);
                      setShowSeverity(true);
                      values.slas_if_value_1.Severity = ['']
                      setIsShowSeveritySwitch(true);
                    }
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.slas_container}
                  value={values.slas_container}
                  touched={touched.slas_container}
                  width={200}
                  options={containerSectectItems}
                // disabled={isSubmitting}
                />
              </Col>
              <Col>
                <SelectBox
                  showSearch={true}
                  id="slas_disposition"
                  label="Disposition"
                  name="slas_disposition"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.slas_disposition}
                  value={values.slas_disposition}
                  touched={touched.slas_disposition}
                  width={200}
                  options={dispositionSelectItems}
                // disabled={isSubmitting}
                />
              </Col>
              <Col>
                <SelectBox
                  showSearch={true}
                  id="slas_category"
                  label="Category"
                  name="slas_category"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.slas_category}
                  value={values.slas_category}
                  touched={touched.slas_category}
                  width={200}
                  options={categorySelectItems}
                // disabled={isSubmitting}
                />
              </Col>
            </Row>
            <Card style={{ background: '#13131A' }}>
              {/* onChecked={notification.isEnabled} onChange={() => toggleSwitch(notificationIndex, false, true)} */}
              {/* <SPToggleSwitch /> */}
              <SwitchesContainer>
                <Switches>
                  <Label>Priority</Label>
                  <SPToggleSwitch disabled={disabledPriority} onChecked={priorityStatus}
                    onChange={() => {
                      setPriorityStatus(!priorityStatus);
                      setShowPriority(!priorityStatus);
                      if (!priorityStatus) {
                        values.slas_if_value_1.priority = ['']
                      }

                    }} />
                </Switches>
                {
                  isShowSeveritySwitch ?
                    <Switches>
                      <Label>Severity</Label>
                      <SPToggleSwitch disabled={disabledSeverity} onChecked={severityStatus} onChange={() => {
                        setShowRiskRate(false);
                        setSeverityStatus(!severityStatus);
                        setShowSeverity(!severityStatus);
                        if (!severityStatus) {
                          values.slas_if_value_1.Severity = ['']
                        }
                      }} />
                    </Switches>
                    : <Switches>
                      <Label>Risk Rating</Label>
                      <SPToggleSwitch disabled={disabledRiskRate} onChecked={riskRateStatus} onChange={() => {
                        setRiskRateStatus(!riskRateStatus);
                        setShowRiskRate(!riskRateStatus);
                        if (!riskRateStatus) {
                          values.slas_if_value_1.RiskRate = [''];
                        }

                      }} />
                    </Switches>
                }
                <Switches>
                  <Label>Classification</Label>
                  <SPToggleSwitch disabled={disabledClassification} onChecked={classificationStatus} onChange={() => {
                    setClassificationStatus(!classificationStatus);
                    setShowClassification(!classificationStatus);
                    if (!classificationStatus) {
                      values.slas_asset_classification.classification = ['']
                    }
                  }} />
                </Switches>
                <Switches>
                  <Label>Asset Value</Label>
                  <SPToggleSwitch disabled={disabledAssetValue} onChecked={assetsValueStatus} onChange={() => {
                    setAssetValueStatus(!assetsValueStatus);
                    setShowAssetValue(!assetsValueStatus);
                    if (!assetsValueStatus) {
                      values.slas_asset_type_value.value = [''];
                    }
                  }} />
                </Switches>
              </SwitchesContainer>
            </Card>
            {
              showPriority ?
                <>
                  <Label style={{ marginTop: '20px', padding: 0 }}>IF</Label>
                  <Card style={{ background: '#13131A', }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Col>
                        <Label>{selectedContainer}</Label>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => addPriority(values)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      </Col>
                    </Row>

                    {
                      formInitialValues.slas_if_value_1?.Priority.map((item, index) => {
                        return <>

                          <Row gutter={40} style={{ justifyContent: 'flex-start' }}>

                            <Col>
                              <InputBox
                                width={200}
                                disabled={true}
                                value="priority"
                                noBorderValidation
                              />
                            </Col>
                            <Col><Label>=</Label></Col>
                            <Col>
                              <SelectBox
                                showSearch={true}
                                id={`slas_if_value_1.Priority.${[index]}`}
                                name={`slas_if_value_1.Priority.${[index]}`}
                                onInputChange={setFieldValue}

                                onBlur={handleBlur}
                                value={values.slas_if_value_1.Priority[index]}
                                // touched={touched.slas_if_value_1?.Priority[index]}
                                width={200}
                                options={priority}
                              // disabled={isSubmitting}
                              />
                            </Col>
                            {
                              index !== 0
                                ? <Col>

                                  <Button
                                    onClick={() => removePriority(values, index)}
                                    type="primary"
                                    style={{
                                      borderColor: 'red',
                                      background: 'red',
                                      margin: '2px',
                                      float: 'right'
                                    }}
                                    icon={<CloseOutlined />}
                                    size="small"
                                  ></Button>
                                </Col>
                                : null
                            }

                          </Row>
                        </>

                      })
                    }

                  </Card>
                </> : null
            }
            {
              (showPriority && (showSeverity || showRiskRate) && (isCreate || formInitialValues.slas_if_value_1?.Operator[0] !== '')) ?
                <Row style={{ justifyContent: 'center', marginTop: 30 }}>
                  <Col>
                    <SelectBox
                      // showSearch={true}
                      id={`slas_if_value_1.Operator.${0}`}
                      name={`slas_if_value_1.Operator.${0}`}
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      value={values.slas_if_value_1.Operator[0]}
                      width={400}
                      options={conditions}
                    // disabled={isSubmitting}
                    />
                  </Col>
                </Row>
                : null
            }

            {

              showSeverity && formInitialValues.slas_if_value_1?.Severity ?
                <>
                  <Label style={{ marginTop: '20px', padding: 0 }}>IF</Label>
                  <Card style={{ background: '#13131A', }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Col>
                        <Label>{selectedContainer}</Label>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => addSeverity(values)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      </Col>
                    </Row>

                    {
                      formInitialValues.slas_if_value_1?.Severity.map((item, index) => {
                        return <>

                          <Row gutter={40} style={{ justifyContent: 'flex-start' }}>

                            <Col>
                              <InputBox
                                width={200}
                                disabled={true}
                                value="Severity"
                                noBorderValidation
                              />
                            </Col>
                            <Col><Label>=</Label></Col>
                            <Col>
                              <SelectBox
                                showSearch={true}
                                id={`slas_if_value_1.Severity.${[index]}`}
                                name={`slas_if_value_1.Severity.${[index]}`}
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={values.slas_if_value_1.Severity[index]}
                                // touched={touched.slas_if_value_1?.Severity[index]}
                                width={200}
                                options={severityListItems}
                              // disabled={isSubmitting}
                              />
                            </Col>
                            {
                              index !== 0
                                ? <Col>

                                  <Button
                                    onClick={() => removeSeverity(values, index)}
                                    type="primary"
                                    style={{
                                      borderColor: 'red',
                                      background: 'red',
                                      margin: '2px',
                                      float: 'right'
                                    }}
                                    icon={<CloseOutlined />}
                                    size="small"
                                  ></Button>
                                </Col>
                                : null
                            }

                          </Row>
                        </>

                      })
                    }

                  </Card>
                </>
                : null
            }


            {
              showRiskRate && selectedContainer === 'Risk' && formInitialValues.slas_if_value_1?.RiskRate ?
                <>
                  <Label style={{ marginTop: '20px', padding: 0 }}>IF</Label>
                  <Card style={{ background: '#13131A', }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Col>
                        <Label>{selectedContainer}</Label>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => addRiskRate(values)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      </Col>
                    </Row>

                    {
                      //  console.log()
                      formInitialValues.slas_if_value_1?.RiskRate.map((item, index) => {
                        return <>

                          <Row gutter={40} style={{ justifyContent: 'flex-start' }}>

                            <Col>
                              <InputBox
                                width={200}
                                disabled={true}
                                value="Risk Rating"
                                noBorderValidation
                              />
                            </Col>
                            <Col><Label>=</Label></Col>
                            <Col>
                              <SelectBox
                                showSearch={true}
                                id={`slas_if_value_1.RiskRate.${[index]}`}
                                name={`slas_if_value_1.RiskRate.${[index]}`}
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={values.slas_if_value_1.RiskRate[index]}
                                // touched={touched[`value_${index}`]}
                                width={200}
                                options={riskRateListItems}
                              // disabled={isSubmitting}
                              />
                            </Col>
                            {
                              index !== 0
                                ? <Col>

                                  <Button
                                    onClick={() => removeRiskRate(values, index)}
                                    type="primary"
                                    style={{
                                      borderColor: 'red',
                                      background: 'red',
                                      margin: '2px',
                                      float: 'right'
                                    }}
                                    icon={<CloseOutlined />}
                                    size="small"
                                  ></Button>
                                </Col>
                                : null
                            }

                          </Row>
                        </>

                      })
                    }

                  </Card>
                </>
                : null
            }
            {
              (showPriority || showRiskRate || showSeverity) ?
                <Row style={{ justifyContent: 'center', marginTop: 30 }}>
                  <Col>
                    <SelectBox
                      // showSearch={true}
                      id='slas_operator_1'
                      name='slas_operator_1'
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      value={values.slas_operator_1}
                      touched={touched.slas_operator_1}
                      width={400}
                      options={conditions}
                    // disabled={isSubmitting}
                    />
                  </Col>
                </Row>
                : null
            }


            {
              showClassification ?
                <>
                  <Label style={{ marginTop: '20px', padding: 0 }}>IF</Label>
                  <Card style={{ background: '#13131A', }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Col>
                        <Label>Asset Classification</Label>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => addAssetClassification(values)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      </Col>
                    </Row>

                    {

                      formInitialValues.slas_asset_classification.classification.map((item, index) => {
                        return <>

                          <Row gutter={40} style={{ justifyContent: 'flex-start' }}>

                            <Col>
                              <InputBox
                                width={200}
                                disabled={true}
                                value="Classification"
                                noBorderValidation
                              />
                            </Col>
                            <Col><Label>=</Label></Col>
                            <Col>
                              <SelectBox
                                showSearch={true}
                                id={`slas_asset_classification.classification.${[index]}`}
                                name={`slas_asset_classification.classification.${[index]}`}
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={values.slas_asset_classification.classification[index]}
                                // touched={touched[`value_${index}`]}
                                width={200}
                                options={classificationListItems}
                              // disabled={isSubmitting}
                              />
                            </Col>
                            {
                              index !== 0
                                ? <Col>

                                  <Button
                                    onClick={() => removeAssetClassification(values, index)}
                                    type="primary"
                                    style={{
                                      borderColor: 'red',
                                      background: 'red',
                                      margin: '2px',
                                      float: 'right'
                                    }}
                                    icon={<CloseOutlined />}
                                    size="small"
                                  ></Button>
                                </Col>
                                : null
                            }

                          </Row>
                        </>

                      })
                    }

                  </Card>
                </> : null
            }

            {
              (showAssetValue && showClassification) ?
                <Row style={{ justifyContent: 'center', marginTop: 30 }}>
                  <Col>
                    <SelectBox
                      // showSearch={true}
                      id='slas_operator_2'
                      name='slas_operator_2'
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      value={values.slas_operator_2}
                      touched={touched.slas_operator_2}
                      width={400}
                      options={conditions}
                    // disabled={isSubmitting}
                    />
                  </Col>
                </Row>
                : null
            }


            {
              showAssetValue ?
                <>
                  <Label style={{ marginTop: '20px', padding: 0 }}>IF</Label>
                  <Card style={{ background: '#13131A', }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Col>
                        <Label>Asset Type</Label>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => addAssetsTypeValue(values)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      </Col>
                    </Row>

                    {

                      formInitialValues.slas_asset_type_value.value.map((item, index) => {
                        return <>

                          <Row gutter={40} style={{ justifyContent: 'flex-start' }}>

                            <Col>
                              <InputBox
                                width={200}
                                disabled={true}
                                value="Assets Value"
                                noBorderValidation
                              />
                            </Col>
                            <Col><Label>=</Label></Col>
                            <Col>
                              <SelectBox
                                // showSearch={true}
                                id={`slas_asset_type_value.value.${[index]}`}
                                name={`slas_asset_type_value.value.${[index]}`}
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={values.slas_asset_type_value.value[index]}
                                // touched={touched[`value_${index}`]}
                                width={200}
                                options={assetsTypeListItems}
                              // disabled={isSubmitting}
                              />
                            </Col>
                            {
                              index !== 0
                                ? <Col>

                                  <Button
                                    onClick={() => removeAssetTypeValue(values, index)}
                                    type="primary"
                                    style={{
                                      borderColor: 'red',
                                      background: 'red',
                                      margin: '2px',
                                      float: 'right'
                                    }}
                                    icon={<CloseOutlined />}
                                    size="small"
                                  ></Button>
                                </Col>
                                : null
                            }

                          </Row>
                        </>

                      })
                    }

                  </Card>
                </> : null
            }


            <Label style={{ marginTop: '20px', padding: 0 }}>AND</Label>
            <Card style={{ background: '#13131A', }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Col>
                  <Label>Vulnerability Cases</Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <SelectBox
                    // showSearch={true}
                    id='slas_container_response'
                    name='slas_container_response'
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    value={values.slas_container_response}
                    errorMessage={errors.slas_container_response}
                    touched={touched.slas_container_response}
                    width={300}
                    options={vulnerabilityCasesItems}
                  />
                </Col>
              </Row>
            </Card>

            <Label style={{ marginTop: '20px', padding: 0 }}>SINCE</Label>
            {
              Object.keys(formInitialValues.slas_individual_user).map((item, index) => {
                return (
                  <Card style={{ background: '#13131A', padding: 10, marginTop: index !== 0 ? 30 : 0 }}>
                    {
                      index !== 0 ?
                        <Button
                          onClick={() => removeSinceForm(values, index)}
                          type="primary"
                          style={{
                            float: 'right',
                            borderColor: 'red',
                            background: 'red',
                            margin: '2px',
                          }}
                          icon={<CloseOutlined />}
                          size="small"
                        ></Button>
                        : null
                    }

                    {
                      Object.keys(formInitialValues.slas_individual_user).length - 1 === index ?
                        <Button
                          onClick={() => addSinceForm(values, index + 1)}
                          type="primary"
                          style={{
                            float: 'right',
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                        : null
                    }

                    <Row gutter={30} style={{ alignItems: 'center' }}>
                      <Col>
                        <Label style={{ marginTop: '25px' }}>Last</Label>
                      </Col>
                      <Col>
                        <InputBox
                          id={index === 0 ? `slas_minute.minutes.${0}` : `slas_minute.minutes_${index}.${0}`}
                          label={'Minute'}
                          name={index === 0 ? `slas_minute.minutes.${0}` : `slas_minute.minutes_${index}.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_minute.minutes : values.slas_minute[`minutes_${index}`][0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={`${touched.slas_minute.minutes_}${index}`}
                          width={70}
                          noBorderValidation
                        />
                      </Col>

                      <Col>
                        <InputBox
                          id={index === 0 ? `slas_hours.hours.${0}` : `slas_hours.hours_${index}.${0}`}
                          label={'Hours'}
                          name={index === 0 ? `slas_hours.hours.${0}` : `slas_hours.hours_${index}.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_hours[`hours`] : values.slas_hours[`hours_${index}`][0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>
                      <Col>
                        <InputBox
                          id={index === 0 ? `slas_days.days.${0}` : `slas_days.days_${index}.${0}`}
                          label={'Day'}
                          name={index === 0 ? `slas_days.days.${0}` : `slas_days.days_${index}.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_days[`days`] : values.slas_days[`days_${index}`][0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>

                      <Col>
                        <InputBox
                          id={index === 0 ? `slas_weeks.weeks.${0}` : `slas_weeks.weeks_${index}.${0}`}
                          label={'Week'}
                          name={index === 0 ? `slas_weeks.weeks.${0}` : `slas_weeks.weeks_${index}.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_weeks[`weeks`] : values.slas_weeks[`weeks_${index}`][0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label style={{ fontSize: '18px', margin: '10px' }}>THEN NOTIFY TO</Label>
                      </Col>
                    </Row>

                    <Row gutter={30} style={{ marginTop: 10, }}>
                      <Col>
                        <SelectBox
                          showSearch={true}
                          mode="multiple"
                          id={index === 0 ? `slas_individual_user.individual` : `slas_individual_user.individual_${index}`}
                          name={index === 0 ? `slas_individual_user.individual` : `slas_individual_user.individual_${index}`}
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          label="Individual User"
                          value={index === 0 ? values.slas_individual_user[`individual`] : values.slas_individual_user[`individual_${index}`]}
                          // touched={(touched['slas_individual_user'])?.individual_0}
                          width={300}
                          options={usersListItems}
                        />
                      </Col>

                      <Col >
                        <SelectBox
                          showSearch={true}

                          mode="multiple"
                          label="User Groups"
                          id={index === 0 ? `slas_user_groups.group` : `slas_user_groups.group_${index}`}
                          name={index === 0 ? `slas_user_groups.group` : `slas_user_groups.group_${index}`}
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_user_groups[`group`] : values.slas_user_groups[`group_${index}`]}
                          // touched={(touched['slas_user_groups'])?.group_0}
                          width={300}
                          options={userGroupListItems}
                        />
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 10 }}>
                      <Col>
                        <SelectBox
                          showSearch={true}
                          mode="tags"
                          label="External Users (Email)"
                          id={index === 0 ? `slas_external_user.external` : `slas_external_user.external_${index}`}
                          name={index === 0 ? `slas_external_user.external` : `slas_external_user.external_${index}`}
                          placeholder="Enter only emails"
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          value={index === 0 ? values.slas_external_user[`external`] : values.slas_external_user[`external_${index}`]}
                          // touched={touched.slas_container_response}
                          width={300}
                          options={[]}
                        />
                      </Col>
                    </Row>
                  </Card>
                )
              })
            }

            <Card style={{ background: '#13131A', padding: 10, marginTop: 30 }}>
              <Switches style={{ flexDirection: 'row' }}>
                <SPToggleSwitch onChecked={expireNotify} onChange={() => {
                  setExpireNotify(!expireNotify);
                  // setShowClassification(!expireNotify);
                }} />
                <Label style={{ paddingLeft: 10 }}>When all of the SLA escalations have expired without being acted on, issue SLA breach notification to:</Label>
              </Switches>

              {
                expireNotify ?
                  <>
                    <Row gutter={30} style={{ alignItems: 'center' }}>
                      <Col>
                        <Label style={{ marginTop: '25px' }}>Last</Label>
                      </Col>
                      <Col>
                        <InputBox
                          id={`slas_on_expired_notify.minutes.${0}`}
                          label={'Minute'}
                          name={`slas_on_expired_notify.minutes.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.minutes[0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={`${touched.slas_minute.minutes_}${index}`}
                          width={70}
                          noBorderValidation
                        />
                      </Col>

                      <Col>
                        <InputBox
                          id={`slas_on_expired_notify.hours.${0}`}
                          label={'Hours'}
                          name={`slas_on_expired_notify.hours.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.hours[0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>
                      <Col>
                        <InputBox
                          id={`slas_on_expired_notify.days.${0}`}
                          label={'Day'}
                          name={`slas_on_expired_notify.days.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.days[0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>

                      <Col>
                        <InputBox
                          id={`slas_on_expired_notify.weeks.${0}`}
                          label={'Week'}
                          name={`slas_on_expired_notify.weeks.${0}`}
                          // placeholder={'Name'}
                          type="number"
                          onInputChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.weeks[0]}
                          // errorMessage={errors.slas_rule_name}
                          // touched={touched.slas_rule_name}
                          width={70}
                          noBorderValidation
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label style={{ fontSize: '18px', margin: '10px' }}>THEN NOTIFY TO</Label>
                      </Col>
                    </Row>

                    <Row gutter={30} style={{ marginTop: 10, }}>
                      <Col>
                        <SelectBox
                          showSearch={true}
                          mode="multiple"
                          id={`slas_on_expired_notify.individual`}
                          name={`slas_on_expired_notify.individual`}
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          label="Individual User"
                          value={values.slas_on_expired_notify.individual}
                          // touched={(touched['slas_individual_user'])?.individual_0}
                          width={300}
                          options={usersListItems}
                        />
                      </Col>

                      <Col >
                        <SelectBox
                          showSearch={true}
                          mode="multiple"
                          label="User Groups"
                          id={`slas_on_expired_notify.group`}
                          name={`slas_on_expired_notify.group`}
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.group}
                          // touched={(touched['slas_user_groups'])?.group_0}
                          width={300}
                          options={userGroupListItems}
                        />
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 10 }}>
                      <Col>
                        <SelectBox
                          showSearch={true}
                          mode="tags"
                          label="External Users (Email)"
                          id={`slas_on_expired_notify.external`}
                          name={`slas_on_expired_notify.external`}
                          placeholder="Enter only emails"
                          onInputChange={setFieldValue}
                          onBlur={handleBlur}
                          value={values.slas_on_expired_notify.external}
                          // touched={touched.slas_container_response}
                          width={300}
                          options={[]}
                        />
                      </Col>
                    </Row>
                  </>
                  : null
              }
            </Card>



            <Row gutter={11} justify="end" style={{ marginTop: '20px' }}>
              <Col>
                <SPButton
                  title="Cancel"
                  size="small"
                  type="secondary"
                  onButtonClick={() => {
                    resetForm();
                    onClose();
                  }}
                />
              </Col>
              <Col>
                <SPButton
                  title="Save"
                  size="small"
                  type="submit"
                  onButtonClick={handleSubmit}
                  isLoading={false}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    // containerList: state?.userStore?.userProfile?.data?.profile[0],
    containerList: state.administration.cases.containerList,
    dispositionList: state.administration.cases.dispositionList,
    categoryList: state.administration.cases.categoryList,
    severityList: state.caseMasterSeverity.result,
    riskRateList: state.playbookStore.riskRatingList,
    classificationList: state.administration.assets.listData?.data,
    assetsTypeList: state.administration.assetValueDropDownList.listData?.data,
    usersList: state.caseMasterStore.users?.data,
    userGroupList: state.incidentMasterStore.userGroups?.data
    // loading: state.administration.slaList.loading
  };
};

const mapDispatchToProps = dispatch => ({
  // onGetSalsList: (...args) => dispatch(administratorCasesSlaList(...args)),
  onDeleteList: (...args) => dispatch(administratorCasesSlaDelete(...args)),
  onContainerList: () => dispatch(getCasesContainerList()),
  onDispositionList: (payload) => dispatch(getCasesDespositionList(payload)),
  onCategoryList: (payload) => dispatch(getCasesCategoryList(payload)),

});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CreateEscalationForm);;