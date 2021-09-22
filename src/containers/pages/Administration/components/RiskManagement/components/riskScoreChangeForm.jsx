import React, { isValidElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';

function RiskscoreChangeForm({ changeHandler, closeDrawer, isVisible, riskScore }) {
    const [formInitialValues, setFormInitialValues] = useState({
        rks_label: riskScore?.rks_label || '',
    });
    let validationSchemaStandard = Yup.object({
        rks_label: Yup.string().required('Required'),
    });

    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    changeHandler(values);
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
                    resetForm,
                }) => {
                    useEffect(() => {
                        resetForm()
                    }, [isVisible])
                    return ((
                        <Form>
                            <InputBox
                                id={'rks_label'}
                                label={'Title'}
                                name={'rks_label'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rks_label}
                                errorMessage={errors.rks_label}
                                touched={touched.rks_label}
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
                    ))
                }}
            </Formik>
        </div>
    );
}

export default RiskscoreChangeForm;



