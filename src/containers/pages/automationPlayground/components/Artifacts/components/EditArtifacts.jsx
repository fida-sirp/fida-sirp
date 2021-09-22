import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import SPButton from '../../../../../../components/SPButton';
import SelectBox from '../../../../../../components/SelectBox';
import { Row, Col } from 'antd';

const ValidityOptions = [
  { key: 1, value: 'Invalid', label: 'Invalid' },
  { key: 2, value: 'Valid', label: 'Valid' },
];
const EditArtifect = ({ selectedArtifect, isVisible, close, onUpdate }) => {
  return (
    <>
      <Formik
        id="formik"
        enableReinitialize
        initialValues={{ art_valid: selectedArtifect?.art_valid || '' }}
        onSubmit={(values, { resetForm }) => {
          onUpdate(values);
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
          }, []);
          return (
            <Form onSubmit={handleSubmit}>
              <SelectBox
                id="art_valid"
                label="Validity"
                name="art_valid"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.art_valid}
                value={values.art_valid}
                touched={touched.art_valid}
                options={ValidityOptions}
              />
              <Row gutter={11} justify="end" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      close();
                      resetForm();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title="Update"
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
    </>
  );
};

export default EditArtifect;
