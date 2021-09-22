import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, notification } from 'antd';
import 'antd/dist/antd.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import SPCog from '../../../../components/SPCog';
import SPButton from '../../../../components/SPButton';
import Settings from '../components/settings';
import FilteredResult from '../components/filteredResult';
import Assets from '../components/assets';
import FieldPath from '../components/fieldPath';
import Output from '../components/output';
import TemplateModal from '../components/TemplateModal';
import PageHeader from '../../../layout/pageHeader';
import { useHistory } from 'react-router-dom';
import {
  getAssetTemplates,
  assetImportProcess,
  clearImportProcess,
  clearImport,
} from '../../../../actions/assets';
import { StyledDiv, StyledRow, StyledCol } from './StyledComponents';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../HOCs/AuthTokenHOC';

function AssetsMapFields({
  clearImport,
  clearImportProcess,
  getAssetTemplates,
  templateList,
  importAssetStore,
  assetImportProcess,
  assetImportProcessData,
}) {
  const history = useHistory();
  const [settingVisible, setSettingVisible] = useState(true);
  const [fieldPathVisible, setFieldPathVisible] = useState(true);
  const [outputVisible, setOutputVisible] = useState(true);
  const [filteredResultsVisible, setFilteredResultsVisible] = useState(true);
  const [assetsVisible, setAssetsVisible] = useState(true);
  const [assetTemplateOption, setAssetTemplateOption] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedTemplateObjectCode, setSelectedTemplateObjectCode] = useState(
    {}
  );
  const [isTemplateVisible, setIsTemplateVisible] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [resultJson, setResultJson] = useState([]);
  const [selectedRootPath, setSelectedRootPath] = useState('');

  const collapseAllField = () => {
    if (
      !settingVisible &&
      !fieldPathVisible &&
      !outputVisible &&
      !filteredResultsVisible &&
      !assetsVisible
    ) {
      setSettingVisible(true);
      setFieldPathVisible(true);
      setOutputVisible(true);
      setFilteredResultsVisible(true);
      setAssetsVisible(true);
    } else {
      setSettingVisible(false);
      setFieldPathVisible(false);
      setOutputVisible(false);
      setFilteredResultsVisible(false);
      setAssetsVisible(false);
    }
  };

  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      onClick: () => {},
    });
  };

  useEffect(() => {
    getAssetTemplates();
  }, []);

  useEffect(() => {
    if (
      importAssetStore?.result &&
      importAssetStore?.result?.data !== undefined
    ) {
      setResultJson(importAssetStore?.result?.data[0]);
    } else {
      console.log('data');
      clearImportProcess();
      clearImport();
      history.push('/assets');
    }
  }, [importAssetStore?.result]);

  useEffect(() => {
    if (assetImportProcessData.isSuccess) {
      openNotification('Import is in process', '');
      clearImportProcess();
      clearImport();
      history.push('/assets');
    }
  }, [assetImportProcessData.isSuccess]);

  useEffect(() => {
    if (Object.keys(templateList).length != 0) {
      let templateData = templateList?.data.find(
        obj => obj.at_id == selectedTemplate
      );
      if (templateData) {
        if (templateData?.at_code) {
          setSelectedTemplateObjectCode(JSON.parse(templateData?.at_code));
        } else {
          setSelectedTemplateObjectCode({});
        }
      }

      console.log(templateData);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    let optiondata = [];

    if (Object.keys(templateList).length != 0) {
      templateList.data.forEach(element => {
        optiondata.push({
          key: element.at_id,
          value: String(element.at_id),
          label: element.at_name,
        });
      });
    }
    setAssetTemplateOption(optiondata);
  }, [templateList]);

  const onSubmitTemplate = () => {
    openNotification('Template created', '');
    getAssetTemplates();
    setIsTemplateVisible(false);
  };

  const setFilterName = value => {
    let resultArrayItem = [];
    setResultArray(resultArrayItem);
    const key = value.slice(3, -1);
    if (
      importAssetStore?.result &&
      importAssetStore?.result?.data !== undefined
    ) {
      importAssetStore?.result?.data[0].forEach(function (entry) {
        console.log(key);
        console.log(entry);
        if (key in entry) {
          resultArrayItem.push(entry[key]);
        }
      });
    }

    setResultArray(resultArrayItem);
  };
  const onClickCanecl = () => {
    clearImportProcess();
    clearImport();
    history.push('/assets');
  };
  const onClickImportProcess = () => {
    const apiData = {
      json: JSON.stringify(resultJson),
      Assets: JSON.stringify(selectedTemplateObjectCode),
      template: parseInt(selectedTemplate),
      rootPath: selectedRootPath,
    };

    if (isEmpty(selectedTemplateObjectCode)) {
      openNotification(
        'Template code is empty!',
        'Please select another template or click on Save Draft template'
      );
    }
    if (isEmpty(selectedTemplate)) {
      openNotification(
        'Template field is required!',
        'Please select template field!'
      );
    }
    if (isEmpty(resultJson)) {
      history.push('/assets');
    }
    if (!isEmpty(resultJson) && !isEmpty(selectedTemplate)) {
      assetImportProcess(apiData);
    }
  };

  return (
    <>
      <PageHeader title="FIELD MAPPING" options={[]} />

      <StyledRow gutter={100}>
        <StyledCol>
          <Row justify="end" gutter={10}>
            <Col>
              <SPButton
                title={
                  !settingVisible &&
                  !fieldPathVisible &&
                  !outputVisible &&
                  !filteredResultsVisible &&
                  !assetsVisible
                    ? 'Expand All Fields'
                    : 'Collapse All Fields'
                }
                size="small"
                onButtonClick={collapseAllField}
                type="secondary"
              />
            </Col>
          </Row>
        </StyledCol>
        <StyledCol></StyledCol>
      </StyledRow>
      <StyledRow gutter={100}>
        <StyledCol>
          <Settings
            visible={settingVisible}
            onClose={() => setSettingVisible(false)}
            onOpen={() => setSettingVisible(true)}
            assetTemplateOption={assetTemplateOption}
            setUpdatedTemplate={setSelectedTemplate}
            setTemplateVisible={() => setIsTemplateVisible(true)}
            setSelectedRootPath={setSelectedRootPath}
          />
          <Assets
            visible={assetsVisible}
            onClose={() => setAssetsVisible(false)}
            onOpen={() => setAssetsVisible(true)}
            templateCode={selectedTemplateObjectCode}
            template={selectedTemplate}
          />
        </StyledCol>
        <StyledCol>
          <FieldPath
            visible={fieldPathVisible}
            onClose={() => setFieldPathVisible(false)}
            onOpen={() => setFieldPathVisible(true)}
            setFilterName={setFilterName}
          />
          <FilteredResult
            visible={filteredResultsVisible}
            resultArray={resultArray}
            onClose={() => setFilteredResultsVisible(false)}
            onOpen={() => setFilteredResultsVisible(true)}
          />
          <Output
            visible={outputVisible}
            onClose={() => setOutputVisible(false)}
            onOpen={() => setOutputVisible(true)}
            jsonData={
              importAssetStore?.result?.data
                ? importAssetStore?.result?.data[0]
                : []
            }
            setResultJson={setResultJson}
          />
        </StyledCol>
      </StyledRow>
      <StyledRow gutter={100}>
        <StyledCol>
          <Row justify="end" gutter={10}>
            <Col>
              <SPButton
                title="Cancel"
                size="small"
                onButtonClick={onClickCanecl}
              />
            </Col>
            <Col>
              <SPButton
                title="Import"
                size="small"
                onButtonClick={onClickImportProcess}
              />
            </Col>
          </Row>
        </StyledCol>
      </StyledRow>
      <TemplateModal
        isVisible={isTemplateVisible}
        onSubmit={onSubmitTemplate}
        onClose={() => setIsTemplateVisible(false)}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    templateList: state.assetsStore.templateList,
    loading: state.assetsStore.loading,
    importAssetStore: state.importAssetStore,
    assetImportProcessData: state.assetImportProcess,
  };
};

const mapDispatchToProps = {
  getAssetTemplates,
  assetImportProcess,
  clearImportProcess,
  clearImport,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(AssetsMapFields);
