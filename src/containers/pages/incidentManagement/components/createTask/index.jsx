import React, { useEffect ,useState} from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import 'antd/dist/antd.css';
import * as Yup from 'yup';

import { Row, Col } from 'antd';
import SPModal from '../../../../../components/SPModal';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import SPDatepicker from '../../../../../components/SPDatepicker';
import TextAreaBox from '../../../../../components/TextAreaBox';
import { isArray } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getTaskCategories,
  getTaskDepartment,
  getTaskUsers
} from '../../../../../actions/tasksManagement';

const optionData = [
  { key: 1, value: 'ipv4', label: 'IPv4' },
  { key: 2, value: 'ipv6', label: 'IPv6' },
];
const statusOption = [
  { key: 'Open', value: 'Open', label: 'Open' },
  { key: 'Close', value: 'Close', label: 'Close' },
];
const initialValues = {
  inv_name: '',
  inv_desc: '',
  inv_start_date: '',
  inv_end_date: '',
  inv_status: '',
  inv_assign_to_id: '',
  inv_task_category: '',
  inv_department: '',
};

const validationSchema = Yup.object({
  inv_name: Yup.string().required('Required'),
  inv_desc: Yup.string().required('Required'),
  inv_start_date: Yup.string().nullable(),
  inv_end_date: Yup.string().nullable(),
  inv_status: Yup.string().required('Required'),
  inv_assign_to_id: Yup.string().nullable(),
  inv_task_category: Yup.string().nullable(),
  inv_department: Yup.string().nullable(),
});

function CreateTask({
  onClose,
  visible,
  onSubmit,
  taskCategoriesState,
  taskDepartmentsState,
  taskUsersState,
  usersList,
  currentTask,
  getTaskCategories,
  getTaskDepartment,
  getTaskUsers,
}) {
  //console.log({ currentTask });

  if (!currentTask) {
    return null;
  }
  const [taskUserList, settaskUserList] = useState([]);
  const [taskCatList, settaskCatList] = useState([]);
  const taskCategories = taskCategoriesState?.listData?.data?.items;
  const taskDepartments = taskDepartmentsState?.listData?.data?.items;
  const taskUsers = taskUsersState?.listData?.data;
    console.log(taskUsers);
    useEffect(() => {
        const listData = taskUsersState?.listData?.data;
        // console.log(listData);
        const TaskUserList = [];
        if (listData && _.isObject(listData)) {
            Object.entries(listData).map(([key, value]) => {
                TaskUserList.push({
                    key:key,
                    value: key,
                    label: value
                })
            })
        }
        settaskUserList(TaskUserList)
    }, [taskUsersState]);



  React.useEffect(() => {
    getTaskCategories();
    getTaskDepartment();
    getTaskUsers();
    // console.log(usersList);
  }, []);

  return (
    <SPModal
      title="Task Creation"
      centered
      visible={visible}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      width={800}
      footer={null}
    >
      <Formik
        id="formik"
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          ...initialValues,
          inv_name: currentTask?.inv_name,
          inv_desc: currentTask?.inv_desc,
          inv_start_date: currentTask?.inv_start_date
            ? moment(currentTask?.inv_start_date)
            : moment(),
          inv_end_date: currentTask?.inv_end_date
            ? moment(currentTask?.inv_end_date)
            : moment(),
          inv_status: currentTask?.inv_status,
          inv_assign_to_id: currentTask?.inv_assign_to_id
            ? String(currentTask?.inv_assign_to_id)
            : '',
          inv_task_category: currentTask?.inv_task_category,
          inv_department: currentTask?.inv_department,
          inv_id: currentTask?.inv_id,
        }}
        onSubmit={(values, { isSubmitting, resetForm }) => {
       
          const reqPayload = {
            ...values,
          };
          //resetForm({});
          reqPayload.inv_id = currentTask?.inv_id;
          onSubmit(reqPayload);
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
            resetForm({});
          }, [currentTask?.inv_name]);

          return (
            <Form onSubmit={handleSubmit}>
              <InputBox
                id="inv_name"
                label="Name"
                name="inv_name"
                placeholder="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.inv_name}
                value={values.inv_name}
                touched={touched.inv_name}
                width={350}
              />
              <TextAreaBox
                id="inv_desc"
                label="Description"
                name="inv_desc"
                placeholder="Description"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.inv_desc}
                value={values.inv_desc}
                touched={touched.inv_desc}
                width={620}
              />
              <SPDatepicker
                id="inv_start_date"
                label="Start date"
                name="inv_start_date"
                placeholder="Start date"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_start_date}
                value={values.inv_start_date}
                touched={touched.inv_start_date}
                disabled={isSubmitting}
                width={170}
              />
              <SPDatepicker
                id="inv_end_date"
                label="End date"
                name="inv_end_date"
                placeholder="End date"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_end_date}
                value={values.inv_end_date}
                touched={touched.inv_end_date}
                disabled={isSubmitting}
                width={170}
              />
              <SelectBox
                id="inv_task_category"
                label="Task Category"
                name="inv_task_category"
                placeholder="Task Category"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_task_category}
                value={values.inv_task_category}
                width={330}
                touched={touched.inv_task_category}
                options={
                  isArray(taskCategories)
                    ? taskCategories.map(taskCategory => ({
                        key: taskCategory?.tca_id,
                        value: taskCategory?.tca_id,
                        label: taskCategory?.tca_name,
                      }))
                    : []
                }
              />
              <SelectBox
                id="inv_status"
                label="Status"
                name="inv_status"
                placeholder="Status"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_status}
                value={values.inv_status}
                width={330}
                touched={touched.inv_status}
                options={statusOption}
              />
              <SelectBox
                id="inv_assign_to_id"
                label="Assigned"
                name="inv_assign_to_id"
                placeholder="Assigned"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_assign_to_id}
                value={values.inv_assign_to_id}
                width={330}
                touched={touched.inv_assign_to_id}
                options={taskUserList}




              />
              <SelectBox
                id="inv_department"
                label="Department"
                name="inv_department"
                placeholder="Department"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.inv_department}
                value={values.inv_department}
                width={330}
                touched={touched.inv_department}
                options={
                  isArray(taskDepartments)
                    ? taskDepartments.map(taskDepartment => ({
                        key: taskDepartment?.dep_id,
                        value: taskDepartment?.dep_id,
                        label: taskDepartment?.dep_name,
                      }))
                    : []
                }
              />

              <Row
                gutter={11}
                justify="end"
                style={{ width: '100%', paddingTop: 40 }}
              >
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={onClose}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={currentTask?.inv_id ? 'Update' : 'Create'}
                    htmlType="submit"
                    size="small"
                    type="primary"
                    onButtonClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </SPModal>
  );
}

const mapStateToProps = state => {
  return {
    taskCategoriesState: state.taskCategories,
    taskDepartmentsState: state.taskDepartments,
    taskUsersState: state.taskUsers,
    usersListState: state.usersList,
  };
};

const mapDispatchToProps = {
  getTaskCategories,
  getTaskDepartment,
  getTaskUsers,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CreateTask
);
