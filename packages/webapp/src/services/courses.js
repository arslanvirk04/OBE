import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const addCourse = (body = {}) => {
  return post(`${BASE_URL}/api/courses/add`,body);
};
export const addImportFileCourses = (body = {}) => {
  return post(`${BASE_URL}/api/courses/addImportFile`,body);
};
export const getAllCourses = (body = {}) => {
  return get(`${BASE_URL}/api/courses/getAllCourses`);
};
export const getOne = (id) => {
  return get(`${BASE_URL}/api/courses/getOne/${id}`);
};
export const updateCourse = (id) => {
  return put(`${BASE_URL}/api/courses/update/${id}`);
};
export const deleteCourse = (id) => {
  return destroy(`${BASE_URL}/api/courses/delete/${id}`);
};
