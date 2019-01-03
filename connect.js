if (getCookie("usernum") != null && getCookie("usernum") != "") {
  if (firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online") == "true") {
    alert("Your user has been logged in, in another place");
    window.location.href="login.html";
  } else {
    firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online").set("true");
  }
}

window.onbeforeunload = function () {
  if (getCookie("usernum") != null && getCookie("usernum") != "") {
    firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online").set("false");
  }
};

function logout() {
  if (getCookie("usernum") != null && getCookie("usernum") != "") {
    firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online").set("false");
    deleteCookie("usernum");
  }
  window.location.href="login.html";
}

function checkS() {
  if (getCookie("usernum") == null || getCookie("usernum") == "") {
    alert("You haven't logged in, please go to the home page");
  } else {
    firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online").set("false");
  }
}

function checkB() {
  if (getCookie("usernum") == null || getCookie("usernum") == "") {
    alert("You haven't logged in, please go to the home page");
  } else {
    firebase.database().ref().child("Users").child("User" + getCookie("usernum")).child("online").set("false");
  }
}
