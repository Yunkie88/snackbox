function geolocation () {
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
             alert ("Latitude: " + position.coords.latitude + " "+ "Longitude: " + position.coords.longitude + " ");
        });
    }
}

function haversine (lat1,long1,lat2,long2) {
    var dLat = (lat2-lat1).toRad();
    var dLong = (long2-long1).toRad();
    var lat1 = lat1.toRad ();
    var lat2=lat2.toRad();
    var R= 6371;

    var a = Math.sin(dLat/2) * Math.sin (dLat/2) + Math.sin(dLong/2) * Math.sin (dLong/2) * Math.cos(lat1) *Math.cos(lat2);
    var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R *c;

    var rounded = roundVal(d);

    return rounded;
}

if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function () {
        return this * Math.PI/180;
    }
}

function roundVal (val) {
    var dec=2;
    var result = Math.round (val*Math.pow(10,dec))/Math.pow (10,dec);
    return result;
}

function findNearest (lat,long) {
    var d1=haversine (lat,long, 2.922561, 101.650964);
    var d2 = haversine (lat,long, 3.073065, 101.607787);
    var d3 = haversine (lat, long, 3.158761, 101.714524);


document.getElementById ("location1distance").textContent="Distance: " + d1 + "km"; 
document.getElementById ("location2distance").textContent="Distance: " + d2 + "km"; 
document.getElementById ("location3distance").textContent="Distance: " + d3 + "km";
}

window.onload= function (){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            console.log (position.coords.latitude + " " + position.coords.longitude);
            findNearest(position.coords.latitude, position.coords.longitude);
        });
    }
    else {
        alert ("Unable to retrieve location");
    }
}