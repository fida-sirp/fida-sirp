import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { logsAuthenticateList } from '../../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../../components/SPTable';
import SPSearch from '../../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../../components/SPSelect';
import { showingFilter } from '../../../../constant';
import SPRiskTag from '../../../../../../../components/SPRiskTag';
import PageHeader from '../../../../../../layout/pageHeader';

const AuthenticationLogs = ({ getList, logsList }) => {
  const history = useHistory();
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const { log_showing = '20', log_subject, sort = undefined } = queryString.parse(query);

  const [showing, setShowing] = useState(log_showing);
  const [searchText, setSearchText] = useState(log_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    if (logsList?.listData?._meta) {
      setTotalCount(logsList.listData._meta.totalCount);
      setCurrentPage(logsList.listData._meta.currentPage);
    }
  }, [logsList]);

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  const getPublisherList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
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
      title: 'Login Time',
      dataIndex: 'ulg_id',
      editable: false,
      sorter: true,
    },
    {
      title: 'User',
      dataIndex: 'ulg_username',
      editable: false,
      sorter: true,
    },
    {
      title: 'IP Address',
      dataIndex: 'ulg_login_ip',
      editable: false,
      sorter: true,
    },
    {
      title: 'Browser',
      dataIndex: 'ulg_login_source',
      width: 500,
      editable: false,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'ulg_login_status',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ulg_id,
      render: (text, record, index) => {
        if (record.ulg_login_status === 'online') {
          return <SPRiskTag type="success" text={record.ulg_login_status} />;
        } else if (record.ulg_login_status === 'offline') {
          return <SPRiskTag type="warning" text={record.ulg_login_status} />;
        } else if (record.ulg_login_status === 'fail') {
          return <SPRiskTag type="danger" text={record.ulg_login_status} />;
        }
      },
    },
    {
      title: 'Logout Time',
      dataIndex: 'ulg_logout_at',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ulg_id,
      render: (text, record, index) => record?.ulg_logout_at || '(not set)',
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
      if (parsedQuery.log_page_no) {
        queryObject.payload.page = parsedQuery.log_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.log_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.log_subject;
      }
      if (parsedQuery.log_showing) {
        queryObject.payload['per-page'] = parsedQuery.log_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UsersLogSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'UsersLogSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      if (name == 'log_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=logs&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration?active_tab=logs&&' + qs);
    }
    setQuery(qs);
  };

  return (
    <>
      <PageHeader
        title="Authentication Logs"
      />
      <Row gutter={[19, 25]}>
        <Col span={12} style={{ display: 'flex' }} />
        <Col
          span={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ marginRight: 20 }}>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={log_showing}
              onChange={e => {
                handleChange('log_showing', e.key);
              }}
            />
          </div>
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('log_subject', searchText);
              }}
              size="420px"
            />
          </div>
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={logsList?.listData?.items}
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
        isLoading={logsList?.isProcessing}
      />
    </>
  );
};

const mapStateToProps = state => ({
  logsList: state.administration.logsList,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(logsAuthenticateList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(AuthenticationLogs);
