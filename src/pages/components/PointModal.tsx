import { Button, Modal } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select';
import { PointIcon } from '../../icons';
import { IPoint, PointIconEnum } from '../../App';
import './Modals.scss'
import { IEditablePoint } from '../Points';
import { useEffect } from 'react';

interface PointModalProps {
    addPoint: (data: IPoint) => void;
    show: boolean;
    onHide: () => void;
    modalType: "edit" | "add";
    initialData: IEditablePoint | undefined;
    editPoint: (data: IPoint, idx: number) => void;
}

export const PointModal = ({ addPoint, show, onHide, modalType, initialData, editPoint }: PointModalProps) => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({})

    useEffect(() => {
        if (modalType === "edit") {
            reset({ ...initialData, icon: initialData?.icon })
        } else {
            reset({ name: "", description: "", longitude: 0.00, latitude: 0.00, icon: null })
        }
    }, [initialData, modalType, reset])


    const onSubmit = (formData: any) => {
        if (formData?.description) {
            if (modalType === 'edit' && initialData) {
                editPoint(formData, initialData.idx)
            } else if (modalType === "add") {
                addPoint(formData)
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
                </Modal.Body>

                <Modal.Footer className='modal_footer'>
                    <Button variant="outline-secondary" onClick={onHide}>
                        <p>Cancel</p>
                    </Button>
                    <Button variant="outline-primary btn_primary" onClick={onSubmit} type="submit">
                        <PointIcon />
                        <p>Add location</p>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}