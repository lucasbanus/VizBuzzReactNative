const URL_Back2 = "http://vizbuzz-backend-dev.herokuapp.com/login/";

//{method: "POST", body: JSON.stringify(payload)}

export const verifyLogin = async (username: string, password: string) => {
  let payload = { username: username };
  console.log("payload: ", payload);
  fetch(URL_Back2, { method: "GET/login", body: JSON.stringify(payload) })
    .then(r => r.json())
    .then(r => {
      console.log("Rat: ", r);
    });
  return false;
};
