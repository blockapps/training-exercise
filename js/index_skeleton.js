//TODO::Fill in these important fields with the pertaining values
// be sure to change <baseurl> to localhost or whatever ip/domain name
// you're using.
const passportRegistryAddress = '';
const username = '';
const userAddress = '';
const functionCallUrl = 'http://<baseurl>/bloc/v2.2/users/{0}/{1}/contract/PassportRegistry/{2}/call';


async function wait5() {
  await sleep(5000);
}

window.onload = populatePassportList

function populatePassportList() {
  getCurrentPassports()
    .then(response => {
      response.json()
        .then((data) => {
          data.map(function(p){
            newElement(p)
          });
        });
    });
}




// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function hasNull(target) {
  var result = false;
  Object.getOwnPropertyNames(target).forEach(function(element){
    if(target.hasOwnProperty(element)){
      if(String(target[element])==""){
        result = true;
      }
    }
  })
  return result;
}

function getCurrentPassports() {
  //TODO::Try using cirrus to fetch the current passports
  //HINT::Fill in the correct url
  var current;
  var url = ''
  var response = fetch();
  return response;



}

function passFormVals() {
  var name = document.getElementById("name").value;
  var dateC = document.getElementById("dateC").value;
  var dateE = document.getElementById("dateE").value;
  var address = document.getElementById("address").value;
  var age = document.getElementById("age").value;
  var nation = document.getElementById("nationality").value;

  var user = {
    name: name,
    dateCreated: dateC,
    dateExpired: dateE,
    address: address,
    age: age,
    nationality: nation
  };

  if (hasNull(user)) {
    alert("You missed something!");
  }
  else {
    createPassport(user);
  }
}

function createPassport(user) {
  //TODO::define all the variables appropriately
  var name =
  var dateC =
  var dateE =
  var address =
  var age =
  var nation =

  const url = functionCallUrl
  .replace('{0}', username)
  .replace('{1}', userAddress)
  .replace('{2}', passportRegistryAddress);


  fetch(url,{
    method: 'POST',
    body: JSON.stringify({
      //TODO::Fill in the args, method and password for the user defined in the beginning
      args: {

      },
      value: 0,
      method: '',
      password: ''
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })

  .then((response) => {
    setTimeout(() => {
      getCurrentPassports()
      .then(response => {
        response.json()
        .then((data) => {
          document.getElementById("myUL").innerHTML = "";
          populatePassportList();
        })
      })
    }, 5000);
  })

  .catch((err) => {
    console.log(err);
  });

}




// Create a new list item when clicking on the "Add" button
function newElement(user) {
  var li = document.createElement("li");

  //Fill a list object with user information
  Object.getOwnPropertyNames(user).forEach(function(element){
    if(user.hasOwnProperty(element)){
      var b = document.createElement("b");
      var br = document.createElement("br");
      var m = document.createTextNode(element + ": ");
      b.appendChild(m)
      console.log(user[element])
      var t = document.createTextNode(String(user[element]));
      li.appendChild(b);
      li.appendChild(t);
      li.appendChild(br);

    }
  })

  //Actually add the passport to the list
  document.getElementById("myUL").appendChild(li);


  //Empty the form after submission
  document.getElementById("name").value = "";
  document.getElementById("dateC").value = "";
  document.getElementById("dateE").value = "";
  document.getElementById("address").value = "";
  document.getElementById("age").value = "";
  document.getElementById("nationality").value = "";

}

//TODO::(Optional) Create a function that will nullify the passport on click
function nullifyPassport() {



}
