import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SPUpload from '../../../../../../components/SPUpload';
import SPSecureImage from '../../../../../../components/SPSecureImage';
import { Fragment } from 'react';

function VendorFormDrawer({ recordValue, submit, closeDrawer, isVisible, isCreate }) {

  const intialValue = {
    apv_name: recordValue?.apv_name || "",
    apv_url: recordValue?.apv_url || "",
  }

  let validationSchemaStandard = Yup.object({
    apv_name: Yup.string().required('Required'),
    apv_url: Yup.string().required('Required'),
  });
  console.log(">>>recordValue?.vendorImage", recordValue?.vendorImage)
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={intialValue}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          var FormData = require('form-data');
          var data = new FormData();
          data.append('p_logo', values.p_logo);
          data.append('apv_name', values.apv_name);
          data.append('apv_url', values.apv_url);
          submit(data);
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
                id={'apv_name'}
                label={'Name'}
                name={'apv_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.apv_name}
                errorMessage={errors.apv_name}
                touched={touched.apv_name}
                width={345}
                noBorderValidation
              />

              <InputBox
                id={'apv_url'}
                label={'Url'}
                name={'apv_url'}
                placeholder={'Url'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.apv_url}
                errorMessage={errors.apv_url}
                touched={touched.apv_url}
                width={345}
                noBorderValidation
              />
              <Row >
                <Col span={12}>
                  <SPUpload
                    id="p_logo"
                    label="File"
                    name="p_logo"
                    onInputChange={(name, file) => {
                      setFieldValue(name, file);
                    }}
                    onBlur={handleBlur}
                    value={values.p_logo}
                    disabled={isSubmitting}
                    width={170}
                  />
                </Col>
                {recordValue?.vendorImage ? <Col span={12} style={{ marginBottom: 20 }}>
                  <img src={recordValue?.vendorImage} height="auto" width="auto" />
                </Col> : <Fragment />}
              </Row>

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
                    title={isCreate ? "Save" : "Update"}
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

export default VendorFormDrawer;
