import { BASE_URL } from 'src/components/Common'
import { get, put, post, destroy } from './defaults'

export const getAllSessions = (options = {}) => {
  return get(`${BASE_URL}/api/sessions/getAllSessions`)
}
export const getOneSession= (id = {}) => {
  return get(`${BASE_URL}/api/sessions/getOneSession/${id}`)
}
export const addSession = (body = {}) => {
  return post(`${BASE_URL}/api/sessions/addSession`, body)
}
export const updateSession = (id ,updatedData) => {
  return put(`${BASE_URL}/api/sessions/updateSession/${id}`, updatedData)
}
export const deleteSession = (id = {}) => {
  return destroy(`${BASE_URL}/api/sessions/deleteSession/${id}`)
}
