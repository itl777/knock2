//正式時不進版本控制，依操作電腦狀況決定內容
export const API_SERVER = 'http://localhost:3001'
//↑後端的ip port
export const AB_LIST = `${API_SERVER}/teams/api`

// JWT 登入, 方法: POST, 欄位: account, password
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`