let lastLocation = null;


export function startLocationTracking(callback){

if(!navigator.geolocation){
    alert("GPS not supported");
    return;
}


navigator.geolocation.watchPosition(

(position)=>{

const location={
lat:position.coords.latitude,
lon:position.coords.longitude,
accuracy:position.coords.accuracy
};


lastLocation=location;

callback(location);


},

(error)=>{

console.log(error);


if(lastLocation){
    callback(lastLocation);
}


},

{
enableHighAccuracy:true,
maximumAge:0,
timeout:10000
}


);


}



export function getLastLocation(){

return lastLocation;

}