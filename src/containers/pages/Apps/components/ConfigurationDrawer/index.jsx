import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col, Button, Card } from 'antd';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import 'antd/dist/antd.css';
import { map, filter, isEmpty } from 'lodash';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

function ConfigurationDrawer({
  hasMultiConfig,
  closeDrawer,
  updateConfigurationFieldsDetails,
  appsFieldData,
}) {
  const [formInitialValues, setFormInitialValues] = useState({});
  const [orgListArray, setOrgListArray] = useState([]);
  const [fieldsObj, setFieldsObj] = useState({});

  let validationSchemaStandard = Yup.object({});

  useEffect(() => {
    let initialValues = [];
    if (!isEmpty(appsFieldData)) {
      if (!isEmpty(appsFieldData?.data) && !isEmpty(appsFieldData?.data[0])) {
        if (Array.isArray(appsFieldData.data[0]))
          initialValues = appsFieldData.data[0];
        else {
          initialValues.push(appsFieldData.data[0]);
        }
      }

      if (appsFieldData?.data[1]?.Newfields && !isEmpty(appsFieldData?.data[1]?.Newfields)) {
        initialValues.push(appsFieldData?.data[1]?.Newfields)
      }
    }

    let OrganizationApplicationsItem = {};
    const fieldsObj = {};
    let orgListArray = [];
    let orgListObj = {};
    if (!isEmpty(initialValues))
      initialValues.map((data, i) => {
        orgListArray.push(data);
        Object.entries(data).map(([key, value], index) => {
          OrganizationApplicationsItem[`${key}_${i}`] = value;
          // orgListObj[`${key}`] = value;
          fieldsObj[`${key}`] = '';
        });
      });
    // orgListArray.push(orgListObj);
    setFormInitialValues(OrganizationApplicationsItem);
    setOrgListArray(orgListArray);
    setFieldsObj(fieldsObj);
  }, [appsFieldData]);

  const addMore = () => {
    setOrgListArray([...orgListArray, fieldsObj]);
  };

  const removeData = index => {
    const updatedFormInitialValues = {};
    filter(formInitialValues, (intVal, intKey) => {
      const recordIndex = parseInt(intKey.substring(intKey.lastIndexOf('_') + 1));
      const recordKey = intKey.substring(0,intKey.lastIndexOf('_'));
      if(recordIndex > index ) {
        updatedFormInitialValues[`${recordKey}_${recordIndex-1}`] = intVal
      } else if (recordIndex < index ) {
        updatedFormInitialValues[intKey] = intVal
      }
    });
    setFormInitialValues(updatedFormInitialValues);
    setOrgListArray(
      filter(
        orgListArray,
        (orgListData, orgListDataIndex) => orgListDataIndex !== index
      )
    );
  };

  return (
    <div>
      {hasMultiConfig === 'true' && (
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
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          const OrganizationApplications = [];
          Object.entries(values).map(([key, value], index) => {
            const keyName = key.substring(0, key.indexOf('_'));
            const keyIndex = parseInt(key.substring(key.indexOf('_') + 1));
            if (OrganizationApplications.length - 1 === keyIndex) {
              OrganizationApplications[keyIndex][keyName] = value;
            } else {
              OrganizationApplications.push({ [keyName]: value });
            }
          });

          updateConfigurationFieldsDetails({
            values: { OrganizationApplications },
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
            {orgListArray &&
              orgListArray.length > 0 &&
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
                          label={`${key == 'nameConfig' ? 'Configuration Name' : key.capitalize()
                            }`}
                          name={`${key}_${formItemsObjIndex}`}
                          placeholder={`${key == 'nameConfig' ? 'Configuration Name' : key.capitalize()
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ConfigurationDrawer;
