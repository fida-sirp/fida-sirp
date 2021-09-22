import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  AppWorkFlowBtn,
  AppWorkFlowControllers,
  AppWorkFlowHeaderContainer,
} from './StyledComponents';
import {
  getAppsDetailsRequested,
  createApplicationRequested,
  updateApplicationApprovalRequested,
  getApprovalFlowListRequested,
  getPrimaryApproversListRequested,
  updateApprovalWorkFlowDetailsRequested,
  deleteApprovalWorkFlowRequested,
  createWorkFlow,
} from '../../../../actions/apps';
import queryString from 'query-string';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../../components/SPSearch';
import SPSelect from '../../../../components/SPSelect';
import SPTable from '../../../../components/SPTable';
import PageHeader from '../../../layout/pageHeader';
import SPDrawer from '../../../../components/SPDrawer';
import SPButton from '../../../../components/SPButton';
import Create from './create';
import Dustbin from '../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../assets/svgIcon/pencil';
import 'antd/dist/antd.css';
import EditWorkFlow from './Edit';
import { Modal } from 'antd'
import { isEmpty } from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SPSingleSelectDropdown from '../../../../components/SPSingleSelectDropdown';

const statusFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'enable',
    value: 'Enable',
  },
  {
    key: 'disable',
    value: 'Disable',
  },
];

const showingFilter = [
  {
    key: '10',
    value: '10',
  },
  {
    key: '20',
    value: '20',
  },
  {
    key: '30',
    value: '30',
  },
  {
    key: '40',
    value: '40',
  },
  {
    key: '50',
    value: '50',
  },
];

