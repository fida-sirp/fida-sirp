import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import { administratorCasesPrimarySubCategoryCreate } from '../../../../../../../../actions/administration'
import { compose } from 'redux'
import * as Yup from 'yup';
import InputBox from '../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'
import FieldEditor from '../../../../../../../../components/FieldEditor';
import TextAreaBox from '../../../../../../../../components/TextAreaBox';



const CategorySidebar = ({ type, selectedRecord, isVisible, onGetPrimaryCategory, primarySubcategoriesList, onCreateHandler, onUpdateHandler }) => {
    const [primaryCatList, setPrimaryCatList] = useState([])

    useEffect(() => {
        onGetPrimaryCategory()
    }, [onGetPrimaryCategory])

    useEffect(() => {
        const listData = primarySubcategoriesList?.listData;
        const PrimaryCatgoryList = [];
        if (listData && _.isObject(listData)) {
            Object.entries(listData).map(([key, value]) => {
                PrimaryCatgoryList.push({
                    key,
                    value: parseInt(key, 10),
                    label: value
                })
            })
        }
        setPrimaryCatList(PrimaryCatgoryList)
    }, [primarySubcategoriesList]);

    const validationSchema = Yup.object({
        msc_name: Yup.string().required('Required'),
        msc_main_category: Yup.string().required('Required')
    });
    return (
        <Formik
            id="formik"
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
                msc_main_category: type === "create" ? "" : selectedRecord?.msc_main_category,
                msc_name: type === "create" ? "" : selectedRecord?.msc_name,
                msc_desc: type === "create" ? "" : selectedRecord?.msc_desc,
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.msc_id, values)
                } else {
                    onCreateHandler(values)
                }
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
                    resetForm();
                }, [isVisible]);
                return (
                    <Form onSubmit={handleSubmit}>
                        <SelectBox
                            id="msc_main_category"
                            label="Primary Category"
                            name="msc_main_category"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.msc_main_category}
                            value={values.msc_main_category}
                            touched={touched.msc_main_category}
                            options={primaryCatList}
                        />


                        <InputBox
                            id="msc_name"
                            label="Name"
                            name="msc_name"
                            placeholder="Name"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.msc_name}
                            value={values.msc_name}
                            touched={touched.msc_name}
                        />
                        <TextAreaBox
                            id="msc_desc"
                            label="Description"
                            name="msc_desc"
                            placeholder="Description"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.msc_desc}
                            value={values.msc_desc}
                            touched={touched.msc_desc}
                        />
                        <Col style={{ marginTop: 20 }}>
                            <SPButton
                                title={type === "create" ? 'Create' : 'Update'}
                                type="submit"
                                width={500}
                                onButtonClick={handleSubmit}
                            />
                        </Col>
                    </Form>
                );
            }}
        </Formik >
    )
}
const mapStateToProps = state => ({
    primarySubcategoriesList: state.administration?.primarySubCategoryList
});
const mapDispatchToProps = dispatch => ({
    onGetPrimaryCategory: () => dispatch(administratorCasesPrimarySubCategoryCreate()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(CategorySidebar);