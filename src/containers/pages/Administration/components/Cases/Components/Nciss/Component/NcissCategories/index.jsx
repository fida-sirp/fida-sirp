import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
    administratorCasesNcisscategorieCreate,
    administratorCasesNcisscategorieDelete,
    administratorCasesNcisscategories, administratorCasesNcisscategorieUpdate
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
import NcissCategoriesSideDrawer from './Components/NcissCategoriesSideDrawer'
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

const NcissCategories = ({ onChangeView, onGetCasesNcissCategoriesList, ncisscategoriesList, loading, onGetUpdateCasesNcissCategoriesList, onGetCreateCasesNcissCategoriesList, onGetDeleteCasesNcissCategoriesList, userProfile,access }) => {
    const [showCreateAdversory, setshowCreateAdversory] = useState(false);
    const [showEditSidebar, setshowEditSidebar] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [ncissCategoriesItemList, setNcissCategoriesItemList] = useState([])
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
                onGetDeleteCasesNcissCategoriesList(key, myQuery);
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
                queryObject.payload.sort = parsedQuery.sort;
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
        onGetCasesNcissCategoriesList({ queryItem: myArrayQry });
    }, [query]);

    useEffect(() => {
        if (ncisscategoriesList) {
            if (Object.keys(ncisscategoriesList).length !== 0) {
                setNcissCategoriesItemList(ncisscategoriesList?.items);
                setTotalCount(ncisscategoriesList?._meta.totalCount);
                setCurrentPage(ncisscategoriesList?._meta.currentPage);
            }
        }
    }, [ncisscategoriesList]);



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
            dataIndex: 'nsc_id',
            editable: false,
            key: (text, record, index) => record?.nsc_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'nsc_name',
            editable: false,
            sorter: true,
        },
        {
            title: 'Description',
            dataIndex: 'nsc_description',
            width: 20,
            editable: false,
            sorter: true,
            // render: (t, record, i) => <div record?.nsc_description}</div>
        },
        {
            title: 'Weight',
            dataIndex: 'nsc_value',
            editable: false,
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'nsc_status',
            editable: false,
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {

                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-ncis-scoring-categories"))){
                    const updateNicsCategory=  {
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
                    moreItems.push(updateNicsCategory);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-ncis-scoring-categories"))){
                    const deleteNicsCategory= {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.nsc_id);
                        },
                    };
                    moreItems.push(deleteNicsCategory);
                }


                if (userProfile?.usr_api_organization === record?.nsc_organization && moreItems.length !== 0) {
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
    const onCreate = (data) => {
        const myArrayQry = mapQueryWithApi(query);
        onGetCreateCasesNcissCategoriesList(data, myArrayQry)
        setshowCreateAdversory(false)
    }
    const onUpdate = (id, values) => {
        const myArrayQry = mapQueryWithApi(query);
        onGetUpdateCasesNcissCategoriesList(id, values, myArrayQry)
        setshowEditSidebar(false)
    }
    return (
        <>
            <PageHeader
                title="NCISS Categories"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || (access.includes("index-ncis-scoring-categories") && access.includes("create-ncis-scoring-categories") ))) &&
                    <SPButton
                        onButtonClick={() => setshowCreateAdversory(true)}
                        title="Create Categories"
                        size="small"
                    />,
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("index-ncis-options-mapping"))) &&
                    <SPButton
                        onButtonClick={() => {
                            onChangeView('incident-scoring')
                        }
                        }
                        title="Category Options"
                        size="small"
                    />
                ]}
            />
            <SPDrawer
                title="Create NCISS Category"
                isVisible={showCreateAdversory}
                drawerWidth={700}
                onClose={() => setshowCreateAdversory(false)}
            >
                <NcissCategoriesSideDrawer type="create" isVisible={showCreateAdversory} onCreateHandler={onCreate} />
            </SPDrawer>
            <SPDrawer
                title="Edit Category"
                isVisible={showEditSidebar}
                drawerWidth={700}
                onClose={() => setshowEditSidebar(false)}
            >
                <NcissCategoriesSideDrawer type="edit" selectedRecord={record} isVisible={showEditSidebar} onUpdateHandler={onUpdate} />
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
                                handleChange('nsc_subject', searchText);
                            }}
                            size="420px"
                        />
                    </Col>
                </Row>
                <SPTable
                    columns={columns}
                    size={50}
                    dataSource={ncissCategoriesItemList}
                    onPageChange={onPageChange}
                    // canPaginate
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
        userProfile: state?.userStore?.userProfile?.data?.profile[0],
        ncisscategoriesList: state.administration?.ncisscategoriesList.listData,
        loading: state.administration?.ncisscategoriesList.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    onGetCasesNcissCategoriesList: (...args) => dispatch(administratorCasesNcisscategories(...args)),
    onGetUpdateCasesNcissCategoriesList: (...args) => dispatch(administratorCasesNcisscategorieUpdate(...args)),
    onGetCreateCasesNcissCategoriesList: (...args) => dispatch(administratorCasesNcisscategorieCreate(...args)),
    onGetDeleteCasesNcissCategoriesList: (...args) => dispatch(administratorCasesNcisscategorieDelete(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(NcissCategories);


