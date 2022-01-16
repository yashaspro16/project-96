//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBvXr_wi4KPEBhP2prJJ7Aj5T128ZIh46g",
      authDomain: "kwitter-a723b.firebaseapp.com",
      databaseURL: "https://kwitter-a723b-default-rtdb.firebaseio.com",
      projectId: "kwitter-a723b",
      storageBucket: "kwitter-a723b.appspot.com",
      messagingSenderId: "864562821248",
      appId: "1:864562821248:web:1d862f0e29d62d54694e65"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
username=localStorage.getItem("username");
roomname=localStorage.getItem("roomname");
function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(roomname).push({
            name:username,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}
function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4>"+name+" <img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button> <hr>";
row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();
function updateLike(message_id){
      console.log("clicked on like button -"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(roomname).child(message_id).update({
            like:updated_likes
      });
}
function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="index.html";
}