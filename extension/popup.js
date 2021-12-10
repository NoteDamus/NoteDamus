const to_signup_elm = document.getElementById("to_signup")
const signupForm = document.getElementById("signup_form");
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login_submit");
const last_note_textarea = document.getElementById("last_note");
const backToLoginBTN = document.getElementById('back-to-login');
const text_selector = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')

var login_title = document.getElementById('login_title');
var login_center = document.getElementById('login_center');

var signup_title = document.getElementById('signup_title');
var signup_center = document.getElementById('signup_center');

var main_center = document.getElementById('main_center');


if (to_signup) {
	to_signup.addEventListener("click", to_signup_form);
}

function to_main_page() {
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

	if (login_title && login_title.style) {
		login_title.style.display = "none";
	}

	if (login_center && login_center.style) {
		login_center.style.display = "none";
	}

	if (main_center && main_center.style) {
		main_center.style.display = 'none';
	}

	if (signup_title && signup_title.style) {
		signup_title.style.display = 'block';
	}

	if (signup_center && signup_center.style) {
		signup_center.style.display = 'block';
	}
}

function to_login_form() {

	if (signup_title && signup_title.style) {
		signup_title.style.display = 'none';
	}

	if (signup_center && signup_center.style) {
		signup_center.style.display = 'none';
	}

	if (main_center && main_center.style) {
		main_center.style.display = 'none';
	}

	if (login_title && login_title.style) {
		login_title.style.display = "block";
	}

	if (login_center && login_center.style) {
		login_center.style.display = "block";
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

var folderSelectList = document.getElementById('folder');
folderSelectList.addEventListener("change", function () {
	let folderId = folderSelectList.value;
	console.log(folderId);

	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"folderId": folderId
		});
	});
});

var colorSelectList = document.getElementById('color');
colorSelectList.addEventListener("change", function () {
	console.log("here");
	let color = colorSelectList.value;
	console.log(color);

	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"color": color
		});
	});
});


loginForm.addEventListener('submit', function (s) {
	s.preventDefault();

	let email =  document.getElementById("login-email").value;
	let pswd =  document.getElementById("login-pswd").value;

	fetch('https://note-damus0.herokuapp.com/api/auth/login',{
		method:'POST',
		body:JSON.stringify({
			"email": email,
			"password": pswd
		}),
		headers:{
			"Content-Type":"application/json; charset=UTF-8"
		}
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		console.log(data);
		if(data.user && data.user.id){
			chrome.tabs.query({
				currentWindow: true,
				active: true
			}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					"userId": data.user.id
				});
				document.getElementById('invalid-login').style.display="none";
				to_main_page();
			});
		}else{
			document.getElementById('invalid-login').style.display="block";
		}
	})
});

signupForm.addEventListener('submit', function (s) {
	s.preventDefault();

	let first_name =  document.getElementById("name").value;
	let last_name =  document.getElementById("surname").value;
	let email =  document.getElementById("signup-email").value;
	let pswd =  document.getElementById("signup-pswd").value;
	let retyped_pswd =  document.getElementById("retyped-pswd").value;

	if(pswd == retyped_pswd){
		document.getElementById('invalid-match').style.display="none";

		fetch('https://note-damus0.herokuapp.com/api/auth/register',{
			method:'POST',
			body:JSON.stringify({
				"first_name": first_name,
				"last_name": last_name,
				"email": email,
				"user_type": 0,
				"password": pswd
			}),
			headers:{
				"Content-Type":"application/json; charset=UTF-8"
			}
		})
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			console.log(data);
			if(data.user && data.user.id){
				chrome.tabs.query({
					currentWindow: true,
					active: true
				}, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {
						"userId": data.user.id
					});
					document.getElementById('invalid-submit').style.display="none";
					to_login_form();
				});
			}else{
				document.getElementById('invalid-submit').style.display="block";
			}
		})
	}else{
		document.getElementById('invalid-match').style.display="block";
	}
});

backToLoginBTN.addEventListener('click', function (s) {
	to_login_form();
})