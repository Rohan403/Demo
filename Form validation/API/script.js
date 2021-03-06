let id;
let list = document.getElementById("posts-list");
let add = document.querySelector(".add-post-form");
let output = "";
var url = "https://jsonplaceholder.typicode.com/users";
let user_details = new Array();
user_details = JSON.parse(localStorage.getItem("JSON-Program"))
  ? JSON.parse(localStorage.getItem("JSON-Program"))
  : [];
if (localStorage.getItem("JSON-Program") == null) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (var i in data) {
        let name = data[i].name;
        let username = data[i].username;
        let phone = data[i].phone;
        let website = data[i].website;
        let email = data[i].email;
        let company_name = data[i].company.name;
        let latitude = data[i].address.geo.lat;
        let longitude = data[i].address.geo.lng;
        console.log(name);

        user_details.push({
          name: name,
          username: username,
          phoneno: phone,
          website: website,
          email: email,
          companyname: company_name,
          latitude: latitude,
          longitude: longitude,
        });
        localStorage.setItem("JSON-Program", JSON.stringify(user_details));
      }
    });
} else {
  console.log("data exist ");
}
var url = "https://jsonplaceholder.typicode.com/photos";
let photo = new Array();
photo = JSON.parse(localStorage.getItem("userphoto"))
  ? JSON.parse(localStorage.getItem("userphoto"))
  : [];
if (localStorage.getItem("userphoto") == null) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let photonum = data.slice(0, 10);
      console.log("photonum" + photonum);
      for (var i in photonum) {
        let id = photonum[i].id;
        let url = photonum[i].url;
        let thumbnailUrl = photonum[i].thumbnailUrl;
        photo.push({
          id: id,
          url: url,
          thumbnailUrl: thumbnailUrl,
        });
        localStorage.setItem("userphoto", JSON.stringify(photo));
      }
    });
  showphoto();
} else {
  console.log("Photo exist ");
}
var url = "https://jsonplaceholder.typicode.com/posts";
let post = new Array();
post = JSON.parse(localStorage.getItem("postdetails"))
  ? JSON.parse(localStorage.getItem("postdetails"))
  : [];
if (localStorage.getItem("postdetails") == null) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let posts = data.slice(0, 10);
      for (var i in posts) {
        let title = posts[i].title;
        let body = posts[i].body;
        let userId = posts[i].userId;
        post.push({
          title: title,
          body: body,
          userId: userId,
        });
        localStorage.setItem("postdetails", JSON.stringify(post));
      }
    });
} else {
  console.log("Post exist");
}
let arr = new Array();
arr = JSON.parse(localStorage.getItem("arr"))
  ? JSON.parse(localStorage.getItem("arr"))
  : [];
arr = user_details.map((item, i) => Object.assign({}, item, photo[i]));
localStorage.setItem("arr", JSON.stringify(arr));
showApiData();
let postoutput = new Array();
postoutput = JSON.parse(localStorage.getItem("postoutput"))
  ? JSON.parse(localStorage.getItem("postoutput"))
  : [];
