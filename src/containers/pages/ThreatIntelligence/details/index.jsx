import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Row, Col, Modal } from 'antd';
import { compose } from 'redux';
import { useHistory, useParams } from 'react-router-dom';
import { filter, includes, concat, find, map, isArray } from 'lodash';
import { connect, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ExecuteBtn } from './StyledComponents';
import SPTimeLine from '../../../../components/SPTimeLine';
import SpLoader from '../../../../components/SPLoader'

import {
  threatIntelligenceDetail,
  getProductDetails,
  advisoryExportAsPDF,
  getAdvisoryVendors,
  listAsset,
  updatePartialThreatIntelReset,
  updatePartialThreatIntel,
  getRunPlaybookData,
  executePlaybook,
  getUserEmailList,
  sendEmail,
  updateArtifacts,
  executeAction,
  multiConfigExecution,
  addEvidence,
  threatIntelligenceStoreResetAfterAfterOpenCase,
  getRawOutput,
  clearRawOutput,
} from '../../../../actions/threatIntelligence';
import SPTab from '../../../../components/SPTab';
import AuthTokenHOC from '../../../../HOCs/AuthTokenHOC';
import PageHeader from '../components/pageheader';
import TabReportBox from '../components/tabReportBox';
import ThreatIntelligenceDetailsbox from '../components/ThreatIntelligenceDetailsbox';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import ScoreComponent from '../components/scoreComponent';
import AddRelatedAdvisory from '../components/addRelatedAdvisory';
import ActivityBox from '../components/activityBox';
import AffectedProducts from '../components/AffectedProducts';
import AssetsList from '../components/AssetsList';
// import AffectedVendors from '../components/AffectedVendors';
import SendEmailModal from '../../incidentManagement/components/SendEmailModal';
import TextEditBox from '../components/TextEditCommon';
import AffectedVendorList from '../components/AffectedVendorList';
import { SModal } from '../../assets/components/TemplateModal/StyledComponents';
import { RowDiv } from '../../incidentManagement/components/incidentTab/StyledComponents';
import SPButton from '../../../../components/SPButton';
import SelectBox from '../../../../components/SelectBox';
import TreeChart from '../../../../components/TreeChart';
import { incidentDetails, downloadAsset } from '../../../../actions/incidentManagement';
import { evidentApiToClientTransform } from './utils/ApiToClientDataMapper';
import SPModal from '../../../../components/SPModal';

const validationSchema = Yup.object({
  app_execute_type: Yup.string().required('Required'),
});

const initialValues = {
  app_execute_type: '',
};

