import React from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  bgp_label: Yup.string().required('Required'),
});


function EditTitle({
  onCloseDrawer,
  editAssetBusinessGroupTitle,
  selectedAssetValue,
}) {

  let initialValues = {
    bgp_label: selectedAssetValue || '',
  };

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          editAssetBusinessGroupTitle(values);
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
        }) => (
          <Form>
            <RowDiv>
              <InputBox
                id="bgp_label"
                label="Title"
                name="bgp_label"
                placeholder="Business Group"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.bgp_label}
                value={values.bgp_label}
                touched={touched.bgp_label}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
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
                    title="Save"
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
        )}
      </Formik>
    </div>
  );
}

export default EditTitle;
