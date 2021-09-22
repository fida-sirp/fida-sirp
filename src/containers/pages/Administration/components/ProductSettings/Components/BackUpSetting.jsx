import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import { StylesBox } from '../../../StyledComponents'
import { Label } from '../../../../../../components/InputBox/StyledComponents';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';
import SPTimepicker from '../../../../../../components/SPTimepicker';
import moment from 'moment';

const BACKUP_PERIOD_OPTIONS = [
    {key: 'Daily', value: 'daily'},
    {key: 'Weekly', value: 'weekly'},
    {key: 'Monthly', value: 'monthly'},
    {key: 'Yearly', value: 'yearly'},
]

function BackupSetting({ submitHandler, closeDrawer, onGetNotifiyUser, listOfNotifyUser, isVisible, selectedBackupSetting }) {
    const [initialFormData, setInitialFormData] = useState({});
    const [isAutoBackup, setAutoBackup] = useState(true);
    const [selectedBackupTime, setSelectedBackupTime] = useState("weekly")
    const [timeValue, setTimeValue] = useState()


    let validationSchemaStandard = Yup.object({
        // bas_time: Yup.number().required('Required'),
        bas_max_no: Yup.number().max(10, 'Must be exactly 10 digits')
    });

    const toggleStatus = (value) => {
        setAutoBackup(value)
    }


    useEffect(() => {
        var m = moment().utcOffset(0);
        m.set({hour:selectedBackupSetting?.bas_time?.substring(0, 2),minute:selectedBackupSetting?.bas_time?.substring(3, 5),second:0,millisecond:0})
        m.toISOString()
        m.format()

        setAutoBackup(!!selectedBackupSetting?.bas_status);
        setSelectedBackupTime(selectedBackupSetting?.bas_period);
        setInitialFormData({
            bas_time: m || '',
            bas_max_no: selectedBackupSetting?.bas_max_no || '',
        })
    }, [selectedBackupSetting]);

    return (
        <Formik
            id="formik"
            validationSchema={validationSchemaStandard}
            initialValues={initialFormData}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                const payload = {
                    bas_status: isAutoBackup,
                    bas_period: selectedBackupTime,
                    bas_time:  moment(values.bas_time).format('HH:mm')|| "",
                    bas_max_no: values.bas_max_no || 0
                }
                submitHandler(payload);
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
                    resetForm()
                }, [isVisible])
                return (
                    <Form>
                        <StylesBox fullWidth noRadius style={{ marginBottom: 10 }}>
                            <Label>
                                AUTOMATIC BACKUP
                            </Label>
                            <SPToggleSwitch onChecked={isAutoBackup} onChange={toggleStatus} />
                        </StylesBox>
                        <StylesBox fullWidth noRadius style={{ marginBottom: 10 }}>
                            <Label>
                                PERIOD
                            </Label>
                            <div style={{ display: "flex" }}>
                                {BACKUP_PERIOD_OPTIONS.map((itemItem, index) => {
                                    return (
                                        <SPButton
                                            style={{ marginRight: 10 }}
                                            type={itemItem.value === selectedBackupTime ? "primary" : "secondary"}
                                            title={itemItem.key}
                                            size="small"
                                            onButtonClick={() => {
                                                setSelectedBackupTime(itemItem.value)
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        </StylesBox>
                        <StylesBox fullWidth noRadius style={{ marginBottom: 10 }}>
                            <SPTimepicker label="TIME" name="bas_time" showNow={false} value={moment(values.bas_time)} defaultValue={moment('12:08', "HH:mm")} onInputChange={setFieldValue} />
                        </StylesBox>
                        <StylesBox fullWidth noRadius style={{ marginBottom: 10 }}>
                            <Row gutter={[20, 20]} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Col span={12}>
                                    <InputBox
                                        id="bas_max_no"
                                        name="bas_max_no"
                                        label="MAX BACKUPS TO KEEP"
                                        type="number"
                                        max="10"
                                        onInputChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={errors.bas_max_no}
                                        value={values.bas_max_no}
                                        touched={touched.bas_max_no}
                                        noBorderValidation
                                    />
                                </Col>
                                <Col span={12} >
                                    <div style={{ color: "red" }}>
                                        Max limit : 10
                                    </div>
                                </Col>
                            </Row>
                        </StylesBox>
                        <Row gutter={11} justify="end" >
                            <Col>
                                <SPButton
                                    title="Cancel"
                                    size="small"
                                    type="secondary"
                                    onButtonClick={() => {
                                        resetForm();
                                        closeDrawer();
                                    }}
                                />
                            </Col>
                            <Col>
                                <SPButton
                                    title={"Create"}
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
        </Formik>
    );
}

export default BackupSetting
