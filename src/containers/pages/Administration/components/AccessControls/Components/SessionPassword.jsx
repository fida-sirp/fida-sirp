import React, { useEffect, useState } from 'react';
import SPButton from '../../../../../../components/SPButton';
import { Formik, Form } from 'formik';
import InputBox from '../../../../../../components/InputBox';
import { StylesBoxSessions } from '../StyledComponents';
import * as Yup from 'yup'
import { Row, Col } from 'antd';
import loaderImg from '../../../../../../assets/images/loader.gif';
import { getSessionPassword, getSessionPasswordUpdate } from '../../../../../../actions/administration'
import { compose } from 'redux';
import { connect } from 'react-redux'
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';


const SessionsPassword = ({ onGetSessionPassword, sessionPassword, onUpdateSessionPassword, isLoading }) => {
    const validationSchema = Yup.object({
    });

    const initialValues = {
        stt_inactivity_timeout: sessionPassword?.items?.[0]?.stt_inactivity_timeout || "",
        stt_absolute_timeout: sessionPassword?.items?.[0]?.stt_absolute_timeout || "",
        stt_pass_lenght: sessionPassword?.items?.[0]?.stt_pass_lenght || "",
        stt_pass_special_char: sessionPassword?.items?.[0]?.stt_pass_special_char || "",
        stt_pass_capital_char: sessionPassword?.items?.[0]?.stt_pass_capital_char || "",
        stt_pass_digit: sessionPassword?.items?.[0]?.stt_pass_digit || ""
    }

    useEffect(() => {
        onGetSessionPassword()
    }, [])

    return (
        <>
            <StylesBoxSessions>
                {isLoading ? <div className="make-child-center">
                    <img src={loaderImg} />
                </div> : <>    <Row>
                    <p style={{ fontSize: 18 }}>SESSION MANAGEMENT SETTINGS</p>
                </Row>
                    <Formik
                        id="formik"
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            if (!_.isEmpty(values)) {
                                const id = sessionPassword?.items?.[0]?.stt_id;
                                onUpdateSessionPassword(id, values)
                            }
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
                                <Row gutter={15}>
                                    <Col span={12}>
                                        <InputBox
                                            label="Inactivity Timeout (Minutes)"
                                            type='number'
                                            name="stt_inactivity_timeout"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={errors.stt_inactivity_timeout}
                                            touched={touched.stt_inactivity_timeout}
                                            value={values.stt_inactivity_timeout}
                                            noBorderValidation
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InputBox
                                            label="Absolute Timeout (Minutes)"
                                            name="stt_absolute_timeout"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={errors.stt_absolute_timeout}
                                            touched={touched.stt_absolute_timeout}
                                            type='number'
                                            value={values.stt_absolute_timeout}
                                            noBorderValidation
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <InputBox
                                            label="Minimum Length"
                                            type='number'
                                            name="stt_pass_lenght"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={errors.stt_pass_lenght}
                                            touched={touched.stt_pass_lenght}
                                            type='number'
                                            noBorderValidation
                                            value={values.stt_pass_lenght}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <InputBox
                                            label="Digits"
                                            type='number'
                                            name="stt_pass_digit"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={errors.stt_pass_digit}
                                            touched={touched.stt_pass_digit}
                                            type='number'
                                            noBorderValidation
                                            value={values.stt_pass_digit}
                                            value={values.stt_pass_digit}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <InputBox
                                            label="Special Characters"
                                            type='number'
                                            name="stt_pass_special_char"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            noBorderValidation
                                            errorMessage={errors.stt_pass_special_char}
                                            touched={touched.stt_pass_special_char}
                                            type='number'
                                            value={values.stt_pass_special_char}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <InputBox
                                            label="Capital Letters"
                                            type='number'
                                            name="stt_pass_capital_char"
                                            onInputChange={handleChange}
                                            onBlur={handleBlur}
                                            noBorderValidation
                                            errorMessage={errors.stt_pass_capital_char}
                                            touched={touched.stt_pass_capital_char}
                                            type='number'
                                            value={values.stt_pass_capital_char}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={2}>
                                        <SPButton
                                            title="Update"
                                            size="small"
                                            type="submit"
                                            onButtonClick={handleSubmit}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </>}
            </StylesBoxSessions>
        </>)
}
const mapStateToProps = state => ({
    sessionPassword: state.administration.accessControlList?.sessionPassword,
    isLoading: state.administration.accessControlList?.isFieldLoading
});

const mapDispatchToProps = dispatch => ({
    onGetSessionPassword: () => dispatch(getSessionPassword()),
    onUpdateSessionPassword: (...args) => dispatch(getSessionPasswordUpdate(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(SessionsPassword);
