import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { compose } from 'redux';
import { Row, Col, Modal, Button } from 'antd';
import loaderImg from '../../../assets/images/loader.gif';
import {
  CloseOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { map, isEmpty, isArray } from 'lodash';
import queryString from 'query-string';
import * as Yup from 'yup';
import {
  StyledDiv,
  StyledCol,
  AutomationExecuteAction,
  ExecuteNewAction,
  ExecutionBtn,
  AutomationPopupBody,
  ResultViewWrapper,
} from './StyledComponents';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import { listIncidentSources } from '../../../actions/incidentManagement';
import { RefreshIcon } from '../../../assets/svgIcon';

import {
  listAutomationManagement,
  automationInputList,
  automationCreate,
  automationActionList,
  automationApplicationList,
  deleteAutomationDetail,
  emptyAutomationApplicationList,
  emptyAutomationActionList,
  emptyAutomationInputList,
  automationDetail,
  resetAutomationStore
} from '../../../actions/automation';
import PageHeader from '../../layout/pageHeader';
import SPButton from '../../../components/SPButton';
import SPCog from '../../../components/SPCog';
import SPSearch from '../../../components/SPSearch';
import SPPageFilters from '../../../components/SPPageFilters';
import SPRiskTag from '../../../components/SPRiskTag';
import SPSelect from '../../../components/SPSelect';
import SPManageFilters from '../../../components/SPManageFilters';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import SPTable from '../../../components/SPTable';
import SPTab from '../../../components/SPTab';
import Dustbin from '../../../assets/svgIcon/dustbin';
import SPSummaryBox from '../../../components/SPSummaryBox';
import EyeIcon from '../../../assets/svgIcon/eyeIcon/eye-view';
import SPModal from '../../../components/SPModal';
import SPDrawer from '../../../components/SPDrawer';
import SelectBox from '../../../components/SelectBox';
import { RowDiv } from '../incidentManagement/components/incidentTab/StyledComponents';
import InputBox from '../../../components/InputBox';
import { onChangeFilters } from '../../../utils/helper.utils';
import moment from 'moment';

const manageFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'status',
    value: 'Status',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
];
const statusOptions = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'pending',
    value: 'Pending',
  },
  {
    key: 'complete',
    value: 'Complete',
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
    key: '50',
    value: '50',
  },
];

const validationSchema = Yup.object({
  app_container_type: Yup.string().required('Required'),
  app_container: Yup.string().required('Required'),
  app_application: Yup.string().required('Required'),
  app_action: Yup.string().required('Required'),
  app_input_type: Yup.string().required('Required'),
});

const initialValues = {
  app_application: '',
  app_action: '',
  app_input: '',
  app_query: '',
  sel_name: '',
  sel_description: '',
  sel_template: '',
  sel_policy: '',
  ina_config: '',
};

