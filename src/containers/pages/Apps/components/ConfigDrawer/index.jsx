import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, FieldArray } from 'formik';
import { Row, Col, Button } from 'antd';
import PlusIcon from '../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import loaderImg from '../../../../../assets/images/loader.gif';
import { StylesBox } from '../../StyledComponents';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import { useSelector } from 'react-redux'



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
    onClose
}) {
    const appConfig = useSelector((state) => state.appConfig)
    const fieldLoading = useSelector((state) => state.appConfig.loading)
    const [configField, setConfieldField] = useState([]);
    const [configIntialData, setConfigIntialData] = useState({});


    let validationSchemaStandard = Yup.object({});

    const addMore = () => {
        const values = [...configField]
        values.push({})
        setConfieldField(values);
    };



    // useEffect(() => {
    //     console.log(">>>Hello");
    //     setConfieldField([])
    // }, [isVisible])

    useEffect(() => {
        const appConfigValue = {}
        if (appConfig?.listData?.data?.length > 0) {
            _.map(appConfig.listData.data, (configValue, index) => {
                appConfigValue[`name_${index}`] = configValue?.ac_name
                appConfigValue[`type_${index}`] = configValue?.ac_type
                appConfigValue[`requested_${index}`] = configValue?.ac_required
            })
            setConfigIntialData(appConfigValue)
        }
        if (appConfig?.listData?.data?.length > 0) {
            setConfieldField(appConfig?.listData?.data);
        } else {
            const value = {};
            value['name_0'] = ''
            value['type_0'] = ''
            value['request_0'] = ''
            setConfigIntialData(value)
            setConfieldField([{ ac_name: '', ac_type: '', ac_required: '' }])
        }
    }, [appConfig])

    const removeData = index => {
        // const list = configField;
        const tempconfigIntialData = configIntialData;
        delete tempconfigIntialData[`name_${index}`];
        delete tempconfigIntialData[`type_${index}`];
        delete tempconfigIntialData[`requested_${index}`];
        const list = [...configField];
        list.splice(index, 1);
        setConfieldField(list)
        setConfigIntialData(tempconfigIntialData)

        // list.splice(index, 1);
        // console.log('checkLog', { list, index, tempconfigIntialData })
        // setConfieldField(list)

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
                                                    touched={configValue.ac_type}
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
                                            onButtonClick={onClose}
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