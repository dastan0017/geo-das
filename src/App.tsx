import { useEffect, useState } from 'react';
import { fileSaver } from './utils'
import { Paths } from './pages/Paths';
import { Points } from './pages/Points';
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { PointIcon, PathIcon } from './icons';
import './App.scss';
import { generateKMLString } from './components/KmlStringGenerator';
import { PathPoints } from './pages/PathPoints';
import { FilenameModal } from './pages/components';

export enum PointIconEnum {
  icon1 = "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
  icon2 = "https://maps.google.com/mapfiles/kml/pal4/icon61.png"
}

export interface IPoint {
  name: string;
  description: string;
  icon: string;
  longitude: number;
  latitude: number;
  height?: number;
}

export interface IPath {
  name: string;
  description: string;
  lineColor: string;
  lineWidth: number;
  points: IPoint[]
}


function App() {
  const [points, setPoints] = useState<IPoint[]>([])
  const [paths, setPaths] = useState<IPath[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    console.log("paths effect", paths)
  }, [paths])

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("points", JSON.stringify(points?.length ? points : "[]"))
      localStorage.setItem("paths", JSON.stringify(paths?.length ? paths : "[]"))
    });

    return () => {
      window.removeEventListener("beforeunload", () => { });
    };
  }, [paths, points]);

  useEffect(() => {
    setTimeout(() => {
      let pointsString = localStorage.getItem("points") || "[]"
      let pathsString = localStorage.getItem("paths") || "[]"

      let points = JSON.parse(pointsString)
      let paths = JSON.parse(pathsString)

      setPoints(points as IPoint[])
      setPaths(paths as IPath[])
    }, 1000)
  }, [])

  const addPoint = (data: IPoint) => {
    console.log("add: \n", data)
    setPoints((prev) => {
      return [...prev, data]
    })
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


  const addPath = (data: IPath) => {
    console.log("Add: \n", data)
    setPaths((prev) => {
      return [...prev, { ...data, points: [] }]
    })
  }
  const editPath = (data: IPath, idx: number) => {
    setPaths((prev) => {
      let newPaths = prev;
      newPaths[idx] = data
      return newPaths
    })
  }
  const deletePath = (index: number) => {
    setPaths((prev) => prev.filter((item, idx) => idx !== index))
  }

  const addPointToPath = (data: IPoint, idx: number) => {
    console.log("Add point: ", data)
    setPaths((prev) => {
      let newPaths = prev;
      newPaths[idx].points.push(data)
      return newPaths
    })
  }
  const editPointInPath = (data: IPoint, idx: number, pointIdx: number) => {
    console.log("Edit point in path");
    setPaths((prev) => {
      let newPaths = prev;
      newPaths[idx].points[pointIdx] = data;
      return newPaths
    })
  }
  const deletePointInPath = (idx: number, pointIdx: number) => {
    setPaths((prev) => {
      let newPaths = prev;
      newPaths[idx].points.splice(pointIdx, 1);
      return newPaths
    })
  }

  const exportKMLFile = (formData: any) => {
    setTimeout(() => {
      const fileText = generateKMLString(points, paths, formData?.fileName)
      if (formData.fileName) {
        fileSaver(formData.fileName, fileText)
      }
    }, 300)

    setIsModalOpen(false)
  }

  const openFileExportModal = () => {
    setIsModalOpen(true)
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
          <Route path="/points" element={<Points data={points} deletePoint={deletePoint} addPoint={addPoint} editPoint={editPoint} exportKMLFile={openFileExportModal} />} />
          <Route path="/paths" element={<Paths data={paths} deletePath={deletePath} exportKMLFile={openFileExportModal} addPath={addPath} editPath={editPath} />} />
          <Route path="/paths/:pathId" element={<PathPoints paths={paths} deletePointInPath={deletePointInPath} exportKMLFile={openFileExportModal} addPointToPath={addPointToPath} editPointInPath={editPointInPath} />} />
          <Route path="*" element={<Navigate to="/points" replace />} />
        </Routes>
      </section>
      <FilenameModal show={isModalOpen} onHide={() => setIsModalOpen(false)} onSubmit={exportKMLFile} />
    </main>
  );
}

export default App;
