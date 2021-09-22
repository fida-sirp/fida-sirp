import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  changeAssetBusinessGroupTitle,
  createBusinessGroup,
  deleteBusinessGroup,
  editBusinessGroup,
  getAssetBusinessGroupList,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import PageHeader from '../../../../../../layout/pageHeader';
import CreateBusinessGroup from './create';
import EditBusinessGroup from './Edit';
import EditTitle from './EditTitle';

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

const BusinessGroup = ({
  getAssetBusinessGroupList,
  businessGroupList,
  createBusinessGroup,
  deleteBusinessGroup,
  editBusinessGroup,
  changeAssetBusinessGroupTitle,
  allTabsHeading,
  access
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [showCreateBusinessGroupDrawer, setShowCreateBusinessGroupDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [assetValueData, setAssetValueData] = useState([]);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [assetCurrentAction, setAssetCurrentAction] = useState('');
  const [selectedAssetBusinessGroup, setSelectedAssetBusinessGroup] = useState();
  const [selectedAssetBusinessGroupId, setSelectedAssetBusinessGroupId] = useState();
  const [showEditAssetValueDrawer, setShowEditAssetValueDrawer] = useState(false);
  const [showChangeTitleDrawer, setShowChangeTitleDrawer] = useState(false);
  const myArrayQry = mapQueryWithApi(query);


  const {
    bgp_show = '20',
    bgp_page_no = 1,
    bgp_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(bgp_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete this ?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteBusinessGroup({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'bgp_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'bgp_name',
      editable: false,
      sorter: true
    },
    {
      title: 'Actions',
      dataIndex: 'bgp_delete',
      render: (text, record, index) => {
        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-business-group"))) {
          const updateBusinessGroup = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              setSelectedAssetBusinessGroupId(record?.bgp_id);
              setSelectedAssetBusinessGroup(record);
              setAssetCurrentAction('Edit');
              setShowEditAssetValueDrawer(true);
            },
          };
          moreItems.push(updateBusinessGroup);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-business-group"))) {
          const deleteBusinessGroup = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin/>,
            onClickItem: () => {
              showConfirm(record?.bgp_id);
            },
          };
          moreItems.push(deleteBusinessGroup);
        }
     if(moreItems.length !== 0){
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

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        BusinessGroupSearch: {},
        QueryString: '',
      };
      if (parsedQuery.bgp_subject) {
        queryObject.BusinessGroupSearch.search = parsedQuery.bgp_subject;
      }
      if (parsedQuery.bgp_page_no) {
        queryObject.payload.page = parsedQuery.bgp_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.bgp_show) {
        queryObject.payload['per-page'] = parsedQuery.bgp_show;
      }
      const { BusinessGroupSearch } = queryObject;
      if (Object.keys(BusinessGroupSearch).length !== 0) {
        Object.entries(BusinessGroupSearch).forEach(([key, val]) => {
          myArrayQry += 'BusinessGroupSearch[' + key + ']=' + val + '&';
        });
      }
      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    return myArrayQry;
  }

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    getAssetBusinessGroupList({ queryItem: myArrayQry })
  }, [query]);


  useEffect(() => {
    if (businessGroupList?.listData) {
      if (Object.keys(businessGroupList?.listData).length !== 0) {
        setAssetValueData(businessGroupList?.listData?.data?.items);
        setTotalCount(businessGroupList?.listData?.data?._meta?.totalCount);
        setCurrentPage(businessGroupList?.listData?.data?._meta?.currentPage);
      }
    }
  }, [businessGroupList]);

  useEffect(() => {
    const queryObject = {
      bgp_subject: bgp_subject,
      ...(bgp_show !== '20' && { bgp_show: bgp_show }),
      ...(bgp_page_no !== 1 && { bgp_page_no: bgp_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(bgp_show);
  }, [searchText, bgp_show, bgp_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("bgp_page_no", pageNumber);
    window.scrollTo(0, 0);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
      // console.log({ columnIndex });
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }

    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };

  const openCreateBusinessGroupDrawer = () => {
    setAssetCurrentAction('Create');
    setShowCreateBusinessGroupDrawer(true);
  };

  const openEditTitleDrawer = () => {
    setShowChangeTitleDrawer(true);
  };

  const closeCreateBusinessGroupDrawer = () => {
    setShowCreateBusinessGroupDrawer(false);
  };

  const closeEditBusinessGroupDrawer = () => {
    setShowEditAssetValueDrawer(false);
  };

  const closeEditTitleDrawer = () => {
    setShowChangeTitleDrawer(false);
  };

  const createBusinessGroupAction = (data) => {
    setShowCreateBusinessGroupDrawer(false);
    let formData = new FormData();
    formData.append('bgp_name', data.bgp_name);
    createBusinessGroup({ data: formData, queryItem: myArrayQry });
  };

  const editBusinessGroupAction = (data) => {
    setShowEditAssetValueDrawer(false);
    let formData = new FormData();
    formData.append('bgp_name', data.bgp_name);
    editBusinessGroup({ id: selectedAssetBusinessGroupId, data: formData, queryItem: myArrayQry });
  }

  const editAssetBusinessGroupTitle = (data) => {
    setShowChangeTitleDrawer(false);
    let formData = new FormData();
    formData.append('bgp_label', data.bgp_label);
    changeAssetBusinessGroupTitle({ data: formData, queryItem: myArrayQry });
  }

  return (
    <>
      <PageHeader
        title={allTabsHeading?.assetsBussinessGroup ? allTabsHeading?.assetsBussinessGroup : 'Business Group'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-business-group"))) ? <SPButton
            onButtonClick={openCreateBusinessGroupDrawer}
            title={allTabsHeading?.assetsBussinessGroup ? 'Create ' + allTabsHeading?.assetsBussinessGroup : 'Create Business Group'}
            size="small"
            image={<PlusIcon />}
          /> : '',
          (access!==undefined && (access.includes("all-super-admin") || access.includes("change-title-business-group"))) ? <SPButton
            onButtonClick={openEditTitleDrawer}
            title="Change Title"
            size="small"
            image={<PlusIcon />}
          /> : ''
        ]}
      />
      <SPDrawer
        title={`Create ${allTabsHeading?.assetsBussinessGroup}`}
        isVisible={showCreateBusinessGroupDrawer}
        onClose={closeCreateBusinessGroupDrawer}
      >
        <CreateBusinessGroup
          isVisible={showCreateBusinessGroupDrawer}
          createBusinessGroup={createBusinessGroupAction}
          onCloseDrawer={closeCreateBusinessGroupDrawer}
        />
      </SPDrawer>

      <SPDrawer
        title={`Update ${allTabsHeading?.assetsBussinessGroup}`}
        isVisible={showEditAssetValueDrawer}
        onClose={closeEditBusinessGroupDrawer}
      >
        <EditBusinessGroup
          isVisible={showEditAssetValueDrawer}
          onCloseDrawer={closeEditBusinessGroupDrawer}
          selectedAssetBusinessGroup={selectedAssetBusinessGroup}
          editBusinessGroup={editBusinessGroupAction}
        />
      </SPDrawer>

      <SPDrawer
        title="Change Title"
        isVisible={showChangeTitleDrawer}
        onClose={closeEditTitleDrawer}
      >
        <EditTitle
          onCloseDrawer={closeEditTitleDrawer}
          selectedAssetValue={allTabsHeading?.assetsBussinessGroup}
          editAssetBusinessGroupTitle={editAssetBusinessGroupTitle}
        />
      </SPDrawer>
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
              handleChange('bgp_subject', searchText);
            }}
            size="500px"
          />
        </Col>

        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={bgp_show}
            onChange={e => {
              handleChange('bgp_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={columns}
          dataSource={assetValueData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={bgp_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={businessGroupList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    businessGroupList: state.administration.businessGroupList,
    allTabsHeading: state.administration.allTabsHeading?.listData,
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
  }
}

const mapDispatchToProps = dispatch => ({
  getAssetBusinessGroupList: data =>
    dispatch(getAssetBusinessGroupList(data)),
  createBusinessGroup: (data) =>
    dispatch(createBusinessGroup(data)),
  deleteBusinessGroup: (data) =>
    dispatch(deleteBusinessGroup(data)),
  editBusinessGroup: (data) =>
    dispatch(editBusinessGroup(data)),
  changeAssetBusinessGroupTitle: (data) =>
    dispatch(changeAssetBusinessGroupTitle(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(BusinessGroup);
