import React from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';

const validationSchema = Yup.object({
  aty_name: Yup.string().required('Required'),
  aty_value: Yup.string().required('Required'),
  assets: Yup.array().required('Required'),
  subgroups: Yup.array().required('Required'),
  aty_owner: Yup.string().required('Required'),
  aty_department: Yup.string().required('Required'),
});

let initialValues = {
  aty_name: '',
  aty_value: '',
  assets: [],
  subgroups: [],
  aty_owner: '',
  aty_department: '',
};

function CreateAssetType({
  onCloseDrawer,
  createAssetType,
  udpatedAssetDropDownList,
  updatedSubGroupDropDownList,
  updatedOwnerDropDownList,
  updatedDepartmentDropDownList,
  updatedAssetValueDropDownList,
}) {
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          createAssetType(values);
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
                id="aty_name"
                label="Name"
                name="aty_name"
                placeholder="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.aty_name}
                value={values.aty_name}
                touched={touched.aty_name}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
              />
            </RowDiv>

            <RowDiv>
              <SelectBox
                id="aty_value"
                label="Asset Value"
                name="aty_value"
                // placeholder="aty_value"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.aty_value}
                value={values.aty_value}
                touched={touched.aty_value}
                width={750}
                options={updatedAssetValueDropDownList}
                disabled={isSubmitting}
              />
            </RowDiv>
            <RowDiv>
              <SelectBox
                id="assets"
                label="Asset"
                name="assets"
                // placeholder="assets"
                mode="multiple"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.assets}
                value={values.assets}
                touched={touched.assets}
                width={750}
                options={udpatedAssetDropDownList}
                disabled={isSubmitting}
              />
            </RowDiv>
            <RowDiv>
              <SelectBox
                id="subgroups"
                label="Asset Sub Group"
                name="subgroups"
                // placeholder="subgroups"
                mode="multiple"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.subgroups}
                value={values.subgroups}
                touched={touched.subgroups}
                width={750}
                options={updatedSubGroupDropDownList}
                disabled={isSubmitting}
              />
            </RowDiv>
            <RowDiv>
              <SelectBox
                id="aty_owner"
                label="Owner"
                name="aty_owner"
                // placeholder="aty_owner"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.aty_owner}
                value={values.aty_owner}
                touched={touched.aty_owner}
                width={750}
                options={updatedOwnerDropDownList}
                disabled={isSubmitting}
              />
            </RowDiv>
            <RowDiv>
              <SelectBox
                id="aty_department"
                label="Department"
                name="aty_department"
                // placeholder="aty_department"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.aty_department}
                value={values.aty_department}
                touched={touched.aty_department}
                width={750}
                options={updatedDepartmentDropDownList}
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
        )}
      </Formik>
    </div>
  );
}

export default CreateAssetType;
