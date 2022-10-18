import { useEffect, useState } from "react"
import { IPath, IPoint } from "../App"
import { Empty } from "../components/Empty"
import { ArrowLeftIcon, DeleteIcon, EditIcon, FileIcon, PathIcon, PointIcon } from "../icons"
import { useParams, useNavigate } from "react-router-dom"
import './Pages.scss'
import { IEditablePoint } from "./Points"
import { PathsPointModal } from "./components"
import { Button } from "react-bootstrap"

interface PathsProps {
    paths: IPath[];
    exportKMLFile: () => void;
    addPointToPath: (data: IPoint, idx: number) => void;
    editPointInPath: (data: IPoint, idx: number, pointIdx: number) => void;
    deletePointInPath: (idx: number, pointIdx: number) => void;
}

export const PathPoints = ({ paths, exportKMLFile, deletePointInPath, addPointToPath, editPointInPath }: PathsProps) => {
    const { pathId } = useParams()
    let navigate = useNavigate();


    const [data, setData] = useState<IPoint[]>([])
    useEffect(() => {
        if (pathId) {
            setData((prev) => {
                let newData = prev;
                newData = paths[+pathId]?.points;
                return newData;
            })
        }
    }, [pathId, paths])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClose = () => setIsModalOpen(false);
    const handleShow = () => setIsModalOpen(true);

    const [modalData, setModalData] = useState<IEditablePoint>()
    const [modalType, setModalType] = useState<"edit" | "add" | "delete">("add")

    const openEditModal = (data: IPoint, idx: number) => {
        setModalType("edit")
        setModalData({ idx, ...data })
        handleShow()
    }
    const openAddModal = () => {
        setModalType("add")
        setModalData(undefined)
        handleShow()
    }
    const openDeleteModal = (data: IPoint, idx: number) => {
        setModalType("delete")
        setModalData({ idx, ...data })
        handleShow()
    }

    return (
        <>
            <div className="items_container">
                <div className="items_container-header" >
                    <Button variant="outline-secondary" onClick={() => navigate("/paths")}>
                        <span style={{ marginRight: "0.5rem" }}>Back</span>
                        <ArrowLeftIcon />
                    </Button>
                    <h1 style={{ textAlign: "center", marginTop: "-0.5rem" }}>PATH: {pathId ? paths[+pathId]?.name : "NO PATH NAME"}</h1>
                </div>
                {!data?.length ? <Empty /> :
                    <>
                        {data.map((item, idx) => (
                            <div className="item" key={idx}>
                                <PointIcon />
                                <div className="item_coords">
                                    <p>{item.name}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <EditIcon style={{ marginRight: "1rem" }} onClick={() => openEditModal(item, idx)} />
                                    <DeleteIcon onClick={() => {
                                        openDeleteModal(item, idx)
                                    }} />
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
            <section className='action_bar'>
                <button className="btn btn_green" onClick={exportKMLFile}>
                    <FileIcon />
                    <p>
                        Generate file
                    </p>
                </button>

                <button className='btn btn_blue' onClick={openAddModal}>
                    <PathIcon />
                    <p>
                        Add Point to Path
                    </p>
                </button>
            </section>

            <PathsPointModal show={isModalOpen} onHide={handleClose} modalType={modalType} initialData={modalData} addPointToPath={addPointToPath} editPointInPath={editPointInPath} deletePointInPath={deletePointInPath} />
        </>
    )
}