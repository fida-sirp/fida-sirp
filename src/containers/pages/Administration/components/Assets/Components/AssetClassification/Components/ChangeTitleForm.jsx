import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../../../components/InputBox';

function ControlRegisterFormDrawer({ changeHandler, closeDrawer, isVisible, changeTitleHandler, title }) {

    const initialValues = {
        asc_label: title || "",
    }

    let validationSchemaStandard = Yup.object({
        asc_label: Yup.string().required('Required'),
    });

    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    changeTitleHandler(values);
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
                            <InputBox
                                id={'asc_label'}
                                label={'Title'}
                                name={'asc_label'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.asc_label}
                                errorMessage={errors.asc_label}
                                touched={touched.asc_label}
                                noBorderValidation
                            />
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
                                        title="Update"
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

export default ControlRegisterFormDrawer;
