import React, { useState, useEffect } from 'react';
import { Row, Col, Button, notification } from 'antd';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import axios from 'axios';
import {
  updateUserProfile,
  getUserProfile,
  getGoogleQrCode,
  googleAuthProfile,
} from '../../../../../actions/user';
import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import SPToggleSwitch from '../../../../../components/SPToggleSwitch';
import SPImageUpload from '../../../../../components/SPImageUpload';
import ChangePassword from '../changePassword';
import NotificationLogo from '../../../../../assets/svgIcon/header/notification';
import {
  PrimaryText,
  BoxinputDiv,
  StyledDivider,
  StyledRow,
  StyledGooglAuthBlock,
  LabelTitleGoogleAuth,
  InstructionsDiv,
  InstructionLine,
  CenterImageDiv,
} from './StyledComponents';
import { StyledText, StyledTitle } from '../changePassword/StyledComponents';
import { AlertBox } from '../../../../pages/assets/components/createRule/StyledComponents';

const initialValues = {
  usr_name: '',
  usr_mobile_number: '',
  usr_phone_number: '',
  usr_designation: '',
  usr_email: '',
  image: '',
  usr_google_auth_enable: '',
};

const initialValuesAuth = {
  code: '',
  mastercode: '',
};

function ProfileForm({
  hasErrors,
  qr_image_url,
  userProfile,
  getUserProfile,
  updateUserProfile,
  isLoading,
  onClose,
  isUpdated,
  getGoogleQrCode,
  googleAuthProfileData,
  googleAuthProfile,
  isGoogleAuthUpdate,
  hasGoogleAuthError,
}) {
  const [uploadImage, setUploadImage] = useState('');
  const [iSGoogleAuthEnable, setISGoogleAuthEnable] = useState(false);
  const [displayGoogleAuthForm, setDisplayGoogleAuthForm] = useState(false);
  const [usr_send_email_notification, setSendEmailNotification] = useState(
    false
  );
  const [usr_tag_in_comment, setTagN] = useState(false);
  const [usr_add_team_member, setAddMemberN] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'Profile updated',
      description: 'Profile has been updated successfully',
      onClick: () => {},
    });
  };

  useEffect(() => {
    if (isGoogleAuthUpdate) {
      notification.open({
        message: 'Google Authentication updated',
        description: googleAuthProfile?.data?.message,
        onClick: () => {},
      });

      setDisplayGoogleAuthForm(false);
    }
  }, [isGoogleAuthUpdate]);

  useEffect(() => {
    if (isUpdated) {
      onClose();
      openNotification();
    }
  }, [isUpdated]);

  useEffect(() => {
    getGoogleQrCode();
    getUserProfile();
  }, []);

  function fetchData() {
    const userToken = localStorage.getItem('AccessToken');

    axios
      .get(userProfile?.profile?.profile_img_path, {
        headers: { Authorization: 'Bearer ' + userToken },
        responseType: 'arraybuffer',
      })
      .then(res => {
        const data = new Uint8Array(res.data);
        const raw = String.fromCharCode.apply(null, data);
        const base64 = btoa(raw);
        const src = 'data:image;base64,' + base64;

        setUploadImage(src);
      });
  }

  useEffect(() => {
    fetchData();

    const profiledata = userProfile?.profile[0];
    if (!isEmpty(profiledata)) {
      setSendEmailNotification(profiledata.usr_send_email_notification);
      setTagN(profiledata.usr_tag_in_comment);
      setAddMemberN(profiledata.usr_add_team_member);
      if (profiledata.usr_google_auth_enable === 'Disable') {
        setISGoogleAuthEnable(false);
      } else {
        setISGoogleAuthEnable(true);
        setDisplayGoogleAuthForm(false);
      }
    }
  }, [userProfile]);

  return (
    <>
      <Formik
        id="formik"
        initialValues={initialValues}
        onSubmit={values => {
          values = {
            ...values,
            usr_tag_in_comment: usr_tag_in_comment ? 1 : 0,
            usr_send_email_notification: usr_send_email_notification ? 1 : 0,
            usr_add_team_member: usr_add_team_member ? 1 : 0,
          };
          if (iSGoogleAuthEnable) {
          } else {
            values = { ...values, usr_google_auth_enable: 'Disable' };
          }
          updateUserProfile(values);
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
            const data = userProfile?.profile[0];
            if (!isEmpty(data)) {
              for (const [key, value] of Object.entries(initialValues)) {
                setFieldValue(key, String(data[key]), false);
              }

              setFieldValue(
                'mastercode',
                String(data.usr_google_auth_master_code),
                false
              );
            }
          }, [userProfile]);

          useEffect(() => {
            setFieldValue('image', uploadImage, false);
          }, [uploadImage]);

          const sumitGoogleAuth = () => {
            const { code, mastercode } = values;
            googleAuthProfile({ code, mastercode });
          };

          const onChangeGoogleAuth = value => {
            setDisplayGoogleAuthForm(value);

            setISGoogleAuthEnable(value);
          };

          const onChangeGoogleClickAuth = value => {
            setDisplayGoogleAuthForm(true);

            setISGoogleAuthEnable(true);
          };

          const onChangeTagNotification = value => {
            setTagN(value);
          };

          const onChangeSendNotification = value => {
            setSendEmailNotification(value);
          };

          const onChangeTeamMember = value => {
            setAddMemberN(value);
          };

          function generateError(data) {
            let errorItem = null;

            if (Array.isArray(data[0])) {
              const items = data[0].map(item => <li>{item.message}</li>);
              errorItem = items;
            } else {
              errorItem = data.message;
            }

            return errorItem;
          }

          return (
            <Form onSubmit={handleSubmit}>
              {hasErrors ? (
                <AlertBox
                  message={
                    <ul className="margin-10">{generateError(hasErrors)}</ul>
                  }
                  type="error"
                  closable
                />
              ) : null}
              <SPImageUpload
                id="image"
                label="Image"
                name="image"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                value={values.image}
                selectedFile={values.image}
                touched={touched.image}
              />
              <InputBox
                id="usr_name"
                label="Name"
                name="usr_name"
                placeholder="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_name}
                value={values.usr_name}
                touched={touched.usr_name}
              />
              <InputBox
                id="usr_designation"
                label="Designation"
                name="usr_designation"
                placeholder="Designation"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_designation}
                value={values.usr_designation}
                touched={touched.usr_designation}
              />
              <InputBox
                id="usr_email"
                label="Email"
                name="usr_email"
                placeholder="abc@gmail.com"
                onInputChange={handleChange}
                onBlur={handleBlur}
                disabled={true}
                errorMessage={errors.usr_email}
                value={values.usr_email}
                touched={touched.usr_email}
              />
              <InputBox
                id="usr_phone_number"
                label="Phone Number"
                name="usr_phone_number"
                placeholder="e.g 7856864521"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_phone_number}
                value={values.usr_phone_number}
                touched={touched.usr_phone_number}
              />
              <InputBox
                id="usr_mobile_number"
                label="Mobile Number"
                name="usr_mobile_number"
                placeholder="e.g 7856864521"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_mobile_number}
                value={values.usr_mobile_number}
                touched={touched.usr_mobile_number}
              />
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <StyledText>Google Authentication</StyledText>
                </Col>
                <Col>
                  <SPToggleSwitch
                    onChecked={iSGoogleAuthEnable}
                    onChange={onChangeGoogleAuth}
                  />
                </Col>
              </Row>
              <Row>
                <PrimaryText>
                  1. You must install the Google Authenticator app (Android /
                  iOS) on your mobile device.
                </PrimaryText>
              </Row>
              <Row>
                <PrimaryText>
                  2.{' '}
                  <span className="pointer" onClick={onChangeGoogleClickAuth}>
                    Click here
                  </span>{' '}
                  to configure
                </PrimaryText>
              </Row>
              {displayGoogleAuthForm && (
                <Row>
                  <StyledGooglAuthBlock>
                    <LabelTitleGoogleAuth>Instructions</LabelTitleGoogleAuth>
                    <InstructionsDiv>
                      <InstructionLine>
                        1. Open the Authenticator app on your device
                      </InstructionLine>
                      <InstructionLine>
                        2. Tap on &quot;BEGIN SETUP&quot;
                      </InstructionLine>
                      <InstructionLine>
                        3. Tap &quot;Scan a barcode&quot; (if you have not
                        installed a barcode scanner, you will now be asked to)
                      </InstructionLine>
                      <InstructionLine>
                        4. Scan the QR code below
                      </InstructionLine>
                      <InstructionLine>
                        5. Click the &quot;Next&quot; button
                      </InstructionLine>
                      <InstructionLine>
                        6. Type the code you see on your mobile device into the
                        &quot;Code box&quot; below.
                      </InstructionLine>
                      <InstructionLine>
                        7. Type the Master code. A password or passphrase used
                        in case you don&apos;t have access to your device.
                      </InstructionLine>
                      <InstructionLine>
                        8. Click the &quot;Save&quot; button to complete your
                        setup
                      </InstructionLine>
                    </InstructionsDiv>
                    {hasGoogleAuthError ? (
                      <AlertBox
                        message={
                          <ul className="margin-10">
                            {hasGoogleAuthError.message}
                          </ul>
                        }
                        type="error"
                        closable
                      />
                    ) : null}
                    <BoxinputDiv>
                      <InputBox
                        id="code"
                        label="Code"
                        name="code"
                        placeholder="Code"
                        onInputChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={errors.code}
                        value={values.code}
                        touched={touched.code}
                      />
                    </BoxinputDiv>
                    <BoxinputDiv>
                      <InputBox
                        id="mastercode"
                        label="Master Code"
                        name="mastercode"
                        placeholder="Master Code"
                        onInputChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={errors.mastercode}
                        value={values.mastercode}
                        touched={touched.mastercode}
                      />
                    </BoxinputDiv>

                    <CenterImageDiv>
                      <img src={qr_image_url} alt="QR" />
                    </CenterImageDiv>
                    <div style={{ width: '70px', float: 'right' }}>
                      <SPButton
                        title="Save"
                        onButtonClick={sumitGoogleAuth}
                        size="small"
                      />
                    </div>
                  </StyledGooglAuthBlock>
                </Row>
              )}

              <StyledDivider />
              <StyledTitle>
                <NotificationLogo />
                <StyledText>Manage Notification</StyledText>
              </StyledTitle>

              <StyledRow>
                <PrimaryText>Someone tagged me in a comment</PrimaryText>
                <SPToggleSwitch
                  onChecked={usr_tag_in_comment}
                  toggleId={2}
                  onChange={onChangeTagNotification}
                />
              </StyledRow>
              <StyledRow>
                <PrimaryText>Someone added me as a team member</PrimaryText>
                <SPToggleSwitch
                  onChecked={usr_send_email_notification}
                  toggleId={3}
                  onChange={onChangeSendNotification}
                />
              </StyledRow>
              <StyledRow>
                <PrimaryText>Send me email notifications</PrimaryText>
                <SPToggleSwitch
                  onChecked={usr_add_team_member}
                  toggleId={4}
                  onChange={onChangeTeamMember}
                />
              </StyledRow>

              <StyledDivider />

              <Row
                gutter={11}
                justify="end"
                style={{
                  marginBottom: -580,
                  marginTop: 480,
                  paddingBottom: 100,
                }}
              >
                <Col>
                  <SPButton
                    title="Cancel"
                    type="secondary"
                    size="small"
                    onButtonClick={onClose}
                  />
                </Col>
                <Col>
                  <SPButton
                    title="Update"
                    htmlType="submit"
                    size="small"
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>

      <ChangePassword />
    </>
  );
}

const mapStateToProps = state => {
  return {
    userProfile: state.userStore?.userProfile?.data,
    isLoading: state.userStore?.isProcessing,
    isUpdated: state.userStore?.isUpdated,
    hasErrors: state.userStore?.hasErrors,
    qr_image_url: state.userStore.qrData?.data?.qr_image_url,
    googleAuthProfileData: state.userStore.googleAuthProfile,
    isGoogleAuthUpdate: state.userStore.isGoogleAuthUpdate,
    hasGoogleAuthError: state.userStore.hasGoogleAuthError,
  };
};

const mapDispatchToProps = {
  updateUserProfile,
  getUserProfile,
  getGoogleQrCode,
  googleAuthProfile,
}; 

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
