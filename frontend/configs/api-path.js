//正式時不進版本控制，依操作電腦狀況決定內容
export const API_SERVER = 'http://localhost:3001'
//↑後端的ip port

// users
export const JWT_LOGIN_POST = `${API_SERVER}/users/login-jwt`
export const VERIFY_OTP_POST = `${API_SERVER}/users/verify-otp`
export const VERIFY_TOKEN_POST = `${API_SERVER}/users/verify-token`
export const GOOGLE_LOGIN_POST = `${API_SERVER}/users/google-login`
export const REGISTER_POST = `${API_SERVER}/users/register`
export const OTP_MAIL_POST = `${API_SERVER}/users/otp-mail`
export const VERIFY_OTP_MAIL_POST = `${API_SERVER}/users/verify-otp-mail`
export const RESET_PASSWORD_POST = `${API_SERVER}/users/reset-password`
export const GOOGLE_AUTHENTICATOR_SETUP_POST = `${API_SERVER}/users/2fa/request`
export const GOOGLE_AUTHENTICATOR_VERIFY_POST = `${API_SERVER}/users/2fa/verify-otp`
export const GOOGLE_AUTHENTICATOR_UNSET_POST = `${API_SERVER}/users/2fa/unset2fa`

// product image path
export const PRODUCT_IMG = `${API_SERVER}/images`
export const PRODUCT_LIST = `${API_SERVER}/products`
export const PRODUCT_BACKEND_IMG = `${API_SERVER}/products/img`
export const PRODUCT_DETAILS = `${API_SERVER}/products/details`
export const PRODUCT_FAVORITE = `${API_SERVER}/products/favorite`

// order & checkout
export const ORDER_LIST_GET = `${API_SERVER}/orders`
export const ORDER_DETAILS_GET = `${API_SERVER}/orders`
export const CANCEL_ORDER = `${API_SERVER}/orders/api/cancel_order`
export const ORDER_REVIEW_POST = `${API_SERVER}/orders/api/add-reviews`
export const ORDER_REVIEW_GET = `${API_SERVER}/orders/api/reviews`
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
export const GET_MEMBER_COUPON = `${API_SERVER}/coupons`
export const GET_MEMBER_COUPON_IN_CART = `${API_SERVER}/coupons/in_cart`
export const UPDATE_MEMBER_COUPON_IN_CART = `${API_SERVER}/coupons/update_in_cart`
// reservation
export const GET_RESERVATION_LIST = `${API_SERVER}/reservations`
export const CANCEL_RESERVATION = `${API_SERVER}/reservations/cancel`
export const GET_RESERVATION_PAYMENT = `${API_SERVER}/reservations/result`
// payment
export const ECPAY_GET = `${API_SERVER}/payments`
export const RESERVATION_ECPAY_GET = `${API_SERVER}/payments/reservation`

//teams
export const GET_DATA = `${API_SERVER}/teams/apiSearch`
export const GET_TEAM_DATA = `${API_SERVER}/teams/apiSearch/team`
export const GET_USER_DATA = `${API_SERVER}/teams/apiSearch/user/have_team_`
export const ONE_TEAM = `${API_SERVER}/teams/api/team/`
export const NO_TEAM = `${API_SERVER}/teams/api/no_team/no_team_`
export const DISPLAY_CHAT = `${API_SERVER}/teams/api/chat/get_chat_at_`
export const ADD_CHAT = `${API_SERVER}/teams/api/chat/add/`
export const GET_MEMBER = `${API_SERVER}/teams/api/team_member_at_`
export const JOIN_TEAM = `${API_SERVER}/teams/api/team_join/add/`
export const CREATE_TEAM = `${API_SERVER}/teams/api/create_team/`

//THEME
export const THEME_LIST = `${API_SERVER}/themes`
export const BRANCH_LIST = `${API_SERVER}/themes/branches`
export const THEME_DETAIL = `${API_SERVER}/themes/`
export const BRANCH_THEMES = `${API_SERVER}/themes/second`
export const THEMES_DETAILS = `${API_SERVER}/themes/details`
export const THEME_IMG = `${API_SERVER}/images`
