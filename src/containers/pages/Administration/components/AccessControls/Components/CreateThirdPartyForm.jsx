import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import SelectBox from '../../../../../../components/SelectBox';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { onGetAuthencticationType, onGetAuthenticationVendor } from '../../../../../../actions/administration';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';


function CreateThirdPartyForm({ isVisible, createHandler, closeDrawer, getAuthenticationType, getAuthencationVendor, authencationVendorList, authenctionTypeList }) {
    const [formInitialValues, setFormInitialValues] = useState({
        ost_variable: '',
        ost_value: '',
        ost_status: 0
    });
    const [authencationtype, setAuthencationtype] = useState([]);
    const [authenticationVendor, setAuthenticationVendor] = useState([])
    const [isOstStatus, setisOstStatus] = useState(false)

    useEffect(() => {
        getAuthenticationType()
        getAuthencationVendor()
    }, [])

    let validationSchemaStandard = Yup.object({
        ost_variable: Yup.string().required('Required'),
    });

    useEffect(() => {
        if (!_.isEmpty(authenctionTypeList)) {
            let arr = [];
            if (Object.keys(authenctionTypeList[0]).length !== 0) {
                for (const [key, value] of Object.entries(authenctionTypeList[0])) {
                    arr.push({
                        key,
                        value: key,
                        label: value,
                    })
                }
            }
            setAuthencationtype(arr);
        }
        if (!_.isEmpty(authencationVendorList)) {
            let vendor = [];
            if (Object.keys(authencationVendorList[0]).length !== 0) {
                for (const [key, value] of Object.entries(authencationVendorList[0])) {
                    vendor.push({
                        key,
                        value: key,
                        label: value,
                    })
                }
            }
            setAuthenticationVendor(vendor);
        }
    }, [authenctionTypeList, authencationVendorList])

    const handleToggleChange = (value) => {
        setisOstStatus(value)
    }


    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    if (isOstStatus) {
                        values.ost_status = 1
                    } else {
                        values.ost_status = 0
                    }
                    createHandler(values);
                    resetForm()
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
                        setisOstStatus(false)
                    }, [isVisible])
                    return (
                        <Form>
                            <Row gutter={20}>
                                <Col span={12}>
                                    <SelectBox
                                        id="ost_variable"
                                        label="Authentication Type"
                                        name="ost_variable"
                                        onInputChange={setFieldValue}
                                        onBlur={handleBlur}
                                        errorMessage={errors.ost_variable}
                                        value={values.ost_variable}
                                        touched={touched.ost_variable}
                                        options={authencationtype}
                                        disabled={isSubmitting}
                                    />
                                </Col>
                                {_.isEmpty(values.ost_variable) || values.ost_variable === "OpenID" ? <Col span={12}>
                                    <SelectBox
                                        id="ost_value"
                                        label="Authentication Vendor"
                                        name="ost_value"
                                        onInputChange={setFieldValue}
                                        onBlur={handleBlur}
                                        errorMessage={errors.ost_value}
                                        value={values.ost_value}
                                        touched={touched.ost_value}
                                        options={authenticationVendor}
                                        disabled={isSubmitting}
                                    />
                                </Col> : null
                                }

                            </Row>
                            <SPToggleSwitch onChecked={isOstStatus} onChange={handleToggleChange} />
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
                                        title={"Create"}
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


const mapStateToProps = state => ({
    authenctionTypeList: state.administration.accessControlList?.authenticationTypeList,
    authencationVendorList: state.administration.accessControlList?.authencticationVendor,
});

const mapDispatchToProps = dispatch => ({
    getAuthenticationType: () => dispatch(onGetAuthencticationType()),
    getAuthencationVendor: () => dispatch(onGetAuthenticationVendor()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(CreateThirdPartyForm);