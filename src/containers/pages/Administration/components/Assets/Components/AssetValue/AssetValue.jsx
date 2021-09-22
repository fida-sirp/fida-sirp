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
  changeAssetValueTitle,
  createAssetsValue,
  deleteAssetsValue,
  editAssetsValue,
  getAssetValueList,
} from '../../../../../../../actions/administration';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import { useHistory } from 'react-router';
import CreateAssetValue from './create';
import EditAssetsValue from './Edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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

const AssetValue = ({
  getAssetValueList,
  assetsValueList,
  createAssetsValue,
  deleteAssetsValue,
  editAssetsValue,
  changeAssetValueTitle,
  allTabsHeading,
  access,
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [showCreateAssetValueDrawer, setShowCreateAssetValueDrawer] = useState(
    false
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [assetValueData, setAssetValueData] = useState([]);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [assetCurrentAction, setAssetCurrentAction] = useState('');
  const [selectedAssetValue, setSelectedAssetValue] = useState();
  const [selectedAssetValueId, setSelectedAssetValueId] = useState();
  const [showEditAssetValueDrawer, setShowEditAssetValueDrawer] = useState(
    false
  );
  const [showChangeTitleDrawer, setShowChangeTitleDrawer] = useState(false);
  const myArrayQry = mapQueryWithApi(query);

  const {
    asv_show = '20',
    asv_page_no = 1,
    asv_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(asv_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteAssetsValue({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const assetValueColumns = [
    {
      title: '#',
      dataIndex: 'asv_id',
      editable: false,
      key: (text, record, index) => record?.asv_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'asv_name',
      editable: false,
      sorter: true,
      width: '50%'
    },
    {
      title: 'Value',
      dataIndex: 'asv_value',
      editable: false,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-asset-value"))) {
          const updateAssetValue = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setSelectedAssetValueId(record?.asv_id);
              setSelectedAssetValue(record);
              setAssetCurrentAction('Edit');
              setShowEditAssetValueDrawer(true);
            },
          };
          moreItems.push(updateAssetValue);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-asset-value"))) {
          const deleteAssetValue = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.asv_id);
            },
          };
          moreItems.push(deleteAssetValue);
        }
        if(moreItems.length !== 0) {
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
        AssetValueSearch: {},
        QueryString: '',
      };
      if (parsedQuery.asv_subject) {
        queryObject.AssetValueSearch.search = parsedQuery.asv_subject;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.asv_page_no) {
        queryObject.payload.page = parsedQuery.asv_page_no;
      }

      if (parsedQuery.asv_show) {
        queryObject.payload['per-page'] = parsedQuery.asv_show;
      }
      const { AssetValueSearch } = queryObject;
      if (Object.keys(AssetValueSearch).length !== 0) {
        Object.entries(AssetValueSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetValueSearch[' + key + ']=' + val + '&';
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
    getAssetValueList({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (assetsValueList) {
      let assetValueTabInfo = [];
      if (Object.keys(assetsValueList).length !== 0) {
        const assetValueList = assetsValueList?.listData?.data?.items;
        for (let i = 0; i < assetValueList?.length; i += 1) {
          assetValueTabInfo.push({
            asv_id: assetValueList[i]?.asv_id,
            asv_name: assetValueList[i]?.asv_name,
            asv_value: assetValueList[i]?.asv_value,
          });
          setAssetValueData(assetValueTabInfo);
          setTotalCount(assetsValueList?.listData?.data?._meta?.totalCount);
          setCurrentPage(assetsValueList?.listData?.data?._meta?.currentPage);
        }
      }
    }
  }, [assetsValueList]);

  useEffect(() => {
    const queryObject = {
      asv_subject: asv_subject,
      ...(asv_show !== '20' && { asv_show: asv_show }),
      ...(asv_page_no !== 1 && { asv_page_no: asv_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(asv_show);
  }, [searchText, asv_show, asv_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange('asv_page_no', pageNumber);
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

  const openCreateAssetValueDrawer = () => {
    setAssetCurrentAction('Create');
    setShowCreateAssetValueDrawer(true);
  };

  const openEditTitleDrawer = () => {
    setShowChangeTitleDrawer(true);
  };

  const closeCreateAssetValueDrawer = () => {
    setShowCreateAssetValueDrawer(false);
  };

  const closeEditAssetValuesDrawer = () => {
    setShowEditAssetValueDrawer(false);
  };

  const closeEditTitleDrawer = () => {
    setShowChangeTitleDrawer(false);
  };

  const createAssetValue = data => {
    setShowCreateAssetValueDrawer(false);
    let formData = new FormData();
    formData.append('asv_name', data.asv_name);
    formData.append('asv_value', data.asv_value);
    createAssetsValue({ data: formData, queryItem: myArrayQry });
  };

  const editAssetValues = data => {
    setShowEditAssetValueDrawer(false);
    let formData = new FormData();
    formData.append('asv_name', data.asv_name);
    formData.append('asv_value', data.asv_value);
    editAssetsValue({ id: selectedAssetValueId, data: formData, queryItem: myArrayQry });
  };

  const editAssetTitleValues = data => {
    setShowChangeTitleDrawer(false);
    let formData = new FormData();
    formData.append('aty_label', data.aty_label);
    formData.append('aty_value', data.aty_value);
    changeAssetValueTitle({ data: formData });
  };

  return (
    <>
      <PageHeader
        title={allTabsHeading?.assetsValue?.asv_label}
        options={[
          (access !== undefined && (access.includes("all-super-admin") || access.includes("create-asset-value"))) ?
          <SPButton
            onButtonClick={openCreateAssetValueDrawer}
            title={`Create ${allTabsHeading?.assetsValue?.asv_label}`}
            size="small"
            image={<PlusIcon />}
          /> : '',
          (access !== undefined && (access.includes("all-super-admin") || access.includes("change-title-asset-value"))) ?
          <SPButton
            onButtonClick={openEditTitleDrawer}
            title="Change Title"
            size="small"
            image={<PlusIcon />}
          /> : '',
        ]}
      />
      <SPDrawer
        title={`Create ${allTabsHeading?.assetsValue?.asv_label}`}
        isVisible={showCreateAssetValueDrawer}
        onClose={closeCreateAssetValueDrawer}
      >
        <CreateAssetValue
          isVisible={showCreateAssetValueDrawer}
          createAssetValue={createAssetValue}
          onCloseDrawer={closeCreateAssetValueDrawer}
        />
      </SPDrawer>

      <SPDrawer
        title={`Update ${allTabsHeading?.assetsValue?.asv_label}`}
        isVisible={showEditAssetValueDrawer}
        onClose={closeEditAssetValuesDrawer}
      >
        <EditAssetsValue
          isVisible={showEditAssetValueDrawer}
          onCloseDrawer={closeEditAssetValuesDrawer}
          selectedAssetValue={selectedAssetValue}
          EditAssetValues={editAssetValues}
        />
      </SPDrawer>

      <SPDrawer
        title="Change Title"
        isVisible={showChangeTitleDrawer}
        onClose={closeEditTitleDrawer}
      >
        <EditTitle
          isVisible={showChangeTitleDrawer}
          onCloseDrawer={closeEditTitleDrawer}
          selectedAssetValue={allTabsHeading?.assetsValue}
          editAssetTitleValues={editAssetTitleValues}
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
              handleChange('asv_subject', searchText);
            }}
            size="500px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={asv_show}
            onChange={e => {
              handleChange('asv_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={assetValueColumns}
          dataSource={assetValueData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={asv_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetsValueList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    assetsValueList: state.administration.assetsValueList,
    assetsSubGroupDropDownData: state.administration.assetsSubGroupDropDownData,
    allTabsHeading: state.administration.allTabsHeading?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  getAssetValueList: data => dispatch(getAssetValueList(data)),
  createAssetsValue: data => dispatch(createAssetsValue(data)),
  deleteAssetsValue: data => dispatch(deleteAssetsValue(data)),
  editAssetsValue: data => dispatch(editAssetsValue(data)),
  changeAssetValueTitle: data => dispatch(changeAssetValueTitle(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(AssetValue);
