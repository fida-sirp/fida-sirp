import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import _, { filter, values, map } from 'lodash';
import { SModal } from '../../../incidentManagement/components/SendEmailModal/StyledComponents';

import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import {
  getCategories,
  getSeverity,
  getDisposition,
} from '../../../../../actions/threatIntelligence';
import { listAssets, listAssetTypes } from '../../../../../actions/assets';

const severityOptions = [
  {
    key: 1,
    value: 'High',
    label: 'High',
  },
  {
    key: 2,
    value: 'Medium',
    label: 'Medium',
  },
  { key: 3, value: 'Low', label: 'Low' },
];

const BulkUpdate = ({
  isVisible,
  type,
  onCloseDrawer,
  onGetCategories,
  threatIntelligenceCategories,
  onGetSeverity,
  threatIntelligenceDisposition,
  saveBulkUpdate,
  onListAssetTypes,
  threatIntelligenceSource,
  onGetDisposition,
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [dispositionOptions, setdispositionOptions] = useState([]);
  const [productOptions, setproductOptions] = useState([]);
  const [productVendorOptions, setProductVendorOptions] = useState([]);

  // useEffect(() => {
  //   onGetCategories();
  //   onGetSeverity();
  //   onGetDisposition();
  //   onListAssetTypes();
  // }, []);
  let initialValues = {
    adv_category_id: '',
    adv_severity: '',
    adv_disposition_id: '',
    adv_status: '',
  };
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
    const listData = threatIntelligenceDisposition?.listData?.items;
    const DispositionList = getFilteredOptions(
      listData,
      'add_id',
      true,
      'add_name'
    );
    setdispositionOptions(DispositionList);
  }, [threatIntelligenceDisposition]);

  const validationSchema = Yup.object({});

  const statusOptions = [
    { key: 'Pending', value: 'Pending', label: 'Pending' },
    { key: 'Release', value: 'Release', label: 'Release' },
  ];

  let evidenceFields = [];

  return (
    <SModal
      title="Bulk Update"
      visible={isVisible}
      onCancel={onCloseDrawer}
      width="825px"
      footer={[]}
    >
      <Formik
        id="formik"
        enableReinitialize={type === 'edit'}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          saveBulkUpdate(values);
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
              <Row>
                <Col span={12}>
                  <SelectBox
                    padding={4}
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
                  />
                </Col>
                <Col span={12}>
                  <SelectBox
                    padding={4}
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
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <SelectBox
                    padding={4}
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
                  />
                </Col>
                <Col span={12}>
                  <SelectBox
                    padding={4}
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
                  />
                </Col>
              </Row>
              <Row gutter={11} justify="end" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton
                    title={'Cancel'}
                    type="submit"
                    onButtonClick={() => {
                      onCloseDrawer();
                      resetForm();
                    }}
                    size="small"
                  />
                </Col>
                <Col>
                  <SPButton
                    title={'Save'}
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
    </SModal>
  );
};

const mapStateToProps = state => ({
  threatIntelligenceCategories: state.threatIntelligenceCategories,
  threatIntelligenceDisposition: state.threatIntelligenceDisposition,
  threatIntelligenceSeverity: state.threatIntelligenceSeverity,
});

const mapDispatchToProps = dispatch => ({
  onGetCategories: () => dispatch(getCategories()),
  onGetSeverity: () => dispatch(getSeverity()),
  onGetDisposition: () => dispatch(getDisposition()),
  onListAssetTypes: () => dispatch(listAssetTypes()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(BulkUpdate);

BulkUpdate.prototype = {
  type: PropTypes.string,
  updateUserTicket: PropTypes.func,
  createThreatIntel: PropTypes.func,
};
