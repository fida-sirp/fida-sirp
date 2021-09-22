import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import SPButton from '../../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import InputBox from '../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../components/SelectBox';

function SubCategoryFormDrawer({
  recordValue,
  submit,
  closeDrawer,
  severityList,
  primaryCategoryList,
  isVisible,
  isCreate
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    ads_name: '',
    ads_desc: '',
    ads_main_category: '',
    ads_severity: '',
  });

  let validationSchemaStandard = Yup.object({
    ads_name: Yup.string().required('Required'),
    ads_main_category: Yup.string().required('Required'),
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['ads_name'] = recordValue.ads_name;
      initialValues['ads_desc'] = recordValue.ads_desc;
      initialValues['ads_main_category'] = `${recordValue.ads_main_category}`;
      initialValues['ads_severity'] = recordValue.ads_severity;
      setFormInitialValues(initialValues);
    }
  }, [recordValue]);

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
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
          return(
            <Form>
              <SelectBox
                id="ads_main_category"
                label="Primary Category"
                name="ads_main_category"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.ads_main_category}
                value={values.ads_main_category}
                touched={touched.ads_main_category}
                options={primaryCategoryList}
                disabled={isSubmitting}
              />

              <InputBox
                id={'ads_name'}
                label={'Name'}
                name={'ads_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.ads_name}
                value={values.ads_name}
                touched={touched.ads_name}
                noBorderValidation
              />

              <InputBox
                id={'ads_desc'}
                label={'Description'}
                name={'ads_desc'}
                placeholder={'Description'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.ads_desc}
                touched={touched.ads_desc}
                noBorderValidation
              />

              <SelectBox
                id="ads_severity"
                label="Severity"
                name="ads_severity"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.ads_severity}
                value={values.ads_severity}
                touched={touched.ads_severity}
                options={severityList}
                disabled={isSubmitting}
              />

              <Row gutter={11} justify="end">
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

export default SubCategoryFormDrawer;
