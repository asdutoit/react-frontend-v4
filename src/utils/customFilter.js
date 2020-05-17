export default function customFilter(objList, text) {
  if (undefined === text || text === "") return objList;
  return objList.filter((product) => {
    let flag;
    for (let prop in product) {
      flag = false;
      flag =
        product[prop].toString().toLowerCase().indexOf(text.toLowerCase()) > -1;
      if (flag) break;
    }
    return flag;
  });
}

// NOTE:  If search performance is slow, then focus on improving the rendering in the DOM, not the code for Javascript.
// If you run the JS code directly, the execution is extremely fast
