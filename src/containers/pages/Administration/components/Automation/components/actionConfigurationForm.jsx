import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, FieldArray } from 'formik';
import { Row, Col, Button } from 'antd';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import loaderImg from '../../../../../../assets/images/loader.gif';
import CancelIcon from '../../../../../../assets/svgIcon/cancelIcon';
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const StylesBox = styled(Col)`
    width:100%;
    padding:2rem;
    border-radius: ${props => props.noRadius ? "0px" : "20px"} !important;
    max-width: ${props => props.fullWidth ? "100%" : "500px"} !important;
    background-color:#373747
`;

const typeInputOptions = [
    {
        key: 'default',
        value: 'String',
        label: 'String',
    },
    { key: 2, value: 'Password', label: "Password" }
]

const requiredOption = [
    { key: 'default', value: 'Yes', label: "Yes" },
    { key: 2, value: 'No', label: "No" }
]


function ConfigurationDrawer({
    isVisible,
    submit,
    onClose,
    onCloseDrawer
}) {
    const appConfig = useSelector((state) => state.administration?.automation?.appConfigurationData)
    const fieldLoading = useSelector((state) => state.administration?.automation?.isFieldLoading)
    const [configField, setConfieldField] = useState([]);
    const [configIntialData, setConfigIntialData] = useState({});

    let validationSchemaStandard = Yup.object({});

    const addMore = () => {
        const values = [...configField]
        values.push({})
        setConfieldField(values);
    };

    useEffect(() => {
        const appConfigValue = {}
        if (appConfig?.length > 0) {
            _.map(appConfig, (configValue, index) => {
                appConfigValue[`name_${index}`] = configValue?.aai_name
                appConfigValue[`type_${index}`] = configValue?.aai_type
                appConfigValue[`requested_${index}`] = configValue?.aai_required
            })
            setConfigIntialData(appConfigValue)
        }
        if (appConfig?.length > 0) {
            setConfieldField(appConfig);
        } else {
            const value = {};
            value['name_0'] = ''
            value['type_0'] = ''
            value['request_0'] = ''
            setConfigIntialData(value)
            setConfieldField([{ aai_name: '', aai_type: '', aai_required: '' }])
        }
    }, [appConfig])

    const removeData = index => {
        const tempconfigIntialData = configIntialData;
        delete tempconfigIntialData[`name_${index}`];
        delete tempconfigIntialData[`type_${index}`];
        delete tempconfigIntialData[`requested_${index}`];
        const list = [...configField];
        list.splice(index, 1);
        setConfieldField(list)
        setConfigIntialData(tempconfigIntialData)
    };
    return (
        <StylesBox fullWidth>
            {fieldLoading ? <> <div className="make-child-center">
                <img src={loaderImg} />
            </div></> : <>
                <Row justify="end">
                    <Button
                        onClick={() => addMore()}
                        type="primary"
                        style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                        }}
                        icon={<PlusIcon />}
                        size="small"
                    />
                </Row>
                <Formik
                    id="formik"
                    validationSchema={validationSchemaStandard}
                    enableReinitialize
                    initialValues={configIntialData}
                    onSubmit={(values, { resetForm }) => {
                        submit(values)
                    }}>
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
                            resetForm()
                        }, [isVisible])
                        return (
                            <Form>
                                {configField?.map((configValue, index) => {
                                    return (
                                        <Row gutter={10} style={{ display: "flex", alignItems: "center" }} key={index}>
                                            <Col>
                                                <InputBox
                                                    id={`name_${index}`}
                                                    label="Input Name"
                                                    name={`name_${index}`}
                                                    placeholder="Input Name"
                                                    onInputChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values?.[`name_${index}`]}
                                                    width={300}
                                                    touched={values?.[`name_${index}`]}
                                                    noBorderValidation
                                                />
                                            </Col>
                                            <Col>
                                                <SelectBox

                                                    id={`type_${index}`}
                                                    label="Type"
                                                    name={`type_${index}`}
                                                    onInputChange={setFieldValue}
                                                    onBlur={handleBlur}
                                                    value={values?.[`type_${index}`]}
                                                    options={typeInputOptions}
                                                    width={130}
                                                />
                                            </Col>
                                            <Col>
                                                <SelectBox
                                                    id={`requested_${index}`}
                                                    label="Required"
                                                    name={`requested_${index}`}
                                                    onInputChange={setFieldValue}
                                                    onBlur={handleBlur}
                                                    value={values?.[`requested_${index}`]}
                                                    options={requiredOption}
                                                    width={130}
                                                />
                                            </Col>
                                            <Col>
                                                <Button
                                                    onClick={() => removeData(index)}
                                                    type="primary"
                                                    style={{
                                                        borderColor: 'red',
                                                        background: 'red',
                                                        marginTop: 10
                                                    }}
                                                    icon={<CancelIcon />}
                                                    size="small"
                                                />
                                            </Col>
                                        </Row>
                                    )
                                })}
                                <Row gutter={11} justify="end" >
                                    <Col>
                                        <SPButton
                                            title="Cancel"
                                            size="small"
                                            type="secondary"
                                            onButtonClick={onCloseDrawer}
                                        />
                                    </Col>
                                    <Col>
                                        <SPButton
                                            title="Save"
                                            size="small"
                                            type="submit"
                                            onButtonClick={handleSubmit}
                                            isLoading={false}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik></>}

        </StylesBox>
    );
}

export default ConfigurationDrawer;