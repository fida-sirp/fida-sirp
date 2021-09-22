import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  productsRegisterList,
  productsRegisterDeleteList,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { showingFilter } from '../../../constant';
import { isEmpty } from 'lodash';
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const FailedRegistration = ({ getList, productsList, deleteList, userProfile,access }) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    perPage = '20',
    pageNo = 1,
    subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Threat Intelligence?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      async onOk() {
        await deleteList({ id: key });
      },
      onCancel() { },
    });
  }


  useEffect(() => {
    getRegisterList();
  }, [query] || []);

  useEffect(() => {
    if (productsList?.listData?._meta) {
      setTotalCount(productsList.listData._meta.totalCount);
      setCurrentPage(productsList.listData._meta.currentPage);
    }
  }, [productsList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);

  const columns = [
    {
      title: '#',
      dataIndex: 'ufr_id',
      editable: false,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'ufr_name',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => record?.ufr_name,
    },
    {
      title: 'Email',
      dataIndex: 'ufr_email',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => record?.ufr_email,
    },
    {
      title: 'Phone',
      dataIndex: 'ufr_phone',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => record?.ufr_phone,
    },
    {
      title: 'Organization',
      dataIndex: 'ufr_organization',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => record?.ufr_organization,
    },
    {
      title: 'Created',
      dataIndex: 'ufr_created_at',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ufr_id,
      render: (text, record, index) => record?.ufr_created_at,
    },
    {
      title: 'Actions',
      dataIndex: 'ufr_id',
      editable: false,
      render: (text, record, index) => {
        if (access!==undefined && (access.includes("all-super-admin") || access.includes("delete-failed-registration"))){
          return (
            <SPSingleSelectDropdown
              items={[
                {
                  key: 'delete',
                  label: 'Delete',
                  icon: <Dustbin />,
                  onClickItem: () => {showConfirm(record?.ufr_id)},
                }
              ]}
              onSelect={() => { }}
              title="more"
            />
          );
        }

      },
    },
  ];

  const getRegisterList = async () => {
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
      if (parsedQuery.subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UsersFailedRegistrationSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'UsersFailedRegistrationSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('pageNo', pageNumber);
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

  return (
    <>
      <PageHeader title="Failed Registrations" />
      <Row gutter={[19, 25]}>
        <Col
          span={12}
          style={{ display: "inherit" }}
        >
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('subject', searchText);
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
        handleTableChange={handleTableChange}
        dataSource={productsList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={productsList?.isProcessing}
      />
    </>
  );
};

const mapStateToProps = state => ({
  productsList: state.administration.productsList,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(productsRegisterList(payload)),
  deleteList: payload => dispatch(productsRegisterDeleteList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(FailedRegistration);
