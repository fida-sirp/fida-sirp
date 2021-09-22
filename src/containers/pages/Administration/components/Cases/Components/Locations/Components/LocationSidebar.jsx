import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import { administratorCasesCategoryDisposition } from '../../../../../../../../actions/administration'
import { compose } from 'redux'
import * as Yup from 'yup';
import InputBox from '../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../components/SPButton';
import TextAreaBox from '../../../../../../../../components/TextAreaBox';
import { Col } from 'antd'


const DetectionMethodSidebar = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler }) => {

    const validationSchema = Yup.object({
        loc_name: Yup.string().required('Required'),
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                loc_name: type === "create" ? "" : selectedRecord?.loc_name,
                loc_longitude: type === "create" ? "" : selectedRecord?.loc_longitude,
                loc_latitude: type === "create" ? "" : selectedRecord?.loc_longitude,
                loc_desc: type === "create" ? "" : selectedRecord?.loc_desc
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.loc_id, values);
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
                        <InputBox
                            id="loc_name"
                            label="Name"
                            name="loc_name"
                            placeholder="Title"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.loc_name}
                            value={values.loc_name}
                            touched={touched.loc_name}
                        />
                        <InputBox
                            id="loc_longitude"
                            label="Longitude"
                            type="number"
                            name="loc_longitude"
                            placeholder="Longitude"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.loc_longitude}
                            value={values.loc_longitude}
                            touched={touched.loc_longitude}
                        />
                        <InputBox
                            id="loc_latitude"
                            label="Latitude"
                            name="loc_latitude"
                            placeholder="Latitude"
                            type="number"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.loc_latitude}
                            value={values.loc_latitude}
                            touched={touched.loc_latitude}
                        />
                        <TextAreaBox
                            id="loc_desc"
                            label="Description"
                            name="loc_desc"
                            placeholder="Description"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.loc_desc}
                            value={values.loc_desc}
                            touched={touched.loc_desc}
                        />
                        <Col style={{ marginTop: 20 }}>
                            <SPButton
                                title={type === "create" ? 'Create' : "Update"}
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
    categoriesDispositionsList: state.administration?.categorydispositionList
});
const mapDispatchToProps = dispatch => ({
    onGetDisposition: () => dispatch(administratorCasesCategoryDisposition()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(DetectionMethodSidebar);