import copy from "copy-to-clipboard";
const CopyText = (value) => {
  console.log(value);
  copy(value);
  alert("You have copied");
};

export default CopyText;
