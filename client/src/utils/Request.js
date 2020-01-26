import axios from 'axios';
import applyConverters from 'axios-case-converter';
import { CatchRequest } from './CatchRequest';

const ENV = process.env;

const instance = applyConverters(
	axios.create({
		baseURL: `${ENV.REACT_APP_HOST_API}${ENV.REACT_APP_HOST_API_NAMESPACE}`,
    withCredentials: true,
    // headers: {
    //   Authorization: 'Bearer',
    //   'Content-Type': 'application/json'
    // }
	}),
);

const Get = (url, data) =>     { 
  return CatchRequest( async () => instance.get(url, data || {}) )
};
const Post = (url, data) =>    { 
  return CatchRequest( async () => instance.post(url, data || {}) )
};
const Delete = (url, data) =>  { 
  return CatchRequest( async () => instance.delete(url, data || {}) )
};
const Head = (url, data) =>    { 
  return CatchRequest( async () => instance.head(url, data || {}) )
};
const Options = (url, data) => { 
  return CatchRequest( async () => instance.options(url, data || {}) )
};
const Put = (url, data) =>     { 
  return CatchRequest( async () => instance.put(url, data || {}) )
};
const Patch = (url, data) =>   { 
  return CatchRequest( async () => instance.patch(url, data || {}) )
};

export { Get, Post, Delete, Head, Options, Put, Patch };