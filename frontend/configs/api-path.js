//正式時不進版本控制，依操作電腦狀況決定內容
export const API_SERVER = 'http://localhost:3001'
//↑後端的ip port

// users
export const JWT_LOGIN_POST = `${API_SERVER}/users/login-jwt`
export const VERIFY_TOKEN_POST = `${API_SERVER}/users/verify-token`
export const GOOGLE_LOGIN_POST = `${API_SERVER}/users/google-login`
export const REGISTER_POST = `${API_SERVER}/users/register`
export const OTP_MAIL_POST = `${API_SERVER}/users/otp-mail`
export const VERIFY_OTP_POST = `${API_SERVER}/users/verify-otp`
export const RESET_PASSWORD_POST = `${API_SERVER}/users/reset-password`


// product image path
export const PRODUCT_IMG = `${API_SERVER}/images`
export const PRODUCT_LIST = `${API_SERVER}/products`
export const PRODUCT_DETAILS = `${API_SERVER}/products/details`
export const PRODUCT_FAVORITE = `${API_SERVER}/products/favorite`

// order & checkout
export const ORDER_LIST_GET = `${API_SERVER}/orders`
export const ORDER_DETAILS_GET = `${API_SERVER}/orders`
export const CART_POST = `${API_SERVER}/checkout/api/cart_member`
export const CHECKOUT_CITY_GET = `${API_SERVER}/checkout/api/city`
export const CHECKOUT_DISTRICT_GET = `${API_SERVER}/checkout/api/district`
export const CHECKOUT_POST = `${API_SERVER}/checkout/api/checkout`
export const CHECKOUT_GET_CART = `${API_SERVER}/checkout/api/cart`
export const CHECKOUT_GET_PROFILE = `${API_SERVER}/checkout/api/member_profile`
export const CHECKOUT_GET_ADDRESS = `${API_SERVER}/checkout/api/member_address`
export const CHECKOUT_DELETE_ADDRESS = `${API_SERVER}/checkout/api/delete_address`
export const CHECKOUT_ADD_ADDRESS = `${API_SERVER}/checkout/api/add_address`
export const CHECKOUT_UPDATE_CART = `${API_SERVER}/checkout/api/cart/update`
export const ECPAY_GET = `${API_SERVER}/payments`
export const ORDER_REVIEW_POST = `${API_SERVER}/orders/api/add-reviews`
export const ORDER_REVIEW_GET = `${API_SERVER}/orders/api/reviews`



//teams
export const TEAM_ALL = `${API_SERVER}/teams/apiAll`
export const ONE_TEAM = `${API_SERVER}/teams/api/`
export const GET_CHAT = `${API_SERVER}/teams/api/chat/`

//THEME
export const THEME_LIST = `${API_SERVER}/themes`
export const BRANCH_LIST = `${API_SERVER}/themes/branches`
export const THEME_DETAIL = `${API_SERVER}/themes/`
export const BRANCH_THEMES = `${API_SERVER}/themes/second`
