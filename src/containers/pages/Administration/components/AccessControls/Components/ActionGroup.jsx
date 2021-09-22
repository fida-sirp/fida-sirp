import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import PageHeader from '../../../../../layout/pageHeader';
import {
  onGetAccessControlActionGroupTab,
  onDeleteAccessActionGroup,
  onCreateAccessActionGroup,
  onUpdateAccessActionGroup,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col, Modal } from 'antd';

import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import ActionGroupFormDrawer from './ActionGroupForm';
import { showingFilter } from '../../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';

const ActionsGroup = ({
  getList,
  actionGroupTabList,
  updateList,
  deleteList,
  isLoading,
  createList,
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
    actionGroup_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(actionGroup_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

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
    if (actionGroupTabList) {
      setTotalCount(actionGroupTabList?._meta?.totalCount);
      setCurrentPage(actionGroupTabList?._meta?.currentPage);
    }
  }, [actionGroupTabList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'acg_id',
      editable: false,
      key: (text, record, index) => record?.acg_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'acg_name',
      sorter: true,
      editable: false,
      width: "100%",
    },
    {
      title: 'Actions',
      dataIndex: 'acg_id',
      editable: false,

      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-action-group"))){
          const updateActionGroup={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setRecord(record);
              setIsCreate(false)
            },
          };
          moreItems.push(updateActionGroup);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-action-group"))){
          const deleteActionGroup={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.acg_id)
          };
          moreItems.push(deleteActionGroup);
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
      if (parsedQuery.actionGroup_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.actionGroup_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ActionGroupsSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ActionGroupsSearch[search]=' + searchText;
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
      createList(values, myArrayQry)
    } else {
      updateList(record.acg_id, values, myArrayQry);
    }
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Actions Group'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-action-group"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title={`Create Action Group`}
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
                handleChange('actionGroup_subject', searchText);
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
        dataSource={actionGroupTabList?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        handleTableChange={handleTableChange}
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={isLoading}
      />
      <SPDrawer
        type={isCreate}
        title={`${isCreate ? 'Create' : 'Update'} Action Group`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <ActionGroupFormDrawer
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
  actionGroupTabList: state.administration.accessControlList?.actionGroupTab,
  isLoading: state.administration.accessControlList?.loading,
});

const mapDispatchToProps = dispatch => ({
  getList: (...args) => dispatch(onGetAccessControlActionGroupTab(...args)),
  updateList: (...args) => dispatch(onUpdateAccessActionGroup(...args)),
  deleteList: (...args) => dispatch(onDeleteAccessActionGroup(...args)),
  createList: (...args) => dispatch(onCreateAccessActionGroup(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ActionsGroup);
