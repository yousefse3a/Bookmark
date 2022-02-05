"use strict";
import * as help from "./helper.js";
export class regist {
  constructor(usersData) {
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passInput = document.querySelector("#pass");
    this.messageInput = document.querySelector("#message");
    this.username = document.querySelector("#LoginPage .username");
    this.useremail = document.querySelector("#LoginPage .email");
    this.error = [];
    this.usersData = usersData;
    document
      .querySelector("#RegBtn")
      .addEventListener("click", this.regist.bind(this));
  }

  regist() {
    help.clear(this.messageInput);
    this.error = [];
    if (
      this.nameInput.value == "" ||
      this.emailInput.value == "" ||
      this.passInput.value == ""
    ) {
      this.error.push("All Fields Requird");
    }
    if (!this.nameVaild(this.nameInput)) {
      this.error.push("must start with char");
    }
    if (!this.emailVaild(this.emailInput)) {
      this.error.push("invail");
    }
    if (!this.passVaild(this.passInput)) {
      this.error.push(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
    }
    if (help.emailfind(this.emailInput.value)) {
      this.error.push("email already taken");
    }
    if (this.error.length != 0) {
      let ss = "";
      this.error.every((element) => {
        if (element == "All Fields Requird") {
          ss = element;
          return false;
        } else {
          ss += "<li>" + element + "</li>";
          return true;
        }
      });
      this.messageInput.innerHTML = ss;
    } else {
      let name = this.nameInput.value;
      let email = this.emailInput.value;
      let pass = this.passInput.value;
      let URLS =[];
      let userData = { name: name, email: email, pass: pass ,URLS:URLS};
      this.usersData.push(userData);
      localStorage.setItem("users", JSON.stringify(this.usersData));
      help.setSession(24, email);
      window.open("home.html", "_self");
    }
  }
  nameVaild(Input) {
    var nameRegex = /^[A-Z a-z]/;
    if (!nameRegex.test(Input.value)) {
      return false;
    }
    return true;
  }
  emailVaild(Input) {
    var emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(Input.value)) {
      return false;
    }
    return true;
  }
  passVaild(Input) {
    var passRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passRegex.test(Input.value)) {
      return false;
    }
    return true;
  }
}
let userObj = new regist(help.usersData);
