import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import {
  administratorCasesLocationList,
  administratorLocationDelete,
  administratorLocationUpdate,
  administratorLocationCreate
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
import LocationSidebar from './Components/LocationSidebar';
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
const SubCategory = ({ onGetCasesLocations, casesLocationsList, loading, onDeleteLocation, onUpdateLocation, onCreateLocation, userProfile, access }) => {
  const [showCreateDrawer, setshowCreateDrawer] = useState(false);
  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [showEditSidebar, setshowEditSidebar] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [locationListItem, setLocationsListItem] = useState([]);
  const [record, setRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [query, setQuery] = useState(location.search);
  const history = useHistory();
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );


  const {
    loc_showing = '20',
    loc_page_no = 1,
    loc_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(loc_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query)
        onDeleteLocation(key, myQuery);
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
        LocationSearch: {},
        QueryString: '',
      };
      if (parsedQuery.loc_subject) {
        queryObject.LocationSearch.search = parsedQuery.loc_subject;
      }
      if (parsedQuery.loc_page_no) {
        queryObject.payload.page = parsedQuery.loc_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.loc_showing) {
        queryObject.payload['per-page'] = parsedQuery.loc_showing;
      }
      const { LocationSearch } = queryObject;
      if (Object.keys(LocationSearch).length !== 0) {
        Object.entries(LocationSearch).forEach(([key, val]) => {
          myArrayQry += 'LocationSearch[' + key + ']=' + val + '&';
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
    onGetCasesLocations({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (casesLocationsList) {
      if (Object.keys(casesLocationsList).length !== 0) {
        setLocationsListItem(casesLocationsList?.items);
        setTotalCount(casesLocationsList?._meta.totalCount);
        setCurrentPage(casesLocationsList?._meta.currentPage);
      }
    }
  }, [casesLocationsList]);
  useEffect(() => {
    const queryObject = {
      loc_subject: loc_subject,
      ...(loc_showing !== '20' && { loc_showing: loc_showing }),
      ...(loc_page_no !== 1 && { loc_page_no: loc_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(loc_showing);
  }, [searchText, loc_showing, loc_page_no]);
  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };
  const onPageChange = pageNumber => {
    handleChange('loc_page_no', pageNumber);
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
      dataIndex: 'loc_id',
      editable: false,
      key: (text, record, index) => record?.ica_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'loc_name',
      editable: false,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Description',
      dataIndex: 'loc_desc',
      sorter: true,
      editable: false,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-locations"))){
          const updateLocation=  {
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
          moreItems.push(updateLocation);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-locations"))){
          const deleteLocation=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.loc_id);
            },
          };
          moreItems.push(deleteLocation);
        }


        if (userProfile?.usr_organization === record?.loc_organization && moreItems.length !== 0) {
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
    onUpdateLocation(id, data, myQuery)
    setShowUpdateDrawer(false)
  }
  const onCreateSubCategory = (data) => {
    const myQuery = mapQueryWithApi(query)
    onCreateLocation(data, myQuery)
    setshowCreateDrawer(false)
  }
  return (
    <>
      <PageHeader
        title="Location"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-locations"))) &&
          <SPButton
            onButtonClick={() => setshowCreateDrawer(true)}
            title="Create Location"
            size="small"
          />
        ]}
      />
      <SPDrawer
        title="Create Location"
        drawerWidth={700}
        isVisible={showCreateDrawer}
        onClose={() => setshowCreateDrawer(false)}
      >
        <LocationSidebar type="create" isVisible={showCreateDrawer} onCreateHandler={onCreateSubCategory} />
      </SPDrawer>
      <SPDrawer
        drawerWidth={700}
        title="Update Location"
        isVisible={showUpdateDrawer}
        onClose={() => setShowUpdateDrawer(false)}
      >
        <LocationSidebar type="edit" isVisible={showUpdateDrawer} onUpdateHandler={onUpdateSubCategory} selectedRecord={record} />
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
                handleChange('loc_subject', searchText);
              }}
              size="420px"
            />
          </Col>
          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={loc_showing || 20}
              onChange={e => {
                handleChange('loc_showing', e.key);
              }}
            />
          </Col>
        </Row>

        <SPTable
          columns={columns}
          dataSource={locationListItem}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          isLoading={loading}
          showingTill={loc_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1 ? currentPage : (currentPage - 1) * loc_showing + 1
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
    casesLocationsList: state.administration?.locationsList?.listData,
    loading: state.administration.locationsList.loading
  };
};

const mapDispatchToProps = dispatch => ({
  onGetCasesLocations: (...args) => dispatch(administratorCasesLocationList(...args)),
  onDeleteLocation: (...args) => dispatch(administratorLocationDelete(...args)),
  onUpdateLocation: (...args) => dispatch(administratorLocationUpdate(...args)),
  onCreateLocation: (...args) => dispatch(administratorLocationCreate(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(SubCategory);
