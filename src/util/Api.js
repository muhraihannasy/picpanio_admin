export const BASEURL = "http://localhost:8000";

export const requestSetting = (method, body = {}) => {
  const header = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  switch (method) {
    case "POST":
      header.body = JSON.stringify(body);
      break;
    default:
      break;
  }

  return header;
};
