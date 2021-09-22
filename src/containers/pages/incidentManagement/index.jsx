import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  useHistory,
  useParams,
} from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Modal, Button, message, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { filter, map, concat, find, isArray } from 'lodash';
import queryString from 'query-string';
import { AlertBox, StyledDiv, StyledCol } from './StyledComponents';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import {
  getTaskUsers
} from '../../../actions/tasksManagement';
import {
  listIncidentManagement,
  listIncidentSources,
  listIncidentCustomers,
  listIncidentSeverity,
  listIncidentDisposition,
  exportPdf,
  exportExcel,
  getReportTypeAction,
  generateReportTypeAction,
  incidentDetails,
  deleteIncidentAction,
  bulkUpdateIncidentAction,
} from '../../../actions/incidentManagement';
import { getTaskDepartment } from '../../../actions/tasksManagement';
import PageHeader from '../../layout/pageHeader';
import SPButton from '../../../components/SPButton';
import SPCog from '../../../components/SPCog';
import SPSearch from '../../../components/SPSearch';
import SPRoundProgress from '../../../components/SPRoundProgress';
import SPPageFilters from '../../../components/SPPageFilters';
import SPRiskTag from '../../../components/SPRiskTag';
import SPSelect from '../../../components/SPSelect';
import SPManageFilters from '../../../components/SPManageFilters';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import SPTable from '../../../components/SPTable';
import Dustbin from '../../../assets/svgIcon/dustbin';
import PlusIcon from '../../../assets/svgIcon/plusIcon';
import SPSummaryBox from '../../../components/SPSummaryBox';
import EyeIconView from '../../../assets/svgIcon/eyeIcon/eye-view';
import Pencil from '../../../assets/svgIcon/pencil';

import API from '../../../config/endpoints.config';
import AssignTaskModal from '../cases/components/assignTaskModal';
import CalenderIcon from '../../../assets/svgIcon/calenderIcon';
import SPDrawer from '../../../components/SPDrawer';
import { Formik } from 'formik';
import Form from 'antd/lib/form/Form';
import { RowDiv } from './components/incidentDetailsBox/StyledComponents';
import * as Yup from 'yup';
import { ExecuteBtn } from '../ThreatIntelligence/components/evidenceTable/StyledComponents';
import SPDatepicker from '../../../components/SPDatepicker';
import SelectBox from '../../../components/SelectBox';
import moment from 'moment';
import { isObject } from 'lodash';
import EditTicket from './components/editTicket';
import {
  getArtifactListAction,
  getIncidentManagementartifactsAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementSeverityAction,
  getIncidentManagementsubCategoryAction,
  getIncidentManagementsubDispositionAction,
  listLocationUsers,
  listLocationUsersGroup
} from '../../../actions/incidentMasterData';

import {
  createIncident,
  editIncident,
} from '../../../actions/incidentManagement';

import { listAsset,addEvidence } from '../../../actions/threatIntelligence';
import { getUsersList } from '../../../actions/usersManagement';
import BulkUpdateModal from './components/BulkUpdateModal';
const manageFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'severity',
    value: 'Severity',
  },
  {
    key: 'openedBy',
    value: 'Opened By',
  },
  {
    key: 'source',
    value: 'Source',
  },
  {
    key: 'customer',
    value: 'Customer',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
  {
    key: 'status',
    value: 'Status',
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
    key: 'open',
    value: 'Open',
  },
  {
    key: 'close',
    value: 'Close',
  },
  {
    key: 'deferred',
    value: 'Deferred',
  },
];

