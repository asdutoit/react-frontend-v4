export default function TableRowReducer(rowState, { type, payload }) {
  switch (type) {
    case "PROVISIONING_ONT":
      return {
        ...rowState,
        provisioning_status: payload,
      };
    default:
      return rowState;
  }
}
