import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  riskManagementThreatValueList,
  createRiskManagementThreatValue,
  deleteRiskManagementThreatValue,
  updateRiskManagementThreatValue,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
// import CategoriesFormDrawer from './CategoriesForm';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { isEmpty } from 'lodash';
import ThreatValueFormDrawer from './threatValueForm';
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ThreatValue = ({
  userProfile,
  getList,
  registerList,
  updateList,
  deleteList,
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
    thr_showing = '20',
    thr_page_no = 1,
    thr_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(thr_showing);
  const [searchText, setSearchText] = useState(thr_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getThreatList();
  }, [query] || []);

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

  const getThreatList = () => {
    const myArrayQry = mapQueryWithApi(query);
    getList({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    if (registerList?.listData?._meta) {
      setTotalCount(registerList.listData._meta.totalCount);
      setCurrentPage(registerList.listData._meta.currentPage);
    }
  }, [registerList]);

  const columns = [
    {
      title: '#',
      dataIndex: 'thv_id',
      editable: false,
      key: (text, record, index) => record?.thv_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'thv_name',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.thv_id,
      render: (text, record, index) => record?.thv_name,
      width: '45%',
    },
    {
      title: 'Value',
      dataIndex: 'thv_value',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.thv_id,
      render: (text, record, index) => record.thv_value,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'thv_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-threat-value"))){
          const updateThreatValue= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setOpenDrawer(true);
                setRecord(record);
                setIsCreate(false);
              }

            },
          };
          moreItems.push(updateThreatValue);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-threat-value"))){
          const deleteThreatValue= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.thv_id);
            },
          };
          moreItems.push(deleteThreatValue);
        }
        if(userProfile?.usr_api_organization === record?.thv_organization && moreItems.length !==0 ) {
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
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.thr_page_no) {
        queryObject.payload.page = parsedQuery.thr_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.thr_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.thr_subject;
      }
      if (parsedQuery.thr_showing) {
        queryObject.payload['per-page'] = parsedQuery.thr_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ThreatValueSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ThreatValueSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('thr_page_no', pageNumber);
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
      if (name == 'thr_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
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


  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteList({ id: key, query: myArrayQry });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration/?active_tab=riskManagement&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration/?active_tab=riskManagement&&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = values => {
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
      updateList(values, record.thv_id, myArrayQry);
    } else createList(values, myArrayQry);
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title="Threat Value"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-threat-value"))) &&
          <SPButton
            title="Create Threat Value"
            onButtonClick={() => {
              setIsCreate(true);
              setRecord({})
              setOpenDrawer(true);
            }}
            size="small"
          />
        ]}
      />
      <Row gutter={[19, 10]}
        style={{
          marginTop: 23, marginBottom: 13, flexWrap: 'flex'
        }}>
        <Col>
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('thr_subject', searchText);
              }}
              size="420px"
            />
          </div>
        </Col>
        <Col>
          <div style={{ marginRight: 20 }}>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={thr_showing}
              onChange={e => {
                handleChange('thr_showing', e.key);
              }}
            />
          </div>
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={registerList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={registerList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Threat Value`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ThreatValueFormDrawer
          isVisible={openDrawer}
          isCreate={isCreate}
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  registerList: state.administration.riskManagement,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(riskManagementThreatValueList(payload)),
  updateList: (...payload) => dispatch(updateRiskManagementThreatValue(...payload)),
  deleteList: payload => dispatch(deleteRiskManagementThreatValue(payload)),
  createList: (...payload) => dispatch(createRiskManagementThreatValue(...payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatValue);
