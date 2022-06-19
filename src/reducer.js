const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "INCREASE": {
      let tempCart = state.cart.map((cart) => {
        if (cart.id === action.id) {
          return { ...cart, amount: cart.amount + 1 };
        }
        return cart;
      });
      return {
        ...state,
        cart: tempCart,
      };
    }

    case "DECREASE":
      let tempCart = state.cart
        .map((cart) => {
          if (cart.id === action.id) {
            return { ...cart, amount: cart.amount - 1 };
          }
          return cart;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return {
        ...state,
        cart: tempCart,
      };

    case "GET_TOTAL": {
      let { amount, total } = state.cart.reduce(
        (acc, item) => {
          const { price, amount } = item;
          const totalItem = price * amount;

          acc.total += totalItem;
          acc.amount += amount;
          return acc;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2));
      return { ...state, amount, total };
    }

    case "LOADING":
      return { ...state, loading: false };

    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };

    default:
      throw new Error("No matching action found");
  }
};

export default reducer;
