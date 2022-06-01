import axios from '.';

const baseURL = process.env.VUE_APP_BASE_API_PORTAL;

const send = params => axios.request({
  url: `/analysis/`,
  params,
  method: 'POST',
  baseURL
});

export default {
  send
};


