import { useState } from "react"
import { Link } from "react-router-dom"
import { IPath } from "../App"
import { Empty } from "../components/Empty"
import { DeleteIcon, EditIcon, FileIcon, PathIcon } from "../icons"
import { PathModal } from "./components"
import './Pages.scss'

interface PathsProps {
    data: IPath[];
    exportKMLFile: () => void;
    deletePath: (idx: number) => void;
    addPath: (data: IPath) => void;
    editPath: (data: IPath, idx: number) => void;
}

export interface IEditablePath extends IPath {
    idx: number
}

export const Paths = ({ data, exportKMLFile, deletePath, addPath, editPath }: PathsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClose = () => setIsModalOpen(false);
    const handleShow = () => setIsModalOpen(true);

    const [modalData, setModalData] = useState<IEditablePath>()
    const [modalType, setModalType] = useState<"edit" | "add" | "delete">("add")

    const openEditModal = (data: IPath, idx: number) => {
        setModalType("edit")
        setModalData({ idx, ...data })
        handleShow()
    }
    const openAddModal = () => {
        setModalType("add")
        setModalData(undefined)
        handleShow()
    }
    const openDeleteModal = (data: IPath, idx: number) => {
        setModalType("delete")
        setModalData({ idx, ...data })
        handleShow()
    }

    return (
        <>
            <div className="items_container">
                {!data.length ? <Empty /> :
                    <>
                        {data?.map((item, idx) => (
                            <div className="item" key={idx}>
                                <PathIcon />
                                <Link to={idx.toString()} className="item_coords">
                                    <p>{item.name}</p>
                                </Link>
                                <div style={{ display: "flex" }}>
                                    <EditIcon style={{ marginRight: "1rem" }} onClick={() => openEditModal(item, idx)} />
                                    <DeleteIcon onClick={() => openDeleteModal(item, idx)} />
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
                        Add Path
                    </p>
                </button>
            </section>

            <PathModal show={isModalOpen} onHide={handleClose} modalType={modalType} initialData={modalData} addPath={addPath} editPath={editPath} deletePath={deletePath} />
        </>
    )
}