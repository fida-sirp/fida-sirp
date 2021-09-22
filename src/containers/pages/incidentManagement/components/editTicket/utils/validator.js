import * as Yup from 'yup';

function ipv4(message = 'Invalid IP address') {
  return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message,
    excludeEmptyString: true,
  }).test('ip', message, value => {
    return value === undefined || value.trim() === ''
      ? true
      : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
  });
}

Yup.addMethod(Yup.string, 'ipv4', ipv4);
const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+(,?|\n);=.]+$/;
const emailRegx = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}(,?|\n)?)+$/;
const ipRegex =/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|\*)(?:(,?|\n)\s*(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|\*))*$/
const validationSchema = Yup.object({
  iti_subject: Yup.string().required('Required'),
  iti_priority: Yup.string().required('Required'),
  iti_ticket_status: Yup.string().required('Required'),
  iti_description: Yup.string().nullable(),
  iti_start_date: Yup.string().nullable(),
  iti_attack_date: Yup.string().nullable(),
  iti_detect_date: Yup.string().nullable(),
  iti_category_id: Yup.string().required('Required'),
  iti_disposition_id: Yup.string().required('Required'),
  iti_location_id:Yup.string().required('Required'),
  iti_disposition_sub_category_id: Yup.string().nullable(),
  iti_analysis_summary: Yup.string().nullable(),
  iti_owner: Yup.string().nullable(),
  iti_attack_duration: Yup.string().nullable(),
  iti_attack_severity: Yup.string().required('Required'),
  iti_estimated_recovery_clock: Yup.number()
    .min(0, 'Should be greater than 0')
    .nullable(),
  iti_estimated_recovery_hours: Yup.number()
    .min(0, 'Should be greater than 0')
    .nullable(),
  iti_approx_users_affeacted: Yup.number()
    .min(0, 'Should be greater than 0')
    .nullable(),
  iti_approx_host_affeacted: Yup.number()
    .min(0, 'Should be greater than 0')
    .nullable(),
  iti_evidence_description: Yup.string().nullable(),
  iti_data_compromised: Yup.string().nullable(),
  iti_system_damage_detail: Yup.string().nullable(),
  iti_suggestions_recovery: Yup.string().nullable(),
  iti_closed_remediation: Yup.string().nullable(),
  iti_artifacts: Yup.array().of(Yup.string()).nullable(),
  Artifact_IP: Yup.string().matches(ipRegex, 'Enter correct IP!'),
  Artifact_SGBOX_Host_IP: Yup.string().matches(ipRegex, 'Enter correct IP!'),
  Artifact_Source_IP: Yup.string().matches(ipRegex, 'Enter correct IP!'),
  Artifact_VPN_IP: Yup.string().matches(ipRegex, 'Enter correct IP!'),
  Artifact_URL: Yup.string().matches(urlReg, 'Enter correct url!'),
  Artifact_From_Email: Yup.string().matches(emailRegx, 'Enter correct email!'),
  Artifact_Email: Yup.string().matches(emailRegx, 'Enter correct email!'),
  Artifact_To_Email: Yup.string().matches(emailRegx, 'Enter correct email!'),
});

export default validationSchema;
