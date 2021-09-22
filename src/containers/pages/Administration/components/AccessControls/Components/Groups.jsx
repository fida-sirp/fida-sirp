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
  automationThreatList,
  deleteAutomationThreatList,
  updateAutomationThreatList,
  onGetAccessControlGroupsTab,
  onUpdateAccessControlGroup,
  onDeleteAccessControlGroup,
  onCreateAccessControlGroup
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
import GroupFormDrawer from './GroupForm';
import { Modal } from 'antd'
import { showingFilter } from '../../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const Groups = ({
  getList,
  groupsList,
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
    accessGroup_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(accessGroup_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

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

  useEffect(() => {
    getGroupsList();
  }, [query] || []);

  useEffect(() => {
    if (!_.isEmpty(groupsList)) {
      setTotalCount(groupsList._meta.totalCount);
      setCurrentPage(groupsList._meta.currentPage);
    }
  }, [groupsList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);

  const columns = [
    {
      title: '#',
      dataIndex: 'ugr_name',
      editable: false,
      key: (text, record, index) => record?.ugr_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'ugr_name',
      editable: false,
      sorter: true,
      width: '90%',
    },
    {
      title: 'Actions',
      dataIndex: 'ugr_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-user-group"))){
          const updateUserGroup= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setIsCreate(false)
              setOpenDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(updateUserGroup);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-user-group"))){
          const deleteUserGroup={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.ugr_id);
            },
          };
          moreItems.push(deleteUserGroup);
        }


        if (userProfile?.usr_api_organization === record?.ugr_organization && moreItems.length !==0) {
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

  const getGroupsList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry });
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
      if (parsedQuery.accessGroup_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.accessGroup_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UserGroupSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }



    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'UserGroupSearch[search]=' + searchText;
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
      await createList(values, myArrayQry)
    } else {
      await updateList(record?.ugr_id, values, myArrayQry);
    };
    await setOpenDrawer(false);
    await setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Groups'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-user-group"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title={`Create Group`}
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Group`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <GroupFormDrawer
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
                handleChange('accessGroup_subject', searchText);
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
        dataSource={groupsList?.items}
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
    </>
  );
};

const mapStateToProps = state => ({
  groupsList: state.administration.accessControlList?.accessGroups,
  isLoading: state.administration.accessControlList?.loading,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: (...args) => dispatch(onGetAccessControlGroupsTab(...args)),
  updateList: (...args) => dispatch(onUpdateAccessControlGroup(...args)),
  deleteList: (...args) => dispatch(onDeleteAccessControlGroup(...args)),
  createList: (...args) => dispatch(onCreateAccessControlGroup(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Groups);
