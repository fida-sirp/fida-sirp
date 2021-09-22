import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Modal, Button, message, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import API from '../../../config/endpoints.config';
import { isObject } from 'lodash';
import 'antd/dist/antd.css';
import './index.css';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import styled from 'styled-components';
import queryString from 'query-string';
import concat from 'lodash/concat';
import _, { isArray } from 'lodash';
import {
  listCases,
  getFilteredData,
  deleteData,
  getCategory,
  clearDeleteState
} from '../../../actions/cases';
import { listDispositions } from '../../../actions/dispositions';
import { getTaskDepartment } from '../../../actions/tasksManagement';
import { AlertBox } from './StyledComponents';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import PageHeader from '../../layout/pageHeader';
import SPButton from '../../../components/SPButton';
import SPCog from '../../../components/SPCog';
import SPSearch from '../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import SPPageFilters from '../../../components/SPPageFilters';
import SPRiskTag from '../../../components/SPRiskTag';
import SPSelect from '../../../components/SPSelect';
import SPManageFilters from '../../../components/SPManageFilters';
import SPTable from '../../../components/SPTable';
import AssignTaskModal from './components/assignTaskModal';
import Dustbin from '../../../assets/svgIcon/dustbin';
import PlusIcon from '../../../assets/svgIcon/plusIcon';
import Pencil from '../../../assets/svgIcon/pencil';
import CalenderIcon from '../../../assets/svgIcon/calenderIcon';
import SPDrawer from '../../../components/SPDrawer';
import EyeIconView from '../../../assets/svgIcon/eyeIcon/eye-view';
import EditTicket from '../incidentManagement/components/editTicket';
import {
  listIncidentCustomers,

} from '../../../actions/incidentManagement';

import {
  getIncidentManagementsubCategoryAction,
  getIncidentManagementsubDispositionAction,
  listLocationUsersGroup
} from '../../../actions/incidentMasterData';
import {
  caseDetails,
  editCase,
} from '../../../actions/caseManagement';

import {
  listLocationUsers,
  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementsubCategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementsubDispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
  getCaseActionAppAction,
  runAction,
  addArtifactAction,

} from '../../../actions/caseMasterData';




const manageFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'priority',
    value: 'Priority',
  },
  {
    key: 'disposition',
    value: 'Disposition',
  },
  {
    key: 'status',
    value: 'Status',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
  {
    key: 'categories',
    value: 'Category',
  },
];

const priorityFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'high',
    value: 'High',
  },
  {
    key: 'medium',
    value: 'Medium',
  },
  {
    key: 'low',
    value: 'Low',
  },
];

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

const statusFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'Open',
    value: 'Open',
  },
  {
    key: 'Close',
    value: 'Close',
  },
];

const categoriesFilter = [];

