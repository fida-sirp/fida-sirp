import React, { useEffect, useState } from 'react';
import SPButton from '../../../../../../components/SPButton';
import SPUpload from '../../../../../../components/SPUpload';
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import styled from 'styled-components';



const ErrorText = styled.div`
   color:#fc5a5a;
   font-size:13px;s
   text-align:left;
   font-weight:700;
   margin-left:10px;
   margin-bottom:20px;
   margin-top:10px;
`

function UploadLicence({ submit, isVisible }) {
    let validationSchemaStandard = Yup.object({
        upload: Yup.string().required('Required'),
    });
    const initialValues = {
        upload: undefined
    }

    return (
        <Formik
            id="formik"
            validationSchema={validationSchemaStandard}
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                var FormData = require('form-data');
                var data = new FormData();
                data.append('upload', values.upload)
                submit(data)
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
                        <SPUpload
                            width={400}
                            id="upload"
                            label="Upload"
                            name="upload"
                            touched={touched.upload}
                            value={values.upload}
                            errorMessage={errors.upload}
                            onInputChange={(name, file) => {
                                console.log(">>>name,file", { name, file })
                                setFieldValue(name, file);
                            }}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        />
                        <ErrorMessage name="upload" render={msg => <ErrorText>{msg}</ErrorText>} />
                        <SPButton
                            title={"Update"}
                            size="small"
                            style={{ width: 150 }}
                            type="submit"
                            onButtonClick={handleSubmit}
                        />
                    </Form>
                )
            }}
        </Formik>
    );
}

export default UploadLicence

