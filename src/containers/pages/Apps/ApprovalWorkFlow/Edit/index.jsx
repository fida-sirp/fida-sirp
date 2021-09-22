import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import DropdownTag from '../../../../../components/SPMultilevelDropdown';
import { isArray, isEmpty } from 'lodash';

const productVendorOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 'Software', value: 'Software', label: 'Software' },
  { key: 'Hardware', value: 'Hardware', label: 'Hardware' },
  { key: 'Information', value: 'Information', label: 'Information' },
  { key: 'People', value: 'People', label: 'People' },
];

const appRateLimitOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 1, value: 1, label: 'second' },
  { key: 2, value: 2, label: 'minute' },
  { key: 3, value: 3, label: 'hour' },
  { key: 4, value: 4, label: 'day' },
  { key: 5, value: 5, label: 'month' },
  { key: 6, value: 6, label: 'year' },
];

const typesOptions = [
  // {
  //   key: 'default',
  //   value: '',
  //   label: 'Select Your Option Here',
  //   disabled: true,
  // },
  { key: 1, value: 1, label: 'Investigation' },
  { key: 2, value: 2, label: 'Control' },
  { key: 3, value: 3, label: 'Assessment' },
];

const statusOptions = [
  { key: 'Enable', value: 'Enable', label: 'Enable' },
  { key: 'Disable', value: 'Disable', label: 'Disable' },
];

const publisherOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 'SIRP', value: 'SIRP', label: 'SIRP' },
];

const isDeprecatedOptions = [
  { key: 'No', value: 'No', label: 'No' },
  { key: 'Yes', value: 'Yes', label: 'Yes' },
];

const multiConfigurationAllowedOptions = [
  { key: 'False', value: 'False', label: 'False' },
  { key: 'True', value: 'True', label: 'True' },
];

const validationSchema = Yup.object({
  apw_name: Yup.string().required('Required'),
  apw_status: Yup.string().required('Required'),
  apw_primary_approvers: Yup.array().required('Required'),
  pts_hour: Yup.number().required('Required'),
  pts_minutes: Yup.number().required('Required'),
  apw_secondary_approvers: Yup.array().required('Required'),
  ste_hour: Yup.number().required('Required'),
  ste_minutes: Yup.number().required('Required'),
  apw_executive_approvers: Yup.array().required('Required'),
});

