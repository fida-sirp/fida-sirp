import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../../../components/SPButton';
import InputBox from '../../../../../../../../components/InputBox';
import SelectBox from '../../../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, CreateAppControlBtn } from './StyledComponents';
import _ from 'lodash';

const validationSchema = Yup.object({
  agr_group_name: Yup.string().required('Required'),
  agr_business_group: Yup.array().required('Required'),
  subGroup: Yup.array().required('Required'),
});


function EditAssetsGroup({
  onCloseDrawer,
  updatedAssetSourceList,
  updatedAssetsSubGroup,
  assetCurrentAction,
  selectedAssetGroup,
  EditAssetGroup,
  isVisible,
  selectedgroup,
}) {
  const refactorBusinessgroup = (data) => {
    const array = [];
    if (_.isArray(data)) {
      data.map((item) => array.push(item?.bgp_id))
    }
    return array
  }

  const refactorSubgroup = (data) => {
    const Subgroup = [];
    if (_.isArray(data)) {
      data.map((item) => Subgroup.push(item?.asg_id))
    }
    return Subgroup
  }


  return (
    <div>
      <Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          agr_group_name: selectedgroup?.asset_group || '',
          agr_business_group: refactorBusinessgroup(selectedAssetGroup?.busniess_group) || [],
          subGroup: refactorSubgroup(selectedAssetGroup?.asset_subgroup) || []
        }}
        onSubmit={(values, { resetForm }) => {
          EditAssetGroup(values);
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
          return ((
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
                  // placeholder="agr_asset_subgrp"
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
          ))
        }}
      </Formik>
    </div>
  );
}

export default EditAssetsGroup;
