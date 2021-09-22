import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import _, { filter, map } from 'lodash';
import moment from 'moment';
import FormHeader from '../../../incidentManagement/components/FormHeader'
import { Row, Col } from 'antd';
import * as Yup from 'yup';

import {
  getProducts,
  getSeverity,
  getAdvisoryVendors,
  getCategories,
  getDepartments,
  getSources,
  getcaseAdvisoryLocation,
  getCaseAdvisroyUsers,
  getEvidence,
  getDisposition,
  getCasesAdvisoryItem,
  getSubCategories,
  getDisPositionsCategories,
  openCasesRequest,
  listAsset,
} from '../../../../../actions/threatIntelligence';
import { listDispositions } from '../../../../../actions/dispositions';
import { getCategory } from '../../../../../actions/cases';
import { Text, StyledDivider, ErrorMes } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SPDatepicker from '../../../../../components/SPDatepicker';
import SelectBox from '../../../../../components/SelectBox';
import SPUpload from '../../../../../components/SPUpload';
import FieldEditor from '../../../../../components/FieldEditor';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const priorityOptions = [
  { key: 1, value: 'High', label: 'High' },
  { key: 2, value: 'Medium', label: 'Medium' },
  { key: 3, value: 'Low', label: 'Low' },
];

const statusOptions = [
  { key: 'Open', value: 'Open', label: 'Open' },
  { key: 'Close', value: 'Close', label: 'Close' },
  { key: 'Deferred', value: 'Deferred', label: 'Deferred' },
]

const severityOptions = [
  {
    key: 1, value: 'High', label: 'High'
  },
  {
    key: 2, value: 'Medium', label: 'Medium'
  },
  { key: 3, value: 'Low', label: 'Low' },
]


