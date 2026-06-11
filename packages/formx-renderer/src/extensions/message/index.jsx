import { message } from 'antd';

// Re-export antd v6 message API to preserve existing import paths.
// antd v6 message provides: error, success, warning, loading, info, open, config, destroy
const compatApi = Object.create(message);
// Maintain `warn` alias for backward compatibility
compatApi.warn = compatApi.warning;

export default compatApi;
