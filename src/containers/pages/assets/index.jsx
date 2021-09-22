import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
import 'antd/dist/antd.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PageHeader from '../../layout/pageHeader';
import SPCog from '../../../components/SPCog';
import SPSearch from '../../../components/SPSearch';
import SPSelect from '../../../components/SPSelect';
import SPTable from '../../../components/SPTable';
import SPRoundProgress from '../../../components/SPRoundProgress';
import SPButton from '../../../components/SPButton';
import SPDrawer from '../../../components/SPDrawer';
import Create from './components/create';
import { useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import Import from './components/import';
import Dustbin from '../../../assets/svgIcon/dustbin';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import { StyledDiv, AlertBox, StyledDivSec } from './StyledComponents';
import {
  listAssets,
  singleAsset,
  deleteAsset,
  listAssetTypes,
} from '../../../actions/assets';
import { listOwners } from '../../../actions/owners';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import {
  RedditCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { find } from 'lodash';
import Pencil from '../../../assets/svgIcon/pencil';

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

function Assets({
  listData,
  listAssets,
  loading,
  deleteAsset,
  assetsStore,
  listOwners,
  ownersData,
  listAssetTypes,
  assetTypes,
  access,
}) {
  const history = useHistory();
  const { path } = useParams();

  const [assetFormData, setAssetFormData] = useState({
    title: 'Create Asset',
    type: 'create',
  });
  const [selectedAsset, setSelectedAsset] = useState(null);
  // const [searchText, setSearchText] = useState('');
  const [assetsList, setAssetList] = useState([]);
  const [isAssetImported, setIsAssetImported] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('10');
  const [status, setStatus] = useState('all');
  const [assetInitialState, setAssetInitialSet] = useState({});

  console.log('location.search', location.search);
  const [query, setQuery] = useState(location.search);

  const handleQuery = qs => {
    history.push('/assets?' + qs);
    setQuery(qs);
  };

  const {
    iti_status = 'all',
    iti_showing = '20',
    iti_page_no = 1,
    iti_subject,
    sort = undefined,
    name,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(iti_subject);
  const [currentPage, setCurrentPage] = useState(parseInt(iti_page_no, 10));

  useEffect(() => {
    const queryObject = {
      iti_subject: iti_subject,
      ...(iti_showing !== '20' && { iti_showing: iti_showing }),
      ...(iti_status !== 'all' && { iti_status: iti_status }),
      ...(iti_page_no !== 1 && { iti_page_no: iti_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [searchText, iti_status, iti_showing]);

  useEffect(() => {
    if (name) {
      setAssetFormData({
        title: 'Create Asset',
        type: 'create',
      });

      setSelectedAsset({ ast_name: name });
      setIsCreateDrawerVisible(true);
    }
  }, [name]);

  const handleChange = (name, value, refresh = true) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      handleQuery(str);
      if (refresh) {
        listAssets(
          currentPage,
          obj['iti_subject'],
          obj['iti_showing'],
          obj['sort']
        );
      }
    }
  };

  const updateObjectUrl = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  function setColumnsForSpecificNumber(number) {
    return [
      {
        title: '#',
        dataIndex: 'index',
        editable: true,
        render: (text, record, index) => {
          return (
            <span dangerouslySetInnerHTML={{ __html: record.ast_id }}></span>
          );
        },
      },
      {
        title: 'NAME',
        dataIndex: 'ast_name',
        editable: false,
        width: 250,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          return (
            <span dangerouslySetInnerHTML={{ __html: record.ast_name }}></span>
          );
        },
      },
      {
        title: 'HOSTNAME',
        dataIndex: 'ast_hostname',
        editable: false,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          return (
            <span
              dangerouslySetInnerHTML={{ __html: record.ast_hostname }}
            ></span>
          );
        },
      },
      {
        title: 'IP ADDRESS',
        dataIndex: 'ast_ip_address',
        editable: false,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          return (
            <span
              dangerouslySetInnerHTML={{ __html: record.ast_ip_address }}
            ></span>
          );
        },
      },
      {
        title: 'ASSET CATEGORY',
        dataIndex: 'ast_asset_category',
        editable: false,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          return (
            <span
              dangerouslySetInnerHTML={{ __html: record.ast_asset_category }}
            ></span>
          );
        },
      },
      {
        title: 'ASSET TYPE',
        dataIndex: 'ast_app_type',
        editable: false,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          let name = '';
          if (record.astTypes) {
            name = record?.astTypes[0]?.aty_name;
          }
          return <span dangerouslySetInnerHTML={{ __html: name }}></span>;
        },
      },
      {
        title: 'OWNER',
        dataIndex: 'ast_owner_id',
        editable: false,
        sorter: (a, b) => { },
        render: (text, record, index) => {
          return (
            <ul>
              {Object.keys(record?.astOwner).map(function (keyName, keyIndex) {
                return (
                  <li
                    key={keyName}
                    dangerouslySetInnerHTML={{
                      __html: record?.astOwner[keyName],
                    }}
                  ></li>
                );
              })}
            </ul>
          );
        },
      },
      {
        title: 'S3',
        dataIndex: 'ast_s3_score',
        sorter: (a, b) => a.ast_s3_score > b.ast_s3_score,
        render: (text, record, index) => {
          let s3Score = 0;
          if (record.ast_s3_score) {
            s3Score = record.ast_s3_score;
          }
          if (s3Score != 0) {
            return (
              <div
                role="presentation"
                onClick={() => {

                  history.push(`/assets/asset-details/${record.ast_id}`);
                }}
              >
                <SPRoundProgress type="success" progress={s3Score} />
              </div>
            );
          } else {
            return (
              <div role="presentation" onClick={() => {
                history.push(`/assets/asset-details/${record.ast_id}`);
              }}>
                <SPRoundProgress type="success" progress={s3Score}

                />
              </div>
            );
          }
        },
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const editAsset = e => {
            setAssetFormData({
              title: 'Edit Asset',
              type: 'edit',
            });

            setIsCreateDrawerVisible(true);
            setSelectedAsset(record);
          };
          const deleteAsset = e => {
            showConfirm(record.ast_id);
          };

          const moreItems = [];

          if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-asset"))){
            const updateAsset=  {
              key: 'edit',
              label: 'Edit',
              icon: <Pencil />,
              onClickItem: editAsset,
            };
            moreItems.push(updateAsset);
          }
          if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-asset"))){
            const delAsset=  {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: deleteAsset,
            };
            moreItems.push(delAsset);
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
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const onCreateDrawerOpen = () => {
    setAssetFormData({
      title: 'Create Asset',
      type: 'create',
    });
    setIsCreateDrawerVisible(true);
  };
  const onCreateDrawerClose = () => {
    setSelectedAsset({});

    setIsCreateDrawerVisible(false);
  };

  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const onEditDrawerOpen = () => {
    setIsEditDrawerVisible(true);
  };
  const onEditDrawerClose = () => {
    setAssetInitialSet({});
    setIsEditDrawerVisible(false);
  };

  const [isImportDrawerVisible, setIsImportDrawerVisible] = useState(false);
  const onImportDrawerOpen = () => {
    setIsImportDrawerVisible(true);
  };
  const onImportDrawerClose = (imported = false) => {
    if (imported === true) {
      setIsAssetImported(imported);
      setTimeout(() => {
        setIsAssetImported(false);
        history.push('assets/mapFields');
      }, 1500);
    }

    setIsImportDrawerVisible(false);
  };

  useEffect(() => {
    listOwners();
    listAssetTypes();
    listAssets(currentPage, searchText, iti_showing, sort);
  }, []);

  useEffect(() => {
    const {
      iti_status = 'all',
      iti_page_no = 1,
      iti_subject,
    } = queryString.parse(location.search);
    setSearchText(iti_subject);
    setCurrentPage(iti_page_no);
    handleChange('iti_subject', iti_subject);
  }, [location.search]);

  useEffect(() => {
    if (Object.keys(listData).length != 0) {
      setAssetList(listData.data.items);
      setTotalCount(listData.data._meta.totalCount);
      setCurrentPage(listData.data._meta.currentPage);
      setColumns(setColumnsForSpecificNumber(listData.data._meta.currentPage));
    }
  }, [listData]);

  const onPageChange = pageNumber => {
    updateObjectUrl('iti_page_no', pageNumber);
    listAssets(pageNumber, searchText, iti_showing, sort);
    updateObjectUrl('iti_page_no', pageNumber);
    setCurrentPage(pageNumber);
  };

  const onSearchChange = e => {
    setSearchText(e.target.value);
    listAssets(currentPage, e.target.value, iti_showing, sort);
  };

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Asset?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteAsset(key, iti_page_no, searchText, iti_showing);
      },
      onCancel() { },
    });
  }

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
  return (
    <>
      <PageHeader title="Assets" options={[<SPCog onClick={() => { }} />]} />
      {assetsStore.error ? (
        <AlertBox message={assetsStore.error.message} type="error" closable />
      ) : null}
      {isAssetImported ? (
        <AlertBox
          message="Asset Import file uploaded Successfully !"
          type="success"
          showIcon
          closable
        />
      ) : null}
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flex: 1 }}>
          <Col>
            <SPSearch
              size="500px"
              // onChange={onSearchChange}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              text={searchText}
              onEnter={() => {
                handleChange('iti_subject', searchText, false);
              }}
            />
          </Col>

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
        </Row>

        <Row gutter={[19, 10]}>
         {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-asset'))) ? (
          <Col>
            <SPButton
              title="Create asset"
              size="small"
              onButtonClick={onCreateDrawerOpen}
            />
            <SPDrawer
              title={assetFormData.title}
              isVisible={isCreateDrawerVisible}
              onClose={onCreateDrawerClose}
            >
              <Create
                type={assetFormData.type}
                item={selectedAsset}
                isVisible={isCreateDrawerVisible}
                onCloseDrawer={onCreateDrawerClose}
                refreshAssetsList={() => {
                  listAssets(currentPage, searchText, iti_showing, sort);
                }}
              />
            </SPDrawer>
          </Col>
            ) : ""}

        {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('import-asset'))) ? (
          <Col>
            <SPButton
              title="Import asset"
              size="small"
              onButtonClick={onImportDrawerOpen}
            />
            <SPDrawer
              title="Import assets"
              isVisible={isImportDrawerVisible}
              onClose={onImportDrawerClose}
              drawerWidth={800}
            >
              <Import
                onCloseDrawer={onImportDrawerClose}
                refreshAssetsList={() => {
                  listAssets(currentPage, searchText, iti_showing, sort);
                }}
              />
            </SPDrawer>
          </Col>
            ) : ""}

            {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-asset-rules'))) ? (
          <Col>
            <SPButton
              title="Asset Discovery"
              size="small"
              onButtonClick={() => {
                history.push('assets/discovery');
              }}
            />
          </Col>
            ) : ""}
        </Row>
      </StyledDiv>
      <SPTable
        columns={columns}
        dataSource={assetsList}
        canPaginate
        isLoading={loading}
        onPageChange={onPageChange}
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
    listData: state.assetsStore.listData,
    loading: state.assetsStore.loading,
    assetsStore: state.assetsStore,
    ownersData: state.ownersStore.listData,
    assetTypes: state.assetTypeStore.listData,
    access :  state?.userStore?. userProfile?.data?.access,
  };
};

const mapDispatchToProps = {
  listAssets,
  deleteAsset,
  listOwners,
  listAssetTypes,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Assets);
