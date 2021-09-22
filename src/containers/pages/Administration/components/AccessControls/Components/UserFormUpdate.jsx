import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';

function UserFormDrawer({
  recordValue,
  submit,
  closeDrawer,
  groupList,
  permissionList,
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    usr_name: '',
    usr_email: '',
    usr_user_group_id: '',
    usr_role_id: '',
    usr_phone_number: '',
    usr_mobile_number: '',
    usr_designation: '',
    usr_status: '',
    usr_google_auth_enable: '',
  });

  let validationSchemaStandard = Yup.object({
    // aio_type: Yup.string().required('Required'),
  });
  const statusOptions = [
    {
      key: 'Enable',
      value: 'Enable',
      label: 'Enable',
    },
    {
      key: 'Disable',
      value: 'Disable',
      label: 'Disable',
    },
  ];
  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['usr_name'] = recordValue.usr_name;
      initialValues['usr_email'] = recordValue.usr_email;
      initialValues['usr_phone_number'] = recordValue.usr_phone_number;
      initialValues['usr_mobile_number'] = recordValue.usr_mobile_number;
      initialValues['usr_designation'] = recordValue.usr_designation;
      initialValues['usr_status'] = recordValue.usr_status;
      initialValues['usr_role_id'] = recordValue.usr_role_id
        ? String(recordValue.usr_role_id)
        : '';
      initialValues['usr_user_group_id'] = recordValue.usr_user_group_id
        ? String(recordValue.usr_user_group_id)
        : '';
      initialValues['usr_google_auth_enable'] =
        recordValue.usr_google_auth_enable;

      setFormInitialValues(initialValues);
    }
  }, [recordValue]);
  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          submit(values);
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
        }) => (
          <Form>
            <InputBox
              id={'usr_name'}
              label={'Name'}
              name={'usr_name'}
              placeholder={'Type'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_name}
              errorMessage={errors.usr_name}
              touched={touched.usr_name}
              width={345}
              noBorderValidation
            />
            <InputBox
              id={'usr_email'}
              label={'Email'}
              name={'usr_email'}
              placeholder={'Type'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_email}
              errorMessage={errors.usr_email}
              touched={touched.usr_email}
              width={345}
              noBorderValidation
            />
            <SelectBox
              id="usr_user_group_id"
              label="Group Name"
              name="usr_user_group_id"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_user_group_id}
              value={values.usr_user_group_id}
              touched={touched.usr_user_group_id}
              width={345}
              options={groupList}
              disabled={isSubmitting}
            />
            <SelectBox
              id="usr_role_id"
              label="Role"
              name="usr_role_id"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_role_id}
              value={values.usr_role_id}
              touched={touched.usr_role_id}
              width={345}
              options={permissionList}
              disabled={isSubmitting}
            />
            <InputBox
              id={'usr_phone_number'}
              label={'Phone Number'}
              name={'usr_phone_number'}
              placeholder={'Phone Number'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_phone_number}
              errorMessage={errors.usr_phone_number}
              touched={touched.usr_phone_number}
              width={345}
              noBorderValidation
            />
            <InputBox
              id={'usr_mobile_number'}
              label={'Mobile Number'}
              name={'usr_mobile_number'}
              placeholder={'Mobile Number'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_mobile_number}
              errorMessage={errors.usr_mobile_number}
              touched={touched.usr_mobile_number}
              width={345}
              noBorderValidation
            />
            <InputBox
              id={'usr_designation'}
              label={'Designation'}
              name={'usr_designation'}
              placeholder={'Type'}
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_designation}
              errorMessage={errors.usr_designation}
              touched={touched.usr_designation}
              width={345}
              noBorderValidation
            />
            <SelectBox
              id="usr_status"
              label="Status"
              name="usr_status"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_status}
              value={values.usr_status}
              touched={touched.usr_status}
              width={345}
              options={statusOptions}
              disabled={isSubmitting}
            />
            <SelectBox
              id="usr_google_auth_enable"
              label="Google Authenticator"
              name="usr_google_auth_enable"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_google_auth_enable}
              value={values.usr_google_auth_enable}
              touched={touched.usr_google_auth_enable}
              width={345}
              options={statusOptions}
              disabled={isSubmitting}
            />
            <Row gutter={11} justify="end" style={{ width: 640 }}>
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
                  type="Update"
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

export default UserFormDrawer;
