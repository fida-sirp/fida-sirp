import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'formik'
import {
    administratorCasesNcissPerioritieCreate,
    administratorCasesNcissPerioritieDelete,
    administratorCasesNcissPerioritiesList,
    administratorCasesNcissPerioritieUpdate
} from '../../../../../../../../../actions/administration';
import { useHistory } from 'react-router-dom'
import { Modal } from 'antd'
import queryString from 'query-string';
import PlusIcon from '../../../../../../../../../assets/svgIcon/plusIcon';
import PageHeader from '../../../../../../../../layout/pageHeader';
import SPButton from '../../../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../../../components/SPTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Dustbin from '../../../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../../../assets/svgIcon/pencil';
import SPSingleSelectDropdown from '../../../../../../../../../components/SPSingleSelectDropdown';
import NcissPrioritesSideDrawer from './Components/NcissPrioritesSideDrawer'
import AuthTokenHOC from '../../../../../../../../../HOCs/AuthTokenHOC';

const { confirm } = Modal;
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

const Periority = ({ onChangeView, onGetNcissPeriorities, loading, perioritiesList, onUpdateNcissPerioritie, onCreateNcissPerioritie, onDeleteNcissPerioritie,access }) => {
    const [showCreateDrawer, setshowCreateDrawer] = useState(false);
    const [showEditSidebar, setshowEditSidebar] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [perioritiesListItem, setPerioritiesListItem] = useState([])
    const [ncissItemList, setNcissItemList] = useState([]);
    const [record, setRecord] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const [query, setQuery] = useState(location.search);
    const history = useHistory();

    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want to delete the case?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myQuery = mapQueryWithApi(query)
                onDeleteNcissPerioritie(key, myQuery);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const {
        nsc_showing = '20',
        nsc_page_no = 1,
        nsc_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push('/administration?' + qs);
        setQuery(qs);
    };

    const [searchText, setSearchText] = useState(nsc_subject);

    function mapQueryWithApi(queryItem) {
        let myArrayQry = '';
        const parsedQuery = queryString.parse(queryItem);
        if (parsedQuery) {
            const queryObject = {
                payload: {},
                NcisScoringCategoriesSearch: {},
                QueryString: '',
            };
            if (parsedQuery.nsc_subject) {
                queryObject.NcisScoringCategoriesSearch.search = parsedQuery.nsc_subject;
            }
            if (parsedQuery.sort) {
                queryObject.NcisScoringCategoriesSearch.sort = parsedQuery.sort;
            }
            if (parsedQuery.nsc_page_no) {
                queryObject.payload.page = parsedQuery.nsc_page_no;
            }
            if (parsedQuery.nsc_showing) {
                queryObject.payload['per-page'] = parsedQuery.nsc_showing;
            }
            const { NcisScoringCategoriesSearch } = queryObject;
            if (Object.keys(NcisScoringCategoriesSearch).length !== 0) {
                Object.entries(NcisScoringCategoriesSearch).forEach(([key, val]) => {
                    myArrayQry += 'NcisScoringCategoriesSearch[' + key + ']=' + val + '&';
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
        onGetNcissPeriorities({ queryItem: myArrayQry });
    }, [query]);

    useEffect(() => {
        if (perioritiesList) {
            if (Object.keys(perioritiesList).length !== 0) {
                setPerioritiesListItem(perioritiesList?.items);
                setTotalCount(perioritiesList?._meta.totalCount);
                setCurrentPage(perioritiesList?._meta.currentPage);
            }
        }
    }, [perioritiesList]);

    useEffect(() => {
        const queryObject = {
            nsc_subject: nsc_subject,
            ...(nsc_showing !== '20' && { nsc_showing: nsc_showing }),
            ...(nsc_page_no !== 1 && { nsc_page_no: nsc_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(nsc_showing);
    }, [searchText, nsc_showing, nsc_page_no]);

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            if (value === 'all') {
                obj[name] = '';
            } else {
                obj[name] = value;
            }
            const str = queryString.stringify(obj);
            if (name == 'nsc_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };
    const onPageChange = pageNumber => {
        handleChange('nsc_page_no', pageNumber);
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
            dataIndex: 'npc_id',
            editable: false,
            key: (text, record, index) => record?.npc_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'npc_name',
            editable: false,
            sorter: true
        },
        {
            title: 'Level',
            dataIndex: 'npc_level',
            editable: false,
            sorter: true
        },
        {
            title: 'Color',
            dataIndex: 'npc_color',
            editable: false,
            sorter: true,
            render: (text, record, index) => <input type="color" id="favcolor" name="favcolor" disabled value={record?.npc_color} />
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {

                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-ncis-periority-colors"))){
                    const updateNicsPriorities=  {
                        key: 'edit',
                        label: 'Edit',
                        icon: <Pencil />,
                        onClickItem: () => {
                            if (record) {
                                setRecord(record);
                            }
                            setshowEditSidebar(true);
                        },
                    };
                    moreItems.push(updateNicsPriorities);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-ncis-periority-colors"))){
                    const deleteNicsPriorities= {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.npc_id);
                        },
                    };
                    moreItems.push(deleteNicsPriorities);
                }
                if (moreItems.length !== 0) {
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
    const onCreate = (values) => {
        const myArrayQry = mapQueryWithApi(query);
        onCreateNcissPerioritie(values, myArrayQry)
        setshowCreateDrawer(false)
    }
    const onUpdate = (id, values) => {
        const myArrayQry = mapQueryWithApi(query);
        onUpdateNcissPerioritie(id, values, myArrayQry)
        setshowEditSidebar(false)
    }
    return (
        <>
            <PageHeader
                title="Periority"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("create-ncis-periority-colors"))) &&
                    <SPButton
                        onButtonClick={() => setshowCreateDrawer(true)}
                        title="Add Periority"
                        size="small"
                    />,
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("index-ncis-options-mapping"))) &&
                    <SPButton
                        onButtonClick={() => {
                            onChangeView('categories')
                        }
                        }
                        title="Category Options"
                        size="small"
                    />,
                ]}
            />
            <SPDrawer
                title="Add Periority"
                isVisible={showCreateDrawer}
                drawerWidth={700}
                onClose={() => setshowCreateDrawer(false)}
            >
                <NcissPrioritesSideDrawer type="create" isVisible={showCreateDrawer} onCreateHandler={onCreate} />
            </SPDrawer>
            <SPDrawer
                title="Edit Category"
                isVisible={showEditSidebar}
                drawerWidth={700}
                onClose={() => setshowEditSidebar(false)}
            >
                <NcissPrioritesSideDrawer type="edit" selectedRecord={record} isVisible={showEditSidebar} onUpdateHandler={onUpdate} />
            </SPDrawer>

            <>
                {/* <Row
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
                                handleChange('nsc_subject', searchText);
                            }}
                            size="420px"
                        />
                    </Col>
                </Row> */}
                <SPTable
                    columns={columns}
                    dataSource={perioritiesListItem}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    totalRecords={totalCount}
                    isLoading={loading}
                    showingTill={nsc_showing}
                    handleTableChange={handleTableChange}
                    currentShowing={
                        currentPage === 1 ? currentPage : (currentPage - 1) * nsc_showing + 1
                    }
                    currentPage={currentPage}
                />
            </>
        </>
    );
};

const mapStateToProps = state => {
    return {
        perioritiesList: state.administration?.perioritiesList.listData,
        loading: state.administration?.perioritiesList.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    onGetNcissPeriorities: (...args) => dispatch(administratorCasesNcissPerioritiesList(...args)),
    onDeleteNcissPerioritie: (...args) => dispatch(administratorCasesNcissPerioritieDelete(...args)),
    onUpdateNcissPerioritie: (...args) => dispatch(administratorCasesNcissPerioritieUpdate(...args)),
    onCreateNcissPerioritie: (...args) => dispatch(administratorCasesNcissPerioritieCreate(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Periority);


