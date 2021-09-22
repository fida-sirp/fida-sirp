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
        con_name: record?.con_name || '',
        con_value: record?.con_value || '',
    }

    const validationSchema = Yup.object({
        con_name: Yup.string().required('This Field is required'),
        con_value: Yup.number().required('This Field is required')
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
                            id={'con_name'}
                            label={'Name'}
                            name={'con_name'}
                            placeholder={'Name'}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.con_name}
                            errorMessage={errors.con_name}
                            touched={touched.con_name}
                            noBorderValidation
                        />
                        <InputBox
                            id={'con_value'}
                            label="Value"
                            name={'con_value'}
                            placeholder="Value"
                            type="Number"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            value={values.con_value}
                            errorMessage={errors.con_value}
                            touched={touched.con_value}
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

