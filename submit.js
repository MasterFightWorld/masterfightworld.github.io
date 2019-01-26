 var count;
 var sendDone=false;
var fname=document.getElementById("nfield");
 var femail=document.getElementById("efield");
 var fpass=document.getElementById("pfield");
 var fuser=document.getElementById("ufield");
 var ref=firebase.database().ref();

function proceed(){
  ref.child("Helpers").child("userCount").on("value", function(snapshot){
    count=snapshot.val();
    send();
  });
}

function send(){
  if(sendDone!=true){
  if(count || count==0){
    if(validateData(femail.value, fpass.value, fuser.value, fname.value)){
      var user=ref.child("Users").child("User"+(count.toString()));
      user.child("name").set(fname.value);
      user.child("user").set(fuser.value);
      user.child("password").set(fpass.value);
      user.child("email").set(femail.value);
      user.child("online").set("false");
      setCookie("usernum", count, 1);
      sendDone=true;
      addCount();
      window.location.href="mode.html";
    }
  }
  }
}

function addCount(){
  ref.child("Helpers").child("userCount").set(count+1);
}

function validateData(email, password, user, name){
  var notFailed=true;
  if(validateName(name)!=true){
    reportName();
    notFailed=false;
  }
  if(validateEmail(email)!=true){
    reportEmail();
    notFailed=false;
  }
  if(validatePassword(password)!=true){
    reportPassword();
    notFailed=false;
  }
  if(validateUser(user)!=true){
    reportUser();
    notFailed=false;
  }
  if(emailAvailable(email)!=true){
    reportUsedE();
    notFailed=false;
  }
  if(userAvailable(user)!=true){
    reportUsedU();
    notFailed=false;
  }
  return notFailed;
}

function reportName(){
  alert("Name is empty");
}

function reportUser(){
  alert("Username is empty");
}

function emailAvailable(email){
  for(i=0; i<count; i++){
    ref.child("Users").child("User"+i).child("email").once("value").then(function(snapshot){
      if(snapshot.val()==email){
        reportUsedE();
       return false;
      }
     if(i==count-1){
       return true;
     }
    });
  }
}

function reportUsedE(){
  alert("Email already exists");
}

function reportUsedU(){
  alert("Username taken");
}

function userAvailable(user){
  for(i=0; i<count; i++){
    ref.child("Users").child("User"+i).child("user").once('value').then(function(snapshot){
      if(snapshot.val()==user){
        reportUsedU();
        return false;
      }
     if(i==count-1){
       return true;     
     }
    });
  }
}

function reportEmail(){
  alert("Invalid email");
}

function reportPassword(){
  alert("Password must contain at least 6 letters and 1 number");
}

function validateName(name){
  if(name==""){
    return false;
  }
  return true;
}

function validateUser(user){
  if(user==""){
    return false;
  }
  return true;
}

function validateEmail(email){
    var division=email.split("@");
    if(division.length!=2){
        return false;
    }
    if(email.split(" ").length!=1){
        return false;
    }
    if(division[1].split(".").length<2){
        return false;
    }
    return true;
}

function validatePassword(password){
    var division=password.split("");
    var hasNumber=false;
    var num=0;
    for(i=0; i<division.length; i++){
        if(isNaN(division[i])==false){
            hasNumber=true;
        }
        num++;
    }
    if(num>=6 && hasNumber){
        return true;
    }
    return false;
}
