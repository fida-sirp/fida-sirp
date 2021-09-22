import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import styled from 'styled-components';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';
import { Label } from '../../../../../../components/InputBox/StyledComponents';
import { Link } from 'react-router-dom'

const IntrustionSection = styled.div`
    color:#fff;
    margin-top:20px;
`
const IntrustionDiv = styled.div`
    color:#fff;
    paddingBottom:50
`
const IntrustionImg = styled.img`
    height:250px;
    width:auto;
    margin-top:13px;
    margin-bottom:20px;
    object-fit:cover;
`

function UpdateThirdParyForm({ record, submit, closeDrawer, updateHandler, isVisible }) {
    const [formInitialValues, setFormInitialValues] = useState({
        ost_client_id: record?.ost_client_id || '',
        ost_client_secret: record?.ost_client_secret || '',
        ost_configuration: record?.ost_configuration || '',
        ost_host: record?.ost_host || "",
        ost_status: record?.ost_status || 0
    });
    const [isOstStatus, setisOstStatus] = useState(false)

    useEffect(() => {
        let initialValues = {};
        if (!_.isEmpty(record)) {
            initialValues['ost_client_id'] = record.ost_client_id;
            initialValues['ost_client_secret'] = record.ost_client_secret;
            initialValues['ost_host'] = record.ost_host;
            initialValues['ost_configuration'] = record.ost_configuration;
            setFormInitialValues(initialValues);
            if (record?.ost_status === 1) {
                setisOstStatus(true)
            } else {
                setisOstStatus(false)
            }
        }
    }, [record]);


    const handlStatus = (value) => {
        setisOstStatus(value)
    }
    return (
        <div>
            <Formik
                id="formik"
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    if (isOstStatus) {
                        values.ost_status = 1
                    } else {
                        values.ost_status = 0
                    }
                    updateHandler(values);
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
                            {record?.ost_variable === "OpenID" || record?.ost_variable === "LDAP" ? <>
                                <InputBox
                                    id={'ost_client_id'}
                                    label={'Client ID / User Name'}
                                    name={'ost_client_id'}
                                    placeholder={'Client ID / User Name'}
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ost_client_id}
                                    errorMessage={errors.ost_client_id}
                                    touched={touched.ost_client_id}
                                    noBorderValidation
                                />
                                <InputBox
                                    id={'ost_client_secret'}
                                    label={'Client Secret / Password'}
                                    name={'ost_client_secret'}
                                    placeholder={'Client Secret / Password'}
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ost_client_secret}
                                    errorMessage={errors.ost_client_secret}
                                    touched={touched.ost_client_secret}
                                    noBorderValidation
                                />
                            </> : null}

                            {record?.ost_variable === "LDAP" && (<>
                                <InputBox
                                    id={'ost_host'}
                                    label="Host"
                                    name={'ost_host'}
                                    placeholder="Host"
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ost_host}
                                    errorMessage={errors.ost_host}
                                    touched={touched.ost_host}
                                    noBorderValidation
                                />
                                <InputBox
                                    id={'Configuration'}
                                    label='Configuration'
                                    name={'ost_configuration'}
                                    placeholder='Configuration'
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ost_configuration}
                                    errorMessage={errors.ost_configuration}
                                    touched={touched.ost_configuration}
                                    noBorderValidation
                                />
                            </>)}

                            <SPToggleSwitch onChecked={isOstStatus} onChange={handlStatus} />
                            {Object.keys(record?.instructionImages).length > 0 && <IntrustionSection>
                                <Label>
                                    Instructions
                                </Label>
                                <IntrustionDiv>
                                    1.Sign in to  <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer">https://console.developers.google.com/</a>
                                </IntrustionDiv>
                                <IntrustionDiv>
                                    2.Click on Select a project dropdown & Create New Project
                                </IntrustionDiv>
                                <IntrustionImg src={record?.instructionImages?.['step-2']} />
                                <IntrustionDiv>
                                    3.Click on OAuth Consent screen then select “External Users” & fill the required information
                                </IntrustionDiv>
                                <IntrustionImg src={record?.instructionImages?.['step-3']} />
                                <IntrustionDiv>
                                    4.Create Credentials -> Oauth Client ID:
                                    Application Type: Web Application
                                    Add Redirect Url Given below
                                    https://staging.sirp.io/dashboard/google-login/auth?authclient=google
                                </IntrustionDiv>
                                <IntrustionImg src={record?.instructionImages?.['step-4']} />
                            </IntrustionSection>}
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
                                        title={"Update"}
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
        </div >
    );
}

export default UpdateThirdParyForm

