//正式時不進版本控制，依操作電腦狀況決定內容
export const API_SERVER = 'http://localhost:3001'
//↑後端的ip port

// JWT 登入, 方法: POST, 欄位: account, password
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// product image path
export const PRODUCT_IMG = `${API_SERVER}/images`
export const PRODUCT_LIST = `${API_SERVER}/products`
export const PRODUCT_DETAILS = `${API_SERVER}/products/details`
export const PRODUCT_FAVORITE = `${API_SERVER}/products/favorite`

// order & checkout
export const ORDER_LIST_GET = `${API_SERVER}/orders`
export const ORDER_DETAILS_GET = `${API_SERVER}/orders`
export const CART_POST = `${API_SERVER}/checkout/api/cart_member`
// export const CART_GUEST_POST = `${API_SERVER}/checkout/api/cart_guest`
export const CART_GUEST_GET = `${API_SERVER}/checkout//api/product`
export const CHECKOUT_POST = `${API_SERVER}/checkout/api/checkout`
export const CHECKOUT_ADD_ADDRESS_POST = `${API_SERVER}/checkout/api/add_address`
export const CHECKOUT_GET = `${API_SERVER}/checkout/`
export const CHECKOUT_GET_CART = `${API_SERVER}/checkout/cart`
export const CHECKOUT_UPDATE_CART = `${API_SERVER}/checkout/cart/update`
export const CHECKOUT_DELETE_ADDRESS = `${API_SERVER}/checkout/api/delete_address`

//teams
export const TEAM_ALL = `${API_SERVER}/teams/apiAll`

//THEME
export const THEME_LIST = `${API_SERVER}/themes`
export const BRANCH_LIST = `${API_SERVER}/themes/branches`
