import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { compose } from 'redux';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { filter, map, concat, isEmpty } from 'lodash';
import queryString from 'query-string';
import * as Yup from 'yup';
import loaderImg from '../../../../../assets/images/loader.gif';
import {
  StyledDiv,
  StyledCol,
  ExecuteNewAction,
  ArtifectsTitle,
  ArtifectsDescription,
  ModelContentWrapper,
} from './StyledComponents';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import { listIncidentManagement } from '../../../../../actions/incidentManagement';
import {
  automationArtifactList,
  automationArtifactType,
  automationArtifactCreate,
  automationArtifactDelete,
  automationExecutionApplicationList,
  automationExecutionActionList,
  automationExecutionEdit,
  automationArtifectUpdate,
  artifactOccuranceList,
} from '../../../../../actions/automation';

import PageHeader from '../../../../layout/pageHeader';
import SPButton from '../../../../../components/SPButton';
import SPCog from '../../../../../components/SPCog';
import SPSearch from '../../../../../components/SPSearch';
import SPPageFilters from '../../../../../components/SPPageFilters';
import SPRiskTag from '../../../../../components/SPRiskTag';
import SPSelect from '../../../../../components/SPSelect';
import SPManageFilters from '../../../../../components/SPManageFilters';
import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';
import SPTable from '../../../../../components/SPTable';
import EditArtifect from './components/EditArtifacts';
import Dustbin from '../../../../../assets/svgIcon/dustbin';
import PlayButton from '../../../../../assets/svgIcon/playButton';
import SPSummaryBox from '../../../../../components/SPSummaryBox';
import Pencil from '../../../../../assets/svgIcon/pencil';
import EyeViewIcon from '../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPDrawer from '../../../../../components/SPDrawer';
import SelectBox from '../../../../../components/SelectBox';
import { SModal } from '../../../assets/components/TemplateModal/StyledComponents';
import { RowDiv } from '../../../incidentManagement/components/incidentTab/StyledComponents';
import InputBox from '../../../../../components/InputBox';
import { onChangeFilters } from '../../../../../utils/helper.utils';
import { ExecutionBtn } from '../../StyledComponents';

const manageFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'type',
    value: 'Type',
  },
  {
    key: 'validity',
    value: 'Validity',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
];
const validityOptions = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'invalid',
    value: 'Invalid',
  },
  {
    key: 'valid',
    value: 'Valid',
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

const validationSchema = Yup.object({
  app_container_type: Yup.string().required('Required'),
  app_container: Yup.string().required('Required'),
  app_application: Yup.string().required('Required'),
  app_config: Yup.string().required('Required'),
  app_input_type: Yup.string().required('Required'),
  app_input: Yup.string().required('Required'),
});

const initialValues = {
  app_container_type: '',
  app_container: '',
  app_application: '',
  app_action: '',
  app_input_type: '',
  app_input: '',
};
function ArtifactsList({
  Disposition,
  loading,
  automationArtifactList,
  artifactsData,
  automationArtifactType,
  artifactTypeData,
  automationArtifactCreate,
  profile,
  automationArtifactDelete,
  automationExecutionApplicationList,
  executionActionData,
  automationExecutionActionList,
  executionApplicationData,
  automationExecutionEdit,
  automationArtifectUpdate,
  artifactOccuranceList,
  occurenceLoading,
  isLoadingField,
  occurenceData,
  access,
}) {
  const [artifectDataList, setartifectDataList] = useState([]);
  const [occurenceList, setOccurenceList] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [occurenceDrawer, setOccurenceDrawer] = useState(false);
  const [countType, setCountType] = useState('');
  const [dispositionOptions, setDispositionOptions] = useState([
    {
      id: '',
      key: 'executedActions',
      value: 'Executed actions',
    },
    {
      id: '',
      key: 'artifacts',
      value: 'Artifacts',
    },
  ]);
  const [showExecuteDrawer, setShowExecuteDrawer] = useState(false);
  const [selectedAritifect, setSelectedArtifect] = useState({});
  const [showRunArtifectsDrawer, setShowRunArtifectsDrawer] = useState(false);
  const history = useHistory();
  const [showing, setShowing] = useState('20');
  const [activeOption, setActiveOption] = useState('artifacts');
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [typeList, setTypeList] = useState([]);
  const [showEditArtifect, setshowEditArtifect] = useState(false);
  const [originData, setOriginData] = useState([]);
  const [artifactExecutionRecord, setArtifactExecutionRecord] = useState({});
  const [
    artifactExecutionApplicationList,
    setArtifactExecutionApplicationList,
  ] = useState({});
  const [
    artifactExecutionActionList,
    setArtifactExecutionActionList,
  ] = useState({});
  const [
    artifactExecutionConfigList,
    setArtifactExecutionConfigList,
  ] = useState({});
  const [executionUpdate, setExecutionUpdate] = useState(false);

  const handleQuery = qs => {
    if (activeOption !== 'All') {
      history.push('/automationPlayground/' + activeOption + '?' + qs);
    } else {
      history.push('/automationPlayground?' + qs);
    }
    setQuery(qs);
  };

  const setFilterRoute = path => {
    if (path === 'All' || path === 'executedActions') {
      history.push('/automationPlayground');
    } else {
      history.push('/' + path, {
        isAutomation: true,
      });
    }
  };

  const onShowEditArtifect = () => {
    setshowEditArtifect(true);
  };
  const onCloseEditArtifect = () => {
    setshowEditArtifect(false);
  };

  const {
    art_valid = 'all',
    art_type = 'all',
    art_showing = '20',
    art_page_no = 1,
    art_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(art_subject);

  function EditArtifects(record) {
    setSelectedArtifect(record);
    onShowEditArtifect();
  }

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the Artifact?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        automationArtifactDelete(key, myArrayQry);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function setColumnsForSpecificNumber(number) {
    return [
      {
        title: '#',
        dataIndex: 'art_id',
        editable: false,
        key: (text, record, index) => record?.art_id,
        render: (text, record, index) => (number - 1) * showing + index + 1,
      },
      {
        title: 'Artifacts',
        dataIndex: 'art_value',
        editable: false,
        sorter: true,
        width: 354,
        render: (text, record, index) => record?.art_value,
      },

      {
        title: 'Type',
        dataIndex: 'art_type',
        editable: false,
        sorter: true,
        render: (text, record, index) => record?.art_type,
      },
      {
        title: 'Incident Count',
        dataIndex: 'art_incident_container',
        editable: false,
        sorter: true,
        render: (text, record, index) => {
          return !isEmpty(record?.art_incident_container) ? (
            <span
              className="cr-pointer"
              onClick={async () => {
              if(access!==undefined && (access.includes("all-super-admin") || access.includes("occurence-artifacts"))){
                setCountType('incident');
                await artifactOccuranceList({
                  id: record?.art_incident_container,
                  container: 'incident',
                });
                await setOccurenceDrawer(true);
              }}}
            >
              {record?.itiCount}
            </span>
          ) : (
            record?.itiCount
          );
        },
      },
      {
        title: 'ThreatIntel Count',
        dataIndex: 'art_advisory_container',
        editable: false,
        sorter: true,
        render: (text, record, index) => {
          return !isEmpty(record?.art_advisory_container) ? (
            <span
              className="cr-pointer"
              onClick={async () => {
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("occurence-artifacts"))){
                setCountType('advisory');
                await artifactOccuranceList({
                  id: record?.art_advisory_container,
                  container: 'advisory',
                });
                await setOccurenceDrawer(true);
              }}}
            >
              {record?.advCount}
            </span>
          ) : (
            record?.advCount
          );
        },
      },
      {
        title: 'Case Count',
        dataIndex: 'art_case_container',
        editable: false,
        sorter: true,
        render: (text, record, index) => {
          return !isEmpty(record?.art_case_container) ? (
            <span
              className="cr-pointer"
              onClick={async () => {
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("occurence-artifacts"))){
                setCountType('case');
                await artifactOccuranceList({
                  id: record?.art_case_container,
                  container: 'case',
                });
                await setOccurenceDrawer(true);
              }}}
            >
              {record?.caseCount}
            </span>
          ) : (
            record?.caseCount
          );
        },
      },
      {
        title: 'Total Count',
        dataIndex: 'art_occurrence',
        sorter: true,
        render: (text, record, index) => record?.totalCount,
      },
      {
        title: 'Last Occurance',
        dataIndex: 'art_last_occurrence',
        sorter: true,
        render: (text, record, index) =>
          record.art_last_occurrence ? record.art_last_occurrence : '(not set)',
      },
      {
        title: 'Validity',
        dataIndex: 'art_valid',
        editable: false,
        sorter: true,
        render: (text, record, index) => {
          if (record?.art_valid === 'False') {
            return <SPRiskTag type="danger" text={record?.art_valid} />;
          }
          if (record?.art_valid === 'Invalid') {
            return <SPRiskTag type="warning" text={record?.art_valid} />;
          }
          if (record?.art_valid === 'Valid') {
            return <SPRiskTag type="success" text={record?.art_valid} />;
          }
        },
      },
      {
        title: 'Actions',
        dataIndex: 'art_id',
        render: (text, record, index) => {

          const moreItems = [];

          if(access!==undefined && (access.includes("all-super-admin") || access.includes("execute-artifacts"))){
            const executeArtifact=  {
              key: 'play',
              label: 'Play',
              icon: <PlayButton />,
              onClickItem: () => {
                setArtifactExecutionApplicationList({});
                setArtifactExecutionActionList({});
                setArtifactExecutionConfigList({});
                handleArtificatExecute(record);
              },
            };
            moreItems.push(executeArtifact);
          }

          if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-artifacts"))){
            const editArtifact=  {
              key: 'Edit',
              label: 'Edit',
              icon: <Pencil />,
              onClickItem: () => {
                EditArtifects(record);
              },
            };
            moreItems.push(editArtifact);
          }
          if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-artifacts"))){
            const deleteArtifact=  {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: () => showConfirm(record?.art_id),
            };
            moreItems.push(deleteArtifact);
          }

          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        },
      },
    ];
  }
  const [columns, setColumns] = useState(setColumnsForSpecificNumber(1));

  const handleArtificatExecute = record => {
    setShowRunArtifectsDrawer(true);
    setArtifactExecutionRecord(record);
    automationExecutionApplicationList(record.art_value);
  };

  const validityList = [
    { key: 'invalid', value: 'invalid', label: 'Invalid' },
    { key: 'valid', value: 'valid', label: 'Valid' },
  ];

  const handleOccurenceActionClick = id => {
    if (countType === 'incident') {
      history.push(`/incidentManagement/details/${id}`);
    } else if (countType === 'advisory') {
      history.push(`/threatIntelligence/details/${id}`);
    } else if (countType === 'case') {
      history.push(`/case/details/${id}`);
    }
  };

  const occurenceColumn = [
    {
      title: '#',
      dataIndex: 'index',
      key: (text, record, index) => index,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Subject',
      dataIndex: 'adv_title',
      key: (text, record, index) => index,
      render: (text, record, index) =>
        record?.adv_title
          ? record.adv_title
          : record?.iti_subject
            ? record.iti_subject
            : '',
    },
    {
      title: 'Actions',
      dataIndex: 'index',
      key: (text, record, index) => index,
      render: (text, record, index) => {
        return (
          <span
            className="cr-pointer"
            onClick={() => handleOccurenceActionClick(record?.id)}
          >
            <EyeViewIcon />
          </span>
        );
      },
    },
  ];

  function isFilterAvilable(queryItem) {
    const filterParm = [
      'art_valid',
      'art_type',
      'art_subject',
      'sort',
      'art_showing',
      'art_page_no',
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
        ArtifactsSearch: {},
        QueryString: '',
      };

      if (parsedQuery.art_valid) {
        queryObject.ArtifactsSearch.art_valid = parsedQuery.art_valid;
      }
      if (parsedQuery.art_type) {
        queryObject.ArtifactsSearch.art_type = parsedQuery.art_type;
      }
      if (parsedQuery.art_subject) {
        queryObject.ArtifactsSearch.search = parsedQuery.art_subject;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.art_page_no) {
        queryObject.payload.page = parsedQuery.art_page_no;
      }

      if (parsedQuery.art_showing) {
        queryObject.payload['per-page'] = parsedQuery.art_showing;
      }
      const { ArtifactsSearch } = queryObject;
      if (Object.keys(ArtifactsSearch).length !== 0) {
        Object.entries(ArtifactsSearch).forEach(([key, val]) => {
          if (val === 'all') {
            val = '';
          }
          myArrayQry += 'ArtifactsSearch[' + key + ']=' + val + '&';
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

  const onChangeOption = selectedOptionKey => {
    setActiveOption(selectedOptionKey);
    setFilterRoute(selectedOptionKey);
    setQuery({});
  };

  const setTitle = key => {
    let title;
    if (key === 'All' || key === 'Not an Incident') {
      title = 'Create Incident';
    } else {
      title = 'Create ' + key;
    }
    return title;
  };

  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const onChangeManageFilters = (item, selected) => {
    const newItems = onChangeFilters(
      item,
      selected,
      manageFilter,
      selectedFilters
    );

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
    const myArrayQry = mapQueryWithApi(query);
    // listIncidentManagement({
    //   queryItem: myArrayQry,
    // });
    automationArtifactList({
      queryItem: myArrayQry,
    });

    let newItems = [];
    manageFilter.map(item => newItems.push(item.key));
    setSelectedFilters(newItems);
    automationArtifactType();
  }, [query]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(artifactTypeData)) {
      Object.keys(artifactTypeData).map(key =>
        arr.push({
          key,
          value: artifactTypeData[key],
          label: artifactTypeData[key],
        })
      );
    }
    setTypeList(arr);
  }, [artifactTypeData]);

  useEffect(() => {
    if (artifactsData) {
      if (Object.keys(artifactsData).length !== 0) {
        setartifectDataList(artifactsData?.data.items);
        setTotalCount(artifactsData?.data?._meta.totalCount);
        setCurrentPage(artifactsData?.data?._meta.currentPage);
        setColumns(
          setColumnsForSpecificNumber(artifactsData.data?._meta?.currentPage)
        );
      }
    }
  }, [artifactsData]);

  useEffect(() => {
    if (occurenceData?.data) {
      setOccurenceList(occurenceData?.data);
    }
  }, [occurenceData]);

  useEffect(() => {
    if (executionApplicationData) {
      const data = [];
      Object.keys(executionApplicationData).map(key =>
        data.push({
          key: key,
          value: executionApplicationData[key],
          label: executionApplicationData[key],
        })
      );
      setArtifactExecutionApplicationList(data);
    }
  }, [executionApplicationData]);

  useEffect(() => {
    if (executionActionData[0]?.Actions) {
      const data = [],
        configData = [];
      Object.keys(executionActionData[0].Actions).map(key =>
        data.push({
          key: executionActionData[0].Actions[key].act_id,
          value: executionActionData[0].Actions[key].act_name,
          label: executionActionData[0].Actions[key].act_name,
        })
      );
      if (executionActionData[0]?.Config) {
        Object.keys(executionActionData[0].Config).map(key =>
          configData.push({
            key: [key],
            value: executionActionData[0].Config[key],
            label: executionActionData[0].Config[key],
          })
        );
      }
      setArtifactExecutionConfigList(configData);
      setArtifactExecutionActionList(data);
    }
  }, [executionActionData]);
  useEffect(() => {
    const DispositionData = [];
    DispositionData.push(
      {
        id: '',
        key: 'executedActions',
        value: 'Executed actions',
      },
      {
        id: '',
        key: 'artifacts',
        value: 'Artifacts',
      },
      {
        id: '',
        key: 'approval',
        value: 'Apporvals',
      }
    );
    setDispositionOptions(DispositionData);
  }, [Disposition]);

  useEffect(() => {
    let DispositionData = dispositionOptions;
    setDispositionOptions(DispositionData);
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-approval"))){
      let add = true;
      const eleexists = DispositionData.some(el => el.key === 'approval');
      if (eleexists) {
        add = false;
      }
      if (add)
        DispositionData.push({
          id: '',
          key: 'approval',
          value: 'Apporvals',
        });
    }
    setDispositionOptions(DispositionData);
  }, [profile]);

  useEffect(() => {
    const queryObject = {
      art_subject: art_subject,
      ...(art_showing !== '20' && { art_showing: art_showing }),
      ...(art_valid !== 'all' && {
        art_valid: art_valid,
      }),
      ...(art_page_no !== 1 && { art_page_no: art_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(art_showing);
  }, [searchText, art_valid, art_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };
  const onPageChange = pageNumber => {
    handleChange1('art_page_no', pageNumber);
    window.scrollTo(0, 0);
  };
  const handleChange1 = (name, value) => {
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
  const submitArtifact = async values => {
    const payload = {
      art_type: values.app_type,
      art_value: values.app_artifacts,
      art_valid: values.app_validity,
    };
    const myArrayQry = mapQueryWithApi(query);
    automationArtifactCreate(payload, myArrayQry);
    setShowExecuteDrawer(false);
  };

  const onApplicationChange = (name, value) => {
    const appData = artifactExecutionApplicationList.filter(data => {
      return data.value == value;
    });
    automationExecutionActionList({
      id: appData[0].key,
      artifact: artifactExecutionRecord.art_value,
    });
  };

  const submitExecution = async values => {
    const payload = {};
    let config = values.app_config;
    // if (!isArray(executionActionData[0].Config)) {
    //   Object.keys(executionActionData[0].Config).map(k => (config = k));
    // }
    const appDt = artifactExecutionApplicationList.filter(data => {
      return data.value == values.app_application;
    });
    const actionDt = executionActionData[0].Actions.filter(data => {
      return data.act_name == values.app_action;
    });
    payload['config'] = config;
    payload['artifact'] = artifactExecutionRecord?.art_id;
    payload['application'] = appDt[0]?.key;
    payload['action'] = actionDt[0]?.act_id;
    await automationExecutionEdit(payload);
    await setArtifactExecutionConfigList({});
    await setArtifactExecutionActionList({});
    await setArtifactExecutionApplicationList({});
    setShowRunArtifectsDrawer(false);
  };

  const onUpdateValidity = formValue => {
    const myArrayQry = mapQueryWithApi(query);
    automationArtifectUpdate(selectedAritifect?.art_id, formValue, myArrayQry);
    onCloseEditArtifect();
  };

  return (
    <>
      <PageHeader
        title="Automation Playground"
        options={[<SPCog onClick={() => { }} />]}
      />

      <SPDrawer
        title="Edit Artifact"
        isVisible={showEditArtifect}
        onClose={onCloseEditArtifect}
        drawerWidth={800}
      >
        <EditArtifect
          close={onCloseEditArtifect}
          onUpdate={onUpdateValidity}
          selectedArtifect={selectedAritifect}
          isVisible={showEditArtifect}
        />
      </SPDrawer>

      <SPPageFilters
        options={dispositionOptions}
        active={activeOption}
        onChange={onChangeOption}
      />
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flexWrap: 'flex', flex: 1 }}>
          <Col>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onEnter={() => {
                handleChange('art_subject', searchText);
              }}
              size="420px"
            />
          </Col>

          {selectedFilters.includes('type') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Type"
                items={[
                  { key: 'all', value: "All" },
                  ...typeList
                ]}
                selected={art_type || 'all'}
                onChange={e => {
                  handleChange('art_type', e.key == 'all' ? '' : e.key);
                }}
              />
            </Col>
          ) : null}

          {selectedFilters.includes('validity') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Validity"
                items={validityOptions}
                selected={art_valid || 'all'}
                onChange={e => {
                  handleChange('art_valid', e.key == 'all' ? '' : e.key);
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
                selected={art_showing || 20}
                onChange={e => {
                  handleChange('art_showing', e.key);
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
          {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-artifacts'))) ? (
          <ExecutionBtn>
            <Col>
              <SPButton
                onButtonClick={() => {
                  setShowExecuteDrawer(true);
                }}
                title="Add artifact"
                size="small"
              />
            </Col>
          </ExecutionBtn>
            ) : ""}
        </Row>
      </StyledDiv>
      <SPDrawer
        title="Add artifacts"
        isVisible={showExecuteDrawer}
        onClose={() => {
          setShowExecuteDrawer(false);
        }}
        drawerWidth={800}
      >
        <Formik
          id="formik"
          // validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            submitArtifact(values);
            // createAsset(values);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => {
            useEffect(() => {
              resetForm()
            }, [showExecuteDrawer])

            return (
              (
                <Form onSubmit={handleSubmit}>
                  <RowDiv>
                    <SelectBox
                      id="app_type"
                      name="app_type"
                      label="Type"
                      // placeholder="Power Status"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.app_type}
                      value={values.app_type}
                      touched={touched.app_type}
                      width={575}
                      options={typeList}
                      disabled={isSubmitting}
                    />
                  </RowDiv>
                  <RowDiv>
                    <InputBox
                      id="app_artifacts"
                      name="app_artifacts"
                      label="Artifact"
                      // placeholder="Power Status"
                      onInputChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={errors.app_artifacts}
                      value={values.app_artifacts}
                      touched={touched.app_artifacts}
                      width={575}
                      disabled={isSubmitting}
                    />
                  </RowDiv>
                  <RowDiv>
                    <SelectBox
                      id="app_validity"
                      name="app_validity"
                      label="Validity"
                      // placeholder="Power Status"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.app_validity}
                      value={values.app_validity}
                      touched={touched.app_validity}
                      width={575}
                      options={validityList}
                      disabled={isSubmitting}
                    />
                  </RowDiv>

                  <RowDiv>
                    <ExecuteNewAction>
                      <Row >
                        <Col style={{marginRight: '15px'}}>
                          <SPButton
                            onButtonClick={() => {
                              setShowExecuteDrawer(false);
                            }}
                            title="Cancel"
                            size="small"
                          />
                        </Col>
                        <Col>
                          <SPButton
                            type="submit"
                            onButtonClick={handleSubmit}
                            title="Create"
                            size="small"
                          />
                        </Col>
                      </Row>
                    </ExecuteNewAction>
                  </RowDiv>
                </Form>
              )
            )
          }}
        </Formik>
      </SPDrawer>
      <SPDrawer
        title="Execute Action"
        isVisible={showRunArtifectsDrawer}
        onClose={() => {
          setShowRunArtifectsDrawer(false);
        }}
        drawerWidth={800}
      >
        <Formik
          id="formik"
          // validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            submitExecution(values);
            // createAsset(values);
            // resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => {
            useEffect(() => {
              setExecutionUpdate(false)
            }, [showRunArtifectsDrawer])
            return (
              <Form onSubmit={handleSubmit}>
                <RowDiv>
                  <ArtifectsTitle>Artifacts</ArtifectsTitle>
                </RowDiv>
                <RowDiv>
                  <ArtifectsDescription>
                    {artifactExecutionRecord.art_value}
                  </ArtifectsDescription>
                </RowDiv>
                {isEmpty(artifactExecutionApplicationList) && (
                  <ArtifectsTitle>
                    There isn't any application against this artifact!
                  </ArtifectsTitle>
                )}
                {!isEmpty(artifactExecutionApplicationList) && (
                  <RowDiv>
                    <SelectBox
                      id="app_application"
                      name="app_application"
                      label="Application"
                      // placeholder="Power Status"
                      onInputChange={(name, val) => {
                        onApplicationChange(name, val);
                        setFieldValue(name, val);
                      }}
                      onBlur={handleBlur}
                      errorMessage={errors.app_is_deprecated}
                      value={values.app_is_deprecated}
                      touched={touched.app_is_deprecated}
                      width={575}
                      options={artifactExecutionApplicationList}
                    // disabled={isSubmitting}
                    />
                  </RowDiv>
                )}
                {!isEmpty(artifactExecutionConfigList) && (
                  <RowDiv>
                    <SelectBox
                      id="app_config"
                      name="app_config"
                      label="Config"
                      // placeholder="Power Status"
                      onInputChange={(name, val) => {
                        setExecutionUpdate(true);
                        setFieldValue(name, val);
                      }}
                      onBlur={handleBlur}
                      errorMessage={errors.app_config}
                      value={values.app_config}
                      touched={touched.app_config}
                      width={575}
                      options={artifactExecutionConfigList}
                    // disabled={isSubmitting}
                    />
                  </RowDiv>
                )}
                {!isEmpty(artifactExecutionActionList) && (
                  <RowDiv>
                    <SelectBox
                      id="app_action"
                      name="app_action"
                      label="Action"
                      // placeholder="Power Status"
                      onInputChange={(name, val) => {
                        setExecutionUpdate(true);
                        setFieldValue(name, val);
                      }}
                      onBlur={handleBlur}
                      errorMessage={errors.app_is_deprecated}
                      value={values.app_is_deprecated}
                      touched={touched.app_is_deprecated}
                      width={575}
                      options={artifactExecutionActionList}
                    // disabled={isSubmitting}
                    />
                  </RowDiv>
                )}
                {isLoadingField && (
                  <div className="make-child-center">
                    <img src={loaderImg} />
                  </div>
                )}
                <RowDiv>
                  <ExecuteNewAction>
                    <Row gutter={[15, 10]}>
                      <Col>
                        {!isLoadingField && <SPButton
                          onButtonClick={() => {
                            setShowRunArtifectsDrawer(false);
                          }}
                          title="Cancel"
                          size="small"
                        />}
                      </Col>
                      {executionUpdate && (
                        <Col>
                          <SPButton
                            type="submit"
                            onButtonClick={handleSubmit}
                            title="Execute"
                            size="small"
                          />
                        </Col>
                      )}
                    </Row>
                  </ExecuteNewAction>
                </RowDiv>
              </Form>
            )
          }}
        </Formik>
      </SPDrawer>
      <Row gutter={[18, 18]}>
        {map(selectedSummaryFilters, item => {
          return (
            <StyledCol>
              <SPSummaryBox text={item} />
            </StyledCol>
          );
        })}
      </Row>

      <SPTable
        columns={columns}
        dataSource={artifectDataList}
        onPageChange={onPageChange}
        canPaginate
        isLoading={loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * art_showing + 1
        }
        showingTill={art_showing}
      />
      <SModal
        title={'Artifact Occurances'}
        visible={occurenceDrawer}
        onCancel={() => {
          setOccurenceDrawer(false);
          setCountType('');
        }}
        width="1500px"
        footer={[]}
      >
        <ModelContentWrapper style={{overflow: 'auto'}}>
          <SPTable
            columns={occurenceColumn}
            dataSource={occurenceList}
            isLoading={occurenceLoading}
            emptyText="No Data"
            noTitle
          />
        </ModelContentWrapper>
      </SModal>
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
    loading: state.automation.isProcessing,
    occurenceLoading: state.automation.occurenceLoading,
    occurenceData: state.automation.occurenceList,
    artifactsData: state.automation.artifactsData,
    artifactTypeData: state.automation.artifactsTypeData,
    executionApplicationData: state.automation.executionApplicationData,
    executionActionData: state.automation.executionActionData,
    profile: state.userStore.userProfile,
    isLoadingField: state.automation.isFieldLoading,
    access :  state?.userStore?. userProfile?.data?.access,
  };
};

const mapDispatchToProps = {
  listIncidentManagement,
  automationArtifactList,
  automationArtifactType,
  automationArtifactCreate,
  automationArtifactDelete,
  automationExecutionApplicationList,
  automationExecutionActionList,
  automationExecutionEdit,
  automationArtifectUpdate,
  artifactOccuranceList,
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ArtifactsList);
