import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  getWorkflowList,
  changeWorkflowStatus,
  duplicateWorkFlow,
  deleteWorkFlow,
  getWorkFlowCategory,
  getWorkFlowSubCategory,
  getWorkFlowTaskCategory,
  createWorkFlowList,
  updateWorkFlowList,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import TickIcon from '../../../../../../assets/svgIcon/tick';
import DuplicateIcon from '../../../../../../assets/svgIcon/duplicate';
import CancelIcon from '../../../../../../assets/svgIcon/cancelIcon';
import { parseUrl } from 'query-string';
import WorkFlowDrawer from './WorkFlowForm';
import SPDrawer from '../../../../../../components/SPDrawer';
import { isEmpty } from 'lodash';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import SPSelect from '../../../../../../components/SPSelect';
import SPSearch from '../../../../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router';
import { showingFilter } from '../../../constant';
import { CoumnWrapper } from '../../../StyledComponents';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { Modal } from 'antd'

const Workflow = ({
  onGetWorkflowList,
  workflow,
  loading,
  changeStatus,
  getCategory,
  getSubCategory,
  getTaskCategory,
  duplicateList,
  deleteList,
  categoryList,
  subCategoryList,
  taskCategoryList,
  createList,
  updateList,
  access
}) => {
  const history = useHistory();
  const { path } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [categoryFormattedList, setCategoryFormattedList] = useState([]);
  const [subCategoryFormattedList, setSubCategoryFormattedList] = useState([]);
  const [taskCategoryFormattedList, setTaskCategoryFormattedList] = useState(
    []
  );

  const {
    wkf_showing = '20',
    wkf_page_no = 1,
    wkf_subject = '',
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(wkf_showing);
  const [searchText, setSearchText] = useState(wkf_subject);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getDetails();
    getCategory();
    getTaskCategory();
  }, [query] || []);

  useEffect(() => {
    if (workflow?.listData?.items) {
      setTotalCount(workflow.listData._meta.totalCount);
      setCurrentPage(workflow.listData._meta.currentPage);
    }
  }, [workflow]);

  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }

    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };

  const onPageChange = pageNumber => {
    handleChange('wkf_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      if (name == 'wkf_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push('/administration/' + activeOption + '?' + qs);
    } else {
      history.push('/administration?' + qs);
    }
    setQuery(qs);
  };

  useEffect(() => {
    const arr = [];
    if (!isEmpty(categoryList)) {
      Object.entries(categoryList).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setCategoryFormattedList(arr);
  }, [categoryList]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(subCategoryList)) {
      Object.entries(subCategoryList).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setSubCategoryFormattedList(arr);
  }, [subCategoryList]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(taskCategoryList)) {
      Object.entries(taskCategoryList).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setTaskCategoryFormattedList(arr);
  }, [taskCategoryList]);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        deleteList({ id: key, query: myQuery });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'wkf_id',
      dataIndex1: 'wkf_id',
      editable: false,
      key: (text, record, index) => record?.wkf_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'wkf_name',
      dataIndex1: 'wkf_name',
      editable: false,
      sorter: true,
      render: (text, record, index) => <CoumnWrapper>{record?.wkf_name}</CoumnWrapper>,
    },
    {
      title: 'Description',
      dataIndex: 'wkf_desc',
      dataIndex1: 'wkf_desc',
      editable: false,
      sorter: true,
      render: (text, record, index) => <CoumnWrapper>{record?.wkf_desc}</CoumnWrapper>,
    },
    {
      title: 'Category',
      dataIndex: 'wkf_incident_category',
      dataIndex1: 'wkf_incident_category',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.wkfIncidentCategory?.ica_name
    },
    {
      title: 'Task Category',
      dataIndex: 'wkf_task_category',
      dataIndex1: 'wkf_task_category',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.wkfTaskCategory?.tca_name
    },
    {
      title: 'Actions',
      dataIndex: 'wkf_id',
      dataIndex1: 'wkf_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-workflow"))){
          const updateWorkflow=    {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setIsCreate(false)
              setOpenDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(updateWorkflow);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-workflow"))){
          const deleteWorkflow=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.wkf_id)
          };
          moreItems.push(deleteWorkflow);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("duplicate-workflow"))){
          const duplicateWorkflow=  {
            key: 'duplicate',
            label: 'Duplicate',
            icon: <DuplicateIcon />,
            onClickItem: () => {
              const myQuery = mapQueryWithApi(query);
              duplicateList({ id: record?.wkf_id, query: myQuery });
            }
          };
          moreItems.push(duplicateWorkflow);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("change-status-workflow"))) {
          if (record?.wkf_status === 'Disable') {
            const myQuery = mapQueryWithApi(query);
            moreItems.push({
              key: 'status',
              label: 'Status',
              icon: <CancelIcon/>,
              onClickItem: () => {
                changeStatus({
                  id: record?.wkf_id,
                  payload: {status: 'Enable'},
                  query: myQuery
                });
              }
            })
          } else {
            const myQuery = mapQueryWithApi(query);
            moreItems.push({
              key: 'status',
              label: 'Status',
              icon: <TickIcon/>,
              onClickItem: () => {
                changeStatus({
                  id: record?.wkf_id,
                  payload: {status: 'Disable'},
                  query: myQuery
                });
              }
            })
          }
        }
        if (moreItems.length !== 0) {
          return (
              <SPSingleSelectDropdown
                  items={moreItems}
                  onSelect={() => {
                  }}
                  title="more"
              />
          );
        }
      },
    },
  ];

  const getDetails = () => {
    const myArrayQry = mapQueryWithApi(query);
    onGetWorkflowList({ queryItem: myArrayQry });
  };

  const handleTableCategory = index => {
    if (!isEmpty(categoryList))
      return Object.entries(categoryList).map(([key, value]) => {
        if (key == index) return value;
      });
  };

  const handleTableTaskCategory = index => {
    if (!isEmpty(taskCategoryList))
      return Object.entries(taskCategoryList).map(([key, value]) => {
        if (key == index) return value;
      });
  };
  const handleCategorySelect = value => {
    getSubCategory({ id: value });
  };

  const subCategorySelect = value => {
    getTaskCategory({ id: value });
  };

  const handleSubmit = values => {
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
      let payload = {
        values,
        id: record.wkf_id,
        query: myArrayQry
      };
      updateList({ payload });
    } else {
      const myArrayQry = mapQueryWithApi(query);
      createList({ payload: values, query: myArrayQry });
    }
    setOpenDrawer(false);
    setRecord({});
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationWorkFlowSearch: {},
        QueryString: '',
      };
      if (parsedQuery.wkf_page_no) {
        queryObject.payload.page = parsedQuery.wkf_page_no;
      }
      if (parsedQuery.wkf_subject) {
        queryObject.applicationWorkFlowSearch.search = parsedQuery.wkf_subject;
      }
      if (parsedQuery.wkf_showing) {
        queryObject.payload['per-page'] = parsedQuery.wkf_showing;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      const applicationWorkFlowSearch = queryObject?.applicationWorkFlowSearch;
      if (Object.keys(applicationWorkFlowSearch).length !== 0) {
        Object.entries(applicationWorkFlowSearch).forEach(([key, val]) => {
          myArrayQry += 'WorkflowSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== '/administration') {
      myArrayQry += 'WorkFlowSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  return (
    <>
      <PageHeader
        title={'Workflow'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-workflow"))) &&
          <SPButton
            title="Create Workflow"
            onButtonClick={() => {
              getCategory();
              setIsCreate(true);
              setRecord({})
              setOpenDrawer(true);
            }}
            size="small"
            image={<PlusIcon />}
          />
        ]}
      />
      <Row
        gutter={[19, 10]}
        style={{
          marginTop: 23,
          marginBottom: 13,
          flexWrap: 'flex',
        }}
      >
        <Col>
          <SPSearch
            text={searchText}
            onChange={e => {
              setSearchText(e.target.value);
            }}
            onEnter={() => {
              handleChange('wkf_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={wkf_showing}
            onChange={e => {
              handleChange('wkf_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={workflow?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Category`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <WorkFlowDrawer
          isVisible={openDrawer}
          recordValue={record}
          isCreated={isCreate}
          submit={handleSubmit}
          handleCategorySelect={handleCategorySelect}
          subCategorySelect={subCategorySelect}
          categoryList={categoryFormattedList}
          subCategoryList={subCategoryFormattedList}
          taskCategoryList={taskCategoryFormattedList}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

Workflow.proptype = {
  onGetWorkflowList: PropTypes.func,
};

const mapStateToProps = state => ({
  workflow: state.administration.workflow,
  loading: state.administration.workflow.loading,
  categoryList: state.administration.workflowCategory.categoryData,
  subCategoryList: state.administration.workflowCategory.subCategoryData,
  taskCategoryList: state.administration.workflowCategory.taskCategoryData,
});

const mapDispatchToProps = dispatch => ({
  onGetWorkflowList: payload => dispatch(getWorkflowList(payload)),
  changeStatus: payload => dispatch(changeWorkflowStatus(payload)),
  duplicateList: payload => dispatch(duplicateWorkFlow(payload)),
  createList: payload => dispatch(createWorkFlowList(payload)),
  updateList: payload => dispatch(updateWorkFlowList(payload)),
  deleteList: payload => dispatch(deleteWorkFlow(payload)),
  getCategory: payload => dispatch(getWorkFlowCategory(payload)),
  getSubCategory: payload => dispatch(getWorkFlowSubCategory(payload)),
  getTaskCategory: payload => dispatch(getWorkFlowTaskCategory(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Workflow);
