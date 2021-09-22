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

const IncidentScoringSidebar = ({ type, selectedRecord, isVisible, onCreateHandler, onUpdateHandler, onGetNcissCategory, casesNcissDropDownList }) => {
    const [ncssisDropDownListItem, setNcssisDropDownListItem] = useState([])

    useEffect(() => {
        onGetNcissCategory()
    }, [onGetNcissCategory])

    useEffect(() => {
        const listData = casesNcissDropDownList?.listData;
        const NcissDatalist = [];
        if (listData && _.isObject(listData)) {
            Object.entries(listData).map(([key, value]) => {
                NcissDatalist.push({
                    key,
                    value: parseInt(key, 10),
                    label: value
                })
            })
        }
        setNcssisDropDownListItem(NcissDatalist)
    }, [casesNcissDropDownList]);

    const validationSchema = Yup.object({
        nom_name: Yup.string().required('Required')
    });
    return (
        <Formik
            id="formik"
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                nom_name: type === "create" ? "" : selectedRecord?.nom_name,
                nom_value: type === "create" ? "" : selectedRecord?.nom_value,
                nsc_id: type === "create" ? "" : selectedRecord?.nsc?.nsc_id
            }}
            onSubmit={(values, { resetForm }) => {
                if (type === 'edit') {
                    onUpdateHandler(selectedRecord?.nom_id, values);
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
                            id="nom_name"
                            label="Name"
                            name="nom_name"
                            placeholder="Name"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.nom_name}
                            value={values.nom_name}
                            touched={touched.nom_name}
                        />
                        <InputBox
                            id="nom_value"
                            label="Value"
                            type="number"
                            name="nom_value"
                            placeholder="Value"
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.nom_value}
                            value={values.nom_value}
                            touched={touched.nom_value}
                        />
                        <SelectBox
                            id="nsc_id"
                            label="NCISS Category"
                            name="nsc_id"
                            onInputChange={setFieldValue}
                            onBlur={handleBlur}
                            errorMessage={errors.nsc_id}
                            value={values.nsc_id}
                            touched={touched.nsc_id}
                            options={ncssisDropDownListItem}
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
    onGetNcissCategory: () => dispatch(administratorCasesNcissCategoryList()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(IncidentScoringSidebar);
