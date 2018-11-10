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
    console.log("proc"+count+" "+sendDone);
    send();
  });
}

function send(){
  if(sendDone!=true){
    console.log("sendSD"+count+" "+sendDone);
  if(count || count==0){
    console.log("sendC"+count+" "+sendDone);
    var user=ref.child("Users").child("User"+(count.toString()));
    user.child("email").set(femail.value);
    user.child("name").set(fname.value);
    user.child("password").set(fpass.value);
    user.child("user").set(fuser.value);
    sendDone=true;
    console.log("sendAD"+count+" "+sendDone);
    addCount();
    console.log("sendD"+count+" "+sendDone);
  }
  }
}

function addCount(){
  console.log("ACB"+count+" "+sendDone);
  ref.child("Helpers").child("userCount").set(count+1);
  console.log("ACD"+count+" "+sendDone);
}
