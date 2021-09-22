import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import {
  administratorCasesDitectionsMethod,
  administratorCasesDitectionMethodDelete,
  administratorCasesDitectionMethodUpdate,
  administratorCasesDitectionMethodCreate,
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router-dom'
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import queryString from 'query-string';
import PageHeader from '../../../../../../layout/pageHeader';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
const { confirm } = Modal;
import DitectionMethodDrawer from './Components/DetectionMethodSidebar';
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
const DitectionMethod = ({ onGetDitectionMethod, ditectioMethodList, loading, onCreateDitectionMethod, onUpdateDitectionMethod, onDeleteDitectionMethod, userProfile, access }) => {
  const [showCreateDrawer, setshowCreateDrawer] = useState(false);
  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [ditectionMethodItemList, setDitectionMethodItemList] = useState([]);
  const [record, setRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [query, setQuery] = useState(location.search);
  const history = useHistory();

  const {
    iat_showing = '20',
    iat_page_no = 1,
    iat_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };
  const [searchText, setSearchText] = useState(iat_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query)
        onDeleteDitectionMethod(key, myQuery);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        IncidentAwarenessTypesSearch: {},
        QueryString: '',
      };
      if (parsedQuery.iat_subject) {
        queryObject.IncidentAwarenessTypesSearch.search = parsedQuery.iat_subject;
      }
      if (parsedQuery.iat_page_no) {
        queryObject.payload.page = parsedQuery.iat_page_no;
      }

      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.iat_showing) {
        queryObject.payload['per-page'] = parsedQuery.iat_showing;
      }
      const { IncidentAwarenessTypesSearch } = queryObject;
      if (Object.keys(IncidentAwarenessTypesSearch).length !== 0) {
        Object.entries(IncidentAwarenessTypesSearch).forEach(([key, val]) => {
          myArrayQry += 'IncidentAwarenessTypesSearch[' + key + ']=' + val + '&';
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
    onGetDitectionMethod({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (ditectioMethodList) {
      if (Object.keys(ditectioMethodList).length !== 0) {
        setDitectionMethodItemList(ditectioMethodList?.items);
        setTotalCount(ditectioMethodList?._meta.totalCount);
        setCurrentPage(ditectioMethodList?._meta.currentPage);
      }
    }
  }, [ditectioMethodList]);

  useEffect(() => {
    const queryObject = {
      iat_subject: iat_subject,
      ...(iat_showing !== '20' && { iat_showing: iat_showing }),
      ...(iat_page_no !== 1 && { iat_page_no: iat_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(iat_showing);
  }, [searchText, iat_showing, iat_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };
  const onPageChange = pageNumber => {
    handleChange('iat_page_no', pageNumber);
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

  const columns = [
    {
      title: '#',
      dataIndex: 'iat_id',
      editable: false,
      key: (text, record, index) => record?.iat_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'iat_name',
      editable: false,
      sorter: true,
      width: '80%',
    },
    {
      title: 'Actions',
      dataIndex: 'ita_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-awareness-types"))){
          const updateDetectionMethod=  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setShowUpdateDrawer(true);
            },
          };
          moreItems.push(updateDetectionMethod);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-awareness-types"))){
          const deleteDetectionMethod={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.iat_id);
            },
          };
          moreItems.push(deleteDetectionMethod);
        }

        if (userProfile?.usr_api_organization === record?.iat_organization && moreItems.length !== 0) {
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

  const onUpdate = (id, data) => {
    const myQuery = mapQueryWithApi(query)
    onUpdateDitectionMethod(id, data, myQuery)
    setShowUpdateDrawer(false)
  }
  const onCreate = (data) => {
    const myQuery = mapQueryWithApi(query)
    onCreateDitectionMethod(data, myQuery)
    setshowCreateDrawer(false)
  }
  return (
    <>
      <PageHeader
        title="Detection Method"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-awareness-types"))) &&
          <SPButton
            onButtonClick={() => setshowCreateDrawer(true)}
            title="Create Detection Method"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPDrawer
        title="Create Detection Methods"
        isVisible={showCreateDrawer}
        onClose={() => setshowCreateDrawer(false)}
        drawerWidth={700}
      >
        <DitectionMethodDrawer type="create" isVisible={showCreateDrawer} onCreateHandler={onCreate} />
      </SPDrawer>
      <SPDrawer
        title="Update Detection Methods"
        isVisible={showUpdateDrawer}
        onClose={() => setShowUpdateDrawer(false)}
        drawerWidth={700}
      >
        <DitectionMethodDrawer type="edit" isVisible={showUpdateDrawer} onUpdateHandler={onUpdate} selectedRecord={record} />
      </SPDrawer>

      <>
        <Row
          gutter={[19, 10]}
          style={{ marginTop: 23, marginBottom: 13, flexWrap: 'flex' }}
        >
          <Col>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onEnter={() => {
                handleChange('iat_subject', searchText);
              }}
              size="420px"
            />
          </Col>
          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={iat_showing || 20}
              onChange={e => {
                handleChange('iat_showing', e.key);
              }}
            />
          </Col>
        </Row>
        <SPTable
          columns={columns}
          dataSource={ditectionMethodItemList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          isLoading={loading}
          showingTill={iat_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1 ? currentPage : (currentPage - 1) * iat_showing + 1
          }
          currentPage={currentPage}
        />
      </>
    </>
  );
};
const mapStateToProps = state => {
  return {
    ditectioMethodList: state.administration?.ditectionMethodList?.listData,
    loading: state.administration.ditectionMethodList.loading,
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
  };
};

const mapDispatchToProps = dispatch => ({
  onGetDitectionMethod: (...args) => dispatch(administratorCasesDitectionsMethod(...args)),
  onCreateDitectionMethod: (...args) => dispatch(administratorCasesDitectionMethodCreate(...args)),
  onUpdateDitectionMethod: (...args) => dispatch(administratorCasesDitectionMethodUpdate(...args)),
  onDeleteDitectionMethod: (...args) => dispatch(administratorCasesDitectionMethodDelete(...args))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(DitectionMethod);
