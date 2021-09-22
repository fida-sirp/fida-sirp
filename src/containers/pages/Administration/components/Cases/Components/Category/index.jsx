import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Row, Modal } from 'antd';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import PageHeader from '../../../../../../layout/pageHeader';
import {
    administratorCasesCategoriesList,
    administratorCasesCategoryDelete,
    administratorCasesCategoryUpdate,
    administratorCasesCategoryCreate
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router-dom'
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import queryString from 'query-string';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import CategorySidebar from './Components/CategorySidebar'
import { ExclamationCircleOutlined } from '@ant-design/icons';

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


const Category = ({ onGetCasesCategoryList, caseCategoryList, loading, onDeleteCasesCategory, onUpdateCasesCategory, onCreateCasesCategory, userProfile, access }) => {
    const [showCreateAdversory, setshowCreateAdversory] = useState(false);
    const [showEditSidebar, setshowEditSidebar] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [casesCategoryList, setCasesCategory] = useState([]);
    const [record, setRecord] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const [query, setQuery] = useState(location.search);
    const history = useHistory();
    const [activeOption, setActiveOption] = useState(
        history.location.pathname.split('/')[2] || 'all'
    );
    const {
        ica_showing = '20',
        ica_page_no = 1,
        ica_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push('/administration?' + qs);
        setQuery(qs);
    };
    const [searchText, setSearchText] = useState(ica_subject);

    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want delete this?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myQuery = mapQueryWithApi(query)
                console.log("key", key)
                onDeleteCasesCategory(key, myQuery);
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
                IncidentCategorySearch: {},
                QueryString: '',
            };
            if (parsedQuery.ica_subject) {
                queryObject.IncidentCategorySearch.search = parsedQuery.ica_subject;
            }
            if (parsedQuery.ica_page_no) {
                queryObject.payload.page = parsedQuery.ica_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.ica_showing) {
                queryObject.payload['per-page'] = parsedQuery.ica_showing;
            }
            const { IncidentCategorySearch } = queryObject;
            if (Object.keys(IncidentCategorySearch).length !== 0) {
                Object.entries(IncidentCategorySearch).forEach(([key, val]) => {
                    myArrayQry += 'IncidentCategorySearch[' + key + ']=' + val + '&';
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
        onGetCasesCategoryList({ queryItem: myArrayQry });
    }, [query]);

    useEffect(() => {
        if (caseCategoryList) {
            if (Object.keys(caseCategoryList).length !== 0) {
                setCasesCategory(caseCategoryList?.items);
                setTotalCount(caseCategoryList?._meta.totalCount);
                setCurrentPage(caseCategoryList?._meta.currentPage);
            }
        }
    }, [caseCategoryList]);

    useEffect(() => {
        const queryObject = {
            ica_subject: ica_subject,
            ...(ica_showing !== '20' && { ica_showing: ica_showing }),
            ...(ica_page_no !== 1 && { ica_page_no: ica_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(ica_showing);
    }, [searchText, ica_showing, ica_page_no]);

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            if (value === 'all') {
                obj[name] = '';
            } else {
                obj[name] = value;
            }
            const str = queryString.stringify(obj);
            if (name == 'ica_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };
    const onPageChange = pageNumber => {
        handleChange('ica_page_no', pageNumber);
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
            dataIndex: 'tca_id',
            editable: false,
            key: (text, record, index) => record?.ica_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'ica_name',
            editable: false,
            sorter: true,
            // width: '45%',
            render: (text, record, index) => record?.ica_name
        },
        {
            title: 'Type',
            dataIndex: 'ica_type',
            editable: false,
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {


                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-incident-category"))){
                    const updateCategory =  {
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
                    moreItems.push(updateCategory);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-incident-category"))){
                    const deleteCategory = {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.ica_id);
                        },
                    };
                    moreItems.push(deleteCategory);
                }


                if (userProfile?.usr_api_organization === record?.ica_organization && moreItems.length !== 0 ) {
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

    const onCreateCategory = (data) => {
        const myArrayQry = mapQueryWithApi(query);
        onCreateCasesCategory(data, myArrayQry)
        setshowCreateAdversory(false)
    }

    const onUpdateCategory = (id, values) => {
        const myArrayQry = mapQueryWithApi(query);
        onUpdateCasesCategory(id, values, myArrayQry)
        setshowEditSidebar(false)
    }

    return (
        <>
            <PageHeader
                title="Category"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("create-incident-category"))) &&
                    <SPButton
                        onButtonClick={() => setshowCreateAdversory(true)}
                        title="Create category"
                        size="small"
                        image={<PlusIcon />}
                    />,
                ]}
            />
            <SPDrawer
                title="Create Category"
                isVisible={showCreateAdversory}
                drawerWidth={700}
                onClose={() => setshowCreateAdversory(false)}
            >
                <CategorySidebar type="create" isVisible={showCreateAdversory} onCreateHandler={onCreateCategory} />
            </SPDrawer>
            <SPDrawer
                title="Edit Category"
                isVisible={showEditSidebar}
                drawerWidth={700}
                onClose={() => setshowEditSidebar(false)}
            >
                <CategorySidebar type="edit" selectedRecord={record} isVisible={showEditSidebar} onUpdateHandler={onUpdateCategory} />
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
                                handleChange('ica_subject', searchText);
                            }}
                            size="420px"
                        />
                    </Col>
                    <Col>
                        <SPSelect
                            title="Showing"
                            items={showingFilter}
                            selected={ica_showing || 20}
                            onChange={e => {
                                handleChange('ica_showing', e.key);
                            }}
                        />
                    </Col>
                </Row>
                <SPTable
                    columns={columns}
                    dataSource={casesCategoryList}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    totalRecords={totalCount}
                    isLoading={loading}
                    showingTill={ica_showing}
                    handleTableChange={handleTableChange}
                    currentShowing={
                        currentPage === 1 ? currentPage : (currentPage - 1) * ica_showing + 1
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
        caseCategoryList: state.administration.casesCategoriesList.listData,
        loading: state.administration.casesCategoriesList.loading
    };
};

const mapDispatchToProps = dispatch => ({
    onGetCasesCategoryList: (...args) => dispatch(administratorCasesCategoriesList(...args)),
    onDeleteCasesCategory: (...args) => dispatch(administratorCasesCategoryDelete(...args)),
    onUpdateCasesCategory: (...args) => dispatch(administratorCasesCategoryUpdate(...args)),
    onCreateCasesCategory: (...args) => dispatch((administratorCasesCategoryCreate(...args)))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Category);
