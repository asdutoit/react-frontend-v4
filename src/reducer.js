export default function reducer(state, { type, payload }) {
  switch (type) {
    case "ONTS":
      return {
        ...state,
        onts: payload,
      };
    default:
      return state;
  }
}
