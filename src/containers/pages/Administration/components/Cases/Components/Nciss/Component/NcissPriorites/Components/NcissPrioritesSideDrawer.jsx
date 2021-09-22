import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { administratorCasesNcissCategoryList } from '../../../../../../../../../../actions/administration'
import { compose } from 'redux'
import AuthTokenHOC from '../../../../../../../../../../HOCs/AuthTokenHOC';
import * as Yup from 'yup';
import InputBox from '../../../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'


const NcissPrioritesSideDrawer = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler }) => {

    const validationSchema = Yup.object({
        npc_name: Yup.string().required('Required'),
        npc_level: Yup.number().required('Required')
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                npc_name: type === "create" ? "" : selectedRecord?.npc_name,
                npc_level: type === "create" ? "" : selectedRecord?.npc_level,
                npc_color: type === "create" ? "#000000" : selectedRecord?.npc_color,
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.npc_id, values);
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
                            id="npc_name"
                            label="Name"
                            name="npc_name"
                            placeholder="Name"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.npc_name}
                            value={values.npc_name}
                            touched={touched.npc_name}
                        />
                        <InputBox
                            id="npc_level"
                            label="Level"
                            type="number"
                            name="npc_level"
                            placeholder="Level"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.npc_level}
                            value={values.npc_level}
                            touched={touched.npc_level}
                        />
                        <Row>
                            <Col span={18}>
                                <InputBox
                                    id="npc_color"
                                    label="Color"
                                    name="npc_color"
                                    placeholder="Color"
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={errors.npc_color}
                                    value={values.npc_color}
                                    touched={touched.npc_color}
                                />
                            </Col>
                            <Col span={6} style={{ display: "flex", alignItems: "center", justifyItems: "flex-end", justifyContent: "center", paddingTop: 10 }}>
                                <Field type="color" id="npc_color" name="npc_color" value={values.npc_color} />
                            </Col>
                        </Row>
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
    // casesNcissDropDownList: state.administration?.casesNcissDropDownList
});
const mapDispatchToProps = dispatch => ({
    // onGetNcissCategory: () => dispatch(administratorCasesNcissCategoryList()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(NcissPrioritesSideDrawer);
