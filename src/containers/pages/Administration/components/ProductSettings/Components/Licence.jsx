import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd'

import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { onGetLicencesInfo, onPatchLicenseRequest, onPostProductDetails, uploadLicenseInfo } from '../../../../../../actions/administration';
import { useHistory, useParams } from 'react-router';
import { StylesBox } from '../../../StyledComponents';
import moment from 'moment';
import InputBox from '../../../../../../components/InputBox';
import SPUpload from '../../../../../../components/SPUpload';
import * as Yup from 'yup'
import SPModal from '../../../../../../components/SPModal';
import SPButton from '../../../../../../components/SPButton';
import SPDrawer from '../../../../../../components/SPDrawer';
import { Formik, Form, ErrorMessage } from 'formik';
import CreateLicence from './CreatLicence';
import _ from 'lodash';
import UploadLicence from './UploadLicence';
import styled from 'styled-components';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export const ErrorText = styled.div`
   color:#fc5a5a;
   font-size:13px;
   text-align:left;
   font-weight:700;
   margin-left:10px;
   margin-bottom:20px;
   margin-top:10px;
`

const Licences = ({ getList, licencesList, OnuploadLicenseInfo, onCreateLicense, onPathLicense,access }) => {
    const history = useHistory();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [record, setRecord] = useState({});
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [licenceValue, setLicenceValue] = useState({})
    const [fileDimentions, setFileDimentions] = useState({});
    const [query, setQuery] = useState(location.search);
    const { path } = useParams();

    useEffect(() => {
        setLicenceValue(licencesList?.items?.[0])
    }, [licencesList])

    useEffect(() => {
        getPublisherList();
    }, [query] || []);

    const getPublisherList = async () => {
        await getList();
    };

    const handleCreateLicence = (values) => {
        if (values.lic_issue_date) {
            values.lic_issue_date = moment(values.lic_issue_date).format(dateFormat)
        }
        if (values.lic_expiry_date) {
            values.lic_expiry_date = moment(values.lic_expiry_date).format(dateFormat)
        }
        if (values.lic_expiry_date) {
            values.lic_expiry_date = moment(values.lic_expiry_date).format(dateFormat)
        }
        if (values.lic_modules) {
            values.lic_modules = String(values.lic_modules).split(',')
        }
        onCreateLicense(values)
        setOpenDrawer(false)
    }
    const handleUploadLicences = (data) => {
        if (data) {
            OnuploadLicenseInfo(data)
        }
        setShowUploadModal(false)
    }
    const validationSchema = Yup.object({
        upload_patch: Yup.mixed().required("This Field is required").test('type', "Only the following formats are accepted: .zip", (value) => value && value.type === "application/zip")
    });
    return (
        <>
            <SPDrawer
                title={'Create License'}
                isVisible={openDrawer}
                onClose={() => {
                    setOpenDrawer(false);
                    setIsCreate(false);
                }}
            >
                <CreateLicence isVisible={openDrawer} submit={handleCreateLicence} onCloseDrawer={() => setOpenDrawer(false)} />
            </SPDrawer>
            <SPDrawer
                title="Add License"
                isVisible={showUploadModal}
                onClose={() => setShowUploadModal(false)}
            >
                <UploadLicence submit={handleUploadLicences} isVisible={showUploadModal} />
            </SPDrawer>

            <StylesBox noRadius fullWidth style={{ marginBottom: 100 }}>
                <Row>
                    <Col span={24} style={{ marginBottom: 20 }}>
                        <h4 style={{ color: "#fff", fontSize: 20 }}>LICENSE INFORMATION</h4>
                    </Col>
                </Row>
                <div style={{ padding: 15 }}>
                    <Row gutter={15}>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Customer Name:'}
                                placeholder={''}
                                value={licenceValue?.lic_organization_name}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Version:'}
                                placeholder={''}
                                value={licenceValue?.details?.version}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Build::'}
                                value={licenceValue?.details?.build}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Total Playbooks:'}
                                value={"Unlimited"}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Total Ingestion Sources:'}
                                value={licenceValue?.lic_ingestion_sources}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Total Users:'}
                                value={licenceValue?.lic_users}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Remaining Users:'}
                                value={licenceValue?.details?.remaining_users}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Valid Until:'}
                                value={licenceValue?.details?.valid_until}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <InputBox
                                id={'gra_name'}
                                label={'Plan::'}
                                value={""}
                                disabled={true}
                                noBorderValidation
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Formik
                            id="formik"
                            validationSchema={validationSchema}
                            initialValues={{
                                upload_patch: undefined
                            }}
                            enableReinitialize
                            onSubmit={(values, { resetForm }) => {
                                var FormData = require('form-data');
                                var data = new FormData();
                                data.append('upload_patch', values.upload_patch)
                                onPathLicense(data)
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

                                return (
                                    (access!==undefined && (access.includes("all-super-admin") || access.includes("patch-license"))) &&
                                    <Form>
                                        <SPUpload
                                            width={400}
                                            id="upload_patch"
                                            label="Upload Patch"
                                            name="upload_patch"
                                            touched={touched.upload_patch}
                                            value={values.upload_patch}
                                            errorMessage={errors.upload_patch}
                                            onInputChange={(name, file) => {
                                                setFieldValue(name, file);
                                            }}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                        <ErrorMessage name="upload_patch" render={msg => <ErrorText>{msg}</ErrorText>} />
                                        <SPButton
                                            title={"Patch"}
                                            size="small"
                                            type="submit"
                                            style={{ width: 70 }}
                                            onButtonClick={handleSubmit}
                                        />
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Row>
                    <Row justify="end">
                        <Col style={{ display: "flex" }}>
                            <div style={{ marginRight: 15 }} >
                                {(access!==undefined && (access.includes("all-super-admin") || access.includes("upload-license"))) &&
                                <SPButton
                                    title="Upload Licences"
                                    size="small"
                                    type="primary"
                                    onButtonClick={() => setShowUploadModal(true)}
                                /> }
                            </div>
                            <div>
                                {(access!==undefined && (access.includes("all-super-admin") || access.includes("create-license"))) &&
                                <SPButton
                                    title="Create License"
                                    size="small"
                                    type="primary"
                                    onButtonClick={() => {
                                        setOpenDrawer(true)
                                    }}
                                />}
                            </div>
                        </Col>
                    </Row>
                </div>

            </StylesBox>
        </>
    );
};

const mapStateToProps = state => ({
    licencesList: state.administration?.productSettingList?.licenseInfo,
});

const mapDispatchToProps = dispatch => ({
    getList: () => dispatch(onGetLicencesInfo()),
    OnuploadLicenseInfo: (...args) => dispatch(uploadLicenseInfo(...args)),
    onCreateLicense: (...args) => dispatch(onPostProductDetails(...args)),
    onPathLicense: (...args) => dispatch(onPatchLicenseRequest(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(Licences);
