import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
import {
  getCategoryList,
  updateCategoryList,
  deleteCategoryList,
  createCategoryList,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import CategoriesFormDrawer from './CategoriesForm';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { showingFilter } from '../../../constant';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';

const Categories = ({
  onGetCategoryList,
  workflowCategory,
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
    tca_showing = '20',
    tca_page_no = 1,
    tca_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(tca_showing);
  const [searchText, setSearchText] = useState(tca_subject);
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
    const myArrayQry = mapQueryWithApi(query);
    onGetCategoryList({ queryItem: myArrayQry, path });
  }, [query] || []);

  useEffect(() => {
    if (workflowCategory?.listData?.items) {
      setTotalCount(workflowCategory.listData._meta.totalCount);
      setCurrentPage(workflowCategory.listData._meta.currentPage);
    }
  }, [workflowCategory]);
  const columns = [
    {
      title: '#',
      dataIndex: 'tca_id',
      editable: false,
      key: (text, record, index) => record?.wkf_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'tca_name',
      sorter: true,
      width: '90%',
      render: (text, record, index) => record?.tca_name,
    },
    {
      title: 'Actions',
      dataIndex: 'tca_id',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-task-categories"))){
          const updateTaskCategories=     {
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
          moreItems.push(updateTaskCategories);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-task-categories"))){
          const deleteTaskCategories= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.tca_id);
            },
          };
          moreItems.push(deleteTaskCategories);
        }

        if (userProfile?.usr_api_organization === record?.tca_organization && moreItems.length !== 0) {
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

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.tca_page_no) {
        queryObject.payload.page = parsedQuery.tca_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.tca_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.tca_subject;
      }
      if (parsedQuery.tca_showing) {
        queryObject.payload['per-page'] = parsedQuery.tca_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'TaskCategoriesSearch[' + key + ']=' + val + '&';
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

  const onPageChange = pageNumber => {
    handleChange('tca_page_no', pageNumber);
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
      if (name == 'tca_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=workflows&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration?active_tab=workflows&' + qs);
    }
    setQuery(qs);
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
  const handleSubmit = values => {
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
      let payload = {
        values,
        id: record.tca_id,
        query: myArrayQry
      };
      updateList(payload);
    } else {
      createList({ payload: values, query: myArrayQry });
    }
    setRecord({});
    setOpenDrawer(false);
  };
  return (
    <>
      <PageHeader
        title={'Create Category'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("delete-task-categories"))) &&
          <SPButton
            title="Create Workflow"
            onButtonClick={() => {
              setRecord({})
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            image={<PlusIcon />}
            size="small"
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
            placeholder="Search category"
            onEnter={() => {
              handleChange('tca_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={tca_showing}
            onChange={e => {
              handleChange('tca_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={workflowCategory?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        handleTableChange={handleTableChange}
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={workflowCategory?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Category`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <CategoriesFormDrawer
          isCreated={isCreate}
          isVisible={openDrawer}
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
  workflowCategory: state.administration.workflowCategory,
});

const mapDispatchToProps = dispatch => ({
  onGetCategoryList: payload => dispatch(getCategoryList(payload)),
  updateList: payload => dispatch(updateCategoryList(payload)),
  deleteList: payload => dispatch(deleteCategoryList(payload)),
  createList: payload => dispatch(createCategoryList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Categories);
