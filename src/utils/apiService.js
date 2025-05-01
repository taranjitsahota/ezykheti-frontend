import API from '../api/axios';

export const apiRequest = async ({ url, method = 'get', data = {}, params = {} }) => {
  try {
    const response = await API({ url, method, data, params });
    if (response.data.status === true) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        error: response.data.errors || {},
        message: response.data.message || 'Something went wrong',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Network Error',
      error: error.response?.data?.errors || {},
    };
  }
};
