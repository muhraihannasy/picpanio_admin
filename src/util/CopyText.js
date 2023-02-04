import copy from "copy-to-clipboard";
const CopyText = (value) => {
  console.log(value);
  copy(value);
};

export default CopyText;