function AutomationPlayground({
  onListAutomationManagementAction,
  deleteAutomationPlayground,
  loading,
  automationList,
  automationInputData,
  automationActionData,
  automationApplicationData,
  automationApplicationList,
  automationInputList,
  automationActionList,
  automationCreate,
  profile,
  emptyAutomationApplicationList,
  emptyAutomationActionList,
  emptyAutomationInputList,
  automationDetailViewList,
  automationDetailActions,
  isLoadingField,
  resetingAutomationStore,
  access,
}) {
  const [automationDatatList, setAutomationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const history = useHistory();
  const [dispositionOptions, setDispositionOptions] = useState([
    {
      id: '',
      key: 'executedActions',
      value: 'Executed actions',
    },
    // {
    //   id: '',
    //   key: 'artifacts',
    //   value: 'Artifacts',
    // },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showExecuteDrawer, setShowExecuteDrawer] = useState(false);
  const [showAddArtifectsDrawer, setShowAddArtifectsDrawer] = useState(false);
  const [showRunArtifectsDrawer, setShowRunArtifectsDrawer] = useState(false);
  const [applicationData, setApplicationData] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [isMultiForm, setIsMultiForm] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [showBtns, setShowBtns] = useState(false);
  const [queryKey, setQueryKey] = useState([]);
  const [showQuery, setShowQuery] = useState(false);
  const [resultView, setResultView] = useState({});
  const [isResetForm, setResetForm] = useState(false)
  const [showing, setShowing] = useState('20');
  const [activeOption, setActiveOption] = useState('executedActions');
  const [nameOption, setNameOption] = useState([]);
  const [inputFormData, setInputFormData] = useState([]);
  const [descriptionOption, setDescriptionOption] = useState([]);
  const [templateOption, setTemplateOption] = useState([]);
  const [policyOption, setPolicyOption] = useState([]);
  const [configOption, setConfigOption] = useState([]);
  const [isSelectType, setSelectType] = useState(true)
  const [query, setQuery] = useState(location.search);
  const [temp, setTemp] = useState('');
  const [configs, setConfigs] = useState({ showConfig: false });
  const { confirm } = Modal;

  const handleQuery = qs => {
    if (activeOption !== 'executedActions') {
      history.push('/automationPlayground/' + activeOption + '?' + qs);
    } else {
      history.push('/automationPlayground/filters?' + qs);
    }
    setQuery(qs);
  };

  const setFilterRoute = path => {
    if (path === 'executedActions') {
      history.push('/automationPlayground');
    } else {
      history.push('/automationPlayground/' + path);
    }
  };

  const {
    ina_status = 'all',
    ina_showing = '20',
    ina_page_no = 1,
    iti_customer = 'all',
    ina_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(ina_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteAutomationPlayground(key, myArrayQry);
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
        dataIndex: 'ina_id',
        dataIndex1: 'ina_id',
        width: 75,
        editable: false,
        key: (text, record, index) => record.ina_id,
        render: (text, record, index) => (number - 1) * showing + index + 1,
      },
      {
        title: 'Execution Type',
        dataIndex: 'ina_execution_type',
        editable: false,
        width: 175,
        render: (text, record, index) => record?.executionType,
      },
      {
        title: 'Container Type',
        dataIndex: 'ina_module',
        editable: false,
        sorter: true,
        width: 165,
        render: (text, record, index) =>
          record.ina_module ? record.ina_module : '(not set)',
      },
      {
        title: 'Container',
        dataIndex: 'ina_incident_id',
        editable: false,
        sorter: true,
        width: 215,
        render: (text, record, index) =>
          isArray(record?.inaContainer) ? (
            <span
              className="cr-pointer"
              onClick={() => handleContainerClick(record?.ina_incident_id)}
            >
              {record?.inaContainer[0]}
            </span>
          ) : (
            ''
          ),
      },
      {
        title: 'Application',
        dataIndex: 'app_product_name',
        editable: false,
        width: 175,
        render: (text, record, index) =>
          record?.inaAction?.actApp?.app_product_name,
      },
      {
        title: 'Action',
        dataIndex: 'ina_action_id',
        width: 160,
        editable: false,
        sorter: true,
        render: (text, record, index) => record?.inaAction?.act_name,
      },
      {
        title: 'Input',
        sorter: true,
        width: 175,
        dataIndex: 'ina_input',
        render: (text, record, index) => record?.ina_input,
      },
      {
        title: 'Execution Time',
        sorter: true,
        width: 165,
        dataIndex: 'ina_execution_time',
        render: (text, record, index) =>
          record?.ina_execution_time ? record.ina_execution_time : '(not set)',
      },
      {
        title: 'Execution Status',
        dataIndex: 'ina_status',
        width: 200,
        editable: false,
        sorter: true,
        render: (text, record, index) => {
          if (record?.ina_status === 'Pending') {
            return <SPRiskTag type="primary" text={record?.ina_status} />;
          }
          if (record?.ina_status === 'Complete') {
            return <SPRiskTag type="success" text={record?.ina_status} />;
          }
          if (record?.ina_status === "Pending Approval") {
            return <SPRiskTag type="danger" text={record?.ina_status} />;
          }
        },
      },
      {
        title: 'Action',
        dataIndex: 'iti_id',
        width: 55,
        render: (text, record, index) => {

          const moreItems = [];

          if(access!==undefined && (access.includes("all-super-admin") || access.includes("result-automation-playground"))){
            const viewAction=  {
              key: 'view',
              label: 'View',
              icon: <EyeIcon />,
              onClickItem: () => {
                automationDetailActions(record?.ina_id)
                setResultView(record);
                setShowModal(true);
              },
            };
            moreItems.push(viewAction);
          }
          if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-automation-playground"))){
            const deleteAction=  {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: () => showConfirm(record?.ina_id),
            };
            moreItems.push(deleteAction);
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

  const handleContainerClick = id => {
    history.push(`/incidentManagement/details/${id}`);
  };
  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        AutomationPlaygroundSearch: {},
        QueryString: '',
      };
      if (parsedQuery.ina_status) {
        queryObject.AutomationPlaygroundSearch.ina_status =
          parsedQuery.ina_status;
      }
      if (parsedQuery.ina_subject) {
        queryObject.AutomationPlaygroundSearch.search = parsedQuery.ina_subject;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.ina_page_no) {
        queryObject.payload.page = parsedQuery.ina_page_no;
      }
      if (parsedQuery.ina_showing) {
        queryObject.payload['per-page'] = parsedQuery.ina_showing;
      }
      const PlayGroundSearch = queryObject?.AutomationPlaygroundSearch;
      if (Object.keys(PlayGroundSearch).length !== 0) {
        Object.entries(PlayGroundSearch).forEach(([key, val]) => {
          myArrayQry += 'AutomationPlaygroundSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    if (location.pathname.split('/').pop() !== 'automationPlayground') {
      myArrayQry +=
        'AutomationPlaygroundSearch[adv_type]=' +
        location.pathname.split('/').pop();
    }
    return myArrayQry;
  }

  const onChangeOption = selectedOptionKey => {
    if (selectedOptionKey === "apporvals") {
      history.push('/approval', {
        isAutomation: true,
      });
    } else {
      setActiveOption(selectedOptionKey);
      setFilterRoute(selectedOptionKey);
      setQuery({});
    }
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

  useEffect(() => {
    // getAutomationManagementActionList();
    let newItems = [];
    manageFilter.map(item => newItems.push(item.key));
    setSelectedFilters(newItems);
  }, []);

  useEffect(() => {
    getAutomationManagementActionList();
  }, [query]);

  const getAutomationManagementActionList = () => {
    const myArrayQry = mapQueryWithApi(query);
    onListAutomationManagementAction({ queryItem: myArrayQry });
  };

  useEffect(() => {
    if (automationList) {
      if (Object.keys(automationList).length !== 0) {
        setAutomationList(automationList?.data.items);
        setTotalCount(automationList?.data?._meta.totalCount);
        setCurrentPage(automationList?.data?._meta.currentPage);
        setColumns(
          setColumnsForSpecificNumber(automationList.data._meta.currentPage)
        );
      }
    }
  }, [automationList]);

  useEffect(() => {
    let DispositionData = dispositionOptions;
    if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-artifacts"))){
      let add = true;
      const eleexists = DispositionData.some(el => el.key === 'artifacts');
      if (eleexists) {
        add = false;
      }
      if (add)
        DispositionData.push({
          id: '',
          key: 'artifacts',
          value: 'Artifacts',
        });
    }
    setDispositionOptions(DispositionData);
  }, [access]);

  useEffect(() => {
    let DispositionData = dispositionOptions;
    if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-approval"))){
      let add = true;
      const eleexists = DispositionData.some(el => el.key === 'apporvals');
      if (eleexists) {
        add = false;
      }
      if (add)
        DispositionData.push({
          id: '',
          key: 'apporvals',
          value: 'Apporvals',
        });
    }
    setDispositionOptions(DispositionData);
  }, [profile]);

  useEffect(() => {
    const queryObject = {
      ina_subject: ina_subject,
      ...(ina_showing !== '20' && { iti_showing: ina_showing }),
      ...(ina_status !== 'all' && {
        ina_status: ina_status,
      }),
      ...(ina_page_no !== 1 && { ina_page_no: ina_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(ina_showing);
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [searchText, ina_status, ina_showing, iti_customer]);

  useEffect(() => {
    if (showExecuteDrawer) {
      automationApplicationList();
    } else {
      // setApplicationData([]);
      // setActionData([]);
      resetingAutomationStore()
      setShowBtns(false)
    }
  }, [showExecuteDrawer]);

  useEffect(() => {
    if (automationApplicationData?.data) {
      const data = [];
      Object.keys(automationApplicationData.data).map(key =>
        data.push({
          key: key,
          value: automationApplicationData.data[key],
          label: automationApplicationData.data[key],
        })
      );
      setApplicationData(data);
    }
  }, [automationApplicationData]);

  useEffect(() => {
    if (automationActionData?.data) {
      let data = [];
      let data1 = [];

      map(automationActionData.data[0].Actions, (value, key) => {
        data = [
          ...data,
          {
            key: value.act_id,
            value: value.act_id,
            label: value.act_name,
          }
        ]
      });

      if (!isEmpty(automationActionData.data[0].Config)) {
        map(automationActionData.data[0].Config, (value, key,) => {
          data1 = [
            ...data1,
            {
              key: key,
              value: value,
              label: key,
            }
          ]
        });
      }
      setConfigOption(data1);
      setActionData(data);
    }
  }, [automationActionData]);


  useEffect(() => {
    if (!isEmpty(automationInputData)) {
      let configData = configs;
      const labels = automationInputData?.data?.[0]?.[0]?.Labels;

      function preparedOptions(data, key) {
        return data?.map(item => {
          return {
            key,
            value: item,
            label: item
          }
        });
      }

      if (!isEmpty(automationInputData?.data?.[0])) {
        const inputsData = automationInputData?.data?.[0]
        let result = [];
        let labelsKeys = [];
        for (let el in inputsData) {
          let label = Object.keys(inputsData[el].Labels)
          labelsKeys = [...labelsKeys, ...label];
          const inputsWithLabels = labelsKeys.map((item, index) => {
            return {
              key: item,
              label: inputsData[el].Labels[item],
              options: preparedOptions(inputsData[el]?.Input[item], inputsData[el]?.Labels[item]),
              type: 'select'
            }
          });
          result = [...result, ...inputsWithLabels];
        }
        setIsMultiForm(true)
        setInputFormData(result)
      }
      if (!isEmpty(labels)) {
        configData['showConfig'] = true;
      }
      setConfigs(configData);
    }
    if (
      !isEmpty(automationInputData) &&
      !isEmpty(automationInputData?.data[0]?.Input)
    ) {
      const arr = [];
      let inputKey = '';
      Object.keys(automationInputData?.data[0]?.Input).map(
        key => (inputKey = key)
      );
      Object.keys(automationInputData?.data[0]?.Input[inputKey]).map(k =>
        arr.push({
          key: k,
          value: automationInputData?.data[0]?.Input[inputKey][k],
          label: automationInputData?.data[0]?.Input[inputKey][k],
        })
      );
      setQueryKey(inputKey);
      setQueryData(arr);
      setShowQuery(true);
    } else setShowQuery(false);
  }, [automationInputData]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };

  const onPageChange = pageNumber => {
    handleChange('ina_page_no', pageNumber);
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

  const onApplicationChange = (name, value) => {
    setConfigs({ showConfig: false })
    const appData = applicationData.filter(data => data.value == value);
    automationActionList({ id: appData[0].key });
  };

  const onActionChange = (name, value) => {
    const appData = actionData.filter(data => data.value == value);
    automationInputList({ id: appData[0].key });
  };

  const submitAutomation = async values => {
    const appDt = applicationData.filter(data => {
      if (data.value === values.app_application) return data.key;
    });
    const queryItem = mapQueryWithApi(query);
    automationCreate(values, queryItem);
    emptyAutomationInputList();
    emptyAutomationApplicationList();
    emptyAutomationActionList();
    closeExecuteDrawer();
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const showInputField = (key, index, values) => {
    Object.values(inputFormData).forEach(e => {
      if (e.key === key) {
        e.type = 'input';
      }
    });
    setInputFormData([...inputFormData])
  }

  const showSelectField = (key, index) => {
    Object.values(inputFormData).forEach(e => {
      if (e.key === key) {
        e.type = 'select';
      }
    });
    setInputFormData([...inputFormData])
  }


  const closeExecuteDrawer = () => {
    setApplicationData([]);
    setActionData([]);
    setConfigOption([])
    resetAutomationStore()
    setShowExecuteDrawer(false);
    setConfigs({
      showConfig: false
    });
    setTemp(moment());
  };

  return (
    <>
      <PageHeader
        title="Automation Playground"
        options={[<SPCog onClick={() => { }} />]}
      />

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
                handleChange('ina_subject', searchText);
              }}
              size="420px"
            />
          </Col>

          {selectedFilters.includes('showing') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Showing"
                items={showingFilter}
                selected={ina_showing || 20}
                onChange={e => {
                  handleChange('ina_showing', e.key);
                }}
              />
            </Col>
          ) : null}

          <ExecutionBtn>
            {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-automation-playground'))) ? (
            <Col>
              <SPButton
                onButtonClick={() => {
                  setShowExecuteDrawer(true);
                  setTemp(moment());
                }}
                title="Execute new action"
                size="small"
              />
            </Col>
              ) : ""}
            <Col>
              <SPButton
                onButtonClick={getAutomationManagementActionList}
                icon={<RefreshIcon size={24} />}
                size="small"
              />
            </Col>
          </ExecutionBtn>
        </Row>
      </StyledDiv>

      <SPDrawer
        title="Execute new action"
        isVisible={showExecuteDrawer}
        onClose={closeExecuteDrawer}
        drawerWidth={800}
      >
        {showExecuteDrawer && (
          <Formik
            id="formik"
            initialValues={{}}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              submitAutomation(values);
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
                // console.log(">>>>reseting")
                resetAutomationStore()
                setConfigs({ showConfig: false })
              }, [showExecuteDrawer])
              return (
                <Form onSubmit={handleSubmit}>
                  {!isEmpty(applicationData) && (
                    <RowDiv>
                      <SelectBox
                        showSearch
                        id="applications"
                        name="applications"
                        label="Application"
                        onInputChange={(name, val) => {
                          onApplicationChange(name, val);
                          setFieldValue(name, val);
                        }}
                        onBlur={handleBlur}
                        errorMessage={errors.applications}
                        value={values.applications}
                        touched={touched.applications}
                        width={575}
                        options={applicationData}
                      />
                    </RowDiv>
                  )}
                  {!isEmpty(configOption) && (
                    <RowDiv>
                      <SelectBox
                        id="ina_config"
                        name="ina_config"
                        label="Config"
                        onInputChange={(name, val) => {
                          setFieldValue(name, val);
                        }}
                        onBlur={handleBlur}
                        errorMessage={errors.ina_config}
                        value={values.ina_config}
                        touched={touched.ina_config}
                        width={575}
                        options={configOption}
                        disabled={isSubmitting}
                      />
                    </RowDiv>
                  )}
                  {!isEmpty(actionData) && (
                    <RowDiv>
                      <SelectBox
                        id="ina_action_id"
                        name="ina_action_id"
                        label="Action"
                        onInputChange={(name, val) => {
                          onActionChange(name, val);
                          setFieldValue(name, val);
                        }}
                        onBlur={handleBlur}
                        errorMessage={errors.ina_action_id}
                        value={values.ina_action_id}
                        touched={touched.ina_action_id}
                        width={575}
                        options={actionData}
                        disabled={isSubmitting}
                      />
                    </RowDiv>
                  )}
                  {!isEmpty(automationInputData) && (
                    <RowDiv>
                      <InputBox
                        id="ina_input"
                        name="ina_input"
                        label="Input"
                        onInputChange={e => {
                          if (e.target.value) {
                            setShowBtns(true);
                          } else { setShowBtns(false) }
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        errorMessage={errors.ina_input}
                        value={values.ina_input}
                        touched={touched.ina_input}
                        width={575}
                        disabled={isSubmitting}
                      />
                    </RowDiv>
                  )}
                  {configs.showConfig && (
                    <>
                      {inputFormData && inputFormData?.map((item, index) => {
                        return (
                          <RowDiv>
                            {item.type === 'select' ? <>
                              <SelectBox
                                id={item?.key}
                                name={item?.key}
                                label={item?.label}
                                onInputChange={setFieldValue}
                                onBlur={handleBlur}
                                errorMessage={errors.sel_name}
                                value={values?.[item?.key]}
                                touched={touched?.[item?.key]}
                                width={575}
                                options={item?.options || []}
                                disabled={isSubmitting}
                              />
                              <Button
                                onClick={() => {
                                  setFieldValue(item?.key, '')
                                  showInputField(item.key, index)
                                }}
                                type="primary"
                                className="cross-add-btn"
                                style={{
                                  borderColor: '#33C758',
                                  background: '#33C758',
                                  margin: '2px',
                                }}
                                icon={<PlusOutlined />}
                                size="small"
                              ></Button>
                            </> : <>
                              <InputBox
                                id={item?.key}
                                name={item?.key}
                                label={item?.label}
                                onInputChange={handleChange}
                                placeholder={item?.label}
                                onBlur={handleBlur}
                                errorMessage={errors.sel_name}
                                value={values?.[item?.key]}
                                touched={touched?.[item?.key]}
                                width={575}
                                disabled={isSubmitting}
                              />
                              <Button
                                onClick={() => {
                                  setFieldValue(item?.key, '')
                                  showSelectField(item.key, index)
                                }}
                                type="primary"
                                className="cross-add-btn"
                                style={{
                                  borderColor: 'red',
                                  background: 'red',
                                  margin: '2px',
                                }}
                                icon={<CloseOutlined />}
                                size="small"
                              ></Button>
                            </>
                            }
                          </RowDiv>
                        )
                      })}
                    </>
                  )}
                  {/* {showQuery && ( */}
                  <RowDiv>
                    <SelectBox
                      id="app_query"
                      name="app_query"
                      label="Query"
                      onInputChange={setFieldValue}
                      onBlur={handleBlur}
                      errorMessage={errors.app_query}
                      value={values.app_query}
                      touched={touched.app_query}
                      width={575}
                      options={queryData}
                      disabled={isSubmitting}
                      isHide={!showQuery}
                    />
                  </RowDiv>
                  {isLoadingField && (
                    <div className="make-child-center">
                      <img src={loaderImg} />
                    </div>
                  )}
                  <RowDiv>
                    <ExecuteNewAction>
                      <Row justify="end">
                        <Col style={{ marginRight: 10 }}>
                          {!isLoadingField && <SPButton
                            onButtonClick={() => {
                              closeExecuteDrawer();
                              resetForm();
                            }}
                            title="Cancel"
                            size="small"
                          />
                          }
                        </Col>
                        {showBtns && (
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

        )}
      </SPDrawer>
      <SPDrawer
        title="Profile"
        isVisible={showAddArtifectsDrawer}
        onClose={() => {
          setShowAddArtifectsDrawer(false);
        }}
        drawerWidth={800}
      />
      <SPDrawer
        title="Profile"
        isVisible={showRunArtifectsDrawer}
        onClose={() => {
          setShowRunArtifectsDrawer(false);
        }}
        drawerWidth={800}
      />
      <Row gutter={[18, 18]}>
        {map(selectedSummaryFilters, item => {
          return (
            <StyledCol>
              <SPSummaryBox text={item} />
            </StyledCol>
          );
        })}
      </Row>
      <SPModal
        visible={showModal}
        onOk={() => console.log('Open')}
        onCancel={onCloseModal}
        width={950}
        footer={null}
      >
        <Row>
          <Col span={24} style={{ textAlign: "center", marginBottom: 20 }}>
            <img src={automationDetailViewList?.data?.[1].actApp?.image?.link} loading="lazy" />
          </Col>
        </Row>
        <SPTab
          tabs={[
            {
              title: resultView?.inaAction?.act_name,
              key: resultView?.inaAction?.act_name,
              component: (
                <>
                  {resultView?.ina_output_html ? (
                    <AutomationPopupBody dangerouslySetInnerHTML={{ __html: resultView?.ina_output_html }} />
                  ) : (
                    <ResultViewWrapper>{resultView?.ina_output}</ResultViewWrapper>
                  )}
                </>
              ),
            }
          ]}
          showScroll={false}
        />
      </SPModal>
      <SPTable
        columns={columns}
        dataSource={automationDatatList}
        onPageChange={onPageChange}
        canPaginate
        isLoading={loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * ina_showing + 1
        }
        showingTill={ina_showing}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    Sources: state.incidentSourcesStore.listData,
    Customers: state.incidentCustomersStore.listData,
    Severity: state.incidentSeverityStore.listData,
    Disposition: state.incidentDispositionStore.listData,
    loading: state.automation.isProcessing,
    automationList: state.automation.listData,
    automationApplicationData: state.automation.applicationData,
    automationActionData: state.automation.actionData,
    automationInputData: state.automation.inputData,
    automationStore: state.automation,
    profile: state.userStore.userProfile,
    automationDetailViewList: state.automation.userData,
    isLoadingField: state.automation.isFieldLoading,
    access :  state?.userStore?. userProfile?.data?.access
  };
};

const mapDispatchToProps = dispatch => ({
  automationInputList: payload => dispatch(automationInputList(payload)),
  automationApplicationList: payload =>
    dispatch(automationApplicationList(payload)),
  emptyAutomationApplicationList: () =>
    dispatch(emptyAutomationApplicationList()),
  emptyAutomationActionList: () => dispatch(emptyAutomationActionList()),
  emptyAutomationInputList: () => dispatch(emptyAutomationInputList()),
  automationActionList: payload => dispatch(automationActionList(payload)),
  automationCreate: (...args) => dispatch(automationCreate(...args)),
  onListAutomationManagementAction: (...args) =>
    dispatch(listAutomationManagement(...args)),
  deleteAutomationPlayground: (...args) =>
    dispatch(deleteAutomationDetail(...args)),
  listIncidentSources: () => dispatch(listIncidentSources()),
  automationDetailActions: (...args) => dispatch(automationDetail(...args)),
  resetingAutomationStore: () => dispatch(resetAutomationStore())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(AutomationPlayground);
