import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  automationActionIOList,
  createAutomationActionIO,
  automationActionIOValidation,
  updateAutomationActionIO,
  deleteAutomationActionIO,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { isEmpty } from 'lodash';
import ActionIOFormDrawer from './actionIOForm';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import PageHeader from '../../../../../layout/pageHeader';
import { Modal } from 'antd';
const { confirm } = Modal


const ActionIO = ({
  getList,
  publishersList,
  updateList,
  deleteList,
  createList,
  validationList,
  validationValueList,
  getValidationList,
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
  const [formattedValidationList, setFormattedValidationList] = useState({});
  const { path } = useParams();

  const {
    aio_showing = '20',
    page = 1,
    aio_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(aio_showing);
  const [searchText, setSearchText] = useState(aio_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
    getValidationList();
  }, [query] || []);

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
    const arr = [];
    if (!isEmpty(validationValueList)) {
      Object.entries(validationValueList?.[0]).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setFormattedValidationList(arr);
  }, [validationValueList]);
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
    if (publishersList?.listData?._meta) {
      setTotalCount(publishersList.listData._meta.totalCount);
      setCurrentPage(publishersList.listData._meta.currentPage);
    }
  }, [publishersList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'aio_id',
      editable: false,
      key: (text, record, index) => record?.aio_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Type',
      dataIndex: 'aio_type',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.aio_id,
      render: (text, record, index) => record?.aio_type,
    },
    {
      title: 'Artifact',
      dataIndex: 'aio_artifact_name',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.aio_id,
      render: (text, record, index) => record?.aio_artifact_name,
    },
    {
      title: 'Validation',
      dataIndex: 'aio_validation',
      sorter: true,
      editable: false,
      key: (text, record, index) => record?.aio_id,
      render: (text, record, index) => record?.aio_validation,
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-application-action-io-types"))){
          const updateApplicationActionIO= {
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
          moreItems.push(updateApplicationActionIO);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-application-action-io-types"))){
          const updateApplicationActionIO=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.aio_id)
          };
          moreItems.push(updateApplicationActionIO);
        }

        if (userProfile?.usr_api_organization === record?.aio_organization && moreItems.length !== 0) {
          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        }
      },
    }
  ];

  const getPublisherList = async () => {
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
      if (parsedQuery.page) {
        queryObject.payload.page = parsedQuery.page;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.aio_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.aio_subject;
      }
      if (parsedQuery.aio_showing) {
        queryObject.payload['per-page'] = parsedQuery.aio_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry +=
            'ApplicationActionIoTypesSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ApplicationActionIoTypesSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('page', pageNumber);
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
      if (name == 'aio_showing') {
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

  const handleSubmit = async values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record?.aio_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Action IO Types'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("delete-application-action-io-types"))) &&
          <SPButton
            title="Create Action I/O Types"
            onButtonClick={() => {
              setRecord({})
              setIsCreate(true);
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
              handleChange('aio_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={aio_showing}
            onChange={e => {
              handleChange('aio_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        handleTableChange={handleTableChange}
        dataSource={publishersList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={publishersList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Action I/O Types`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ActionIOFormDrawer
          isCreate={isCreate}
          isVisible={openDrawer}
          recordValue={record}
          submit={handleSubmit}
          validationList={formattedValidationList}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  publishersList: state.administration.automation,
  validationValueList: state.administration.automation.validationList,
});

const mapDispatchToProps = dispatch => ({
  getValidationList: () => dispatch(automationActionIOValidation()),
  getList: payload => dispatch(automationActionIOList(payload)),
  updateList: payload => dispatch(updateAutomationActionIO(payload)),
  deleteList: payload => dispatch(deleteAutomationActionIO(payload)),
  createList: payload => dispatch(createAutomationActionIO(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ActionIO);
