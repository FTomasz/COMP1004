export function register({ username, password }) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  
  //if user already exists then return error
  if (users[username]) {
    throw new Error("User exists");
  }

  //add data to local storage
  users[username] = { password };
  localStorage.setItem("users", JSON.stringify(users));

  return {
    //return data
    token: "local-token",
    user: { username },
  };
}

export function login({ username, password }) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[username];

  //if no user or the users password is incorrect, then fail login
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  //return the data
  return {
    token: "local-token",
    user: { username },
  };
}

//logout remove authentication data
export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

//check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}
