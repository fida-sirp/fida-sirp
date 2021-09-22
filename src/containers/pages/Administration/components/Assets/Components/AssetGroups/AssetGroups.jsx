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
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import SPTable from '../../../../../../../components/SPTable';
import PageHeader from '../../../../../../layout/pageHeader';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createAssetsGroup, deleteAssetsGroup, editAssetsGroup, getAssetGroupList, getAssetGroupSourceList, getAssetGroupSubgroupList } from '../../../../../../../actions/administration';
import { useHistory } from 'react-router';
import CreateAssetGroup from './create';
import EditAssetsGroup from './Edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';
import _ from 'lodash';

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

const AssetGroup = ({
  getAssetGroupList,
  assetGroupList,
  getAssetGroupSourceList,
  getAssetGroupSubgroupList,
  assetsSourceListData,
  assetsSubGroupData,
  createAssetsGroup,
  deleteAssetsGroup,
  editAssetsGroup,
  access,
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [showCreateAssetGroupDrawer, setShowCreateAssetGroupDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [AssetGroupData, setAssetGroupData] = useState([])
  const [showCreateOrg, setshowCreateOrg] = useState(false);
  const [showEditOrg, setshowEditOrg] = useState(false);
  const [viewID, setviewID] = useState("");
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [updatedAssetSourceList, setUpdatedAssetSourceList] = useState();
  const [updatedAssetsSubGroup, setUpdatedAssetsSubGroup] = useState();
  const [assetCurrentAction, setAssetCurrentAction] = useState('');
  const [selectedAssetGroup, setSelectedAssetGroup] = useState();
  const [selectedAssetGroupId, setSelectedAssetGroupId] = useState();
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  const {
    agr_show = '20',
    agr_page_no = 1,
    agr_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(agr_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteAssetsGroup({ id: key, queryItem: myArrayQry });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const refactorAsset = (data) => {
    if (_.isArray(data)) {
      return data?.map((item) => {
        return (
          <ul>
            <li>{item}</li>
          </ul>
        )
      })
    }
  }


  const assetGroupColumns = [
    {
      title: '#',
      dataIndex: 'asset_iti_id',
      editable: false,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Business Group',
      dataIndex: 'businessGroups',
      editable: false,
      width: 400,
      render: (text, record, index) => record?.busniess_group?.map((item) => {
        return (
          <div style={{ marginTop: 10 }}
            dangerouslySetInnerHTML={{ __html: item?.bgp_name }}
          ></div>
        )
      }),
      sorter: true,
    },
    {
      title: 'Asset Group',
      dataIndex: 'asset_group',
      editable: false,
      width: 400,
      sorter: true,
      render: (text, record, index) => {
        return (
          <span
            dangerouslySetInnerHTML={{ __html: record?.asset_group }}
          ></span>
        );
      }
    },
    {
      title: 'Asset SubGroup',
      dataIndex: 'asset_subgroup',
      editable: false,
      render: (text, record, index) => record?.asset_subgroup?.map((item) => {
        return (
          <ul style={{ marginTop: 10 }}>
            <li dangerouslySetInnerHTML={{ __html: item?.asg_name }} />
          </ul>
        )
      }),
      width: 400,
    },
    {
      title: 'Asset Type',
      dataIndex: 'asset_type',
      editable: false,
      width: 400,
      render: (text, record, index) => record?.asset_type?.map((item) => {
        return (
          <ul style={{ marginTop: 10 }}>
            <li dangerouslySetInnerHTML={{ __html: item?.aty_name }} />
          </ul>
        )
      }),
    },
    {
      title: 'Assets',
      dataIndex: 'assets',
      editable: false,
      render: (text, record, index) => refactorAsset(record.assets)
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-assets-group"))) {
          const updateAssetGroup = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              setSelectedAssetGroupId(record?.asset_iti_id);
              setSelectedAssetGroup(record);
              setShowEditDrawer(true)
            },
          };
          moreItems.push(updateAssetGroup);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-assets-group"))) {
          const deleteAssetGroup = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin/>,
            onClickItem: () => {
              showConfirm(record?.asset_iti_id);
            },
          };
          moreItems.push(deleteAssetGroup);
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
    }
  ];

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        AssetsGroupSearch: {},
        QueryString: '',
      };
      if (parsedQuery.agr_subject) {
        queryObject.AssetsGroupSearch.search = parsedQuery.agr_subject;
      }
      if (parsedQuery.agr_page_no) {
        queryObject.payload.page = parsedQuery.agr_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.agr_show) {
        queryObject.payload['per-page'] = parsedQuery.agr_show;
      }
      const { AssetsGroupSearch } = queryObject;
      if (Object.keys(AssetsGroupSearch).length !== 0) {
        Object.entries(AssetsGroupSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetsGroupSearch[' + key + ']=' + val + '&';
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
    getAssetGroupList({ queryItem: myArrayQry })
  }, [query]);

  useEffect(() => {
    if (assetGroupList) {
      let assetGroupInfo = [];
      if (Object.keys(assetGroupList).length !== 0) {
        const assetGrpList = assetGroupList?.listData?.data?.items;
        for (let i = 0; i < assetGrpList?.length; i += 1) {
          assetGroupInfo.push({
            asset_iti_id: assetGrpList[i]?.agr_id,
            busniess_group: assetGrpList[i]?.businessGroups,
            asset_group: assetGrpList[i]?.agr_group_name,
            asset_subgroup: assetGrpList[i]?.subGroupsNames,
            asset_type: assetGrpList[i]?.assetTypes,
            assets: (assetGrpList[i]?.values?.map((valueItem) => (<p>{valueItem?.ast_ip_address}</p>))),
          });
          setAssetGroupData(assetGroupInfo);
          setTotalCount(assetGroupList?.listData?.data?._meta?.totalCount);
          setCurrentPage(assetGroupList?.listData?.data?._meta?.currentPage);
        }
      }
    }
  }, [assetGroupList]);

  useEffect(() => {
    const queryObject = {
      agr_subject: agr_subject,
      ...(agr_show !== '20' && { agr_show: agr_show }),
      ...(agr_page_no !== 1 && { agr_page_no: agr_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(agr_show);
  }, [searchText, agr_show, agr_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("agr_page_no", pageNumber);
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
    let assetsSourceList = [];
    let assetsSubGroupList = [];
    if (!isEmpty(assetsSourceListData?.listData?.data) &&
      !isEmpty(assetsSubGroupData?.listData?.data)
    ) {
      if (assetsSourceListData?.listData?.data) {
        Object.entries(assetsSourceListData?.listData?.data).map(([key, value], index) => {
          assetsSourceList.push(
            { key: key, value: key, label: value },
          );
        });
        setUpdatedAssetSourceList(assetsSourceList);
      }
      if (assetsSubGroupData?.listData?.data) {
        Object.entries(assetsSubGroupData?.listData?.data).map(([key, value], index) => {
          assetsSubGroupList.push(
            { key: key, value: key, label: value },
          );
        });
        setUpdatedAssetsSubGroup(assetsSubGroupList);
      }
    }
  }, [assetsSourceListData?.listData?.data && assetsSubGroupData?.listData?.data]);

  useEffect(() => {
    getAssetGroupSourceList();
    getAssetGroupSubgroupList();
  }, [getAssetGroupSourceList, getAssetGroupSubgroupList])

  const openCreateAssetGroupDrawer = () => {
    setShowCreateAssetGroupDrawer(true);
  };
  const closeCreateAssetGroupDrawer = () => {
    setShowCreateAssetGroupDrawer(false);
  };

  const closeEditAssetGroupDrawer = () => {
    setShowEditDrawer(false);
  };

  const createAssetGroup = (data) => {
    setShowCreateAssetGroupDrawer(false);
    const myArrayQry = mapQueryWithApi(query);
    createAssetsGroup({ data, queryItem: myArrayQry });
  };

  const EditAssetGroup = (data) => {
    setShowEditDrawer(false);
    const myArrayQry = mapQueryWithApi(query);
    editAssetsGroup({ id: selectedAssetGroupId, data, queryItem: myArrayQry });
  }

  return (
    <>
      <PageHeader
        title="Asset groups"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-assets-group")))? <SPButton
            onButtonClick={openCreateAssetGroupDrawer}
            title="Create asset group"
            size="small"
            image={<PlusIcon />}
          /> : '',
        ]}
      />
      <SPDrawer
        title="Create asset group"
        isVisible={showCreateAssetGroupDrawer}
        onClose={closeCreateAssetGroupDrawer}
      >
        <CreateAssetGroup
          isVisible={showCreateAssetGroupDrawer}
          updatedAssetSourceList={updatedAssetSourceList}
          updatedAssetsSubGroup={updatedAssetsSubGroup}
          createAssetGroup={createAssetGroup}
          onCloseDrawer={closeCreateAssetGroupDrawer}
          assetCurrentAction={assetCurrentAction}
          selectedAssetGroup={selectedAssetGroup}
        />
      </SPDrawer>

      <SPDrawer
        title={assetCurrentAction === "Edit" ? "Update Asset Group" : "Create asset group"}
        isVisible={showEditDrawer}
        onClose={closeEditAssetGroupDrawer}
      >
        <EditAssetsGroup
          selectedgroup={selectedAssetGroup}
          isVisible={showEditDrawer}
          updatedAssetSourceList={updatedAssetSourceList}
          updatedAssetsSubGroup={updatedAssetsSubGroup}
          onCloseDrawer={closeEditAssetGroupDrawer}
          assetCurrentAction={assetCurrentAction}
          selectedAssetGroup={selectedAssetGroup}
          EditAssetGroup={EditAssetGroup}
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
              handleChange('agr_subject', searchText);
            }}
            size="500px"
          />
        </Col>

        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={agr_show}
            onChange={e => {
              handleChange('agr_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={assetGroupColumns}
          dataSource={AssetGroupData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={agr_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetGroupList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    organizationStore: state.administration.organization,
    assetGroupList: state.administration.assets,
    assetsSourceListData: state.administration.assetsSourceListData,
    assetsSubGroupData: state.administration.assetsSubGroupData,
  }
}

const mapDispatchToProps = dispatch => ({
  getAssetGroupList: data => {
    dispatch(getAssetGroupList(data));
  },
  getAssetGroupSourceList: () =>
    dispatch(getAssetGroupSourceList()),
  getAssetGroupSubgroupList: () =>
    dispatch(getAssetGroupSubgroupList()),
  createAssetsGroup: (data) =>
    dispatch(createAssetsGroup(data)),
  deleteAssetsGroup: (data) =>
    dispatch(deleteAssetsGroup(data)),
  editAssetsGroup: (data) =>
    dispatch(editAssetsGroup(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(AssetGroup);
