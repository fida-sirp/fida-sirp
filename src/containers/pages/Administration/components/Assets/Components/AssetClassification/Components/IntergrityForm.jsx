import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isEmpty } from 'lodash';
import InputBox from '../../../../../../../../components/InputBox';
import SPToggleSwitch from '../../../../../../../../components/SPToggleSwitch';


function IntegrityForm({ record, submit, onClose, isEditForm, isVisible }) {

    const initialValues = {
        ing_name: record?.ing_name || '',
        ing_value: record?.ing_value || '',
    }

    const validationSchema = Yup.object({
        ing_name: Yup.string().required('This Field is required'),
        ing_value: Yup.number().required('This Field is required')
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                submit(values)
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
                            id={'ing_name'}
                            label={'Name'}
                            name={'ing_name'}
                            placeholder={'Name'}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ing_name}
                            errorMessage={errors.ing_name}
                            touched={touched.ing_name}
                            noBorderValidation
                        />
                        <InputBox
                            id={'ing_value'}
                            label="Value"
                            name={'ing_value'}
                            placeholder="Value"
                            type="Number"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ing_value}
                            errorMessage={errors.ing_value}
                            touched={touched.ing_value}
                            noBorderValidation
                        />
                        <Row gutter={11} justify="end">
                            <Col>
                                <SPButton
                                    title="Cancel"
                                    size="small"
                                    type="secondary"
                                    onButtonClick={() => {
                                        resetForm();
                                        onClose();
                                    }}
                                />
                            </Col>
                            <Col>
                                <SPButton
                                    title={isEditForm ? "Update" : "Create"}
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
    );
}

export default IntegrityForm

