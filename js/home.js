"use strict";
import * as help from "./helper.js";
export class home {
  constructor(Authentication) {
    this.userdata = help.UserData(Authentication.email);
    this.pos = help.findUserPos(Authentication.email);
    this.inputs = document.querySelectorAll(".input");
    this.Image = document.querySelector(".img img");
    this.table = document.getElementById("marktable");
    this.sitename = document.getElementById("sitename");
    this.siteurl = document.getElementById("siteurl");
    this.showInp = document.getElementById("show");
    this.showInp.addEventListener("click", this.show.bind(this));
    this.saveInp = document.getElementById("save");
    this.saveInp.addEventListener("click", this.addobj.bind(this));
    this.updateInp = document.getElementById("update");
    this.updateInp.style.display = "none";
    this.updateInp.addEventListener("click", this.acceptUpdate.bind(this));
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
    this.inputs.forEach((input) => {
      if (input.value == "") {
        let parent = input.parentNode.parentNode;
        parent.classList.add("focusRed");
      }
      input.addEventListener("keydown", () => {
        let parent = input.parentNode.parentNode;
        if ((this.value = !"")) {
          parent.classList.remove("focusRed");
          $(".errorDiv > .siteName").text("");
          $(".errorDiv > .siteUrl").text("");
        }
      });
      input.addEventListener("blur", () => {
        let parent = input.parentNode.parentNode;
        if (this.value == "") {
          parent.classList.add("focusRed");
        }
      });
    });
    let booksite = {
      name: sitename.value,
      url: siteurl.value,
    };
    if (booksite.name == "" || booksite.url == "") {
      // alert("name requride and url");
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
  update(book_index) {
    this.updateInp.innerHTML = "update";
    this.updateInp.setAttribute("book-index", book_index);
    this.updateInp.style.display = "block";
    this.saveInp.style.display = "none";

    let urlData = help.usersData[this.pos].URLS[book_index];
    this.inputs.forEach((input) => {
      let parent = input.parentNode.parentNode;
      parent.classList.add("focus");
    });
    this.sitename.value = urlData.name;
    this.siteurl.value = urlData.url;
    console.log(urlData.url);
  }
  acceptUpdate() {
    this.inputs.forEach((input) => {
      if (input.value == "") {
        let parent = input.parentNode.parentNode;
        parent.classList.add("focusRed");
      }
      input.addEventListener("keydown", () => {
        let parent = input.parentNode.parentNode;
        if ((this.value = !"")) {
          parent.classList.remove("focusRed");
          $(".errorDiv > .siteName").text("");
          $(".errorDiv > .siteUrl").text("");
        }
      });
      input.addEventListener("blur", () => {
        let parent = input.parentNode.parentNode;
        if (this.value == "") {
          parent.classList.add("focusRed");
        }
      });
    });
    // this.error = { name: "", url: ""};

    let book_index = document
      .getElementById("update")
      .getAttribute("book-index");
    console.log(book_index);
    console.log(this.sitename.value);
    console.log(this.siteurl.value);
    let booksite = {
      name: document.getElementById("sitename").value,
      url: document.getElementById("siteurl").value,
    };
  
    if (booksite.name == "" || booksite.url == "") {
      // alert("name requride and url");
    } 
    else {
      help.usersData[this.pos].URLS[book_index].name = booksite.name;
      help.usersData[this.pos].URLS[book_index].url = booksite.url;
      localStorage.setItem("users", JSON.stringify(help.usersData));
      this.clearform();
      this.displayBook();
      this.updateInp.style.display = "none";
      this.saveInp.style.display = "block";
    }
  }

  displayBook() {
    let cartoona = ``;
    for (var i = 0; i < this.userdata.URLS.length; i++) {
      cartoona += `
          <tr class="lead-font">
            <td class="w-50"><a href='${this.userdata.URLS[i].url}' target='_blank' class="text-center">${this.userdata.URLS[i].name}</a></td>
            <td class="w-25"><button class="btn delBtn "  data-num="${i}">delete</button></td>
            <td class="w-25"><button class="btn upBtn " data-num="${i}">edit</button></td>
          </tr>

        `;
    }
    document.getElementById("table_body").innerHTML = cartoona;
    let btns = document.querySelectorAll(".delBtn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", (e) => {
        this.del($(e.target).attr("data-num"));
      });
    }
    let upbtns = document.querySelectorAll(".upBtn");
    for (let i = 0; i < upbtns.length; i++) {
      upbtns[i].addEventListener("click", (e) => {
        this.update($(e.target).attr("data-num"));
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
