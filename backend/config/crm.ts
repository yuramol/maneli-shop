const crm = ({ env }) => ({
  url: env('CRM_URL'),
  token: env('CRM_TOKEN'),
  sourceId: env('CRM_SOURCE_ID'),
});
export default crm;