postoutput = arr.map((item, i) => Object.assign({}, item, post[i]));
localStorage.setItem("postoutput", JSON.stringify(postoutput));
function showApiData() {
  let users_details = new Array();
  users_details = JSON.parse(localStorage.getItem("arr"))
    ? JSON.parse(localStorage.getItem("arr"))
    : [];
  if (users_details) {
    for (var i in users_details) {
      output += `
                        <div class="card" id="cardbody" style="width: 25rem; border-style: dashed; padding=10px; float:right">
                        <img src="${photo[i].thumbnailUrl}" onclick="showphoto(${i})"height=80px; width=75px";/>
                        <div class="card-body" id="cardbody" style="padding=10px;">
                        &nbsp;<b>Name:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span <h5 class="card-title">${users_details[i].name}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;<b>username:</b>&nbsp;<span<h5  class="card-title">${users_details[i].username}</h5><br>
                        &nbsp;<b>Phone:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${users_details[i].phoneno}</h5><br>
                        &nbsp;<b>Website:</b>&nbsp;&nbsp;&nbsp;<span <p class="card-text">${users_details[i].website}</p><br>
                        &nbsp;<b>Email:</b>&nbsp;&nbsp;&nbsp;<span <p class="card-text">${users_details[i].email}</p><br>
                        &nbsp;<b>Companyname:</b>&nbsp;<span<h5  class="card-title">${users_details[i].companyname}</h5><br>
                        &nbsp;<b>latitude :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${users_details[i].latitude}</h5><br>
                        &nbsp;<b>longitude:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${users_details[i].longitude}</h5><br><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="editData(${i})" class="btn btn-primary" style=" padding: 5px;">Edit</a>&nbsp;&nbsp;<a href onclick="deleteData(${i})" class="btn btn-primary" style=" padding: 5px;">Delete</a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onclick="showpost(${i})" class="btn btn-primary" style=" padding: 5px;">Post</a>
                        </div>
                        </div> <br> `;
    }
    list.innerHTML = output;
  }
}
function deleteData(rid) {
  let user_details = new Array();
  user_details = JSON.parse(localStorage.getItem("JSON-Program"))
    ? JSON.parse(localStorage.getItem("JSON-Program"))
    : [];
  user_details.splice(rid, 1);
  localStorage.setItem("JSON-Program", JSON.stringify(user_details));
  showApiData();
}
function editData(rid) {
  id = rid;
  let user_details = new Array();
  user_details = JSON.parse(localStorage.getItem("JSON-Program"))
    ? JSON.parse(localStorage.getItem("JSON-Program"))
    : [];

  document.getElementById("names").value = user_details[id].name;
  document.getElementById("username").value = user_details[id].username;
  document.getElementById("phoneno").value = user_details[id].phoneno;
  document.getElementById("website").value = user_details[id].website;
  document.getElementById("email").value = user_details[id].email;
  document.getElementById("companyname").value = user_details[id].companyname;
  document.getElementById("latitude").value = user_details[id].latitude;
  document.getElementById("longitude").value = user_details[id].longitude;
  document.querySelector(".btn").style.display = "none";

  document.getElementById("update").style.display = "";
  document.getElementById("email").disabled = true;
}
function updateData() {
  let user_details = new Array();
  user_details = JSON.parse(localStorage.getItem("JSON-Program"))
    ? JSON.parse(localStorage.getItem("JSON-Program"))
    : [];

  user_details[id].name = document.getElementById("names").value;
  user_details[id].username = document.getElementById("username").value;
  user_details[id].phoneno = document.getElementById("phoneno").value;
  user_details[id].website = document.getElementById("website").value;
  user_details[id].email = document.getElementById("email").value;
  user_details[id].companyname = document.getElementById("companyname").value;
  user_details[id].latitude = document.getElementById("latitude").value;
  user_details[id].longitude = document.getElementById("longitude").value;
  localStorage.setItem("JSON-Program", JSON.stringify(user_details));
  showApiData();
  location.reload();
  document.getElementById("names").value = "";
  document.getElementById("username").value = "";
  document.getElementById("phoneno").value = "";
  document.getElementById("website").value = "";
  document.getElementById("email").value = "";
  document.getElementById("companyname").value = "";
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
}
function cancelUpdate() {
  // document.getElementById('cancelButton').style = "display:none";
  document.getElementById("update").style = "display:none";
  //document.getElementById('addButton').disabled = false;
  document.getElementById("email").disabled = false;
  document.querySelector(".btn").style = "display:visible";
  id = null;
  ClearAll();
  //location.reload()
}
function validate() {
  let msg = document.getElementById("msg");
  let msg2 = document.getElementById("msg2");
  let msg3 = document.getElementById("msg3");
  //document.getElementById('cancelButton').style = "display:none";
  document.getElementById("update").style = "display:none";
  let username1 = document.getElementById("username").value;
  if (username1 == "") {
    msg.innerHTML = "Please Enter your userName";
    return false;
  }
  let phone = document.getElementById("phoneno").value;
  if (phone == "") {
    msg2.innerHTML = "Please Enter your phone number";
    return false;
  }
  let email1 = document.getElementById("email").value;
  if (email1 == "") {
    msg3.innerHTML = "Please Enter your email";
    return false;
  }
  let latitude1 = document.getElementById("latitude").value;
  if (latitude1 == "") {
    document.getElementById("latitude").innerHTML =
      "Please Enter your latitude";
    return false;
  }
  let longitude1 = document.getElementById("longitude").value;
  if (longitude1 == "") {
    document.getElementById("longitude").innerHTML =
      "Please Enter your longitude";
    return false;
  }
  user_details = JSON.parse(localStorage.getItem("JSON-Program"))
    ? JSON.parse(localStorage.getItem("JSON-Program"))
    : [];
  let exist = user_details.find((element) => {
    return (
      element.email == document.getElementById("email").value.toLowerCase()
    );
  });
  if (!exist) {
    user_details.push({
      name: names.value,
      username: username.value,
      phoneno: phoneno.value,
      website: website.value,
      email: email.value,
      companyname: companyname.value,
      latitude: latitude.value,
      longitude: longitude.value,
    });
    localStorage.setItem("JSON-Program", JSON.stringify(user_details));
    document.getElementById("names").value = "";
    document.getElementById("username").value = "";
    document.getElementById("phoneno").value = "";
    document.getElementById("website").value = "";
    document.getElementById("email").value = "";
    document.getElementById("companyname").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
  } else {
    alert("Duplicate email found");
  }
  showApiData();
  showphoto();
  ClearAll();
}
function ClearAll() {
  // let msg =  document.getElementById('msg');
  // let msg2 = document.getElementById('msg2');
  // let msg3 = document.getElementById('msg3');
  // msg.innerHTML = ''
  // msg2.innerHTML = ''
  // msg3.innerHTML = ''
  document.getElementById("names").value = "";
  document.getElementById("username").value = "";
  document.getElementById("phoneno").value = "";
  document.getElementById("website").value = "";
  document.getElementById("email").value = "";
  document.getElementById("companyname").value = "";
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
}
function Searchdata(temp) {
  var search = "";
  for (var i = 0; i < user_details.length; i++) {
    if (user_details[i].name.toLowerCase().includes(temp.toLowerCase())) {
      //var detail = user_details[i];
      // console.log(detail)
      search += `
                <div class="card" id="cardbody" style="width: 25rem; border-style: dashed; padding=10px; float:right">
                <img src="${photo[i].thumbnailUrl}" onclick="showphoto(${i})"height=80px; width=75px";/>
                <div class="card-body" id="cardbody" style="padding=10px;">
                &nbsp;<b>Name:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span <h5 class="card-title">${user_details[i].name}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;<b>username:</b>&nbsp;<span<h5  class="card-title">${user_details[i].username}</h5><br>
                &nbsp;<b>Phone:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${user_details[i].phoneno}</h5><br>
                &nbsp;<b>Website:</b>&nbsp;&nbsp;&nbsp;<span <p class="card-text">${user_details[i].website}</p><br>
                &nbsp;<b>Email:</b>&nbsp;&nbsp;&nbsp;<span <p class="card-text">${user_details[i].email}</p><br>
                &nbsp;<b>Companyname:</b>&nbsp;<span<h5  class="card-title">${user_details[i].companyname}</h5><br>
                &nbsp;<b>latitude :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${user_details[i].latitude}</h5><br>
                &nbsp;<b>longitude:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span<h5  class="card-title">${user_details[i].longitude}</h5><br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="editData(${i})" class="btn btn-primary" style=" padding: 5px;">Edit</a>&nbsp;&nbsp;<a href onclick="deleteData(${i})" class="btn btn-primary" style=" padding: 5px;">Delete</a>&nbsp;&nbsp;
                <a href="javascript:void(0)" onclick="showpost(${i})" class="btn btn-primary" style=" padding: 5px;">Post</a>
                </div>
                </div> <br> `;
    }
  }
  list.innerHTML = search;
}

