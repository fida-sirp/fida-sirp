import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import {
    administratorCasesDispositionCreate,
    administratorCasesDispositionDelete,
    administratorCasesDispositions, administratorCasesDispositionUpdate,
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
import DispositionDrawer from './Components/DispositionDrawer';
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
const Disposition = ({ onGetDispositionsList, dispositionsList, loading, onDeleteDisposition, onUpdateDisposition, onCreateDisposition, userProfile,access }) => {
    const [showCreateDrawer, setshowCreateDrawer] = useState(false);
    const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
    const [showEditSidebar, setshowEditSidebar] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [dispositionItem, setDispositionItem] = useState([]);
    const [record, setRecord] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const [query, setQuery] = useState(location.search);
    const history = useHistory();
    const [activeOption, setActiveOption] = useState(
        history.location.pathname.split('/')[2] || 'all'
    );

    const {
        ids_showing = '20',
        ids_page_no = 1,
        ids_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push('/administration?' + qs);
        setQuery(qs);
    };
    const [searchText, setSearchText] = useState(ids_subject);

    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want to delete the case?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myQuery = mapQueryWithApi(query)
                onDeleteDisposition(key, myQuery);
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
                IncidentDispositionSearch: {},
                QueryString: '',
            };
            if (parsedQuery.ids_subject) {
                queryObject.IncidentDispositionSearch.search = parsedQuery.ids_subject;
            }
            if (parsedQuery.ids_page_no) {
                queryObject.payload.page = parsedQuery.ids_page_no;
            }

            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.ids_showing) {
                queryObject.payload['per-page'] = parsedQuery.ids_showing;
            }
            const { IncidentDispositionSearch } = queryObject;
            if (Object.keys(IncidentDispositionSearch).length !== 0) {
                Object.entries(IncidentDispositionSearch).forEach(([key, val]) => {
                    myArrayQry += 'IncidentDispositionSearch[' + key + ']=' + val + '&';
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
        onGetDispositionsList({ queryItem: myArrayQry });
    }, [query]);

    useEffect(() => {
        if (dispositionsList) {
            if (Object.keys(dispositionsList).length !== 0) {
                setDispositionItem(dispositionsList?.items);
                setTotalCount(dispositionsList?._meta.totalCount);
                setCurrentPage(dispositionsList?._meta.currentPage);
            }
        }
    }, [dispositionsList]);
    useEffect(() => {
        const queryObject = {
            ids_subject: ids_subject,
            ...(ids_showing !== '20' && { ids_showing: ids_showing }),
            ...(ids_page_no !== 1 && { ids_page_no: ids_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(ids_showing);
    }, [searchText, ids_showing, ids_page_no]);
    const handleChange = (name, value) => {
        const obj = queryString.parse(query);
        obj[name] = value;
        const str = queryString.stringify(obj);
        handleQuery(str);
    };
    const onPageChange = pageNumber => {
        handleChange('ids_page_no', pageNumber);
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
            dataIndex: 'ids_id',
            editable: false,
            key: (text, record, index) => record?.ids_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'ids_name',
            editable: false,
            sorter: true,
            width: '45%',
        },
        {
            title: 'Type',
            dataIndex: 'ids_type',
            editable: false,
            sorter: true,
            width: '45%',
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {

                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-disposition"))){
                    const updateDisposition=  {
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
                    moreItems.push(updateDisposition);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-disposition"))){
                    const deleteDisposition=  {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.ids_id);
                        },
                    };
                    moreItems.push(deleteDisposition);
                }

                if (userProfile?.usr_api_organization === record?.ids_organization && moreItems.length !== 0) {
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

    const onUpdate = (id, data) => {
        const myQuery = mapQueryWithApi(query)
        onUpdateDisposition(id, data, myQuery)
        setShowUpdateDrawer(false)
    }
    const onCreate = (data) => {
        const myQuery = mapQueryWithApi(query)
        onCreateDisposition(data, myQuery)
        setshowCreateDrawer(false)
    }
    return (
        <>
            <PageHeader
                title="Disposition"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-disposition"))) &&
                    <SPButton
                        onButtonClick={() => setshowCreateDrawer(true)}
                        title="Create Disposition"
                        size="small"
                        image={<PlusIcon />}
                    />,
                ]}
            />
            <SPDrawer
                title="Create Disposition"
                isVisible={showCreateDrawer}
                onClose={() => setshowCreateDrawer(false)}
                drawerWidth={700}
            >
                <DispositionDrawer type="create" isVisible={showCreateDrawer} onCreateHandler={onCreate} />
            </SPDrawer>
            <SPDrawer
                title="Update Disposition"
                isVisible={showUpdateDrawer}
                onClose={() => setShowUpdateDrawer(false)}
                drawerWidth={700}
            >
                <DispositionDrawer type="edit" isVisible={showUpdateDrawer} onUpdateHandler={onUpdate} selectedRecord={record} />
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
                                handleChange('ids_subject', searchText);
                            }}
                            size="420px"
                        />
                    </Col>
                    <Col>
                        <SPSelect
                            title="Showing"
                            items={showingFilter}
                            selected={ids_showing || 20}
                            onChange={e => {
                                handleChange('ids_showing', e.key);
                            }}
                        />
                    </Col>
                </Row>
                <SPTable
                    columns={columns}
                    dataSource={dispositionItem}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    totalRecords={totalCount}
                    isLoading={loading}
                    showingTill={ids_showing}
                    handleTableChange={handleTableChange}
                    currentShowing={
                        currentPage === 1 ? currentPage : (currentPage - 1) * ids_showing + 1
                    }
                    currentPage={currentPage}
                />
            </>
        </>
    );
};
const mapStateToProps = state => {
    return {
        dispositionsList: state.administration.dispositionsList.listData,
        loading: state.administration.dispositionsList.loading,
        userProfile: state?.userStore?.userProfile?.data?.profile[0],
    };
};

const mapDispatchToProps = dispatch => ({
    onGetDispositionsList: (...args) => dispatch(administratorCasesDispositions(...args)),
    onDeleteDisposition: (...args) => dispatch(administratorCasesDispositionDelete(...args)),
    onUpdateDisposition: (...args) => dispatch(administratorCasesDispositionUpdate(...args)),
    onCreateDisposition: (...args) => dispatch((administratorCasesDispositionCreate(...args)))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Disposition);
