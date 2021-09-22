import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';

function ControlRegisterFormDrawer({ changeHandler, closeDrawer, isVisible, recordValue }) {

    const [formInitialValues, setFormInitialValues] = useState({
        lhv_label: recordValue?.lhv_label || '',
        lhv_short: recordValue?.lhv_short || '',
    });

    let validationSchemaStandard = Yup.object({
        lhv_label: Yup.string().required('Required'),
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
                                id={'lhv_label'}
                                label={'Title'}
                                name={'lhv_label'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lhv_label}
                                errorMessage={errors.lhv_label}
                                touched={touched.lhv_label}
                                noBorderValidation
                            />

                            <InputBox
                                id={'lhv_short'}
                                label={'Short'}
                                name={'lhv_short'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lhv_short}
                                errorMessage={errors.lhv_short}
                                touched={touched.lhv_short}
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
