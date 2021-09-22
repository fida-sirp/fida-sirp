import React, { useEffect, useState } from 'react';
import { StyledBox } from '../../StyledComponents';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  oraganizationTimeZone,
  oraganizationInfo,
  getIntialDataOraganizationInformation,
} from '../../../../../../../actions/administration';
import { Formik, Form, ErrorMessage } from 'formik';
import InputBox from '../../../../../../../components/InputBox';
import SPUpload from '../../../../../../../components/SPUpload';
import * as Yup from 'yup';
import SelectBox from '../../../../../../../components/SelectBox';
import SPSecureImage from '../../../../../../../components/SPSecureImage';
import { Row, Col } from 'antd';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import SPButton from '../../../../../../../components/SPButton';
import { StylesBox, ErrorText } from '../../StyledComponents';
import packageJson from '../../../../../../../../package.json';

const FILE_WIDTH = 240;
const FILE_HEIGHT = 72;

const OrganizationInfomation = ({
  onGetTimezon,
  oraganiztaionTimezone,
  onPostOrgInfo,
  onGetOrgInfo,
  oraganiztaionGetInfo
}) => {
  const [timezonList, settimezonList] = useState([]);
  const [timezoneGpList, setTimeZoneGpList] = useState([]);
  const [fileDimentions, setFileDimentions] = useState({});
  const [oraganizationIntialValue, setOraganizationIntialValue] = useState({})

  useEffect(() => {
    onGetTimezon();
    onGetOrgInfo();
  }, [onGetTimezon, onGetOrgInfo]);

  useEffect(() => {
    setOraganizationIntialValue(oraganiztaionGetInfo?.listData)
  }, [oraganiztaionGetInfo])



  useEffect(() => {
    const listData = oraganiztaionTimezone;
    const timeZoneList = [];
    const timezoneGpList = [];
    if (listData && Object.keys(listData).length !== 0) {
      Object.keys(listData).map(GpLabel => {
        timezoneGpList.push({ groupName: GpLabel });
        Object.keys(listData[GpLabel]).map(data =>
          timeZoneList.push({
            GroupLabel: GpLabel,
            key: data,
            value: data,
            label: listData[GpLabel][data],
          })
        );
      });
    }
    setTimeZoneGpList(timezoneGpList);
    settimezonList(timeZoneList);
  }, [oraganiztaionTimezone]);

  const validationSchema = Yup.object({
    org_name: Yup.string().required('This Field is required'),
    image: Yup.mixed().test(
      'This Field is required',
      'Image (Logo dimensions must be 240 * 72 pixels)',
      file => {
        if (file) {
          return fileDimentions && fileDimentions.width === FILE_WIDTH && fileDimentions.height === FILE_HEIGHT;
        } else {
          return true;
        }
      }
    ),
  });


  var organization_logo="";
  if (oraganizationIntialValue?.logo){
     organization_logo = oraganizationIntialValue.logo.replace(packageJson.proxy,window.location.origin).replace(":3000","")
       //organization_logo = oraganizationIntialValue.logo.replace("localhost","localhost:3000")
  }
  return (
    <StylesBox>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        id="formik"
        initialValues={{
          timezone: oraganizationIntialValue?.timezone || "",
          image: undefined,
          org_name: oraganizationIntialValue?.organization?.org_name || '',
        }}
        onSubmit={(values, { resetForm }) => {
          var FormData = require('form-data');
          var data = new FormData();
          data.append('timezone', values.timezone);
          data.append('image', values.image);
          onPostOrgInfo(data);
          timezone.value(values.timezone);
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
          }, []);
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <InputBox
                  id="org_name"
                  label="Name"
                  name="org_name"
                  placeholder="Title"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  width={420}
                  errorMessage={errors.org_name}
                  value={values.org_name}
                  touched={touched.org_name}
                  disabled="true"
                />
              </Row>
              <Row>
                <Col style={{marginRight: "15px"}}>
                  <SPUpload
                    id="image"
                    label="File"
                    name="image"
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
                  <ErrorMessage
                    name="image"
                    render={msg => <ErrorText>{msg}</ErrorText>}
                  />
                </Col>
                <Col>
                    <SPSecureImage id="logoimage" imgSrc={organization_logo} />
                </Col>
              </Row>
              <Row>
                <SelectBox
                  group={true}
                  id="timezone"
                  label="Timezone"
                  groupList={timezoneGpList}
                  name="timezone"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.timezone}
                  value={values.timezone}
                  touched={touched.timezone}
                  options={timezonList}
                  width={420}
                />
              </Row>

              <Row gutter={11} justify="start" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton
                    title="Update"
                    type="submit"
                    onButtonClick={handleSubmit}
                    size="small"
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </StylesBox>
  );
};
const mapStateToProps = state => ({
  oraganiztaionTimezone: state.administration.organizationsInformation.timezonList,
  oraganiztaionGetInfo: state.administration.organizationsInformation
});

const mapDispatchToProps = dispatch => ({
  onGetOrgInfo: () => dispatch(getIntialDataOraganizationInformation()),
  onPostOrgInfo: (...args) => dispatch(oraganizationInfo(...args)),
  onGetTimezon: () => dispatch(oraganizationTimeZone()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(OrganizationInfomation);
