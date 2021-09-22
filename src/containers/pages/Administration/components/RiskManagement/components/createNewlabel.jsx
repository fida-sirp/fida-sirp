import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';


function CreateNewLable({ recordValue, submit, closeDrawer, isVisible, isCreate }) {
    const [formInitialValues, setFormInitialValues] = useState({
        lhv_name: '',
        lhv_value: '',
    });

    let validationSchemaStandard = Yup.object({
        lhv_name: Yup.string().required('Required'),
        lhv_value: Yup.string().required('Required'),
    });

    useEffect(() => {
        let initialValues = {};
        if (!_.isEmpty(recordValue)) {
            initialValues['lhv_name'] = recordValue?.lhv_name;
            initialValues['lhv_value'] = recordValue?.lhv_value;
            setFormInitialValues(initialValues);
        } else {
            setFormInitialValues({
                lhv_name: '',
                lhv_value: '',
            })
        }
    }, [recordValue]);

    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    submit(values);
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
                            <InputBox
                                id={'lhv_name'}
                                label={'Name'}
                                name={'lhv_name'}
                                placeholder={'Name'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lhv_name}
                                errorMessage={errors.lhv_name}
                                touched={touched.lhv_name}
                                noBorderValidation
                            />
                            <InputBox
                                type="number"
                                id={'lhv_value'}
                                label={'Value'}
                                name={'lhv_value'}
                                placeholder={'Value'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lhv_value}
                                errorMessage={errors.lhv_value}
                                touched={touched.lhv_value}
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
                                        title={isCreate ? "Save" : "Update"}
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
        </div >
    );
}

export default CreateNewLable;
