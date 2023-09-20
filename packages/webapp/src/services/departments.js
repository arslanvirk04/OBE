import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const getAllDepartments = (options = {}) => {
  return get(`${BASE_URL}/api/department/getAllDepartment`);
};
export const addDepartmentImportFile = (body = {}) => {
  return post(`${BASE_URL}/api/department/addDepartmentImportFile`, body);
};
export const getOne = (id = {}) => {
  return get(`${BASE_URL}/api/department/getOne/${id}`);
};
export const addDepartment = (body= {}) => {
  return post(`${BASE_URL}/api/department/add`, body);
};
export const updateDepartment = (id= {}) => {
  return put(`${BASE_URL}/api/department/update/${id}`);
};
export const deleteDepartment = (id= {}) => {
  return destroy(`${BASE_URL}/api/department/destroy/${id}`);
};