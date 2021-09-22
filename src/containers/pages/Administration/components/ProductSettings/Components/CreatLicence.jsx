import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import { Formik, Form } from 'formik'
import SelectBox from '../../../../../../components/SelectBox';
import SPDatepicker from '../../../../../../components/SPDatepicker';
import moment from 'moment';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getModuleSources } from '../../../../../../actions/administration';

function CreateLicences({ submit, onCloseDrawer, sourcesList, isVisible, onGetModuleSources, onPostUpload }) {

    const [notifyUsersOptions, setNotifiyUserOptions] = useState([]);
    const [sourceList, setSourceList] = useState([]);

    useEffect(() => {
        onGetModuleSources()
    }, [onGetModuleSources])

    useEffect(() => {
        if (!_.isEmpty(sourcesList)) {
            const sourceArray = [];
            if (Object.keys(sourcesList).length !== 0) {
                for (const [key, value] of Object.entries(sourcesList)) {
                    sourceArray.push({
                        key,
                        value: key,
                        label: value
                    })
                }
            }
            setSourceList(sourceArray)
        }
    }, [sourcesList])

    let validationSchemaStandard = Yup.object({
        lic_organization_name: Yup.string().required('Required'),
        lic_users: Yup.number().required('Required'),
        lic_playbooks: Yup.number().required('Required'),
        lic_ingestion_sources: Yup.number().required('Required'),
        lic_poc_email: Yup.string().email('Invalid Email Format').required('Required'),
        lic_issue_date: Yup.string().required('Required').nullable(),
        lic_expiry_date: Yup.string().required('Required').nullable()
    });

    const initialValues = {
        lic_organization_name: "",
        lic_poc_name: "",
        lic_poc_email: "",
        lic_poc_number: "",
        lic_modules: [],
        lic_users: "",
        lic_playbooks: "",
        lic_ingestion_sources: "",
        lic_issue_date: moment() || "",
        lic_expiry_date: moment() || ""
    }
    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    submit(values)
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
                            <InputBox
                                id={'lic_organization_name'}
                                label={'Organization Name'}
                                name={'lic_organization_name'}
                                placeholder={''}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_organization_name}
                                errorMessage={errors.lic_organization_name}
                                touched={touched.lic_organization_name}
                                noBorderValidation
                            />
                            <InputBox
                                id={'lic_poc_name'}
                                label={'POC Name'}
                                name={'lic_poc_name'}
                                placeholder={'POC Name'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_poc_name}
                                errorMessage={errors.lic_poc_name}
                                touched={touched.lic_poc_name}
                                noBorderValidation
                            />
                            <InputBox
                                id={'lic_poc_email'}
                                label={'POC Email'}
                                name={'lic_poc_email'}
                                placeholder={'POC Email'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_poc_email}
                                errorMessage={errors.lic_poc_email}
                                touched={touched.lic_poc_email}
                                noBorderValidation
                            />
                            <InputBox
                                id={'lic_poc_number'}
                                label={'POC Number'}
                                name={'lic_poc_number'}
                                placeholder={'POC Number'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_poc_number}
                                errorMessage={errors.lic_poc_number}
                                touched={touched.lic_poc_number}
                                noBorderValidation
                            />

                            <SelectBox
                                id="lic_modules"
                                label="Modules"
                                name="lic_modules"
                                mode="multiple"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.lic_modules}
                                value={values.lic_modules}
                                touched={touched.lic_modules}
                                options={sourceList}
                                width={750}
                            />
                            <InputBox
                                type="number"
                                id={'lic_users'}
                                label={'Total Users'}
                                name={'lic_users'}
                                placeholder={'Total Users'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_users}
                                errorMessage={errors.lic_users}
                                touched={touched.lic_users}
                                noBorderValidation
                            />
                            <InputBox
                                type="number"
                                id={'lic_playbooks'}
                                label={'Playbooks'}
                                name={'lic_playbooks'}
                                placeholder={'Playbooks'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_playbooks}
                                errorMessage={errors.lic_playbooks}
                                touched={touched.lic_playbooks}
                                noBorderValidation
                            />
                            <InputBox
                                type="number"
                                id={'lic_ingestion_sources'}
                                label={'Ingestion Sources'}
                                name={'lic_ingestion_sources'}
                                placeholder={'Ingestion Sources'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_ingestion_sources}
                                errorMessage={errors.lic_ingestion_sources}
                                touched={touched.lic_ingestion_sources}
                                noBorderValidation
                            />
                            <SPDatepicker
                                id="lic_issue_date"
                                label="De-active Date"
                                name="lic_issue_date"
                                placeholder="received date"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={moment(values.lic_issue_date)}
                                errorMessage={errors.lic_issue_date}
                                noBorderValidation
                                disabled={isSubmitting}
                                touched={touched.lic_issue_date}
                            />
                            <SPDatepicker
                                id="lic_expiry_date"
                                label="De-active Date"
                                name="lic_expiry_date"
                                placeholder="received date"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                value={moment(values.lic_expiry_date)}
                                errorMessage={errors.lic_expiry_date}
                                noBorderValidation
                                disabled={isSubmitting}
                                touched={touched.lic_expiry_date}
                            />
                            <InputBox
                                type="number"
                                id={'lic_grace'}
                                label={'Grace Days'}
                                name={'lic_grace'}
                                placeholder={'Grace Days'}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lic_grace}
                                errorMessage={errors.lic_grace}
                                touched={touched.lic_grace}
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
        </div>
    );
}


const mapStateToProps = state => ({
    sourcesList: state.administration?.productSettingList?.licenseSources
});

const mapDispatchToProps = dispatch => ({
    onGetModuleSources: () => dispatch(getModuleSources()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(CreateLicences);
