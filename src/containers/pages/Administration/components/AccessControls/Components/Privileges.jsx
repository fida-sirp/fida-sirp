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
  updateAutomationThreatList,
  onGetListOfPrivileges,
  createPrivileges,
  deletePrivileges,
} from '../../../../../../actions/administration';
import PageHeader from '../../../../../layout/pageHeader';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPModal from '../../../../../../components/SPModal';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPButton from '../../../../../../components/SPButton';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import PrevModalItem from './PrivilegesModalItem'
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { Modal } from 'antd'

const Roles = ({ getList, privilegeList, updateList, deleteList, createList, isLoading,access }) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrevmodal, setPrevModal] = useState(false)
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();
  const { confirm } = Modal;

  const {
    feed_showing = '20',
    feed_page_no = 1,
    feed_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(feed_showing);
  const [searchText, setSearchText] = useState(feed_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );
  const myQuery = mapQueryWithApi(query);
  function showConfirm(key) {
    confirm({
      title: 'Are You Sure You Want To Delete This?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        deleteList(key, myQuery)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (privilegeList) {
      setTotalCount(privilegeList?._meta?.totalCount);
      setCurrentPage(privilegeList?._meta?.currentPage);
    }
  }, [privilegeList]);

  const columns = [
    {
      title: '#',
      dataIndex: 'rac_id',
      editable: false,
      key: (text, record, index) => record?.rac_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Role',
      dataIndex: 'rac_role_id',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.racRole?.uro_name,
      render: (text, record, index) => record?.racRole?.uro_name,
      width: '90%',
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-role-action"))){
          const updateRoleAction= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setIsCreate(false)
                setRecord(record);
                setPrevModal(true)
              }
            },
          };
          moreItems.push(updateRoleAction);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-role-action"))){
          const deleteRoleAction= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.rac_id);
            },
          };
          moreItems.push(deleteRoleAction);
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
      if (parsedQuery.feed_page_no) {
        queryObject.payload.page = parsedQuery.feed_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.feed_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.feed_subject;
      }
      if (parsedQuery.feed_showing) {
        queryObject.payload['per-page'] = parsedQuery.feed_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'RssFeedSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'RssFeedSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('feed_page_no', pageNumber);
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
      delete obj['active_tab'];
      const str = queryString.stringify(obj);
      if (name == 'feed_showing') {
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
      <PageHeader
        title={'Privilegs'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-role-action"))) &&
          <SPButton
            onButtonClick={() => {
              setPrevModal(true);
              setIsCreate(true)
            }}
            title={`Assign Privilegs`}
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPTable
        columns={columns}
        dataSource={privilegeList?.items}
        onPageChange={onPageChange}
        emptyText="No Data"
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={isLoading}
      />
      {showPrevmodal ? <SPModal
        maskClosable={false}
        title="Assign Privileges"
        visible={showPrevmodal}
        onOk={() => { }}
        onCancel={() => {
          setIsCreate(false)
          setPrevModal(false);
        }}
        width="100%"
        footer={null}
      >
        <PrevModalItem
          record={record}
          query={myQuery}
          closeModal={() => setPrevModal(false)}
          isCreate={isCreate}
        />
      </SPModal> : null}
    </>
  );
};

const mapStateToProps = state => ({
  privilegeList: state.administration.accessControlList?.previleges,
  isLoading: state.administration.accessControlList?.loading,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(onGetListOfPrivileges(payload)),
  deleteList: (...args) => dispatch(deletePrivileges(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Roles);
