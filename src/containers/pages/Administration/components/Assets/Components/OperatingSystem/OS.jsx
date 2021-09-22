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
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  createOperatingSystem,
  deleteOperatingSystem,
  editOperatingSystem,
  getAssetOperatingSystemList,
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router';
import CreateOs from './create';
import EditAssetsValue from './Edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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

const OperatingSystem = ({
  getAssetOperatingSystemList,
  assetOsList,
  createOperatingSystem,
  deleteOperatingSystem,
  editOperatingSystem,
  access
}) => {

  const [totalCount, setTotalCount] = useState(1);
  const [showCreateOsDrawer, setShowCreateOsDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [assetOsData, setAssetOsData] = useState([]);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [selectedOperatingSystemData, setSelectedOperatingSystemData] = useState();
  const [selectedOperatingSystemId, setSelectedOperatingSystemId] = useState();
  const [showEditOperatingSystemDrawer, setShowEditOperatingSystemDrawer] = useState(false);
  const myArrayQry = mapQueryWithApi(query);

  const {
    aos_show = '20',
    aos_page_no = 1,
    aos_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(aos_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteOperatingSystem({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const osColumns = [
    {
      title: '#',
      dataIndex: 'aos_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'aos_os_name',
      editable: false,
      width: '45%',
      sorter: true,
    },
    {
      title: 'Version',
      dataIndex: 'aos_os_version',
      editable: false,
      width: '45%',
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'asset_delete',
      render: (text, record, index) => {

        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-assets-os"))) {
          const updateAssetOs =  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setSelectedOperatingSystemId(record?.aos_id);
              setSelectedOperatingSystemData(record);
              setShowEditOperatingSystemDrawer(true);
            },
          };
          moreItems.push(updateAssetOs);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-assets-os"))) {
          const deleteAssetOs =  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.aos_id);
            },
          };
          moreItems.push(deleteAssetOs);
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
        AssetsOsSearch: {},
        QueryString: '',
      };
      if (parsedQuery.aos_subject) {
        queryObject.AssetsOsSearch.search = parsedQuery.aos_subject;
      }
      if (parsedQuery.aos_page_no) {
        queryObject.payload.page = parsedQuery.aos_page_no;
      }

      if (parsedQuery.aos_show) {
        queryObject.payload['per-page'] = parsedQuery.aos_show;
      }

      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      const { AssetsOsSearch } = queryObject;
      if (Object.keys(AssetsOsSearch).length !== 0) {
        Object.entries(AssetsOsSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetsOsSearch[' + key + ']=' + val + '&';
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
    getAssetOperatingSystemList({ queryItem: myArrayQry })
  }, [query]);

  useEffect(() => {
    if (assetOsList?.listData) {
      if (Object.keys(assetOsList?.listData).length !== 0) {
        setAssetOsData(assetOsList?.listData?.data?.items);
        setTotalCount(assetOsList?.listData?.data?._meta?.totalCount);
        setCurrentPage(assetOsList?.listData?.data?._meta?.currentPage);
      }
    }
  }, [assetOsList]);


  useEffect(() => {
    const queryObject = {
      aos_subject: aos_subject,
      ...(aos_show !== '20' && { aos_show: aos_show }),
      ...(aos_page_no !== 1 && { aos_page_no: aos_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(aos_show);
  }, [searchText, aos_show, aos_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("aos_page_no", pageNumber);
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

  const openCreateOsDrawer = () => {
    setShowCreateOsDrawer(true);
  };

  const closeCreateOsDrawer = () => {
    setShowCreateOsDrawer(false);
  };

  const closeEditOperatingSystemDrawer = () => {
    setShowEditOperatingSystemDrawer(false);
  };

  const createOs = (data) => {
    setShowCreateOsDrawer(false);
    let formData = new FormData();
    formData.append('aos_os_name', data.aos_os_name);
    formData.append('aos_os_version', data.aos_os_version);
    createOperatingSystem({ data: formData, queryItem: myArrayQry });
  };

  const EditOperatingSystem = (data) => {
    setShowEditOperatingSystemDrawer(false);
    let formData = new FormData();
    formData.append('aos_os_name', data.aos_os_name);
    formData.append('aos_os_version', data.aos_os_version);
    editOperatingSystem({ id: selectedOperatingSystemId, data: formData, queryItem: myArrayQry });
  }

  return (
    <>
      <PageHeader
        title="Operating System"
        options={[
           (access !== undefined && (access.includes("all-super-admin") || access.includes("create-assets-os"))) &&
          <SPButton
            onButtonClick={openCreateOsDrawer}
            title="Create Operating System"
            size="small"
            image={<PlusIcon />}
          />
        ]}
      />
      <SPDrawer
        title="Create Operating System"
        isVisible={showCreateOsDrawer}
        onClose={closeCreateOsDrawer}
      >
        <CreateOs
          isVisible={showCreateOsDrawer}
          createOs={createOs}
          onCloseDrawer={closeCreateOsDrawer}
        />
      </SPDrawer>

      <SPDrawer
        title="Update Operating System"
        isVisible={showEditOperatingSystemDrawer}
        onClose={closeEditOperatingSystemDrawer}
      >
        <EditAssetsValue
          isVisible={showEditOperatingSystemDrawer}
          onCloseDrawer={closeEditOperatingSystemDrawer}
          selectedOperatingSystemData={selectedOperatingSystemData}
          editOperatingSystem={EditOperatingSystem}
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
              handleChange('aos_subject', searchText);
            }}
            size="500px"
          />
        </Col>

        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={aos_show}
            onChange={e => {
              handleChange('aos_show', e.key);
            }}
          />
        </Col>
      </Row>
      <>
        <SPTable
          columns={osColumns}
          dataSource={assetOsData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={aos_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetOsList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    assetOsList: state.administration.assetOsList,
    assetsSubGroupDropDownData: state.administration.assetsSubGroupDropDownData,
  }
}

const mapDispatchToProps = dispatch => ({
  getAssetOperatingSystemList: data =>
    dispatch(getAssetOperatingSystemList(data)),
  createOperatingSystem: (data) =>
    dispatch(createOperatingSystem(data)),
  deleteOperatingSystem: (data) =>
    dispatch(deleteOperatingSystem(data)),
  editOperatingSystem: (data) =>
    dispatch(editOperatingSystem(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(OperatingSystem);
