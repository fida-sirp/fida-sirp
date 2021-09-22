import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import './threat-intelligence.css';
import { connect, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import queryString from 'query-string';
import concat from 'lodash/concat';
import PageHeader from '../../../../../layout/pageHeader';
import SPCog from '../../../../../../components/SPCog';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';

import { AlertBox } from './StyledComponents';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPPageFilters from '../../../../../../components/SPPageFilters';
import SPRiskTag from '../../../../../../components/SPRiskTag';
import SPSelect from '../../../../../../components/SPSelect';
import SPManageFilters from '../../../../../../components/SPManageFilters';
import SPTable from '../../../../../../components/SPTable';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import EyeIconView from '../../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPDrawer from '../../../../../../components/SPDrawer';
import EyeIcon from '../../../../../../assets/svgIcon/eyeIcon';
import SPButton from '../../../../../../components/SPButton';
import { createAdvisoryAction, deleteData, getDisposition, threatIntelligenceStore, threatIntelligenceStoreResetAfterCreate, threatIntelligenceStoreResetAfterUpdate, updateAdvisory } from '../../../../../../actions/threatIntelligence';
import { listDispositions } from '../../../../../../actions/dispositions';
import RiskManagementDrawer from './riskManagementDrawer';

const pageFilterOption = [
    {
        key: 'all',
        value: 'All',
    },
    {
        key: 'pending',
        value: 'Pending',
    },
    {
        key: 'release',
        value: 'Release',
    },
    {
        key: 'threatIntelligenceCases',
        value: 'Threat Intelligence Cases',
    },
];

const manageFilter = [
    {
        key: 'all',
        value: 'All',
    },
    {
        key: 'severity',
        value: 'severity',
    },
    {
        key: 'disposition',
        value: 'Disposition',
    },
    {
        key: 'showing',
        value: 'Showing',
    },
];

const severityFilter = [
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

function RiskManagementDetail({
    selectedSubTab,
    threatIntelligenceStore,
    threatIntelligenceStoreAction,
    deleteDataAction,
    listDispositionsAction,
    onGetDisposition,
    disposition,
    updateDetailsActions,
    threatIntelligenceUpdateAdversory,
    threatIntelligenceCreateAdvosryStoreAction,
    createAdvisoryActionDispatcher,
    threatIntelligenceCreateAdvisory,
}) {
    const history = useHistory();
    // const { confirm } = Modal;
    const [query, setQuery] = useState(location.search);
    const [mypage, setMypage] = useState(1);
    const [showing, setShowing] = useState('20');
    const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
    const [selectedThreatIntelligence, setThreatIntelligence] = useState({});
    const [originData, setOriginData] = useState([{
        iti_id: '1',
        name: 'test',
        iti_severity: 'High',
        iti_lastModified: '2019-9-27 9:25:52',
    }]);
    const [totalCount, setTotalCount] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateAdversory, setshowCreateAdversory] = useState(false);
    const [isCreae] = useState(false);
    const { path } = useParams();

    const onCreateDrawerOpen = () => {
        setIsCreateDrawerVisible(true);
    };
    const onCreateDrawerClose = () => {
        setIsCreateDrawerVisible(false);
    };

    // For the Create Adversory
    const onCreateAdversoryOpen = () => {
        setshowCreateAdversory(true);
    };
    const onCreateAdversoryClose = data => {
        setshowCreateAdversory(false);
    };
    function onEditThreatIntelligence(selectedThreatIntelligence) {
        setThreatIntelligence(selectedThreatIntelligence);
        onCreateDrawerOpen();
    }

    function showConfirm(key) {
        Modal.confirm({
            title: 'Are you sure you want to delete the Threat Intelligence?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            className: 'test',
            onOk() {
                deleteDataAction(key, mypage);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'iti_id',
            editable: false,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            editable: false,
            width: 354,
        },
        {
            title: 'SEVERITY',
            dataIndex: 'iti_severity',
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
            title: 'LAST MODIFIED',
            dataIndex: 'iti_lastModified',
            editable: false,
        },
        {
            title: '',
            dataIndex: 'delete',
            render: key => {
                return (
                    <a
                        onClick={() => {
                            // setAppsInitialState({});
                            // onEditDrawerOpen();
                        }}
                    >
                        <Dustbin />
                    </a>
                );
            },
        }
    ];

    const nonTechnicalVulnerbilityColumns = [
        {
            title: '#',
            dataIndex: 'iti_id',
            editable: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            editable: false,
            width: '90%',
        },
        {
            title: '',
            dataIndex: 'delete',
            render: key => {
                return (
                    <a
                        onClick={() => {
                            // setAppsInitialState({});
                            // onEditDrawerOpen();
                        }}
                    >
                        <Dustbin />
                    </a>
                );
            },
        }
    ];
    const [activeOption, setActiveOption] = useState(
        history.location.pathname.split('/')[2] || 'all'
    );
    const [deleteMessage, setDeleteMessage] = useState();
    const [isDisable, setIsDisable] = useState(true);
    const [dispositionOptions, setDispositionOptions] = useState([]);

    useEffect(() => {
        let optiondata = [];
        optiondata = [
            {
                key: 'all',
                value: 'All',
            },
        ];
        if (disposition && disposition.items && disposition.items.length > 0) {
            filter(disposition.items, element => {
                optiondata.push({
                    key: String(element.add_id),
                    value: String(element.add_name),
                });
            });
        }
        setDispositionOptions(optiondata);
    }, [disposition]);

    useEffect(() => {
        if (Object.keys(threatIntelligenceStore).length !== 0) {
            if (threatIntelligenceStore?.result?.data?.items) {
                const originData = [];
                const resp = threatIntelligenceStore.result.data;
                const myData = resp.items;
                setTotalCount(resp._meta.totalCount);
                setCurrentPage(resp._meta.currentPage);

                // for (let i = 0; i < myData.length; i += 1) {
                //     originData.push({
                //         advisoryName: myData[i]?.advDisposition?.add_name,
                //         categoryName: myData[i]?.advCategory?.adc_name,
                //         advOpenedByName: myData[i]?.advOpenedBy?.usr_name,
                //         advSourceName: myData[i]?.advSource?.dis_name,
                //         typeName: myData[i]?.advAsset?.ast_name,
                //         ...myData[i],
                //     });
                // }

                originData.push({
                    iti_id: '1',
                    name: 'test',
                    iti_severity: 'High',
                    iti_lastModified: '2019-9-27 9:25:52',
                    // iti_id
                });
                setOriginData(originData);
            }
        }
    }, [threatIntelligenceStore]);

    const setFilterRoute = path => {
        if (path === 'all') {
            history.push('/threatIntelligence');
        } else {
            history.push('/threatIntelligence/' + path);
        }
    };

    function isFilterAvilable(queryItem) {
        const filterParm = [
            'adv_severity',
            'adv_disposition',
            'adv_subject',
            'sort',
            'adv_showing',
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
        if (parsedQuery) {
            const queryObject = { payload: {}, AdvisorySearch: {}, QueryString: '' };
            if (parsedQuery.adv_page_no) {
                queryObject.payload.page = parsedQuery.adv_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }
            if (parsedQuery.adv_severity) {
                queryObject.AdvisorySearch.adv_severity = parsedQuery.adv_severity;
            }
            if (parsedQuery.adv_disposition) {
                queryObject.AdvisorySearch.adv_disposition_id =
                    parsedQuery.adv_disposition;
            }
            if (parsedQuery.adv_subject) {
                queryObject.AdvisorySearch.search = parsedQuery.adv_subject;
            }
            if (parsedQuery.adv_showing) {
                queryObject.payload['per-page'] = parsedQuery.adv_showing;
            }
            const AdvisorySearch = queryObject?.AdvisorySearch;
            if (Object.keys(AdvisorySearch).length !== 0) {
                Object.entries(AdvisorySearch).forEach(([key, val]) => {
                    myArrayQry += 'AdvisorySearch[' + key + ']=' + val + '&';
                });
            }

            if (Object.keys(queryObject.payload).length !== 0) {
                Object.entries(queryObject.payload).forEach(([key, val]) => {
                    myArrayQry += key + '=' + val + '&';
                });
            }
        }

        if (location.pathname.split('/').pop() !== 'threatIntelligence') {
            myArrayQry +=
                'AdvisorySearch[adv_type]=' + location.pathname.split('/').pop();
        }

        return myArrayQry;
    }

    const onChangeOption = selectedOptionKey => {
        if (selectedOptionKey === 'threatIntelligenceCases') {
            history.push('/cases/advisory');
        } else {
            setActiveOption(selectedOptionKey);
            setFilterRoute(selectedOptionKey);
            setQuery({});
            const myArrayQryOne = mapQueryWithApi({});
            threatIntelligenceStoreAction({});
        }
    };

    const handleQuery = qs => {
        if (activeOption !== 'all') {
            history.push('/threatIntelligence/' + activeOption + '?' + qs);
        } else {
            history.push('/threatIntelligence?' + qs);
        }
        setQuery(qs);
    };

    useEffect(() => {
        const myArrayQry = mapQueryWithApi(query);
        threatIntelligenceStoreAction({ queryItem: myArrayQry, path });
        listDispositionsAction();
        onGetDisposition();
    }, []);

    const getThreatIntelList = () => {
        const myArrayQry = mapQueryWithApi(query);
        threatIntelligenceStoreAction({ queryItem: myArrayQry, path });
    };

    useEffect(() => {
        getThreatIntelList();
    }, [query]);

    useEffect(() => {
        if (
            threatIntelligenceUpdateAdversory &&
            threatIntelligenceUpdateAdversory?.isSuccess
        ) {
            getThreatIntelList();
        }
    }, [threatIntelligenceUpdateAdversory]);

    useEffect(() => {
        if (
            threatIntelligenceCreateAdvisory &&
            threatIntelligenceCreateAdvisory?.isSuccess
        ) {
            getThreatIntelList();
        }
    }, [threatIntelligenceCreateAdvisory]);
    // const { id } = useParams();
    // const [myPage, setMyPage] = useState(1);
    const {
        adv_severity = 'all',
        adv_showing = '20',
        adv_disposition = 'all',
        adv_page_no = 1,
        adv_subject,
        sort = undefined,
    } = queryString.parse(query);

    useEffect(() => {
        const queryObject = {
            adv_subject: adv_subject,
            ...(adv_showing !== '20' && { adv_showing: adv_showing }),
            ...(adv_severity !== 'all' && { adv_severity: adv_severity }),
            ...(adv_page_no !== 1 && { adv_page_no: adv_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setMypage(adv_page_no);
        setShowing(adv_showing);
        const qs = queryString.stringify(queryObject);
        if (qs) {
            // history.push('/threatIntelligence?' + qs);
        }
    }, [searchText, adv_severity, adv_showing]);

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
        'severity',
        'disposition',
        'showing',
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
                handleChange('adv_disposition', 'all');
            }
            if (item === 'severity') {
                handleChange('adv_severity', 'all');
            }
            if (item === 'showing') {
                handleChange('adv_showing', 20);
            }
        }
    };

    const onPageChange = pageNumber => {
        console.log(pageNumber);
        handleChange('adv_page_no', pageNumber);

        window.scrollTo(0, 0);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter) {
            let columnIndex = sorter.column.dataIndex1 || undefined;

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
    const updateDetails = (id, value) => {
        updateDetailsActions(id, value);
        onCreateDrawerClose();
    };

    const createAdvesory = values => {
        onCreateAdversoryClose();
        createAdvisoryActionDispatcher(values);
    };

    const showActiveTab = () => {
        if (selectedSubTab === 'Technical vulnerabilities') {
            return (
              <>
                <PageHeader
                  title="Technical Vulnerability"
                  options={[
                    <SPButton
                      onButtonClick={onCreateAdversoryOpen}
                      title="Create vulnerability"
                      size="small"
                    />,
                  ]}
                />
                <SPDrawer
                  title="Create Vulnerbility"
                  isVisible={showCreateAdversory}
                  onClose={onCreateAdversoryClose}
                >
                  <RiskManagementDrawer selectedSubTab={selectedSubTab} />
                </SPDrawer>
                <>
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
                        onEnter={() => {}}
                        text={() => {}}
                        onChange={e => { }}
                        size="500px"
                      />
                    </Col>

                    <Col>
                      <SPSelect
                        title="Showing"
                        items={() => {}}
                        selected={ 20}
                        onChange={e => {}}
                      />
                    </Col>
                  </Row>
                  <SPTable
                    columns={columns}
                    dataSource={originData}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    totalRecords={totalCount}
                    showingTill={adv_showing}
                    // handleTableChange={handleTableChange}
                    currentShowing={
                      currentPage === 1
                        ? currentPage
                        : (currentPage - 1) * adv_showing + 1
                    }
                    currentPage={currentPage}
                    // isLoading={threatIntelligenceStore.loading}
                  />
                </>
              </>
            );
        } else if (selectedSubTab === 'Non-technical vulnerabilities') {
            return (<>
                <PageHeader
                    title="Non-technical Vulnerability"
                    options={[
                        <SPButton
                            onButtonClick={onCreateAdversoryOpen}
                            title="Create vulnerability"
                            size="small"
                        />,
                    ]}
                />
                <SPDrawer
                    title="Create Vulnerbility"
                    isVisible={showCreateAdversory}
                    onClose={onCreateAdversoryClose}
                >
                    <RiskManagementDrawer selectedSubTab={selectedSubTab} />
                </SPDrawer>
                <>
                    <Row
                        gutter={[19, 10]}
                        style={{ marginTop: 23, marginBottom: 13, flexWrap: 'flex' }}
                    >
                        <Col>
                            <SPSearch
                                onEnter={() => {}}
                                text={searchText}
                                onChange={e => {  }}
                                size="500px"
                            />
                        </Col>

                             <Col>
                                <SPSelect
                                    title="Showing"
                                    items={showingFilter}
                                    selected={ 20}
                                    onChange={e => {}}
                                />
                            </Col>
                       

                       
                    </Row>
                    <SPTable
                        columns={columns}
                        dataSource={originData}
                        onPageChange={onPageChange}
                        canPaginate
                        emptyText="No Data"
                        totalRecords={totalCount}
                        showingTill={adv_showing}
                        // handleTableChange={handleTableChange}
                        currentShowing={
                            currentPage === 1
                                ? currentPage
                                : (currentPage - 1) * adv_showing + 1
                        }
                        currentPage={currentPage}
                    // isLoading={threatIntelligenceStore.loading}
                    />
                </>
            </>);
        } else if (selectedSubTab === 'Non-technical Severity') {
            return (<>
                <PageHeader
                    title="Non-technical Severity"
                    options={[
                        <SPButton
                            onButtonClick={onCreateAdversoryOpen}
                            title="Create vulnerability"
                            size="small"
                        />,
                    ]}
                />
                <SPDrawer
                    title="Create Vulnerbility"
                    isVisible={showCreateAdversory}
                    onClose={onCreateAdversoryClose}
                >
                    <RiskManagementDrawer selectedSubTab={selectedSubTab} />
                </SPDrawer>
                <>
                    <Row
                        gutter={[19, 10]}
                        style={{ marginTop: 23, marginBottom: 13, flexWrap: 'flex' }}
                    >
                        <Col>
                            <SPSearch
                                onEnter={() => {}}
                                text={searchText}
                                onChange={e => {
                                    setSearchText(e.target.value);
                                }}
                                size="500px"
                            />
                        </Col>

                            <Col>
                                <SPSelect
                                    title="Showing"
                                    items={showingFilter}
                                    selected={20}
                                    onChange={e => {}}
                                />
                            </Col>

                    </Row>
                    <SPTable
                        columns={nonTechnicalVulnerbilityColumns}
                        dataSource={originData}
                        onPageChange={onPageChange}
                        canPaginate
                        emptyText="No Data"
                        totalRecords={totalCount}
                        showingTill={adv_showing}
                        // handleTableChange={handleTableChange}
                        currentShowing={
                            currentPage === 1
                                ? currentPage
                                : (currentPage - 1) * adv_showing + 1
                        }
                        currentPage={currentPage}
                    // isLoading={threatIntelligenceStore.loading}
                    />
                </>
            </>);
        }
        return (<></>);
    };

    return (
        <>
            {showActiveTab()}
        </>
    );
}

const mapStateToProps = state => ({
    // threatIntelligenceUpdateAdversory: state.threatIntelligenceUpdateAdversory,
    threatIntelligenceStore: state.threatIntelligenceStore,
    // disposition: state.threatIntelligenceDisposition.listData,
    // threatIntelligenceCreateAdvisory: state.threatIntelligenceCreateAdvisory,
});

const mapDispatchToProps = dispatch => ({
    threatIntelligenceStoreAction: data => {
        dispatch(threatIntelligenceStoreResetAfterUpdate());
        dispatch(threatIntelligenceStoreResetAfterCreate());
        dispatch(threatIntelligenceStore(data));
    },
    threatIntelligenceCreateAdvosryStoreAction: (...args) => {
        dispatch(createAdvisoryAction(...args));
    },
    deleteDataAction: (...args) => dispatch(deleteData(...args)),
    listDispositionsAction: data => dispatch(listDispositions(data)),
    onGetDisposition: () => dispatch(getDisposition()),
    updateDetailsActions: (...args) => dispatch(updateAdvisory(...args)),
    createAdvisoryActionDispatcher: (...args) =>
        dispatch(createAdvisoryAction(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(RiskManagementDetail);
