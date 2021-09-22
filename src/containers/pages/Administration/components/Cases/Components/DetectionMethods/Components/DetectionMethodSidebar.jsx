import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import { administratorCasesCategoryDisposition } from '../../../../../../../../actions/administration'
import { compose } from 'redux'
import * as Yup from 'yup';
import InputBox from '../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'

const DetectionMethodSidebar = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler, onGetDisposition, categoriesDispositionsList }) => {
    const [dispositionList, setDispositionList] = useState([])

    // useEffect(() => {
    //     onGetDisposition()
    // }, [onGetDisposition])


    const validationSchema = Yup.object({
        iat_name: Yup.string().required('Required'),
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                iat_name: type === "create" ? "" : selectedRecord?.iat_name
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.iat_id, values);
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
                            id="iat_name"
                            label="Name"
                            name="iat_name"
                            placeholder="Title"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.iat_name}
                            value={values.iat_name}
                            touched={touched.iat_name}
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