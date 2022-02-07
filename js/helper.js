let inputs = document.querySelectorAll(".input");
 function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}
 function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove('focus');
  }
}
inputs.forEach((input) => {
  input.addEventListener("focus",addcl );
  input.addEventListener("blur", remcl);
});

export let usersData;

if (localStorage.getItem("users") == null) {
  var dummyData = [{ name: "", email: "", pass: "", URLS: [] }];
  localStorage.setItem("users", JSON.stringify(dummyData));
} else {
  usersData = JSON.parse(localStorage.getItem("users"));
}
export function findUser(email, pass) {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email == email && usersData[i].pass == pass) {
      return usersData[i];
    }
  }
  return false;
}
export function findUserPos(email) {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email == email) {
      return i;
    }
  }
  return false;
}
export function emailfind(email) {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email == email) {
      return true;
    }
  }
  return false;
}
export function UserData(email) {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email == email) {
      return usersData[i];
    }
  }
  return false;
}
export function clear(x) {
  x.innerHTML = "";
}
export function setSession(hour, email) {
  let x = {
    email: email,
    State: "Authenticated",
    Expires: addHours(hour),
  };
  localStorage.setItem("Authentication", JSON.stringify(x));
}
export function addHours(hour) {
  var dt = new Date();
  return dt.setTime(dt.getTime() + hour * 60 * 60 * 1000);
}
export function getfullDayTime(DataMillSeconds) {
  var dt = new Date(DataMillSeconds);
  return (
    dt.getDate() +
    "/" +
    dt.getMonth() +
    1 +
    "/" +
    dt.getFullYear() +
    " " +
    dt.getHours() +
    ":" +
    dt.getMinutes() +
    ":" +
    dt.getSeconds()
  );
}
