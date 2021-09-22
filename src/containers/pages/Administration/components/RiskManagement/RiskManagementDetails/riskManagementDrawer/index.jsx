import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import _, { filter } from 'lodash';
import moment from "moment"
import SPButton from '../../../../../../../components/SPButton';
import InputBox from '../../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../../components/TextAreaBox';
import SPDatepicker from '../../../../../../../components/SPDatepicker';
import SelectBox from '../../../../../../../components/SelectBox';
import FieldEditor from '../../../../../../../components/FieldEditor';


import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';

import {
  getCategories,
  getSeverity,
  listAsset,
  getDepartments,
  getEvidence,
  getDisposition,
  getProducts,
  getAdvisoryVendors,
  updateAdvisory
} from '../../../../../../../actions/threatIntelligence';
import { listAssets, listAssetTypes } from '../../../../../../../actions/assets';
import SPAddItemDropdown from '../../../../../../../components/SPAddItemDropdown';

import {
  // LabelDiv,
  // Label,
  AddDiv,
  AssetDiv,
  VulnerabilityDiv
} from './StyledComponents';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const EditTicket = ({
  type,
  createAdvesory,
  selectedThreatIntelligence,
  updateUserTicket,
  onCloseDrawer,
  onGetCategories,
  threatIntelligenceCategories,
  onGetSeverity,
  threatIntelligenceSeverity,
  onListAssetTypes,
  assetTypeStore,
  onListAsset,
  threatIntelligenceAsset,
  onGetDepartments,
  threatIntelligenceDepartments,
  onGetEvidence,
  threatIntelligenceEvidence,
  onGetDisposition,
  threatIntelligenceDisposition,
  onGetProducts,
  threatIntelligenceProduct,
  onGetVendors,
  threatIntelligenceVendors,
  onCancel,
  selectedSubTab,
}) => {

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [severityOptions, setSeverityOptions] = useState([]);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [evidenceOptions, setevidenceOptions] = useState([]);
  const [dispositionOptions, setdispositionOptions] = useState([]);
  const [productOptions, setproductOptions] = useState([]);
  const [productVendorOptions, setProductVendorOptions] = useState([]);
  const [evidenceSelectedValues, setEvidenceSelectedValues] = useState([]);
  const [assetShow, setAssetShow] = useState(false);

  useEffect(() => {
    onGetCategories();
    onGetSeverity();
    onListAssetTypes();
    onListAsset();
    onGetDepartments();
    onGetEvidence();
    onGetDisposition();
    onGetProducts();
    onGetVendors();
  }, []);

  const getFilteredOptions = (
    data,
    valueField = false,
    isObj = false,
    key = false
  ) => {
    const options = [];
    if (data && data.length !== 0) {
      if (isObj) {
        _.filter(data, row => {
          const value = row?.[key];
          const valueFieldName = row?.[valueField];
          options.push({ key: value, value: valueFieldName, label: value });
        });
      } else {
        _.filter(data, value => {
          options.push({ key: value, value: value, label: value });
        });
      }
    }
    return options;
  };
  useEffect(() => {
    const listData = threatIntelligenceCategories?.listData;
    const CategoryOptionsInnerArray = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        CategoryOptionsInnerArray.push({
          key,
          value: parseInt(key, 10),
          label: value
        })
      }
    }
    setCategoryOptions(CategoryOptionsInnerArray);
  }, [threatIntelligenceCategories]);

  useEffect(() => {
    const listData = threatIntelligenceSeverity?.listData;
    const severityOptions = getFilteredOptions(listData);
    setSeverityOptions(severityOptions);
  }, [threatIntelligenceSeverity]);

  useEffect(() => {
    const listData = assetTypeStore?.listData?.data?.items;
    const assetTypeOptions = getFilteredOptions(
      listData,
      'aty_id',
      true,
      'aty_name'
    );
    setAssetTypeOptions(assetTypeOptions);
  }, [assetTypeStore]);

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
    const listData = threatIntelligenceDepartments?.listData;
    const DepartmentList = getFilteredOptions(listData);
    setDepartmentOptions(DepartmentList);
  }, [threatIntelligenceDepartments]);

  useEffect(() => {
    const listData = threatIntelligenceEvidence?.listData?.items;
    const EvidenceList = getFilteredOptions(
      listData,
      'aio_id',
      true,
      'aio_type'
    );
    setevidenceOptions(EvidenceList);
  }, [threatIntelligenceEvidence]);

  useEffect(() => {
    const listData = threatIntelligenceDisposition?.listData?.items;
    const DispositionList = getFilteredOptions(
      listData,
      'add_id',
      true,
      'add_name'
    );
    setdispositionOptions(DispositionList);
  }, [threatIntelligenceDisposition]);

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

  const validationSchema = Yup.object({
    // adv_title: Yup.string().required('Required'),
    // adv_category_id: Yup.number().required('Required'),
    // adv_severity: Yup.string().required('Required'),
    // // adv_asset_type: Yup.string().required('Required'),
    // // adv_department: Yup.string().required('Required'),
    // // adv_type: Yup.string().required('Required'),
    // adv_status: Yup.string().required('Required'),
    // adv_analysis_summary: Yup.string().required('Required'),
    // // adv_description: Yup.string().required('Required'),
    // // adv_ioc: Yup.array().required('Required'),
    // adv_affected_vendors: Yup.array().required('Required'),
    // adv_affected_products: Yup.array().required('Required'),
    // adv_impact: Yup.string().required('Required'),
    // adv_suggestions_recovery: Yup.string().required('Required'),
    // // adv_asset_or_type:Yup.string().required('Required')
  });

  let initialValues = {
    adv_title: selectedThreatIntelligence?.adv_title || '',
    adv_received_date: moment(selectedThreatIntelligence?.adv_received_date).format(dateFormat) || '',
    adv_released_date: moment(selectedThreatIntelligence?.adv_released_date).format(dateFormat) || '',
    adv_category_id: type === "edit" ? selectedThreatIntelligence?.adv_category_id || 0 : selectedThreatIntelligence?.adv_category_id || "",
    adv_severity: selectedThreatIntelligence?.adv_severity || '',
    adv_asset_type:
      selectedThreatIntelligence?.adv_closed_remediationv_asset_type || '',
    adv_asset: selectedThreatIntelligence?.adv_asset || '',
    adv_department: selectedThreatIntelligence?.adv_department || "",
    adv_type: selectedThreatIntelligence?.adv_type || "",
    adv_status: selectedThreatIntelligence?.adv_status || '',
    adv_analysis_summary:
      selectedThreatIntelligence?.adv_analysis_summary || '',
    adv_description: selectedThreatIntelligence?.adv_description || '',
    adv_ioc:
      selectedThreatIntelligence?.adv_ioc?.trim()?.length > 0 ? String(selectedThreatIntelligence?.adv_ioc).split(',') : [] || [],
    adv_affected_vendors:
      type === "edit" ?
        selectedThreatIntelligence?.adv_affected_vendors?.trim()?.length > 0 ? String(selectedThreatIntelligence?.adv_affected_vendors).split(',') : []
        : selectedThreatIntelligence?.adv_affected_vendors || [],
    adv_affected_products:
      type === "edit" ?
        selectedThreatIntelligence?.adv_affected_products?.trim()?.length > 0 ? String(selectedThreatIntelligence?.adv_affected_products).split(',') : []
        : selectedThreatIntelligence?.adv_affected_products || [],
    adv_impact: selectedThreatIntelligence?.adv_impact || '',
    adv_suggestions_recovery: selectedThreatIntelligence?.adv_suggestions_recovery || '',
    adv_asset_or_type: "Asset Type"
  };
  const AssetOptions = [
    { key: 1, value: "Asset", label: 'Asset' },
    { key: 2, value: "Asset Type", label: 'Asset Type' },
  ];
  const statusOptions = [
    { key: 'Pending', value: 'Pending', label: 'Pending' },
    { key: 'Release', value: 'Release', label: 'Release' },
  ];
  const onChangeEvidence = value => {
    const listData = threatIntelligenceEvidence?.listData?.items;
    console.log("checkthisout", { listData })
    const selectetEvi = _.filter(listData, data => {
      if (value.includes(data.aio_id)) {
        return data;
      }
    });

    setEvidenceSelectedValues(selectetEvi);
  };

  const showForm = () => {
    if (selectedSubTab === 'Technical vulnerabilities'){
      return (<Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (values.adv_received_date) {
            values = { ...values, adv_received_date: moment(values.adv_received_date).format(dateFormat) };
          }
          if (values.adv_release_date) {
            values = { ...values, adv_release_date: moment(values.adv_release_date).format(dateFormat) };
          }
          if (values.adv_affected_products) {
            values = { ...values, adv_affected_products: (values.adv_affected_products).toString() };
          }
          if (values.adv_affected_vendors) {
            values = { ...values, adv_affected_vendors: (values.adv_affected_vendors).toString() };
          }
          if (type === "edit") {
            updateUserTicket(selectedThreatIntelligence?.adv_id, values);
          } else {
            createAdvesory(values);
          }
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
        }) => {
          useEffect(() => {
            resetForm();
          }, [type]);

          return (
            <Form onSubmit={handleSubmit}>
              <InputBox
                id="adv_title"
                label="Name"
                name="adv_title"
                placeholder="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_title}
                value={values.adv_title}
                touched={touched.adv_title}
              />

              <SelectBox
                id="adv_category_id"
                label="Severity"
                name="adv_category_id"
                placeholder="Severity"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_category_id}
                value={values.adv_category_id}
                touched={touched.adv_category_id}
                options={categoryOptions}
                width={350}
              />

              <FieldEditor lable="Threat" name="adv_analysis_summary" errors={errors.adv_analysis_summary} touched={touched.adv_analysis_summary} />

              <FieldEditor lable="Impact" name="adv_description" errors={errors.adv_description} touched={touched.adv_description} />

              <FieldEditor lable="Solution" name="adv_impact" errors={errors.adv_impact} touched={touched.adv_impact} />

            </Form>
          );
        }}
      </Formik>);
    } else if (selectedSubTab === 'Non-technical vulnerabilities') {
      return (<Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (values.adv_received_date) {
            values = { ...values, adv_received_date: moment(values.adv_received_date).format(dateFormat) };
          }
          if (values.adv_release_date) {
            values = { ...values, adv_release_date: moment(values.adv_release_date).format(dateFormat) };
          }
          if (values.adv_affected_products) {
            values = { ...values, adv_affected_products: (values.adv_affected_products).toString() };
          }
          if (values.adv_affected_vendors) {
            values = { ...values, adv_affected_vendors: (values.adv_affected_vendors).toString() };
          }
          if (type === "edit") {
            updateUserTicket(selectedThreatIntelligence?.adv_id, values);
          } else {
            createAdvesory(values);
          }
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
        }) => {
          useEffect(() => {
            resetForm();
          }, [type]);

          return (
            <Form onSubmit={handleSubmit}>
              <InputBox
                id="adv_title"
                label="Name"
                name="adv_title"
                placeholder="This random vulnerbility name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_title}
                value={values.adv_title}
                touched={touched.adv_title}
              />

              <SelectBox
                id="adv_category_id"
                label="Severity"
                name="adv_category_id"
                placeholder="Severity"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_category_id}
                value={values.adv_category_id}
                touched={touched.adv_category_id}
                options={categoryOptions}
                width={350}
              />

              <FieldEditor lable="Description" name="adv_analysis_summary" errors={errors.adv_analysis_summary} touched={touched.adv_analysis_summary} />

            </Form>
          );
        }}
      </Formik>);
    } else if (selectedSubTab === 'Non-technical Severity') {
      return (<Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (values.adv_received_date) {
            values = { ...values, adv_received_date: moment(values.adv_received_date).format(dateFormat) };
          }
          if (values.adv_release_date) {
            values = { ...values, adv_release_date: moment(values.adv_release_date).format(dateFormat) };
          }
          if (values.adv_affected_products) {
            values = { ...values, adv_affected_products: (values.adv_affected_products).toString() };
          }
          if (values.adv_affected_vendors) {
            values = { ...values, adv_affected_vendors: (values.adv_affected_vendors).toString() };
          }
          if (type === "edit") {
            updateUserTicket(selectedThreatIntelligence?.adv_id, values);
          } else {
            createAdvesory(values);
          }
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
        }) => {
          useEffect(() => {
            resetForm();
          }, [type]);

          return (
            <Form onSubmit={handleSubmit}>
              <InputBox
                id="adv_title"
                label="Name"
                name="adv_title"
                placeholder="This random vulnerbility name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_title}
                value={values.adv_title}
                touched={touched.adv_title}
              />
              <InputBox
                id="adv_title"
                label="value"
                name="adv_title"
                placeholder="This is new value"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_title}
                value={values.adv_title}
                touched={touched.adv_title}
              />

            </Form>
          );
        }}
      </Formik>);
    }
    return (<></>);
  }

  return (
    <div>
      {showForm()}
  
      <Row gutter={11} justify="end" style={{ marginTop: 120 }}>
        <Col>
          <SPButton
            title="Cancel"
            size="small"
            type="secondary"
            onButtonClick={onCancel}
          />
        </Col>
        <Col>
          <SPButton
            title="Save"
            size="small"
          // disabled={isEmpty(fileData)}
          // onButtonClick={() => {
          //   console.log(fileData);
          // }}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  threatIntelligenceCategories: state.threatIntelligenceCategories,
  threatIntelligenceSeverity: state.threatIntelligenceSeverity,
  assetTypeStore: state.assetTypeStore,
  threatIntelligenceAsset: state.threatIntelligenceAsset,
  threatIntelligenceDepartments: state.threatIntelligenceDepartments,
  threatIntelligenceEvidence: state.threatIntelligenceEvidence,
  threatIntelligenceDisposition: state.threatIntelligenceDisposition,
  threatIntelligenceProduct: state.threatIntelligenceProducts,
  threatIntelligenceVendors: state.threatIntelligenceVendors,
});

const mapDispatchToProps = dispatch => ({
  onGetCategories: () => dispatch(getCategories()),
  onGetSeverity: () => dispatch(getSeverity()),
  onListAssetTypes: () => dispatch(listAssetTypes()),
  onListAsset: () => dispatch(listAsset()),
  onGetDepartments: () => dispatch(getDepartments()),
  onGetEvidence: () => dispatch(getEvidence()),
  onGetDisposition: () => dispatch(getDisposition()),
  onGetProducts: () => dispatch(getProducts()),
  onGetVendors: () => dispatch(getAdvisoryVendors()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(EditTicket);

EditTicket.prototype = {
  type: PropTypes.string,
  selectedThreatIntelligence: PropTypes.object,
  updateUserTicket: PropTypes.func
}
