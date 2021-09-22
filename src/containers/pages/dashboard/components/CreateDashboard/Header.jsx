import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';

import { HeaderContainer, StyledButton } from './StyledComponents';
import SelectBox from '../../../../../components/SelectBox';
import SPButton from '../../../../../components/SPButton';
import SPModal from '../../../../../components/SPModal';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import EditImg from '../../../../../assets/images/Shape.png';
import BackArrowOutline from '../../../../../assets/svgIcon/backArrowOutline';

const Header = ({
  handleCreateDashboard,
  record,
  isEdit,
  userProfile
}) => {
  const location = useLocation();
  const [visible, setVisible] = useState(!isEdit);
  const history = useHistory();

  let validationSchemaStandard = Yup.object({
    das_name: Yup.string().required('Required'),
    das_description: Yup.string().required('Required'),

  });

  const initialValues = {
    das_name: isEdit && record?.das_name || "",
    das_description: isEdit && record?.das_description || ""
  }



  const ModalDashboard = () => {
    return (
      <SPModal
        title="Dasboard"
        centered
        visible={visible}
        onOk={() => onClose()}
        maskClosable={!isEdit}
        // onCancel={}
        width={500}
        footer={null}
      >

        <Formik
          id="formik"
          validationSchema={validationSchemaStandard}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            handleCreateDashboard(values);
            setVisible(false);
          }}
          enableReinitialize
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
            // useEffect(() => {
            //   resetForm()
            // }, [isVisible])
            return (
              <Form>
                <InputBox
                  id="das_name"
                  label="Dashboard name"
                  name="das_name"
                  placeholder="Text field"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.das_name}
                  value={values.das_name}
                  touched={touched.das_name}
                  width={350}
                />
                <TextAreaBox
                  id="das_description"
                  label="Dashboard description"
                  name="das_description"
                  placeholder="Text field"
                  className=""
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.das_description}
                  value={values.das_description}
                  touched={touched.das_description}
                  width={350}
                />
                <Row gutter={11} justify="end" style={{ justifyContent: 'center' }}>
                  <Col>
                    <SPButton
                      title="Cancel"
                      size="small"
                      type="secondary"
                      onButtonClick={() => {
                        if (isEdit) {
                          setVisible(false);
                        } else {
                          history.push('/dashboard/list')
                        }
                      }
                      }
                    />
                  </Col>
                  <Col>
                    <SPButton
                      title={isEdit ? 'Edit' : 'Save'}
                      size="small"
                      type="primary"
                      // type="submit"
                      onButtonClick={handleSubmit}
                    />
                  </Col>
                </Row>
              </Form>
            )
          }}
        </Formik>
      </SPModal>
    );
  }

  const onClose = () => setVisible(false);
  return (
    <HeaderContainer>
      {isEdit && 
        <>
          <StyledButton
            onClick={() => history.push(`/dashboard/list`)}
          >
            <BackArrowOutline />
          </StyledButton>
          <p>{record?.das_name}</p>
          {userProfile?.usr_id === record?.das_created_by &&
            <img
              src={EditImg}
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => setVisible(true)}
            />
          }
        </>
      }
      
      {/* <SPButton
        onButtonClick={() => {
          setVisible(true);
        }}
        title="Save changes"
        size="small"
      /> */}
      {/* <ActiveDashboardSelect>
        <SelectBox
          id=""
          label=""
          name=""
          placeholder=""
          onInputChange={() => { }}
          errorMessage=""
          value={'Active dashboard'}
          options={[{ key: 'Active dashboard', value: 'Active dashboard', label: 'Active dashboard' }]}
          width={200}
        />
      </ActiveDashboardSelect> */}

      <ModalDashboard />


    </HeaderContainer>
  );
};
export default Header;
