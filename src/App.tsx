import { useState } from 'react';
import { fileSaver } from './utils'
import { Paths } from './pages/Paths';
import { Points } from './pages/Points';
import { Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { PointIcon, PathIcon, FileIcon, DirectionIcon } from './icons';
import './App.scss';
import { generateKMLString } from './components/KmlStringGenerator';

export enum PointIconEnum {
  icon1 = "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
  icon2 = "https://maps.google.com/mapfiles/kml/pal4/icon61.png"
}

export interface IPoint {
  name: string;
  description: string;
  icon: string;
  longitude: number;
  latitude: number
}


function App() {
  const elevator = new google.maps.ElevationService();


  const [points, setPoints] = useState<IPoint[]>([])
  const [paths, setPaths] = useState<[number, number, number][]>([])

  const addPoint = (data: IPoint) => {
    console.log("add: \n", data)
    setPoints([...points, data])
  }
  const editPoint = (data: IPoint, idx: number) => {
    setPoints((prev) => {
      let newPoints = prev;
      newPoints[idx] = data
      return newPoints
    })
  }
  const deletePoint = (index: number) => {
    setPoints((prev) => prev.filter((item, idx) => idx !== index))
  }

  console.log(points)

  const addPath = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 0,
    };

    function success(pos: any) {
      var crd = pos.coords;

      console.log("Ваше текущее местоположение:");
      console.log(`Широта: ${crd.latitude}`);
      console.log(`Долгота: ${crd.longitude}`);
      console.log(`Плюс-минус ${crd.accuracy} метров.`);

      elevator.getElevationForLocations({
        locations: [new google.maps.LatLng(crd.latitude, crd.longitude)]
      }, (res) => {
        if (res !== null) {
          setPaths([...paths, [crd.longitude, crd.latitude, res[0].elevation]])
        }
      })

    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const deletePath = (index: number) => {
    setPaths((prev) => prev.filter((item, idx) => idx !== index))
  }

  const exportKMLFile = () => {
    const fileText = generateKMLString(points, paths)
    fileSaver("Test1", fileText)
  }

  return (
    <main className='app'>
      <nav>
        <NavLink
          to="points"
          className={({ isActive }) =>
            isActive ? `nav_item active` : `nav_item`
          }
        >
          <p>Location</p>
          <PointIcon />
        </NavLink>

        <NavLink
          to="paths"
          className={({ isActive }) =>
            isActive ? `nav_item active` : `nav_item`
          }
        >
          <p>Path</p>
          <PathIcon />
        </NavLink>
      </nav>

      <section className='items_bar'>
        <Routes>
          <Route path="/paths" element={<Paths data={paths} deletePath={deletePath} />} />
          <Route path="/points" element={<Points data={points} deletePoint={deletePoint} addPoint={addPoint} editPoint={editPoint} exportKMLFile={exportKMLFile} />} />
          <Route path="*" element={<Navigate to="/points" replace />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
