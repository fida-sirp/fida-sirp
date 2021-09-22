import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col, Card, Button } from 'antd';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import loaderImg from '../../../../../assets/images/loader.gif';
import 'antd/dist/antd.css';
import { filter, isEmpty, map, isArray } from 'lodash';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

function EditVendorModal({
  closeDrawer,
  appConfigurationFieldsData,
  updateConfigurationFieldsDetails,
  isMultiConfig,
}) {
  const [orgListArray, setOrgListArray] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [fieldsObj, setFieldsObj] = useState({});

  let validationSchemaStandard = Yup.object({});

  useEffect(() => {
    let initialValues = [];
    if (appConfigurationFieldsData && appConfigurationFieldsData.length > 0) {
      if (!isEmpty(appConfigurationFieldsData[0])) {
        if (Array.isArray(appConfigurationFieldsData[0]))
          initialValues = appConfigurationFieldsData[0];
        else {
          initialValues.push(appConfigurationFieldsData[0]);
        }
      }

      if (appConfigurationFieldsData[1]?.Newfields && !isEmpty(appConfigurationFieldsData[1]?.Newfields)) {
        initialValues.push(appConfigurationFieldsData[1]?.Newfields)
      }
    }

    let OrganizationApplicationsItem = {};
    let fieldsObj = {};
    let orgListArray = [];
    if (!isEmpty(initialValues))
      initialValues.map((data, i) => {
        orgListArray.push(data);
        Object.entries(data).map(([key, value], index) => {
          OrganizationApplicationsItem[`${key}_${i}`] = isArray(value) ? value[0] : value;
          fieldsObj[`${key}`] = '';
        });
      });
    setFormInitialValues(OrganizationApplicationsItem);
    setOrgListArray(orgListArray);
    setFieldsObj(fieldsObj);
  }, [appConfigurationFieldsData]);

  const addMore = () => {
    setOrgListArray([...orgListArray, fieldsObj]);
  };

  const removeData = index => {
    setOrgListArray(
      filter(
        orgListArray,
        (orgListData, orgListDataIndex) => orgListDataIndex !== index
      )
    );
  };

  return (
    <div>
      {isMultiConfig === 'true' && (
        <Button
          onClick={() => addMore()}
          type="primary"
          style={{
            borderColor: '#33C758',
            background: '#33C758',
            margin: '2px',
          }}
          icon={<PlusOutlined />}
          size="small"
        />
      )}
      {isMultiConfig === 'false' ? (
        <Formik
          id="formik"
          validationSchema={validationSchemaStandard}
          initialValues={formInitialValues}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {            
            updateConfigurationFieldsDetails({ values, saveClicked: true });
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
          }) => (
            <Form>
              {!isEmpty(orgListArray) &&
                map(orgListArray, (formItemsObj, formItemsObjIndex) => {
                  return (
                    <Card
                      className="custom-card-child"
                      style={{ marginBottom: '30px' }}
                    >
                      {map(formItemsObj, (value, key) => {
                        return (
                          <InputBox
                            id={`${key}_${formItemsObjIndex}`}
                            label={`${key == 'nameConfig' ? 'Configuration Name' : key
                              }`}
                            name={`${key}_${formItemsObjIndex}`}
                            placeholder={`${key == 'nameConfig' ? 'Configuration Name' : key
                              }`}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            type={key === 'Password' ? 'password' : ''}
                            value={values[`${key}_${formItemsObjIndex}`]}
                            touched={touched[`${key}_${formItemsObjIndex}`]}
                            width={345}
                            noBorderValidation
                          />
                        );
                      })}
                    </Card>
                  );
                })}
              {!isEmpty(formInitialValues) && (
                <Row gutter={11} justify="end">
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
                      title="Save"
                      size="small"
                      type="submit"
                      onButtonClick={handleSubmit}
                      isLoading={false}
                    />
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          id="formik"
          validationSchema={validationSchemaStandard}
          initialValues={formInitialValues}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            const OrganizationApplicationsData = [];
            Object.entries(values).map(([key, value], index) => {
              const keyName = key.substring(0, key.lastIndexOf('_'));
              const keyIndex = parseInt(key.substring(key.lastIndexOf('_') + 1));
              if (OrganizationApplicationsData.length > keyIndex) {
                OrganizationApplicationsData[keyIndex][keyName] = value;
              } else {
                OrganizationApplicationsData.push({[keyName] : value});
              }
            });

            const OrganizationApplications = [];
            map(OrganizationApplicationsData, (OrgApp, OrgAppKey) => {
              OrganizationApplications.push(OrgApp);
            })
            
            updateConfigurationFieldsDetails({
              values: OrganizationApplications,
              saveClicked: true,
            });
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
          }) => (
            <Form>
              {!isEmpty(orgListArray) &&
                map(orgListArray, (formItemsObj, formItemsObjIndex) => {
                  return (
                    <Card
                      className="custom-card-child"
                      style={{ marginBottom: '30px' }}
                    >
                      {orgListArray.length > 1 && (
                        <Button
                          onClick={() => removeData(formItemsObjIndex)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                            float: 'right',
                          }}
                          icon={<MinusOutlined />}
                          size="small"
                        />
                      )}
                      {map(formItemsObj, (value, key) => {
                        return (
                          <InputBox
                            id={`${key}_${formItemsObjIndex}`}
                            label={`${key == 'nameConfig' ? 'Configuration Name' : key
                              }`}
                            name={`${key}_${formItemsObjIndex}`}
                            placeholder={`${key == 'nameConfig' ? 'Configuration Name' : key
                              }`}
                            onInputChange={handleChange}
                            onBlur={handleBlur}
                            type={key === 'Password' ? 'password' : ''}
                            value={values[`${key}_${formItemsObjIndex}`]}
                            touched={touched[`${key}_${formItemsObjIndex}`]}
                            width={345}
                            noBorderValidation
                          />
                        );
                      })}
                    </Card>
                  );
                })}
              {!isEmpty(formInitialValues) && (
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
                      title="Save"
                      size="small"
                      type="submit"
                      onButtonClick={handleSubmit}
                      isLoading={false}
                    />
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default EditVendorModal;
