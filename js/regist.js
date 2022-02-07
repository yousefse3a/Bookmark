"use strict";
import * as help from "./helper.js";
export class regist {
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
    document
      .querySelector("#RegBtn")
      .addEventListener("click", this.regist.bind(this));
  }

  regist() {
    this.inputs.forEach((input) => {
      if (input.value == "") {
        let parent = input.parentNode.parentNode;
        parent.classList.add("focusRed");
      }
      input.addEventListener("keydown", () => {
        let parent = input.parentNode.parentNode;
        if ((this.value = !"")) {
          parent.classList.remove("focusRed");
          $(".errorDiv > .name").text("");
          $(".errorDiv > .email").text("");
          $(".errorDiv > .pass").text("");
        }
      });
      input.addEventListener("blur", () => {
        let parent = input.parentNode.parentNode;
        if (this.value == "") {
          parent.classList.add("focusRed");
        }
      });
    });
    this.error = { name: "", email: "", pass: "" };
    if (
      this.nameInput.value == "" ||
      this.emailInput.value == "" ||
      this.passInput.value == ""
    ) {
      // this.error.push("");
    }
    if (!this.nameVaild(this.nameInput)) {
      this.error.name = "must start with char";
    }
    if (!this.emailVaild(this.emailInput)) {
      this.error.email = "invail";
    }
    if (!this.passVaild(this.passInput)) {
      this.error.pass =
        "Minimum eight char, at least one letter, one number and one special char";
    }
    if (help.emailfind(this.emailInput.value)) {
      this.error.email = "email already taken";
    }
    if (
      this.error.name != "" ||
      this.error.email != "" ||
      this.error.pass != ""
    ) {
      $(".errorDiv > .name").text(this.error.name);
      $(".errorDiv > .email").text(this.error.email);
      $(".errorDiv > .pass").text(this.error.pass);
    } else {
      let name = this.nameInput.value;
      let email = this.emailInput.value;
      let pass = this.passInput.value;
      let URLS = [];
      let userData = { name: name, email: email, pass: pass, URLS: URLS };
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
