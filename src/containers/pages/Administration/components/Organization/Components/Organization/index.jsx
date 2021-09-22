import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
  getOrganizationList,
  deleteOraganization,
  createOraganization,
  updateOraganization,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
const { confirm } = Modal;
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import CreateOrg from './Components/CreateOrg';
import EditOrg from './Components/EditOrg';
import { showingFilter } from '../../../../constant';
import PageHeader from '../../../../../../layout/pageHeader';
const Organization = ({
  oraganizationStoreAction,
  organizationList,
  organizationStore,
  onDeleteOraganizataion,
  onUpdateOrg,
  onCreateOrg,
  access,
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [orgDataList, setorgDataList] = useState([]);
  const [showCreateOrg, setshowCreateOrg] = useState(false);
  const [showEditOrg, setshowEditOrg] = useState(false);
  const [record, setRecord] = useState({});

  const [query, setQuery] = useState(location.search);

  const {
    org_showing = '20',
    org_page_no = 1,
    org_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push(
      '/administration?' + qs
    );
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(org_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        onDeleteOraganizataion(key, myQuery);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const onOpenCreateModal = () => {
    setshowCreateOrg(true);
  };
  const onCloseCreateModal = () => {
    setshowCreateOrg(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'org_id',
      editable: false,
      key: (text, record, index) => record?.org_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'org_name',
      editable: false,
      sorter: true,
      width: 354,
    },
    {
      title: 'Active Date',
      dataIndex: 'org_active_date',
      sorter: true,
      editable: false,
    },
    {
      title: 'De-active Date',
      dataIndex: 'org_deactive_date',
      sorter: true,
      editable: false,
    },
    {
      title: 'Status',
      dataIndex: 'org_status',
      sorter: true,
      editable: false,
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-organizations"))) {

          const editOrganization = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setshowEditOrg(true);
            },
          };
          moreItems.push(editOrganization);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-organizations"))) {

          const deleteOrganization = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin/>,
            onClickItem: () => {
              showConfirm(record?.org_id);
            },
          };
          moreItems.push(deleteOrganization);
        }
       if(moreItems.length !== 0){
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
        OrganizationsSearch: {},
        QueryString: '',
      };
      if (parsedQuery.org_subject) {
        queryObject.OrganizationsSearch.search = parsedQuery.org_subject;
      }
      if (parsedQuery.org_page_no) {
        queryObject.payload.page = parsedQuery.org_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.org_showing) {
        queryObject.payload['per-page'] = parsedQuery.org_showing;
      }
      const { OrganizationsSearch } = queryObject;
      if (Object.keys(OrganizationsSearch).length !== 0) {
        Object.entries(OrganizationsSearch).forEach(([key, val]) => {
          myArrayQry += 'OrganizationsSearch[' + key + ']=' + val + '&';
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
    oraganizationStoreAction({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (organizationList) {
      if (Object.keys(organizationList).length !== 0) {
        setorgDataList(organizationList.data.items);
        setTotalCount(organizationList.data._meta.totalCount);
        setCurrentPage(organizationList.data._meta.currentPage);
      }
    }
  }, [organizationList]);

  useEffect(() => {
    const queryObject = {
      org_subject: org_subject,
      ...(org_showing !== '20' && { org_showing: org_showing }),
      ...(org_page_no !== 1 && { org_page_no: org_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(org_showing);
  }, [searchText, org_showing, org_page_no]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      if (name == 'org_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const onPageChange = pageNumber => {
    handleChange('org_page_no', pageNumber);
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
  const onUpdateOraganizationHandler = (id, data) => {
    const myQuery = mapQueryWithApi(query);
    onUpdateOrg(id, data, myQuery);
    setshowEditOrg(false);
  };
  const onCreateOraganizationHandler = data => {
    const myQuery = mapQueryWithApi(query);
    onCreateOrg(data, myQuery);
    onCloseCreateModal();
  };

  return (
    <>
      <PageHeader
        title={"Organization"}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-organizations"))) ?
          <SPButton
            title="Create Organization"
            onButtonClick={onOpenCreateModal}
            size="small"
            image={<PlusIcon />}
          /> : '',
        ]}
      />
      <SPDrawer
        title={`Create Organization`}
        isVisible={showCreateOrg}
        onClose={() => {
          setshowCreateOrg(false);
        }}
      >
        <CreateOrg
          onClose={onCloseCreateModal}
          isVisible={showCreateOrg}
          onCreateHandler={onCreateOraganizationHandler}
        />
      </SPDrawer>
      <SPDrawer
        title={`Update Organization`}
        isVisible={showEditOrg}
        onClose={() => {
          setshowEditOrg(false);
        }}
      >
        <EditOrg
          isVisible={showEditOrg}
          selectedRecord={record}
          onUpdateOraganization={onUpdateOraganizationHandler}
          onClose={() => setshowEditOrg(false)}
        />
      </SPDrawer>
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
            onEnter={() => {
              handleChange('org_subject', searchText);
            }}
            size="420px"
          />

        </Col>
        <SPSelect
          title="Showing"
          items={showingFilter}
          selected={org_showing || 20}
          onChange={e => {
            handleChange('org_showing', e.key);
          }}
        />
        <Col>
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={orgDataList}
        onPageChange={onPageChange}
        canPaginate
        isLoading={organizationStore.loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * org_showing + 1
        }
        showingTill={org_showing}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    organizationStore: state.administration.organization,
    organizationList: state.administration.organization.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  oraganizationStoreAction: data => {
    dispatch(getOrganizationList(data));
  },
  onDeleteOraganizataion: (...arg) => {
    dispatch(deleteOraganization(...arg));
  },
  onUpdateOrg: (...arg) => dispatch(updateOraganization(...arg)),
  onCreateOrg: (...arg) => dispatch(createOraganization(...arg)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(Organization);
