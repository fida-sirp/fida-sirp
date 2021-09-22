import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import SPUpload from '../../../../../../components/SPUpload';
import { Formik, Form, ErrorMessage } from 'formik'
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { administratorProductSettingNotify } from '../../../../../../actions/administration';
import { StylesBox } from '../../../StyledComponents';
import styled from 'styled-components';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FILE_WIDTH = 240;
const FILE_HEIGHT = 72;

export const ErrorText = styled.div`
   color:#fc5a5a;
   font-size:13px;
   text-align:left;
   font-weight:700;
   margin-left:10px;
   margin-bottom:20px;
   margin-top:10px;
`
function Restorebackup({ submit, onCloseDrawer, isVisible }) {
    let validationSchemaStandard = Yup.object({
        importedFile: Yup.mixed().required("This Field is required")
    });

    const initialValues = {
        importedFile: undefined
    }

    return (
        <StylesBox fullWidth>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    var FormData = require('form-data');
                    var data = new FormData();
                    data.append('importedFile', values.importedFile)
                    submit(data)
                    resetForm()
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
                                id="importedFile"
                                label="Upload"
                                name="importedFile"
                                touched={touched.importedFile}
                                value={values.importedFile}
                                errorMessage={errors.importedFile}
                                onInputChange={(name, file) => {
                                    setFieldValue(name, file);
                                }}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="importedFile" render={msg => <ErrorText>{msg}</ErrorText>} />
                            <Row gutter={11} justify="end" >
                                <Col>
                                    <SPButton
                                        title="Cancel"
                                        size="small"
                                        type="secondary"
                                        onButtonClick={() => {
                                            resetForm();
                                            onCloseDrawer();
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <SPButton
                                        title={"Create"}
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
        </StylesBox>
    );
}


const mapStateToProps = state => ({
    listOfNotifyUser: state.administration?.productSettingList?.notifyUser
});

const mapDispatchToProps = dispatch => ({
    onGetNotifiyUser: () => dispatch(administratorProductSettingNotify()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(Restorebackup);