function Cases({
  casesStore,
  listCasesAction,
  getFilteredDataAction,
  deleteDataAction,
  getCategoryAction,
  listDispositionsAction,
  dispositions,
  categories,
  caseDeleteStore,
  clearDeleteStateAction,
  listIncidentCustomersAction,
  Customers,
  caseDetailsAction,
  caseDetailsState,
  editCaseAction,
  getIncidentManagementsubDispositionActionV1,
  getIncidentManagementsubCategoryActionV1,
  incidentMasterSubCategory,
  caseMasterSeverity,
  disposition,
  caseMasterCategory,
  caseMasterDisposition,
  caseMasterSubDisposition,
  caseMasterDetectionMethods,
  incidentMasterSubDisposition,
  caseMasterArtifacts,
  caseMasterLocation,
  incidenArtifactList,
  incidentAssets,

  listLocationUsersAction,
  listLocationUsersGroupAction,
  incidentUsersData,
  incidentUsersGroupData,
  access

}) {
  const { path } = useParams();

  const setTitle = (key, edit = false) => {
    let title;
    if (key === 'All' || key === 'Not an Incident') {
      title = `${edit ? 'Edit' : 'Create'} Incident`;
    } else {
      title = `${edit ? 'Edit' : 'Create'} ` + key;
    }
    return title;
  };
  const pageFilterOption = [];
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-cases'))){
    pageFilterOption.push({
      key: 'filter',
      value: 'All',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-incident-tickets'))){
    pageFilterOption.push({
      key: 'incident',
      value: 'Incident',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-cases-vulnerability'))){
    pageFilterOption.push({
      key: 'vulnerability',
      value: 'Vulnerability',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-cases-risk'))){
    pageFilterOption.push({
      key: 'risk',
      value: 'Risk',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-cases-risk'))){
    pageFilterOption.push({
      key: 'advisory',
      value: 'Threat Intel',
    });
  }

  const { totalCount } = casesStore?.result?.data?._meta ?? { totalCount: 0 }; // eslint-disable-line no-underscore-dangle
  const history = useHistory();
  // const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const onCloseTaskModal = () => setTaskModalVisible(false);
  const [record, setRecord] = useState({});
  const [activeOptionItem, setActiveOptionItem] = useState();
  function showConfirm(record) {
    Modal.confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        const caseType = activeOption === "filter" ? record.type : activeOption;
        deleteDataAction(record.iti_id, mypage, caseType);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const [formLoader, setFormLoader] = useState({
    subCategory: false,
    subDisposition: false,
  });


  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [incidentMemberList, setIncidentMemberList] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    let obData = [];
    if (
      Object.keys(incidentUsersData).length != 0 &&
      incidentUsersData !== undefined
    ) {
      for (const [key, value] of Object.entries(incidentUsersData.data)) {
        obData.push({
          value: Object.keys(value)[0],
          key: Object.keys(value)[0],
          label: value[Object.keys(value)[0]],
          GroupLabel: 'Users',
        });
      }
    }

    if (
      Object.keys(incidentUsersGroupData).length != 0 &&
      incidentUsersGroupData !== undefined
    ) {
      for (const [key, value] of Object.entries(incidentUsersGroupData.data)) {
        obData.push({
          value: Object.keys(value)[0],
          key: Object.keys(value)[0],
          label: value[Object.keys(value)[0]],
          GroupLabel: 'Groups',
        });
      }
    }


    setIncidentMemberList(obData);
  }, [incidentUsersData, incidentUsersGroupData]);

  const oncaseDetailsActionhandler = (record) => {
    const caseType = activeOption === "filter" ? record.type : activeOption;
    caseDetailsAction(record.iti_id, caseType)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      dataIndex1: 'key',
      editable: false,
      width: 85,
    },
    {
      title: 'SUBJECT',
      dataIndex: 'subject',
      dataIndex1: 'iti_subject',
      editable: false,
      width: 354,
      sorter: (a, b) => { },
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      dataIndex1: 'iti_type',
      editable: false,
      sorter: (a, b) => { },
      hide: _.isUndefined(path) || path === "filter" ? false : true
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      dataIndex1: 'iti_category_id',
      sorter: (a, b) => { },
      editable: false,
    },
    {
      title: 'OPENED BY',
      dataIndex: 'openedBy',
      dataIndex1: 'iti_opened_by',
      editable: false,
      sorter: (a, b) => { },
    },
    {
      title: 'CUSTOMER',
      dataIndex: 'iti_organization',
      editable: false,
      render: key => {
        let customerName = '';
        console.log(Customers, key)
        if (key && Customers) {
          customerName = Customers.data[key];
        }
        return customerName;
      },
    },

    {
      title: 'START DATE',
      dataIndex: 'startDate',
      dataIndex1: 'iti_start_date',
      editable: false,
      sorter: (a, b) => { },
    },
    {
      title: 'ClOSE DATE',
      dataIndex: 'endDate',
      dataIndex1: 'iti_close_date',
      sorter: (a, b) => { },
      editable: false,
      render: t => {

        if (t) {
          return t;
        } else {
          return <SPRiskTag type="" text={'In Progress..'} />;

        }
      },

    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      dataIndex1: 'iti_priority',
      sorter: (a, b) => { },
      render: t => {
        if (t === 'High') {
          return <SPRiskTag type="danger" text={t} />;
        }
        if (t === 'Medium') {
          return <SPRiskTag type="warning" text={t} />;
        }
        if (t === 'Low') {
          return <SPRiskTag type="success" text={t} />;
        }
      },
    },

    {
      title: 'STATUS',
      dataIndex: 'status',
      editable: false,
      dataIndex1: 'iti_ticket_status',
      sorter: (a, b) => { },
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      dataIndex1: 'action',
      render: (text, record, index) => {
        const deleteCases = () => {
          showConfirm(record);
        };

        const onOpenTaskModal = () => {
          if (casesStore?.result?.data.items) {
            const selectData = casesStore.result.data.items.find(
              item => item.iti_tid === record.key
            );
            setSelectedCase(selectData);
          }
          setTaskModalVisible(true);
        };

        const moreItems = [];
        const case_type= (record.type.toLowerCase()=='incident') ? 'incident-tickets' : 'cases-'+record.type.toLowerCase();

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-"+case_type))){
          const updateCases=  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setIsAddDrawerVisible(true);
              setEditMode(true);
              setRecord(record)
              oncaseDetailsActionhandler(record);
            },
          };
          moreItems.push(updateCases);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("create-"+case_type))){
          const createTasks=  {
            key: 'task',
            label: 'Task',
            icon: <CalenderIcon />,
            onClickItem: onOpenTaskModal,
          };
          moreItems.push(createTasks);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-"+case_type))){
          const viewCase=  {
            onClickItem: () => {
              if (activeOption === "filter") {
                history.push(`/cases/${record.type.toLowerCase()}/${record.iti_id}`);
              } else {
                history.push(`/cases/${activeOption}/${record.iti_id}`);
              }
            },
            key: 'view',
            label: 'View',
            icon: <EyeIconView />,
          };
          moreItems.push(viewCase);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-"+case_type))){
          const deleteCase=    {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: deleteCases,
          };
          moreItems.push(deleteCase);
        }
        if ( moreItems.length !==0) {

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
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'filter'
  );
  const [deleteMessage, setDeleteMessage] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [dispositionOptions, setDispositionOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    let optiondata = [];
    optiondata = [
      {
        key: 'all',
        value: 'All',
      },
    ];
    if (Object.keys(dispositions).length !== 0) {
      dispositions.data.items.forEach(element => {
        optiondata.push({
          key: String(element.ids_id),
          value: String(element.ids_name),
        });
      });
    }
    setDispositionOptions(optiondata);
  }, [dispositions]);


  const [customersOptions, setCustomersOptions] = useState([]);
  useEffect(() => {
    const CustomersData = [];
    CustomersData.push({ key: 'all', value: 'All', label: 'All' });
    if (Customers?.success === true) {
      if (Object.keys(Customers).length !== 0) {
        Object.entries(Customers.data).forEach(([key, value]) => {
          CustomersData.push({
            key: key,
            value: value,
            label: value,
          });
        });
      }
    }
    setCustomersOptions(CustomersData);
  }, [Customers]);




  useEffect(() => {
    if (caseDeleteStore?.result?.success == true) {
      const myArrayQry = mapQueryWithApi(query);
      setSearchText('');
      setActiveOption(path || 'filter');
      listCasesAction({ queryItem: myArrayQry }, activeOption);
      clearDeleteStateAction();
    }

  }, [caseDeleteStore]);

  useEffect(() => {
    let optiondata = [];
    optiondata = [
      {
        key: 'all',
        value: 'All',
      },
    ];
    if (Object.keys(categories).length !== 0) {
      categories.data.items.forEach(element => {
        optiondata.push({
          key: String(element.ica_id),
          value: String(element.ica_name),
        });
      });
    }
    setCategoriesOptions(optiondata);
  }, [categories]);

  const setFilterRoute = path => {
    if (path === 'filter') {
      history.push('/cases');
    } else {
      history.push('/cases/' + path);
    }
  };

  function isFilterAvilable(queryItem) {
    const filterParm = [
      'iti_page_no',
      'iti_priority',
      'iti_disposition',
      'iti_category',
      'iti_ticket_status',
      'iti_subject',
      'sort',
      'iti_showing',
    ];
    for (let index = 0; index < filterParm.length; index += 1) {
      if (filterParm[index] in queryItem) {
        return true;
      }
    }
    return false;
  }

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    console.log(isFilterAvilable(parsedQuery));
    if (parsedQuery && isFilterAvilable(parsedQuery)) {
      const queryObject = { payload: {}, CasesSearch: {}, QueryString: '' };
      if (parsedQuery.iti_page_no) {
        queryObject.payload.page = parsedQuery.iti_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.iti_priority) {
        queryObject.CasesSearch.iti_priority = parsedQuery.iti_priority;
      }
      if (parsedQuery.iti_ticket_status) {
        queryObject.CasesSearch.iti_ticket_status =
          parsedQuery.iti_ticket_status;
      }
      if (parsedQuery.iti_category) {
        queryObject.CasesSearch.iti_category_id = parsedQuery.iti_category;
      }
      if (parsedQuery.iti_disposition) {
        queryObject.CasesSearch.iti_disposition_id =
          parsedQuery.iti_disposition;
      }
      if (parsedQuery.iti_subject) {
        queryObject.CasesSearch.search = parsedQuery.iti_subject;
      }
      if (parsedQuery.iti_showing) {
        queryObject.payload['per-page'] = parsedQuery.iti_showing;
      }

      const casesSearch = queryObject.CasesSearch;
      if (Object.keys(casesSearch).length !== 0) {
        Object.entries(casesSearch).forEach(([key, val]) => {
        //  console.log('>>>>>>>>>>>>> FOR: ', { key });
          myArrayQry += 'CasesSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    // if (location.pathname.split('/').pop() !== 'cases' && location.pathname.split('/').pop() !== 'filter') {
    //   myArrayQry +=
    //     'CasesSearch[iti_type]=' + location.pathname.split('/').pop();
    // }

    return myArrayQry;
  }

  const onChangeOption = selectedOptionKey => {
    setActiveOption(selectedOptionKey);
    setFilterRoute(selectedOptionKey);
    setQuery({});
  };

  const originData = [];
  if (casesStore?.result?.data.items) {
    const myData = casesStore.result.data.items;
    let categoryName = '';
    let openedByNae = '';
    let itiDispositionName = '';
    for (let i = 0; i < myData.length; i += 1) {
      if (myData[i].itiCategory) {
        categoryName = myData[i].itiCategory.ica_name;
      } else {
        categoryName = '';
      }

      if (myData[i].itiOpenedBy) {
        openedByNae = myData[i].itiOpenedBy.usr_name;
      } else {
        openedByNae = '';
      }

      if (myData[i].itiDisposition) {
        itiDispositionName = myData[i].itiDisposition.ids_name;
      } else {
        itiDispositionName = '';
      }
      originData.push({
        key: myData[i].iti_tid,
        iti_id: myData[i].iti_id,
        index: ((mypage - 1) * showing + i + 1).toString(),
        subject: myData[i].iti_subject,
        type:
          myData[i].iti_type.charAt(0).toUpperCase() +
          myData[i].iti_type.slice(1),
        category: categoryName,
        openedBy: openedByNae,
        startDate: myData[i].iti_start_date,
        endDate: myData[i].iti_close_date,
        priority: myData[i].iti_priority,
        disposition: itiDispositionName,
        status: myData[i].iti_ticket_status,
        iti_organization: myData[i].iti_organization,
      });
    }
  }

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push('/cases/' + activeOption + '?' + qs);
    } else {
      history.push('/cases?' + qs);
    }
    setQuery(qs);
  };

  useEffect(() => {
    listDispositionsAction();
    getCategoryAction();
    listIncidentCustomersAction();
    listLocationUsersAction();
    listLocationUsersGroupAction();
  }, []);

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    setSearchText('');
    setActiveOption(path || 'filter');
    listCasesAction({ queryItem: myArrayQry }, activeOption);
  }, [query, path]);

  // const { id } = useParams();
  // const [myPage, setMyPage] = useState(1);

  const {
    iti_ticket_status = 'all',
    iti_priority = 'all',
    iti_category = 'all',
    iti_showing = '20',
    iti_disposition = 'all',
    iti_page_no = 1,
    iti_subject,
    sort = undefined,
  } = queryString.parse(query);
  const [searchText, setSearchText] = useState(iti_subject);
  const [currentPage, setCurrentPage] = useState(parseInt(iti_page_no, 10));
  useEffect(() => {
    const queryObject = {
      iti_subject: iti_subject,
      ...(iti_showing !== '20' && { iti_showing: iti_showing }),
      ...(iti_priority !== 'all' && { iti_priority: iti_priority }),
      ...(iti_ticket_status !== 'all' && {
        iti_ticket_status: iti_ticket_status,
      }),
      ...(iti_category !== 'all' && { iti_category_id: iti_category }),
      ...(iti_page_no !== 1 && { iti_page_no: iti_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setMypage(iti_page_no);
    setShowing(iti_showing);
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [searchText, iti_priority, iti_ticket_status, iti_category, iti_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([
    'priority',
    'disposition',
    'showing',
    'categories',
    'showing',
    'status',
  ]);
  const onChangeManageFilters = (item, selected) => {
    const newItems = selected
      ? filter(selectedFilters, filterKey => {
        return filterKey !== item;
      })
      : concat(selectedFilters, item);

    setSelectedFilters(newItems);

    if (selected) {
      if (item === 'disposition') {
        handleChange('iti_disposition', 'all');
      }
      if (item === 'priority') {
        handleChange('iti_priority', 'all');
      }
      if (item === 'categories') {
        handleChange('iti_category', 'all');
      }
      if (item === 'status') {
        handleChange('iti_ticket_status', 'all');
      }
      if (item === 'showing') {
        handleChange('iti_showing', 20);
      }
    }
  };

  const onFormSubmit = (data, resetForm) => {
    const caseType = activeOption === "filter" ? record?.type : activeOption;
    editCaseAction({
      data: {
        data,
        id: caseDetailsState?.data?.iti_id,
        url: API.cases + '/' + caseDetailsState?.data?.iti_id,
        atOnce: true,
      },
      caseType,
      callback: () => {
        refreshList();
      },
    });
  };

  function refreshList() {
    setEditMode(false);
    setIsAddDrawerVisible(false);
    const myArrayQry = mapQueryWithApi(query);
    setSearchText('');
    setActiveOption(path || 'filter');
    listCasesAction({ queryItem: myArrayQry }, activeOption);
    clearDeleteStateAction();
  }

  const onPageChange = pageNumber => {
    handleChange('iti_page_no', pageNumber);
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter) {
      let columnIndex = undefined;
      if (sorter.column) {
        columnIndex = sorter.column.dataIndex1 || undefined;
      }


      console.log({ sorter });

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
    }
  };

  const getSubCategory = cat_id => {
    getIncidentManagementsubCategoryActionV1({
      cat_id,
      callback: () => {
        setFormLoader({
          ...formLoader,
          subCategory: false,
        });
      },
    });
  };

  const getSubDisposition = disp_id => {
    getIncidentManagementsubDispositionActionV1({
      disp_id,
      callback: () => {
        setFormLoader({
          ...formLoader,
          subDisposition: false,
        });
      },
    });
  };
  let filterdcolumns = columns.filter(function (item) {
    if (item.hide) {
      return false;
    } else {
      return true;
    }
  });
  return (
    <>
      <PageHeader title="Cases" options={[]} />

      <SPPageFilters
        options={pageFilterOption}
        active={activeOption}
        onChange={onChangeOption}
      />
      {casesStore.error ? (
        <AlertBox
          className="alert-box-sp"
          message={casesStore.error.message}
          type="error"
          closable
        />
      ) : null}
      <>
        <Row
          gutter={[19, 10]}
          style={{ marginTop: 23, marginBottom: 13, flexWrap: 'flex' }}
        >
          <Col>
            <SPSearch
              onEnter={() => {
                handleChange('iti_subject', searchText);
              }}
              text={query.iti_subject}
              onChange={e => {
                setSearchText(e.target.value);
              }}

              size="500px"
            />
          </Col>

          {selectedFilters.includes('priority') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Priority"
                items={priorityFilter}
                selected={iti_priority || 'all'}
                onChange={e => {
                  console.log(e.key);
                  handleChange('iti_priority', e.key);
                }}
              />
            </Col>
          ) : null}

          {selectedFilters.includes('status') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Status"
                items={statusFilter}
                selected={iti_ticket_status || 'all'}
                onChange={e => {
                  handleChange('iti_ticket_status', e.key);
                }}
              />
            </Col>
          ) : null}

          {selectedFilters.includes('categories') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Category"
                items={categoriesOptions}
                selected={iti_category || 'all'}
                // disabled={isDisable}
                onChange={e => {
                  handleChange('iti_category', e.key);
                }}
              />
            </Col>
          ) : null}



          {selectedFilters.includes('showing') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Showing"
                items={showingFilter}
                selected={iti_showing || 20}
                onChange={e => {
                  handleChange('iti_showing', e.key);
                }}
              />
            </Col>
          ) : null}

          <Col>
            <SPManageFilters
              items={manageFilter}
              onChange={onChangeManageFilters}
              selectedItems={selectedFilters}
            />
          </Col>
        </Row>
        <AssignTaskModal
          selectedCase={selectedCase}
          visible={taskModalVisible}
          onClose={onCloseTaskModal}
        />
        <SPTable
          columns={filterdcolumns}
          dataSource={originData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={iti_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1
              ? currentPage
              : (currentPage - 1) * iti_showing + 1
          }
          currentPage={currentPage}
          isLoading={casesStore.loading}
        />
      </>

      <SPDrawer
        title={setTitle(activeOption, editMode) || 'Create'}
        isVisible={isAddDrawerVisible}
        onClose={() => {

          setEditMode(false);
          setIsAddDrawerVisible(false);
        }}
        maskClosable={false}
        activeOption={activeOption}
      >
        <EditTicket
          formType="cases"
          activeOptionItem={activeOptionItem}
          activeOption={activeOption}
          formLoader={formLoader}
          formMaster={{
            severity: caseMasterSeverity?.result,
            members: incidentMemberList,
            disposition: disposition,
            incidentMasterCategory: caseMasterCategory,
            incidentMasterSubCategory: isObject(
              incidentMasterSubCategory?.result
            )
              ? Object.keys(incidentMasterSubCategory?.result).map(
                subcategory => {
                  const name =
                    incidentMasterSubCategory?.result?.[subcategory];
                return {
                    label: name,
                    value: subcategory,
                    key: subcategory,
                };
              })
              : [],

            incidentMasterDisposition: caseMasterDisposition,
            incidentMasterSubDisposition,
            incidentMasterDetectionMethods: caseMasterDetectionMethods,
            incidentMasterArtifacts: caseMasterArtifacts,
            incidentMasterLocation: caseMasterLocation,
            incidentAssets: incidentAssets,
            incidenArtifactList,
          }}

          onChangeCategory={category => {
            setFormLoader({
              ...formLoader,
              subCategory: true,
            });
            getSubCategory(category);
          }}
          onChangeDisposition={disposition => {
            setFormLoader({
              ...formLoader,
              subDisposition: true,
            });
            getSubDisposition(disposition);
          }}
          onFormSubmit={onFormSubmit}
          create={editMode}
          item={editMode ? caseDetailsState?.data : {}}
          type={editMode ? 'edit' : 'create'}
          onCancel={() => {
            setEditMode(false);
            setIsAddDrawerVisible(false);
          }}
        />
      </SPDrawer>
    </>
  );
}

const mapStateToProps = state => {
  return {
    casesStore: state.casesStore,
    dispositions: state.dispositionsStore.listData,
    categories: state.categoriesStore.listData,
    caseDeleteStore: state.caseDeleteStore,
    Customers: state.incidentCustomersStore.listData,
    caseDetailsState: state.caseDetails.listData,

    caseMasterSeverity: state.caseMasterSeverity,
    disposition: state.caseDispositionStore.listData,
    caseMasterCategory: state.caseMasterCategory,
    incidentMasterSubCategory: state.incidentMasterSubCategory,
    caseMasterDisposition: state.caseMasterDisposition,
    incidentMasterSubDisposition: state.incidentMasterSubDisposition,
    caseMasterDetectionMethods: state.caseMasterDetectionMethods,
    caseMasterArtifacts: state.caseMasterArtifacts,
    caseMasterLocation: state.caseMasterLocation,
    incidentAssets: state.threatIntelligenceAsset,
    incidenArtifactList: state.incidenArtifactList,
    incidentUsersData: state.caseMasterStore.users,
    incidentUsersGroupData: state.incidentMasterStore.userGroups,
    access :  state?.userStore?. userProfile?.data?.access
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listCasesAction: (...args) => {
      return dispatch(listCases(...args));
    },
    getFilteredDataAction: data => {
      return dispatch(getFilteredData(data));
    },
    deleteDataAction: (...args) => dispatch(deleteData(...args)),
    getCategoryAction: data => {
      return dispatch(getCategory(data));
    },
    listDispositionsAction: data => {
      return dispatch(listDispositions(data));
    },
    clearDeleteStateAction: data => {
      return dispatch(clearDeleteState(data));
    },
    listIncidentCustomersAction: data => {
      return dispatch(listIncidentCustomers(data));
    },
    caseDetailsAction: (...args) => {
      return dispatch(caseDetails(...args));
    },
    editCaseAction: (...args) => {
      return dispatch(editCase(...args));
    },
    getIncidentManagementsubCategoryActionV1: data => {
      return dispatch(getIncidentManagementsubCategoryAction(data));
    },
    getIncidentManagementsubDispositionActionV1: data => {
      return dispatch(getIncidentManagementsubDispositionAction(data));
    },
    listLocationUsersGroupAction: data => {
      return dispatch(listLocationUsersGroup(data));
    },
    listLocationUsersAction: data => {
      return dispatch(listLocationUsers(data));
    }

  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Cases);
