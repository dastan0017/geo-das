import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { DeleteIcon, PointIcon } from '../../icons';
import { IPath } from '../../App';
import './Modals.scss'
import { useEffect } from 'react';
import { IEditablePath } from '../Paths';

interface PathModalProps {
    show: boolean;
    modalType: "edit" | "add" | "delete";
    initialData: IEditablePath | undefined;
    onHide: () => void;
    addPath: (data: IPath) => void;
    editPath: (data: IPath, idx: number) => void;
    deletePath: (idx: number) => void;
}

export const PathModal = ({ show, modalType, initialData, onHide, editPath, addPath, deletePath }: PathModalProps) => {
    const { register, handleSubmit, reset } = useForm({})


    useEffect(() => {
        if (modalType === "edit") {
            // Set initial values
            reset(initialData)
        } else {
            reset({ name: "", description: "", lineWidth: 1, lineColor: "#f6b73c" })
        }
    }, [initialData, modalType, reset])

    const onSubmit = (formData: any) => {
        if (!formData?.target) {
            if (modalType === 'edit' && initialData) {
                editPath(formData, initialData.idx)
            } else if (modalType === "add") {
                addPath(formData)
            } else if (modalType === "delete" && initialData) {
                deletePath(initialData.idx)
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
                                <label htmlFor="description">Тольщина линии</label>
                                <select {...register("lineWidth")}>
                                    <option value={1}>1 пикс.</option>
                                    <option value={2}>2 пикс.</option>
                                    <option value={3}>3 пикс.</option>
                                    <option value={4}>4 пикс.</option>
                                    <option value={8}>8 пикс.</option>
                                    <option value={12}>12 пикс.</option>
                                    <option value={16}>16 пикс.</option>
                                    <option value={24}>24 пикс.</option>
                                </select>
                            </div>

                            <div className="form_item">
                                <label htmlFor="lineColor">Цвет линии</label>
                                <input {...register("lineColor")} type="color" defaultValue="#f6b73c" />
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
                        ) : (
                            <>
                                <PointIcon />
                                <p>Confirm</p>
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}