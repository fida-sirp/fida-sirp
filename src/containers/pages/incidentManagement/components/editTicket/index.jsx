import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { Row, Col } from 'antd';
import FormHeader from '../FormHeader';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SPDatepicker from '../../../../../components/SPDatepicker';
import SelectBox from '../../../../../components/SelectBox';
import SPUpload from '../../../../../components/SPUpload';
import TextEditorBox from '../../../../../components/TextEditorBox';
import packageJson from '../../../../../../package.json';

import 'antd/dist/antd.css';
import { isArray, isObject, isString } from 'lodash';
import validationSchema from './utils/validator';
import loaderImg from '../../../../../assets/images/loader.gif';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';

import {
  getDispositionKeysAction,
  getDispositionFieldsAction,
  downloadAsset,
  listIncidentDisposition,
} from '../../../../../actions/incidentManagement';
import {
  getArtifactListAction,
  getIncidentManagementartifactsAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementSeverityAction,
  listLocationUsers,
  listLocationUsersGroup
} from '../../../../../actions/incidentMasterData';
import { listAsset } from '../../../../../actions/threatIntelligence';

import {
  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementsubCategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementsubDispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
} from '../../../../../actions/caseMasterData';
import { listCaseDisposition } from '../../../../../actions/caseManagement';

import { compose } from 'redux';
import { connect } from 'react-redux';
import ImageLoader from '../../../../../components/ImageLoader';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const statusList = [
  { key: 'open', value: 'open', label: 'Open' },
  { key: 'close', value: 'close', label: 'Close' },
  { key: 'deferred', value: 'deferred', label: 'Deferred' },
];
const dataCompromisedList = [
  { key: 'Yes', value: 'Yes', label: 'Yes' },
  { key: 'No', value: 'No', label: 'No' },
];

const alertEndedList = [
  { key: 'Yes', value: 'Yes', label: 'Yes' },
  { key: 'No', value: 'No', label: 'No' },
];
const severties = ['High', 'Medium', 'Low'];
const initialValues = {};
const DefaultVisibleFields = [
  'iti_handler_id',
  'iti_category_details',
  'iti_analysis_summary',
  'iti_owner',
  'iti_attack_date',
  'iti_detect_date',
  'iti_attack_ended',
  'iti_attack_duration',
  'iti_escalation_date',
  'iti_estimated_recovery_clock',
  'iti_estimated_recovery_hours',
  'iti_approx_users_affeacted',
  'iti_approx_host_affeacted',
  'iti_aware_incident',
  'iti_evidence_description',
  'iti_compromised_asset',
  'iti_data_compromised',
  'iti_system_damage_detail',
  'iti_suggestions_recovery',
  'iti_closed_remediation',
];

