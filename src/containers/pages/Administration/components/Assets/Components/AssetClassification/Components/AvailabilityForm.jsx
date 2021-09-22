import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isEmpty } from 'lodash';
import InputBox from '../../../../../../../../components/InputBox';
import SPToggleSwitch from '../../../../../../../../components/SPToggleSwitch';


function ConfidentialityForm({ record, submit, onClose, isEditForm, isVisible }) {

    const initialValues = {
        avl_name: record?.avl_name || '',
        avl_value: record?.avl_value || '',
    }

    const validationSchema = Yup.object({
        avl_name: Yup.string().required('This Field is required'),
        avl_value: Yup.number().required('This Field is required')
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
                            id={'avl_name'}
                            label={'Name'}
                            name={'avl_name'}
                            placeholder={'Name'}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.avl_name}
                            errorMessage={errors.avl_name}
                            touched={touched.avl_name}
                            noBorderValidation
                        />
                        <InputBox
                            id={'avl_value'}
                            label="Value"
                            name={'avl_value'}
                            placeholder="Value"
                            type="Number"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.avl_value}
                            errorMessage={errors.avl_value}
                            touched={touched.avl_value}
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

export default ConfidentialityForm

