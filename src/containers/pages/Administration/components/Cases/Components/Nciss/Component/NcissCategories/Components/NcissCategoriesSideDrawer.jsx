import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { administratorCasesNcissCategoryList } from '../../../../../../../../../../actions/administration'
import { compose } from 'redux'
import AuthTokenHOC from '../../../../../../../../../../HOCs/AuthTokenHOC';
import * as Yup from 'yup';
import InputBox from '../../../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'
import TextAreaBox from '../../../../../../../../../../components/TextAreaBox';


const statusOptions = [
    {
        key: 1,
        value: 'Enable',
        label: "Enable"
    },
    {
        key: 2,
        value: 'Disable',
        label: "Disable"
    }
];

const IncidentScoringSidebar = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler }) => {

    const validationSchema = Yup.object({
        nsc_name: Yup.string().required('Required')
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                nsc_name: type === "create" ? "" : selectedRecord?.nsc_name,
                nsc_value: type === "create" ? "" : selectedRecord?.nsc_value,
                nsc_status: type === "create" ? "" : selectedRecord?.nsc_status,
                nsc_description: type === "create" ? "" : selectedRecord?.nsc_description,
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {

                    onUpdateHandler(selectedRecord?.nsc_id, values);
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
                            id="nsc_name"
                            label="Name"
                            name="nsc_name"
                            placeholder="Name"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.nsc_name}
                            value={values.nsc_name}
                            touched={touched.nsc_name}
                        />
                        <InputBox
                            id="nsc_value"
                            label="Weight"
                            type="number"
                            name="nsc_value"
                            placeholder="Weight"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.nsc_value}
                            value={values.nsc_value}
                            touched={touched.nsc_value}
                        />
                        <TextAreaBox
                            id="nsc_descriptions"
                            label="Description"
                            name="nsc_description"
                            placeholder="Description"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.nsc_description}
                            value={values.nsc_description}
                            touched={touched.nsc_description}
                        />
                        <SelectBox
                            id="nsc_status_id"
                            label="Status"
                            name="nsc_status"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.nsc_status}
                            value={values.nsc_status}
                            touched={touched.nsc_status}
                            options={statusOptions}
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
    casesNcissDropDownList: state.administration?.casesNcissDropDownList
});
const mapDispatchToProps = dispatch => ({
    // onGetNcissCategory: () => dispatch(administratorCasesNcissCategoryList()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(IncidentScoringSidebar);
