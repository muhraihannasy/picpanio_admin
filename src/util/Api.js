export const BASEURL = "https://space-api.picpan.dev";

export const requestSetting = (method, body = {}) => {
  const token = localStorage.getItem("acctkn");

  const header = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
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

export const apiRequest = (url, header) => {
  return fetch(url, header)
    .then((res) => {
      console.log(res);
      if (res.status === 401) {
        // window.location.href = "/login";
        // return;
      }

      return res.json();
    })

    .catch((err) => console.log(err));
};
