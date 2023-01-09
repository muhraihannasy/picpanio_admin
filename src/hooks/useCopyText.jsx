import { useState } from "react";
import copy from "copy-to-clipboard";

const useCopyText = () => {
  const [value, setValue] = useState();

  return [value, setValue];
};

export default useCopyText;
