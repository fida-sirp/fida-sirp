import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form, isObject } from 'formik';
import moment from 'moment';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import SPDatepicker from '../../../../../components/SPDatepicker';
import {
  HeaderText,
  StyledCol,
  StyledRow,
} from '../assignTaskModal/styledComponents';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import {
  getTaskCategories,
  getTaskDepartment,
  createTask,
  editTask,
  clearCreateTaskState,
} from '../../../../../actions/tasksManagement';
import { getUsersList } from '../../../../../actions/usersManagement';
import { getPrimaryApproversListRequested,} from '../../../../../actions/apps';
import { listOwners } from '../../../../../actions/owners';
import API from '../../../../../config/endpoints.config';
import * as Yup from 'yup';
import { isArray } from 'lodash';
import { isString } from 'lodash';

const validationSchema = Yup.object({
  inv_name: Yup.string().required('Required'),
  inv_start_date: Yup.string().nullable(),
  inv_end_date: Yup.string().nullable(),
  inv_status: Yup.string().nullable().required('Required'),
  inv_assign_to_id: Yup.string().nullable(),
  inv_task_category: Yup.string().nullable(),
  inv_department: Yup.string().nullable(),
});

const statusOption = [
  { key: 'Open', value: 'Open', label: 'OPEN' },
  { key: 'Close', value: 'Close', label: 'CLOSE' },
];

const initialValues = {
  inv_name: null,
  inv_assign_to_id: null,
  inv_department: null,
  inv_start_date: null,
  inv_end_date: null,
  inv_status: undefined,
  assign_dept: [],
};

