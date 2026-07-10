import {calculateDistance}
from "../utils/distance";


export function findNearestRiver(
userLat,
userLon,
river
){


let nearest=null;

let shortest=Infinity;


river.nearestPoints.forEach(point=>{


const distance=
calculateDistance(
userLat,
userLon,
point[0],
point[1]
);


if(distance<shortest){

shortest=distance;

nearest={
lat:point[0],
lon:point[1],
distance
};


}


});


return nearest;


}