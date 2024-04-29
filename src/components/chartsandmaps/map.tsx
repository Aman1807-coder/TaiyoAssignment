import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = () => {
  const { data } = useQuery({
    queryFn: async () =>
      await (await fetch("https://disease.sh/v3/covid-19/countries")).json(),
    queryKey: ["mapData"],
  });

  const marekrIcon = new L.Icon({
    iconUrl: require("../../resources/location.png"),
    iconSize: [35, 45],
  });

  return (
    data && (
        <div className="absolute inset-0 flex">
        <MapContainer center={[13.084622, 80.248357]} zoom={5}>
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=DFjuKzZny2h5x2BPFYkD"
            // attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {data.map((element: any, index: number) => {
            const name = element.country;
            const lat = element.countryInfo.lat;
            const long = element.countryInfo.long;
            const active = element.active;
            const cases = element.cases;
            const deaths = element.deaths;

            return (
              <div key={index}>
                <Marker position={[lat, long]} icon={marekrIcon}>
                  <Popup>
                    <h3>{`${name}`}</h3>
                    <p>{`Active Cases: ${active}`}</p>
                    <p>{`Recorded Cases: ${cases}`}</p>
                    <p>{`Deaths: ${deaths}`}</p>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
        </div>
    )
  );
};

export default Map;