// let output1 = new Array();
// output1 = JSON.parse(localStorage.getItem('output')) ? JSON.parse(localStorage.getItem('output')) : []
// localStorage.setItem(('finall'),JSON.stringify(output))
// output = arr.map((item,i) => Object.assign({},item,photo[i]));

function showphoto(index) {
  var url = JSON.parse(localStorage.getItem("arr"))[index].url;
  document.getElementById("thumbnailImage").src = url;
  document.getElementById("thumbModalBtn").click();
}
// function showpost(index){

//         var url = JSON.parse(localStorage.getItem('postoutput'))[index].body
//         mapping = JSON.parse(localStorage.getItem('postoutput'))
//         var titles = JSON.parse(localStorage.getItem('postoutput'))[index].title
//         document.getElementById('postshowed').innerHTML = url;
//         document.querySelector('.modal-title').innerHTML = titles
//         document.getElementById('postBtn').click();
// }
var result = Object.values(postoutput).map(Object.values);
function showpost(index) {
  let url = [];

  localStorage.getItem("resultss", JSON.stringify(result));
  // console.log(result)
  result.forEach(function (results) {
    url += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${results[8]}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Title:-${results[11]}</h6>
              <p class="card-text">Body:-${results[12]}</p>
              <button style="background-color: grey;" id="editpost" onclick="editContent()">Edit</button>
              <button style="background-color: grey;" id="updatepost" onclick="update11()">update</button>
             <button style="background-color: grey;" id="deletepost" onclick="deletecard()">Delete</button>
            </div>
          </div>`;
  });
  localStorage.setItem("resultss", JSON.stringify(result));
  document.getElementById("postshowed").innerHTML = url;
  document.getElementById("postBtn").click();
}
para11 = document.getElementById("postshowed");
function editContent() {
  para11.contentEditable = true;
  para11.style.backgroundColor = "#dddbdb";
  // event.target.parentElement.setAttribute("contentEditable", true);

  //localStorage.getItem('resultss',JSON.stringify(result))
}
function update11() {
  para11.contentEditable = false;
  para11.style.backgroundColor = "#ffe44d";
  //localStorage.getItem('resultss',JSON.stringify(result))
}
// var titles = result[rid].title
// document.getElementById('postshowed').innerHTML = url;
// document.querySelector('.modal-title').innerHTML = titles
// document.getElementById('postBtn').click();
function deletecard() {
  // result.forEach(function(results){
  //     results.splice(results[12],1)
  //     console.log(results)
  // })
  var elements = document.querySelectorAll(".card-text");
//   for (var i = 0, len = elements.length; i < len; i++) {
//    // elements[i].parentNode.removeChild(elements[i]);

   
//   }
  console.log(elements[0].userId);
  
}
//  function deletecard(){  //delete card
