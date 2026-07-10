import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect } from "react";


function MapEngine({
  position,
  setMapRef,
  riskLevel,
  shape,
  onPin,
}) {


  const map = useMap();



  // Save map reference

  useEffect(() => {

    if(setMapRef){

      setMapRef(map);

    }

  },[map]);





  // Move map when location changes

  useEffect(()=>{


    if(position){


      map.flyTo(

        position,

        14,

        {
          duration:2
        }

      );


    }


  },[position]);





  // Map click event

  useMapEvents({

    click(e){


      const lat =
      e.latlng.lat;


      const lon =
      e.latlng.lng;



      console.log(
        "MAP CLICK:",
        lat,
        lon
      );



      if(onPin){

        onPin(
          lat,
          lon
        );

      }


    }

  });





  let color="#22c55e";


  if(riskLevel==="caution"){

    color="#f59e0b";

  }


  if(riskLevel==="danger"){

    color="#ef4444";

  }





  return (

    <>


    {
      position &&

      <>

      <Marker
        position={position}
      />


      <Circle

        center={position}

        radius={60000}

        pathOptions={{

          color,

          fillColor:color,

          fillOpacity:0.25,

          weight:2

        }}

      />


      </>

    }





    {
      shape &&

      <Polyline

        positions={shape}

        pathOptions={{

          color:"#38bdf8",

          weight:4

        }}

      />

    }


    </>

  );


}







export default function SeaMap({

  position,

  setMapRef,

  riskLevel,

  shape,

  onPin

}) {



  return (


    <div

      style={{

        height:"450px",

        width:"100%",

        position:"relative",

        zIndex:1

      }}

    >



      <MapContainer


        // Default location before GPS loads

        center={[16.5,82.2]}


        // State level zoom

        zoom={8}


        maxZoom={20}

        minZoom={5}


        zoomControl={true}


        style={{

          height:"100%",

          width:"100%",

          zIndex:1

        }}



      >




      <TileLayer


        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"


        attribution="© CARTO © OpenStreetMap"


      />





      <MapEngine


        position={position}

        setMapRef={setMapRef}

        riskLevel={riskLevel}

        shape={shape}

        onPin={onPin}


      />



      </MapContainer>


    </div>


  );
  


}