const OpenCase = ({
  isVisible,
  threatIntelligenceDetails,
  onOpenCaseDrawerClose,
  onGetProducts,
  onGetVendors,
  threatIntelligenceProduct,
  threatIntelligenceVendors,
  onGetSeverity,
  threatIntelligenceSeverity,
  threatIntelligenceCategories,
  onGetCategories,
  threatIntelligenceDepartments,
  onGetDepartments,
  onGetSources,
  onGetCaseAdvisoryLocation,
  onGetCaseAdvisroyUsers,
  threatIntelligenceCaseAdvisoryUsersList,
  threatIntelligenceCaseAdvisoryLocation,
  threatIntelligenceSource,
  onGetEvidence,
  threatIntelligenceEvidence,
  onGetCaseItems,
  threatIntelligenceCaseAdvisoryItems,
  onGetDisposition,
  threatIntelligenceDisposition,
  threatIntelligenceOpenCase,
  onGetSubDispoisitions,
  onRequestOpenCases,
  threatIntelligenceAsset,
  onGetSubCategories,
  onListAsset,
  threatIntelligenceSubdispositionscategories,
  threatIntelligenceSubcategoriesItems,
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productOptions, setproductOptions] = useState([]);
  const [productVendorOptions, setProductVendorOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [membersOptions, setmembersOptions] = useState([]);
  const [locationOptions, setlocationOptions] = useState([]);
  const [sourceOptions, setsourceOptions] = useState([]);
  const [caseItemOptions, setcaseItemOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [dispositionOptions, setdispositionOptions] = useState([]);
  const [infoVisible, setInfoVisible] = useState(true);

  const [catVisible, setCatVisible] = useState(true);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [evidenceVisible, setEvidenceVisible] = useState(true);
  const [remVisible, setRemVisible] = useState(true);

  const collapseAllField = () => {
    setInfoVisible(false);
    setCatVisible(false);
    setSummaryVisible(false);
    setEvidenceVisible(false);
    setRemVisible(false);
  };
  const [subDispositionOptions, setsubDispositionOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    onGetProducts();
    onGetVendors();
    onGetSeverity();
    onGetDepartments();
    onGetSources();
    onGetCaseAdvisoryLocation();
    onGetCaseAdvisroyUsers();
    onGetEvidence();
    onListAsset();
    onGetCaseItems();
    onGetDisposition();
    onGetCategories();
  }, [])

  const getFilteredOptions = (
    data,
    valueField = false,
    isObj = false,
    key = false
  ) => {
    const options = [];
    if (data && data.length !== 0) {
      if (isObj) {
        filter(data, row => {
          const value = row?.[key];
          const valueFieldName = row?.[valueField];
          options.push({ key: value, value: valueFieldName, label: value });
        });
      } else {
        filter(data, value => {
          options.push({ key: value, value: value, label: value });
        });
      }
    }
    return options;
  };
  const selectedThreatIntelligence = threatIntelligenceDetails?.listData?.data;

  useEffect(() => {
    const listData = threatIntelligenceCategories?.listData?.data?.items;
    const CategoryOptionsInnerArray = getFilteredOptions(listData, "ica_id", true, "ica_name")
    setCategoryOptions(CategoryOptionsInnerArray);
  }, [threatIntelligenceCategories]);

  useEffect(() => {
    const listData = threatIntelligenceDisposition?.listData?.data?.items;
    const CasedispositionsArray = getFilteredOptions(listData, 'ids_id', true, "ids_name");
    setdispositionOptions(CasedispositionsArray)
  }, [threatIntelligenceDisposition]);

  useEffect(() => {
    const listData = threatIntelligenceSubdispositionscategories?.listData?.items;
    const SubDispositionsArray = [];

    map(listData, ld => {
      SubDispositionsArray.push({
        key: ld.dsc_id,
        value: ld.dsc_id,
        label: ld.dsc_name
      })
    })
    setsubDispositionOptions(SubDispositionsArray);
  }, [threatIntelligenceSubdispositionscategories, threatIntelligenceDisposition]);

  useEffect(() => {
    const listData = threatIntelligenceSubcategoriesItems?.listData?.items;
    const SubCategoryArray = [];
    map(listData, ld => {
      SubCategoryArray.push({
        key: ld.msc_id,
        value: ld.msc_id,
        label: ld.msc_name
      })
    });
    setSubCategoryOptions(SubCategoryArray);
  }, [threatIntelligenceSubcategoriesItems, threatIntelligenceCategories]);


  useEffect(() => {
    const listData = threatIntelligenceCaseAdvisoryItems?.listData;
    const caseAdvisoryItems = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        caseAdvisoryItems.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }
    setcaseItemOptions(caseAdvisoryItems)
  }, [threatIntelligenceCaseAdvisoryItems]);

  useEffect(() => {
    const listData = threatIntelligenceCaseAdvisoryUsersList?.listData;
    const Handler = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        Handler.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }
    setmembersOptions(Handler);
  }, [threatIntelligenceCaseAdvisoryUsersList]);

  useEffect(() => {
    const listData = threatIntelligenceCaseAdvisoryLocation?.listData;
    const caseAdvisoryLocation = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        caseAdvisoryLocation.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }

    setlocationOptions(caseAdvisoryLocation);
  }, [threatIntelligenceCaseAdvisoryLocation]);

  useEffect(() => {
    const listData = threatIntelligenceAsset?.listData;
    const avd_asset_Array = [];

    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        avd_asset_Array.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }
    setAssetOptions(avd_asset_Array);
  }, [threatIntelligenceAsset]);

  useEffect(() => {
    const listData = threatIntelligenceSource?.listData;
    const caseAdvisorySources = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        caseAdvisorySources.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }
    setsourceOptions(caseAdvisorySources);
  }, [threatIntelligenceSource]);

  useEffect(() => {
    const listData = threatIntelligenceDepartments?.listData;
    const adv_department = [];

    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        adv_department.push({
          key,
          value: parseInt(key, 10),
          label: value
        })

      }
    }
    setDepartmentOptions(adv_department);
  }, [threatIntelligenceDepartments]);

  useEffect(() => {
    const listData = threatIntelligenceProduct?.listData;
    const ProductList = getFilteredOptions(listData);
    setproductOptions(ProductList);
  }, [threatIntelligenceProduct]);

  useEffect(() => {
    const listData = threatIntelligenceVendors?.listData;
    const vendorsList = getFilteredOptions(listData);
    setProductVendorOptions(vendorsList);
  }, [threatIntelligenceVendors]);


  const refectorDepartmentList = (deparmentValue) => {
    return deparmentValue ? String(deparmentValue).split(',').map((item) => Number(item)) : []
  }
  const artifactInitData = {};
  if (
    selectedThreatIntelligence &&
    Object.keys(selectedThreatIntelligence).length > 0
  ) {
    map(selectedThreatIntelligence?.advArtifactMapping, artifactData => {
      artifactInitData[`Artifact_${artifactData?.am_name.replaceAll(' ', '_')}`] =
        artifactData?.am_value;
    });
  }

  const validationSchema = Yup.object({
    iti_subject: Yup.string().required('Required'),
    iti_priority: Yup.string().required('Required'),
    iti_category_id: Yup.number().required('Required'),
    iti_disposition_id: Yup.string().required('Required'),
    iti_location_id: Yup.number().required('Required'),
    iti_description: Yup.string().required('Required'),
    iti_attack_severity: Yup.string().required('Required'),
  });
  const initialValues = {
    iti_subject: selectedThreatIntelligence?.adv_title,
    iti_priority: "",
    iti_ticket_status: "Open",
    iti_description: selectedThreatIntelligence?.adv_description || "",
    iti_due_date: moment().format() || moment(),
    adv_affected_products: selectedThreatIntelligence?.adv_affected_products?.trim()?.length > 0 ? String(selectedThreatIntelligence?.adv_affected_products).split(',') : [] || [],
    adv_affected_vendors: selectedThreatIntelligence?.adv_affected_vendors?.trim()?.length > 0 ? String(selectedThreatIntelligence?.adv_affected_vendors).split(',') : [] || [],
    iti_handler_id: [],
    adv_department: refectorDepartmentList(selectedThreatIntelligence?.adv_department),
    iti_category_id: "",
    iti_sub_Category: [],
    art_oraganization: "",
    iti_disposition_id: selectedThreatIntelligence?.adv_disposition_id || "",
    adv_affected_asset: selectedThreatIntelligence?.adv_asset || [],
    iti_disposition_sub_category_id: [],
    iti_detect_date: moment(selectedThreatIntelligence?.adv_received_date ? selectedThreatIntelligence?.adv_received_date : moment()).format(dateFormat),
    iti_artifacts: threatIntelligenceEvidence?.listData
      ? _.filter(threatIntelligenceEvidence?.listData, (evidence) => {
        return selectedThreatIntelligence?.adv_ioc?.split(',')
          .includes(evidence.replaceAll(' ', '_'));
      })
        .map(e => e)
      : [],
    iti_escalation_date: moment(selectedThreatIntelligence?.adv_release_date ? selectedThreatIntelligence?.adv_release_date : moment()).format(dateFormat),
    iti_attack_severity: selectedThreatIntelligence?.adv_severity || '',
    iti_analysis_summary: selectedThreatIntelligence?.adv_analysis_summary || "",
    iti_suggestions_recovery: selectedThreatIntelligence?.adv_suggestions_recovery || "",
    iti_closed_remediation: "",
    iti_location_id: "",
    iti_source: selectedThreatIntelligence?.adv_source || "",
    iti_cases: [],
    iti_owner: "",
    ...artifactInitData
  };
  return (
    <div>
      <Formik id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(">>>>values", values)
          var FormData = require('form-data');
          var data = new FormData();
          data.append('iti_subject', values.iti_subject);
          data.append('iti_priority', values.iti_priority);
          data.append('iti_ticket_status', values.iti_ticket_status);
          data.append('iti_description', values.iti_description);
          data.append('iti_due_date', moment(values.iti_due_date).format(dateFormat));
          data.append('adv_affected_vendors', (values.adv_affected_vendors).toString());
          data.append('adv_affected_products', (values.adv_affected_products).toString());
          data.append('adv_department', values.adv_department)
          data.append('iti_category_id', values.iti_category_id)
          data.append('iti_sub_Category', values.iti_sub_Category)
          data.append('iti_disposition_id', values.iti_disposition_id)
          data.append('adv_affected_asset', values.adv_affected_asset)
          data.append('iti_disposition_sub_category_id', (values.iti_disposition_sub_category_id))
          data.append('iti_detect_date', moment(values.iti_detect_date).format(dateFormat));
          data.append('iti_escalation_date', moment(values.iti_escalation_date).format(dateFormat));
          data.append('iti_attack_severity', values.iti_attack_severity);
          data.append('iti_location_id', values.iti_location_id);
          data.append('iti_analysis_summary', values.iti_analysis_summary);
          data.append('iti_closed_remediation', values.iti_closed_remediation)
          data.append('iti_source', values.iti_source)
          data.append('iti_cases', values.iti_cases)
          data.append('iti_owner', values.iti_owner)
          data.append('art_oraganization', values.art_oraganization)

          if (values.adv_department) {
            const advDepartment = String(values.adv_department).split(',') || [];
            map(advDepartment, (dept, deptKey) => {
              data.append(`adv_department[${deptKey}]`, dept);
            });
          }
          if (values.iti_handler_id) {
            const handlerId = String(values.iti_handler_id).split(',') || [];
            map(handlerId, (dept, deptKey) => {
              data.append(`iti_handler_id[${deptKey}]`, dept);
            });
          }

          if (values.iti_artifacts) {
            const artifact = String(values.iti_artifacts).split(',') || [];
            map(artifact, (ioc, iocKey) => {
              data.append(`iti_artifacts[${iocKey}]`, ioc);
              if (ioc === 'File') {
                const fileData = values?.upload_artifact_File || values?.Artifact_File
                data.append(`upload_artifact_File`, fileData);
              }
              if (ioc === 'Header') {
                const headerFileData =
                  values?.upload_artifact_Header || values?.Artifact_Header;
                data.append(`upload_artifact_Header`, headerFileData);
              }
            });
            map(values, (value, valueKey) => {
              if (
                valueKey.includes('Artifact_')
              ) {
                data.append(valueKey, value);
              }
            });

          }
          onRequestOpenCases(selectedThreatIntelligence?.adv_id, data);
          onOpenCaseDrawerClose();
          resetForm();
        }}>
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
            resetForm();
          }, [isVisible]);
          const evidenceFields = values?.iti_artifacts;
          return (
            <Form onSubmit={handleSubmit}>
              <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title="Collapse all fields"
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
                title="Information">
                <InputBox
                  id="iti_subject"
                  label="Subject"
                  name="iti_subject"
                  placeholder="Subject"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_subject}
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
                  options={priorityOptions}
                  width={350}
                />
                <SelectBox
                  id="iti_ticket_status"
                  label="Status"
                  name="iti_ticket_status"
                  placeholder="Priority"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_ticket_status}
                  value={values.iti_ticket_status}
                  touched={touched.iti_ticket_status}
                  options={statusOptions}
                  width={350}
                />
                <FieldEditor lable="Description" name="iti_description" errors={errors.iti_description} touched={touched.iti_description} />
                <SPDatepicker
                  id="iti_due_date"
                  label="Due Date"
                  name="iti_due_date"
                  width={180}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  value={moment(values.iti_due_date)}
                  errorMessage={errors.iti_due_date}
                  noBorderValidation
                  disabled={isSubmitting}
                  touched={touched.iti_due_date}
                />
                <SelectBox
                  id="iti_cases"
                  name="iti_cases"
                  label="Case item(s)"
                  mode="multiple"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_cases}
                  value={values.iti_cases}
                  touched={touched.iti_cases}
                  setHightAuto
                  options={caseItemOptions}
                  width={350}
                />
                <SelectBox
                  id="adv_affected_products"
                  label="Affected Product"
                  name="adv_affected_products"
                  mode="multiple"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_affected_products}
                  value={values.adv_affected_products}
                  touched={touched.adv_affected_products}
                  width={350}
                  setHightAuto
                  options={productOptions}
                />
                <SelectBox
                  id="adv_affected_vendors"
                  label="Affected Vendors"
                  name="adv_affected_vendors"
                  mode="multiple"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_affected_vendors}
                  value={values.adv_affected_vendors}
                  touched={touched.adv_affected_vendors}
                  width={350}
                  setHightAuto
                  options={productVendorOptions}
                />
              </FormHeader>
              <FormHeader
                number={2}
                visible={catVisible}
                onOpen={() => setCatVisible(true)}
                onClose={() => setCatVisible(false)}
                title="Categorization">

                <InputBox
                  id="art_oraganization"
                  label="Oraganization"
                  name="art_oraganization"
                  // placeholder="O"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.art_oraganization}
                  value={values.art_oraganization}
                  touched={touched.art_oraganization}
                  width={320}
                />

                <SelectBox
                  id="iti_handler_id"
                  label="Members"
                  name="iti_handler_id"
                  mode="multiple"
                  onInputChange={setFieldValue}
                  width={600}
                  errorMessage={errors.iti_handler_id}
                  value={values.iti_handler_id}
                  options={membersOptions}
                  touched={touched.iti_handler_id}
                  onBlur={handleBlur}
                />
                <SelectBox
                  id="iti_category_id"
                  label="Category"
                  name="iti_category_id"
                  placeholder="Category"
                  onInputChange={(name, value) => {
                    setFieldValue(name, value)
                    onGetSubCategories(value);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_category_id}
                  value={values.iti_category_id}
                  touched={touched.iti_category_id}
                  options={categoryOptions}
                  width={350}
                />
                <SelectBox
                  id="iti_sub_Category"
                  label="Sub Category"
                  name="iti_sub_Category"
                  width={350}
                  value={values.iti_sub_Category}
                  touched={touched.iti_sub_Category}
                  errorMessage={errors.iti_sub_Category}
                  onInputChange={setFieldValue}
                  options={subCategoryOptions}
                  onBlur={handleBlur}
                />
                <SelectBox
                  id="iti_disposition_id"
                  label="Disposition"
                  name="iti_disposition_id"
                  width={350}
                  onInputChange={(name, value) => {
                    setFieldValue(name, value);
                    onGetSubDispoisitions(value);
                  }}
                  value={values.iti_disposition_id}
                  touched={touched.iti_disposition_id}
                  errorMessage={errors.iti_disposition_id}
                  onBlur={handleBlur}
                  options={dispositionOptions}
                />
                <SelectBox
                  id="iti_disposition_sub_category_id"
                  label="Disposition Sub Category"
                  name="iti_disposition_sub_category_id"
                  width={350}
                  value={values.iti_disposition_sub_category_id}
                  touched={touched.iti_disposition_sub_category_id}
                  errorMessage={errors.iti_disposition_sub_category_id}
                  onInputChange={setFieldValue}
                  options={subDispositionOptions}
                  onBlur={handleBlur}
                />
                <SelectBox
                  label="Location"
                  id="iti_location_id"
                  name="iti_location_id"
                  width={350}
                  value={values.iti_location_id}
                  touched={touched.iti_location_id}
                  errorMessage={errors.iti_location_id}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  options={locationOptions}
                />
                <SelectBox
                  id="adv_department"
                  label="Department"
                  mode="multiple"
                  name="adv_department"
                  placeholder="Department"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_department}
                  value={values.adv_department}
                  touched={touched.adv_department}
                  options={departmentOptions}
                  width={350}
                />
                <SelectBox
                  id="iti_source"
                  label="Source"
                  name="iti_source"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_source}
                  value={values.iti_source}
                  touched={touched.iti_source}
                  options={sourceOptions}
                  width={350}
                />
              </FormHeader>
              <FormHeader
                number={3}
                visible={summaryVisible}
                onOpen={() => setSummaryVisible(true)}
                onClose={() => setSummaryVisible(false)}
                title="Analysis Summary"
              >
                <FieldEditor lable="Analysis Summary" name="iti_analysis_summary" errors={errors.iti_analysis_summary} touched={touched.iti_analysis_summary} />
                <InputBox
                  id="iti_owner"
                  label="Owner / Custodian"
                  name="iti_owner"
                  placeholder="Owner / Custodian"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_owner}
                  value={values.iti_owner}
                  touched={touched.iti_owner}
                  width={320}
                />
                <Row gutter={11} justify="start">
                  <Col>
                    <SPDatepicker
                      label="Detection Date"
                      width={170}
                      id="iti_detect_date"
                      name="iti_detect_date"
                      placeholder="Detection Date"
                      value={moment(values.iti_detect_date)}
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <SPDatepicker
                      name="iti_escalation_date"
                      id='iti_escalation_date'
                      label="Escalation Date"
                      placeholder="Escalation Date"
                      width={170}
                      value={moment(values.iti_escalation_date)}
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                    />
                  </Col>
                </Row>
                <SelectBox
                  id="iti_attack_severity"
                  label="Severity"
                  name="iti_attack_severity"
                  placeholder="Severity"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  width={150}
                  errorMessage={errors.iti_attack_severity}
                  value={values.iti_attack_severity}
                  touched={touched.iti_attack_severity}
                  options={severityOptions}
                />
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
                  label="Indicator of Compromise (IOC)"
                  name="iti_artifacts"
                  placeholder="Evidence"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.iti_artifacts}
                  value={values.iti_artifacts}
                  touched={touched.iti_artifacts}
                  width={350}
                  setHightAuto
                  options={
                    _.isObject(threatIntelligenceEvidence?.listData)
                      ? Object.keys(threatIntelligenceEvidence?.listData).map(
                        artifact => {
                          return {
                            label:
                              threatIntelligenceEvidence?.listData?.[artifact],
                            value: artifact,
                            key: artifact,
                          };
                        }
                      )
                      : []
                  }
                />
                {_.isArray(evidenceFields) &&
                  evidenceFields.map(evidenceField => {
                    if (
                      (_.isString(evidenceField) && evidenceField === 'File') ||
                      (_.isObject(evidenceField) && evidenceField?.key === 'File')
                    ) {
                      return (
                        <>
                          <SPUpload
                            key={evidenceField}
                            id="upload_artifact_File"
                            label="File"
                            name="upload_artifact_File"
                            onInputChange={(name, file) => {
                              setFieldValue(name, file);
                            }}
                            onBlur={handleBlur}
                            value={values.upload_artifact_File}
                            disabled={isSubmitting}
                            width={170}
                          />
                          {values?.[`Artifact_${evidenceField}`] && (
                            <a href={values?.[`Artifact_${evidenceField}`]}>
                              {values?.[`Artifact_${evidenceField}`]}
                            </a>
                          )}
                        </>
                      );
                    }
                    if (
                      (_.isString(evidenceField) && evidenceField === 'Header') ||
                      (_.isObject(evidenceField) &&
                        evidenceField?.key === 'Header')
                    ) {
                      return (
                        <>
                          <SPUpload
                            id="upload_artifact_Header"
                            label="Header"
                            name="upload_artifact_Header"
                            onInputChange={(name, file) => {
                              setFieldValue(name, file);
                            }}
                            onBlur={handleBlur}
                            value={values.upload_artifact_Header}
                            disabled={isSubmitting}
                            width={170}
                          />
                          {values?.[`Artifact_${evidenceField}`] && (
                            <a href={values?.[`Artifact_${evidenceField}`]}>
                              {values?.[`Artifact_${evidenceField}`]}
                            </a>
                          )}
                        </>
                      );
                    }

                    return (
                      <TextAreaBox
                        height={30}
                        id={
                          _.isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.aio_id
                        }
                        label={
                          _.isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                        }
                        name={`Artifact_${_.isString(evidenceField)
                          ? evidenceField
                          : evidenceField?.key
                          }`}
                        placeholder={
                          _.isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                        }
                        onInputChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={
                          errors?.[
                          `Artifact_${_.isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`
                          ]
                        }
                        value={
                          values?.[
                          `Artifact_${_.isString(evidenceField)
                            ? evidenceField.replaceAll(' ', '_')
                            : evidenceField?.key.replaceAll(' ', '_')
                          }`
                          ]
                        }
                        touched={
                          touched?.[
                          `Artifact_${_.isString(evidenceField)
                            ? evidenceField
                            : evidenceField?.key
                          }`
                          ]
                        }
                      />
                    );
                  })}'

              </FormHeader>
              <FormHeader
                number={5}
                visible={remVisible}
                onOpen={() => setRemVisible(true)}
                onClose={() => setRemVisible(false)}
                title="Remediation"
              >
                <SelectBox
                  id="adv_affected_asset"
                  label="Affected Assets"
                  name="adv_affected_asset"
                  mode="multiple"
                  placeholder="Affected Assets"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_affected_asset}
                  value={values.adv_affected_asset}
                  touched={touched.adv_affected_asset}
                  options={assetOptions}
                  width={350}
                  setHightAuto
                />

                <FieldEditor lable="Remediation Details" name="iti_suggestions_recovery" errors={errors.iti_suggestions_recovery} touched={touched.iti_suggestions_recovery} />
                <FieldEditor lable="Implemented Remediation" name="iti_closed_remediation" errors={errors.iti_closed_remediation} touched={touched.iti_closed_remediation} />

              </FormHeader>
              <Row gutter={11} justify="end" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton title="Cancel" size="small" type="secondary" onButtonClick={() => {
                    onOpenCaseDrawerClose();
                    resetForm();
                  }} />
                </Col>
                <Col>
                  <SPButton
                    title="Create"
                    type="submit"
                    onButtonClick={handleSubmit}
                    size="small"
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div >
  );
};

