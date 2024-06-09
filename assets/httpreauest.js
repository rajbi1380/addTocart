
let baseUrl = "https://fakestoreapi.com";
const setData = async (path, data) => {
  try {
    let response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      body: JSON.stringify({
        username: data.inputValue,
        password: data.inputPassword,
      }),
      headers: { "Content-type": "application/json" },
    });
    let json = await response.json();
    return json;
  } catch (error) {
    alert("A error occured!");
  }
};
const getData = async (path) => {
  try {
    let response = await fetch(`${baseUrl}/${path}`);
    let json = await response.json();
    return json;
  } catch (error) {
    alert("A error occured!");
  }
};
export { getData, setData };
