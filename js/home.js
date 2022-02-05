"use strict";
import * as help from "./helper.js";
export class home {
  constructor(Authentication) {
    this.userdata = help.UserData(Authentication.email);
    this.pos = help.findUserPos(Authentication.email);
    this.Image = document.querySelector(".img img");
    this.table = document.getElementById("marktable");
    this.sitename = document.getElementById("sitename");
    this.siteurl = document.getElementById("siteurl");
    this.showInp = document.getElementById("show");
    this.showInp.addEventListener("click", this.show.bind(this));
    this.saveInp = document.getElementById("save");
    this.saveInp.addEventListener("click", this.addobj.bind(this));
    this.logInOut = document.getElementById("logInOut");
    this.logInOut.innerText = "logout";
    this.nameInp = document.getElementById("nameInp");
    this.nameInp.innerText = this.userdata.name;
    this.logInOut.addEventListener("click", this.logout);
    document
      .querySelector("#logInOut")
      .addEventListener("click", this.logout.bind(this));
  }
  logout() {
    localStorage.removeItem("Authentication");
    window.open("login.html", "_self");
  }
  addobj() {
    let booksite = {
      name: sitename.value,
      url: siteurl.value,
    };
    if (booksite.name == "" || booksite.url == "") {
      alert("name requride and url");
    } else {
      this.userdata.URLS.push(booksite);
      help.usersData[this.pos] = this.userdata;
      localStorage.setItem("users", JSON.stringify(help.usersData));
      this.clearform();
      this.displayBook();
    }
  }
  del(book_index) {
    this.userdata.URLS.splice(book_index, 1);
    help.usersData[this.pos] = this.userdata;
    localStorage.setItem("users", JSON.stringify(help.usersData));
    this.displayBook();
  }
  displayBook() {
    let cartoona = ``;
    for (var i = 0; i < this.userdata.URLS.length; i++) {
      cartoona += `
          <tr class="lead-font">
            <td><a href='${this.userdata.URLS[i].url}' target='_blank'>${this.userdata.URLS[i].name}</a></td>
            <td><button class="btn delBtn" data-num="${i}">delete</button></td>
          </tr>

        `;
    }
    document.getElementById("table_body").innerHTML = cartoona;
    let btns = document.querySelectorAll(".delBtn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click",  (e)=> {
        this.del($(e.target).attr("data-num"));
      });
    }
  }
  clearform() {
    this.sitename.value = "";
    this.siteurl.value = "";
  }
  show() {
    this.displayBook();
    $(".img").fadeToggle(250);
    $(".linkTableOuter").fadeToggle(250);
    let tt = $("#show").text();
    if (tt == "dispaly Bookmark") {
      $("#show").text("close Bookmark");
    } else {
      $("#show").text("dispaly Bookmark");
    }
  }
}
let Authentication = JSON.parse(localStorage.getItem("Authentication"));
let hh = new home(Authentication);
