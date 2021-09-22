import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik'
import InputBox from '../../../../../../../../../components/InputBox';
import SPButton from '../../../../../../../../../components/SPButton';
import SelectBox from '../../../../../../../../../components/SelectBox';
import SPDatepicker from '../../../../../../../../../components/SPDatepicker';
import * as Yup from 'yup';
import SPUpload from '../../../../../../../../../components/SPUpload';
import { Row, Col } from 'antd'
import moment from 'moment';
import { ErrorText } from '../../../../StyledComponents'

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FILE_WIDTH = 240;
const FILE_HEIGHT = 72;
const statusOptions = [
    {
        key: 1,
        value: 'Active',
        label: 'Active'
    },
    {
        key: 2,
        value: 'Deactive',
        label: 'Deactive'
    },
];

const EditOrg = ({ selectedRecord, onUpdateOraganization, isVisible }) => {
    const [fileDimentions, setFileDimentions] = useState({});
    const validationSchema = Yup.object({
        org_name: Yup.string().required('This Field is required'),
        image: Yup.mixed().test("This Field is required", "Image (Logo dimensions must be 240 * 72 pixels)", (file) => {
            if (file) {
                return fileDimentions && fileDimentions.width === FILE_WIDTH && fileDimentions.height === FILE_HEIGHT;
            } else {
                return true;
            }
        })
    });


    return (
        <Formik
            id="formik"
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
                org_name: selectedRecord?.org_name || "",
                org_short: selectedRecord?.org_short || "",
                org_status: selectedRecord?.org_status || "",
                org_deactive_date: selectedRecord?.org_deactive_date || moment(),
                org_key: selectedRecord?.org_key || "",
                image: ""
            }}
            onSubmit={(values, { resetForm }) => {
                var FormData = require('form-data');
                var data = new FormData();
                data.append('org_deactive_date', moment(values.org_deactive_date).format(dateFormat));
                data.append('org_name', values.org_name);
                data.append('org_key', values.org_key);
                data.append('org_short', values.org_short);
                data.append('org_status', values.org_status);
                if (values.image) {
                    data.append('image', values.image)
                }
                onUpdateOraganization(selectedRecord?.org_id, data)
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
                        <Row gutter={50}>
                            <Col span={12}>
                                <InputBox
                                    id="org_name"
                                    label="Name"
                                    name="org_name"
                                    placeholder="Name"
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={errors.org_name}
                                    value={values.org_name}
                                    touched={touched.org_name}
                                />
                            </Col>
                            <Col span={12}>
                                <InputBox
                                    id="org_short"
                                    label="Short Name"
                                    name="org_short"
                                    placeholder="Short Name"
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={errors.org_short}
                                    value={values.org_short}
                                    touched={touched.org_short}
                                />
                            </Col>
                        </Row>
                        <Row gutter={50} style={{ marginTop: 20 }}>
                            <Col span={12}>
                                <InputBox
                                    id="org_key"
                                    label="Key"
                                    name="org_key"
                                    placeholder="Key"
                                    onInputChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={errors.org_key}
                                    value={values.org_key}
                                    touched={touched.org_key}
                                />
                            </Col>
                            <Col span={12}>
                                <SPDatepicker
                                    id="org_deactive_date"
                                    label="De-active Date"
                                    name="org_deactive_date"
                                    placeholder="received date"
                                    onInputChange={setFieldValue}
                                    onBlur={handleBlur}
                                    value={moment(values.org_deactive_date)}
                                    errorMessage={errors.org_deactive_date}
                                    noBorderValidation
                                    disabled={isSubmitting}
                                    touched={touched.org_deactive_date}
                                />
                            </Col>
                        </Row>
                        <Row gutter={50} style={{ marginTop: 12 }}>
                            <Col span={12}>
                                <SelectBox
                                    id="org_status"
                                    label="Status"
                                    name="org_status"
                                    placeholder="Status"
                                    onInputChange={setFieldValue}
                                    onBlur={handleBlur}
                                    errorMessage={errors.org_status}
                                    value={values.org_status}
                                    touched={touched.org_status}
                                    options={statusOptions}
                                />
                            </Col>
                        </Row>
                        <Row gutter={50} style={{ marginTop: 12 }}>
                            <Col span={12}>
                                <SPUpload
                                    id="image"
                                    label="File"
                                    name="image"
                                    touched={touched.image}
                                    errorMessage={errors.image}
                                    onInputChange={(name, file, dimestion) => {
                                        setFileDimentions(dimestion);
                                        setFieldValue(name, file);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.image}
                                    disabled={isSubmitting}
                                    width={170}
                                />
                                <ErrorMessage name="image" render={msg => <ErrorText>{msg}</ErrorText>} />
                            </Col>
                            <Col span={12}>
                                {selectedRecord?.logoImage &&
                                    <img src={selectedRecord?.logoImage} />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SPButton
                                    size="small"
                                    title='Update'
                                    type="submit"
                                    onButtonClick={handleSubmit}
                                />
                            </Col>
                        </Row>
                        
                    </Form>
                );
            }}
        </Formik>
    )
}

export default EditOrg

