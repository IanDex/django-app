import axios from 'axios';

export const AxiosHelper = (endpoint, method = 'GET', data = undefined) => {

  const authorization = () => {
    const session = localStorage.getItem('token') || null;
    return `JWT ${session}` || undefined;
  };

  let headers = {
    'Content-Type': 'application/json'
  };

  console.log(endpoint)
  if(endpoint !== 'login/' && endpoint !== 'user/'){
    headers = {
      ...headers,
      Authorization: authorization(),
    }
  }

  console.log(endpoint)
  endpoint = endpoint.replace('http://127.0.0.1:8000/','')
  console.log(endpoint)
  return axios({
    method,
    url: `${process.env.REACT_APP_DOMAIN}/${endpoint}`,
    headers,
    data: JSON.stringify(data),
  })

}
