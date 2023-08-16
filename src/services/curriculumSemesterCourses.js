import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const addCurriculumSemesterCourse = (body = {}) => {
  return post(`${BASE_URL}/api/curriculum-semester-courses/add`,body);
};
export const getAllCurriculumSemesterCourses = (body = {}) => {
  return get(`${BASE_URL}/api/curriculum-semester-courses/getAll`);
};
export const getOneCurriculumSemesterCourse = (id) => {
  return get(`${BASE_URL}/api/curriculum-semester-courses/getOne/${id}`);
};
export const updateCurriculumSemesterCourse = (id) => {
  return put(`${BASE_URL}/api/curriculum-semester-courses/update/${id}`);
};
export const deleteCurriculumSemesterCourse = (id) => {
  return destroy(`${BASE_URL}/api/curriculum-semester-courses/delete/${id}`);
};