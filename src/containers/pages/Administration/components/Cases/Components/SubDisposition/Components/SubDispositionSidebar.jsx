import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import { administratorSubCasesDispositionsDropdownList } from '../../../../../../../../actions/administration'
import { compose } from 'redux'
import * as Yup from 'yup';
import InputBox from '../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../components/SelectBox';
import { Row, Col } from 'antd'
import FieldEditor from '../../../../../../../../components/FieldEditor';



const CategorySidebar = ({ type, selectedRecord, isVisible, OnGetSubdispositionsDropdownList, subdispositionsDropdownList, onCreateHandler, onUpdateHandler }) => {
    const [dispositionsListItem, setDispositionsListItem] = useState([])


    useEffect(() => {
        OnGetSubdispositionsDropdownList()
    }, [OnGetSubdispositionsDropdownList])

    useEffect(() => {
        const listData = subdispositionsDropdownList?.listData;
        const DispositionsList = [];
        if (listData && _.isObject(listData)) {
            for (const [key, value] of Object.entries(listData)) {
                DispositionsList.push({
                    key,
                    value: parseInt(key, 10),
                    label: value
                })
            }
        }
        setDispositionsListItem(DispositionsList)
    }, [subdispositionsDropdownList]);

    const validationSchema = Yup.object({
        dsc_name: Yup.string().required('Required'),
    });
    return (
        <Formik
            id="formik"
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
                dsc_name: type === "create" ? "" : selectedRecord?.dsc_name,
                dsc_parent_id: type === "create" ? "" : selectedRecord?.dsc_parent_id,
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.dsc_id, values)
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
                            id="dsc_name"
                            name="dsc_name"
                            placeholder="Name"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.dsc_name}
                            value={values.dsc_name}
                            touched={touched.dsc_name}
                        />
                        <SelectBox
                            id="dsc_parent_id"
                            name="dsc_parent_id"
                            placeholder="Select Dispositions"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.dsc_parent_id}
                            value={values.dsc_parent_id}
                            touched={touched.dsc_parent_id}
                            options={dispositionsListItem}
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
    subdispositionsDropdownList: state.administration?.subDispositionsDropdownList
});
const mapDispatchToProps = dispatch => ({
    OnGetSubdispositionsDropdownList: () => dispatch(administratorSubCasesDispositionsDropdownList())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(CategorySidebar);