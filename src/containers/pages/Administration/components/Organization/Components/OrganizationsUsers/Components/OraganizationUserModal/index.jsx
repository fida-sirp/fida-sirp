import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { createOraganizationUser, updateOraganizationUser } from '../../../../../../../../../actions/administration'
import { getCategories } from '../../../../../../../../../actions/threatIntelligence'
import AuthTokenHOC from '../../../../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux'
import * as Yup from 'yup';
import InputBox from '../../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'



const OraganizationUserModal = ({ isVisible, onClose, type, oraganizationMemeberList, oraganizationsList, createOraganizationUser, selectedOraganaiationUser, updateOraganiztaionUser }) => {
    const [memberList, setMemberLIst] = useState([])
    const [oraganiationList, setOragnizationList] = useState([]);

    useEffect(() => {
        const listData = oraganizationMemeberList?.listData;
        const MemberList = [];
        if (listData && Object.keys(listData).length !== 0) {
            for (const [key, value] of Object.entries(listData)) {
                MemberList.push({
                    key,
                    value: parseInt(key, 10),
                    label: value,
                })
            }
        }
        setMemberLIst(MemberList)
    }, [oraganizationMemeberList]);
    useEffect(() => {
        const listData = oraganizationsList?.listData;
        const oraganizationList = [];
        if (listData && Object.keys(listData).length !== 0) {
            for (const [key, value] of Object.entries(listData)) {
                oraganizationList.push({
                    key,
                    value: parseInt(key, 10),
                    label: value,
                })
            }
        }
        setOragnizationList(oraganizationList)
    }, [oraganizationsList]);
    useEffect(() => {
        const listData = oraganizationMemeberList?.listData;
        const MemberList = [];
        if (listData && Object.keys(listData).length !== 0) {
            for (const [key, value] of Object.entries(listData)) {
                MemberList.push({
                    key,
                    value: parseInt(key, 10),
                    label: value,
                })
            }
        }
        setMemberLIst(MemberList)
    }, [oraganizationMemeberList]);


    const refactorData = (data) => {
        if (data && _.isObject(data)) {
            return Object.keys(data).map((item) => parseInt(item, 10))
        }
        return [];
    }

    const validationSchema = Yup.object({
        ogu_userId: Yup.string().required('This Field is required'),
    });
    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                ogu_userId: type === "create" ? "" : selectedOraganaiationUser?.ogu_userId || [],
                ogu_organizations: type === "create" ? [] : refactorData(selectedOraganaiationUser?.selectedOrganizations) || [],
            }}
            onSubmit={(values, { resetForm }) => {
                if (values.ogu_organizations) {
                    values = { ...values, ogu_organizations: (values.ogu_organizations).toString() };
                }
                if (type === 'edit') {
                    updateOraganiztaionUser(selectedOraganaiationUser?.ogu_id, values);
                } else {
                    createOraganizationUser(values)
                }
                resetForm();
                onClose()
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
                    resetForm();
                }, [isVisible]);
                return (
                    <Form onSubmit={handleSubmit}>
                        <Col span={24}>
                            <SelectBox
                                id="ogu_userId "
                                label="User"
                                placeholder='User'
                                name="ogu_userId"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.ogu_userId}
                                value={values.ogu_userId}
                                touched={touched.ogu_userId}
                                options={memberList}
                                width={600}
                            />
                        </Col>
                        <Col span={24}>
                            <SelectBox
                                id="ogu_organizations"
                                label="Organizations"
                                name="ogu_organizations"
                                mode="multiple"
                                placeholder="Organizations"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.ogu_organizations}
                                value={values.ogu_organizations}
                                touched={touched.ogu_organizations}
                                options={oraganiationList}
                                width={600}
                            />
                        </Col>
                        <SPButton
                            title={type === "create" ? 'Create' : "Update"}
                            type="submit"
                            size="small"
                            onButtonClick={handleSubmit}
                        />
                    </Form>
                );
            }}
        </Formik >
    )
}
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
    onCreateOrganization: (...args) => dispatch(createOraganizationUser(...args)),
    onUpdateOrganization: (...args) => dispatch(updateOraganizationUser(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(OraganizationUserModal);