function EditWorkFlow({
  updateApplication,
  onCloseDrawer,
  updatedApproversList,
  selectedApprovalInfo,
  isVisible
}) {
  const [locationOptionsData, setLocationOptionsData] = useState([]);
  const [assetClassificationOptionsData, setAssetClassificationData] = useState(
    []
  );
  const [assetOSOptionsData, setAssetOSOptionsData] = useState([]);
  const initialValues = {
    apw_name: selectedApprovalInfo?.apw_name,
    apw_status: selectedApprovalInfo?.apw_status,
    apw_primary_approvers: !isEmpty(selectedApprovalInfo.apw_primary_approvers)
      ? !isArray(selectedApprovalInfo?.apw_primary_approvers)
        ? (selectedApprovalInfo?.apw_primary_approvers).split(',')
        : selectedApprovalInfo?.apw_primary_approvers
      : [],
    pts_hour: selectedApprovalInfo?.primary?.pts_hour,
    pts_minutes: selectedApprovalInfo?.primary?.pts_minutes,
    apw_secondary_approvers: !isEmpty(
      selectedApprovalInfo.apw_secondary_approvers
    )
      ? !isArray(selectedApprovalInfo?.apw_secondary_approvers)
        ? (selectedApprovalInfo?.apw_secondary_approvers).split(',')
        : selectedApprovalInfo?.apw_secondary_approvers
      : [],
    ste_hour: selectedApprovalInfo?.secondary?.ste_hour,
    ste_minutes: selectedApprovalInfo?.secondary?.ste_minutes,
    apw_executive_approvers: !isEmpty(
      selectedApprovalInfo.apw_executive_approvers
    )
      ? !isArray(selectedApprovalInfo?.apw_executive_approvers)
        ? (selectedApprovalInfo?.apw_executive_approvers).split(',')
        : selectedApprovalInfo?.apw_executive_approvers
      : [],
  };

  function generateError(data) {
    if (Array.isArray(data)) {
      return data.map(item => <li>{item.message}</li>);
    }
  }

  return (
    <div>
      <Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          updateApplication(values);
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
          }, [isVisible])
          return (
            (
              <Form onSubmit={handleSubmit}>
                <RowDiv>
                  <InputBox
                    id="apw_name"
                    label="Name"
                    name="apw_name"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.apw_name}
                    value={values.apw_name}
                    touched={touched.apw_name}
                    width={750}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                </RowDiv>
                <RowDiv>
                  <SelectBox
                    id="apw_status"
                    label="Status"
                    name="apw_status"
                    // placeholder="apw_status"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.apw_status}
                    value={values.apw_status}
                    touched={touched.apw_status}
                    width={750}
                    options={statusOptions}
                    disabled={isSubmitting}
                  />
                </RowDiv>

                <RowDiv>
                  <SelectBox
                    id="apw_primary_approvers"
                    label="Primary Approvers"
                    name="apw_primary_approvers"
                    // placeholder="apw_primary_approvers"
                    mode="multiple"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.apw_primary_approvers}
                    value={values.apw_primary_approvers}
                    touched={touched.apw_primary_approvers}
                    width={750}
                    options={updatedApproversList}
                    disabled={isSubmitting}
                  />
                </RowDiv>

                <RowDiv>
                  <InputBox
                    id="pts_hour"
                    label="Primary Failover"
                    name="pts_hour"
                    // placeholder="App Rate Limit Count"
                    type="number"
                    min="0"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.pts_hour}
                    value={values.pts_hour}
                    touched={touched.pts_hour}
                    width={345}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                  <InputBox
                    id="pts_minutes"
                    label="Primary Failover"
                    name="pts_minutes"
                    // placeholder="App Rate Limit Count"
                    type="number"
                    min="0"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.pts_minutes}
                    value={values.pts_minutes}
                    touched={touched.pts_minutes}
                    width={345}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                </RowDiv>

                <RowDiv>
                  <SelectBox
                    id="apw_secondary_approvers"
                    name="apw_secondary_approvers"
                    label="Secondary Approvers"
                    mode="multiple"
                    // placeholder="Power Status"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.apw_secondary_approvers}
                    value={values.apw_secondary_approvers}
                    touched={touched.apw_secondary_approvers}
                    width={750}
                    options={updatedApproversList}
                    disabled={isSubmitting}
                  />
                </RowDiv>

                <RowDiv>
                  <InputBox
                    id="ste_hour"
                    label="Secondary Failover"
                    name="ste_hour"
                    // placeholder="App Rate Limit Count"
                    type="number"
                    min="0"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.ste_hour}
                    value={values.ste_hour}
                    touched={touched.ste_hour}
                    width={345}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                  <InputBox
                    id="ste_minutes"
                    label="Secondary Failover"
                    name="ste_minutes"
                    // placeholder="App Rate Limit Count"
                    type="number"
                    min="0"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.ste_minutes}
                    value={values.ste_minutes}
                    touched={touched.ste_minutes}
                    width={345}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                </RowDiv>

                <RowDiv>
                  <SelectBox
                    id="apw_executive_approvers"
                    label="Executive Approvers"
                    name="apw_executive_approvers"
                    mode="multiple"
                    // placeholder="apw_executive_approvers"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.apw_executive_approvers}
                    value={values.apw_executive_approvers}
                    touched={touched.apw_executive_approvers}
                    width={750}
                    options={updatedApproversList}
                    disabled={isSubmitting}
                  />
                </RowDiv>
                <CreateAppControlBtn>
                  <Row gutter={11} justify="end">
                    <Col>
                      <SPButton
                        title="Cancel"
                        size="small"
                        type="secondary"
                        onButtonClick={() => {
                          resetForm();
                          onCloseDrawer();
                        }}
                      />
                    </Col>
                    <Col>
                      <SPButton
                        title="Update"
                        size="small"
                        type="submit"
                        onButtonClick={handleSubmit}
                      // isLoading={
                      //   newAsset.isProcessing ? newAsset.isProcessing : false
                      // }
                      />
                    </Col>
                  </Row>
                </CreateAppControlBtn>
              </Form>
            )
          )
        }}
      </Formik>
    </div>
  );
}

export default EditWorkFlow;
