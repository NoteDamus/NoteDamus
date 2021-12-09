const to_signup_elm = document.getElementById("to_signup")
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login_submit");
const last_note_textarea = document.getElementById("last_note");
const text_selector = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
let hasLogged = false;

if (to_signup) {
  to_signup.addEventListener("click", to_signup_form);
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === "user" && password === "user") {
      console.log("logged in");
      hasLogged = true;
      to_main_page();
  } else {
      console.log("faild to log in")
      hasLogged = false;
  }
})

function to_main_page(){
  var login_title = document.getElementById('login_title');
  var login_center = document.getElementById('login_center');

  var main_center = document.getElementById('main_center');

  console.log(login_title);
  console.log(login_center);
  console.log(main_center);

  if (login_title && login_title.style) {
    login_title.style.display = "none";
  }

  if (login_center && login_center.style) {
    login_center.style.display = "none";
  }

  if (main_center && main_center.style) {
    main_center.style.display = 'block';
  }

}

function to_signup_form() {
  var login_title = document.getElementById('login_title');
  var login_center = document.getElementById('login_center');

  var signup_title = document.getElementById('signup_title');
  var signup_center = document.getElementById('signup_center');

  console.log(login_title);
  console.log(login_center);
  console.log(signup_title);
  console.log(signup_center);

  if (login_title && login_title.style) {
    login_title.style.display = "none";
  }

  if (login_center && login_center.style) {
    login_center.style.display = "none";
  }

  if (signup_title && signup_title.style) {
    signup_title.style.display = 'block';
  }

  if (signup_center && signup_center.style) {
    signup_center.style.display = 'block';
  }
}

chrome.commands.onCommand.addListener(function (command) {
  if (command === "save") {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, selectedText => {
      let note = selectedText[0];
    });
  }
});
