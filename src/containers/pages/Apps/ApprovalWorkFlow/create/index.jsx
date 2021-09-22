import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const statusOptions = [
  // {
  //   key: 'default',
  //   value: '',
  //   label: 'Select Your Option Here',
  //   disabled: true,
  // },
  { key: 'Enable', value: 'Enable', label: 'Enable' },
  { key: 'Disable', value: 'Disable', label: 'Disable' },
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

const initialValues = {
  apw_name: '',
  apw_status: '',
  apw_primary_approvers: [],
  pts_hour: 0,
  pts_minutes: 0,
  apw_secondary_approvers: [],
  ste_hour: 0,
  ste_minutes: 0,
  apw_executive_approvers: [],
};

function Create({ createApplication, onCloseDrawer, updatedApproversList, isVisible }) {
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createApplication(values);
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
              <Form>
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
                    // placeholder="app_status"
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
                    // placeholder="app_primary_approvers"
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
                    // placeholder="apw Rate Limit Count"
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
                    // placeholder="apw Rate Limit Count"
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
                    // placeholder="apw Rate Limit Count"
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
                    // placeholder="app_executive_approvers"
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
                        title="Create"
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

export default Create;