const formids = {
  All: 'tkf_incident',
  Alert: 'tkf_alert',
  Incident: 'tkf_incident',
  Investigation: 'tkf_investigation',
};
function EditTicket({
  type,
  item,
  formMaster,
  onChangeCategory,
  onChangeDisposition,
  onFormSubmit,
  create,
  formLoader,
  getDispositionKeysAction,
  getDispositionFieldsAction,
  incidentDispositionKeys,
  onCancel,
  downloadAsset,
  activeOption,
  activeOptionItem,

  // dropdown data
  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
  listCaseDisposition,
  getArtifactListAction,
  listAsset,
  formType = 'case',
  // dropdown data

  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listIncidentDisposition,
  listLocationUsers,
  listLocationUsersGroup
}) {
  React.useEffect(() => {


    if (item?.iti_id) {
      onChangeCategory(item?.iti_category_id);
    }

    if (item?.iti_id) {
      onChangeDisposition(item?.iti_disposition_id);
    }

  }, [item?.iti_id]);

  React.useEffect(() => {

    if (formType !== 'incident') {

      getCaseManagementSeverityAction();
      getCaseManagementcategoryAction();
      getCaseManagementdispositionAction();
      getCaseManagementlocationAction();
      getCaseManagementdetectionMethodsAction();
      getCaseManagementartifactsAction();
      getArtifactListAction();

      listAsset();

    }
    if (formType === 'incident') {
      getIncidentManagementSeverityAction();
      getIncidentManagementcategoryAction();
      getIncidentManagementdispositionAction();
      getIncidentManagementlocationAction();
      getIncidentManagementdetectionMethodsAction();
      getIncidentManagementartifactsAction();
      listAsset();
      listLocationUsers();
      getArtifactListAction();
      listLocationUsersGroup();
    }
  }, []);

  React.useEffect(() => {
    setAttachedEvidenceFiles([]);
    getDispositionKeysAction({
      callback: resp => {
        const keys = isObject(resp?.data) ? Object.keys(resp?.data) : [];
        console.log({ getDispositionKeysAction: keys });
        let incidentKey = formids[activeOption];
        console.log({ incidentKey });
        if (incidentKey) {
        
          //getDispositionFieldsAction({ type: incidentKey });
        } else {
          setFormInputVisible(false);
        }
      },
    });
  }, [activeOption]);



  let visibleFields = isObject(incidentDispositionKeys?.resultFields?.data)
    ? Object.keys(incidentDispositionKeys?.resultFields?.data)
    : [];

  const [infoVisible, setInfoVisible] = useState(true);
  const [attachedEvidenceFiles, setAttachedEvidenceFiles] = useState([]);

  const [catVisible, setCatVisible] = useState(true);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [evidenceVisible, setEvidenceVisible] = useState(true);
  const [remVisible, setRemVisible] = useState(true);
  const [formInputVisible, setFormInputVisible] = useState(true);
  const [validattionSchemaState, setValidattionSchemaState] = useState(
    validationSchema
  );

  if (!formInputVisible) {
    visibleFields = DefaultVisibleFields;
  }
  const collapseAllField = () => {
    if (
      !infoVisible &&
      !catVisible &&
      !summaryVisible &&
      !evidenceVisible &&
      !remVisible
    ) {
      setInfoVisible(true);
      setCatVisible(true);
      setSummaryVisible(true);
      setEvidenceVisible(true);
      setRemVisible(true);
    } else {
      setInfoVisible(false);
      setCatVisible(false);
      setSummaryVisible(false);
      setEvidenceVisible(false);
      setRemVisible(false);
    }
  };

  const evidentListInputValues = {};

  isArray(formMaster?.incidentArtifact)
    ? formMaster?.incidentArtifact.map(artifact => {
      if (artifact?.am_name == 'File1' || artifact?.am_name === 'Header1') {
        evidentListInputValues[`Artifact_Selected_${artifact?.am_name}`] = {
          path: artifact?.filePath,
          name: artifact?.am_value,
        };
        return;
      }
      let fieldName = artifact?.am_name;
      if (isObject(formMaster?.incidenArtifactList?.result)) {
        Object.keys(formMaster?.incidenArtifactList?.result).forEach(k => {
          if (
            formMaster?.incidenArtifactList?.result[k] === artifact?.am_name
          ) {
            fieldName = k;
          }
        });
      }
      evidentListInputValues[`Artifact_${fieldName}`] = artifact?.am_value;
    })
    : {};

  console.log({
    evidentListInputValues: evidentListInputValues,
    incidenArtifactList: formMaster?.incidenArtifactList?.result,
    item,
  });

  const incidentMasterDispositionList = isArray(
    formMaster?.incidentMasterDisposition?.result
  )
    ? formMaster?.incidentMasterDisposition?.result.map(disposition => {
      return {
        label: disposition?.ids_name,
        value: disposition?.ids_id,
        key: disposition?.ids_id,
      };
    })
    : [];

  let assets = [];
  if (isArray(item?.incidentAssets)) {
    assets = item?.incidentAssets?.[0].map(a => String(a?.ast_id));
  }

  function getMembersArray(){
    var data = [];
      if(isObject(item?.members?.[0]?.users)){
        var users = Object.keys(item?.members?.[0]?.users);
        for(var i = 0; i < users.length; i++){
          data.push("u_"+users[i]);
        }
      }
      if(isObject(item?.members?.[0]?.groups)){
        var groups = Object.keys(item?.members?.[0]?.groups);
        for(var i = 0; i < groups.length; i++){
          data.push("g_"+groups[i]);
        }
      }
      return data;

  }
  const getInitVal = () => {

    return {
      iti_subject: item?.iti_subject,
      iti_priority: item?.iti_priority,
      iti_ticket_status: item?.iti_ticket_status,
      iti_description: item?.iti_description,
      iti_start_date: item?.iti_start_date
        ? new moment(item?.iti_start_date, dateFormat)
        : new moment(),
      iti_due_date: item?.iti_due_date
        ? new moment(item?.iti_due_date, dateFormat)
        : new moment(),
      iti_close_date: item?.iti_close_date
        ? new moment(item?.iti_close_date, dateFormat)
        : new moment(),
      iti_category_id: item?.iti_category_id
        ? String(item?.iti_category_id)
        : '',
      iti_disposition_id: item?.iti_disposition_id
        ? String(item?.iti_disposition_id)
        : '',
      iti_location_id: item?.iti_location_id
        ? String(item?.iti_location_id)
        : '1',
      iti_disposition_sub_category_id: item?.iti_disposition_sub_category_id
        ? String(item?.iti_disposition_sub_category_id)
        : '',
      iti_analysis_summary: item?.iti_analysis_summary,
      iti_owner: item?.iti_owner,
      iti_attack_date: item?.iti_attack_date
        ? new moment(item?.iti_attack_date, dateFormat)
        : new moment(),
      iti_detect_date: item?.iti_detect_date
        ? new moment(item?.iti_detect_date, dateFormat)
        : new moment(),

      iti_attack_ended: item?.iti_attack_ended,
      iti_attack_duration: item?.iti_attack_duration,
      iti_escalation_date: item?.iti_escalation_date
        ? new moment(item?.iti_escalation_date, dateFormat)
        : new moment(),
      iti_attack_severity: item?.iti_attack_severity,
      iti_estimated_recovery_clock: item?.iti_estimated_recovery_clock,
      iti_estimated_recovery_hours: item?.iti_estimated_recovery_hours,
      iti_approx_users_affeacted: item?.iti_approx_users_affeacted,
      iti_approx_host_affeacted: item?.iti_approx_host_affeacted,
      iti_evidence_description: item?.iti_evidence_description,
      iti_data_compromised: item?.iti_data_compromised,
      iti_system_damage_detail: item?.iti_system_damage_detail,
      iti_suggestions_recovery: item?.iti_suggestions_recovery,
      iti_closed_remediation: item?.iti_closed_remediation,
      members: getMembersArray(),
      itiAwareIncident: item?.itiAwareIncident?.iat_id,
      iti_artifacts: isString(item?.iti_artifacts)
        ? item?.iti_artifacts
          .split(',')
          .filter(iti_artifact => iti_artifact !== '')
        : [],
      itiSubcategory: isObject(item?.itiSubcategory)
        ? Object.keys(item?.itiSubcategory)
        : [],
      ...evidentListInputValues,
      attachedEvidence: [],
      affectedAssets: assets,
    };
  };
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validattionSchemaState}
        initialValues={getInitVal()}
        onSubmit={(values, { resetForm }) => {
          const reqPayload = {
            iti_subject: values.iti_subject,
            iti_priority: values.iti_priority,
            iti_ticket_status: values.iti_ticket_status,
            iti_description: values.iti_description,
            iti_handler_id: values.members.join(','),
            iti_category_id: values.iti_category_id,
            iti_disposition_id: values.iti_disposition_id
              ? values.iti_disposition_id
              : activeOptionItem?.id,
            iti_disposition_sub_category_id:
              values.iti_disposition_sub_category_id,
            iti_location_id: values.iti_location_id
              ? parseInt(values.iti_location_id)
              : 1,
            iti_analysis_summary: values.iti_analysis_summary,
            iti_owner: values.iti_owner,

            iti_attack_ended: values.iti_attack_ended,
            iti_attack_duration: values.iti_attack_duration,
            iti_attack_severity: values.iti_attack_severity,
            iti_estimated_recovery_clock: values.iti_estimated_recovery_clock,
            iti_estimated_recovery_hours: values.iti_estimated_recovery_hours,
            iti_approx_users_affeacted: values.iti_approx_users_affeacted,
            iti_approx_host_affeacted: values.iti_approx_host_affeacted,
            iti_aware_incident: values.itiAwareIncident,

            iti_start_date: moment(values.iti_start_date).format(dateFormat),
            iti_close_date: moment(values.iti_close_date).format(dateFormat),
            iti_due_date: moment(values.iti_due_date).format(dateFormat),
            iti_attack_date: moment(values.iti_attack_date).format(dateFormat),
            iti_detect_date: moment(values.iti_detect_date).format(dateFormat),
            iti_escalation_date: moment(values.iti_escalation_date).format(dateFormat),

            iti_artifacts: values?.iti_artifacts,
            iti_evidence_description: values?.iti_evidence_description,
            iti_data_compromised: values?.iti_data_compromised,
            iti_data_compromised_detail: values?.iti_data_compromised,
            iti_system_damage_detail: values?.iti_system_damage_detail,
            iti_suggestions_recovery: values?.iti_suggestions_recovery,
            iti_closed_remediation: values?.iti_closed_remediation,
            upload_artifact_File: values?.upload_artifact_File,
            upload_artifact_Header: values?.upload_artifact_Header,
            attachedEvidence: values?.attachedEvidence,
            iti_compromised_asset: values?.affectedAssets,
            iti_handler_id: values.members.map(m => {
              return `${m}`;
            }),
            iti_category_details: values?.itiSubcategory,
          };

          var FormData = require('form-data');
          var data = new FormData();
          var timeItem = [
            'iti_start_date', 'iti_close_date', 'iti_due_date', 'iti_attack_date', 'iti_detect_date', 'iti_escalation_date'
          ];
          Object.keys(reqPayload).forEach(k => {

            if (
              [
                'iti_artifacts',
                'iti_compromised_asset',
                'iti_handler_id',
                'iti_category_details',
              ].includes(k) &&
              isArray(reqPayload?.[k])
            ) {
              reqPayload?.[k].forEach(d => {
                data.append(`${k}[]`, d);
              });
            }
            else if (
              timeItem.includes(k)
            ) {

              data.append(k, reqPayload?.[k]);
            }
            else {
              if (values?.[k] !== undefined) {
                data.append(k, values?.[k]);
              }
            }
          });


          Object.keys(values).map(k => {
            console.log('startsWith ', k.startsWith('Artifact_'));
            if (k.startsWith('Artifact_')) {
              if (values?.[k] !== undefined) {
                data.append(k, values?.[k]);
              }

            }
          });

          if (attachedEvidenceFiles.length > 0) {
            attachedEvidenceFiles.forEach(attachedEvidenceFile => {
              data.append(`attachedEvidence[]`, attachedEvidenceFile);
            });
          }
          if (values?.itiAwareIncident) {
            data.append('iti_aware_incident', values?.itiAwareIncident);
          }
       
          onFormSubmit(data, resetForm);
          setAttachedEvidenceFiles([]);
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
          console.log({ errors });
          useEffect(() => {
            if (item?.iti_id === undefined || type === 'create') {
              resetForm();
            } else {
              resetForm();
              const initVal = getInitVal();
              Object.keys(initVal).map(k => {
                setFieldValue(k, initVal[k] || '', false);
              });
              console.log({ initVal });
            }
          }, [type, item]);
          useEffect(() => {
            if (item?.iti_id === undefined || type === 'create') {
              resetForm();
              return;
            }
          }, [create]);

          useEffect(() => {
            if (
              isArray(incidentMasterDispositionList) &&
              incidentMasterDispositionList.length > 0 &&
              type === 'create' &&
              !values.iti_disposition_id
            ) {
              setFieldValue(
                'iti_disposition_id',
                incidentMasterDispositionList.find(
                  i => i?.label === activeOption
                )?.key
              );
            }
          }, [activeOption, incidentMasterDispositionList]);

          const evidenceFields = values?.iti_artifacts;


          useEffect(() => {
            if (
              values.iti_disposition_id &&
              incidentDispositionKeys?.result?.data
            ) {
              const keys = isObject(incidentDispositionKeys?.result?.data)
                ? Object.keys(incidentDispositionKeys?.result?.data)
                : [];
              console.log({ getDispositionKeysAction: keys });
              let incidentKey = '';
              const selected = incidentMasterDispositionList.find(
                r => String(r.value) === String(values.iti_disposition_id)
              );

              console.log({
                incidentDispositionKeys,
                selected,
              });

              keys.forEach(k => {
                if (
                  incidentDispositionKeys?.result?.data?.[k] === selected?.label
                ) {
                  incidentKey = k;
                }
              });
              console.log({ getDispositionKeysAction: incidentKey });

              if (incidentKey) {
                setFormInputVisible(true);
                console.log("-----------------");
                getDispositionFieldsAction({ type: incidentKey });
              } else {
                setFormInputVisible(false);
              }
            }
          }, [values.iti_disposition_id, incidentDispositionKeys?.result]);

          return (
            <Form onSubmit={handleSubmit}>
              <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title={
                      !infoVisible &&
                        !catVisible &&
                        !summaryVisible &&
                        !evidenceVisible &&
                        !remVisible
                        ? 'Expand all fields'
                        : 'Collapse all fields'
                    }
                    size="small"
                    type="secondary"
                    onButtonClick={collapseAllField}
                  />
                </Col>
              </Row>

              <FormHeader
                number={1}
                visible={infoVisible}
                onOpen={() => setInfoVisible(true)}
                onClose={() => setInfoVisible(false)}
                title="Information"
              >
                <InputBox
                  id="iti_subject"
                  label="Subject"
                  name="iti_subject"
                  placeholder="Subject"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.iti_subject ? errors.iti_subject : undefined
                  }
                  value={values.iti_subject}
                  touched={touched.iti_subject}
                />
                <SelectBox
                  id="iti_priority"
                  label="Priority"
                  name="iti_priority"
                  placeholder="Priority"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_priority}
                  value={values.iti_priority}
                  touched={touched.iti_priority}
                  width={100}
                  options={severties.map(s => {
                    return {
                      label: s,
                      value: s,
                    };
                  })}
                />

                <SelectBox
                  id="iti_ticket_status"
                  label="Status"
                  name="iti_ticket_status"
                  placeholder="Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_ticket_status}
                  value={values.iti_ticket_status}
                  touched={touched.iti_ticket_status}
                  width={100}
                  options={statusList}
                />

                <TextEditorBox
                  value={values.iti_description ?? ''}
                  onChange={html => {
                    setFieldValue('iti_description', html);
                  }}
                  placeholder={'Description'}
                  label={'Description'}
                />

                <SPDatepicker
                  id="iti_start_date"
                  label="Start date"
                  name="iti_start_date"
                  placeholder="Start date"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_start_date}
                  value={values.iti_start_date}
                  touched={touched.iti_start_date}
                  disabled={isSubmitting}
                  width={170}
                />
                <SPDatepicker
                  id="iti_close_date"
                  label="End date"
                  name="iti_close_date"
                  placeholder="End date"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_close_date}
                  value={values.iti_close_date}
                  touched={touched.iti_close_date}
                  disabled={isSubmitting}
                  width={170}
                />
                <SPDatepicker
                  id="iti_due_date"
                  label="Due date"
                  name="iti_due_date"
                  placeholder="due date"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_due_date}
                  value={values.iti_due_date}
                  touched={touched.iti_due_date}
                  disabled={isSubmitting}
                  width={170}
                />
              </FormHeader>

              <FormHeader
                number={2}
                visible={catVisible}
                onOpen={() => setCatVisible(true)}
                onClose={() => setCatVisible(false)}
                title="Categorization"
              >
                <SelectBox
                  id="iti_disposition_id"
                  label="Disposition"
                  name="iti_disposition_id"
                  placeholder="Disposition"
                  onInputChange={(name, val) => {
                    setFieldValue(name, val);
                    setFieldValue('iti_disposition_sub_category_id', '');
                    onChangeDisposition(val);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_disposition_id}
                  value={
                    values.iti_disposition_id
                      ? values.iti_disposition_id
                      : activeOptionItem?.id
                        ? String(activeOptionItem?.id)
                        : ''
                  }
                  touched={touched.iti_disposition_id}
                  width={300}
                  options={incidentMasterDispositionList}
                />

                <Row>
                  <SelectBox
                    id="iti_disposition_sub_category_id"
                    label="Disposition Subcategory"
                    name="iti_disposition_sub_category_id"
                    placeholder="Disposition Subcategory"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_disposition_sub_category_id}
                    value={values.iti_disposition_sub_category_id}
                    touched={touched.iti_disposition_sub_category_id}
                    width={300}
                    options={
                      isObject(formMaster?.incidentMasterSubDisposition?.result)
                        ? Object.keys(
                          formMaster?.incidentMasterSubDisposition?.result
                        ).map(subdisposition => {
                          const name =
                            formMaster?.incidentMasterSubDisposition
                              ?.result?.[subdisposition];
                          return {
                            label: name,
                            value: subdisposition,
                          };
                        })
                        : []
                    }
                    loading={formLoader?.subDisposition}
                  />
                </Row>

                {visibleFields.includes('iti_handler_id') && (
                  <SelectBox
                    id="members"
                    mode="multiple"
                    label="Members"
                    name="members"
                    group={true}
                    groupList={[
                      { groupName: 'Users' },
                      { groupName: 'Groups' },
                    ]}
                    placeholder="Members"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.members}
                    value={values.members}
                    touched={touched.members}
                    width={600}
                    options={formMaster.members}
                  />
                )}

                <SelectBox
                  id="iti_category_id"
                  label="Category"
                  name="iti_category_id"
                  placeholder="Category"
                  onInputChange={(name, val) => {
                    setFieldValue(name, val);
                    setFieldValue('itiSubcategory', []);
                    onChangeCategory(val);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_category_id}
                  value={values.iti_category_id}
                  touched={touched.iti_category_id}
                  width={300}
                  options={
                    isObject(formMaster?.incidentMasterCategory?.result)
                      ? Object.keys(
                        formMaster?.incidentMasterCategory?.result
                      ).map(category => {
                        const name =
                          formMaster?.incidentMasterCategory?.result?.[
                          category
                          ];
                        return {
                          label: name,
                          value: category,
                        };
                      })
                      : []
                  }
                />
                {visibleFields.includes('iti_category_details') && (
                  <Row>
                    <SelectBox
                      id="itiSubcategory"
                      label="Subcategories"
                      name="itiSubcategory"
                      placeholder="Subcategories"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.itiSubcategory}
                      value={values.itiSubcategory}
                      touched={touched.itiSubcategory}
                      width={300}
                      mode="multiple"
                      options={
                        isArray(formMaster?.incidentMasterSubCategory)
                          ? formMaster?.incidentMasterSubCategory
                          : []
                      }
                      loading={formLoader?.subCategory}
                    />
                  </Row>
                )}

                <SelectBox
                  id="iti_location_id"
                  label="Location"
                  name="iti_location_id"
                  placeholder="Location"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_location_id}
                  value={values.iti_location_id}
                  touched={touched.iti_location_id}
                  width={300}

                  options={
                    isObject(formMaster?.incidentMasterLocation?.result)
                      ? Object.keys(
                        formMaster?.incidentMasterLocation?.result
                      ).map(location => {
                        const name =
                          formMaster?.incidentMasterLocation?.result?.[
                          location
                          ];
                        return {
                          label: name,
                          value: location,
                        };
                      })
                      : []
                  }
                />
              </FormHeader>

              <FormHeader
                number={3}
                visible={summaryVisible}
                onOpen={() => setSummaryVisible(true)}
                onClose={() => setSummaryVisible(false)}
                title="Analysis Summary"
              >
                {visibleFields.includes('iti_analysis_summary') && (
                  <TextEditorBox
                    value={values.iti_analysis_summary ?? ''}
                    onChange={html => {
                      setFieldValue('iti_analysis_summary', html);
                    }}
                    placeholder={'Analysis summary'}
                    label={'Analysis summary'}
                  />
                )}
                {visibleFields.includes('iti_owner') && (
                  <InputBox
                    id="iti_owner"
                    mode="tags"
                    label="Owner / Custodian"
                    name="iti_owner"
                    placeholder="Owner / Custodian"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_owner}
                    value={values.iti_owner}
                    touched={touched.iti_owner}
                    width={330}
                  />
                )}
                {visibleFields.includes('iti_attack_date') && (
                  <SPDatepicker
                    id="iti_attack_date"
                    label="Attack date"
                    name="iti_attack_date"
                    placeholder="Attack date"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_attack_date}
                    value={values.iti_attack_date}
                    touched={touched.iti_attack_date}
                    disabled={isSubmitting}
                    width={170}
                  />
                )}
                {visibleFields.includes('iti_detect_date') && (
                  <SPDatepicker
                    id="iti_detect_date"
                    label="Detection date"
                    name="iti_detect_date"
                    placeholder="Detection date"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_detect_date}
                    value={values.iti_detect_date}
                    touched={touched.iti_detect_date}
                    disabled={isSubmitting}
                    width={170}
                  />
                )}
                {visibleFields.includes('iti_attack_ended') && (
                  <SelectBox
                    id="iti_attack_ended"
                    label="Attack Ended"
                    name="iti_attack_ended"
                    placeholder="Attack Ended"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_attack_ended}
                    value={values.iti_attack_ended}
                    touched={touched.iti_attack_ended}
                    options={alertEndedList}
                  />
                )}
                {visibleFields.includes('iti_attack_duration') && (
                  <InputBox
                    type="number"
                    id="iti_attack_duration"
                    label="Attack Duration"
                    name="iti_attack_duration"
                    placeholder="Attack Duration"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_attack_duration}
                    value={values.iti_attack_duration}
                    touched={touched.iti_attack_duration}
                    width={330}
                  />
                )}
                {visibleFields.includes('iti_escalation_date') && (
                  <SPDatepicker
                    id="iti_escalation_date"
                    label="Escalation Date"
                    name="iti_escalation_date"
                    placeholder="Escalation Date"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_escalation_date}
                    value={values.iti_escalation_date}
                    touched={touched.iti_escalation_date}
                    disabled={isSubmitting}
                    width={170}
                  />
                )}

                <SelectBox
                  id="iti_attack_severity"
                  label="Severity"
                  name="iti_attack_severity"
                  placeholder="Severity"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_attack_severity}
                  value={values.iti_attack_severity}
                  touched={touched.iti_attack_severity}
                  width={150}
                  options={
                    isObject(formMaster?.severity)
                      ? Object.keys(formMaster?.severity).map(s => {
                        return {
                          label: formMaster?.severity[s],
                          value: s,
                        };
                      })
                      : []
                  }
                />

                {visibleFields.includes('iti_estimated_recovery_clock') && (
                  <InputBox
                    type="number"
                    id="iti_estimated_recovery_clock"
                    label="Estimated Recovery Clock"
                    name="iti_estimated_recovery_clock"
                    placeholder="Estimated Recovery Clock"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_estimated_recovery_clock}
                    value={values.iti_estimated_recovery_clock}
                    touched={touched.iti_estimated_recovery_clock}
                    width={330}
                  />
                )}
                {visibleFields.includes('iti_estimated_recovery_hours') && (
                  <InputBox
                    type="number"
                    id="iti_estimated_recovery_hours"
                    label="Estimated Recovery Hours"
                    name="iti_estimated_recovery_hours"
                    placeholder="Estimated Recovery Hours"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_estimated_recovery_hours}
                    value={values.iti_estimated_recovery_hours}
                    touched={touched.iti_estimated_recovery_hours}
                    width={250}
                  />
                )}

                {visibleFields.includes('iti_approx_users_affeacted') && (
                  <InputBox
                    type="number"
                    id="iti_approx_users_affeacted"
                    label="Number of Users Affected"
                    name="iti_approx_users_affeacted"
                    placeholder="Number of Users Affected"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_approx_users_affeacted}
                    value={values.iti_approx_users_affeacted}
                    touched={touched.iti_approx_users_affeacted}
                    width={330}
                  />
                )}
                {visibleFields.includes('iti_approx_host_affeacted') && (
                  <InputBox
                    type="number"
                    id="iti_approx_host_affeacted"
                    label="Number of Hosts Affected"
                    name="iti_approx_host_affeacted"
                    placeholder="Number of Hosts Affected"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_approx_host_affeacted}
                    value={values.iti_approx_host_affeacted}
                    touched={touched.iti_approx_host_affeacted}
                    width={330}
                  />
                )}
                {visibleFields.includes('iti_aware_incident') && (
                  <SelectBox
                    id="itiAwareIncident"
                    label="Detection Method"
                    name="itiAwareIncident"
                    placeholder="Detection Method"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.itiAwareIncident}
                    value={values.itiAwareIncident}
                    touched={touched.itiAwareIncident}
                    width={330}
                    options={
                      isArray(
                        formMaster?.incidentMasterDetectionMethods?.result
                          ?.items
                      )
                        ? formMaster?.incidentMasterDetectionMethods?.result?.items.map(
                          method => {
                            return {
                              label: method.iat_name,
                              value: method.iat_id,
                            };
                          }
                        )
                        : []
                    }
                  />
                )}
              </FormHeader>

              <FormHeader
                number={4}
                visible={evidenceVisible}
                onOpen={() => setEvidenceVisible(true)}
                onClose={() => setEvidenceVisible(false)}
                title="Evidence"
              >
                <SelectBox
                  id="iti_artifacts"
                  mode="multiple"
                  label="Evidence"
                  name="iti_artifacts"
                  placeholder="Evidence"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_artifacts}
                  value={values.iti_artifacts.filter(
                    iti_artifact => iti_artifact !== ''
                  )}
                  touched={touched.iti_artifacts}
                  width={350}
                  options={
                    isObject(formMaster?.incidenArtifactList?.result)
                      ? Object.keys(
                        formMaster?.incidenArtifactList?.result
                      ).map(artifact => {
                        return {
                          label:
                            formMaster?.incidenArtifactList?.result?.[
                            artifact
                            ],
                          value: artifact,
                          key: artifact,
                        };
                      })
                      : []
                  }
                />
                {isArray(evidenceFields) &&
                  evidenceFields.map(evidenceField => {
                    if (
                      (isString(evidenceField) && evidenceField === 'File') ||
                      (isString(evidenceField) && evidenceField === 'Header') ||
                      (isObject(evidenceField) &&
                        evidenceField?.key === 'File') ||
                      (isObject(evidenceField) &&
                        evidenceField?.key === 'Header')
                    ) {
                      let fieldName = `Artifact_${isString(evidenceField)
                          ? evidenceField
                          : evidenceField?.key
                        }`;

                      if (fieldName === 'Artifact_File') {
                        fieldName = 'upload_artifact_File';
                      } else {
                        fieldName = 'upload_artifact_Header';
                      }

                      const filePath =
                        values?.[
                        `Artifact_Selected_${isString(evidenceField)
                          ? evidenceField
                          : evidenceField?.key
                        }`
                        ];
                      return (
                        <>
                          <Row>
                            <SPUpload
                              id={
                                isString(evidenceField)
                                  ? evidenceField
                                  : evidenceField?.aio_id
                              }
                              label={
                                isString(evidenceField)
                                  ? evidenceField
                                  : evidenceField?.key
                              }
                              name={fieldName}
                              placeholder={
                                isString(evidenceField)
                                  ? evidenceField
                                  : evidenceField?.key
                              }
                              onInputChange={(name, file) => {
                                console.log('>>>>', name, file);
                                setFieldValue(name, file);
                              }}
                              onBlur={handleBlur}
                              value={values.attachFile}
                              disabled={isSubmitting}
                              width={170}
                            />
                            {values?.[fieldName] && (
                              <a href={'javascript:void(0)'}>
                                {values?.[fieldName]?.name}
                              </a>
                            )}

                            {filePath ? (
                              <FileDownloader
                                file={filePath}
                             
                                onClick={e => {
                                  e.stopPropagation();
                                  downloadAsset({
                                    url: filePath?.path,
                                    name: filePath?.name,
                                    ext: isString(filePath?.name)
                                      ? filePath?.name.split('.')?.[
                                      filePath?.name.split('.').length - 1
                                      ]
                                      : 'zip',
                                  });
                                }}
                              />
                            ) : null}
                          </Row>
                        </>
                      );
                    }

                    return (
                      <TextAreaBox
                        height="20"
                        id={
                          isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.aio_id
                        }
                        label={
                          isString(evidenceField)
                            ? evidenceField.replace("_"," ")
                            : evidenceField?.key
                        }
                        name={`Artifact_${isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`}
                        placeholder={
                          isString(evidenceField)
                            ? evidenceField.replace("_"," ")
                            : evidenceField?.key
                        }
                        onInputChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={
                          errors?.[
                          `Artifact_${isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`
                          ]
                        }
                        value={
                          values?.[
                          `Artifact_${isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`
                          ]
                        }
                        touched={
                          touched?.[
                          `Artifact_${isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`
                          ]
                        }
                      />
                    );
                  })}

                <>
                  <SPUpload
                    multiple
                    id={'attachedEvidence'}
                    label={'Evidence'}
                    name={'attachedEvidence'}
                    placeholder={'Attached Evidence'}
                    onInputChange={(name, file) => {
                      console.log('>>>>', name, file);
                      attachedEvidenceFiles.push(file);
                      setAttachedEvidenceFiles([...attachedEvidenceFiles]);
                    }}
                    onBlur={handleBlur}
                    value={values.attachedEvidence}
                    disabled={isSubmitting}
                    width={170}
                  />
                  {attachedEvidenceFiles.length > 0 && (
                    <div className="selected-div-row">
                      {attachedEvidenceFiles.map(
                        (attachedEvidenceFile, index) => (
                          <div className="selected-div">
                            <a
                              href={'javascript:void(0)'}
                              className="selected-files"
                            >
                              {attachedEvidenceFile?.name}
                            </a>
                            <div
                              onClick={() => {
                                attachedEvidenceFiles.splice(index, 1);
                                setAttachedEvidenceFiles([
                                  ...attachedEvidenceFiles,
                                ]);
                              }}
                            >
                              <CancelIcon />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  {isArray(item?.evidenceAttachment)
                    ? item?.evidenceAttachment.map(attachment => {
                      return (
                        <FileDownloader
                          file={{
                            path: attachment?.path,
                            name: attachment?.attachment,
                          }}
                          onClick={e => {
                            e.stopPropagation();
                            downloadAsset({
                              url: (attachment?.path) ? attachment.path.replace(packageJson.proxy,window.location.origin).replace(":3000",""):"",
                              name: attachment?.attachment,
                              ext: isString(attachment?.attachment)
                                ? attachment?.attachment.split('.')?.[
                                attachment?.attachment.split('.').length -
                                1
                                ]
                                : 'zip',
                            });
                          }}
                        />
                      );
                    })
                    : null}
                </>
              </FormHeader>

              <FormHeader
                number={5}
                visible={remVisible}
                onOpen={() => setRemVisible(true)}
                onClose={() => setRemVisible(false)}
                title="Remediation"
              >
                {visibleFields.includes('iti_evidence_description') && (
                  <TextEditorBox
                    value={values.iti_evidence_description ?? ''}
                    onChange={html => {
                      setFieldValue('iti_evidence_description', html);
                    }}
                    placeholder={'Evidence Description'}
                    label={'Evidence Description'}
                  />
                )}
                {visibleFields.includes('iti_compromised_asset') && (
                  <SelectBox
                    id="affectedAssets"
                    label="Affected Assets"
                    name="affectedAssets"
                    mode="tags"
                    placeholder="Affected Assets"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.affectedAssets}
                    value={values.affectedAssets}
                    touched={touched.affectedAssets}
                    width={350}
                    options={
                      isObject(formMaster?.incidentAssets?.listData)
                        ? Object.keys(formMaster?.incidentAssets?.listData).map(
                          asset => {
                            return {
                              label:
                                formMaster?.incidentAssets?.listData?.[asset],
                              value: asset,
                              key: asset,
                            };
                          }
                        )
                        : []
                    }
                  />
                )}
                {visibleFields.includes('iti_data_compromised') && (
                  <SelectBox
                    id="iti_data_compromised"
                    label="Data Compromised"
                    name="iti_data_compromised"
                    placeholder="Data Compromised"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_data_compromised}
                    value={values.iti_data_compromised}
                    touched={touched.iti_data_compromised}
                    width={200}
                    options={dataCompromisedList}
                  />
                )}

                {visibleFields.includes('iti_system_damage_detail') && (
                  <TextEditorBox
                    value={values.iti_system_damage_detail ?? ''}
                    onChange={html => {
                      setFieldValue('iti_system_damage_detail', html);
                    }}
                    placeholder={'Damage Details'}
                    label={'Damage Details'}
                  />
                )}

                {visibleFields.includes('iti_suggestions_recovery') && (
                  <TextEditorBox
                    value={values.iti_suggestions_recovery ?? ''}
                    onChange={html => {
                      setFieldValue('iti_suggestions_recovery', html);
                    }}
                    placeholder={'Remediation Details'}
                    label={'Remediation Details'}
                  />
                )}

                {visibleFields.includes('iti_closed_remediation') && (
                  <TextEditorBox
                    value={values.iti_closed_remediation ?? ''}
                    onChange={html => {
                      setFieldValue('iti_closed_remediation', html);
                    }}
                    placeholder={'Implemented Remediation'}
                    label={'Implemented Remediation'}
                  />
                )}
              </FormHeader>
              <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      onCancel && onCancel();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={item?.iti_id ? 'Submit' : 'Create'}
                    htmlType="submit"
                    size="small"
                    onButtonClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const FileDownloader = ({ onClick, file }) => {
  return (
    <div
      style={{
        height: 38,
        display: 'flex',
        alignItems: 'flex-end',
        padding: 4,
        margin: 4,
      }}
      onClick={onClick}
    >
      <a
        href="javascript:void(0)"
        onClick={() => { }}
        style={{ color: '#fff', textDecoration: 'underline' }}
      >
        {file?.name}
      </a>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    incidentDispositionKeys: state.incidentDispositionKeys,
  };
};

const mapDispatchToProps = {
  getDispositionKeysAction,
  getDispositionFieldsAction,
  downloadAsset,

  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementsubCategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementsubDispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
  listCaseDisposition,
  getArtifactListAction,
  listAsset,

  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listIncidentDisposition,
  listLocationUsers,
  listLocationUsersGroup,
  
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  EditTicket
);
