import axios from "axios";
import replaceValue from "./replaceValue";

export default async function fetchOneOnt(ontId) {
  try {
    const response = await axios.get(
      // "http://ispprov.lighttree.co.za/api/onts"
      `http://localhost:7788/api/ont/${ontId}`
    );
    console.log(response);
    const preCleaned = response.data;
    replaceValue(preCleaned, "provisioned", "Provisioned");
    console.log(preCleaned);
    return preCleaned;
  } catch (error) {
    console.log("ONT error: ", error);
  }
}
