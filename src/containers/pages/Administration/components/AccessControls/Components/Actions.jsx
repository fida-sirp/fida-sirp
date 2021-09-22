import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import {
  onGetAccessControlActionTab,
  onGetAccessControlActionGroup,
  onDeleteAccessAction,
  onUpdateAccessAction,
  onCreateAccessAction,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { Modal } from 'antd'
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import ActionFormDrawer from './ActionsForm';
import { showingFilter } from '../../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Actions = ({
  getList,
  accessControlActionList,
  updateList,
  deleteList,
  createList,
  getActionGroupList,
  isLoading,
  actionGrouplist,
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
    action_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(action_subject || '');
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
        const myArrayQry = mapQueryWithApi(query);
        deleteList(key, myArrayQry);
      },
      onCancel() { },
    });
  }

  useEffect(() => {
    getActionGroupList()
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (!_.isEmpty(accessControlActionList)) {
      setTotalCount(accessControlActionList?._meta?.totalCount);
      setCurrentPage(accessControlActionList?._meta?.currentPage);
    }
  }, [accessControlActionList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'act_id',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      sorter: true,
      dataIndex: 'act_name',
      editable: false,
      render: (text, record, index) => record?.act_name,
    },
    {
      title: 'Description',
      sorter: true,
      dataIndex: 'act_description',
      editable: false,
      render: (text, record, index) => record?.act_description,
    },
    {
      title: 'Group',
      sorter: true,
      dataIndex: 'act_group',
      editable: false,
      key: (text, record, index) => record?.actGroup?.acg_id,
      render: (text, record, index) => record?.actGroup?.acg_name,
    },
    {
      title: 'Actions',
      dataIndex: 'act_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-actions"))){
          const updateRoleAction={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setRecord(record);
              setIsCreate(false)
            },
          };
          moreItems.push(updateRoleAction);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-actions"))){
          const updateActions={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.act_id)
          };
          moreItems.push(updateActions);
        }
        if ( moreItems.length !==0) {
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
      if (parsedQuery.action_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.action_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ActionSearchs[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ActionSearchs[search]=' + searchText;
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
      createList(values, myArrayQry);
    } else {
      await updateList(record?.act_id, values, myArrayQry);
    }
    setOpenDrawer(false);
    // await getPublisherList();
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Actions'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-actions"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title={`Create Action`}
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
                handleChange('action_subject', searchText);
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
        dataSource={accessControlActionList?.items}
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
        title={`${isCreate ? 'Create' : 'Update'} Action`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <ActionFormDrawer
          type={isCreate}
          isVisible={openDrawer}
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
  accessControlActionList: state.administration.accessControlList?.actions,
  isLoading: state.administration.accessControlList?.loading,
});

const mapDispatchToProps = dispatch => ({
  getList: (...args) => dispatch(onGetAccessControlActionTab(...args)),
  getActionGroupList: (...args) => dispatch(onGetAccessControlActionGroup(...args)),
  updateList: (...args) => dispatch(onUpdateAccessAction(...args)),
  deleteList: (...args) => dispatch(onDeleteAccessAction(...args)),
  createList: (...args) => dispatch(onCreateAccessAction(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Actions);
