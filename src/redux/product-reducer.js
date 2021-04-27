import {productAPI} from "../api/api"

const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'
const SET_PRODUCT = 'SET_PRODUCT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    products: [],
    product: [{
        photoAlbum: ''
    }
    ],
    isFetching: false

};

const productReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_ALL_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
            };
        }
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.payload
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}


const addAllProducts = (payload) => ({type: SET_ALL_PRODUCTS, payload})
const setProduct = (payload) => ({type: SET_PRODUCT, payload})
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })



export const getAllProducts = () => async (dispatch) => {
    dispatch(toggleIsFetching(true))
  await productAPI.getAllProducts().then(response => {
        dispatch(toggleIsFetching(false))
        dispatch(addAllProducts(response));
    });
}
export const getProduct = (id) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
  await productAPI.getProduct(id).then(response => {
      dispatch(toggleIsFetching(false))
      dispatch(setProduct(response))

    })

}

export default productReducer;
