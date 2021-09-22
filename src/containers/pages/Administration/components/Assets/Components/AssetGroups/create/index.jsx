import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  agr_group_name: Yup.string().required('Required'),
  agr_business_group: Yup.array().required('Required'),
  subGroup: Yup.array().required('Required'),
});

let initialValues = {
  agr_group_name: '',
  agr_business_group: [],
  subGroup: [],
};

function CreateAssetGroup({
  onCloseDrawer,
  updatedAssetSourceList,
  updatedAssetsSubGroup,
  createAssetGroup,
  assetCurrentAction,
  isVisible
}) {

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createAssetGroup(values);
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
            (
              <Form>
                <RowDiv>
                  <InputBox
                    id="agr_group_name"
                    label="Asset group"
                    name="agr_group_name"
                    placeholder="Asset Group"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.agr_group_name}
                    value={values.agr_group_name}
                    touched={touched.agr_group_name}
                    width={750}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                </RowDiv>
                <RowDiv>
                  <SelectBox
                    id="agr_business_group"
                    label="Business Group"
                    name="agr_business_group"
                    mode="multiple"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.agr_business_group}
                    value={values.agr_business_group}
                    touched={touched.agr_business_group}
                    width={750}
                    options={updatedAssetSourceList}
                    disabled={isSubmitting}
                  />
                </RowDiv>
                <RowDiv>
                  <SelectBox
                    id="subGroup"
                    label="Asset Subgroup"
                    name="subGroup"
                    mode="multiple"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.subGroup}
                    value={values.subGroup}
                    touched={touched.subGroup}
                    width={750}
                    options={updatedAssetsSubGroup}
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
                        title={assetCurrentAction === 'Edit' ? 'save' : 'Create'}
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

export default CreateAssetGroup;
