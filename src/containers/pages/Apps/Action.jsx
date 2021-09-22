import React, { useState, useEffect } from 'react';
import Pencil from '../../../assets/svgIcon/pencil';
import { SaveIcon } from '../../../assets/svgIcon';
import SPTable from '../../../components/SPTable';
import SelectBox from '../../../components/SelectBox';
import { isEmpty, map } from 'lodash';

import { Formik } from 'formik';
const Action = ({
  id,
  appsDetails,
  actionList,
  getAppsDetails,
  workFlowDetails,
  updateWorkFlow,
  actionsListIsLoading,
}) => {
  const [workFlowData, setWorkFlowData] = useState([]);
  const [workFlowOptions, setWorkFlowOptions] = useState({});
  const [selectWorkFlow, setSelectedWorkFlow] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setWorkFlowData(appsDetails);
  }, [appsDetails]);

  useEffect(() => {
    setTotalCount(actionList?._meta?.totalCount);
    setCurrentPage(appsDetails?._meta?.currentPage)
  }, [actionList]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(workFlowDetails)) {
      Object.entries(workFlowDetails).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    arr.splice(0, 0, {
      key: '',
      value: '',
      label: '',
    });
    setWorkFlowOptions(arr);
  }, [workFlowDetails]);

  const addUpdateIndex = index => {
    const updatedWorkFlowData = map(workFlowData, (workflow, workflowIndex) => {
      if (workflowIndex === index) {
        workflow.isEditable = !workflow.isEditable;
      }
      return workflow;
    });
    setWorkFlowData(updatedWorkFlowData);
  };

  const handleWorkFlowSelectToggle = (record, index) => {
    return record?.isEditable ? (
      <Formik
        id="formik"
        initialValues={{
          app_workflow: record?.approvalMapping?.apmWorkflow?.apw_name
            ? record?.approvalMapping?.apmWorkflow?.apw_name
            : '',
        }}
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
          <SelectBox
            noMargin
            id="app_workflow"
            label=""
            name="app_workflow"
            onInputChange={(name, value) => {
              setFieldValue(name, value);
              setSelectedWorkFlow({
                id: record.act_id,
                payload: { [name]: value },
              });
            }}
            onBlur={handleBlur}
            errorMessage={errors.crg_status}
            value={values.app_workflow}
            touched={touched.crg_status}
            style={{ marginBottom: 0 }}
            width={150}
            options={workFlowOptions}
          />
        )}
      </Formik>
    ) : (
      record?.approvalMapping?.apmWorkflow?.apw_name
    );
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'app_id',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'App',
      dataIndex: 'app',
      editable: false,
      width: 267,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => record?.actApp?.app_product_name,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => record?.act_name,
    },
    {
      title: 'Input Type',
      dataIndex: 'input_type',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) =>
        record?.actInputType?.aio_type ? record.actInputType.aio_type : 'n/a',
    },
    {
      title: 'Output Type',
      dataIndex: 'output_type',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => record?.actOutputType?.aio_type,
    },
    {
      title: 'Workflow',
      dataIndex: 'workflow',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => {
        return handleWorkFlowSelectToggle(record, index);
      },
    },
    {
      title: 'Actions',
      dataIndex: 'config_icon',
      render: (text, record, index) => {
        return record?.isEditable ? (
          <a
            onClick={async () => {
              await updateWorkFlow(selectWorkFlow);
              await addUpdateIndex(index);
              await setSelectedWorkFlow({});
              // await getAppsDetails({ id });
            }}
          >
            <SaveIcon />
          </a>
        ) : (
          <a
            onClick={() => {
              addUpdateIndex(index);
            }}
          >
            <Pencil />
          </a>
        );
      },
    },
  ];

  return (
    <SPTable
      columns={columns}
      dataSource={workFlowData}
      emptyText="No Data"
      totalRecords={totalCount}
      showingTill={'20'}
      canPaginate
      currentShowing={1}
      isLoading={actionsListIsLoading}
    />
  );
};

export default Action;
