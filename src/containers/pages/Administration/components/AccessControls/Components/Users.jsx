import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  createAutomationThreatList,
  accessUsersList,
  accessUserDeleteList,
  updateAutomationThreatList,
  accessUsersAuthenticationList,
  accessUsersGroupList,
  accessUsersLandingPageList,
  accessUsersPermissionList,
  onUpdateAccessUser,
  onInviteUser,
} from '../../../../../../actions/administration';
import { Modal } from 'antd'
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import _, { isEmpty } from 'lodash';
import { showingFilter } from '../../../constant';
import UserFormCreateDrawer from './UserFormCreate';
import UserFormUpdateDrawer from './UserFormUpdate';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const ThreatFeeds = ({
  getList,
  usersList,
  updateList,
  deleteList,
  createList,
  authenticateList,
  permissionList,
  landingPageList,
  groupList,
  authentication,
  permission,
  landing,
  group,
  userProfile,
  access
}) => {
  const history = useHistory();
  const [openUpdateDrawer, setopenUpdateDrawer] = useState(false);
  const [openCreateDrawer, setopenCreateDrawer] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();
  const [
    authenticationFormattedList,
    setAuthenticationFormattedList,
  ] = useState([]);
  const [permissionFormattedList, setPermissionFormattedList] = useState([]);
  const [landingFormattedList, setLandingFormattedList] = useState([]);
  const [groupFormattedList, setGroupFormattedList] = useState([]);

  const {
    perPage = '20',
    pageNo = 1,
    user_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(user_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        deleteList({ id: key });
        getPublisherList();
      },
      onCancel() { },
    });
  }

  useEffect(() => {
    authenticateList();
    permissionList();
    landingPageList();
    groupList();
  }, []);

  useEffect(() => {
    if (!isEmpty(authentication)) {
      let arr = [
        {
          key: 'default',
          value: '',
          label: 'Default',
        },
      ];
      Object.keys(authentication).map(key =>
        arr.push({
          key: key,
          value: key,
          label: authentication[key],
        })
      );
      setAuthenticationFormattedList(arr);
    }
    if (!isEmpty(permission)) {
      let arr = [];
      Object.keys(permission).map(key =>
        arr.push({
          key: key,
          value: key,
          label: permission[key],
        })
      );
      setPermissionFormattedList(arr);
    }
    if (!isEmpty(landing)) {
      let arr = []
      if (_.isArray(landing)) {
        for (let key of Object.values(landing?.[0])) {
          arr.push({
            key: key,
            value: key,
            label: key,
          })
        }
      }
      setLandingFormattedList(arr);
    }
    if (!isEmpty(group)) {
      let arr = [];
      Object.keys(group).map(key =>
        arr.push({
          key: key,
          value: key,
          label: group[key],
        })
      );
      setGroupFormattedList(arr);
    }
  }, [authentication, permission, landing, group]);
  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (usersList?.listData?._meta) {
      setTotalCount(usersList.listData._meta.totalCount);
      setCurrentPage(usersList.listData._meta.currentPage);
    }
  }, [usersList]);

  useEffect(() => {
    if (!openUpdateDrawer) setRecord({});
  }, [openUpdateDrawer]);

  const columns = [
    {
      title: '#',
      dataIndex: 'usr_id',
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'usr_name',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => record?.usr_name,
    },
    {
      title: 'Role',
      dataIndex: 'uro_name',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => record?.usrRole?.uro_name,
    },
    {
      title: 'Designation',
      dataIndex: 'usr_designation',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) =>
        record?.usr_designation != null ? record.usr_designation : '(not set)',
    },
    {
      title: 'Email',
      dataIndex: 'usr_email',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => record?.usr_email,
    },
    {
      title: 'Google Authenticator',
      dataIndex: 'usr_google_auth_enable',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => record?.usr_google_auth_enable,
    },
    {
      title: 'Status',
      dataIndex: 'usr_status',
      editable: false,
      key: (text, record, index) => record?.usr_id,
      render: (text, record, index) => record?.usr_status,
    },
    {
      title: 'Actions',
      dataIndex: 'usr_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-users"))){
          const updateUsers= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setopenUpdateDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(updateUsers);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-users"))){
          const deleteUsers= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.usr_id);
            },
          };
          moreItems.push(deleteUsers);
        }

        if (userProfile?.usr_api_organization === record?.usr_organization && moreItems.length !==0) {
          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        }
      },
    },
  ];

  const getPublisherList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.pageNo) {
        queryObject.payload.page = parsedQuery.pageNo;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.user_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.user_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      myArrayQry += 'expand=usrRole&';
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UserSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'UserSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('pageNo', pageNumber);
    window.scrollTo(0, 0);
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

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      delete obj['active_tab'];
      const str = queryString.stringify(obj);
      if (name == 'perPage') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=automation&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration?active_tab=automation&&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    const myArrayQry = mapQueryWithApi(query);
    if (openCreateDrawer) {
      await createList(values, myArrayQry);
      setopenCreateDrawer(false)
    } else if (openUpdateDrawer) {
      updateList(record?.usr_id, values, myArrayQry)
    }
    await setopenUpdateDrawer(false);
    await setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Users'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("invite-users"))) &&
          <SPButton
            onButtonClick={() => setopenCreateDrawer(true)}
            title={`Invite User`}
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <Row gutter={[19, 25]}>
        <Col
          span={12}
          style={{ display: 'inherit' }}
        >
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('user_subject', searchText);
              }}
              size="420px"
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={perPage}
              onChange={e => {
                handleChange('perPage', e.key);
              }}
            />
          </div>
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={usersList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        handleTableChange={handleTableChange}
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={usersList?.isProcessing}
      />
      <SPDrawer
        title={`Create User`}
        isVisible={openCreateDrawer}
        onClose={() => setopenCreateDrawer(false)}
      >
        <UserFormCreateDrawer
          authenticationList={authenticationFormattedList}
          permissionList={permissionFormattedList}
          landingList={landingFormattedList}
          groupList={groupFormattedList}
          submit={handleSubmit}
          closeDrawer={() => setopenCreateDrawer(false)}
        />
      </SPDrawer>
      <SPDrawer
        title={`Update User`}
        isVisible={openUpdateDrawer}
        onClose={() => setopenUpdateDrawer(false)}
      >
        <UserFormUpdateDrawer
          recordValue={record}
          permissionList={permissionFormattedList}
          groupList={groupFormattedList}
          submit={handleSubmit}
          closeDrawer={() => setopenUpdateDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  usersList: state.administration.accessControlList,
  authentication: state.administration.accessControlList.authenticateList,
  permission: state.administration.accessControlList.permissionList,
  landing: state.administration.accessControlList.landingList,
  group: state.administration.accessControlList.groupList,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(accessUsersList(payload)),
  updateList: (...args) => dispatch(onUpdateAccessUser(...args)),
  deleteList: payload => dispatch(accessUserDeleteList(payload)),
  createList: (...args) => dispatch(onInviteUser(...args)),
  authenticateList: payload => dispatch(accessUsersAuthenticationList(payload)),
  permissionList: payload => dispatch(accessUsersPermissionList(payload)),
  landingPageList: payload => dispatch(accessUsersLandingPageList(payload)),
  groupList: payload => dispatch(accessUsersGroupList(payload)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatFeeds);
