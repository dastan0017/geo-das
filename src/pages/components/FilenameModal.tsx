
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FileIcon } from '../../icons';

interface FilenameModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (formData: any) => void
}
export const FilenameModal = ({ show, onHide, onSubmit }: FilenameModalProps) => {
    const { register, handleSubmit } = useForm({})

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>

            <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
                <Modal.Body>
                    <div className='form_item'>
                        <label htmlFor="fileName">Название</label>
                        <input {...register("fileName")} placeholder="Введите название файла" type="text" />
                    </div>
                </Modal.Body>

                <Modal.Footer className='modal_footer'>
                    <Button variant="outline-secondary" onClick={onHide}>
                        <p>Cancel</p>   
                    </Button>
                    <Button variant="outline-success btn_primary" onClick={onSubmit} type="submit">
                        <FileIcon />
                        <p>Export</p>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}