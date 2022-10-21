import { Button, Modal } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select';
import { DeleteIcon, PointIcon } from '../../icons';
import { IPoint, PointIconEnum } from '../../App';
import './Modals.scss'
import { IEditablePoint } from '../Points';
import { useEffect } from 'react';

interface PointModalProps {
    addPoint: (data: IPoint) => void;
    show: boolean;
    onHide: () => void;
    modalType: "edit" | "add" | "delete";
    initialData: IEditablePoint | undefined;
    editPoint: (data: IPoint, idx: number) => void;
    deletePoint: (idx: number) => void;
}

export const PointModal = ({ addPoint, show, onHide, modalType, initialData, editPoint, deletePoint }: PointModalProps) => {
    const { register, handleSubmit, control, reset } = useForm({})

    useEffect(() => {
        if (modalType === "edit") {
            // Set initial values
            reset({ ...initialData, icon: initialData?.icon })
        } else {
            reset({ name: "", description: "", longitude: 0.00, latitude: 0.00, icon: null })
        }
    }, [initialData, modalType, reset])


    const onSubmit = (formData: any) => {
        if (!formData?.target) {
            if (modalType === 'edit' && initialData) {
                editPoint(formData, initialData.idx)
            } else if (modalType === "add") {
                addPoint(formData)
            } else if (modalType === "delete" && initialData) {
                deletePoint(initialData.idx)
            }

            setTimeout(() => {
                reset()
                onHide()
            }, 200)
        }

    }

    const options = [
        { value: PointIconEnum.icon1, label: 'Main point' },
        { value: PointIconEnum.icon2, label: 'Point for path' },
    ];

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
                                <input {...register("longitude")} type="number" step={0.00000000000001} />
                            </div>
                            <div className="form_item">
                                <label htmlFor="latitude">Широта</label>
                                <input {...register("latitude")} type="number" step={0.00000000000001} />
                            </div>

                            <div className="form_item">
                                <label htmlFor="icon">Иконка</label>
                                <Controller
                                    name="icon"
                                    control={control}
                                    render={({ field: { onChange, value, ref }, formState, fieldState }) => (
                                        <>
                                            <Select
                                                options={options}
                                                onChange={val => {
                                                    try {
                                                        onChange(val?.value);
                                                    } catch (err) {
                                                        console.log(err)
                                                    }
                                                }}
                                                formatOptionLabel={icon => (
                                                    <div>
                                                        <img src={icon?.value} alt="Point icon" width="30" height="30" />
                                                        <span>{icon?.label} </span>
                                                    </div>
                                                )}
                                            />
                                        </>
                                    )}
                                />
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