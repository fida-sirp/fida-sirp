import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import {
  administratorCasesSubCategoriesList,
  administratorCasesSubCategoryCreate,
  administratorSubCasesCategoryDelete,
  administratorSubCasesCategoryUpdate
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
import SubcategorySidebar from './Components/SubcategorySidebar';
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
const SubCategory = ({
  onGetCasesSubCategoryList,
  caseSubCategoryList,
  loading,
  onUpdateSubCategoryAction,
  onCreateSubCategoryAction,
  onDeleteSubCategoryAction,
  userProfile,
  access
}) => {
  const [showCreateDrawer, setshowCreateDrawer] = useState(false);
  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [showEditSidebar, setshowEditSidebar] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [casesSubCategoryList, setSubCasesCategory] = useState([]);
  const [record, setRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [query, setQuery] = useState(location.search);
  const history = useHistory();
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  const {
    msc_showing = '20',
    msc_page_no = 1,
    msc_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(msc_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query)
        onDeleteSubCategoryAction(key, myQuery);
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
        IncidentSubcategoriesSearch: {},
        QueryString: '',
      };
      if (parsedQuery.msc_subject) {
        queryObject.IncidentSubcategoriesSearch.search = parsedQuery.msc_subject;
      }
      if (parsedQuery.msc_page_no) {
        queryObject.payload.page = parsedQuery.msc_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.msc_showing) {
        queryObject.payload['per-page'] = parsedQuery.msc_showing;
      }
      const { IncidentSubcategoriesSearch } = queryObject;
      if (Object.keys(IncidentSubcategoriesSearch).length !== 0) {
        Object.entries(IncidentSubcategoriesSearch).forEach(([key, val]) => {
          myArrayQry += 'IncidentSubcategoriesSearch[' + key + ']=' + val + '&';
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
    onGetCasesSubCategoryList({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (caseSubCategoryList) {
      if (Object.keys(caseSubCategoryList).length !== 0) {
        setSubCasesCategory(caseSubCategoryList?.items);
        setTotalCount(caseSubCategoryList?._meta.totalCount);
        setCurrentPage(caseSubCategoryList?._meta.currentPage);
      }
    }
  }, [caseSubCategoryList]);
  useEffect(() => {
    const queryObject = {
      msc_subject: msc_subject,
      ...(msc_showing !== '20' && { msc_showing: msc_showing }),
      ...(msc_page_no !== 1 && { msc_page_no: msc_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(msc_showing);
  }, [searchText, msc_showing, msc_page_no]);
  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };
  const onPageChange = pageNumber => {
    handleChange('msc_page_no', pageNumber);
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
      dataIndex: 'msc_id',
      editable: false,
      key: (text, record, index) => record?.ica_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'msc_name',
      editable: false,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Primary Category',
      dataIndex: 'msc_main_category',
      editable: false,
      sorter: true,
      width: '45%',
      render: (text, record, i) => record?.mscMainCategory?.ica_name
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {


        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-subcategories"))){
          const updateSubCategory = {
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
          moreItems.push(updateSubCategory);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-subcategories"))){
          const deleteSubCategory =  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.msc_id);
            },
          };
          moreItems.push(deleteSubCategory);
        }


        if(userProfile?.usr_api_organization === record?.msc_organization  && moreItems.length !== 0 ) {
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

  const onUpdateSubCategory = (id, data) => {
    const myQuery = mapQueryWithApi(query)
    onUpdateSubCategoryAction(id, data, myQuery)
    setShowUpdateDrawer(false)
  }
  const onCreateSubCategory = (data) => {
    const myQuery = mapQueryWithApi(query)
    onCreateSubCategoryAction(data, myQuery)
    setshowCreateDrawer(false)
  }
  return (
    <>
      <PageHeader
        title="Sub Category"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-subcategories"))) &&
          <SPButton
            onButtonClick={() => setshowCreateDrawer(true)}
            title="Create Subcategory"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPDrawer
        title="Create Sub Category"
        drawerWidth={700}
        isVisible={showCreateDrawer}
        onClose={() => setshowCreateDrawer(false)}
      >
        <SubcategorySidebar type="create" isVisible={showCreateDrawer} onCreateHandler={onCreateSubCategory} />
      </SPDrawer>
      <SPDrawer
        drawerWidth={700}
        title="Update Sub Category"
        isVisible={showUpdateDrawer}
        onClose={() => setShowUpdateDrawer(false)}
      >
        <SubcategorySidebar type="edit" isVisible={showUpdateDrawer} onUpdateHandler={onUpdateSubCategory} selectedRecord={record} />
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
                handleChange('msc_subject', searchText);
              }}
              size="420px"
            />
          </Col>
          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={msc_showing || 20}
              onChange={e => {
                handleChange('msc_showing', e.key);
              }}
            />
          </Col>
        </Row>
        <SPTable
          columns={columns}
          dataSource={casesSubCategoryList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          isLoading={loading}
          showingTill={msc_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1 ? currentPage : (currentPage - 1) * msc_showing + 1
          }
          currentPage={currentPage}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
    caseSubCategoryList: state.administration.casesSubCategoriesList.listData,
    loading: state.administration.casesSubCategoriesList.loading
  };
};

const mapDispatchToProps = dispatch => ({
  onGetCasesSubCategoryList: (...args) => dispatch(administratorCasesSubCategoriesList(...args)),
  onUpdateSubCategoryAction: (...args) => dispatch(administratorSubCasesCategoryUpdate(...args)),
  onCreateSubCategoryAction: (...args) => dispatch(administratorCasesSubCategoryCreate(...args)),
  onDeleteSubCategoryAction: (...args) => dispatch(administratorSubCasesCategoryDelete(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(SubCategory);
