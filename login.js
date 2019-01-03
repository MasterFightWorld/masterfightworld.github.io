var ref=firebase.database().ref();
 var count;
 var validation;

function logIn(){
  validateData();
  if(validation){
    window.location.href="mode.html";
  }
}

function updateCount(){
  ref.child("Helpers").child("userCount").on("value", function  (snapshot){
    count=snapshot.val();
    logIn();
  });
}

function validateData(){
  var emailVal=document.getElementById("efield").value;
  var passVal=document.getElementById("pfield").value;
  for(i=0; i<count; i++){
    let ii=i;
    ref.child("Users").child("User"+i).child("email").once("value").then(function(snapshot){
      if(snapshot.val()==emailVal){
        ref.child("Users").child("User"+ii).child("password").once("value").then(function(snapshot){
          if(snapshot.val()==passVal){
            ref.child("Users").child("User"+ii).child("online").once("value").then(function(snapshot){
              if(snapshot.val()!="false"){
                alert("Your user has been logged in, in another place");
                validation=false;
                return 0;
              }
            });
            setCookie("usernum", ""+ii, 1);
            validation=true;
            return 0;
          }
          reportP();
          validation=false;
          return 0;
        });   
      }
      if(i==(count-1)){
        reportE();
        validation=false;
        return 0;
      }
    });
  }
}

function reportE(){
  alert("Email Doesn't Exist");
}

function reportP(){
  alert("Incorrect Password");
}
