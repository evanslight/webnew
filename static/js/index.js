
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(33.7677129, -84.420604)
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);

  setMarkers(map, beaches);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var beaches = [
  ['Bondi Beach', 33.507636, -84.374838, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];


function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: 'static/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.

getJSON('http://115.146.93.74:5984/tweet_db/_design/twelocation/_view/tweetlocation').then(function (data) {
    // alert('Your Json result is:  ' + data.rows[0].value.coordinates); //you can comment this, i used it to debug

    // document.getElementById('display13').innerHTML = '13. We have a database: ' + JSON.stringify(data.rows[0].value.coordinates)+ 
    // data.rows[0].value.coordinates[0]+ typeof data + typeof data.rows[0].value.coordinates[0];
    //document.getElementById('display13').value='13. We have a database: ' + JSON.stringify(data.rows[0].key);
    //key.innerText = 'json'; //display the result in an HTML element


    for (var i = 0; i < data.rows.length; i++) {
    // var beach = locations[i];
    // document.getElementById('display14').innerHTML = '14. We have a database: ' + typeof data.rows[0].value.coordinates[0];
    // beach[1] = data.rows[0].value.coordinates[0];
    // // // document.getElementById('display14').innerHTML ='222'+typeof data.rows[0].value.coordinates;
    // beach[2] = data.rows[0].value.coordinates[1];
    var myLatLng = new google.maps.LatLng(data.rows[i].value.coordinates[0], data.rows[i].value.coordinates[1]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
  }

}, function(status) { //error detection....
  alert('Something went wrong.');
});


}

google.maps.event.addDomListener(window, 'load', initialize);

