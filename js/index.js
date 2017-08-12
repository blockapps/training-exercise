// Create a "close" button and append it to each list item
/*
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
*/

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

const passportRegistryAddress = '72f28bac0b0179ef976d6a5fd24fc0bdd2f4c8a2';
const username = 'test';
const userAddress = 'c12d981cc2f9c568cfa0ace37ca70ef7ec7e2e1b';
const functionCallUrl = 'http://localhost/bloc/v2.1/users/{0}/{1}/contract/PassportRegistry/{2}/call';


// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var name = document.getElementById("name").value;
  var dateC = document.getElementById("dateC").value;
  var dateE = document.getElementById("dateE").value;
  var address = document.getElementById("address").value;
  var age = document.getElementById("age").value;
  var nation = document.getElementById("nationality").value;

  const url = functionCallUrl
    .replace('{0}', username)
    .replace('{1}', userAddress)
    .replace('{2}', passportRegistryAddress);

  console.log(url);

  fetch(url,{
    method: 'POST',
    body: JSON.stringify({
      args: {
        name: name,
        dateCreated: dateC,
        dateExpires: dateE,
        residentialAddress: address,
        age: age,
        countryOfOrigin: nation
      },
      value: 0,
      method: 'createPassport',
      password: '1234'
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    fetch('http://localhost/cirrus/search/Passport')
    .then((pResponse) => {
      console.log(pResponse.json());
    })
  })
  .catch((err) => {
    console.log(err);
  });

  var user = {
    name: name,
    dateCreated: dateC,
    dateExpired: dateE,
    address: address,
    age: age,
    nationality: nation
  };

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

  var userJSON = JSON.stringify(user)
  // var inputValue = document.getElementById("myInput").value;
  // var descValue = document.getElementById("moreInfo").value;
  // console.log(inputValue)
  // console.log(descValue)
  // var finalVal = String(inputValue) + ": " + String(descValue);
  // console.log(finalVal)

  if (hasNull(user)) {
    alert("You missed something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("name").value = "";
  document.getElementById("dateC").value = "";
  document.getElementById("dateE").value = "";
  document.getElementById("address").value = "";
  document.getElementById("age").value = "";
  document.getElementById("nationality").value = "";

/*
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
*/
}
