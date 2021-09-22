import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  onGetAccessControlAuthSettingList,
  onCreateAccessThirdPartyAuth,
  onDeleteAccessThirdPartyAuth,
  onUpdateAccessThirdPartyAuth,
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
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { isEmpty } from 'lodash';
import CreateThirdPartyForm from './CreateThirdPartyForm';
import UpdateThirdPartyForm from './UpdateThirdPartyForm';
import ActionGroupFormDrawer from './ActionGroupForm';
import { showingFilter } from '../../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ThirdParty = ({
  getList,
  updateList,
  deleteList,
  createList,
  authSettingList,
  isLoading,
  userProfile,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false)
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    perPage = '20',
    pageNo = 1,
    search_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(search_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

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
    if (authSettingList) {
      setTotalCount(authSettingList?._meta?.totalCount);
      setCurrentPage(authSettingList?._meta?.currentPage);
    }
  }, [authSettingList]);


  const columns = [
    {
      title: '#',
      dataIndex: 'ost_id',
      editable: false,
      key: (text, record, index) => record?.ost_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Authentication Type',
      dataIndex: 'ost_variable',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.ost_variable,
    },
    {
      title: 'Authentication Vendor',
      dataIndex: 'ost_value',
      sorter: true,
      editable: false,
    },
    {
      title: 'Auth Status',
      dataIndex: 'ost_status',
      editable: false,
      sorter: true,
      width: "50%",
      key: (text, record, index) => record?.ost_status,
      render: (text, record, index) => <div>{record?.ost_status === 1 ? "Enable" : "Disable"}</div>,
    },
    {
      title: 'Actions',
      dataIndex: 'ost_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-organization-settings"))){
          const updateOrganizationSettings={
            key: 'edit',
                label: 'Edit',
                icon: <Pencil />,
                onClickItem: () => {
              setRecord(record);
              setShowEditDrawer(true);
            },
          };
          moreItems.push(updateOrganizationSettings);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-organization-settings"))){
          const deleteOrganizationSettings={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.ost_id)
          };
          moreItems.push(deleteOrganizationSettings);
        }

        if (userProfile?.usr_api_organization === record?.ost_organization && moreItems.length !==0) {
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
      if (parsedQuery.search_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.search_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'OrganizationSettingsSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'OrganizationSettingsSearch[search]=' + searchText;
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



  const updateHandler = (value) => {
    const myArrayQry = mapQueryWithApi(query);
    updateList(record?.ost_id, value, myArrayQry)
    setShowEditDrawer(false)
  }

  const createHandler = (value) => {
    const myArrayQry = mapQueryWithApi(query);
    createList(value, myArrayQry)
    setOpenDrawer(false)
  }


  return (
    <>
      <PageHeader
        title={'Third-Party Auth'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-organization-settings"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title="Add Authentication"
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
                handleChange('search_subject', searchText);
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
        dataSource={authSettingList?.items}
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
        title={"Add Authentication Setting"}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <CreateThirdPartyForm
          createHandler={createHandler}
          isVisible={openDrawer}
          closeDrawer={() => {
            setOpenDrawer(false);
            setIsCreate(false);
          }}
        />
      </SPDrawer>
      <SPDrawer
        title="Update Authentication Setting"
        isVisible={showEditDrawer}
        drawerWidth={720}
        onClose={() => {
          setShowEditDrawer(false);
        }}
      >
        <UpdateThirdPartyForm
          isVisible={showEditDrawer}
          record={record}
          updateHandler={updateHandler}
          closeDrawer={() => {
            setShowEditDrawer(false);
          }}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  authSettingList: state.administration.accessControlList?.authSetting,
  isLoading: state.administration.accessControlList?.loading,
});

const mapDispatchToProps = dispatch => ({
  getList: (...args) => dispatch(onGetAccessControlAuthSettingList(...args)),
  updateList: (...args) => dispatch(onUpdateAccessThirdPartyAuth(...args)),
  deleteList: (...args) => dispatch(onDeleteAccessThirdPartyAuth(...args)),
  createList: (...args) => dispatch(onCreateAccessThirdPartyAuth(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThirdParty);
