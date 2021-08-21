// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDU6_Eb0gaw4l5sM9jMtPhpv97n9_IjtSg",
    authDomain: "fir-assignment-d8282.firebaseapp.com",
    projectId: "fir-assignment-d8282",
    storageBucket: "fir-assignment-d8282.appspot.com",
    messagingSenderId: "34483543309",
    appId: "1:34483543309:web:357cf6de3ec8296b80e444",
    measurementId: "G-TRN03CCQ4X"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics(); 

//Sign in function using email and password
function signIn(){
    
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((res) => {
       
        window.location = 'blogPage.html';
       
        }
      ).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        
    });
}

//Sign up new user using email and password
function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var userName= document.getElementById("userName");

    //user created with name, email & pwd
    firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {

    const user = firebase.auth().currentUser;
    
    //updating new user's-- basic info
    //name given undefined if not updated
    if (user != null) {
        user.updateProfile({
            displayName: userName.value
        }).then(() => {
          window.location = 'blogPage.html';
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert("Could not sign up.");
    }

  }
  ).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage);
    
  });
    
}

//Google sign in 
function googleSignInPopup(){
    var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            alert("Successfully signed in with Google.")
            window.location = 'blogPage.html';
          }).catch((error) => {
            // Handle Errors here.
            console.log(error);
            alert("Login using Google failed.")
          });
        // [END auth_google_signin_popup]
}
  

  

 
    



  