import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { fileSaver } from './utils'
import { Paths } from './pages/Paths';
import { Points } from './pages/Points';
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { PointIcon, PathIcon, FileIcon, DirectionIcon } from './icons';
import './App.scss';
import { generateKMLString } from './components/KmlStringGenerator';


function App() {
  const location = useLocation();

  const [points, setPoints] = useState<[number, number][]>([])
  const [paths, setPaths] = useState<[number, number][]>([])

  const addPoint = () => {
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

      setPoints([...points, [crd.longitude, crd.latitude]])
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const deletePoint = (index: number) => {
    setPoints((prev) => prev.filter((item, idx) => idx !== index))
  }

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

      setPaths([...paths, [crd.longitude, crd.latitude]])
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
          <Route path="/points" element={<Points data={points} deletePoint={deletePoint} />} />
        </Routes>
      </section>

      <section className='action_bar'>
        {(points.length || paths.length) ? <button className="btn btn_green" onClick={exportKMLFile}>
          <FileIcon />
          <p>
            Generate file
          </p>
        </button> : null}

        {location.pathname === '/points' ? (
          <button className='btn btn_blue' onClick={addPoint}>
            <PointIcon />
            <p>
              Add location
            </p>
          </button>
        ) :
          <button className='btn btn_blue' onClick={addPath}>
            <DirectionIcon />
            <p>
              Add direction
            </p>
          </button>
        }
      </section>
    </main>
  );
}

export default App;
