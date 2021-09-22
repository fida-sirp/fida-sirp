import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { compose } from 'redux';
import { Row, Col, Modal, Button, message, Space, Dropdown } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { filter, map, concat, find } from 'lodash';
import queryString from 'query-string';
import * as Yup from 'yup';
import {
  StyledDiv,
  StyledCol,
  ExecuteNewAction,
  ArtifectsTitle,
  ArtifectsDescription,
  DeleteBox,
} from './StyledComponents';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import { automationApprovalsList, approveRecord } from '../../../../../actions/automation';
import PageHeader from '../../../../layout/pageHeader';
import SPButton from '../../../../../components/SPButton';
import SPCog from '../../../../../components/SPCog';
import SPSearch from '../../../../../components/SPSearch';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import SPPageFilters from '../../../../../components/SPPageFilters';
import SPRiskTag from '../../../../../components/SPRiskTag';
import SPSelect from '../../../../../components/SPSelect';
import SPManageFilters from '../../../../../components/SPManageFilters';
import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';
import SPTable from '../../../../../components/SPTable';
import Dustbin from '../../../../../assets/svgIcon/dustbin';
import PlusIcon from '../../../../../assets/svgIcon/plusIcon';
import SPSummaryBox from '../../../../../components/SPSummaryBox';
import EyeIcon from '../../../../../assets/svgIcon/eyeIcon';
import SPModal from '../../../../../components/SPModal';
import SPDrawer from '../../../../../components/SPDrawer';
import SelectBox from '../../../../../components/SelectBox';
import { RowDiv } from '../../../incidentManagement/components/incidentTab/StyledComponents';
import { onChangeFilters } from '../../../../../utils/helper.utils';
import { isEmpty } from 'lodash';
import TickIcon from '../../../../../assets/svgIcon/tick';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';

const manageFilter = [
  {
    key: 'all',
    value: 'All',
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

const statusOptions = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'declined',
    value: 'Declined',
  },
  {
    key: 'approved',
    value: 'Approved',
  },
  {
    key: 'pending',
    value: 'Pending',
  },
];

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

