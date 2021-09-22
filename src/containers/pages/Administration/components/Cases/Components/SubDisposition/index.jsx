import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import {
    administratorCasesSubDispositionCreate,
    administratorCasesSubDispositionUpdate,
    administratorSubCasesDispositions,
    administratorCasesSubDispositionDelete
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
import SubDispositionSidebar from './Components/SubDispositionSidebar';
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
const SubDisposition = ({ onGetSubDispositionsList, subDispositionsList, loading, onDeleteDisposition, onUpdateSubDisposition, onCreateSubDisposition, onDeleteSubDisposition, userProfile , access }) => {
    const [showCreateDrawer, setshowCreateDrawer] = useState(false);
    const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
    const [showEditSidebar, setshowEditSidebar] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [subdispositionItem, setSubDispositionItem] = useState([]);
    const [record, setRecord] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const [query, setQuery] = useState(location.search);
    const history = useHistory();

    const {
        dsc_showing = '20',
        dsc_page_no = 1,
        dsc_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push('/administration?' + qs);
        setQuery(qs);
    };
    const [searchText, setSearchText] = useState(dsc_subject);

    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want to delete the case?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myQuery = mapQueryWithApi(query)
                onDeleteSubDisposition(key, myQuery);
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
                IncidentDispositionSubCategorySearch: {},
                QueryString: '',
            };
            if (parsedQuery.dsc_subject) {
                queryObject.IncidentDispositionSubCategorySearch.search = parsedQuery.dsc_subject;
            }
            if (parsedQuery.dsc_page_no) {
                queryObject.payload.page = parsedQuery.dsc_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.dsc_showing) {
                queryObject.payload['per-page'] = parsedQuery.dsc_showing;
            }
            const { IncidentDispositionSubCategorySearch } = queryObject;
            if (Object.keys(IncidentDispositionSubCategorySearch).length !== 0) {
                Object.entries(IncidentDispositionSubCategorySearch).forEach(([key, val]) => {
                    myArrayQry += 'IncidentDispositionSubCategorySearch[' + key + ']=' + val + '&';
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
        onGetSubDispositionsList({ queryItem: myArrayQry });
    }, [query]);

    useEffect(() => {
        if (subDispositionsList) {
            if (Object.keys(subDispositionsList).length !== 0) {
                setSubDispositionItem(subDispositionsList?.items);
                setTotalCount(subDispositionsList?._meta.totalCount);
                setCurrentPage(subDispositionsList?._meta.currentPage);
            }
        }
    }, [subDispositionsList]);
    useEffect(() => {
        const queryObject = {
            dsc_subject: dsc_subject,
            ...(dsc_showing !== '20' && { dsc_showing: dsc_showing }),
            ...(dsc_page_no !== 1 && { dsc_page_no: dsc_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(dsc_showing);
    }, [searchText, dsc_showing, dsc_page_no]);
    const handleChange = (name, value) => {
        const obj = queryString.parse(query);
        obj[name] = value;
        const str = queryString.stringify(obj);
        handleQuery(str);
    };
    const onPageChange = pageNumber => {
        handleChange('dsc_page_no', pageNumber);
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
            dataIndex: 'dsc_id',
            editable: false,
            key: (text, record, index) => record?.dsc_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'dsc_name',
            editable: false,
            width: '45%',
            sorter: true,
        },
        {
            title: 'Parent',
            dataIndex: 'dsc_parent_id',
            editable: false,
            sorter: true,
            width: '45%',
            render: (text, record, index) => record?.dscParent?.ids_name
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {

                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-disposition-subcategory"))){
                    const updateSubDisposition=   {
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
                    moreItems.push(updateSubDisposition);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-disposition-subcategory"))){
                    const deleteSubDisposition= {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.dsc_id);
                        },
                    };
                    moreItems.push(deleteSubDisposition);
                }

                if (userProfile?.usr_api_organization === record?.dsc_organization && moreItems.length !== 0) {
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
        onUpdateSubDisposition(id, data, myQuery)
        setShowUpdateDrawer(false)
    }
    const onCreate = (data) => {
        const myQuery = mapQueryWithApi(query)
        onCreateSubDisposition(data, myQuery)
        setshowCreateDrawer(false)
    }
    return (
        <>
            <PageHeader
                title="Sub Disposition"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-disposition-subcategory"))) &&
                    <SPButton
                        onButtonClick={() => setshowCreateDrawer(true)}
                        title="Create Sub-disposition"
                        size="small"
                        image={<PlusIcon />}
                    />,
                ]}
            />
            <SPDrawer
                title="Create Sub-disposition"
                isVisible={showCreateDrawer}
                onClose={() => setshowCreateDrawer(false)}
                drawerWidth={700}
            >
                <SubDispositionSidebar type="create" isVisible={showCreateDrawer} onCreateHandler={onCreate} />
            </SPDrawer>
            <SPDrawer
                title="Update Sub-disposition"
                isVisible={showUpdateDrawer}
                onClose={() => setShowUpdateDrawer(false)}
                drawerWidth={700}
            >
                <SubDispositionSidebar type="edit" isVisible={showUpdateDrawer} onUpdateHandler={onUpdate} selectedRecord={record} />
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
                                handleChange('dsc_subject', searchText);
                            }}
                            size="420px"
                        />
                    </Col>
                    <Col>
                        <SPSelect
                            title="Showing"
                            items={showingFilter}
                            selected={dsc_showing || 20}
                            onChange={e => {
                                handleChange('dsc_showing', e.key);
                            }}
                        />
                    </Col>
                </Row>
                <SPTable
                    columns={columns}
                    dataSource={subdispositionItem}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    totalRecords={totalCount}
                    isLoading={loading}
                    showingTill={dsc_showing}
                    handleTableChange={handleTableChange}
                    currentShowing={
                        currentPage === 1 ? currentPage : (currentPage - 1) * dsc_showing + 1
                    }
                    currentPage={currentPage}
                />
            </>
        </>
    );
};
const mapStateToProps = state => {
    return {
        subDispositionsList: state.administration.subDispositionsList.listData,
        loading: state.administration.subDispositionsList.loading,
        userProfile: state?.userStore?.userProfile?.data?.profile[0],
    };
};

const mapDispatchToProps = dispatch => ({
    onGetSubDispositionsList: (...args) => dispatch(administratorSubCasesDispositions(...args)),
    onUpdateSubDisposition: (...args) => dispatch(administratorCasesSubDispositionUpdate(...args)),
    onCreateSubDisposition: (...args) => dispatch(administratorCasesSubDispositionCreate(...args)),
    onDeleteSubDisposition: (...args) => dispatch(administratorCasesSubDispositionDelete(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(SubDisposition);
