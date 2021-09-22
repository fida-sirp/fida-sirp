import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  updateRiskManagementBusinessImpact,
  riskManagementBusinessImpactList,
  deleteRiskManagementBusinessImpact,
  createRiskManagementBusinessImpact,
  RiskManagementBusinessImpactChangeTitle,
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
import BusinessImpactFormDrawer from './businessImpactForm';
import BusinessImpactChangeTitleFormDrawer from './impactChangeTitle';
import { Label } from '../../../../../../components/InputBox/StyledComponents';
import PageHeader from '../../../../../layout/pageHeader';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const BusinessImpact = ({
  userProfile,
  getList,
  impactList,
  updateList,
  deleteList,
  createList,
  changeTitle,
  businessImpactHeadingData,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [titleDrawer, setTitleDrawer] = useState(false);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    rbi_showing = '20',
    rbi_page_no = 1,
    rbi_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(rbi_showing);
  const [searchText, setSearchText] = useState(rbi_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  console.log('>>>>>> businessImpactHeadingData: ', {businessImpactHeadingData});
  

  useEffect(() => {
    getImpactList();
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

  const getImpactList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    if (impactList?.listData?._meta) {
      setTotalCount(impactList.listData._meta.totalCount);
      setCurrentPage(impactList.listData._meta.currentPage);
    }
  }, [impactList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'rbi_id',
      editable: false,
      // key: (text, record, index) => record?.rbi_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'rbi_name',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.rbi_id,
      render: (text, record, index) => record?.rbi_name,
      width: '45%',
    },
    {
      title: 'Value',
      dataIndex: 'rbi_value',
      editable: false,
      sorter: true,
      // key: (text, record, index) => record?.rbi_id,
      render: (text, record, index) => record.rbi_value,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'rbi_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-risk-business-impact"))){
          const updateBusinessImpact= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setIsCreate(false);
              setRecord(record);
            },

          };
          moreItems.push(updateBusinessImpact);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-risk-business-impact"))){
          const deleteBusinessImpact= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.rbi_id),
          };
          moreItems.push(deleteBusinessImpact);
        }

        if(userProfile?.usr_api_organization === record?.rbi_organization && moreItems.length !==0 ) {
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
      if (parsedQuery.rbi_page_no) {
        queryObject.payload.page = parsedQuery.rbi_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.rbi_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.rbi_subject;
      }
      if (parsedQuery.rbi_showing) {
        queryObject.payload['per-page'] = parsedQuery.rbi_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ImpactSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ImpactSearch[search]=' + searchText;
    }

    return myArrayQry;
  }



  function showConfirm(key) {
    confirm({
        title: 'Are you sure you want to delete the case?',
        centered: true,
        icon: <ExclamationCircleOutlined />,
        onOk() {
          const myArrayQry = mapQueryWithApi(query);
             deleteList(key, myArrayQry);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

  const onPageChange = pageNumber => {
    handleChange('rbi_page_no', pageNumber);
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
      if (name == 'rbi_showing') {
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

  const handleSubmit =  values => {
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
       updateList(values, record.rbi_id, myArrayQry );
    } else createList(values, myArrayQry);
     setOpenDrawer(false);
     setRecord({});
  };

  const handleChangeTitleSubmit = async values => {
    await changeTitle(values);
    setTitleDrawer(false);
  };
  return (
    <>
      <PageHeader
        title={businessImpactHeadingData?.rbi_label}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-risk-business-impact"))) &&
          <SPButton
              title={`Create ${businessImpactHeadingData?.rbi_label}`}
              onButtonClick={async () => {
                setIsCreate(true);
                setOpenDrawer(true);
              }}
              size="small"
            />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("change-title-risk-business-impact"))) &&
              <SPButton
              title="Change Title"
              onButtonClick={async () => {
                setTitleDrawer(true);
              }}
              size="small"
            />
        ]}
      />
   
      <SPTable
        columns={columns}
        dataSource={impactList?.listData?.items}
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
        isLoading={impactList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Control`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <BusinessImpactFormDrawer
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
      <SPDrawer
        title={`Change Title`}
        isVisible={titleDrawer}
        onClose={() => setTitleDrawer(false)}
      >
        <BusinessImpactChangeTitleFormDrawer
          recordValue={businessImpactHeadingData}
          submit={handleChangeTitleSubmit}
          closeDrawer={() => setTitleDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  impactList: state.administration.riskManagement,
  businessImpactHeadingData: state.administration?.allTabsHeading?.listData?.businessImpact,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(riskManagementBusinessImpactList(payload)),
  updateList: (...payload) => dispatch(updateRiskManagementBusinessImpact(...payload)),
  deleteList: (...payload) => dispatch(deleteRiskManagementBusinessImpact(...payload)),
  createList: (...payload) => dispatch(createRiskManagementBusinessImpact(...payload)),
  changeTitle: payload =>
    dispatch(RiskManagementBusinessImpactChangeTitle(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(BusinessImpact);
