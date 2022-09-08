import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { fileSaver, someString } from './utils'
import { Paths } from './pages/Paths';
import { Points } from './pages/Points';
import { Routes, Route, NavLink } from "react-router-dom";
import { PointIcon, PathIcon, FileIcon } from './icons';
import './App.scss';


function App() {
  const [points, setPoints] = useState<number[]>([])
  const [paths, setPaths] = useState<number[]>([])

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
          <Route path="/paths" element={<Paths data={paths} />} />
          <Route path="/points" element={<Points data={points} />} />
        </Routes>
      </section>

      <section className='action_bar'>
        <button className="btn btn_green">
          <FileIcon />
          <p>
            Generate file
          </p>
        </button>

        <button className='btn btn_blue'>
          <PointIcon />
          <p>
            Add location
          </p>
        </button>
      </section>
    </main>
  );
}

export default App;
