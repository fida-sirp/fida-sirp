import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { getPubliserListRequested, getRateLimitRequested, getTypeListRequested, getVendorListRequested } from '../../../../../../actions/apps';
import styled from 'styled-components'
import { compose } from 'redux';
import { connect } from 'react-redux'

const productVendorOptions = [
    {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
    },
    { key: 'Software', value: 'Software', label: 'Software' },
    { key: 'Hardware', value: 'Hardware', label: 'Hardware' },
    { key: 'Information', value: 'Information', label: 'Information' },
    { key: 'People', value: 'People', label: 'People' },
];

export const StyledDiv = styled.div`
  padding: 5px 0px;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


export const CreateAppControlBtn = styled.div`
  width: 640px,
  margin-left: 130px;
`;


const appRateLimitOptions = [
    {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
    },
    { key: 1, value: 1, label: 'second' },
    { key: 2, value: 2, label: 'minute' },
    { key: 3, value: 3, label: 'hour' },
    { key: 4, value: 4, label: 'day' },
    { key: 5, value: 5, label: 'month' },
    { key: 6, value: 6, label: 'year' },
];

const typesOptions = [
    {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
    },
    { key: 1, value: 1, label: 'Investigation' },
    { key: 2, value: 2, label: 'Control' },
    { key: 3, value: 3, label: 'Assessment' },
];

const statusOptions = [
    {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
    },
    { key: 'Enable', value: 'Enable', label: 'Enable' },
    { key: 'Disable', value: 'Disable', label: 'Disable' },
];

const publisherOptions = [
    {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
    },
    { key: 'SIRP', value: 'SIRP', label: 'SIRP' },
];

const isDeprecatedOptions = [
    { key: 'no', value: 'no', label: 'No' },
    { key: 'yes', value: 'yes', label: 'Yes' },
];

const multiConfigurationAllowedOptions = [
    { key: 'false', value: 'false', label: 'False' },
    { key: 'frue', value: 'true', label: 'True' },
];

const validationSchema = Yup.object({
    app_name: Yup.string().required('Required'),
});

let initialValues = {
    app_product_website_url: '',
    app_version: '',
    app_name: '',
    app_product_vendor: '',
    app_publisher: '',
    app_rate_limit: '',
    app_rate_limit_count: '',
    app_multi_configuration_allowed: 'False',
    app_status: '',
    app_is_deprecated: 'No',
    app_type: 'Investigate',
};

function CreateApplicationForm({
    createApplication,
    onCloseDrawer,
    appPublishersList,
    isVisible,
    appRateList,
    appTypesList,
    appVenderList
}) {
    return (
        <Formik
            id="formik"
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                createApplication(values);
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
                        <RowDiv>
                            <InputBox
                                id="app_name"
                                label="Name"
                                name="app_name"
                                placeholder=" Name"
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.app_name}
                                value={values.app_name}
                                touched={touched.app_name}
                                width={345}
                                disabled={isSubmitting}
                                noBorderValidation
                            />
                            <SelectBox
                                id="app_product_vendor"
                                label="Product Vendor"
                                name="app_product_vendor"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_product_vendor}
                                value={values.app_product_vendor}
                                touched={touched.app_product_vendor}
                                width={345}
                                options={appVenderList}
                                disabled={isSubmitting}
                            />
                        </RowDiv>
                        <RowDiv>
                            <InputBox
                                id="app_product_website_url"
                                label="Product Website Url"
                                name="app_product_website_url"
                                placeholder="Product Website Url"
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.app_product_website_url}
                                value={values.app_product_website_url}
                                width={345}
                                touched={touched.app_product_website_url}
                                disabled={isSubmitting}
                                noBorderValidation
                            />
                            <InputBox
                                id="app_version"
                                label="Version"
                                name="app_version"
                                placeholder="Version"
                                onInputChange={handleChange}
                                errorMessage={errors.app_version}
                                onBlur={handleBlur}
                                value={values.app_version}
                                width={345}
                                touched={touched.app_version}
                                disabled={isSubmitting}
                                noBorderValidation
                            />
                        </RowDiv>
                        <RowDiv>
                            <SelectBox
                                id="app_is_deprecated"
                                name="app_is_deprecated"
                                label="Is Deprecated"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_is_deprecated}
                                value={values.app_is_deprecated}
                                touched={touched.app_is_deprecated}
                                width={345}
                                options={isDeprecatedOptions}
                                disabled={isSubmitting}
                            />
                            <SelectBox
                                id="app_type"
                                name="app_type"
                                label="Type"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_type}
                                value={values.app_type}
                                touched={touched.app_type}
                                width={345}
                                options={appTypesList}
                                disabled={isSubmitting}
                            />
                        </RowDiv>

                        <RowDiv>
                            <SelectBox
                                id="app_publisher"
                                name="app_publisher"
                                label="Publisher"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_publisher}
                                value={values.app_publisher}
                                touched={touched.app_publisher}
                                width={345}
                                options={appPublishersList}
                                disabled={isSubmitting}
                            />
                            <SelectBox
                                id="app_rate_limit"
                                name="app_rate_limit"
                                label="App Rate Limit"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_rate_limit}
                                value={values.app_rate_limit}
                                touched={touched.app_rate_limit}
                                width={345}
                                options={appRateList}
                                disabled={isSubmitting}
                            />
                        </RowDiv>
                        <RowDiv>
                            <InputBox
                                id="app_rate_limit_count"
                                label="App Rate Limit Count"
                                name="app_rate_limit_count"
                                type="number"
                                min="0"
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.app_rate_limit_count}
                                value={values.app_rate_limit_count}
                                touched={touched.app_rate_limit_count}
                                width={345}
                                disabled={isSubmitting}
                                noBorderValidation
                            />
                            <SelectBox
                                id="app_multi_configuration_allowed"
                                label="Multi configuration allowed"
                                name="app_multi_configuration_allowed"
                                // placeholder="app_multi_configuration_allowed"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_multi_configuration_allowed}
                                value={values.app_multi_configuration_allowed}
                                touched={touched.app_multi_configuration_allowed}
                                width={345}
                                options={multiConfigurationAllowedOptions}
                                disabled={isSubmitting}
                            />
                        </RowDiv>
                        <RowDiv>
                            <SelectBox
                                id="app_status"
                                label="Status"
                                name="app_status"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.app_status}
                                value={values.app_status}
                                touched={touched.app_status}
                                width={345}
                                options={statusOptions}
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
                                        title="Save"
                                        size="small"
                                        type="submit"
                                        onButtonClick={handleSubmit}
                                    />
                                </Col>
                            </Row>
                        </CreateAppControlBtn>
                    </Form>
                )
            }
            }
        </Formik>
    );
}


export default CreateApplicationForm;