const mapStateToProps = state => ({
  threatIntelligenceCategories: state.categoriesStore,
  threatIntelligenceDetails: state.threatIntelligenceDetails,
  threatIntelligenceSeverity: state.threatIntelligenceSeverity,
  threatIntelligenceDepartments: state.threatIntelligenceDepartments,
  threatIntelligenceProduct: state.threatIntelligenceProducts,
  threatIntelligenceVendors: state.threatIntelligenceVendors,
  threatIntelligenceAsset: state.threatIntelligenceAsset,
  threatIntelligenceDisposition: state.dispositionsStore,
  threatIntelligenceCaseAdvisoryUsersList: state.threatIntelligenceCaseAdvisoryUsersList,
  threatIntelligenceCaseAdvisoryLocation: state.threatIntelligenceCaseAdvisoryLocation,
  threatIntelligenceSource: state.threatIntelligenceSource,
  threatIntelligenceCaseAdvisoryItems: state.threatIntelligenceCaseAdvisoryItems,
  threatIntelligenceEvidence: state.threatIntelligenceEvidence,
  threatIntelligenceSubdispositionscategories: state.threatIntelligenceSubdispositionscategories,
  threatIntelligenceSubcategoriesItems: state.threatIntelligenceSubcategoriesItems
});

const mapDispatchToProps = dispatch => ({
  onGetCategories: () => dispatch(getCategory()),
  onGetSeverity: () => dispatch(getSeverity()),
  onGetDepartments: () => dispatch(getDepartments()),
  onListAsset: () => dispatch(listAsset()),
  onGetProducts: () => dispatch(getProducts()),
  onGetVendors: () => dispatch(getAdvisoryVendors()),
  onGetSources: () => dispatch(getSources()),
  onGetEvidence: () => dispatch(getEvidence()),
  onGetDisposition: () => dispatch(listDispositions()),
  onGetCaseItems: () => dispatch(getCasesAdvisoryItem()),
  onGetCaseAdvisoryLocation: () => dispatch(getcaseAdvisoryLocation()),
  onGetSubCategories: (...args) => dispatch(getSubCategories(...args)),
  onGetSubDispoisitions: (...args) => dispatch(getDisPositionsCategories(...args)),
  onGetCaseAdvisroyUsers: () => dispatch(getCaseAdvisroyUsers()),
  onRequestOpenCases: (...args) => dispatch(openCasesRequest(...args))
});


export default connect(mapStateToProps, mapDispatchToProps)(OpenCase);