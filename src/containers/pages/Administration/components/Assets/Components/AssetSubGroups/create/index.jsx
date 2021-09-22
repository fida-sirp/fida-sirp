import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';
import { useDispatch } from 'react-redux'
import {
  getAssetGroupDropDownList
} from '../../../../../../../../actions/administration';

const validationSchema = Yup.object({
  asg_name: Yup.string().required('Required'),
  asg_parent_group: Yup.array().required('Required'),
});

let initialValues = {
  asg_name: '',
  asg_parent_group: [],
};

function CreateAssetSubGroup({
  onCloseDrawer,
  updatedAssetsSubGroup,
  assetCurrentAction,
  updatedAssetGroupDropDownList,
  createAssetSubGroup,
  isVisible
}) {
  const dispatch = useDispatch(getAssetGroupDropDownList())

  useEffect(() => {
    dispatch(getAssetGroupDropDownList())
  }, [getAssetGroupDropDownList])

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createAssetSubGroup(values);
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
          }, [isVisible])
          return (
            <Form>
              <RowDiv>
                <InputBox
                  id="asg_name"
                  label="Sub Group name"
                  name="asg_name"
                  placeholder="Subgroup name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.asg_name}
                  value={values.asg_name}
                  touched={touched.asg_name}
                  width={750}
                  disabled={isSubmitting}
                  noBorderValidation
                />
              </RowDiv>
              <RowDiv>
                <SelectBox
                  id="asg_parent_group"
                  label="Asset Group"
                  name="asg_parent_group"
                  // placeholder="asg_parent_group"
                  mode="multiple"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.asg_parent_group}
                  value={values.asg_parent_group}
                  touched={touched.asg_parent_group}
                  width={750}
                  options={updatedAssetGroupDropDownList}
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
        }}
      </Formik>
    </div>
  );
}

export default CreateAssetSubGroup;