function ApprovalWorkFlow({
  appsDetails,
  getApprovalFlowListRequested,
  appApprovalFlowList,
  getPrimaryApproversListRequested,
  appPrimaryApproversList,
  updateApprovalWorkFlowDetailsRequested,
  deleteApprovalWorkFlowRequested,
  profile,
  createApproval,
}) {
  const history = useHistory();
  const [query, setQuery] = useState(location.search);
  const [selectedVendorId, setSelectedVendorId] = useState();
  const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('10');
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [updatedApproversList, setUpdatedApproversList] = useState();
  const [formattedApproversList, setFormattedApproversList] = useState([]);
  const [
    showUpdateApprovalWorkFlowDrawer,
    setShowUpdateApprovalWorkFlowDrawer,
  ] = useState(false);
  const [selectedApprovalInfo, setSelectedApprovalInfo] = useState();
  const { path } = useParams();

  const {
    app_status = 'all',
    app_showing = '20',
    app_page_no = 1,
    app_subject,
    sort = undefined,
  } = queryString.parse(query);

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete this io type?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteApprovalWorkFlowRequested({ id: key, query: myArrayQry });
      },
      onCancel() { },
    });
  }
  const [searchText, setSearchText] = useState(app_subject);

  const columns = [
    {
      title: '#',
      dataIndex: 'apw_id',
      editable: false,
      key: (text, record, index) => index,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'apw_name',
      editable: false,
      sorter: true,
      width: 350,
      key: (text, record, index) => index,
      render: (text, record, index) => record.apw_name,
    },
    {
      title: 'Status',
      dataIndex: 'apw_status',
      editable: false,
      sorter: true,
      key: (text, record, index) => index,
      render: (text, record, index) => record.apw_status,
    },
    {
      title: '	Primary Approvers',
      dataIndex: 'apw_primary_approvers',
      editable: false,
      sorter: true,
      width: 230,
      key: (text, record, index) => index,
      render: (text, record, index) =>
        ApproversList(record.apw_primary_approvers),
    },
    {
      title: 'Primary Failover',
      dataIndex: 'apw_primary_failover',
      editable: false,
      sorter: true,
      key: (text, record, index) => index,
      render: (text, record, index) => {
        return record.primary.pts_hour + ':' + record.primary.pts_minutes;
      },
    },
    {
      title: 'Secondary Approvers',
      dataIndex: 'apw_secondary_approvers',
      editable: 500,
      width: 230,
      sorter: true,
      key: (text, record, index) => index,
      render: (text, record, index) =>
        ApproversList(record.apw_secondary_approvers),
    },
    {
      title: 'Secondary Failover',
      dataIndex: 'apw_secondary_failover',
      editable: false,
      sorter: true,
      width: 230,
      key: (text, record, index) => index,
      render: (text, record, index) => {
        return record.secondary.ste_hour + ':' + record.secondary.ste_minutes;
      },
    },
    {
      title: 'Executive Approvers',
      dataIndex: 'apw_executive_approvers',
      width: 230,
      sorter: true,
      key: (text, record, index) => index,
      render: (text, record, index) =>
        ApproversList(record.apw_executive_approvers),
    },
    {
      title: 'Actions',
      dataIndex: 'config_icon',
      render: (text, record, index) => {
        const moreItems = [
          {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setSelectedApprovalInfo(record);
              setShowUpdateApprovalWorkFlowDrawer(true)
            },
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.apw_id),
          },
        ];
        return (
          <SPSingleSelectDropdown
            items={moreItems}
            onSelect={() => { }}
            title="more"
          />
        );
      },
    },

  ];
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  const ApproversList = id => {
    if (id && !isEmpty(updatedApproversList)) {
      return updatedApproversList
        .filter(list => id.split(',').includes(list.value))
        .map(data => data.label)
        .toString()
        .replace(',', ', ');
    } else return [];
  };
  useEffect(() => {
    getPrimaryApproversListRequested();
    getApplicationApprovalList();
  }, [query] || []);

  const getApplicationApprovalList = () => {
    const myArrayQry = mapQueryWithApi(query);
    getApprovalFlowListRequested({ queryItem: myArrayQry, path });
  };
  useEffect(() => {
    if (appApprovalFlowList?.listData?.data?.items) {
      setTotalCount(appApprovalFlowList.listData.data._meta.totalCount);
      setCurrentPage(appApprovalFlowList.listData.data._meta.currentPage);
    }
  }, [appApprovalFlowList]);

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationWorkFlowSearch: {},
        QueryString: '',
      };
      if (parsedQuery.app_page_no) {
        queryObject.payload.page = parsedQuery.app_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.app_status) {
        queryObject.applicationWorkFlowSearch.app_status =
          parsedQuery.app_status;
      }
      if (parsedQuery.app_subject) {
        queryObject.applicationWorkFlowSearch.search = parsedQuery.app_subject;
      }
      if (parsedQuery.app_showing) {
        queryObject.payload['per-page'] = parsedQuery.app_showing;
      }
      const applicationWorkFlowSearch = queryObject?.applicationWorkFlowSearch;
      if (Object.keys(applicationWorkFlowSearch).length !== 0) {
        Object.entries(applicationWorkFlowSearch).forEach(([key, val]) => {
          myArrayQry += 'ApplicationWorkflowSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'approval-workflow') {
      myArrayQry +=
        'ApplicationWorkflowSearch[adv_type]=' +
        location.pathname.split('/').pop();
    }

    return myArrayQry;
  }

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push('/approval-workflow/' + activeOption + '?' + qs);
    } else {
      history.push('/approval-workflow?' + qs);
    }
    setQuery(qs);
  };

  const getApplicationList = () => {
    const myArrayQry = mapQueryWithApi(query);
    getAppsDetailsRequested({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    getApplicationList();
  }, [query] || []);

  useEffect(() => {
    const queryObject = {
      app_subject: app_subject,
      ...(app_showing !== '20' && { app_showing: app_showing }),
      ...(app_status !== 'all' && { app_status: app_status }),
      ...(app_page_no !== 1 && { app_page_no: app_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setMypage(app_page_no);
    setShowing(app_showing);
    const qs = queryString.stringify(queryObject);
  }, [searchText, app_status, app_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      if (name == 'app_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([
    'status',
    'disposition',
    'showing',
    'showing',
    'status',
  ]);

  const onPageChange = pageNumber => {
    handleChange('app_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (appPrimaryApproversList?.listData?.data) {
      let createApproversList = [];
      if (appPrimaryApproversList?.listData?.data) {
        Object.entries(appPrimaryApproversList?.listData?.data).map(
          ([key, value], index) => {
            let approverKey = Object.keys(value);
            let approverValue = Object.values(value);
            var formattedKey = approverKey[0].match(/u_(.*)/);
            createApproversList.push({
              key: approverKey[0],
              value: formattedKey[1],
              label: approverValue[0],
            });
          }
        );
        setUpdatedApproversList(createApproversList);
      }
    }
  }, [appPrimaryApproversList?.listData?.data]);

  const onCreateDrawerOpen = () => {
    // getPrimaryApproversListRequested();
    setIsCreateDrawerVisible(true);
  };

  const onCreateDrawerClose = () => {
    setIsCreateDrawerVisible(false);
  };

  const createApplication = async values => {
    const myArrayQry = mapQueryWithApi(query);
    let payload = {};
    payload['apw_name'] = values.apw_name;
    payload['apw_status'] = values.apw_status;
    payload['apw_primary_approvers'] = values.apw_primary_approvers.toString();
    payload['pts_hour'] = values.pts_hour;
    payload['pts_minutes'] = values.pts_minutes;
    payload['ste_hour'] = values.ste_hour;
    payload['ste_minutes'] = values.ste_minutes;
    payload[
      'apw_secondary_approvers'
    ] = values.apw_secondary_approvers.toString();
    payload[
      'apw_executive_approvers'
    ] = values.apw_executive_approvers.toString();
    await createApproval({ values: payload, query: myArrayQry });
    setIsCreateDrawerVisible(false);
    await getPrimaryApproversListRequested();
  };

  const updateApplication = async values => {
    let payload = {};
    const myArrayQry = mapQueryWithApi(query);
    payload['apw_name'] = values.apw_name;
    payload['apw_status'] = values.apw_status;
    payload['apw_primary_approvers'] = values.apw_primary_approvers.toString();
    payload['pts_hour'] = values.pts_hour;
    payload['pts_minutes'] = values.pts_minutes;
    payload['ste_hour'] = values.ste_hour;
    payload['ste_minutes'] = values.ste_minutes;
    payload[
      'apw_secondary_approvers'
    ] = values.apw_secondary_approvers.toString();
    payload[
      'apw_executive_approvers'
    ] = values.apw_executive_approvers.toString();
    updateApprovalWorkFlowDetailsRequested({
      values: payload,
      id: selectedApprovalInfo.apw_id,
      query: myArrayQry
    });
    setShowUpdateApprovalWorkFlowDrawer(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;

    if (sorter.order === 'ascend') {
      console.log({ columnIndex });
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }

    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };

  return (
    <>
      <Row>
        <PageHeader title=" Approval Workflows" />
      </Row>
      <SPDrawer
        // maskClosable={false}
        title="Update Approval Workflow"
        isVisible={showUpdateApprovalWorkFlowDrawer}
        onClose={() => {
          setShowUpdateApprovalWorkFlowDrawer(false);
        }}
      >
        <EditWorkFlow
          isVisible={showUpdateApprovalWorkFlowDrawer}
          onCloseDrawer={() => {
            setShowUpdateApprovalWorkFlowDrawer(false);
          }}
          updatedApproversList={updatedApproversList}
          updateApplication={updateApplication}
          selectedApprovalInfo={selectedApprovalInfo}
        />
      </SPDrawer>
      <Row gutter={[19, 10]}>
        <AppWorkFlowHeaderContainer>
          <AppWorkFlowBtn>
            <Col>
              <SPButton
                title="Create Approval Workflow"
                size="small"
                maskClosable={false}
                onButtonClick={onCreateDrawerOpen}
              />
              <SPDrawer
                maskClosable={false}
                title="Create Approval Workflow"
                isVisible={isCreateDrawerVisible}
                onClose={onCreateDrawerClose}
              >
                <Create
                  isVisible={isCreateDrawerVisible}
                  onCloseDrawer={onCreateDrawerClose}
                  updatedApproversList={updatedApproversList}
                  createApplication={createApplication}
                />
              </SPDrawer>
            </Col>
            {profile?.data?.profile?.[0]?.usrRole?.uro_name ===
              'Super Admin' && (
                <Col>
                  <SPButton
                    title="Approvals"
                    size="small"
                    onButtonClick={() => {
                      history.push('/approval');
                    }}
                  />
                </Col>
              )}
          </AppWorkFlowBtn>

          <AppWorkFlowControllers>
            {selectedFilters.includes('showing') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Showing"
                  items={showingFilter}
                  selected={app_showing}
                  onChange={e => {
                    handleChange('app_showing', e.key);
                  }}
                />
              </Col>
            ) : null}
            <Col>
              <SPSearch
                onEnter={() => {
                  handleChange('app_subject', searchText);
                }}
                placeholder="Search.."
                text={searchText}
                onChange={e => {
                  setSearchText(e.target.value);
                }}
                size="500px"
              />
            </Col>
          </AppWorkFlowControllers>
        </AppWorkFlowHeaderContainer>
      </Row>

      <SPTable
        columns={columns}
        dataSource={appApprovalFlowList?.listData?.data?.items}
        onPageChange={onPageChange}
        handleTableChange={handleTableChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={app_showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * app_showing + 1
        }
        currentPage={currentPage}
        isLoading={appApprovalFlowList?.loading}
      />
    </>
  );
}

const mapStateToProps = state => ({
  appsDetails: state.appsDetails,
  appApprovalFlowList: state.appApprovalFlowList,
  appPrimaryApproversList: state.appPrimaryApproversList,
  profile: state.userStore.userProfile,
});

const mapDispatchToProps = dispatch => ({
  getApprovalFlowListRequested: payload =>
    dispatch(getApprovalFlowListRequested(payload)),
  getPrimaryApproversListRequested: () =>
    dispatch(getPrimaryApproversListRequested()),
  updateApprovalWorkFlowDetailsRequested: data =>
    dispatch(updateApprovalWorkFlowDetailsRequested(data)),
  deleteApprovalWorkFlowRequested: data =>
    dispatch(deleteApprovalWorkFlowRequested(data)),
  createApproval: data => dispatch(createWorkFlow(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ApprovalWorkFlow);
