import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import _, { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import TextBox from '../../../../../../components/TextAreaBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function WorkFlowDrawer({
  isVisible,
  recordValue,
  submit,
  closeDrawer,
  categoryList,
  subCategoryList,
  taskCategoryList,
  handleCategorySelect,
  subCategorySelect,
  isCreated
}) {
  const intialValue = {
    wkf_name: recordValue?.wkf_name || "",
    wkf_desc: recordValue?.wkf_desc || "",
    wkf_incident_category: recordValue?.wkf_incident_category?.toString() || '',
    wkf_incident_sub_category: recordValue?.wkf_incident_sub_category || '',
    wkf_task_category: recordValue?.wkf_task_category?.toString() || '',
    wkf_status: recordValue?.wkf_status || '',
  }


  let validationSchemaStandard = Yup.object({
    wkf_name: Yup.string().required('Required'),
    wkf_incident_category: Yup.string().required('Required'),
    wkf_task_category: Yup.string().required('Required'),
    wkf_status: Yup.string().required('Required'),
  });

  const status = [
    {
      key: 'enable',
      value: 'Enable',
      label: 'Enable',
    },
    {
      key: 'disable',
      value: 'Disable',
      label: 'Disable',
    },
  ];


  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={intialValue}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
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
        }) => {
          useEffect(() => {
            resetForm()
          }, [isVisible])
          return (
            <Form>
              <InputBox
                id={'wkf_name'}
                label={'Name'}
                name={'wkf_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.wkf_name}
                touched={touched.wkf_name}
                errorMessage={errors.wkf_name}
                width={750}
                noBorderValidation
              />
              <TextAreaBox
                id="wkf_desc"
                name="wkf_desc"
                label={'Description'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.wkf_desc}
                value={values.wkf_desc}
                touched={touched.wkf_desc}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
              />
              <SelectBox
                id="wkf_incident_category"
                label="Category"
                name="wkf_incident_category"
                onInputChange={(name, value) => {
                  handleCategorySelect(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.wkf_incident_category}
                value={values.wkf_incident_category}
                touched={touched.wkf_incident_category}
                width={750}
                options={categoryList}
              //   disabled={isSubmitting}
              />
              <SelectBox
                id="wkf_incident_sub_category"
                label="Sub Category"
                name="wkf_incident_sub_category"
                onInputChange={(name, value) => {
                  subCategorySelect(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.wkf_incident_sub_category}
                value={values.wkf_incident_sub_category}
                touched={touched.wkf_incident_sub_category}
                width={750}
                options={subCategoryList}
                disabled={isSubmitting}
              />
              <SelectBox
                id="wkf_task_category"
                label="Task Category"
                name="wkf_task_category"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.wkf_task_category}
                value={values.wkf_task_category}
                touched={touched.wkf_task_category}
                width={750}
                options={taskCategoryList}
                disabled={isSubmitting}
              />
              <SelectBox
                id="wkf_status"
                label="Status"
                name="wkf_status"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.wkf_status}
                value={values.wkf_status}
                touched={touched.wkf_status}
                width={750}
                options={status}
                disabled={isSubmitting}
              />
              <Row gutter={11} justify="end" >
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      closeDrawer();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={isCreated ? "Save" : "Update"}
                    size="small"
                    type="submit"
                    onButtonClick={handleSubmit}
                    isLoading={false}
                  />
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default WorkFlowDrawer;
