export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";

export function addToCart(product) {
  return {
    type: ADD_TO_CART, //Reducers'dan erişeceğiz,gönderilen aksiyon yani
    payload: product, //Stateyi etkileyecek veri
  };
}

export function removeToCart(product) {
  return {
    type: REMOVE_TO_CART, //Reducers'dan erişeceğiz
    payload: product, //Stateyi etkileyecek veri
  };
}
