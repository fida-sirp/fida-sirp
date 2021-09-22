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

const CategorySidebar = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler, onGetDisposition, categoriesDispositionsList }) => {
    const [dispositionList, setDispositionList] = useState([])

    useEffect(() => {
        onGetDisposition()
    }, [onGetDisposition])

    useEffect(() => {
        const listData = categoriesDispositionsList?.listData;
        const DispositionList = [];
        if (listData && Object.keys(listData).length !== 0) {
            for (const [k, v] of Object.entries(listData)) {
                _.isObject(v) && _.map(v, (value) => {
                    DispositionList.push({
                        key: value,
                        value,
                        label: value,
                    })
                })

            }
        }
        setDispositionList(DispositionList)
    }, [categoriesDispositionsList]);

    const validationSchema = Yup.object({
        ica_name: Yup.string().required('Required'),
    });

    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                ica_name: type === "create" ? "" : selectedRecord?.ica_name,
                ica_type: type === "create" ? "" : selectedRecord?.ica_type,
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.ica_id, values);
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
                            id="ica_name"
                            label="Name"
                            name="ica_name"
                            placeholder="Title"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.ica_name}
                            value={values.ica_name}
                            touched={touched.ica_name}
                        />
                        <SelectBox
                            id="ica_type "
                            label="Type"
                            name="ica_type"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.ica_type}
                            value={values.ica_type}
                            touched={touched.ica_type}
                            options={dispositionList}
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
        </Formik>
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
)(CategorySidebar);