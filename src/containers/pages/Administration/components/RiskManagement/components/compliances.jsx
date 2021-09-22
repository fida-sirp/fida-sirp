import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  riskManagementComplianceList,
  deleteRiskManagementCompliance,
  createRiskManagementCompliance,
  updateRiskManagementCompliance,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import ComplianceFormDrawer from './complianceForm';
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';

const Compliance = ({
  userProfile,
  getList,
  controlList,
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
    crg_showing = '20',
    crg_page_no = 1,
    crg_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(crg_showing);
  const [searchText, setSearchText] = useState(crg_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getComplianceList();
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

  const getComplianceList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    if (controlList?.listData?._meta) {
      setTotalCount(controlList.listData._meta.totalCount);
      setCurrentPage(controlList.listData._meta.currentPage);
    }
  }, [controlList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'com_id',
      editable: false,
      // key: (text, record, index) => record?.com_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Section Number',
      dataIndex: 'com_section_number',
      editable: false,
      sorter:true,
      // key: (text, record, index) => record?.com_id,
      render: (text, record, index) => record?.com_section_number,
    },
    {
      title: 'Section',
      dataIndex: 'com_section',
      editable: false,
      sorter:true,
      // key: (text, record, index) => record?.com_id,
      render: (text, record, index) => record.com_section,
    },
    {
      title: 'Clause Number',
      dataIndex: 'com_clause_number',
      editable: false,
      sorter:true,
      // key: (text, record, index) => record?.com_id,
      render: (text, record, index) => record.com_clause_number,
    },
    {
      title: 'Clause',
      dataIndex: 'com_clause',
      editable: false,
      sorter:true,
      // key: (text, record, index) => record?.com_id,
      render: (text, record, index) => record.com_clause,
    },
    {
      title: 'Actions',
      dataIndex: 'com_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-compliance"))){
          const updateCompliance= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setIsCreate(false);
              setRecord(record);
            },

          };
          moreItems.push(updateCompliance);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-compliance"))){
          const deleteCompliance=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.com_id),
          };
          moreItems.push(deleteCompliance);
        }
        console.log(userProfile?.usr_api_organization, '===', record?.com_organization);
        if(userProfile?.usr_api_organization === record?.com_organization && moreItems.length !==0 ) {
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
      if (parsedQuery.crg_page_no) {
        queryObject.payload.page = parsedQuery.crg_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.crg_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.crg_subject;
      }
      if (parsedQuery.crg_showing) {
        queryObject.payload['per-page'] = parsedQuery.crg_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ComplianceSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ComplianceSearch[search]=' + searchText;
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

  const onPageChange = pageNumber => {
    handleChange('crg_page_no', pageNumber);
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
      if (name == 'crg_showing') {
        setShowing(value);
      }
      handleQuery(str);
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

  const handleSubmit = values => {
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
       updateList(values, record.com_id, myArrayQry );
    } else  {
      createList(values, myArrayQry );
    }
     setOpenDrawer(false);
     setRecord({});
  };
  return (
    <>
      <PageHeader
        title="Probability"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-compliance"))) &&
          <SPButton
            title="Create Compliance"
            onButtonClick={async () => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            size="small"
          />
        ]}
      />
      <Row gutter={[19, 25]}>
        <Col >
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('crg_subject', searchText);
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
              selected={crg_showing}
              onChange={e => {
                handleChange('crg_showing', e.key);
              }}
            />
          </div>

        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={controlList?.listData?.items}
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
        isLoading={controlList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Control`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ComplianceFormDrawer
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
  controlList: state.administration.riskManagement,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(riskManagementComplianceList(payload)),
  updateList: (...payload) => dispatch(updateRiskManagementCompliance(...payload)),
  deleteList: (...payload) => dispatch(deleteRiskManagementCompliance(...payload)),
  createList: (...payload) => dispatch(createRiskManagementCompliance(...payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Compliance);
