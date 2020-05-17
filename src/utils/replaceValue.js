export default function replaceValue(arr, keyOfValueToReplace, newValue) {
  return arr.map((obj) => {
    if (obj[keyOfValueToReplace] === true) {
      return (obj[keyOfValueToReplace] = newValue);
    } else {
      return (obj[keyOfValueToReplace] = "Inactive");
    }
  });
}

export function replaceSingleValue(obj, keyOfValueToReplace, newValue) {
  return (obj[keyOfValueToReplace] = newValue);
}
