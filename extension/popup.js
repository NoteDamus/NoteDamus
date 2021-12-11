var loginPage = document.getElementById('login_page');
var mainPage = document.getElementById('main_page');
var signupPage = document.getElementById('signup_page');

const signupForm = document.getElementById("signup_form");
const loginForm = document.getElementById("login_form");

const toSignupBtn = document.getElementById("to_signup")
const backToLoginBtn = document.getElementById('back_to_login');
const logutBtn = document.getElementById("logut_btn");
const goToDashboardBtn = document.getElementById("go_dashboard_btn");

const folderSelectList = document.getElementById("folder");
const apiUrl = "https://note-damus0.herokuapp.com/api";
const dashboardLink = "https://notedamus-cad4d.firebaseapp.com/";

let hasLogged = false;
let userId = -1;

if (userId <= 0)
	toLoginPage();
else
	toMainPage();

toSignupBtn.addEventListener("click", toSignupPage);

function toMainPage() {
	if (loginPage && loginPage.style)
		loginPage.style.display = "none";

	if (signupPage && signupPage.style)
		signupPage.style.display = "none";

	if (mainPage && mainPage.style)
		mainPage.style.display = 'block';

	fillFolderList(userId);
}

function toSignupPage() {
	if (loginPage && loginPage.style)
		loginPage.style.display = "none";

	if (mainPage && mainPage.style)
		mainPage.style.display = 'none';

	if (signupPage && signupPage.style)
		signupPage.style.display = 'block';
}

function toLoginPage() {
	if (signupPage && signupPage.style)
		signupPage.style.display = 'none';

	if (mainPage && mainPage.style)
		mainPage.style.display = 'none';

	if (loginPage && loginPage.style)
		loginPage.style.display = "block";
}

var folderSelectListInput = document.getElementById('folder');
folderSelectListInput.addEventListener("change", function () {
	let folderId = folderSelectList.value;
	console.log(folderId);
	sendMessageToContent({
		"folderId": folderId
	});
});

var colorSelectList = document.getElementById('color');
colorSelectList.addEventListener("change", function () {
	let color = colorSelectList.value;
	sendMessageToContent({
		"color": color
	});
});


loginForm.addEventListener('submit', function (s) {
	s.preventDefault();

	let email = document.getElementById("login_email").value;
	let pswd = document.getElementById("login_pswd").value;

	fetch(apiUrl + '/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				"email": email,
				"password": pswd
			}),
			headers: {
				"Content-Type": "application/json; charset=UTF-8"
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if (data.user && data.user.id) {
				document.getElementById('invalid_login').style.display = "none";
				hasLogged = true;
				userId = data.user.id;
				sendMessageToContent({
					"userId": data.user.id
				})
				toMainPage();
			} else {
				document.getElementById('invalid_login').style.display = "block";
				hasLogged = false;
			}
		})
});

signupForm.addEventListener('submit', function (s) {
	s.preventDefault();

	let first_name = document.getElementById("name").value;
	let last_name = document.getElementById("surname").value;
	let email = document.getElementById("signup_email").value;
	let pswd = document.getElementById("signup_pswd").value;
	let retyped_pswd = document.getElementById("retyped_pswd").value;

	let invalidMatchDiv = document.getElementById('invalid_match');
	let invalidSubmitDiv = document.getElementById('invalid_submit');

	if (pswd == retyped_pswd) {
		invalidMatchDiv.style.display = "none";
		let signupData = {
			"first_name": first_name,
			"last_name": last_name,
			"email": email,
			"user_type": 0,
			"password": pswd
		}

		fetch(apiUrl + '/auth/register', {
				method: 'POST',
				body: JSON.stringify(signupData),
				headers: {
					"Content-Type": "application/json; charset=UTF-8"
				}
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				if (data.user && data.user.id) {
					invalidSubmitDiv.style.display = "none";
					toLoginPage();
				} else {
					invalidSubmitDiv.style.display = "block";
				}
			})
	} else {
		invalidMatchDiv.style.display = "block";
	}
});

backToLoginBtn.addEventListener('click', function (s) {
	toLoginPage();
})

goToDashboardBtn.addEventListener('click', function (s) {
	window.open(dashboardLink, "_blank");
})

logutBtn.addEventListener('click', function (s) {
	sendMessageToContent({
		"userId": -1
	});
	toLoginPage();
})

function fillFolderList(userId) {
	folder_list = {}
	fetch(apiUrl + '/folders/?user=' + userId, {
			method: 'GET',
		})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if (data) {
				data.forEach(folder => {
					var option = document.createElement("option");
					option.value = folder.id;
					option.text = folder.title;
					folderSelectList.appendChild(option);
				});
			} else {
				console.log("loading of folder list was unsuccessful");
			}
		})
}

function sendMessageToContent(message) {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message);
	});
}