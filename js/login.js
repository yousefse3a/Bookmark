"use strict";

import * as help from "./helper.js";
export class login {
  constructor(usersData) {
    this.inputs = document.querySelectorAll(".input");
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passInput = document.querySelector("#pass");
    this.messageInput = document.querySelector("#message");
    this.username = document.querySelector("#LoginPage .username");
    this.useremail = document.querySelector("#LoginPage .email");
    this.error = [];
    this.usersData = usersData;
    console.log(this.usersData);
    document
      .querySelector("#logBtn")
      .addEventListener("click", this.login.bind(this));
  }
  login() {
    help.clear(this.messageInput);
    this.error = [];
    this.inputs.forEach((input) => {
      if (input.value == "") {
        let parent = input.parentNode.parentNode;
        parent.classList.add("focusRed");
      }
      input.addEventListener("keydown", () => {
        let parent = input.parentNode.parentNode;
        if ((this.value = !"")) {
          parent.classList.remove("focusRed");
        }
      });
      input.addEventListener("blur", () => {
        let parent = input.parentNode.parentNode;
        if (this.value == "") {
          parent.classList.add("focusRed");
        }
      });
    });
    if (this.emailInput.value == "" || this.passInput.value == "") {
      this.error.push("");
    }
    if (!help.findUser(this.emailInput.value, this.passInput.value)) {
      this.error.push("wrong pass or email");
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
      let email = this.emailInput.value;
      help.setSession(24, email);
      window.open("home.html", "_self");
    }
  }
}
let userObj = new login(help.usersData);
