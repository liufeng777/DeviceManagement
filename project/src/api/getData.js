import axios from './axios'

/**
 * user(用户)
 */
export const userLogin = data => axios('/p/user/login', data)
export const userAdd = data => axios('/p/user/register', data)
export const userEdit = data => axios('/p/user/update', data)
export const userChangePwd = data => axios('/p/user/new_pw', data)
export const userList = data => axios('/p/user/list', data)
export const userDel = data => axios('/p/user/delete', data)

/**
 * device(设备)
 */
export const deviceList = data => axios('/p/dev/list', data)
export const deviceAdd = data => axios('/p/dev/add', data)
export const deviceEdit = data => axios('/p/dev/edit', data)
export const deviceDel = data => axios('/p/dev/del', data)
export const deviceHistory = data => axios('/p/dev/history_list', data)
export const deviceStatus = data => axios('/p/dev/status', data, false)

/**
 * device(设备位置)
 */
export const deviceMap = data => axios('/p/dev/map_list', data, false)