const ThreatIntelligenceDetails = ({
  onThreatIntelligenceDetail,
  threatIntelligenceData,
  threatIntelligenceAllData,
  threatIntelligenceProductList,
  getProductDetails,
  onAdvisoryExportAsPDF,
  threatIntelligenceVendors,
  getAdvisoryVendors,
  onListAsset,
  threatIntelligenceAsset,
  getRunPlaybookData,
  threatIntelligenceRunPlayBook,
  onUpdatePartialThreatIntel,
  executePlaybook,
  threatIntelligenceExecutePlayBook,
  getUserEmailList,
  threatIntelligentUserEmailList,
  sendEmail,
  threatIntelligenceOpenCase,
  threatIntelligentSendEmail,
  updateArtifacts,
  executeRunAction,
  threatIntelligentExecuteAction,
  multiConfigExecutionAction,
  onAddEvidence,
  onGetRawData,
  threatIntelligenceRawOutput,
  clearRawOutput,
  onClearRawData,
  onDowloadFile,
  isTabLoading,
  isArtifactsLoading
}) => {
  const history = useHistory();
  const [selecteAdvisorieId, setselecteAdvisorieId] = useState();
  const [threatIntelligenceDetails, setThreatIntelligenceDetails] = useState({});
  const [isSendEmailVisible, setIsSendEmailVisible] = useState(false);
  const [productList, setProductList] = useState();
  const [vendorList, setVendorList] = useState();
  const [pastProductList, setPastProductList] = useState([]);
  const [pastVendorList, setPastVendorList] = useState([]);
  const [assetList, setAssetList] = useState();
  const [runPlayBook, setRunPlayBook] = useState(false);
  const [runPlayBookList, setRunPlayBookList] = useState([]);
  const [userEmailData, setUserEmailData] = useState();
  const [advStatus, setAdvStatus] = useState('');
  const [eviList, setEviList] = useState([]);
  const [advArtifactMapping, setAdvArtifactMapping] = useState();
  const [advArtifactsChartData, setAdvArtifactsChartData] = useState();
  const [addExectionData, setAddExectionData] = useState();
  const [timeLineChartData, setTimeLineChartData] = useState();
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem('isEdit', 0);
    const id = location.pathname.split('/').pop();
    setselecteAdvisorieId(id);
    onThreatIntelligenceDetail(id);
    getProductDetails();
    getAdvisoryVendors();
    onListAsset();
    getRunPlaybookData();
    getUserEmailList();
    incidentDetails(id);
  }, []);

  useEffect(() => {
    if (threatIntelligenceOpenCase && threatIntelligenceOpenCase?.isSuccess) {
      onThreatIntelligenceDetail(id);
    }
  }, [threatIntelligenceOpenCase]);

  useEffect(() => {
    setThreatIntelligenceDetails(threatIntelligenceData);

    let treeChartData = [];
    if (threatIntelligenceData?.treeGraph) {
      const treeGraph = threatIntelligenceData?.treeGraph;
      const parentNode = treeGraph.parent;
      const parentText = parentNode.type + ' #' + parentNode.adv_id;
      const child = treeGraph.child;
      for (const property in child) {
        treeChartData.push([parentText, property]);
        for (const property1 in child[property]) {
          treeChartData.push([
            parentText,
            property + ' ' + child[property][property1].value,
          ]);
          let subchild = child[property][property1]['sub-child'];
          for (const subProperty in subchild) {
            if (subchild[subProperty].length > 0) {
              for (let i = 0; i < subchild[subProperty].length; i++) {
                let subText =
                  subProperty +
                  ' ' +
                  (subchild[subProperty][i].ids_name ||
                    subchild[subProperty][i].adv_title) +
                  ' #' + (subchild[subProperty][i]?.adv_id || subchild[subProperty][i]?.iti_id)
                treeChartData.push([property, subText]);
              }
            }
          }
        }
      }
    }
    setAdvArtifactsChartData(treeChartData);
  }, [threatIntelligenceData]);

  useEffect(() => {
    if (!isTabLoading) {
      setShouldShowLoader(false);
    }
  }, [isTabLoading]);

  useEffect(() => {
    if (threatIntelligenceDetails?.adv_status) {
      setAdvStatus(threatIntelligenceDetails?.adv_status);
    }
    if (threatIntelligenceDetails?.advArtifactMapping) {
      setAdvArtifactMapping(threatIntelligenceDetails?.advArtifactMapping);
    }

    const timeLineChartData = isArray(threatIntelligenceDetails?.timeLine)
      ? threatIntelligenceDetails?.timeLine.map(timeline => {
        return {
          x: new Date(timeline?.alo_created_at),
          name: timeline?.alo_type,
          label: timeline?.alo_subject,
          description: timeline?.alo_description,
        };
      })
      : [];

    setTimeLineChartData(timeLineChartData);
  }, [threatIntelligenceDetails?.timeLine]);

  useEffect(() => {
    if (threatIntelligenceExecutePlayBook?.isSuccess) {
      setRunPlayBook(false);
    }
  }, [threatIntelligenceExecutePlayBook]);

  useEffect(() => {
    if (
      threatIntelligentExecuteAction?.listData &&
      Object.keys(threatIntelligentExecuteAction?.listData).length > 0
    ) {
      setAddExectionData(threatIntelligentExecuteAction?.listData);
    }
  }, [threatIntelligentExecuteAction]);

  //Handing Not Found Route
  useEffect(() => {
    if (threatIntelligenceAllData?.code === 404) {
      history.push('/threatIntelligence');
    }
  }, [threatIntelligenceAllData]);

  useEffect(() => {
    if (threatIntelligentSendEmail.isSuccess) {
      setIsSendEmailVisible(false);
    }
  }, [threatIntelligentSendEmail]);

  useEffect(() => {
    const updatedEmailList = [];
    const listData = threatIntelligentUserEmailList?.listData;
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        updatedEmailList.push({
          key: key,
          label: value,
          value: key,
        });
      }
    }
    setUserEmailData(updatedEmailList);
  }, [threatIntelligentUserEmailList?.listData]);

  useEffect(() => {
    const updatedPlaybookData = [];
    if (
      threatIntelligenceRunPlayBook?.listData &&
      Object.keys(threatIntelligenceRunPlayBook?.listData).length > 0
    ) {
      Object.entries(threatIntelligenceRunPlayBook?.listData).map(
        ([key, value], index) => {
          updatedPlaybookData.push({
            key: key,
            label: value,
            value: key,
          });
          return value;
        }
      );
      setRunPlayBookList(updatedPlaybookData);
    }
  }, [threatIntelligenceRunPlayBook?.listData]);

  useEffect(() => {
    const affectedVendorList = [];
    if (
      threatIntelligenceVendors?.listData &&
      Object.keys(threatIntelligenceVendors?.listData).length > 0
    ) {
      Object.entries(threatIntelligenceVendors?.listData).map(
        ([key, value], index) => {
          affectedVendorList.push({
            key: value,
            label: value,
            id: index,
          });
          return value;
        }
      );
      setVendorList(affectedVendorList);
    }
  }, [threatIntelligenceVendors?.listData]);

  useEffect(() => {
    if (threatIntelligenceDetails?.adv_affected_products) {
      const affectedProductList =
        threatIntelligenceDetails?.adv_affected_products.split(',');
      setPastProductList(affectedProductList);
    }
  }, [threatIntelligenceDetails?.adv_affected_products]);

  useEffect(() => {
    if (threatIntelligenceDetails?.adv_affected_vendors) {
      const pastVendorList =
        threatIntelligenceDetails?.adv_affected_vendors.split(',');
      setPastVendorList(pastVendorList);
    }
  }, [threatIntelligenceDetails?.adv_affected_vendors]);

  useEffect(() => {
    const affectedProductList = [];
    if (
      threatIntelligenceProductList &&
      Object.keys(threatIntelligenceProductList).length !== 0
    ) {
      for (const [key, value] of Object.entries(
        threatIntelligenceProductList
      )) {
        affectedProductList.push({
          key,
          label: value,
          value: parseInt(key, 10),
        });
      }

      setProductList(affectedProductList);
    }
  }, [threatIntelligenceProductList]);

  useEffect(() => {
    if (
      threatIntelligenceAsset &&
      Object.keys(threatIntelligenceAsset).length > 0
    ) {
      const assetList = map(threatIntelligenceAsset, (ta, key) => ({
        key: key,
        label: ta,
        id: parseInt(key, 10),
      }));
      setAssetList(assetList);
    }
  }, [threatIntelligenceAsset]);

  useEffect(() => {
    const tranformedEvidence = evidentApiToClientTransform(threatIntelligenceDetails?.advArtifactMapping,
      threatIntelligenceDetails?.advIoc
    );
    setEviList(tranformedEvidence);
  }, [threatIntelligenceDetails]);

  const onUpdateThreatIntel = (key, value, shouldReload = false) => {
    const data = { [key]: value };
    setThreatIntelligenceDetails({
      ...threatIntelligenceDetails,
      ...data,
    });
    onUpdatePartialThreatIntel(selecteAdvisorieId, data);
  };
  const getThreatDetails = () => {
    onThreatIntelligenceDetail(id);
  };

  // const onRemoveTag = (key, tagKey, evidenceLabel) => {
  //   const advIOC = threatIntelligenceDetails.advIoc;
  //   const updatatedAdvIoc = map(advIOC, (ioc, key) => {
  //     const category = Object.keys(advIOC[key]);
  //     category.find(item => {
  //       if (evidenceLabel === key && item === tagKey) {
  //         delete advIOC[key][tagKey];
  //       }
  //       return item;
  //     });
  //   });
  //   const newList = map(eviList, evi => {
  //     let newEvi;
  //     if (evi.key === key) {
  //       const newTags = filter(evi.tags, tag => {
  //         return tag.tag_key !== tagKey;
  //       });
  //       newEvi = {
  //         key: evi.key,
  //         label: evi.label,
  //         tags: newTags,
  //       };
  //     } else {
  //       newEvi = evi;
  //     }
  //     return newEvi;
  //   });
  //   updateArtifacts({
  //     selecteAdvisorieId,
  //     updatedArtifact: Object.keys(advIOC[evidenceLabel]).toString(),
  //     evidenceLabel,
  //   });
  //   onThreatIntelligenceDetail(selecteAdvisorieId);
  //   // setEviList(newList);
  // };

  function showConfirm(key) {
    Modal.confirm({
      title: 'Please Confirm if you want to remove the artifact',
      centered: true,
      okText: 'Confirm',
      onOk() {
        onAddArtifactAction(key, 'delete')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function confirmRemoveAsset() {
    Modal.confirm({
      title: 'Please Confirm if you want to remove the artifact',
      centered: true,
      okText: 'Confirm',
      onOk() {
        let payload = {
          adv_asset_or_type: "asset",
          adv_asset: false,
        }
        onUpdatePartialThreatIntel(selecteAdvisorieId, payload, false);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const templateList = [
    { key: 'template', value: 'template', label: 'Template' },
    { key: 'notify', value: 'notify', label: 'Notify' },
    { key: 'follow-up', value: 'follow-up', label: 'Follow-up' },
  ];

  const showRunBookModal = () => {
    setRunPlayBook(!runPlayBook);
  };

  const onClickSendEmail = () => {
    setIsSendEmailVisible(true);
  };

  const onAddProduct = SelectedKey => {
    setShouldShowLoader(true);
    const alreadyAdded = includes(pastProductList, SelectedKey);
    if (!alreadyAdded) {
      const newList = concat(pastProductList, SelectedKey);
      const updatedProductStr = newList.toString();
      setPastProductList(newList);
      onUpdateThreatIntel('adv_affected_products', updatedProductStr);
    }
  };

  const onRemoveProduct = SelectedKey => {
    setShouldShowLoader(true);
    const newList = filter(pastProductList, incidentKey => {
      return incidentKey !== SelectedKey;
    });
    const updatedProductStr = newList.toString();
    setPastProductList(newList);
    onUpdateThreatIntel('adv_affected_products', updatedProductStr);
  };

  const onAddVendor = SelectedKey => {
    setShouldShowLoader(true);
    const alreadyAdded = includes(pastVendorList, SelectedKey);
    if (!alreadyAdded) {
      const newList = concat(pastVendorList, SelectedKey);
      const updateVendorStr = newList.toString();
      setPastVendorList(newList);
      onUpdateThreatIntel('adv_affected_vendors', updateVendorStr);
    }
  };

  const onRemoveVendor = SelectedKey => {
    setShouldShowLoader(true);
    const newList = filter(pastVendorList, incidentKey => {
      return incidentKey !== SelectedKey;
    });
    const updateVendorStr = newList.toString();
    setPastVendorList(newList);
    onUpdateThreatIntel('adv_affected_vendors', updateVendorStr);
  };

  const onAssetsUpdateHandler = (assetId, action) => {
    setShouldShowLoader(true);
    if (action === "remove") {
      confirmRemoveAsset()
    } else {
      let payload = {
        adv_asset_or_type: "asset",
        adv_asset: parseInt(assetId)
      }
      onUpdatePartialThreatIntel(selecteAdvisorieId, payload, true);
    }
  };

  const executeAction = actionInfo => {
    executeRunAction({ actionInfo, selecteAdvisorieId });
  };

  const onAddArtifactAction = async (data, type = "update") => {
    if (type === "update") {
      await updateArtifacts({
        selecteAdvisorieId: threatIntelligenceAllData?.data?.adv_id,
        updatedArtifact: Object.values(data).toString(),
        evidenceLabel: Object.keys(data).toString(),
        type
      });
    } else {
      updateArtifacts({
        selecteAdvisorieId: threatIntelligenceAllData?.data?.adv_id,
        updatedArtifact: data,
        type
      });
    }
  };

  const addEvidenceAction = ({ values, outputHtml }) => {
    onAddEvidence({ values, ina_output_html: outputHtml }, selecteAdvisorieId);
  };

  const getRawAction = async value => {
    onGetRawData(value);
  };

  const treeChartPointClickHandler = e => {
    const pointName = e?.point?.name;
    if (new RegExp('advisory').test(pointName)) {
      const id = pointName.substr(pointName.indexOf('#') + 1);
      window.open(`/threatIntelligence/details/${id}`, '_blank');
    } else if (new RegExp('incident').test(pointName)) {
      const id = pointName.substr(pointName.indexOf('#') + 1);
      window.open(`/incidentManagement/details/${id}`, '_blank');
    }
  };

  const multiTabList = [
    {
      title: 'Timeline',
      key: 'timeline',
      component: (
        <div>
          <SPTimeLine data={timeLineChartData} />
        </div>
      ),
    },
    {
      title: 'Artifacts',
      key: 'artifacts',
      component: (
        <div>
          <SpLoader isLoading={isArtifactsLoading} />
          <TabReportBox
            getThreatDetails={getThreatDetails}
            threatIntelligenceDetails={threatIntelligenceDetails}
            advArtifactMapping={advArtifactMapping}
            evidenceList={eviList}
            showConfirm={showConfirm}
            executeAction={executeAction}
            addEvidence={addEvidenceAction}
            addExectionData={addExectionData}
            multiConfigExecutionAction={multiConfigExecutionAction}
            threatIntelligenceRawOutput={threatIntelligenceRawOutput}
            getRawData={getRawAction}
            onClearRawData={onClearRawData}
            incidentActionsMapped={
              threatIntelligenceAllData?.data?.incidentActionsMapped
            }
            addArtifactAction={data => {
              onAddArtifactAction(data);
            }}
            downloadFile={data => {
              onDowloadFile(data)
            }}
            actions={
              isArray(
                threatIntelligenceAllData?.data?.incidentActionsMapped?.actions
              )
                ? threatIntelligenceAllData?.data?.incidentActionsMapped?.actions.filter(
                  act => {
                    return act?.act_app_id;
                  }
                )
                : []
            }
            executed={
              isArray(
                threatIntelligenceAllData?.data?.incidentActionsMapped?.executed
              )
                ? threatIntelligenceAllData?.data?.incidentActionsMapped
                  ?.executed
                : []
            }
          />
        </div>
      ),
    },
    {
      title: 'Assets',
      key: 'assets',
      component: (
        <div>
          <AssetsList
            items={assetList}
            advAsset={threatIntelligenceDetails?.advAsset}
            threatIntelligence={threatIntelligenceDetails}
            onAdd={data => onAssetsUpdateHandler(data, 'add')}
            onRemove={data => onAssetsUpdateHandler(data, 'remove')}
          />
        </div>
      ),
    },
    {
      title: 'Affected Vendors',
      key: 'affectedvendors',
      component: (
        <AffectedVendorList
          vendor={vendorList}
          selectedVendor={pastVendorList}
          onAdd={onAddVendor}
          onRemove={onRemoveVendor}
        />
      ),
    },
    {
      title: 'Affected products',
      key: 'affectedProducts',
      component: (
        <AffectedProducts
          products={productList}
          selectedProduct={pastProductList}
          onAdd={onAddProduct}
          onRemove={onRemoveProduct}
        />
      ),
    },
    {
      title: 'Remidation',
      key: 'remidation',
      component: (
        <div>
          <TextEditBox
            title="Remediation details"
            data={threatIntelligenceDetails?.adv_suggestions_recovery}
            isEditableEnabled={true}
            closeEditView={true}
            editDetails={data => {
              setShouldShowLoader(true);
              onUpdateThreatIntel('adv_suggestions_recovery', data)
            }}
          />
        </div>
      ),
    },
    {
      title: 'Tree Graph',
      key: 'treeGraph',
      component: (
        <TreeChart
          data={advArtifactsChartData}
          pointClickHandler={treeChartPointClickHandler}
        />
      ),
    },
  ];

  const sendEmailSubmitHandler = data => {
    sendEmail({ selecteAdvisorieId, data });
  };

  function sendEmailModal() {
    return (
      <SendEmailModal
        isVisible={isSendEmailVisible}
        onSubmit={sendEmailSubmitHandler}
        onClose={() => setIsSendEmailVisible(false)}
        userEmailData={userEmailData}
        templateList={templateList}
      />
    );
  }

  return (
    <>
      <SModal
        title="Execute Playbook"
        visible={runPlayBook}
        onCancel={() => {
          setRunPlayBook(!runPlayBook);
        }}
        width="825px"
        footer={[]}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            const selectedPlaybook = filter(runPlayBookList, playbookData => playbookData.key === values.app_execute_type);
            const playbookName = selectedPlaybook?.length > 0 ? selectedPlaybook[0].label : '';
            executePlaybook({
              id: selecteAdvisorieId,
              playBookID: values.app_execute_type,
              playbookName
            });
            resetForm()
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
                  id="app_execute_type"
                  name="app_execute_type"
                  label="Playbook"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_execute_type}
                  value={values.app_execute_type}
                  touched={touched.app_execute_type}
                  width={575}
                  options={runPlayBookList}
                // disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <Row gutter={[19, 10]}>
                  <Col>
                    <ExecuteBtn>
                      <SPButton
                        onButtonClick={handleSubmit}
                        title="Execute"
                        size="small"
                      />
                    </ExecuteBtn>
                  </Col>
                </Row>
              </RowDiv>
            </Form>
          )}
        </Formik>
      </SModal>
      {/* onOk={onSubmit} */}
      <PageHeader
        showConfirm={showRunBookModal}
        incidentId={id}
        data={threatIntelligenceDetails}
        onClickSendEmail={onClickSendEmail}
        onAdvisoryExportAsPDF={onAdvisoryExportAsPDF}
      />

      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        <Col span={18}>
          <ThreatIntelligenceDetailsbox
            threatIntelligence={threatIntelligenceDetails}
            onUpdateThreatIntel={(key, data) => onUpdateThreatIntel(key, data)}
            onThreatIntelligenceDetail={onThreatIntelligenceDetail}
          // onThreatIntelligenceDetailHandler={getThreatDetails}
          />
        </Col>
        <Col span={6}>
          <ScoreComponent
            value={threatIntelligenceDetails?.advAsset?.ast_s3_score || 0}
            label="SIRP Score"
          />
          <AddRelatedAdvisory
            advisories={threatIntelligenceDetails?.relatedAdvisories}
          />
        </Col>
        {/* <StyledCol>
          <ScoreComponent
            value={threatIntelligenceDetails?.advAsset?.ast_s3_score || 0}
            label="SIRP Score"
          />
          <AddRelatedAdvisory
            advisories={threatIntelligenceDetails?.relatedAdvisories}
          />
        </StyledCol> */}
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <ActivityBox activities={threatIntelligenceDetails?.timeLine} />
        </Col>
        <Col span={18}>
          <SpLoader isLoading={shouldShowLoader && isTabLoading} />
          <SPTab tabs={multiTabList} showScroll={false} setShouldShowLoader={setShouldShowLoader} />
        </Col>
      </Row>
      {sendEmailModal()}
    </>
  );
};

const mapStateToProps = state => ({
  threatIntelligenceData: state.threatIntelligenceDetails?.listData?.data,
  threatIntelligenceAllData: state.threatIntelligenceDetails?.listData,
  threatIntelligenceRawOutput: state.threatIntelligenceDetails?.rawOutput,
  threatIntelligenceProductList: state.threatIntelligenceProductList?.listData,
  threatIntelligenceVendors: state.threatIntelligenceVendors,
  threatIntelligenceAsset: state.threatIntelligenceAsset?.listData,
  threatIntelligenceRunPlayBook: state.threatIntelligenceRunPlayBook,
  threatIntelligenceExecutePlayBook: state.threatIntelligenceExecutePlayBook,
  threatIntelligentUserEmailList: state.threatIntelligentUserEmailList,
  threatIntelligentSendEmail: state.threatIntelligentSendEmail,
  threatIntelligenceOpenCase: state.threatIntelligenceOpenCase,
  threatIntelligentExecuteAction: state.threatIntelligentExecuteAction,
  isTabLoading: state.threatIntelligencePartialUpdate.loading,
  isArtifactsLoading: state.threatIntelligentUpdateArtifacts.loading
});
const mapDispatchToProps = dispatch => ({
  onThreatIntelligenceDetail: id => {
    dispatch(threatIntelligenceStoreResetAfterAfterOpenCase());
    dispatch(threatIntelligenceDetail(id));
  },
  onDowloadFile: (...args) => dispatch(downloadAsset(...args)),
  getProductDetails: () => dispatch(getProductDetails()),
  onAdvisoryExportAsPDF: id => dispatch(advisoryExportAsPDF(id)),
  getAdvisoryVendors: () => dispatch(getAdvisoryVendors()),
  onListAsset: () => dispatch(listAsset()),
  onUpdatePartialThreatIntel: (...args) => {
    updatePartialThreatIntelReset();
    return dispatch(updatePartialThreatIntel(...args));
  },
  getRunPlaybookData: () => dispatch(getRunPlaybookData()),
  executePlaybook: values => dispatch(executePlaybook(values)),
  getUserEmailList: values => dispatch(getUserEmailList(values)),
  sendEmail: values => dispatch(sendEmail(values)),
  updateArtifacts: values => dispatch(updateArtifacts(values)),
  executeRunAction: values => dispatch(executeAction(values)),
  multiConfigExecutionAction: values => dispatch(multiConfigExecution(values)),
  onAddEvidence: (value, id) => dispatch(addEvidence(value, id)),
  onGetRawData: value => dispatch(getRawOutput(value)),
  onClearRawData: () => dispatch(clearRawOutput()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatIntelligenceDetails);
