import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import queryString from 'query-string';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import PageHeader from '../../../../../../layout/pageHeader';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  createAssetsSubGroup,
  deleteAssetsSubGroup,
  editAssetsSubGroup,
  getAssetSubGroupList,
  getAssetGroupDropDownList
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router';
import CreateAssetSubGroup from './create';
import EditAssetsSubGroup from './Edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';
import _ from 'lodash';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';

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

const AssetSubGroups = ({
  getAssetSubGroupList,
  assetsSubGroupTabData,
  assetsSubGroupDropDownData,
  getAssetGroupDropDownList,
  createAssetsSubGroup,
  deleteAssetsSubGroup,
  editAssetsSubGroup,
  userProfile,
  access,
}) => {

  const [totalCount, setTotalCount] = useState(1);
  const [showCreateAssetSubGroupDrawer, setShowCreateAssetSubGroupDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [AssetSubGroupTabData, setAssetSubGroupTabData] = useState([])
  const [showCreateOrg, setshowCreateOrg] = useState(false);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [updatedAssetGroupDropDownList, setUpdatedAssetGroupDropDownList] = useState();
  const [updatedAssetsSubGroup, setUpdatedAssetsSubGroup] = useState();
  const [assetCurrentAction, setAssetCurrentAction] = useState('');
  const [selectedAssetGroup, setSelectedAssetGroup] = useState();
  const [selectedAssetGroupId, setSelectedAssetGroupId] = useState();
  const [showEditAssetSubGroupDrawer, setShowEditAssetSubGroupDrawer] = useState(false);
  const [selectedParentGroup, setSelectedParentGroup] = useState();
  const myArrayQry = mapQueryWithApi(query);

  const {
    asg_show = '20',
    asg_page_no = 1,
    asg_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(asg_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete This?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteAssetsSubGroup({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onOpenCreateModal = () => {
    setshowCreateOrg(true)
  }
  const onCloseCreateModal = () => {
    setshowCreateOrg(false)
  }

  const assetSubGroupColumns = [
    {
      title: '#',
      dataIndex: 'asg_id',
      editable: false,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Subgroup Name',
      dataIndex: 'asg_name',
      editable: false,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Asset Group',
      dataIndex: 'asg_parent_group',
      editable: false,
      sorter: true,
      width: '45%',
      render: (text, record, index) => {
        if (_.isObject(record?.assetGroups)) {
          return Object.values(record.assetGroups).map((list) => {
            return (
              <div style={{ marginTop: 5 }} dangerouslySetInnerHTML={{ __html: list }} />
            )
          })
        }
      }
    },
    {
      title: 'Actions',
      dataIndex: 'aty_delete',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-asset-sub-group"))){
          const updateAssetSubGroup =    {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setSelectedAssetGroupId(record?.asg_id);
              setSelectedAssetGroup(record);
              setShowEditAssetSubGroupDrawer(true)
              setSelectedParentGroup(assetsSubGroupTabData?.listData?.data?.items[index].asg_parent_group);
              getAssetGroupDropDownList();
            },
          };
          moreItems.push(updateAssetSubGroup);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-asset-sub-group"))){
          const deleteAssetSubGroup = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.asg_id);
            },
          };
          moreItems.push(deleteAssetSubGroup);
        }

        if (userProfile?.usr_organization === record?.asg_organization && moreItems.length !== 0) {
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

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        AssetSubGroupSearch: {},
        QueryString: '',
      };
      if (parsedQuery.asg_subject) {
        queryObject.AssetSubGroupSearch.search = parsedQuery.asg_subject;
      }
      if (parsedQuery.asg_page_no) {
        queryObject.payload.page = parsedQuery.asg_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.asg_show) {
        queryObject.payload['per-page'] = parsedQuery.asg_show;
      }
      const { AssetSubGroupSearch } = queryObject;
      if (Object.keys(AssetSubGroupSearch).length !== 0) {
        Object.entries(AssetSubGroupSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetSubGroupSearch[' + key + ']=' + val + '&';
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
    getAssetSubGroupList({ queryItem: myArrayQry })
  }, [query]);


  useEffect(() => {
    if (assetsSubGroupTabData?.listData) {
      if (Object.keys(assetsSubGroupTabData?.listData).length !== 0) {
        setAssetSubGroupTabData(assetsSubGroupTabData?.listData?.data?.items);
        setTotalCount(assetsSubGroupTabData?.listData?.data?._meta?.totalCount);
        setCurrentPage(assetsSubGroupTabData?.listData?.data?._meta?.currentPage);
      }
    }
  }, [assetsSubGroupTabData]);


  useEffect(() => {
    const queryObject = {
      asg_subject: asg_subject,
      ...(asg_show !== '20' && { asg_show: asg_show }),
      ...(asg_page_no !== 1 && { asg_page_no: asg_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(asg_show);
  }, [searchText, asg_show, asg_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("asg_page_no", pageNumber);
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

  useEffect(() => {
    let assetsSubGroupDropDownList = [];
    if (!isEmpty(assetsSubGroupDropDownData?.listData?.data)) {
      if (assetsSubGroupDropDownData?.listData?.data) {
        Object.entries(assetsSubGroupDropDownData?.listData?.data).map(([key, value], index) => {
          assetsSubGroupDropDownList.push(
            { key: key, value: key, label: value },
          );
        });
        setUpdatedAssetGroupDropDownList(assetsSubGroupDropDownList);
      }
      // if (assetCurrentAction === 'Edit') {
      //   setShowEditAssetSubGroupDrawer(true);
      // } else if (assetCurrentAction === 'Create') {
      //   setShowCreateAssetSubGroupDrawer(true);
      // }
      return;
    }
  }, [assetsSubGroupDropDownData?.listData?.data]);

  const openCreateAssetSubGroupDrawer = () => {
    setShowCreateAssetSubGroupDrawer(true)
    // setAssetCurrentAction('Create');
    getAssetGroupDropDownList();
  };

  const closeCreateAssetSubGroupDrawer = () => {
    setShowCreateAssetSubGroupDrawer(false);
  };

  const closeEditAssetSubGroupDrawer = () => {
    setShowEditAssetSubGroupDrawer(false);
  };

  const createAssetSubGroup = (data) => {
    createAssetsSubGroup({ data, queryItem: myArrayQry });
    setShowCreateAssetSubGroupDrawer(false)
  };

  const EditAssetSubGroup = (data) => {
    editAssetsSubGroup({ id: selectedAssetGroupId, data, queryItem: myArrayQry });
    setShowEditAssetSubGroupDrawer(false);
  }

  return (
    <>
      <PageHeader
        title="Asset Sub Groups"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-asset-sub-group"))) ?
          <SPButton
            onButtonClick={openCreateAssetSubGroupDrawer}
            title="Create Asset Subgroup"
            size="small"
            image={<PlusIcon />}
          /> : '',
        ]}
      />
      <SPDrawer
        title="Create Asset Subgroup"
        isVisible={showCreateAssetSubGroupDrawer}
        onClose={closeCreateAssetSubGroupDrawer}
      >
        <CreateAssetSubGroup
          isVisible={showCreateAssetSubGroupDrawer}
          updatedAssetGroupDropDownList={updatedAssetGroupDropDownList}
          createAssetSubGroup={createAssetSubGroup}
          onCloseDrawer={closeCreateAssetSubGroupDrawer}
          assetCurrentAction={assetCurrentAction}
          selectedAssetGroup={selectedAssetGroup}
        />
      </SPDrawer>

      <SPDrawer
        title="Update Asset Subgroup"
        isVisible={showEditAssetSubGroupDrawer}
        onClose={closeEditAssetSubGroupDrawer}
      >
        <EditAssetsSubGroup
          isVisible={showEditAssetSubGroupDrawer}
          updatedAssetGroupDropDownList={updatedAssetGroupDropDownList}
          updatedAssetsSubGroup={updatedAssetsSubGroup}
          onCloseDrawer={closeEditAssetSubGroupDrawer}
          selectedParentGroup={selectedParentGroup}
          assetCurrentAction={assetCurrentAction}
          selectedAssetGroup={selectedAssetGroup}
          EditAssetSubGroup={EditAssetSubGroup}
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
              handleChange('asg_subject', searchText);
            }}
            size="500px"
          />
        </Col>

        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={asg_show}
            onChange={e => {
              handleChange('asg_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={assetSubGroupColumns}
          dataSource={AssetSubGroupTabData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={asg_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetsSubGroupTabData?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
    assetsSubGroupTabData: state.administration.assetsSubGroupTabData,
    assetsSubGroupDropDownData: state.administration.assetsSubGroupDropDownData,
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
  }
}

const mapDispatchToProps = dispatch => ({
  getAssetSubGroupList: data =>
    dispatch(getAssetSubGroupList(data)),
  getAssetGroupDropDownList: () =>
    dispatch(getAssetGroupDropDownList()),
  createAssetsSubGroup: (data) =>
    dispatch(createAssetsSubGroup(data)),
  deleteAssetsSubGroup: (data) =>
    dispatch(deleteAssetsSubGroup(data)),
  editAssetsSubGroup: (data) =>
    dispatch(editAssetsSubGroup(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(AssetSubGroups);
