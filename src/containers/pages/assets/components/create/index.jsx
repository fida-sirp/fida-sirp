import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { listLocations } from '../../../../../actions/locations';
import loaderImg from '../../../../../assets/images/loader.gif';
import moment from 'moment';
import {
  editAsset,
  createAsset,
  listAssetClassification,
  listAssetOS,
  listAssetCategories,
  listAssetEnableFields,
  listAssetTypes,
  getCategoryFields,
} from '../../../../../actions/assets';

import {
  listAssetSystemTypes,
  listAssetNetWorkTypes,
  listAssetPowerStatus,
  listAssetDocumentTypes,
  listAssetSiems,
  listAssetZones,
  listAssetProducts,
  listAssetVendors,
  listAssetServer,
} from '../../../../../actions/assetMasterData';
import { listAssetValue } from '../../../../../actions/assetValue';
import { listAssetStatus } from '../../../../../actions/assetStatus';
import { listDepartments } from '../../../../../actions/departments';
import { listOwners } from '../../../../../actions/owners';
import { listAssetRemoteApp } from '../../../../../actions/assetRemoteApp';
import { fromPairs, isEmpty } from 'lodash';
import SPButton from '../../../../../components/SPButton';
import SPDatepicker from '../../../../../components/SPDatepicker';

import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SelectBox from '../../../../../components/SelectBox';
import 'antd/dist/antd.css';
import { RowDiv, NewRowDiv, AModal } from './StyledComponents';
import { AlertBox } from './../createRule/StyledComponents';
import { string } from 'yup/lib/locale';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const ipTypeOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 'ipv4', value: 'ipv4', label: 'ipv4' },
  { key: 'ipv6', value: 'ipv6', label: 'ipv6' },
];

const integratedOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 'Yes', value: 'Yes', label: 'Yes' },
  { key: 'No', value: 'No', label: 'No' },
];

const powerStatusOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 3, value: '3', label: 'Powered On' },
  { key: 4, value: '4', label: 'Powered Off' },
];

const employeeTypeOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 3, value: 'Permanent', label: 'Permanent' },
  { key: 4, value: 'Permanent Full-time', label: 'Permanent Full-time' },
  { key: 5, value: 'Permanent Part-time', label: 'Permanent Part-time' },
  { key: 5, value: 'Contractor', label: 'Contractor' },
];

const systemTypeOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 8, value: '8', label: 'X86-based PC' },
  { key: 9, value: '9', label: 'X64-based PC' },
  { key: 10, value: '10', label: 'PRD' },
  { key: 11, value: '11', label: 'DEV' },
  { key: 12, value: '12', label: 'QAS' },
  { key: 13, value: '13', label: 'QAS' },
  { key: 14, value: '14', label: 'QAS' },
];

const networkTypeOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 5, value: '5', label: 'VM Network' },
  { key: 6, value: '6', label: 'PROD' },
  { key: 7, value: '7', label: 'Public' },
  { key: 8, value: '8', label: 'Private Cluster Network' },
];

const deptOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 1, value: '1', label: 'Information Technology' },
  { key: 25, value: '25', label: 'Information Security' },
  { key: 27, value: '27', label: 'test' },
];

const statusOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 3, value: '3', label: 'UP' },
  { key: 4, value: '4', label: 'DOWN' },
];

const hostedOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 'In-house', value: 'In-house', label: 'In-house' },
  { key: 'Outsourced', value: 'Outsourced', label: 'Outsourced' },
];

const remoteAPOptions = [
  {
    key: 'default',
    value: '',
    label: 'Select Your Option Here',
    disabled: true,
  },
  { key: 3, value: '3', label: 'YES' },
  { key: 4, value: '4', label: 'NO' },
];

const initialValuesPrimary = {
  ast_asset_category: 'Hardware',
  ast_integrated: '',
  ast_name: '',
  ast_hosted: '',
  ast_asset_value: '',
  ast_hostname: '',
  ast_dns: '',
  ast_ip_address: '',
  ast_external_ip_address: '',
  ast_ip_type: '',
  ast_mac_address: '',
  ast_netbios_name: '',
  ast_owner_id: undefined,
  ast_custodian: undefined,
  ast_os_id: '',
  ast_app_type: '',
  ast_make: '',
  ast_model: '',
  ast_serial_no: '',
  ast_slot_number: '',
  ast_classification: '',
  ast_branch_code: '',
  ast_location: undefined,
  ast_products: undefined,
  ast_vendor: undefined,
  ast_siem: undefined,
  ast_zone: undefined,
  assetType: undefined,
  ast_server_type: '',
  ast_power_status: '',
  ast_system_type: '',
  ast_network_type: '',
  ast_rack_number: '',
  ast_department: '',
  ast_status: '',
  ast_remote_ap: '',
  ast_function: '',
  ast_memory: '',
  ast_tag: '',
  ast_description: '',
  ast_location_desc: '',

  ast_software_type: '',
  ast_current_version: '',
  ast_number_of_licenses: '',

  ast_document_type: '',
  ast_process_name: '',

  ast_process_owner: '',

  ast_machine_category: '',

  ast_administrator: '',
  ast_server: '',
  ast_database: '',

  ast_key_user: '',
  ast_installation: '',

  ast_email: '',
  ast_employee_number: '',
  ast_department_head: '',
  ast_organizational_unit: '',
  ast_nationality: '',
  ast_supervisor_id: '',
  ast_supervisor_name: '',
  ast_employee_type: '',
  ast_designation: '',
  ast_account_expiration: '',
  ast_number_of_instances: '',
  ast_category: '',
};

