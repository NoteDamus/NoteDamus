console.log("popopop");
const toSignupElm = document.getElementById("to_signup")
const signupForm = document.getElementById("signup_form");
const loginForm = document.getElementById("login_form");
const loginButton = document.getElementById("login_submit");
const backToLoginBTN = document.getElementById('back_to_login');
const logutBtn = document.getElementById("logut_btn");
const goToDashboardBtn = document.getElementById("go_dashboard_btn");
const folderSelectList = document.getElementById("folder");
const apiUrl = "https://note-damus0.herokuapp.com/api";
const dashboardLink = "https://notedamus-cad4d.firebaseapp.com/";

var loginPage = document.getElementById('login_page');
var mainPage = document.getElementById('main_page');
var signupPage = document.getElementById('signup_page');

let hasLogged = false;
let userId = -1;

if(userId <= 0){
	toLoginPage();
}else{
	toMainPage();
}

if (toSignupElm) {
	toSignupElm.addEventListener("click", toSignupPage);
}

function toMainPage() {

	if(loginPage && loginPage.style){
		loginPage.style.display = "none";
	}

	if(signupPage && signupPage.style){
		signupPage.style.display = "none";
	}

	if (mainPage && mainPage.style) {
		mainPage.style.display = 'block';
	}

	fillFolderList(userId);
}

function toSignupPage() {

	if(loginPage && loginPage.style){
		loginPage.style.display = "none";
	}

	if (mainPage && mainPage.style) {
		mainPage.style.display = 'none';
	}

	if(signupPage && signupPage.style){
		signupPage.style.display = 'block';
	}
}

function toLoginPage() {

	if(signupPage && signupPage.style){
		signupPage.style.display = 'none';
	}

	if (mainPage && mainPage.style) {
		mainPage.style.display = 'none';
	}

	if(loginPage && loginPage.style){
		loginPage.style.display = "block";
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

var folderSelectListInput = document.getElementById('folder');
folderSelectListInput.addEventListener("change", function () {
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

	let email =  document.getElementById("login_email").value;
	let pswd =  document.getElementById("login_pswd").value;

	fetch(apiUrl + '/auth/login',{
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
			document.getElementById('invalid_login').style.display="none";
			hasLogged = true;
			userId = data.user.id;
			sendUserIdMessage(data.user.id)
			toMainPage();
		}else{
			document.getElementById('invalid_login').style.display="block";
			hasLogged =false;
		}
	})
});

signupForm.addEventListener('submit', function (s) {
	s.preventDefault();

	let first_name =  document.getElementById("name").value;
	let last_name =  document.getElementById("surname").value;
	let email =  document.getElementById("signup_email").value;
	let pswd =  document.getElementById("signup_pswd").value;
	let retyped_pswd =  document.getElementById("retyped_pswd").value;

	if(pswd == retyped_pswd){
		document.getElementById('invalid_match').style.display="none";

		fetch(apiUrl + '/auth/register',{
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
				document.getElementById('invalid_submit').style.display="none";
				toLoginPage();
			}else{
				document.getElementById('invalid_submit').style.display="block";
			}
		})
	}else{
		document.getElementById('invalid_match').style.display="block";
	}
});

backToLoginBTN.addEventListener('click', function (s) {
	toLoginPage();
})

goToDashboardBtn.addEventListener('click', function (s) {
	window.open(dashboardLink, "_blank");
})

logutBtn.addEventListener('click', function (s) {
	sendUserIdMessage(-1);
	toLoginPage();
})


function fillFolderList(userId){

	folder_list = {}

	fetch(apiUrl + '/folders/?user='+userId,{
            method:'GET',
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(data){
                data.forEach(folder => {
					var option = document.createElement("option");
					option.value = folder.id;
					option.text = folder.title;
					folderSelectList.appendChild(option);
                });
            }else{
                console.log("loading of folder list was unsuccessful");
            }
        })
}

function sendUserIdMessage(user_id){
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"userId": user_id
		});
	});
}