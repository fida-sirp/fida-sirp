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
  validationList,
  authenticationList,
  permissionList,
  landingList,
  groupList,
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    usr_auth_setting: 'default',
    usr_email: '',
    usr_user_group_id: '',
    usr_role_id: '',
    usr_landing_page: "",
  });

  let validationSchemaStandard = Yup.object({
    usr_email: Yup.string().required('Email is Required'),
    usr_role_id: Yup.string().required('Permission is Required Filed')
  });

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          if (usr_role_id) {
            values.usr_role_id = Number(values.usr_role_id)
          }
          if (usr_user_group_id) {
            values.usr_user_group_id = Number(values.usr_user_group_id)
          }
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
            <SelectBox
              id="usr_auth_setting"
              label="Authentication Type"
              name="usr_auth_setting"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_auth_setting}
              value={values.usr_auth_setting}
              touched={touched.usr_auth_setting}
              width={345}
              options={authenticationList}
              disabled={isSubmitting}
            />

            <InputBox
              id={'usr_email'}
              label={'Email'}
              name={'usr_email'}
              placeholder={'Email'}
              type="email"
              onInputChange={handleChange}
              onBlur={handleBlur}
              value={values.usr_email}
              errorMessage={errors.usr_email}
              touched={touched.usr_email}
              width={345}
              noBorderValidation
            />

            <SelectBox
              id="usr_role_id"
              label="Permissions"
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

            <SelectBox
              id="usr_landing_page"
              label="Default Landing Page"
              name="usr_landing_page"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.usr_landing_page}
              value={values.usr_landing_page}
              touched={touched.usr_landing_page}
              width={345}
              options={landingList}
              disabled={isSubmitting}
            />

            <SelectBox
              id="usr_user_group_id"
              label="Group"
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
                  type="Invite"
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
