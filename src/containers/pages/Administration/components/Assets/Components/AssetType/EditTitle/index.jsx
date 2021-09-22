import React from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  aty_label: Yup.string().required('Required'),
});


function EditTitle({
  onCloseDrawer,
  editAssetTypeTitle,
  selectedAssetType,
}) {
  
  let initialValues = {
    aty_label: selectedAssetType || '',
  };

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          editAssetTypeTitle(values);
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
                id="aty_label"
                label="Title"
                name="aty_label"
                placeholder="Title"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.aty_label}
                value={values.aty_label}
                touched={touched.aty_label}
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