/*
const customerFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'incident',
    value: 'Incident',
  },
  {
    key: 'vulnerability',
    value: 'Vulnerability',
  },
  {
    key: 'risk',
    value: 'Risk',
  },
  {
    key: 'advisory',
    value: 'Advisory',
  },
];


const summaryFilters = [
  {
    key: 'summary1',
    value: 'Summary Data1',
  },
  {
    key: 'summary2',
    value: 'Summary Data2',
  },
  {
    key: 'summary3',
    value: 'Summary Data3',
  },
  {
    key: 'summary4',
    value: 'Summary Data4',
  },
];

*/
function IncidentManagement({
  listIncidentManagement,
  incidentManagementStore,
  listIncidentSources,
  Sources,
  listIncidentCustomers,
  Customers,
  listIncidentSeverity,
  Disposition,
  listIncidentDisposition,
  Severity,
  listData,
  loading,
  exportPdf,
  exportExcel,
  getTaskDepartment,
  getReportTypeAction,
  incidentReportTypes,
  generateReportTypeAction,
  listLocationUsersGroup,
  // create actions
  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listAsset,
  getUsersList,
  getArtifactListAction,
  listLocationUsers,
  getIncidentManagementsubDispositionAction,
  getIncidentManagementsubCategoryAction,
  createIncident,
  editIncident,
  incidentDetails,
  // create actions done
  deleteIncidentAction,
  bulkUpdateIncidentAction,

  // create state
  incidentMasterSeverity,
  disposition,
  incidentMasterCategory,
  incidentMasterSubCategory,
  incidentMasterDisposition,
  incidentMasterSubDisposition,
  incidentMasterDetectionMethods,
  incidentMasterArtifacts,
  incidentMasterLocation,
  incidentAssets,
  incidentUsersData,
  incidentUsersGroupData,
  incidenArtifactList,
  incidentDetailsData,
  addEvidence,
  getTaskUsers,
  taskUsersState,
  // create state done
  profile,
  access,

}) {

  const { path } = useParams();
  const [selectedCase, setSelectedCase] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [incidentManagementList, setIncidentManagementList] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const history = useHistory();
  const [dispositionOptions, setDispositionOptions] = useState([]);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'All'
  );
  const [activeOptionItem, setActiveOptionItem] = useState();
  const { confirm, error } = Modal;
  const [query, setQuery] = useState(location.search);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [incidentMemberList, setIncidentMemberList] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [bulkUpdateVisible, setBulkUpdateVisible] = useState(false);
  const [createIncidentData, setCreateIncidentData] = useState();

  const [formLoader, setFormLoader] = useState({
    subCategory: false,
    subDisposition: false,
  });

  const pdf_Excel = [];
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("pdf-incident-tickets") )) {
    pdf_Excel.push({
      key: 'pdf',
      label: 'PDF',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("excel-incident-tickets"))) {
    pdf_Excel.push({
      key: 'excel',
      label: 'Excel',
    });
  }



  function refreshList() {
    setCreateIncidentData();
    setEditMode(false);
    setIsAddDrawerVisible(false);
    const myArrayQry = mapQueryWithApi(query);

    listIncidentManagement({ queryItem: myArrayQry });
  }

  const onEditDrawerOpen = () => {
    getReportTypeAction();
    setIsEditDrawerVisible(true);
  };
  const onEditDrawerClose = () => {
    setIsEditDrawerVisible(false);
  };

  const onCloseTaskModal = () => setTaskModalVisible(false);

  const handleQuery = qs => {
    if (activeOption !== 'All') {
      history.push('/incidentManagement/' + activeOption + '?' + qs);
    } else {
      history.push('/incidentManagement?' + qs);
    }
    setQuery(qs);
  };

  const setFilterRoute = path => {
    if (path === 'All') {
      history.push('/incidentManagement');
    } else {
      history.push('/incidentManagement/' + path);
    }
  };

  const {
    iti_ticket_status = 'all',
    iti_showing = '20',
    iti_page_no = 1,
    iti_disposition_id = 'all',
    iti_attack_severity = 'all',
    iti_customer = 'all',
    iti_ingestion_source = 'all',
    iti_opened_by = 'all',
    iti_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(iti_subject);

  function showConfirm(key,record) {
    confirm({
    title:`Are you sure you want to delete this ${record?.itiDisposition?.ids_name}?`,
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        deleteIncidentAction({
          id: key,
          page: currentPage,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'iti_tid',
      editable: false,
      width: 85,
    },
    {
      title: 'SUBJECT',
      dataIndex: 'iti_subject',
      editable: false,
      width: 250,
      sorter: (a, b) => { },
    },
    {
      title: 'SOURCE',
      dataIndex: 'itiSource',
      editable: false,
      render: (text, record, index) => {
        let source = '';
        if (record.itiSource) {
          source = record.itiSource.dis_name;
        }
        return source;
      },
    },
    {
      title: 'CATEGORY',
      dataIndex: 'itiCategory',
      editable: false,
      render: (text, record, index) => record?.itiCategory?.ica_name ?? '-',
    },
    {
      title: 'OPENED BY',
      dataIndex: 'itiOpenedBy',
      editable: false,
      render: (text, record, index) => record?.itiOpenedBy?.usr_name ?? '-',
    },
    {
      title: 'SUBCATEGORY',
      dataIndex: 'itiSubcategory',
      editable: false,
      width: 100,
      render: (text, record, index) => {
        if (isObject(record?.itiSubcategory)) {
          return Object.values(record?.itiSubcategory)
            .map(s => s)
            .join(', ');
        }
        return record?.itiSubcategory;
      },
    },
    {
      title: 'CUSTOMER',
      dataIndex: 'iti_organization',
      editable: false,
      render: key => {
        let customerName = '';
        if (key && Customers?.success) {
          customerName = Customers.data[key];
        }
        return customerName;
      },
    },
    {
      title: 'START DATE',
      dataIndex: 'iti_start_date',
      editable: false,
      sorter: (a, b) => { },
    },
    {
      title: 'END DATE',
      dataIndex: 'iti_close_date',
      editable: false,
      sorter: (a, b) => { },
    },
    {
      title: 'SEVERITY',
      dataIndex: 'iti_attack_severity',
      sorter: (a, b) => { },
      render: t => {
        if (t === 'High') {
          return <SPRiskTag type="danger" text={t} />;
        }
        if (t === 'Medium') {
          return <SPRiskTag type="warning" text={t} />;
        }
        if (t === 'Low') {
          return <SPRiskTag type="primary" text={t} />;
        }
        if (t === 'Critical') {
          return <SPRiskTag type="danger" text={t} />;
        }
      },
    },
    {
      title: 'S3',
      dataIndex: 'incidentAssets',
      render: (text, record, index) => {
        let s3Score = 0;
        const obj = record.incidentAssets[0];

        if (obj.length > 0 && obj[0].ast_s3_score) {
          s3Score = obj[0].ast_s3_score;


        }
        return (
          <div role="presentation" onClick={() => {
            if (s3Score > 0) {


              history.push(`/assets/asset-details/${record.iti_id}`);
            }

          }}>
            <SPRoundProgress type="success" progress={s3Score} />
          </div>
        );
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'iti_ticket_status',
      sorter: (a, b) => { },
      editable: false,
    },
    {
      title: 'Actions',
      dataIndex: 'iti_id',
      render: (key,record) => {
        const deleteCases = () => {
          showConfirm(key,record);
        };
        const onOpenTaskModal = () => {
          setSelectedCase({ iti_id: key });
          setTaskModalVisible(true);
        };
        const moreItems = [];
        if(record?.iti_ticket_status === 'Open'){
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-tickets"))){
          const updateIncident=  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setIsAddDrawerVisible(true);
              setEditMode(true);
              incidentDetails(key);
            },
          };
          moreItems.push(updateIncident);
        }
      }
      if(record?.iti_ticket_status === 'Close'){
      if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-close-tickets"))){
        const updateIncident=  {
          key: 'edit',
          label: 'Edit',
          icon: <Pencil />,
          onClickItem: () => {
            setIsAddDrawerVisible(true);
            setEditMode(true);
            incidentDetails(key);
          },
        };
        moreItems.push(updateIncident);
      }
    }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("create-tasks"))){
          const createTasks=  {
            key: 'task',
            label: 'Task',
            icon: <CalenderIcon />,
            onClickItem: onOpenTaskModal,
          };
          moreItems.push(createTasks);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-incident-tickets"))){
          const viewIncident=  {
            key: 'view',
            label: 'View',
            icon: <EyeIconView />,
            onClickItem: () => {
              history.push(`/incidentManagement/details/${key}`);
            },
          };
          moreItems.push(viewIncident);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-tickets"))){
          const deleteIncident=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: deleteCases,
          };
          moreItems.push(deleteIncident);
        }
        if ( moreItems.length !==0) {
          return (
              <SPSingleSelectDropdown
                  items={moreItems}
                  title="more"
                  onSelect={() => null}
              />
          );
        }
      },
    },
  ];

  function isFilterAvilable(queryItem) {
    const filterParm = [
      'iti_attack_severity',
      'iti_disposition_id',
      'iti_ticket_status',
      'iti_subject',
      'iti_customer',
      'iti_ingestion_source',
      'iti_opened_by',
      'sort',
      'iti_showing',
      'iti_page_no',
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

    if (parsedQuery && isFilterAvilable(parsedQuery)) {
      const queryObject = {
        payload: {},
        incidentManagementSearch: {},
        QueryString: '',
      };
      if (parsedQuery.iti_disposition_id) {
        queryObject.incidentManagementSearch.iti_disposition_id =
          parsedQuery.iti_disposition_id;
      }
      if (parsedQuery.iti_attack_severity) {
        queryObject.incidentManagementSearch.iti_attack_severity =
          parsedQuery.iti_attack_severity;
      }
      if (parsedQuery.iti_ingestion_source) {
        queryObject.incidentManagementSearch.iti_ingestion_source =
          parsedQuery.iti_ingestion_source;
      }
      if (parsedQuery.iti_opened_by) {
          queryObject.incidentManagementSearch.iti_opened_by =
          parsedQuery.iti_opened_by;
      }
      if (parsedQuery.iti_ticket_status) {
        queryObject.incidentManagementSearch.iti_ticket_status =
          parsedQuery.iti_ticket_status;
      }
      if (parsedQuery.iti_customer) {
        queryObject.incidentManagementSearch.iti_organization =
          parsedQuery.iti_customer;
      }
      if (parsedQuery.iti_subject) {
        queryObject.incidentManagementSearch.search = parsedQuery.iti_subject;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.iti_page_no) {
        queryObject.payload.page = parsedQuery.iti_page_no;
      }

      if (parsedQuery.iti_showing) {
        queryObject.payload['per-page'] = parsedQuery.iti_showing;
      }
      const { incidentManagementSearch } = queryObject;
      if (Object.keys(incidentManagementSearch).length !== 0) {
        Object.entries(incidentManagementSearch).forEach(([key, val]) => {
          if (val === 'all') {
            val = '';
          }
          myArrayQry += 'IncidentTicketsSearch[' + key + ']=' + val + '&';
        });
      }
      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'incidentManagement') {
      const user = find(dispositionOptions, function (o) {
        return String(o.value) === String(activeOption);
      });

      const id = user ? user.id : '';
      myArrayQry += 'IncidentTicketsSearch[iti_disposition_id]=' + id;
    }
    return myArrayQry;
  }

  const onChangeOption = (selectedOptionKey, item) => {

    setActiveOption(selectedOptionKey);
    setSelectedRecords([]);
    setActiveOptionItem(item);
    setFilterRoute(selectedOptionKey);
    setQuery({});
    setSearchText('');
  };

  const setTitle = (key, edit = false) => {
    let title;
    if (key === 'All' || key === 'Not an Incident') {
      title = `${edit ? 'Edit' : 'Create'} Incident`;
    } else {
      title = `${edit ? 'Edit' : 'Create'} ` + key;
    }
    return title;
  };

  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const onChangeManageFilters = (item, selected) => {
    const newItems = selected
      ? filter(selectedFilters, filterKey => {
        return filterKey !== item;
      })
      : concat(selectedFilters, item);

    setSelectedFilters(newItems);
  };

  const [selectedSummaryFilters, setSelectedSummaryFilters] = useState([]);
  const onChangeSummaryFilters = (item, selected) => {
    const newItems = selected
      ? filter(selectedSummaryFilters, filterKey => {
        return filterKey !== item;
      })
      : concat(selectedSummaryFilters, item);

    setSelectedSummaryFilters(newItems);
  };

  useEffect(() => {
    if (dispositionOptions.length > 0) {

      const myArrayQry = mapQueryWithApi(query);
      setActiveOption(path || dispositionOptions[0].value);
      setSelectedRecords([]);
      if (path == undefined) {
        setActiveOption(dispositionOptions[0].value);
        setSelectedRecords([]);
        setActiveOptionItem(dispositionOptions[0]);
        setFilterRoute(dispositionOptions[0].value);
        setQuery({});
        setSearchText('');
      }


      listIncidentManagement({ queryItem: myArrayQry });
    }
  }, [path, query, dispositionOptions]);

  useEffect(() => {
    if (incidentDetailsData?.data?.iti_category_id) {
     // getSubCategory(incidentDetailsData?.data?.iti_category_id);
    }
    if (incidentDetailsData?.data?.iti_disposition_id) {
     // getSubDisposition(incidentDetailsData?.data?.iti_disposition_id);
    }
  }, [incidentDetailsData]);

  useEffect(() => {
    setActiveOption(path || 'All');
    setSearchText('');
    listIncidentSources();
    listIncidentCustomers();
    listIncidentSeverity();
    listIncidentDisposition();
    getTaskUsers();

  }, []);

  const [severityOptions, setSeverityOptions] = useState([]);
  useEffect(() => {
    const SeverityData = [];
    SeverityData.push({ key: 'all', value: 'All', label: 'All' });
    if (Severity?.success === true) {
      if (Object.keys(Severity).length !== 0) {
        Object.entries(Severity.data).forEach(([key, value]) => {
          SeverityData.push({
            key: key,
            value: value,
            label: value,
          });
        });
      }
    }
    setSeverityOptions(SeverityData);
  }, [Severity]);

  useEffect(() => {
    let obData = [];
    if (
      Object.keys(incidentUsersData).length != 0 &&
      incidentUsersData !== undefined
    ) {
      for (const [key, value] of Object.entries(incidentUsersData.data)) {
        obData.push({
          value: Object.keys(value)[0],
          key:  Object.keys(value)[0],
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
          value:  Object.keys(value)[0],
          key:  Object.keys(value)[0],
          label: value[Object.keys(value)[0]],
          GroupLabel: 'Groups',
        });
      }
    }


    setIncidentMemberList(obData);
  }, [incidentUsersData, incidentUsersGroupData]);

  useEffect(() => {
    const DispositionData = [];
    if (Disposition?.success === true) {
      if (isArray(Disposition?.data)) {
        Disposition.data.forEach(data => {
         if(access!==undefined && (access.includes("all-super-admin") ||  access.includes((data?.ids_name).toLowerCase() + 's-incident-tickets'))){
               DispositionData.push({
                 id: data?.ids_id,
                 key: data?.ids_name,
                 value: data?.ids_name,

               });
         }
        });
      }
    }
    setDispositionOptions(DispositionData);
  }, [Disposition]);

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

  const [sourceOptions, setSourceOptions] = useState([]);
  useEffect(() => {
    const SourcesData = [];
    SourcesData.push({ key: 'all', value: 'All', label: 'All' });
    if (Sources?.success === true) {
      if (Object.keys(Sources).length !== 0) {
        Object.entries(Sources.data).forEach(([key, value]) => {
          SourcesData.push({
            key: key,
            value: value,
            label: value,
          });
        });
      }
    }
    setSourceOptions(SourcesData);
  }, [Sources]);

const [taskUserList, settaskUserList] = useState([]);
  useEffect(() => {
      const listData = taskUsersState?.listData?.data;
      console.log(listData);
      const TaskUserList = [];
        TaskUserList.push({ key: 'all', value: 'All', label: 'All' });

      if (listData && _.isObject(listData)) {
          Object.entries(listData).map(([key, value]) => {
              TaskUserList.push({
                  key:key,
                  value: value,
                  label: value
              })
          })
      }
      settaskUserList(TaskUserList)
  }, [taskUsersState]);

  useEffect(() => {
    if (listData?.data?.items) {
      if (Object.keys(listData).length !== 0) {
        setIncidentManagementList(listData.data.items);
        setTotalCount(listData.data._meta.totalCount);
        setCurrentPage(listData.data._meta.currentPage);
      }
    }
  }, [listData]);

  useEffect(() => {
    const queryObject = {
      iti_subject: iti_subject,
      ...(iti_showing !== '20' && { iti_showing: iti_showing }),
      ...(iti_ticket_status !== 'all' && {
        iti_ticket_status: iti_ticket_status,
      }),
      ...(iti_disposition_id !== 'All' && {
        iti_disposition_id: iti_disposition_id,
      }),
      ...(iti_attack_severity !== 'all' && {
        iti_attack_severity: iti_attack_severity,
      }),
      ...(iti_ingestion_source !== 'all' && {
        iti_ingestion_source: iti_ingestion_source,
      }),
      ...(iti_opened_by !== 'all' && {
        iti_opened_by: iti_opened_by,
      }),
      ...(iti_customer !== 'all' && { iti_customer: iti_customer }),
      ...(iti_page_no !== 1 && { iti_page_no: iti_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [
    searchText,
    iti_ticket_status,
    iti_showing,
    iti_customer,
    iti_attack_severity,
    iti_disposition_id,
    iti_customer,
    iti_ingestion_source,
    iti_opened_by,
  ]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };
  const updateObjectUrl = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };
  const onPageChange = pageNumber => {
    updateObjectUrl('iti_page_no', pageNumber);
    const myArrayQry = mapQueryWithApi(query);
    listIncidentManagement({
      queryItem: myArrayQry,
    });
    updateObjectUrl('iti_page_no', pageNumber);
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

  const onExportPDF = () => {
    let myArrayQry = mapQueryWithApi(query);

    const disposition = find(dispositionOptions, function (o) {
      return String(o.value) === String(activeOption);
    });

    const id = disposition?.id ?? 'all';
    if (myArrayQry.length <= 0) {
      myArrayQry = `IncidentTicketsSearch[iti_disposition_id]=`;
    }
    exportPdf(`${API.incidentManagement}/export-pdf?${myArrayQry}`);
  };

  const onExportExcel = () => {
    let myArrayQry = mapQueryWithApi(query);

    const disposition = find(dispositionOptions, function (o) {
      return String(o.value) === String(activeOption);
    });

    const id = disposition?.id ?? 'all';
    if (myArrayQry.length <= 0) {
      myArrayQry = `IncidentTicketsSearch[iti_disposition_id]=`;
    }
    exportExcel(`${API.incidentManagement}/excel?${myArrayQry}`);
  };

  const validationSchema = Yup.object({
    start: Yup.string().required('Required'),
    report_type: Yup.string().required('Required'),
  });

  const getSubCategory = cat_id => {
    getIncidentManagementsubCategoryAction({
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
    getIncidentManagementsubDispositionAction({
      disp_id,
      callback: () => {
        setFormLoader({
          ...formLoader,
          subDisposition: false,
        });
      },
    });
  };

  const onFormSubmit = (values, resetForm) => {

    if (editMode) {
      editIncident({
        data: {
          data: values,
          id: incidentDetailsData?.data?.iti_id,
          url: API.incidentManagement + '/' + incidentDetailsData?.data?.iti_id,
          atOnce: true,
          type: incidentDetailsData?.data?.itiDisposition?.ids_name,
        },
        callback: () => {
          refreshList();

          //window.location.reload();
        },
      });
    } else {
      createIncident({
        data: values,
        callback: () => {
          refreshList();
          //window.location.reload();
        },
      });
    }
  };


  return (
    <>
      <SPDrawer
        title={setTitle(activeOption, editMode) || 'Create'}
        isVisible={isAddDrawerVisible}
        onClose={() => {
          setCreateIncidentData();
          setEditMode(false);
          setIsAddDrawerVisible(false);
        }}
        maskClosable={false}
        activeOption={activeOption}
      >
        <EditTicket
          formType="incident"
          activeOptionItem={activeOptionItem}
          activeOption={activeOption}
          formLoader={formLoader}
          formMaster={{
            incidentArtifact: incidentDetailsData?.data?.incidentArtifact,
            severity: incidentMasterSeverity?.result,
            members: incidentMemberList,
            disposition: disposition,
            incidentMasterCategory,
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
                }
              )
              : [],
            incidentMasterDisposition,
            incidentMasterSubDisposition,
            incidentMasterDetectionMethods,
            incidentMasterArtifacts,
            incidentMasterLocation,
            incidentAssets,
            incidenArtifactList,
          }}
          onChangeCategory={category => {
            setFormLoader({
              ...formLoader,
              subCategory: true,
            });
            if(category){
              getSubCategory(category);
            }
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
          item={editMode ? incidentDetailsData?.data : createIncidentData}
          type={editMode ? 'edit' : 'create'}
          onCancel={() => {
            setEditMode(false);
            setIsAddDrawerVisible(false);
          }}
        />
      </SPDrawer>

      <SPDrawer
        title={'Incident Report'}
        isVisible={isEditDrawerVisible}
        onClose={onEditDrawerClose}
        drawerWidth={800}
      >
        <Formik
          id="formik-generate-report"
          validationSchema={validationSchema}
          initialValues={{
            start: moment(),
            report_type: 'all',
            end: moment().add(30, 'days'),
          }}
          onSubmit={(values, { resetForm }) => {
            generateReportTypeAction(values);
            resetForm();
            setIsEditDrawerVisible(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            resetForm,
          }) => (
            <Form>

              <RowDiv>
                <SPDatepicker
                  id="start"
                  label="Start Date"
                  name="start"
                  placeholder="Start Date"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.start}
                  value={values.start}
                  touched={touched.start}
                  disabled={isSubmitting}
                  width={170}
                />
              </RowDiv>
              <RowDiv>
                <SPDatepicker
                  id="end"
                  label="End Date"
                  name="end"
                  placeholder="End Date"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.end}
                  value={values.end}
                  touched={touched.end}
                  disabled={isSubmitting}
                  width={170}
                />
              </RowDiv>
              <RowDiv>
                <SelectBox
                  id="report_type"
                  name="report_type"
                  label="Report Type"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.report_type}
                  value={values.report_type}
                  touched={touched.report_type}
                  width={575}
                  options={
                    isObject(incidentReportTypes?.listData?.data)
                      ? Object.keys(incidentReportTypes?.listData?.data).map(

                        t => {
                            return {
                              label: incidentReportTypes?.listData?.data?.[t],
                              value: t,
                              key: t,
                            };
                        }
                      )
                      : []
                  }
                // disabled={isSubmitting}
                />
              </RowDiv>

              <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title="Generate"
                    htmlType="submit"
                    size="small"
                    onButtonClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </SPDrawer>

      <PageHeader
        title="Incident Management"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-tickets"))) &&
          <SPButton
            title={'Bulk Update'}
            size="small"
            onButtonClick={() => {
              if (selectedRecords.length <= 0) {
                error({
                  title: 'Please select the record(s) to update',
                  centered: true,
                  icon: <ExclamationCircleOutlined />,
                });
                return;
              }
              setBulkUpdateVisible(true);
            }}
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-tickets"))) &&
          <SPButton
            title={setTitle(activeOption) || 'Create'}
            size="small"
            image={<PlusIcon />}
            onButtonClick={() => {
              setCreateIncidentData({
                iti_disposition_id: activeOptionItem?.id
                  ? activeOptionItem?.id
                  : '',
                iti_id: true,
              });
              setEditMode(false);
              setIsAddDrawerVisible(true);
            }}
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("reports-incident-tickets"))) &&
          <SPButton
            title="Generate Report"
            size="small"
            onButtonClick={onEditDrawerOpen}
          />,
          <SPCog onClick={() => { }} />,
        ]}
      />

      <SPPageFilters
        options={dispositionOptions}
        active={activeOption}
        onChange={onChangeOption}
      />
      {/* {casesStore.error ? (
        <AlertBox message={casesStore.error.message} type="error" closable />
      ) : null} */}
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flexWrap: 'flex', flex: 1 }}>
          <Col>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onEnter={() => {
                handleChange('iti_subject', searchText);
              }}
              size="500px"
            />
          </Col>

          {selectedFilters.includes('severity') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Severity"
                items={severityOptions}
                selected={iti_attack_severity}
                onChange={e => {
                  handleChange('iti_attack_severity', e.key);
                }}
              />
            </Col>
          ) : null}

          {selectedFilters.includes('source') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Source"
                items={sourceOptions}
                selected={iti_ingestion_source}
                onChange={e => {
                  handleChange('iti_ingestion_source', e.key);
                }}
              />
            </Col>
          ) : null}
          {selectedFilters.includes('openedBy') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Opened By"
                items={taskUserList}
                selected={iti_opened_by}
                onChange={e => {
                  handleChange('iti_opened_by', e.key);
                }}
              />
            </Col>
          ) : null}
          {selectedFilters.includes('customer') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Customer"
                items={customersOptions}
                selected={iti_customer}
                onChange={e => {
                  handleChange('iti_customer', e.key);
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
                selected={iti_ticket_status}
                onChange={e => {
                  handleChange('iti_ticket_status', e.key);
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
                selected={iti_showing}
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
        <Row gutter={[19, 10]}>
          <Col>
            {(access!==undefined && (access.includes("all-super-admin") || access.includes("pdf-incident-tickets") || access.includes("excel-incident-tickets"))) &&
            <SPSingleSelectDropdown
              title="Export as"
              items={pdf_Excel}
              onSelect={data => {

                if (data?.key === 'pdf') {
                  onExportPDF();
                }
                if (data?.key === 'excel') {
                  onExportExcel();
                }
              }}
            /> }
          </Col>

          {/* <Col>
            <SPMultiSelectDropdown
              title="Summary"
              items={summaryFilters}
              onChange={onChangeSummaryFilters}
              selectedItems={selectedSummaryFilters}
            />
          </Col> */}
        </Row>
      </StyledDiv>
      <Row gutter={[18, 18]}>
        {map(selectedSummaryFilters, item => {
          return (
            <StyledCol>
              <SPSummaryBox text={item} />
            </StyledCol>
          );
        })}
      </Row>

      <AssignTaskModal
        selectedCase={selectedCase}
        visible={taskModalVisible}
        onClose={onCloseTaskModal}
      />

      <BulkUpdateModal
        visible={bulkUpdateVisible}
        onCancel={() => setBulkUpdateVisible(false)}
        formLoader={formLoader}
        formMaster={{
          incidentArtifact: incidentDetailsData?.data?.incidentArtifact,
          severity: incidentMasterSeverity?.result,
          members: incidentMemberList,
          disposition: disposition,
          incidentMasterCategory,
          incidentMasterSubCategory: isObject(incidentMasterSubCategory?.result)
            ? Object.keys(incidentMasterSubCategory?.result).map(
              subcategory => {
                const name = incidentMasterSubCategory?.result?.[subcategory];
                return {
                  label: name,
                  value: subcategory,
                  key: subcategory,
                };
              }
            )
            : [],
          incidentMasterDisposition,
          incidentMasterSubDisposition,
          incidentMasterDetectionMethods,
          incidentMasterArtifacts,
          incidentMasterLocation,
          incidentAssets,
          incidenArtifactList,
        }}
        onChangeCategory={category => {
          setFormLoader({
            ...formLoader,
            subCategory: true,
          });
          console.log(category);
          if(category){
            getSubCategory(category);
          }
         
        }}
        onChangeDisposition={disposition => {
          setFormLoader({
            ...formLoader,
            subDisposition: true,
          });
          getSubDisposition(disposition);
        }}
        selectedRecords={selectedRecords}
        onSubmit={(values, { resetForm }) => {
          setSelectedRecords([]);
          resetForm({});
          setBulkUpdateVisible(false);
          const reqPayload = {
            ...values,
            keys: selectedRecords,
            iti_category_details: values.itiSubcategory,
          };
          bulkUpdateIncidentAction({
            data: reqPayload,
            page: currentPage,
          });
        }}
      />
      <SPTable
        rowKey={record => record?.iti_id}
        rowSelection={{
          selectedRowKeys: selectedRecords,
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {

            setSelectedRecords(selectedRowKeys);
          },
          getCheckboxProps: record => {
            return {
              checked: false,
            };
          },
        }}
        scrollable={true}
        columns={columns}
        dataSource={incidentManagementList}
        onPageChange={onPageChange}
        canPaginate
        isLoading={loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * iti_showing + 1
        }
        showingTill={iti_showing}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    incidentManagementStore: state.incidentManagementStore,
    Sources: state.incidentSourcesStore.listData,
    Customers: state.incidentCustomersStore.listData,
    Severity: state.incidentSeverityStore.listData,
    Disposition: state.incidentDispositionStore.listData,
    listData: state.incidentManagementStore.listData,
    loading: state.incidentManagementStore.isProcessing,
    incidentReportTypes: state.incidentReportTypes,
    taskUsersState: state.taskUsers,

    // create
    incidentMasterSeverity: state.incidentMasterSeverity,
    disposition: state.incidentDispositionStore.listData,
    incidentMasterCategory: state.incidentMasterCategory,
    incidentMasterSubCategory: state.incidentMasterSubCategory,
    incidentMasterDisposition: state.incidentMasterDisposition,
    incidentMasterSubDisposition: state.incidentMasterSubDisposition,
    incidentMasterDetectionMethods: state.incidentMasterDetectionMethods,
    incidentMasterArtifacts: state.incidentMasterArtifacts,
    incidentMasterLocation: state.incidentMasterLocation,
    incidentAssets: state.threatIntelligenceAsset,
    incidentUsersData: state.incidentMasterStore.users,
    incidentUsersGroupData: state.incidentMasterStore.userGroups,
    incidenArtifactList: state.incidenArtifactList,
    incidentDetailsData: state.incidentDetails.listData,
    access :  state?.userStore?. userProfile?.data?.access,
    profile: state.userStore.userProfile,
    // create regarding state
  };
};

const mapDispatchToProps = {
  listIncidentManagement,
  listIncidentSources,
  listIncidentCustomers,
  listIncidentSeverity,
  listIncidentDisposition,
  exportPdf,
  exportExcel,
  getTaskDepartment,
  getReportTypeAction,
  generateReportTypeAction,
  listLocationUsersGroup,
  // create
  incidentDetails,
  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listAsset,
  getUsersList,
  getArtifactListAction,
  listLocationUsers,
  getIncidentManagementsubCategoryAction,
  getIncidentManagementsubDispositionAction,
  createIncident,
  editIncident,
  addEvidence,
  // create done
  deleteIncidentAction,
  bulkUpdateIncidentAction,
  getTaskUsers,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(IncidentManagement);
