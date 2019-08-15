"use strict";

function initialize() {
  //Create a custom info window for list all datas
  var infowindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(41.0039643, 28.4517462),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }); //Set Firebase config

  var config = {
    apiKey: "AIzaSyDlK1gkICjorhoELnFZnd6jsSp6iNMDHdc",
    authDomain: "engelnerede-web.firebaseapp.com",
    databaseURL: "https://engelnerede-web.firebaseio.com/",
    storageBucket: "engelnerede-web.appspot.com"
  }; //Bind config for Firebase initialize

  firebase.initializeApp(config); //Set dom element for render

  var domElement = document.getElementById("object"); //Set main reference

  var databaseReference = firebase.database().ref(); //List all main tables in database for console

  databaseReference.on('value', function (snapshot) {
    snapshot.forEach(function (firstSnapshot) {
      var childKey = firstSnapshot.key;
      var childData = firstSnapshot.val(); // console.log(childKey, childData);

      domElement.innerText = JSON.stringify(snapshot.val(), null, 3);
    });
  }); //Create a node at firebase location to add locations as child keys

  var locationsRef = firebase.database().ref("locations");
  var bounds = new google.maps.LatLngBounds();
  locationsRef.on('child_added', function (snapshot) {
    var data = snapshot.val();
    console.log(data);
    var marker = new google.maps.Marker({
      position: {
        lat: data.lat,
        lng: data.lng
      },
      map: map
    });
    bounds.extend(marker.getPosition());
    marker.addListener('click', function (data) {
      return function (e) {
        infowindow.setContent('<div class="map-custom-window">' + '<span class="window__label"> İsim: </span>' + data.name + '<span class="window__label">Koordinat: </span>' + this.getPosition().toUrlValue(6) + '<span class="window__label">Mesaj: </span>' + data.message + "<img class=\"map-custom-window__img\" src=\"".concat(data.image, "\">") + '</div>');
        infowindow.open(map, this);
      };
    }(data));
    map.fitBounds(bounds);
  });
}

google.maps.event.addDomListener(window, "load", initialize); //Push data to firebase

var inputs = document.querySelectorAll("input");
var latitudeCoord = document.getElementById("latitude");
var longitudeCoord = document.getElementById("longitude");
var messageValue = document.getElementById("message");
var nameValue = document.getElementById("name");
var saveButton = document.getElementById("submit");
var geoLocationButton = document.getElementById("geolocation__button");
var fileInput = document.getElementById("fileInput");
var imageArray = []; //Geolocation events

function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  } else {
    console.log("Your browser doesn't support geolocation.");
  }
}

function getLocation(positions) {
  //console.log(positions.coords.latitude, positions.coords.longitude)
  latitudeCoord.value = positions.coords.latitude;
  longitudeCoord.value = positions.coords.longitude;
} //Change events for upload with validation


function fileUpload() {
  //Validation for prevent upload each input
  inputs.forEach(function (item) {
    item.addEventListener("input", function () {
      if (latitudeCoord.value != "" && longitudeCoord.value != "" && messageValue.value != "" && nameValue.value != "") {
        fileInput.removeAttribute("disabled");
      } else {
        fileInput.setAttribute("disabled", "disabled");
      }
    });
  }); //When upload input has a value upload image to firebase

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];
    var storageRef = firebase.storage().ref("locations/image/" + file.name);
    var task = storageRef.put(file);
    task.then(function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log('Upload is ' + progress + '% done');
    }).then(function () {
      storageRef.getDownloadURL().then(function (downloadURL) {
        imageArray.push(downloadURL);
        console.log('File available at', downloadURL);
        saveButton.removeAttribute("disabled");
      });
    });
  });
}

fileUpload(); //Click events for push

if (saveButton) {
  saveButton.addEventListener("click", function () {
    function writeUserData() {
      //Create a new random number for data url
      var urlQuery = Math.floor(Math.random() * 1000000);
      firebase.database().ref('locations/data_' + urlQuery).set({
        //Convert input value string to float
        lat: parseFloat(latitudeCoord.value),
        lng: parseFloat(longitudeCoord.value),
        message: messageValue.value,
        name: nameValue.value,
        image: imageArray[0]
      });
    }

    writeUserData();
  });
} //Click events for geolocation


if (geoLocationButton) {
  geoLocationButton.addEventListener("click", function () {
    currentLocation();
  });
}