function TaskForm({
  clearCreateTaskState,
  editTask,
  createTask,
  selectedCase,
  item,
  type,
  addMode,
  onCancel,
  onSave,
  taskDepartments,
  getTaskCategories,
  usersList,
  getPrimaryApproversListRequested,
  taskCategoriesState,
}) {
  const [departmementOptionsData, setDepartmementOptionsData] = useState([]);
  const [assetOwnersOptionsData, setAssetOwnersOptionsData] = useState([]);
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const taskCategories = taskCategoriesState?.listData?.data?.items;

  useEffect(() => {
    getTaskDepartment();
    getTaskCategories();
    getPrimaryApproversListRequested();
  }, []);

  useEffect(() => {
    let locationData = [];
    locationData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (
      isObject(taskDepartments) &&
      Object.keys(taskDepartments).length !== 0
    ) {
      taskDepartments.data.items.forEach(element => {
        locationData.push({
          key: String(`d_${element.dep_id}`),
          value: String(`d_${element.dep_id}`),
          label: element.dep_name,
          GroupLabel: 'Departments',
        });
      });
    }
    setDepartmementOptionsData(locationData);
  }, [taskDepartments]);

  useEffect(() => {
    let assetOwnersData = [];
    assetOwnersData = [];
    if (Object.keys(usersList).length !== 0) {
      usersList.data.forEach(element => {
     
        var data = Object.keys(element);

        assetOwnersData.push({
          key: data[0],
          value: data[0],
          label: String(element[data[0]]),
          GroupLabel: 'Users',
        });
      });
    }

    
    setAssetOwnersOptionsData(assetOwnersData);
  }, [usersList]);


  return (
    <Formik
      id="formik"
      initialValues={
        type === 'edit'
          ? {
              ...item,
              inv_assign_to_id: item?.inv_assign_to_id
                ? `u_${item?.inv_assign_to_id}`
                : null,
              inv_department: item?.inv_department
                ? `d_${item?.inv_department}`
                : null,
            }
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm,setFieldValue }) => { 
        if (values.inv_start_date) {
          values = {
            ...values,
            inv_end_date: moment(values.inv_end_date).format(dateFormat),
          };
        }
        if (values.inv_start_date) {
          values = {
            ...values,
            inv_end_date: moment(values.inv_end_date).format(dateFormat),
          };
        }
        values = { ...values, inv_incidents_id: selectedCase.iti_id };

        if (type === 'edit') {
          values = { ...values, inv_id: item.inv_id };
          const payload = values;
          payload.inv_assign_to_id = isString(payload.inv_assign_to_id)
            ? payload.inv_assign_to_id.replace('u_', '')
            : undefined;
          payload.inv_department = isString(payload.inv_department)
            ? payload.inv_department.replace('d_', '')
            : undefined;

          console.log({ payload });
          editTask({
            ...values,
            callback: newTask => {
              clearCreateTaskState();
              resetForm();
              onSave(newTask, item.inv_id);
            },
          });
        } else {
          const payload = values;
       
          payload.inv_assign_to_id = isString(values?.assign_dept?.[0])
            ? values?.assign_dept?.[0].replace('u_', '')
            : undefined;
          payload.inv_department = isString(values?.assign_dept?.[1])
            ? values?.assign_dept?.[1].replace('d_', '')
            : undefined;
          createTask({
            url: API.incidentManagementModule.task.create,
            payload: payload,
            callback: newTask => {
           
              onSave(newTask);
              
              // setIncidentTasks([newTask, ...incidentTasks]);
            },
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
      }) => {

        const onCancelData = () => {
          resetForm();
       
          setFieldValue('assign_dept',[]);
      
          onCancel();
        }

        useEffect(() => {
          resetForm();
          setFieldValue('assign_dept',[]);
        }, [addMode]);



        return (
          <Form onSubmit={handleSubmit}>
            {type !== 'edit' && (
              <div style={{ padding: 16 }}>
                <HeaderText>Create New Task</HeaderText>
              </div>
            )}
          
            <StyledRow>
              <StyledCol width="14%">
                <InputBox
                  id="inv_name"
                  name="inv_name"
                  width={150}
                  placeholder="Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  value={values.inv_name}
                  touched={touched.inv_name}
                  noMargin
                  noBorderValidation
                />
              </StyledCol>

              <StyledCol width="14%">
                <SelectBox
                  mode={type !== 'edit' ? 'multiple' : undefined}
                  setHightAuto
                  group={type !== 'edit'}
                  groupList={[
                    { groupName: 'Users' },
                    { groupName: 'Departments' },
                  ]}
                  id="inv_assign_to_id"
                  name={type !== 'edit' ? 'assign_dept' : 'inv_assign_to_id'}
                  placeholder={
                    type !== 'edit' ? 'Select User & Dept.' : 'Select User'
                  }
                  onInputChange={(name, val, option) => {
                    if(type !== 'edit'){
                      
                    const vl = values.assign_dept;
                    const user = val.reverse().find(v => v?.startsWith('u_'));
                    const dept = val.find(v => v?.startsWith('d_'));
                    vl[0] = user;
                    vl[1] = dept;
                   
                    setFieldValue(
                      'assign_dept',
                      vl.filter(_v => _v !== undefined && _v !== '')
                    );
                    }else{
                      
                      setFieldValue(
                        'inv_assign_to_id',
                       val
                      );
                    }
                  }}
                  onBlur={handleBlur}
                  value={
                    type !== 'edit'
                      ? values.assign_dept
                      : values.inv_assign_to_id
                  }
                  touched={touched.inv_assign_to_id}
                  noMargin
                  options={
                    type !== 'edit'
                      ? [...assetOwnersOptionsData, ...departmementOptionsData]
                      : assetOwnersOptionsData
                  }
                  width={150}
                />
              </StyledCol>

              {type !== 'edit' ? (
                <StyledCol width="14%">
                  <SelectBox
                    id="inv_task_category"
                    name="inv_task_category"
                    placeholder="Select Category"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    value={values.inv_task_category}
                    touched={touched.inv_task_category}
                    noMargin
                    options={
                      isArray(taskCategories)
                        ? taskCategories.map(taskCategory => ({
                            key: taskCategory?.tca_id,
                            value: taskCategory?.tca_id,
                            label: taskCategory?.tca_name,
                          }))
                        : []
                    }
                    width={150}
                  />
                </StyledCol>
              ) : (
                <StyledCol width="14%">
                  <SelectBox
                    id="inv_department"
                    name="inv_department"
                    placeholder="Select Department"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    value={values.inv_department}
                    touched={touched.inv_department}
                    noMargin
                    options={departmementOptionsData}
                    width={150}
                  />
                </StyledCol>
              )}
              <StyledCol width="14%">
                <SelectBox
                  id="inv_status"
                  name="inv_status"
                  noMargin
                  placeholder="Select Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.inv_status}
                  value={values.inv_status}
                  width={150}
                  touched={touched.inv_status}
                  options={statusOption}
                />
              </StyledCol>

              <StyledCol width="14%">
                <SPDatepicker
                  id="inv_start_date"
                  name="inv_start_date"
                  width={150}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  touched={touched.inv_start_date}
                  placeholder="Select Date"
                  value={
                    values.inv_start_date
                      ? moment(values.inv_start_date)
                      : undefined
                  }
                  noMargin
                />
              </StyledCol>
              <StyledCol width="14%">
                <SPDatepicker
                  id="inv_end_date"
                  name="inv_end_date"
                  width={150}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  placeholder="Select Date"
                  touched={touched.inv_end_date}
                  value={
                    values.inv_end_date
                      ? moment(values.inv_end_date)
                      : undefined
                  }
                  noMargin
                />
              </StyledCol>

              <StyledCol width="12%" justifyContent="space-around">
                <StyledCol width="47%">
                  <SPButton
                    title={type === 'edit' ? 'Update' : 'Save'}
                    type="primary"
                    size="small"
                    htmlType="submit"
                  />
                </StyledCol>
                <StyledCol width="53%">
                  <SPButton
                    title="Cancel"
                    type="secondary"
                    size="small"
                    onButtonClick={onCancelData}
                  />
                </StyledCol>
              </StyledCol>
            </StyledRow>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = state => {
  return {
    taskDepartments: state.taskDepartments.listData,
    taskCategoriesState: state.taskCategories,
    taskCreated: state.taskCreate,
    
    usersList: state.appPrimaryApproversList?.listData,
    isUpdated: state.taskCreate.isUpdated,
  };
};

const mapDispatchToProps = {
  getTaskCategories,
  getTaskDepartment,
  createTask,
  listOwners,
  getPrimaryApproversListRequested,
  editTask,
  clearCreateTaskState,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC
)(TaskForm);
