import React, { useEffect } from 'react';
import { Formik, isObject } from 'formik';
import { Row, Col, Form } from 'antd';
import { isArray } from 'lodash';
import * as Yup from 'yup';

import { SModal } from '../SendEmailModal/StyledComponents';
import { RowDiv } from '../incidentDetailsBox/StyledComponents';
import SelectBox from '../../../../../components/SelectBox';
import SPButton from '../../../../../components/SPButton';
import loaderImg from '../../../../../assets/images/loader.gif';
import {
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementSeverityAction,
} from '../../../../../actions/incidentMasterData';
import { compose } from 'redux';
import { connect } from 'react-redux';

let ResetFormFunctionInstace;

const priorities = ['High', 'Medium', 'Low'];
const statusList = [
  { key: 'open', value: 'open', label: 'Open' },
  { key: 'close', value: 'close', label: 'Close' },
  { key: 'deferred', value: 'deferred', label: 'Deferred' },
];
const validationSchema = Yup.object({
  iti_priority: Yup.string().nullable(),
  iti_attack_severity: Yup.string().nullable(),
  iti_ticket_status: Yup.string().nullable(),
  iti_disposition_id: Yup.string().nullable(),
  iti_category_id: Yup.string().nullable(),
});
const BulkUpdateModal = props => {
  React.useEffect(() => {
    if (props.visible) {
      props.getIncidentManagementSeverityAction();
      props.getIncidentManagementcategoryAction();
      props.getIncidentManagementdispositionAction();
    }
    if (ResetFormFunctionInstace) {
      ResetFormFunctionInstace({});
    }
  }, [props.visible]);
  const formMaster = props.formMaster ?? {};
 
  const formLoader = props.formLoader ?? {};
  const onChangeCategory = props.onChangeCategory
    ? props.onChangeCategory
    : () => null;
  const onChangeDisposition = props.onChangeDisposition
    ? props.onChangeDisposition
    : () => null;

  const incidentMasterDispositionList = isArray(
    formMaster?.incidentMasterDisposition?.result
  )
    ? formMaster?.incidentMasterDisposition?.result.map(disposition => {
        return {
          label: disposition?.ids_name,
          value: disposition?.ids_id,
          key: disposition?.ids_id,
        };
      })
    : [];

 
  return (
    <SModal
      title="Bulk Update"
      visible={props.visible}
      onCancel={props.onCancel}
      width="825px"
      footer={[]}
    >
      <Formik
        id="formik"
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
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
            ResetFormFunctionInstace = resetForm;
            resetForm({});
          }, [props.visible]);

          return (
            <Form>
              <Row>
                <Col span={8}>
                  <SelectBox
                    padding={4}
                    id="iti_priority"
                    label="Priority"
                    name="iti_priority"
                    placeholder="Priority"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_priority}
                    value={values?.iti_priority}
                    touched={touched.iti_priority}
                    options={priorities.map(s => {
                      return {
                        label: s,
                        value: s,
                      };
                    })}
                  />
                </Col>
                <Col span={8}>
                  <SelectBox
                    padding={4}
                    id="iti_attack_severity"
                    label="Severity"
                    name="iti_attack_severity"
                    placeholder="Severity"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_attack_severity}
                    value={values?.iti_attack_severity}
                    touched={touched.iti_attack_severity}
                    options={
                      isObject(formMaster?.severity)
                        ? Object.keys(formMaster?.severity).map(s => {
                            return {
                              label: s,
                              value: s,
                            };
                          })
                        : []
                    }
                  />
                </Col>
                <Col span={8}>
                  <SelectBox
                    padding={4}
                    id="iti_ticket_status"
                    label="Status"
                    name="iti_ticket_status"
                    placeholder="Status"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_ticket_status}
                    value={values?.iti_ticket_status}
                    touched={touched.iti_ticket_status}
                    options={statusList}
                  />
                </Col>
                <Col span={8}>
                  <SelectBox
                    padding={4}
                    id="iti_disposition_id"
                    label="Disposition"
                    name="iti_disposition_id"
                    placeholder="Disposition"
                    onInputChange={(name, val) => {
                      setFieldValue(name, val);
                      setFieldValue('iti_disposition_sub_category_id', '');
                      onChangeDisposition(val);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_disposition_id}
                    value={values?.iti_disposition_id}
                    touched={touched.iti_disposition_id}
                    options={incidentMasterDispositionList}
                  />
                </Col>
                <Col span={8}>
                  {formLoader?.subDisposition && false ? (
                    <img
                      src={loaderImg}
                      style={{
                        height: 50,
                        width: 50,
                        margin: 28,
                      }}
                    />
                  ) : (
                    <SelectBox
                      padding={4}
                      loading={formLoader?.subDisposition}
                      id="iti_disposition_sub_category_id"
                      label="Disposition Subcategory"
                      name="iti_disposition_sub_category_id"
                      placeholder="Disposition Subcategory"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.iti_disposition_sub_category_id}
                      value={values?.iti_disposition_sub_category_id}
                      touched={touched.iti_disposition_sub_category_id}
                      options={
                        isObject(
                          formMaster?.incidentMasterSubDisposition?.result
                        )
                          ? Object.keys(
                              formMaster?.incidentMasterSubDisposition?.result
                            ).map(subdisposition => {
                              const name =
                                formMaster?.incidentMasterSubDisposition
                                  ?.result?.[subdisposition];
                              return {
                                label: name,
                                value: subdisposition,
                                key: subdisposition,
                              };
                            })
                          : []
                      }
                    />
                  )}
                </Col>
                <Col span={8}>
                  <SelectBox
                    padding={4}
                    id="iti_category_id"
                    label="Category"
                    name="iti_category_id"
                    placeholder="Category"
                    onInputChange={(name, val) => {
                      setFieldValue(name, val);
                      setFieldValue('itiSubcategory', []);
                      onChangeCategory(val);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.iti_category_id}
                    value={values?.iti_category_id}
                    touched={touched.iti_category_id}
                    options={
                      isObject(formMaster?.incidentMasterCategory?.result)
                        ? Object.keys(
                            formMaster?.incidentMasterCategory?.result
                          ).map(category => {
                            const name =
                              formMaster?.incidentMasterCategory?.result?.[
                                category
                              ];
                            return {
                              label: name,
                              value: category,
                            };
                          })
                        : []
                    }
                  />
                </Col>
                <Col span={8}>
                  {formLoader?.subCategory && false ? (
                    <img
                      src={loaderImg}
                      style={{
                        height: 50,
                        width: 50,
                        margin: 28,
                      }}
                    />
                  ) : (
                    <SelectBox
                    width={610}
                      loading={formLoader?.subCategory}
                      padding={4}
                      setHightAuto={true}
                      id="itiSubcategory"
                      label="SubCategories"
                      name="itiSubcategory"
                      placeholder="Subcategories"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.itiSubcategory}
                      value={values?.itiSubcategory}
                      touched={touched.itiSubcategory}
                      mode="multiple"
                      options={
                        isArray(formMaster?.incidentMasterSubCategory)
                          ? formMaster?.incidentMasterSubCategory
                          : []
                      }
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <SPButton
                  onButtonClick={handleSubmit}
                  title="Update"
                  size="small"
                />
              </Row>
            </Form>
          );
        }}
      </Formik>
    </SModal>
  );
};

const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = {
  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  BulkUpdateModal
);
