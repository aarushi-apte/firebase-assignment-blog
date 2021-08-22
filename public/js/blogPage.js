function signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location='index.html';
    }).catch((error) => {
      console.log(error);
      alert("Couldn't sign out.")
    });
  } 

function upload(){
    var user = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
    if (user != null) {
      var currentName = user.displayName;
      var email = user.email;
     
      var uid = user.uid;  
        console.log(currentName);
        console.log(email);
        console.log(uid);
        
       }
  }
    //getting the image, blog text, image name
    var image = document.getElementById('image').files[0];
    var post = document.getElementById('post').value;
    var imageName = image.name;

    //storage ref in firebase-- where the images will be stored
    var storageRef = firebase.storage().ref('images/' + imageName);  
    
    //uploading image to that storage ref in fb
    var uploadTask = storageRef.put(image);

    //to check progress of image uploaded
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is" + progress + "done");
            }, function(error){
                    console.log(error.message);
            }, function(){

                //taking the image url and uploading it to db
                //note-- we use push so that every blog- unique id
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                firebase.database().ref('blogs/').push().set({
                        userid: uid,
                        author: currentName,
                        text: post,
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        imageURL: downloadURL
            }, function(error){
                        if(error){
                            alert("Error while uploading");
                        }
                        else{
                            alert("Successfully uploaded");
                            document.getElementById('post-form').reset();
                            getData();
                            window.location='blogPage.html';
                        }
            });

        });
    });
    
}

window.onload = function(){
    this.getData();
}

//getting blogs to be displayed
function getData(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
        var posts_div = document.getElementById('posts');

        //removing existing data in div- html 
        posts.innerHTML=""

        //getting data from fb
        var data = snapshot.val();
        console.log(data);

        //getting data one by one
        for(let[key,value] of Object.entries(data)){
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class = 'card'>" +
            "<img src= '"+value.imageURL+"' style='height:250px;'>" +
            "<div class='card-body'><p class='card-text'> " + value.author + "</p>"+
            "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
            "</div></div></div></div>" + posts_div.innerHTML;
        }
   
    });
}
   
function userData(){
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        if (user != null) {
         var uid = user.uid;  
        }
      }

      firebase.database().ref('blogs/').orderByChild('userid').equalTo(uid).on("value",function(snapshot){
        var posts_div = document.getElementById('posts');

        posts.innerHTML=""

        var userData = snapshot.val();
        console.log(userData);

        for(let[key,value] of Object.entries(userData)){
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class = 'card'>" +
            "<img src= '"+value.imageURL+"' style='height:200px;'>" +
            "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
            "<button class='btn btn-danger' id= '"+key+"' onclick = 'delete_post(this.id)'>Delete</button>"+
            "</div></div></div></div>" + posts_div.innerHTML;
        }
   
   
    });
   
}

function delete_post(key){
    firebase.database().ref('blogs/' + key).remove();
}

