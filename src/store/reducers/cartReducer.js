import { cartItems } from "../initialState/cartItems";
import { ADD_TO_CART } from "../actions/cartActions";
import { REMOVE_TO_CART } from "../actions/cartActions";

const initialState = {
  cartItems: cartItems,
};
export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_CART:
      let product = state.cartItems.find(
        (c) => c.product.akademisyenId === payload.akademisyenId
      );
      if (product) {
        product.quantity++;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              quantity: 1,
              product: payload /*payload productName gibi gelcek */,
            },
          ],
        };
      }

    case REMOVE_TO_CART:
      debugger;

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (c) => c.product.akademisyenId !== payload.akademisyenId
        ),
      };
    default:
      return state;
  }
}
