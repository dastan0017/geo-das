import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { DeleteIcon, PointIcon } from '../../icons';
import { IPoint } from '../../App';
import './Modals.scss'
import { useEffect } from 'react';
import { IEditablePoint } from '../Points';
import { useParams } from 'react-router-dom';

interface PathsPointModalProps {
    show: boolean;
    modalType: "edit" | "add" | "delete";
    initialData: IEditablePoint | undefined;
    onHide: () => void;
    addPointToPath: (data: IPoint, idx: number) => void;
    editPointInPath: (data: IPoint, idx: number, pointIdx: number) => void;
    deletePointInPath: (idx: number, pointIdx: number) => void;
}

export const PathsPointModal = ({ show, modalType, initialData, onHide, editPointInPath, addPointToPath, deletePointInPath }: PathsPointModalProps) => {
    const { register, handleSubmit, reset } = useForm({})
    const { pathId } = useParams()

    useEffect(() => {
        if (modalType === "edit") {
            // Set initial values
            reset(initialData)
        } else {
            reset({ name: "", description: "", lineWidth: 1, lineColor: "#f6b73c" })
        }
    }, [initialData, modalType, reset])

    const onSubmit = (formData: any) => {
        console.log("formData", formData)
        if (!formData?.target) {
            if (modalType === 'edit' && initialData) {
                if (pathId) {
                    editPointInPath(formData, +pathId, initialData.idx)
                }
            } else if (modalType === "add") {
                if (pathId) {
                    addPointToPath(formData, +pathId)
                }
            } else if (modalType === "delete" && initialData) {
                if (pathId) {
                    deletePointInPath(+pathId, initialData.idx)
                }
            }

            setTimeout(() => {
                reset()
                onHide()
            }, 200)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>

            <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
                <Modal.Body>
                    {modalType === "delete" ? <h1>Вы уверены в своих действиях?</h1> : (
                        <>
                            <div className='form_item'>
                                <label htmlFor="name">Название</label>
                                <input {...register("name")} placeholder="Введите название" type="text" />
                            </div>

                            <div className="form_item">
                                <label htmlFor="description">Описание</label>
                                <textarea {...register("description")} placeholder="Введите описание" />
                            </div>

                            <div className="form_item">
                                <label htmlFor="longitude">Долгота</label>
                                <input {...register("longitude")} type="number" step={0.0000001} />
                            </div>
                            <div className="form_item">
                                <label htmlFor="latitude">Широта</label>
                                <input {...register("latitude")} type="number" step={0.0000001} />
                            </div>
                            <div className="form_item">
                                <label htmlFor="height">Высота</label>
                                <input {...register("height")} type="number" step={0.0000001} />
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer className='modal_footer'>
                    <Button variant="outline-secondary" onClick={onHide}>
                        <p>Cancel</p>
                    </Button>
                    <Button variant={`outline-${modalType === 'delete' ? "danger" : "primary"} btn_primary`} type="submit">
                        {modalType === "delete" ? (
                            <>
                                <DeleteIcon />
                                <p>Да, удалить!</p>
                            </>
                        ) :
                            (<>
                                <PointIcon />
                                <p>Confirm</p>
                            </>)
                        }
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}