function Create({
  type,
  item,
  newAsset,
  createAsset,
  onCloseDrawer,
  refreshAssetsList,
  listLocations,
  locations,
  listAssetClassification,
  assetClassification,
  listAssetOS,
  assetOS,
  assetOwners,
  listOwners,
  listAssetTypes,
  assetTypes,
  listAssetCategories,
  assetCategories,
  listAssetEnableFields,
  assetEnableFields,
  isSuccessEdited,
  editAsset,
  assetValues,
  listAssetValue,
  departments,
  listDepartments,
  listAssetStatus,
  assetStatus,
  listAssetRemoteApp,
  assetRemoteApps,
  listAssetSystemTypes,
  listAssetNetWorkTypes,
  listAssetPowerStatus,
  listAssetDocumentTypes,
  listAssetSiems,
  listAssetZones,
  listAssetProducts,
  listAssetVendors,
  systemTypes,
  networkTypes,
  powerStatus,
  documentTypes,
  zones,
  products,
  vendors,
  siemsTypes,
  getCategoryFields,
  assetFields,
  listAssetServer,
  servers,
  isVisible,
  isCategoryFieldsLoaded,
}) {
  const [locationOptionsData, setLocationOptionsData] = useState([]);
  const [assetClassificationOptionsData, setAssetClassificationData] = useState(
    []
  );
  const [assetOSOptionsData, setAssetOSOptionsData] = useState([]);
  const [assetCategoriesOptionsData, setAssetCategoriesOptionsData] = useState(
    []
  );
  const [assetTypesOptionsData, setAssetTypesOptionsData] = useState([]);
  const [assetOwnersOptionsData, setAssetOwnersOptionsData] = useState([]);
  const [assetValueOptionsData, setAssetValueOptionsData] = useState([]);
  const [departmementOptionsData, setDepartmementOptionsData] = useState([]);
  const [assetStatusOptionData, setAssetStatusOptionData] = useState([]);
  const [assetRemoteAppsOptionsData, setAssetRemoteAppsOptionsData] = useState(
    []
  );

  const [systemTypesOptionsData, setSystemTypesOptionsData] = useState([]);
  const [networkTypesOptionsData, setNetworkTypesOptionsData] = useState([]);
  const [powerStatusOptionsData, setPowerStatusOptionsData] = useState([]);
  const [documentTypeOptionData, setDocumentTypeOptionData] = useState([]);
  const [zoneOptionData, setZoneOptionData] = useState([]);
  const [productsOptionData, setProductsOptionData] = useState([]);
  const [vendorsOptionData, setVendorsOptionData] = useState([]);
  const [siemsTypesOptionData, setSiemsTypesOptionData] = useState([]);
  const [serverOptionData, serServerOptionData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [dynamicFields, setDynamicFields] = useState({});

  // const [initialValuesArray, setInitialValuesArray] = useState([]);
  // const [validationSchemasArray, setValidationSchemasArray] = useState([]);

  // const [initialValues, setInitialValues] = useState([]);
  // const [validationSchema, setValidationSchema] = useState([]);

  useEffect(() => {
    listAssetCategories();
    listLocations();
    listAssetClassification();
    listAssetOS();
    listAssetTypes();
    listOwners();
    listAssetValue();
    listDepartments();
    listAssetStatus();
    listAssetRemoteApp();
    listAssetSystemTypes();
    listAssetNetWorkTypes();
    listAssetPowerStatus();
    listAssetDocumentTypes();
    listAssetSiems();
    listAssetZones();
    listAssetProducts();
    listAssetVendors();
    listAssetEnableFields();
    listAssetServer();
  }, []);

  useEffect(() => {
    let locationData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(locations).length != 0) {
      locations.data.items.forEach(element => {
        locationData.push({
          key: element.loc_id,
          value: String(element.loc_id),
          label: element.loc_name,
        });
      });
    }
    setLocationOptionsData(locationData);
  }, [locations]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(systemTypes).length != 0 && systemTypes !== undefined) {
      for (const [key, value] of Object.entries(systemTypes.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setSystemTypesOptionsData(obData);
  }, [systemTypes]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(powerStatus).length != 0 && powerStatus !== undefined) {
      for (const [key, value] of Object.entries(powerStatus.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setPowerStatusOptionsData(obData);
  }, [powerStatus]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(servers).length != 0 && servers !== undefined) {
      for (const [key, value] of Object.entries(servers.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    serServerOptionData(obData);
  }, [servers]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(documentTypes).length != 0 && documentTypes !== undefined) {
      for (const [key, value] of Object.entries(documentTypes.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setDocumentTypeOptionData(obData);
  }, [documentTypes]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(networkTypes).length != 0 && networkTypes !== undefined) {
      for (const [key, value] of Object.entries(networkTypes.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setNetworkTypesOptionsData(obData);
  }, [networkTypes]);

  useEffect(() => {
    let obData = [];
    if (Object.keys(zones).length != 0 && zones !== undefined) {
      for (const [key, value] of Object.entries(zones.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setZoneOptionData(obData);
  }, [zones]);

  useEffect(() => {
    let obData = [];
    if (Object.keys(products).length != 0 && products !== undefined) {
      for (const [key, value] of Object.entries(products.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setProductsOptionData(obData);
  }, [products]);

  useEffect(() => {
    let obData = [];
    if (Object.keys(vendors).length != 0 && vendors !== undefined) {
      for (const [key, value] of Object.entries(vendors.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setVendorsOptionData(obData);
  }, [vendors]);

  useEffect(() => {
    let obData = [];
    if (Object.keys(siemsTypes).length != 0 && siemsTypes !== undefined) {
      for (const [key, value] of Object.entries(siemsTypes.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setSiemsTypesOptionData(obData);
  }, [siemsTypes]);

  useEffect(() => {
    let obData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (
      Object.keys(assetRemoteApps).length != 0 &&
      assetRemoteApps !== undefined
    ) {
      for (const [key, value] of Object.entries(assetRemoteApps.data)) {
        obData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setAssetRemoteAppsOptionsData(obData);
  }, [assetRemoteApps]);

  useEffect(() => {
    let locationData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(departments).length != 0 && departments !== undefined) {
      for (const [key, value] of Object.entries(departments.data)) {
        locationData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setDepartmementOptionsData(locationData);
  }, [departments]);

  useEffect(() => {
    let locationData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(assetStatus).length != 0 && assetStatus !== undefined) {
      for (const [key, value] of Object.entries(assetStatus.data)) {
        locationData.push({
          key: key,
          value: String(key),
          label: value,
        });
      }
    }
    setAssetStatusOptionData(locationData);
  }, [assetStatus]);

  useEffect(() => {
    let assetValuesData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(assetValues).length != 0) {
      assetValues.data.items.forEach(element => {
        assetValuesData.push({
          key: String(element.asv_id),
          value: String(element.asv_id),
          label: String(element.asv_name),
        });
      });
    }

    setAssetValueOptionsData(assetValuesData);
  }, [assetValues]);

  useEffect(() => {
    let assetClassificationData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(assetClassification).length != 0) {
      assetClassification.data.items.forEach(element => {
        assetClassificationData.push({
          key: String(element.asc_id),
          value: String(element.asc_id),
          label: String(element.asc_name),
        });
      });
    }
    setAssetClassificationData(assetClassificationData);
  }, [assetClassification]);

  useEffect(() => {
    let assetTypesData = [
      {
        key: 'default',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (Object.keys(assetTypes).length != 0) {
      assetTypes.data.items.forEach(element => {
        assetTypesData.push({
          key: element.aty_id,
          value: String(element.aty_id),
          label: element.aty_name,
        });
      });
    }
    setAssetTypesOptionsData(assetTypesData);
  }, [assetTypes]);

  useEffect(() => {
    let assetOwnersData = [];
    if (Object.keys(assetOwners).length != 0) {
      assetOwners.data.items.forEach(element => {
        assetOwnersData.push({
          key: element.usr_id,
          value: String(element.usr_id),
          label: element.usr_name,
        });
      });
    }
    setAssetOwnersOptionsData(assetOwnersData);
  }, [assetOwners]);

  function isFieldAvailable(fieldName) {
    if (assetFields?.data) {
      let arrayKey = Object.keys(assetFields?.data);
      if (arrayKey.includes(fieldName)) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  function getLabel(fieldName) {
    if (assetFields?.data) {
      let arrayKey = Object.keys(assetFields?.data);

      if (arrayKey.includes(fieldName)) {
        return assetFields?.data[fieldName];
      } else {
        return '';
      }
    }
    return true;
  }

  useEffect(() => {
    let assetOSData = [];
    let label = '';
    if (Object.keys(assetOS).length != 0) {
      assetOS.data.items.forEach(element => {
        if (element.aos_os_version) {
          label = element.aos_os_name + ' ( ' + element.aos_os_version + ' ) ';
        } else {
          label = element.aos_os_name;
        }
        assetOSData.push({
          key: element.aos_id,
          value: String(element.aos_id),
          label: label,
        });
      });
    }
    setAssetOSOptionsData(assetOSData);
  }, [assetOS]);

  useEffect(() => {
    let obData = [
      {
        key: 'asf_hardware',
        value: '',
        label: 'Select Your Option Here',
        disabled: true,
      },
    ];
    if (
      Object.keys(assetCategories).length != 0 &&
      assetCategories !== undefined
    ) {
      for (const [key, value] of Object.entries(assetCategories.data)) {
        obData.push({
          key: key,
          value: String(value),
          label: value,
        });
      }
    }
    setAssetCategoriesOptionsData(obData);
  }, [assetCategories]);

  function generateError(data) {
    if (Array.isArray(data)) {
      const items = data.map(item => <li>{item.message}</li>);
      return items;
    } else if (typeof data === 'object' && data !== null) {
      const items = Object.keys(data).map(function (key) {
        return <li value={key}>{data[key]}</li>;
      });
      return items;
    } else {
      return data.message;
    }
  }

  const handleDynamicOKField = () => {
    let fieldsData = {};
    fieldsData[fieldName] = '';
    setDynamicFields({ ...dynamicFields, ...fieldsData });
    setFieldName('');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFieldName('');
  };

  const handleFieldChange = value => {
    setFieldName(value.target.value);
  };

  function AddFieldModal() {
    return (
      <AModal
        title="Add Dynamic Field"
        visible={isModalVisible}
        footer={[]}
        onOk={handleDynamicOKField}
        onCancel={handleCancel}
      >
        <NewRowDiv>
          <InputBox
            id="field_name"
            label={'Name'}
            name="field_name"
            placeholder={'Name'}
            onInputChange={handleFieldChange}
            value={fieldName}
            width={345}
            noBorderValidation
            noBorderValidation
          />
        </NewRowDiv>
        <Row gutter={11} justify="end">
          <Col>
            <SPButton
              title="Cancel"
              size="small"
              type="secondary"
              onButtonClick={handleCancel}
            />
          </Col>
          <Col>
            <SPButton
              title={'Create'}
              size="small"
              type="submit"
              onButtonClick={handleDynamicOKField}
            />
          </Col>
        </Row>
      </AModal>
    );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      {AddFieldModal()}
      {newAsset.hasErrors ? (
        <AlertBox
          message={
            <ul className="margin-10">{generateError(newAsset.data)}</ul>
          }
          type="error"
          closable
        />
      ) : null}

      <Formik
        id="formik"
        initialValues={{
          ...initialValuesPrimary,
          assetdynamicfields: dynamicFields,
        }}
        onSubmit={(values, { resetForm }) => {
          for (let [key, value] of Object.entries(values)) {
            if (value === 'null') {
              value = null;
            }
            values[key] = value;
          }
          // values={...values,assetType:values.ast_app_type};
          if (values.ast_zone) {
            values = { ...values, ast_zone: values.ast_zone.toString() };
          }
          if (values.ast_vendor) {
            values = { ...values, ast_vendor: values.ast_vendor.toString() };
          }
          if (values.ast_siem) {
            values = { ...values, ast_siem: values.ast_siem.toString() };
          }
          if (values.ast_products) {
            values = {
              ...values,
              ast_products: values.ast_products.toString(),
            };
          }
          if (values.ast_account_expiration) {
            values = {
              ...values,
              ast_account_expiration: moment(
                values.ast_account_expiration
              ).format(dateFormat),
            };
          }

          if (type == 'edit') {
            values = { ...values, ast_id: item.ast_id };

            editAsset(values);
          } else {
            createAsset(values);
          }

          //resetForm();
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
          setSubmitting,
        }) => {
          function handleDynamicFieldChange(event) {
            setFieldValue(
              'assetdynamicfields.' + event.target.id,
              event.target.value
            );
          }

          function removeDynamicFields(value) {
            const todos = dynamicFields;
            const { [value]: _, ...newTodos } = todos;
            setDynamicFields(newTodos);
            setFieldValue('assetdynamicfields', newTodos);
          }

          useEffect(() => {
            if (newAsset.isSuccess) {
              onCloseDrawer();
              refreshAssetsList();
              setSubmitting(false);
            }
          }, [newAsset.isSuccess]);

          useEffect(() => {
            if (newAsset.hasErrors) {
              setSubmitting(false);
            }
          }, [newAsset.hasErrors]);

          useEffect(() => {
            resetForm();
            setDynamicFields({});
          }, [isVisible]);

          useEffect(() => {
            resetForm();
            if (type == 'create') {
              if (item?.ast_name) {
                setFieldValue('ast_name', item?.ast_name, false);
              }
            }

            if (type == 'edit') {
              for (let [key, value] of Object.entries(item)) {
                if (
                  key === 'ast_owner_id' ||
                  key === 'ast_custodian' ||
                  key === 'ast_zone' ||
                  key === 'ast_vendor' ||
                  key === 'ast_products' ||
                  key === 'ast_siem'
                ) {
                  if (value !== '' && value !== null) {
                    value = value.split(',');
                    setFieldValue(key, value, false);
                  } else {
                    setFieldValue(key, undefined, false);
                  }
                } else if (key === 'astTypes') {
                  if (value) {
                    if (value[0]) {
                      setFieldValue(
                        'assetType',
                        String(value[0].aty_id),
                        false
                      );
                    }
                  }
                } else if (key === 'ast_account_expiration') {
                  if (
                    moment(value, dateFormat) &&
                    moment(value, dateFormat).isValid()
                  ) {
                    setFieldValue(
                      'ast_account_expiration',
                      moment(value, dateFormat),
                      false
                    );
                  }
                } else if (key === 'ast_dynamic_fields') {
                  console.log(value);
                  if (null != value && value != '') {
                    if (
                      /^[\],:{}\s]*$/.test(
                        value
                          .replace(/\\["\\\/bfnrtu]/g, '@')
                          .replace(
                            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            ']'
                          )
                          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
                      )
                    ) {
                      let jsonData = JSON.parse(value);
                      console.log(jsonData);
                      setDynamicFields(jsonData);
                      if (jsonData) {
                        for (let keyItem of Object.keys(jsonData)) {
                          setFieldValue(
                            'assetdynamicfields.' + keyItem,
                            jsonData[keyItem]
                          );
                        }
                      } else {
                        setDynamicFields({});
                      }
                    } else {
                      setDynamicFields({});
                    }
                  } else {
                    setDynamicFields({});
                  }
                } else {
                  if (value !== null) {
                    setFieldValue(key, String(value), false);
                  }
                }
              }
              if (assetCategoriesOptionsData) {
                let keyItem1 = assetCategoriesOptionsData.find(
                  x => x.value === item['ast_asset_category']
                );
                if (keyItem1) {
                  getCategoryFields(keyItem1.key);
                }
              }
            } else {
              setDynamicFields({});
              getCategoryFields('asf_hardware');
            }
          }, [isVisible]);

          useEffect(() => {
            if (isSuccessEdited) {
              resetForm();
              onCloseDrawer();
              refreshAssetsList();
            }
          }, [isSuccessEdited]);

          const onChangeInCategory = (key, value) => {
            setFieldValue(key, String(value), false);
            let keyItem = assetCategoriesOptionsData.find(
              x => x.value === value
            ).key;
            getCategoryFields(keyItem);
          };

          const addTagsField = (key, value) => {
            let options = [];
            if (key === 'ast_vendor') {
              options = vendorsOptionData;
            }
            if (key === 'ast_products') {
              options = productsOptionData;
            }
            let data = options.find(x => x.value == value);
            if (data === undefined) {
            }
          };

          useEffect(() => {
            if (type == 'edit') {
              if (assetCategoriesOptionsData) {
                let keyItem1 = assetCategoriesOptionsData.find(
                  x => x.value === item['ast_asset_category']
                );
                if (keyItem1) {
                  getCategoryFields(keyItem1.key);
                }
              }
            }
          }, [assetCategoriesOptionsData]);
          return (
            <Form>
              <div className="add-dynamic-field">
                <SPButton
                  title="Add Field"
                  size="small"
                  type="primary"
                  onButtonClick={showModal}
                />
              </div>
              <RowDiv>
                <SelectBox
                  id="ast_asset_category"
                  label="Asset category"
                  name="ast_asset_category"
                  placeholder="Asset category"
                  onInputChange={onChangeInCategory}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_asset_category}
                  value={values.ast_asset_category}
                  width={583}
                  touched={touched.ast_asset_category}
                  options={assetCategoriesOptionsData}
                  disabled={isSubmitting}
                />
              </RowDiv>
              {!isCategoryFieldsLoaded && (
                <div className="make-child-center">
                  <img src={loaderImg} />
                </div>
              )}

              <NewRowDiv>
                <InputBox
                  id="ast_name"
                  label={getLabel('ast_name')}
                  name="ast_name"
                  placeholder={getLabel('ast_name')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_name}
                  value={values.ast_name}
                  width={345}
                  touched={touched.ast_name}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_name')}
                />
                <InputBox
                  id="ast_category"
                  label={getLabel('ast_category')}
                  name="ast_category"
                  placeholder={getLabel('ast_category')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_category}
                  value={values.ast_category}
                  width={345}
                  touched={touched.ast_category}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_category')}
                />
                <InputBox
                  id="ast_key_user"
                  label={getLabel('ast_key_user')}
                  name="ast_key_user"
                  placeholder={getLabel('ast_key_user')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_key_user}
                  value={values.ast_key_user}
                  width={345}
                  touched={touched.ast_key_user}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_key_user')}
                />

                <SelectBox
                  id="assetType"
                  name="assetType"
                  label="Assets Type"
                  placeholder="Assets Type"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.assetType}
                  value={values.assetType}
                  touched={touched.assetType}
                  width={345}
                  options={assetTypesOptionsData}
                  disabled={isSubmitting}
                  isHide={
                    !isCategoryFieldsLoaded || values.ast_asset_category === ''
                  }
                />

                <InputBox
                  id="ast_process_owner"
                  label={getLabel('ast_process_owner')}
                  name="ast_process_owner"
                  placeholder={getLabel('ast_process_owner')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_process_owner}
                  value={values.ast_process_owner}
                  width={345}
                  touched={touched.ast_process_owner}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_process_owner')}
                />

                <InputBox
                  id="ast_identifier"
                  label={getLabel('ast_identifier')}
                  name="ast_identifier"
                  placeholder={getLabel('ast_identifier')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_identifier}
                  value={values.ast_identifier}
                  width={345}
                  touched={touched.ast_identifier}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_identifier')}
                />

                <InputBox
                  id="ast_number_of_instances"
                  label={getLabel('ast_number_of_instances')}
                  name="ast_number_of_instances"
                  placeholder={getLabel('ast_number_of_instances')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_number_of_instances}
                  value={values.ast_number_of_instances}
                  width={345}
                  touched={touched.ast_number_of_instances}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_number_of_instances')}
                />

                <InputBox
                  id="ast_process_name"
                  label={getLabel('ast_process_name')}
                  name="ast_process_name"
                  placeholder={getLabel('ast_process_name')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_process_name}
                  value={values.ast_process_name}
                  width={345}
                  touched={touched.ast_process_name}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_process_name')}
                />

                <InputBox
                  id="ast_email"
                  label={getLabel('ast_email')}
                  name="ast_email"
                  placeholder={getLabel('ast_email')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_email}
                  value={values.ast_email}
                  width={345}
                  touched={touched.ast_email}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_email')}
                />
                <InputBox
                  id="ast_employee_number"
                  label={getLabel('ast_employee_number')}
                  name="ast_employee_number"
                  placeholder={getLabel('ast_employee_number')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_employee_number}
                  value={values.ast_employee_number}
                  width={345}
                  touched={touched.ast_employee_number}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_employee_number')}
                />

                <SelectBox
                  id="ast_employee_type"
                  label={getLabel('ast_employee_type')}
                  name="ast_employee_type"
                  placeholder={getLabel('ast_employee_type')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_employee_type}
                  value={values.ast_employee_type}
                  touched={touched.ast_employee_type}
                  width={345}
                  options={employeeTypeOptions}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_employee_type')}
                />

                <InputBox
                  id="ast_designation"
                  label={getLabel('ast_designation')}
                  name="ast_designation"
                  placeholder={getLabel('ast_designation')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_designation}
                  value={values.ast_designation}
                  width={345}
                  touched={touched.ast_designation}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_designation')}
                />

                <InputBox
                  id="ast_department_head"
                  label={getLabel('ast_department_head')}
                  name="ast_department_head"
                  placeholder={getLabel('ast_department_head')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_department_head}
                  value={values.ast_department_head}
                  width={345}
                  touched={touched.ast_department_head}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_department_head')}
                />

                <InputBox
                  id="ast_organizational_unit"
                  label={getLabel('ast_organizational_unit')}
                  name="ast_organizational_unit"
                  placeholder={getLabel('ast_organizational_unit')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_organizational_unit}
                  value={values.ast_organizational_unit}
                  width={345}
                  touched={touched.ast_organizational_unit}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_organizational_unit')}
                />

                <InputBox
                  id="ast_supervisor_id"
                  label={getLabel('ast_supervisor_id')}
                  name="ast_supervisor_id"
                  placeholder={getLabel('ast_supervisor_id')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_supervisor_id}
                  value={values.ast_supervisor_id}
                  width={345}
                  touched={touched.ast_supervisor_id}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_supervisor_id')}
                />

                <InputBox
                  id="ast_supervisor_name"
                  label={getLabel('ast_supervisor_name')}
                  name="ast_supervisor_name"
                  placeholder={getLabel('ast_supervisor_name')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_supervisor_name}
                  value={values.ast_supervisor_name}
                  width={345}
                  touched={touched.ast_supervisor_name}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_supervisor_name')}
                />
                <InputBox
                  id="ast_nationality"
                  label={getLabel('ast_nationality')}
                  name="ast_nationality"
                  placeholder={getLabel('ast_nationality')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_nationality}
                  value={values.ast_nationality}
                  width={345}
                  touched={touched.ast_nationality}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_nationality')}
                />

                <InputBox
                  id="ast_dns"
                  label={getLabel('ast_dns')}
                  name="ast_dns"
                  placeholder={getLabel('ast_dns')}
                  onInputChange={handleChange}
                  errorMessage={errors.ast_dns}
                  onBlur={handleBlur}
                  value={values.ast_dns}
                  width={345}
                  touched={touched.ast_dns}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_dns')}
                />

                <InputBox
                  id="ast_hostname"
                  label={getLabel('ast_hostname')}
                  name="ast_hostname"
                  placeholder={getLabel('ast_hostname')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_hostname}
                  value={values.ast_hostname}
                  touched={touched.ast_hostname}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_hostname')}
                />
                <InputBox
                  id="ast_ip_address"
                  label={getLabel('ast_ip_address')}
                  name="ast_ip_address"
                  placeholder={getLabel('ast_ip_address')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_ip_address}
                  value={values.ast_ip_address}
                  touched={touched.ast_ip_address}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_ip_address')}
                />

                <InputBox
                  id="ast_external_ip_address"
                  label={getLabel('ast_external_ip_address')}
                  name="ast_external_ip_address"
                  placeholder={getLabel('ast_external_ip_address')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_external_ip_address}
                  value={values.ast_external_ip_address}
                  touched={touched.ast_external_ip_address}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_external_ip_address')}
                />
                <SelectBox
                  id="ast_ip_type"
                  label={getLabel('ast_ip_type')}
                  name="ast_ip_type"
                  placeholder={getLabel('ast_ip_type')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_ip_type}
                  value={values.ast_ip_type}
                  touched={touched.ast_ip_type}
                  width={345}
                  options={ipTypeOptions}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_ip_type')}
                />

                <SelectBox
                  id="ast_server"
                  label={getLabel('ast_server')}
                  name="ast_server"
                  placeholder={getLabel('ast_server')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_server}
                  value={values.ast_server}
                  touched={touched.ast_server}
                  width={345}
                  options={serverOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_server')}
                />

                <SelectBox
                  id="ast_hosted"
                  label={getLabel('ast_hosted')}
                  name="ast_hosted"
                  placeholder={getLabel('ast_hosted')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_hosted}
                  value={values.ast_hosted}
                  touched={touched.ast_hosted}
                  width={345}
                  options={hostedOptions}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_hosted')}
                />

                <SelectBox
                  id="ast_asset_value"
                  label={getLabel('ast_asset_value')}
                  name="ast_asset_value"
                  placeholder="ast_asset_value"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_asset_value}
                  value={
                    values.ast_asset_value !== null
                      ? values.ast_asset_value
                      : ''
                  }
                  touched={touched.ast_asset_value}
                  width={345}
                  options={assetValueOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_asset_value')}
                />

                <SelectBox
                  id="ast_integrated"
                  label={getLabel('ast_integrated')}
                  name="ast_integrated"
                  placeholder="ast_integrated"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_integrated}
                  value={values.ast_integrated}
                  touched={touched.ast_integrated}
                  width={345}
                  options={integratedOptions}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_integrated')}
                />

                <InputBox
                  id="ast_mac_address"
                  label={getLabel('ast_mac_address')}
                  name="ast_mac_address"
                  placeholder={getLabel('ast_mac_address')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_mac_address}
                  value={values.ast_mac_address}
                  touched={touched.ast_mac_address}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_mac_address')}
                />

                <InputBox
                  id="ast_database"
                  label={getLabel('ast_database')}
                  name="ast_database"
                  placeholder={getLabel('ast_database')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_database}
                  value={values.ast_database}
                  touched={touched.ast_database}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_database')}
                />
                <InputBox
                  id="ast_installation"
                  label={getLabel('ast_installation')}
                  name="ast_installation"
                  placeholder={getLabel('ast_installation')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_installation}
                  value={values.ast_installation}
                  touched={touched.ast_installation}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_installation')}
                />

                <InputBox
                  id="ast_administrator"
                  label={getLabel('ast_administrator')}
                  name="ast_administrator"
                  placeholder={getLabel('ast_administrator')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_administrator}
                  value={values.ast_administrator}
                  touched={touched.ast_administrator}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_administrator')}
                />

                <InputBox
                  id="ast_netbios_name"
                  label={getLabel('ast_netbios_name')}
                  name="ast_netbios_name"
                  placeholder={getLabel('ast_netbios_name')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_netbios_name}
                  value={values.ast_netbios_name}
                  touched={touched.ast_netbios_name}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_netbios_name')}
                />

                <SelectBox
                  id="ast_owner_id"
                  name="ast_owner_id"
                  label={getLabel('ast_owner_id')}
                  mode="multiple"
                  placeholder="Owner"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_owner_id}
                  value={values.ast_owner_id}
                  touched={touched.ast_owner_id}
                  width={345}
                  options={assetOwnersOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_owner_id')}
                />
                <SelectBox
                  id="ast_custodian"
                  name="ast_custodian"
                  mode="multiple"
                  label={getLabel('ast_custodian')}
                  placeholde={getLabel('ast_custodian')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_custodian}
                  value={values.ast_custodian}
                  touched={touched.ast_custodian}
                  width={345}
                  options={assetOwnersOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_custodian')}
                />

                <SelectBox
                  id="ast_os_id"
                  label={getLabel('ast_os_id')}
                  name="ast_os_id"
                  placeholder={getLabel('ast_os_id')}
                  onInputChange={setFieldValue}
                  errorMessage={errors.ast_os_id}
                  value={values.ast_os_id}
                  touched={touched.ast_os_id}
                  options={assetOSOptionsData}
                  width={345}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_os_id')}
                />

                <InputBox
                  id="ast_app_type"
                  label={getLabel('ast_app_type')}
                  name="ast_app_type"
                  placeholder={getLabel('ast_app_type')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_app_type}
                  value={values.ast_app_type}
                  touched={touched.ast_app_type}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_app_type')}
                />

                <InputBox
                  id="ast_make"
                  label={getLabel('ast_make')}
                  name="ast_make"
                  placeholder={getLabel('ast_make')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_make}
                  value={values.ast_make}
                  touched={touched.ast_make}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_make')}
                />
                <InputBox
                  id="ast_model"
                  label={getLabel('ast_model')}
                  name="ast_model"
                  placeholder={getLabel('ast_model')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_model}
                  value={values.ast_model}
                  touched={touched.ast_model}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_model')}
                />

                <InputBox
                  id="ast_serial_no"
                  label={getLabel('ast_serial_no')}
                  name="ast_serial_no"
                  placeholder={getLabel('ast_serial_no')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_serial_no}
                  value={values.ast_serial_no}
                  touched={touched.ast_serial_no}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_serial_no')}
                />

                <InputBox
                  id="ast_software_type"
                  label={getLabel('ast_software_type')}
                  name="ast_software_type"
                  placeholder={getLabel('ast_software_type')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_software_type}
                  value={values.ast_software_type}
                  touched={touched.ast_software_type}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_software_type')}
                />
                <InputBox
                  id="ast_current_version"
                  label={getLabel('ast_current_version')}
                  name="ast_current_version"
                  placeholder={getLabel('ast_current_version')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_current_version}
                  value={values.ast_current_version}
                  touched={touched.ast_current_version}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_current_version')}
                />

                <InputBox
                  id="ast_number_of_licenses"
                  label={getLabel('ast_number_of_licenses')}
                  name="ast_number_of_licenses"
                  placeholder={getLabel('ast_number_of_licenses')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_number_of_licenses}
                  value={values.ast_number_of_licenses}
                  touched={touched.ast_number_of_licenses}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_number_of_licenses')}
                />
                <InputBox
                  id="ast_slot_number"
                  label={getLabel('ast_slot_number')}
                  name="ast_slot_number"
                  placeholder={getLabel('ast_slot_number')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_slot_number}
                  value={values.ast_slot_number}
                  touched={touched.ast_slot_number}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_slot_number')}
                />

                <SelectBox
                  id="ast_document_type"
                  label={getLabel('ast_document_type')}
                  name="ast_document_type"
                  placeholder={getLabel('ast_document_type')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_document_type}
                  value={values.ast_document_type}
                  touched={touched.ast_document_type}
                  width={345}
                  options={documentTypeOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_document_type')}
                />

                <SelectBox
                  id="ast_classification"
                  label={getLabel('ast_classification')}
                  name="ast_classification"
                  placeholder={getLabel('ast_classification')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_classification}
                  value={values.ast_classification}
                  touched={touched.ast_classification}
                  width={345}
                  options={assetClassificationOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_classification')}
                />
                <InputBox
                  id="ast_branch_code"
                  label={getLabel('ast_branch_code')}
                  name="ast_branch_code"
                  placeholder={getLabel('ast_branch_code')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_branch_code}
                  value={values.ast_branch_code}
                  touched={touched.ast_branch_code}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_branch_code')}
                />

                <SelectBox
                  id="ast_location"
                  name="ast_location"
                  label={getLabel('ast_location')}
                  placeholder={getLabel('ast_location')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_location}
                  value={values.ast_location}
                  touched={touched.ast_location}
                  width={345}
                  options={locationOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_location')}
                />
                <SelectBox
                  id="ast_vendor"
                  name="ast_vendor"
                  label={getLabel('ast_vendor')}
                  mode="tags"
                  placeholder={getLabel('ast_vendor')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  onSelect={addTagsField}
                  errorMessage={errors.ast_vendor}
                  value={values.ast_vendor}
                  touched={touched.ast_vendor}
                  width={345}
                  options={vendorsOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_vendor')}
                />

                <SelectBox
                  id="ast_products"
                  name="ast_products"
                  label={getLabel('ast_products')}
                  placeholder={getLabel('ast_products')}
                  mode="tags"
                  onInputChange={setFieldValue}
                  onSelect={addTagsField}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_products}
                  value={values.ast_products}
                  touched={touched.ast_products}
                  width={345}
                  options={productsOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_products')}
                />

                <SelectBox
                  id="ast_siem"
                  name="ast_siem"
                  mode="tags"
                  label={getLabel('ast_siem')}
                  placeholder={getLabel('ast_siem')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_siem}
                  value={values.ast_siem}
                  touched={touched.ast_siem}
                  width={345}
                  options={siemsTypesOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_siem')}
                />

                <SelectBox
                  id="ast_zone"
                  label={getLabel('ast_zone')}
                  name="ast_zone"
                  mode="tags"
                  placeholder="Zone"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_zone}
                  value={values.ast_zone}
                  touched={touched.ast_zone}
                  width={345}
                  options={zoneOptionData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_zone')}
                />
                <InputBox
                  id="ast_server_type"
                  name="ast_server_type"
                  label={getLabel('ast_server_type')}
                  placeholder={getLabel('ast_server_type')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_server_type}
                  value={values.ast_server_type}
                  touched={touched.ast_server_type}
                  width={345}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_server_type')}
                />

                <SelectBox
                  id="ast_power_status"
                  name="ast_power_status"
                  label={getLabel('ast_power_status')}
                  placeholder={getLabel('ast_power_status')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_power_status}
                  value={values.ast_power_status}
                  touched={touched.ast_power_status}
                  width={345}
                  options={powerStatusOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_power_status')}
                />
                <SelectBox
                  id="ast_system_type"
                  name="ast_system_type"
                  label={getLabel('ast_system_type')}
                  placeholder={getLabel('ast_system_type')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_system_type}
                  value={values.ast_system_type}
                  touched={touched.ast_system_type}
                  width={345}
                  options={systemTypesOptionsData}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_system_type')}
                />

                <SelectBox
                  id="ast_network_type"
                  name="ast_network_type"
                  label={getLabel('ast_network_type')}
                  placeholder={getLabel('ast_network_type')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_network_type}
                  value={values.ast_network_type}
                  touched={touched.ast_network_type}
                  width={345}
                  options={networkTypesOptionsData}
                  disabled={isSubmitting}
                  noBorderValidation
                  isHide={isFieldAvailable('ast_network_type')}
                />
                <InputBox
                  id="ast_rack_number"
                  name="ast_rack_number"
                  label={getLabel('ast_rack_number')}
                  placeholder={getLabel('ast_rack_number')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_rack_number}
                  value={values.ast_rack_number}
                  touched={touched.ast_rack_number}
                  width={345}
                  disabled={isSubmitting}
                  isHide={isFieldAvailable('ast_rack_number')}
                  noBorderValidation
                />

                <SelectBox
                  id="ast_department"
                  name="ast_department"
                  label={getLabel('ast_department')}
                  placeholder={getLabel('ast_department')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_department}
                  value={values.ast_department}
                  touched={touched.ast_department}
                  width={345}
                  isHide={isFieldAvailable('ast_department')}
                  options={deptOptions}
                  disabled={isSubmitting}
                />
                <SelectBox
                  id="ast_status"
                  name="ast_status"
                  label={getLabel('ast_status')}
                  placeholder={getLabel('ast_status')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_status}
                  value={values.ast_status}
                  touched={touched.ast_status}
                  width={345}
                  isHide={isFieldAvailable('ast_status')}
                  options={assetStatusOptionData}
                  disabled={isSubmitting}
                />

                <SelectBox
                  id="ast_remote_ap"
                  name="ast_remote_ap"
                  label={getLabel('ast_remote_ap')}
                  placeholder={getLabel('ast_remote_ap')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_remote_ap}
                  value={values.ast_remote_ap}
                  touched={touched.ast_remote_ap}
                  width={345}
                  isHide={isFieldAvailable('ast_remote_ap')}
                  options={assetRemoteAppsOptionsData}
                  disabled={isSubmitting}
                />
                <InputBox
                  id="ast_function"
                  name="ast_function"
                  label={getLabel('ast_function')}
                  placeholder={getLabel('ast_function')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_function}
                  value={values.ast_function}
                  touched={touched.ast_function}
                  width={345}
                  isHide={isFieldAvailable('ast_function')}
                  disabled={isSubmitting}
                  noBorderValidation
                />

                <InputBox
                  id="ast_memory"
                  name="ast_memory"
                  label={getLabel('ast_memory')}
                  placeholder={getLabel('ast_memory')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_memory}
                  value={values.ast_memory}
                  touched={touched.ast_memory}
                  width={345}
                  isHide={isFieldAvailable('ast_memory')}
                  disabled={isSubmitting}
                  noBorderValidation
                />
                <InputBox
                  id="ast_tag"
                  name="ast_tag"
                  label={getLabel('ast_tag')}
                  placeholder={getLabel('ast_tag')}
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_tag}
                  value={values.ast_tag}
                  touched={touched.ast_tag}
                  width={345}
                  isHide={isFieldAvailable('ast_tag')}
                  disabled={isSubmitting}
                  noBorderValidation
                />

                <SPDatepicker
                  id="ast_account_expiration"
                  label={getLabel('ast_account_expiration')}
                  name="ast_account_expiration"
                  placeholder={getLabel('ast_account_expiration')}
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.ast_account_expiration}
                  value={values.ast_account_expiration}
                  width={345}
                  touched={touched.ast_account_expiration}
                  disabled={isSubmitting}
                  noBorderValidation
                  noBorderValidation
                  isHide={isFieldAvailable('ast_account_expiration')}
                />
              </NewRowDiv>

              <TextAreaBox
                id="ast_description"
                name="ast_description"
                label={getLabel('ast_description')}
                placeholder={getLabel('ast_description')}
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.ast_description}
                value={values.ast_description}
                touched={touched.ast_description}
                width={620}
                isHide={isFieldAvailable('ast_description')}
                disabled={isSubmitting}
                noBorderValidation
              />

              <TextAreaBox
                id="ast_location_desc"
                name="ast_location_desc"
                label={getLabel('ast_location_desc')}
                placeholder={getLabel('ast_location_desc')}
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.ast_location_desc}
                value={values.ast_location_desc}
                touched={touched.ast_location_desc}
                width={620}
                isHide={isFieldAvailable('ast_location_desc')}
                disabled={isSubmitting}
                noBorderValidation
              />

              <NewRowDiv>
                {Object.keys(dynamicFields).map(function (keyName, keyIndex) {
                  return (
                    <InputBox
                      id={keyName}
                      name={keyName}
                      label={keyName}
                      type={'dynamicField'}
                      placeholder={keyName}
                      onInputChange={handleDynamicFieldChange}
                      onBlur={handleBlur}
                      value={values.assetdynamicfields[keyName]}
                      width={345}
                      disabled={isSubmitting}
                      noBorderValidation
                      removeField={removeDynamicFields}
                      isHide={!isCategoryFieldsLoaded}
                    />
                  );
                })}
              </NewRowDiv>

              <Row gutter={11} justify="end">
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      onCloseDrawer();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={type === 'edit' ? 'Update' : 'Create'}
                    size="small"
                    type="submit"
                    onButtonClick={handleSubmit}
                    isLoading={
                      newAsset.isProcessing ? newAsset.isProcessing : false
                    }
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    newAsset: state.newAsset,
    isSuccessEdited: state.editAsset.isSuccess,
    locations: state.locationsStore.listData,
    assetValues: state.assetValueStore.listData,
    assetClassification: state.assetClassificationStore.listData,
    assetOS: state.assetOSStore.listData,
    assetCategories: state.assetCategoriesStore.listData,
    assetOwners: state.ownersStore.listData,
    assetTypes: state.assetTypeStore.listData,
    assetEnableFields: state.assetEnableFieldsStore.listData?.data,
    departments: state.departmentsStore.listData,
    assetStatus: state.assetStatusStore.listData,
    assetRemoteApps: state.assetRemoteAppStore.listData,
    assetsMasterStore: state.assetsMasterStore,
    systemTypes: state.assetsMasterStore.systemTypes,
    networkTypes: state.assetsMasterStore.networkTypes,
    powerStatus: state.assetsMasterStore.powerStatus,
    documentTypes: state.assetsMasterStore.documentTypes,
    zones: state.assetsMasterStore.zones,
    products: state.assetsMasterStore.products,
    vendors: state.assetsMasterStore.vendors,
    siemsTypes: state.assetsMasterStore.siemsTypes,
    servers: state.assetsMasterStore.servers,
    assetFields: state.assetsStore.categoryFields,
    isCategoryFieldsLoaded: state.assetsStore.isCategoryFieldsLoaded,
  };
};

const mapDispatchToProps = {
  createAsset,
  editAsset,
  listLocations,
  listAssetClassification,
  listAssetOS,
  listAssetCategories,
  listAssetTypes,
  listOwners,
  listAssetEnableFields,
  listAssetValue,
  listDepartments,
  listAssetStatus,
  listAssetRemoteApp,
  listAssetSystemTypes,
  listAssetNetWorkTypes,
  listAssetPowerStatus,
  listAssetDocumentTypes,
  listAssetSiems,
  listAssetZones,
  listAssetProducts,
  listAssetVendors,
  listAssetServer,
  getCategoryFields,
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
