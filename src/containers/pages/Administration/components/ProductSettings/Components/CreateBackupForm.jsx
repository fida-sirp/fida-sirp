import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import { Formik, Form } from 'formik'
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { administratorProductSettingNotify } from '../../../../../../actions/administration';

function CreateBackupform({ submit, closeDrawer, onGetNotifiyUser, listOfNotifyUser, isVisible }) {

    const [notifyUsersOptions, setNotifiyUserOptions] = useState([]);

    useEffect(() => {
        onGetNotifiyUser()
    }, [onGetNotifiyUser])

    useEffect(() => {
        if (!_.isEmpty(listOfNotifyUser)) {
            const sourceArray = [];
            if (Object.keys(listOfNotifyUser).length !== 0) {
                for (const [key, value] of Object.entries(listOfNotifyUser)) {
                    sourceArray.push({
                        key,
                        value: key,
                        label: value
                    })
                }
            }
            setNotifiyUserOptions(sourceArray)
        }
    }, [listOfNotifyUser])

    let validationSchemaStandard = Yup.object({
        comment: Yup.string().required('Required'),
    });

    return (
        <div>
            <Formik
                id="formik"
                validationSchema={validationSchemaStandard}
                initialValues={{}}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    submit(values);
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
                            <InputBox
                                id={'comment'}
                                label={'Description'}
                                name={'comment'}
                                placeholder={''}
                                onInputChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                                errorMessage={errors.comment}
                                touched={touched.comment}
                                width={750}
                                noBorderValidation
                            />
                            <SelectBox
                                id="notify"
                                label="Send Notification to"
                                name="notify"
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.notify}
                                value={values.notify}
                                touched={touched.notify}
                                width={750}
                                setHightAuto
                                options={notifyUsersOptions}
                            />

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
        </div>
    );
}


const mapStateToProps = state => ({
    listOfNotifyUser: state.administration?.productSettingList?.notifyUser
});

const mapDispatchToProps = dispatch => ({
    onGetNotifiyUser: () => dispatch(administratorProductSettingNotify()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(CreateBackupform);
