import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  createAutomationVendorsList,
  automationVendorsList,
  deleteAutomationVendorsList,
  updateAutomationVendorsList,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import VendorFormDrawer from './vendorsForm';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';

const ControlRegister = ({
  getList,
  vendorsList,
  updateList,
  deleteList,
  createList,
  userProfile,
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
  const { confirm } = Modal


  const {
    apv_showing = '20',
    apv_page_no = 1,
    apv_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(apv_showing);
  const [searchText, setSearchText] = useState(apv_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        deleteList({ id: key, query: myQuery });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    getVendorList();
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

  useEffect(() => {
    if (vendorsList?.listData?._meta) {
      setTotalCount(vendorsList.listData._meta.totalCount);
      setCurrentPage(vendorsList.listData._meta.currentPage);
    }
  }, [vendorsList]);

  const columns = [
    {
      title: '#',
      dataIndex: 'apv_id',
      editable: false,
      key: (text, record, index) => record?.apv_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'apv_name',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.apv_id,
      render: (text, record, index) => record?.apv_name,
      width: '45%',
    },
    {
      title: 'URL',
      dataIndex: 'apv_url',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.apv_id,
      render: (text, record, index) => record?.apv_url,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'apv_id',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-application-product-vendors"))){
          const updateApplicationVendors= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setIsCreate(false)
              setOpenDrawer(true);
            },
          };
          moreItems.push(updateApplicationVendors);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-application-product-vendors"))){
          const deleteApplicationVendors= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.apv_id)
          };
          moreItems.push(deleteApplicationVendors);
        }

        if (userProfile?.usr_api_organization === record?.apv_organization && moreItems.length !== 0) {
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

  const getVendorList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    getList({ queryItem: myArrayQry, path });
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
      if (parsedQuery.apv_page_no) {
        queryObject.payload.page = parsedQuery.apv_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.apv_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.apv_subject;
      }
      if (parsedQuery.apv_showing) {
        queryObject.payload['per-page'] = parsedQuery.apv_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry +=
            'ApplicationProductVendorsSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ApplicationProductVendorsSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('apv_page_no', pageNumber);
    window.scrollTo(0, 0);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
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
      if (name == 'apv_showing') {
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

  const handleSubmit = values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record.apv_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    setIsCreate(false);
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Automation Vendors'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-application-product-vendors"))) &&
          <SPButton
            title="Create Product Vendor"
            onButtonClick={() => {
              setIsCreate(true);
              setRecord({})
              setOpenDrawer(true);
            }}
            size="small"
            image={<PlusIcon />}
          />
        ]}
      />
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
            placeholder="Search.."
            onEnter={() => {
              handleChange('apv_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={apv_showing}
            onChange={e => {
              handleChange('apv_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={vendorsList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        handleTableChange={handleTableChange}
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={vendorsList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Vendor`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <VendorFormDrawer
          isVisible={openDrawer}
          recordValue={record}
          isCreate={isCreate}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  vendorsList: state.administration.automation,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationVendorsList(payload)),
  updateList: payload => dispatch(updateAutomationVendorsList(payload)),
  deleteList: payload => dispatch(deleteAutomationVendorsList(payload)),
  createList: payload => dispatch(createAutomationVendorsList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ControlRegister);
