import { BASE_URL } from 'src/components/Common'
import { get, put, post, destroy } from './defaults'

export const getAllPrograms = (options = {}) => {
  return get(`${BASE_URL}/api/programs/getAllPrograms`)
}
export const addProgramImportFile = (body = {}) => {
  return post(`${BASE_URL}/api/programs/addProgramImportFile`,body)
}
export const getOneProgram = (id = {}) => {
  return get(`${BASE_URL}/api/programs/getOneProgram/${id}`)
}
export const addProgram = (body = {}) => {
  return post(`${BASE_URL}/api/programs/addProgram`, body)
}
export const updateProgram = (id ,updatedData) => {
  return put(`${BASE_URL}/api/programs/update/${id}`, updatedData)
}
export const deleteProgram = (id = {}) => {
  return destroy(`${BASE_URL}/api/programs/delete/${id}`)
}