const moreItems = [
  {
    key: 'pdf',
    label: 'PDF',
  },
  {
    key: 'excel',
    label: 'Excel',
  },
];
const validationSchema = Yup.object({
  app_container_type: Yup.string().required('Required'),
  app_container: Yup.string().required('Required'),
  app_application: Yup.string().required('Required'),
  app_action: Yup.string().required('Required'),
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
function ApprovalList({
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
  automationApprovalsList,
  approvalsList,
  loading,
  title,
  showTabHeader,
  onApproveRecord,
  access,
}) {
  const location = useLocation()
  const [approvalList, setApprovalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [dispositionOptions, setDispositionOptions] = useState([]);
  const [showViewExecutedModal, setShowViewExecutedModal] = useState(false);
  const [showExecuteDrawer, setShowExecuteDrawer] = useState(false);
  const [showRunArtifectsDrawer, setShowRunArtifectsDrawer] = useState(false);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [activeOption, setActiveOption] = useState('apporvals');
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const pathname = history.location.pathname;

  const handleQuery = qs => {
    const redirectPath = activeOption !== 'All' && pathname !== '/approval' ? `${pathname}/${activeOption}?${qs}` : `${pathname}?${qs}`
    history.push(redirectPath);
    setQuery(qs);
  };

  const setFilterRoute = path => {
    const redirectPath = path === 'All' || path === 'executedActions' && pathname !== '/approval' ? pathname : `${pathname}/${path}`;
    history.push(redirectPath);
  };

  const {
    aap_status = 'all',
    aap_showing = '20',
    aap_page_no = 1,
    aap_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(aap_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        // deleteDataAction(key, mypage);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const containerTypeList = [
    {
      key: 'default',
      value: '',
      label: 'Select Your Option Here',
      disabled: true,
    },
    { key: 'Software', value: 'Software', label: 'Software' },
    { key: 'Hardware', value: 'Hardware', label: 'Hardware' },
    { key: 'Information', value: 'Information', label: 'Information' },
    { key: 'People', value: 'People', label: 'People' },
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'iti_id',
      editable: false,
      key: (text, record, index) => record.aap_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Application',
      dataIndex: 'iti_application',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_app_name,
    },
    {
      title: 'Action',
      dataIndex: 'iti_action',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_act_name,
    },
    {
      title: 'Execution Method',
      dataIndex: 'iti_execution_method',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_source,
    },
    {
      title: 'Status',
      dataIndex: 'iti_status',
      editable: false,
      render: (text, record, index) => record?.aap_status,
    },
    {
      title: 'Container Type',
      dataIndex: 'iti_container_type',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_container,
    },
    {
      title: 'Container',
      dataIndex: 'iti_container',
      width: 265,
      sorter: true,
      render: (text, record, index) => {
        return (
          <a
            href={`/incidentManagement/details/${record?.aap_rid}`}
            target="_blank"
          >
            {record?.appContainer?.[0]}
          </a>
        );
      },
    },
    {
      title: 'Updated By',
      dataIndex: 'iti_updated_by',
      sorter: true,
      render: (text, record, index) => record?.aapApprovedBy?.usr_name,
    },
    {
      title: 'Updated At',
      dataIndex: 'iti_updated_at',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_approved_at,
    },
    {
      title: 'Initiated At',
      dataIndex: 'iti_initiated_at',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.aap_created_at,
    },
    {
      title: 'Actions',
      dataIndex: 'iti_initiated_at',
      editable: false,
      width: 75,
      render: (text, record, index) => {
        return isEmpty(record.aapApprovedBy) ? (
          <DeleteBox>
             {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('approve-application-approval'))) ? (
            <a className="mr-lt-50" onClick={() => onApproveRecord(record?.aap_id, true)}>
              <TickIcon />
            </a>
              ) : ""}
            <a onClick={() => onApproveRecord(record?.aap_id, false)}>
              <CancelIcon />
            </a>
          </DeleteBox>
        ) : null;
      },
    },
  ];
  const viewExecutedColumns = [
    {
      title: 'CITY',
      dataIndex: 'iti_city',
      editable: false,
      width: 100,
    },
    {
      title: 'IP',
      dataIndex: 'iti_ip',
      editable: false,
      width: 100,
    },
    {
      title: 'REGION',
      dataIndex: 'iti_region',
      editable: false,
      render: (text, record, index) => {
        let source = '';
        if (record.itiSource) {
          source = record.itiSource.dis_name;
        }
        return source;
      },
      width: 100,
    },
    {
      title: 'TIMEZONE',
      dataIndex: 'iti_timezone',
      editable: false,
      render: key => {
        let customerName = '';
        if (key && Customers?.success) {
          customerName = Customers.data[key];
        }
        return customerName;
      },
      width: 100,
    },
    {
      title: 'COUNTRY',
      dataIndex: 'iti_country',
      editable: false,
      width: 100,
    },
    {
      title: 'ORG',
      dataIndex: 'iti_org',
      editable: false,
      width: 100,
    },
    {
      title: 'POSTAL',
      dataIndex: 'iti_postal',
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
      width: 100,
    },
  ];

  function isFilterAvilable(queryItem) {
    const filterParm = [
      'aap_status',
      'aap_subject',
      'sort',
      'aap_showing',
      'aap_page_no',
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
        ApplicationApprovalSearch: {},
        QueryString: '',
      };
      if (parsedQuery.aap_status) {
        queryObject.ApplicationApprovalSearch.aap_status =
          parsedQuery.aap_status;
      }
      if (parsedQuery.aap_subject) {
        queryObject.ApplicationApprovalSearch.search = parsedQuery.aap_subject;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.aap_page_no) {
        queryObject.payload.page = parsedQuery.aap_page_no;
      }

      if (parsedQuery.aap_showing) {
        queryObject.payload['per-page'] = parsedQuery.aap_showing;
      }
      const { ApplicationApprovalSearch } = queryObject;
      if (Object.keys(ApplicationApprovalSearch).length !== 0) {
        Object.entries(ApplicationApprovalSearch).forEach(([key, val]) => {
          if (val === 'all') {
            val = '';
          }
          myArrayQry += 'ApplicationApprovalSearch[' + key + ']=' + val + '&';
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

  useEffect(() => {
    let newItems = [];
    manageFilter.map(item => newItems.push(item.key));
    setSelectedFilters(newItems);
  }, []);

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
    automationApprovalsList({ queryItem: myArrayQry });
  }, [query]);

  const [severityOptions, setSeverityOptions] = useState([]);
  useEffect(() => {
    const SeverityData = [];
    SeverityData.push(
      { key: 'containerType', value: 'Container type', label: 'All' },
      { key: 'status', value: 'Status', label: 'All' },
      { key: 'showign', value: 'Showing', label: '10' }
    );
    setSeverityOptions(SeverityData);
  }, [Severity]);

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
        key: 'apporvals',
        value: 'Apporvals',
      }
    );
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

  useEffect(() => {
    if (approvalsList?.data?.items) {
      if (Object.keys(approvalsList).length !== 0) {
        setApprovalList(approvalsList.data.items);
        setTotalCount(approvalsList.data._meta.totalCount);
        setCurrentPage(approvalsList.data._meta.currentPage);
      }
    }
  }, [approvalsList]);

  useEffect(() => {
    const queryObject = {
      aap_subject: aap_subject,
      ...(aap_showing !== '20' && { aap_showing: aap_showing }),
      ...(aap_status !== 'all' && {
        aap_status: aap_status,
      }),
      ...(aap_page_no !== 1 && { aap_page_no: aap_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(aap_showing);
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [searchText, aap_status, aap_showing]);

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
    updateObjectUrl('aap_page_no', pageNumber);
    const myArrayQry = mapQueryWithApi(query);
    automationApprovalsList({ queryItem: myArrayQry });
    updateObjectUrl('aap_page_no', pageNumber);
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

  return (
    <>
      <Col style={{ width: '120px' }}>
        <SPButton
          title="Back"
          size="small"
          onButtonClick={() => {
            console.log(">>>", location.isAutomation)
            if (location?.state?.isAutomation) {
              history.push('/automationPlayground');
            } else {
              history.push('/approval-workflow');
            }
          }}
        />
      </Col>
      <PageHeader title={title} options={[<SPCog onClick={() => { }} />]} />

      {showTabHeader && (
        <SPPageFilters
          options={dispositionOptions}
          active={activeOption}
          onChange={onChangeOption}
        />
      )}
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flexWrap: 'flex', flex: 1 }}>
          <Col>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onEnter={() => {
                handleChange('aap_subject', searchText);
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
                selected={aap_showing || 20}
                onChange={e => {
                  handleChange('aap_showing', e.key);
                }}
              />
            </Col>
          ) : null}
          {/* <Col>
            <SPManageFilters
              items={manageFilter}
              onChange={onChangeManageFilters}
              selectedItems={selectedFilters}
            />
          </Col> */}
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
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
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
          }) => (
            <Form>
              <RowDiv>
                <SelectBox
                  id="app_artifacts"
                  name="app_artifacts"
                  label="Artifacts"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_is_deprecated}
                  value={values.app_is_deprecated}
                  touched={touched.app_is_deprecated}
                  width={575}
                  options={containerTypeList}
                  disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <SelectBox
                  id="app_type"
                  name="app_type"
                  label="Type"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_is_deprecated}
                  value={values.app_is_deprecated}
                  touched={touched.app_is_deprecated}
                  width={575}
                  options={containerTypeList}
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
                  errorMessage={errors.app_is_deprecated}
                  value={values.app_is_deprecated}
                  touched={touched.app_is_deprecated}
                  width={575}
                  options={containerTypeList}
                  disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <ExecuteNewAction>
                  <Row gutter={[19, 10]}>
                    <Col>
                      <SPButton
                        onButtonClick={() => {
                          setShowExecuteDrawer(false);
                        }}
                        title="Cancel"
                        size="small"
                      />
                      ,
                    </Col>
                    <Col>
                      <SPButton
                        onButtonClick={() => {
                          setShowRunArtifectsDrawer(true);
                        }}
                        title="Create"
                        size="small"
                      />
                      ,
                    </Col>
                  </Row>
                </ExecuteNewAction>
              </RowDiv>
            </Form>
          )}
        </Formik>
      </SPDrawer>
      <SPDrawer
        title="Update artifacts"
        isVisible={showRunArtifectsDrawer}
        onClose={() => {
          setShowRunArtifectsDrawer(false);
        }}
        drawerWidth={800}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
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
          }) => (
            <Form>
              <RowDiv>
                <ArtifectsTitle>Artifacts</ArtifectsTitle>
              </RowDiv>
              <RowDiv>
                <ArtifectsDescription>
                  dfdfdfdfdddddddddddddfdfdfdf
                </ArtifectsDescription>
              </RowDiv>
              <RowDiv>
                <SelectBox
                  id="app_application"
                  name="app_application"
                  label="Application"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_is_deprecated}
                  value={values.app_is_deprecated}
                  touched={touched.app_is_deprecated}
                  width={575}
                  options={containerTypeList}
                  disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <SelectBox
                  id="app_action"
                  name="app_action"
                  label="Action"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_is_deprecated}
                  value={values.app_is_deprecated}
                  touched={touched.app_is_deprecated}
                  width={575}
                  options={containerTypeList}
                  disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <ExecuteNewAction>
                  <Row gutter={[19, 10]}>
                    <Col>
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
                        onButtonClick={() => {
                          setShowRunArtifectsDrawer(true);
                        }}
                        title="Create"
                        size="small"
                      />
                    </Col>
                  </Row>
                </ExecuteNewAction>
              </RowDiv>
            </Form>
          )}
        </Formik>
      </SPDrawer>
      {showViewExecutedModal && (
        <SPModal
          title="View executed"
          centered
          visible={true}
          // onOk={() => onClose()}
          onCancel={() => setShowViewExecutedModal(false)}
          width={950}
          footer={null}
        >
          <SPTable
            columns={viewExecutedColumns}
            dataSource={[]}
            onPageChange={onPageChange}
            // canPaginate
            isLoading={loading}
            emptyText="No Data"
            currentPage={currentPage}
            totalRecords={totalCount}
            handleTableChange={handleTableChange}
            currentShowing={
              currentPage === 1
                ? currentPage
                : (currentPage - 1) * aap_showing + 1
            }
            showingTill={aap_showing}
            noTitle
          />
        </SPModal>
      )}
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
        dataSource={approvalList}
        onPageChange={onPageChange}
        canPaginate
        isLoading={loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * aap_showing + 1
        }
        showingTill={aap_showing}
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
    loading: state.automation.isProcessing,
    approvalsList: state.automation.approvalsData,
    access :  state?.userStore?. userProfile?.data?.access,
  };
};

// const mapDispatchToProps = {
//   automationApprovalsList,
//   onApproveRecord
// };

const mapDispatchToProps = dispatch => ({
  automationApprovalsList: (...args) =>
    dispatch(automationApprovalsList(...args)),
  onApproveRecord: (id, shouldApprove) =>
    dispatch(approveRecord(id, shouldApprove)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ApprovalList);
