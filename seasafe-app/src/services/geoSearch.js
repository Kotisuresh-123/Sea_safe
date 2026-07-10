import {calculateDistance}
from "../utils/distance";


export async function searchMarine(
query,
userLocation
){


const response=
await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=10`

);


const results=
await response.json();



return results.sort((a,b)=>{


const da=
calculateDistance(
userLocation.lat,
userLocation.lon,
a.lat,
a.lon
);


const db=
calculateDistance(
userLocation.lat,
userLocation.lon,
b.lat,
b.lon
);



return da-db;


});


}