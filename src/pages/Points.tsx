import { useState } from "react"
import { IPoint } from "../App"
import { Empty } from "../components/Empty"
import { PointIcon, DeleteIcon, FileIcon, EditIcon } from "../icons"
import { PointModal } from "./components"
import './Pages.scss'

interface PointsProps {
    data: IPoint[],
    deletePoint: (id: number) => void,
    addPoint: (data: IPoint) => void,
    editPoint: (data: IPoint, idx: number) => void,
    exportKMLFile: () => void,
}

export interface IEditablePoint extends IPoint {
    idx: number
}

export const Points = ({ data, deletePoint, addPoint, editPoint, exportKMLFile }: PointsProps) => {
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
                {!data.length ? <Empty /> :
                    <>
                        {data?.map((item, idx) => (
                            <div className="item" key={idx}>
                                <img src={item.icon} alt="Point icon" width="30" height="30" />
                                <div className="item_coords">
                                    <p>{item.name}</p>
                                </div>
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
                    <PointIcon />
                    <p>
                        Add location
                    </p>
                </button>
            </section>

            <PointModal show={isModalOpen} onHide={handleClose} addPoint={addPoint} modalType={modalType} initialData={modalData} editPoint={editPoint} deletePoint={deletePoint} />
        </>
    )
}