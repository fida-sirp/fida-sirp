import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import _, { filter, values, map } from 'lodash';
import moment from 'moment';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SPDatepicker from '../../../../../components/SPDatepicker';
import SelectBox from '../../../../../components/SelectBox';
import FieldEditor from '../../../../../components/FieldEditor';

import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import {
  getCategories,
  getSeverity,
  listAsset,
  getDepartments,
  getEvidence,
  getDisposition,
  getProducts,
  getAdvisoryVendors,
  getSources,
} from '../../../../../actions/threatIntelligence';
import { listAssets, listAssetTypes } from '../../../../../actions/assets';
import SPUpload from '../../../../../components/SPUpload';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const severityOptions = [
  { key: 1, value: 'High', label: 'High' },
  { key: 2, value: 'Medium', label: 'Medium' },
  { key: 3, value: 'Low', label: 'Low' },
];

const EditTicket = ({
  isVisible,
  type,
  createThreatIntel,
  selectedThreatIntelligence,
  updateUserTicket,
  onCloseDrawer,
  onGetCategories,
  threatIntelligenceCategories,
  onGetSeverity,
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
  onGetSources,
  threatIntelligenceSource,
  threatIntelligenceVendors,
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [dispositionOptions, setdispositionOptions] = useState([]);
  const [sourceOptions, setsourceOptions] = useState([]);
  const [productOptions, setproductOptions] = useState([]);
  const [productVendorOptions, setProductVendorOptions] = useState([]);
  const [temp, setTemp] = useState();

  useEffect(() => {
    onGetCategories();
    onGetSeverity();
    onListAssetTypes();
    onListAsset();
    onGetDepartments();
    onGetEvidence();
    onGetDisposition();
    onGetProducts();
    onGetSources();
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
          label: value,
        });
      }
    }
    setCategoryOptions(CategoryOptionsInnerArray);
  }, [threatIntelligenceCategories]);

  useEffect(() => {
    const listData = threatIntelligenceSource?.listData;
    const AdvisorySources = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        AdvisorySources.push({
          key,
          value: parseInt(key, 10),
          label: value,
        });
      }
    }
    setsourceOptions(AdvisorySources);
  }, [threatIntelligenceSource]);

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
          label: value,
        });
      }
    }
    setAssetOptions(avd_asset_Array);
  }, [threatIntelligenceAsset]);

  useEffect(() => {
    const listData = threatIntelligenceDepartments?.listData;
    const DepartmentList = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        DepartmentList.push({
          key,
          value: parseInt(key, 10),
          label: value,
        });
      }
    }

    setDepartmentOptions(DepartmentList);
  }, [threatIntelligenceDepartments]);

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

  const refectorDepartmentList = deparmentValue => {
    return deparmentValue
      ? String(deparmentValue)
        .split(',')
        .map(item => Number(item))
      : [];
  };

  const validationSchema = Yup.object({
    adv_title: Yup.string().required('Required'),
    adv_category_id: Yup.number().required('Required'),
    adv_severity: Yup.string().required('Required'),
    adv_status: Yup.string().required('Required'),
    adv_affected_vendors: Yup.array().required('Required'),
    adv_affected_products: Yup.array().required('Required'),
  });

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

  let initialValues = {
    adv_title: selectedThreatIntelligence?.adv_title || '',
    adv_received_date: moment(
      selectedThreatIntelligence?.adv_received_date
        ? selectedThreatIntelligence?.adv_received_date
        : moment()
    ).format(dateFormat),
    adv_release_date: moment(
      selectedThreatIntelligence?.adv_release_date
        ? selectedThreatIntelligence?.adv_release_date
        : moment()
    ).format(dateFormat),
    adv_category_id:
      type === 'edit'
        ? selectedThreatIntelligence?.adv_category_id || ""
        : selectedThreatIntelligence?.adv_category_id,
    adv_source:
      type === 'edit'
        ? selectedThreatIntelligence?.adv_source || ""
        : selectedThreatIntelligence?.adv_source,
    adv_severity: selectedThreatIntelligence?.adv_severity || '',
    adv_asset_type: selectedThreatIntelligence?.adv_asset_type || '',
    adv_asset: selectedThreatIntelligence?.adv_asset || '',
    adv_department:
      type === 'edit'
        ? refectorDepartmentList(selectedThreatIntelligence?.adv_department)
        : [],
    adv_disposition_id: selectedThreatIntelligence?.adv_disposition_id || '',
    adv_sender: selectedThreatIntelligence?.adv_sender || '',
    adv_status: type === 'create' ? "Pending" : selectedThreatIntelligence?.adv_status || '',
    adv_analysis_summary:
      selectedThreatIntelligence?.adv_analysis_summary || '',
    adv_description: selectedThreatIntelligence?.adv_description || '',

    adv_ioc: threatIntelligenceEvidence?.listData
      ? _.filter(threatIntelligenceEvidence?.listData, evidence => {
        return selectedThreatIntelligence?.adv_ioc
          ?.split(',')
          .includes(evidence.replaceAll(' ', '_'));
      }).map(e => e)
      : [],
    adv_affected_vendors:
      type === 'edit'
        ? selectedThreatIntelligence?.adv_affected_vendors?.trim()?.length > 0
          ? String(selectedThreatIntelligence?.adv_affected_vendors).split(',')
          : []
        : selectedThreatIntelligence?.adv_affected_vendors || [],
    adv_affected_products:
      type === 'edit'
        ? selectedThreatIntelligence?.adv_affected_products?.trim()?.length > 0
          ? String(selectedThreatIntelligence?.adv_affected_products).split(',')
          : []
        : selectedThreatIntelligence?.adv_affected_products || [],
    adv_impact: selectedThreatIntelligence?.adv_impact || '',
    adv_suggestions_recovery:
      selectedThreatIntelligence?.adv_suggestions_recovery || '',
    adv_asset_or_type:
      selectedThreatIntelligence?.adv_asset_or_type || 'Asset Type',
    ...artifactInitData,
  };

  const AssetOptions = [
    { key: 1, value: 'Asset', label: 'Asset' },
    { key: 2, value: 'Asset Type', label: 'Asset Type' },
  ];
  const statusOptions = [
    { key: 'Pending', value: 'Pending', label: 'Pending' },
    { key: 'Release', value: 'Release', label: 'Release' },
  ];

  return (
    <div>
      <Formik
        id="formik"
        enableReinitialize={type === 'edit'}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          var FormData = require('form-data');
          var data = new FormData();
          data.append('adv_title', values.adv_title);
          data.append(
            'adv_received_date',
            moment(values.adv_received_date).format(dateFormat)
          );
          data.append(
            'adv_release_date',
            moment(values.adv_release_date).format(dateFormat)
          );
          data.append('adv_source', values.adv_source);
          data.append('adv_sender', values.adv_sender);
          data.append('adv_severity', values.adv_severity);
          data.append('adv_category_id', values.adv_category_id);
          data.append('adv_asset_or_type', values.adv_asset_or_type);
          data.append('adv_asset', values.adv_asset);
          data.append('adv_asset_type', values.adv_asset_type);
          data.append('adv_disposition_id', values.adv_disposition_id);
          data.append('adv_status', values.adv_status);
          data.append('adv_analysis_summary', values.adv_analysis_summary);
          data.append('adv_description', values.adv_description);
          data.append(
            'adv_affected_vendors',
            values.adv_affected_products.toString()
          );
          data.append(
            'adv_affected_products',
            values.adv_affected_vendors.toString()
          );
          data.append('adv_impact', values.adv_impact);
          data.append(
            'adv_suggestions_recovery',
            values.adv_suggestions_recovery
          );

          if (values.adv_department) {
            const advDepartment =
              String(values.adv_department).split(',') || [];
            map(advDepartment, (dept, deptKey) => {
              data.append(`adv_department[${deptKey}]`, dept);
            });
          }

          if (values.adv_ioc) {
            const advIoc = String(values.adv_ioc).split(',') || [];
            map(advIoc, (ioc, iocKey) => {
              data.append(`adv_ioc[${iocKey}]`, ioc);
              if (ioc === 'File') {
                const fileData =
                  values?.upload_artifact_File || values?.Artifact_File;
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

          if (type === 'edit') {
            updateUserTicket(selectedThreatIntelligence?.adv_id, data);
          } else {
            createThreatIntel(data);
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
          }, [type, isVisible]);
          const evidenceFields = values?.adv_ioc;

          return (
            <Form onSubmit={handleSubmit}>
              <InputBox
                id="adv_title"
                label="Title"
                name="adv_title"
                placeholder="Title"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_title}
                value={values.adv_title}
                touched={touched.adv_title}
              />
              <Row gutter={11} justify="start">
                <Col>
                  <SPDatepicker
                    id="adv_received_date"
                    label="Received Date"
                    name="adv_received_date"
                    placeholder="received date"
                    onInputChange={(name, value) => {
                      setFieldValue(name, value);
                      // setTemp(moment());
                    }}
                    onBlur={handleBlur}
                    value={
                      values.adv_received_date
                        ? moment(values.adv_received_date)
                        : ''
                    }
                    errorMessage={errors.adv_received_date}
                    noBorderValidation
                    disabled={isSubmitting}
                    touched={touched.adv_received_date}
                    width={170}
                  />
                </Col>
                <Col>
                  <SPDatepicker
                    id="adv_release_date"
                    label="Release Date"
                    name="adv_release_date"
                    placeholder="Released date"
                    onInputChange={(name, value) => {
                      setFieldValue(name, value);
                      // setTemp(moment());
                    }}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    errorMessage={errors.adv_release_date}
                    noBorderValidation
                    value={
                      values.adv_release_date
                        ? moment(values.adv_release_date)
                        : ''
                    }
                    touched={touched.adv_release_date}
                    width={170}
                  />
                </Col>
              </Row>
              <SelectBox
                id="adv_source"
                label="Source"
                name="adv_source"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_source}
                value={values.adv_source}
                touched={touched.adv_source}
                options={sourceOptions}
                width={350}
              />
              <InputBox
                id="adv_sender"
                label="Sender Information"
                name="adv_sender"
                placeholder="Sender Information"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.adv_sender}
                value={values.adv_sender}
                touched={touched.adv_sender}
                width={350}
              />
              <SelectBox
                id="adv_category_id"
                label="Category"
                name="adv_category_id"
                placeholder="Category"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_category_id}
                value={values.adv_category_id}
                touched={touched.adv_category_id}
                options={categoryOptions}
                width={350}
              />
              <SelectBox
                id="adv_severity"
                label="Severity"
                name="adv_severity"
                placeholder="Severity"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_severity}
                value={values.adv_severity}
                touched={touched.adv_severity}
                options={severityOptions}
                width={350}
              />

              <SelectBox
                id="adv_asset_or_type"
                label="Asset / Type"
                name="adv_asset_or_type"
                placeholder="Asset/Type"
                onInputChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.adv_asset_or_type}
                value={values.adv_asset_or_type}
                touched={touched.adv_asset_or_type}
                options={AssetOptions}
                width={350}
              />

              {values.adv_asset_or_type !== 'Asset Type' ? (
                <SelectBox
                  id="adv_asset"
                  label="Asset"
                  name="adv_asset"
                  placeholder="Asset"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_asset}
                  value={values.adv_asset}
                  touched={touched.adv_asset}
                  options={assetOptions}
                  width={350}
                />
              ) : (
                <SelectBox
                  id="adv_asset_type"
                  label="Asset Type"
                  name="adv_asset_type"
                  placeholder="Asset Type"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.adv_asset_type}
                  value={values.adv_asset_type}
                  touched={touched.adv_asset_type}
                  options={assetTypeOptions}
                  width={350}
                />
              )}
              <SelectBox
                id="adv_department"
                label="Department"
                name="adv_department"
                mode="multiple"
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
                id="adv_disposition_id"
                label="Type"
                name="adv_disposition_id"
                placeholder="Type"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_disposition_id}
                value={values.adv_disposition_id}
                touched={touched.adv_disposition_id}
                options={dispositionOptions}
                width={350}
              />

              <SelectBox
                id="adv_status"
                label="Status"
                name="adv_status"
                placeholder="Status"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.adv_status}
                value={values.adv_status}
                touched={touched.adv_status}
                options={statusOptions}
                width={350}
              />
              <FieldEditor
                lable="Analysis Summary"
                name="adv_analysis_summary"
                errors={errors.adv_analysis_summary}
                touched={touched.adv_analysis_summary}
              />
              <FieldEditor
                lable="Description"
                name="adv_description"
                errors={errors.adv_description}
                touched={touched.adv_description}
              />
              <SelectBox
                id="adv_ioc"
                mode="multiple"
                label="Indicator of Compromise (IOC)"
                name="adv_ioc"
                placeholder="Evidence"
                onInputChange={setFieldValue}
                value={values.adv_ioc}
                onBlur={handleBlur}
                errorMes
                sage={errors.adv_ioc}
                touched={touched.adv_ioc}
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
                          // key={evidenceField}
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
                          ? evidenceField.replaceAll('_', ' ')
                          : evidenceField?.key
                      }
                      name={`Artifact_${_.isString(evidenceField)
                        ? evidenceField
                        : evidenceField?.key
                        }`}
                      placeholder={
                        _.isString(evidenceField)
                          ? evidenceField.replaceAll('_', ' ')
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
                })}

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
              <SelectBox
                id="adv_affected_products"
                label="Affected Products"
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
              <FieldEditor
                lable="Impact"
                name="adv_impact"
                errors={errors.adv_impact}
                touched={touched.adv_impact}
              />
              <FieldEditor
                lable="Remediation"
                name="adv_suggestions_recovery"
                errors={errors.adv_suggestions_recovery}
                touched={touched.adv_suggestions_recovery}
              />
              <Row gutter={11} justify="end" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      onCloseDrawer();
                      resetForm();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={type === 'edit' ? 'Update' : 'Create'}
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
    </div>
  );
};

const mapStateToProps = state => ({
  threatIntelligenceCategories: state.threatIntelligenceCategories,
  threatIntelligenceSeverity: state.threatIntelligenceSeverity,
  assetTypeStore: state.assetTypeStore,
  threatIntelligenceAsset: state.threatIntelligenceAsset,
  threatIntelligenceSource: state.threatIntelligenceSource,
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
  onGetSources: () => dispatch(getSources()),
  onGetEvidence: () => dispatch(getEvidence()),
  onGetDisposition: () => dispatch(getDisposition()),
  onGetProducts: () => dispatch(getProducts()),
  onGetVendors: () => dispatch(getAdvisoryVendors()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(EditTicket);

EditTicket.prototype = {
  type: PropTypes.string,
  selectedThreatIntelligence: PropTypes.object,
  updateUserTicket: PropTypes.func,
  createThreatIntel: PropTypes.func,
};
