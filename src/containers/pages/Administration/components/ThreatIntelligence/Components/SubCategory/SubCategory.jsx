import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import {
  threatIntelSubCategoryList,
  deletethreatIntelSubCategory,
  threatIntelSeverityList,
  threatIntelPrimaryCategoryList,
  createthreatIntelSubCategoryList,
  updatethreatIntelSubCategory,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../../components/SPTable';
import { DeleteBox } from '../../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPButton from '../../../../../../../components/SPButton';
import SPSearch from '../../../../../../../components/SPSearch';
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../../components/SPSelect';
import { showingFilter } from '../../../../constant';
import { isEmpty } from 'lodash-es';
import SubCategoryFormDrawer from './SubCategoryForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import PageHeader from '../../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';

const SubCategory = ({
  onGetList,
  categoryList,
  updateList,
  deleteList,
  createList,
  getSeverityList,
  getPrimaryCategoryList,
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

  const {
    tca_showing = '20',
    tca_page_no = 1,
    tca_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(tca_showing);
  const [searchText, setSearchText] = useState(tca_subject);
  const [severityList, setSeverityList] = useState([]);
  const [primaryCategoryList, setPrimaryCategoryList] = useState([]);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useState(() => {
    getSeverityList();
    getPrimaryCategoryList();
  }, []);
  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetList({ queryItem: myArrayQry, path });
    // onGetWorkflowList();
  }, [query] || []);

  useEffect(() => {
    if (categoryList?.listData?.data) {
      setTotalCount(categoryList?.listData?._meta?.totalCount);
      setCurrentPage(categoryList?.listData?._meta?.currentPage);
    }
    if (categoryList?.severityList) {
      if (!isEmpty(categoryList.severityList)) {
        const arr = [];
        Object.entries(categoryList.severityList[0]).map(
          ([key, value], index) =>
            arr.push({
              key: key,
              value: key,
              label: value,
            })
        );
        setSeverityList(arr);
      }
    }
    if (categoryList?.categoryList) {
      if (!isEmpty(categoryList.categoryList)) {
        const arr = [];
        Object.entries(categoryList.categoryList).map(([key, value], index) =>
          arr.push({
            key: key,
            value: key,
            label: value,
          })
        );
        setPrimaryCategoryList(arr);
      }
    }
  }, [categoryList]);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete Sub Category?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteList({ id: key });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

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
      dataIndex: 'ads_id',
      dataIndex1: 'ads_id',
      editable: false,
      key: (text, record, index) => record?.ads_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'ads_name',
      dataIndex1: 'ads_name',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ads_id,
      render: (text, record, index) => record?.ads_name,
      width: '45%',
    },
    {
      title: 'Primary Category',
      dataIndex: 'ads_main_category',
      dataIndex1: 'ads_main_category',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.ads_id,
      render: (text, record, index) =>
        handlePrimaryCategoryView(record?.ads_main_category),
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'ads_id',
      dataIndex1: 'ads_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-advisory-subcategories"))){
          const updateAdvisorySubcategories={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setIsCreate(false)
              setRecord(record);
            },
          };
          moreItems.push(updateAdvisorySubcategories);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-advisory-subcategories"))){
          const updateAdvisorySubcategories= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.ads_id);
            },
          };
          moreItems.push(updateAdvisorySubcategories);
        }

        if (userProfile?.usr_api_organization === record?.ads_organization  && moreItems.length !== 0) {
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

  const handlePrimaryCategoryView = index => {
    return primaryCategoryList.map(data => {
      if (data.key == index) return data.label;
    });
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
          myArrayQry += 'VulnerabilitiesListSearch[' + key + ']=' + val + '&';
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
        '/administration?active_tab=vulnerability_management&' +
        activeOption +
        '?' +
        qs
      );
    } else {
      history.push('/administration?active_tab=vulnerability_management&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    if (!isCreate) {
      let payload = {
        values,
        id: record.ads_id,
      };
      await updateList(payload);
    } else await createList({ payload: values });
    await setOpenDrawer(false);
    await setIsCreate(false);
    await setRecord({});
  };

  return (
    <>
      <PageHeader
        title="SubCategory"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-advisory-subcategories"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title="Create SubCategory"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPTable
        columns={columns}
        dataSource={categoryList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        handleTableChange={handleTableChange}
        isLoading={categoryList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} SubCategory`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <SubCategoryFormDrawer
          isVisible={openDrawer}
          isCreate={isCreate}
          recordValue={record}
          severityList={severityList}
          primaryCategoryList={primaryCategoryList}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  categoryList: state.administration.threatIntellList,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getSeverityList: payload => dispatch(threatIntelSeverityList(payload)),
  getPrimaryCategoryList: payload =>
    dispatch(threatIntelPrimaryCategoryList(payload)),
  onGetList: payload => dispatch(threatIntelSubCategoryList(payload)),
  updateList: payload => dispatch(updatethreatIntelSubCategory(payload)),
  deleteList: payload => dispatch(deletethreatIntelSubCategory(payload)),
  createList: payload => dispatch(createthreatIntelSubCategoryList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(SubCategory);
