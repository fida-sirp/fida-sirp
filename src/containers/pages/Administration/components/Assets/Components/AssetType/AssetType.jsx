import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import {
  assetDropDownList,
  assetTypeDropDownList,
  changeAssetTypeTitle,
  createAssetType,
  deleteAssetType,
  departmentDropDownList,
  editAssetType,
  getAssetTypeList,
  ownerDropDownList,
  subGroupDropDownList,
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
import PageHeader from '../../../../../../layout/pageHeader';
import CreateAssetType from './create';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import EditAssetType from './Edit';
import EditTitle from './EditTitle';
import { isEmpty } from 'lodash-es';

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

const AssetType = ({
  getAssetTypeList,
  assetTypeList,
  createAssetType,
  deleteAssetType,
  editAssetType,
  changeAssetTypeTitle,
  assetDropDownListData,
  assetSubGroupListData,
  assetOwnerDropDownListData,
  assetDepartmentDropDownListData,
  assetDropDownList,
  subGroupDropDownList,
  ownerDropDownList,
  departmentDropDownList,
  assetTypeDropDownList,
  assetValueDropDownListData,
  allTabsHeading,
  access,
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [showCreateAssetTypeDrawer, setShowCreateAssetTypeDrawer] = useState(
    false
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [assetValueData, setAssetValueData] = useState([]);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [assetCurrentAction, setAssetCurrentAction] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState({});
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState();
  const [showEditAssetTypeDrawer, setShowEditAssetTypeDrawer] = useState(false);
  const [showChangeTitleDrawer, setShowChangeTitleDrawer] = useState(false);
  const [udpatedAssetDropDownList, setUdpatedAssetDropDownList] = useState();
  const [
    updatedSubGroupDropDownList,
    setUpdatedSubGroupDropDownList,
  ] = useState();
  const [updatedOwnerDropDownList, setUpdatedOwnerDropDownList] = useState();
  const [
    updatedAssetValueDropDownList,
    setUpdatedAssetValueDropDownList,
  ] = useState();
  const [
    updatedDepartmentDropDownList,
    setUpdatedDepartmentDropDownList,
  ] = useState();
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);
  const myArrayQry = mapQueryWithApi(query);

  const {
    aty_show = '20',
    aty_page_no = 1,
    aty_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(aty_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteAssetType({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const assetTypeColumns = [
    {
      title: '#',
      dataIndex: 'aty_id',
      editable: false,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'aty_name',
      editable: false,
      sorter: true,
      width: 354,
    },
    {
      title: 'Assets',
      dataIndex: 'astData',
      editable: false,
      sorter: true,
      render: (text, record, index) => {
        return <div dangerouslySetInnerHTML={{ __html: record.astData }} />
      },
    },
    {
      title: 'Asset Subgroups',
      dataIndex: 'subgroupData',
      editable: false,
      sorter: true,
      render: (text, record, index) => {
        return <div dangerouslySetInnerHTML={{ __html: record.subgroupData }} />
      },
    },
    {
      title: 'Asset Value',
      dataIndex: 'aty_value',
      editable: false,
      sorter: true,
      render: (text, record, index) => {
        return <div dangerouslySetInnerHTML={{ __html: record.atyValue }} />
      },
    },
    {
      title: 'Owner',
      dataIndex: 'aty_owner',
      editable: false,
      sorter: true,
      render: (text, record, index) => {
        return <div dangerouslySetInnerHTML={{ __html: record.atyOwner }} />
      },
    },
    {
      title: 'Department',
      dataIndex: 'aty_department',
      editable: false,
      sorter: true,
      render: (text, record, index) => {
        return <div dangerouslySetInnerHTML={{ __html: record.atyDepartment }} />
      },
    },
    {
      title: 'Actions',
      dataIndex: 'aty_delete',
      render: (text, record, index) => {


        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-asset-type"))) {
          const updateAssetType = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              setSelectedAssetTypeId(record?.aty_id);
              setSelectedAssetType(record);
              setSelectedAssetsList(
                  assetTypeList?.listData?.data.items[index].astData
              );
              setShowEditAssetTypeDrawer(true);
            },
          };
          moreItems.push(updateAssetType);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-asset-type"))) {
          const deleteAssetType = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin/>,
            onClickItem: () => {
              showConfirm(record?.aty_id);
            },
          };
          moreItems.push(deleteAssetType);
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
        AssetTypeSearch: {},
        QueryString: '',
      };
      if (parsedQuery.aty_subject) {
        queryObject.AssetTypeSearch.search = parsedQuery.aty_subject;
      }
      if (parsedQuery.aty_page_no) {
        queryObject.payload.page = parsedQuery.aty_page_no;
      }

      if (parsedQuery.aty_show) {
        queryObject.payload['per-page'] = parsedQuery.aty_show;
      }
      const { AssetTypeSearch } = queryObject;
      if (Object.keys(AssetTypeSearch).length !== 0) {
        Object.entries(AssetTypeSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetTypeSearch[' + key + ']=' + val + '&';
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
    assetDropDownList();
    subGroupDropDownList();
    ownerDropDownList();
    departmentDropDownList();
    assetTypeDropDownList();
    getAssetTypeList({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (assetTypeList) {
      let assetTypeInfo = [];
      if (Object.keys(assetTypeList).length !== 0) {
        const assetValueList = assetTypeList?.listData?.data?.items;
        for (let i = 0; i < assetValueList?.length; i += 1) {
          assetTypeInfo.push({
            aty_id: assetValueList[i]?.aty_id,
            aty_name: assetValueList[i]?.aty_name,
            astData: renderValue(assetValueList[i]?.astData, '', true),
            subgroupData: renderValue(assetValueList[i]?.subgroupData, '', true),
            subgroups: renderSubGroupIds(assetValueList[i]?.subgroupData),
            aty_value: assetValueList[i]?.atyValue?.asv_name,
            atyValue: renderValue(assetValueList[i]?.atyValue, 'asv_name', false),
            atyOwner: renderValue(assetValueList[i]?.atyOwner, 'usr_name', false),
            aty_owner: assetValueList[i]?.aty_owner,
            atyDepartment: renderValue(assetValueList[i]?.atyDepartment, 'dep_name', false),
            aty_department: assetValueList[i]?.aty_department,
          });

          setAssetValueData(assetTypeInfo);
          setTotalCount(assetTypeList?.listData?.data?._meta?.totalCount);
          setCurrentPage(assetTypeList?.listData?.data?._meta?.currentPage);
        }
      }
    }
  }, [assetTypeList]);

  const renderSubGroupIds = (data) => {
    const allSubGroupIds = [];
    updatedSubGroupDropDownList?.map(subGroup => {
      if (data.includes(subGroup.label)) {
        allSubGroupIds.push(subGroup.value);
      }
    })
    return allSubGroupIds;
  };

  const renderValue = (data, key, isarray) => {
    let myArr = '';
    if (isarray) {
      if (data && data.length > 0) {
        map(data, value => {
          myArr = myArr + `<li>${value}</li>`;
        })
      } else if (data[key]) {
        myArr = `<li>${data[key]}</li>`;
      }
    } else if (data && data.length > 0) {
      map(data, value => {
        myArr = myArr + `<li>${value[key]}</li>`;
      })
    } else if (data && Object.keys(data).length > 0 && data[key]) {
      myArr = `<li>${data[key]}</li>`;
    }

    return myArr.length > 0 ? `<ul>${myArr}</ul>` : '(not set)';
  }

  const handleAssetValueView = index => {
    if (!isEmpty(index))
      if (!isEmpty(updatedAssetValueDropDownList)) {
        return updatedAssetValueDropDownList.map(data => {
          if (data.key == index) return data.label;
        });
      } else return index;
    return '(not set)';
  };

  const handleAssetOwnerView = index => {
    if (!isEmpty(index))
      if (!isEmpty(updatedOwnerDropDownList)) {
        return updatedOwnerDropDownList.map(data => {
          if (data.key == index) return data.label;
        });
      } else return index;
    return '(not set)';
  };

  const handleAssetDepartmentView = index => {
    if (!isEmpty(index))
      if (!isEmpty(updatedDepartmentDropDownList)) {
        return updatedDepartmentDropDownList.map(data => {
          if (data.key == index) return data.label;
        });
      } else return index;
    return '(not set)';
  };
  useEffect(() => {
    const queryObject = {
      aty_subject: aty_subject,
      ...(aty_show !== '20' && { aty_show: aty_show }),
      ...(aty_page_no !== 1 && { aty_page_no: aty_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(aty_show);
  }, [searchText, aty_show, aty_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange('aty_page_no', pageNumber);
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

  const openCreateAssetTypeDrawer = () => {
    setAssetCurrentAction('Create');
    setSelectedAssetType({});
    setShowEditAssetTypeDrawer(true);
  };

  const openEditTitleDrawer = () => {
    setShowChangeTitleDrawer(true);
  };

  const closeCreateAssetTypeDrawer = () => {
    setShowCreateAssetTypeDrawer(false);
  };

  const closeeditAssetTypeDrawer = () => {
    setShowEditAssetTypeDrawer(false);
  };

  const closeEditTitleDrawer = () => {
    setShowChangeTitleDrawer(false);
  };

  const createAssetTypeAction = value => {
    setShowCreateAssetTypeDrawer(false);
    const assets = [];
    const subgroups = [];
    value?.assets &&
      Object.entries(value?.assets).forEach(([key, assetItem]) => {
        assets.push(assetItem);
      });
    value?.subgroups &&
      Object.entries(value?.subgroups).forEach(([key, subGroupItem]) => {
        subgroups.push(subGroupItem);
      });

    const data = {
      aty_name: value.aty_name,
      aty_value: value.aty_value,
      assets: assets,
      subgroups: subgroups,
      aty_owner: value.aty_owner,
      aty_department: value.aty_department,
    };
    createAssetType({ data: data, queryItem: myArrayQry });
  };

  const editAssetTypeAction = value => {
    setShowEditAssetTypeDrawer(false);
    const assets = [];
    const subgroups = [];
    value?.assets &&
      Object.entries(value?.assets).forEach(([key, assetItem]) => {
        assets.push(assetItem);
      });
    value?.subgroups &&
      Object.entries(value?.subgroups).forEach(([key, subGroupItem]) => {
        subgroups.push(subGroupItem);
      });

    const data = {
      aty_name: value.aty_name,
      aty_value: value.aty_value,
      assets: assets,
      subgroups: subgroups,
      aty_owner: value.aty_owner,
      aty_department: value.aty_department,
    };
    editAssetType({
      id: selectedAssetTypeId,
      data: data,
      queryItem: myArrayQry,
    });
  };

  const editAssetTypeTitle = data => {
    setShowChangeTitleDrawer(false);
    let formData = new FormData();
    formData.append('aty_label', data.aty_label);
    changeAssetTypeTitle({ data: formData, queryItem: myArrayQry });
  };

  useEffect(() => {
    let assetsDropDownListInfo = [];
    let assetsSubGroupListInfo = [];
    let assetOwnerListInfo = [];
    let assetDepartmentListInfo = [];
    let assetValueDropDownListInfo = [];

    assetDropDownListData?.listData?.data &&
      Object.entries(assetDropDownListData?.listData?.data).map(
        ([key, value], index) => {
          assetsDropDownListInfo.push({ key: key, value: key, label: value });
        }
      );
    assetSubGroupListData?.listData?.data &&
      Object.entries(assetSubGroupListData?.listData?.data).map(
        ([key, value], index) => {
          assetsSubGroupListInfo.push({ key: key, value: key, label: value });
        }
      );
    assetOwnerDropDownListData?.listData?.data &&
      Object.entries(assetOwnerDropDownListData?.listData?.data).map(
        ([key, value], index) => {
          assetOwnerListInfo.push({ key: key, value: key, label: value });
        }
      );
    assetDepartmentDropDownListData?.listData?.data &&
      Object.entries(assetDepartmentDropDownListData?.listData?.data).map(
        ([key, value], index) => {
          assetDepartmentListInfo.push({ key: key, value: key, label: value });
        }
      );

    assetValueDropDownListData?.listData?.data &&
      Object.entries(assetValueDropDownListData?.listData?.data).map(
        ([key, value], index) => {
          assetValueDropDownListInfo.push({
            key: key,
            value: key,
            label: value,
          });
        }
      );

    setUdpatedAssetDropDownList(assetsDropDownListInfo);
    setUpdatedSubGroupDropDownList(assetsSubGroupListInfo);
    setUpdatedOwnerDropDownList(assetOwnerListInfo);
    setUpdatedDepartmentDropDownList(assetDepartmentListInfo);
    setUpdatedAssetValueDropDownList(assetValueDropDownListInfo);
  }, [
    !isEmpty(assetDropDownListData?.listData?.data) &&
    !isEmpty(assetSubGroupListData?.listData?.data) &&
    !isEmpty(assetOwnerDropDownListData?.listData?.data) &&
    !isEmpty(assetDepartmentDropDownListData?.listData?.data) &&
    !isEmpty(assetValueDropDownListData?.listData?.data),
  ]);

  return (
    <>
      <PageHeader
        title={allTabsHeading?.assetsType}
        options={[
          (access !== undefined && (access.includes("all-super-admin") || access.includes("create-asset-type"))) ?
              <SPButton
            onButtonClick={openCreateAssetTypeDrawer}
            title={`Create ${allTabsHeading?.assetsType}`}
            size="small"
            image={<PlusIcon />}
          /> : '',
          (access !== undefined && (access.includes("all-super-admin") || access.includes("change-title-asset-type"))) ?
              <SPButton
            onButtonClick={openEditTitleDrawer}
            title="Change Title"
            size="small"
          /> : '',
        ]}
      />

      <SPDrawer
        title={selectedAssetType && Object.keys(selectedAssetType) ? `Update ${allTabsHeading?.assetsType}` : `Create ${allTabsHeading?.assetsType}`}
        isVisible={showEditAssetTypeDrawer}
        onClose={closeeditAssetTypeDrawer}
      >
        <EditAssetType
          isVisible={showEditAssetTypeDrawer}
          udpatedAssetDropDownList={udpatedAssetDropDownList}
          updatedSubGroupDropDownList={updatedSubGroupDropDownList}
          updatedOwnerDropDownList={updatedOwnerDropDownList}
          updatedAssetValueDropDownList={updatedAssetValueDropDownList}
          updatedDepartmentDropDownList={updatedDepartmentDropDownList}
          onCloseDrawer={closeeditAssetTypeDrawer}
          selectedAssetType={selectedAssetType}
          selectedAssetsList={selectedAssetsList}
          editAssetType={editAssetTypeAction}
          createAssetType={createAssetTypeAction}
        />
      </SPDrawer>

      <SPDrawer
        title="Change Title"
        isVisible={showChangeTitleDrawer}
        onClose={closeEditTitleDrawer}
      >
        <EditTitle
          onCloseDrawer={closeEditTitleDrawer}
          selectedAssetType={allTabsHeading?.assetsType}
          editAssetTypeTitle={editAssetTypeTitle}
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
              handleChange('aty_subject', searchText);
            }}
            size="500px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={aty_show}
            onChange={e => {
              handleChange('aty_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={assetTypeColumns}
          dataSource={assetValueData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={aty_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetTypeList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    assetTypeList: state.administration.assetTypeList,
    assetDropDownListData: state.administration.assetDropDownList,
    assetSubGroupListData: state.administration.assetSubGroupDropDownList,
    assetOwnerDropDownListData: state.administration.assetOwnerDropDownList,
    assetDepartmentDropDownListData:
      state.administration.assetDepartmentDropDownList,
    assetValueDropDownListData: state.administration.assetValueDropDownList,
    allTabsHeading: state.administration.allTabsHeading?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  getAssetTypeList: data => dispatch(getAssetTypeList(data)),
  createAssetType: data => dispatch(createAssetType(data)),
  deleteAssetType: data => dispatch(deleteAssetType(data)),
  editAssetType: data => dispatch(editAssetType(data)),
  changeAssetTypeTitle: data => dispatch(changeAssetTypeTitle(data)),
  assetDropDownList: data => dispatch(assetDropDownList(data)),
  subGroupDropDownList: data => dispatch(subGroupDropDownList(data)),
  ownerDropDownList: data => dispatch(ownerDropDownList(data)),
  departmentDropDownList: data => dispatch(departmentDropDownList(data)),
  assetTypeDropDownList: data => dispatch(assetTypeDropDownList(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(AssetType);
