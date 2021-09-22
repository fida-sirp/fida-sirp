import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd'
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  createAutomationThreatList,
  automationThreatList,
  deleteAutomationThreatList,
  updateAutomationThreatList,
  onGetAccessControlRolesTab,
  onUpdateAccessControlRole,
  onDeleteAccessControlRole,
  onCreateAccessControlRole,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { isEmpty } from 'lodash';
import RoleFormDrawer from './RolesForm';
import { showingFilter } from '../../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const Roles = ({
  getList,
  rolesList,
  updateList,
  deleteList,
  createList,
  isLoading,
  userProfile,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    perPage = '20',
    pageNo = 1,
    role_subject,
    sort = undefined,
  } = queryString.parse(query);


  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Threat Intelligence?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteList(key, myArrayQry);
      },
      onCancel() { },
    });
  }

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(role_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (!_.isEmpty(rolesList)) {
      setTotalCount(rolesList._meta.totalCount);
      setCurrentPage(rolesList._meta.currentPage);
    }
  }, [rolesList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);

  const columns = [
    {
      title: '#',
      dataIndex: 'uro_id',
      editable: false,
      key: (text, record, index) => record?.uro_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'uro_name',
      editable: false,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Description',
      dataIndex: 'uro_desc',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.uro_desc,
      render: (text, record, index) => record?.uro_desc,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'feed_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-user-role"))){
          const updateUserRole={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setRecord(record);
              setOpenDrawer(true);
              setIsCreate(false)
            },
          };
          moreItems.push(updateUserRole);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-user-role"))){
          const deleteUserRole={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.uro_id);
            },
          };
          moreItems.push(deleteUserRole);
        }

        if (userProfile?.usr_api_organization === record?.uro_organization && moreItems.length !==0) {
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
      if (parsedQuery.role_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.role_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UserRoleSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'UserRoleSearch[search]=' + searchText;
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
    if (isCreate) {
      await createList(values, myArrayQry);
    } else {
      await updateList(record?.uro_id, values, myArrayQry);
    }
    await setOpenDrawer(false);
    // await getPublisherList();
    await setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Role'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-user-role"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title={`Create Role`}
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
              placeholder="Search."
              onEnter={() => {
                handleChange('role_subject', searchText);
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
        dataSource={rolesList?.items}
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
        isLoading={isLoading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Role`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <RoleFormDrawer
          isVisible={openDrawer}
          type={isCreate}
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => {
            setOpenDrawer(false);
            setIsCreate(false);
          }}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  rolesList: state.administration?.accessControlList?.roles,
  isLoading: state.administration.accessControlList?.loading,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(onGetAccessControlRolesTab(payload)),
  updateList: (...args) => dispatch(onUpdateAccessControlRole(...args)),
  deleteList: (...args) => dispatch(onDeleteAccessControlRole(...args)),
  createList: (...args) => dispatch(onCreateAccessControlRole(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Roles);
