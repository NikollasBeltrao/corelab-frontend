import React from 'react';
import { ModalProps } from '../../types/interfaces';

const ModalComponent: React.FC<ModalProps> = ({ id, title, content, onConfirm, onCancel }) => {

    function handleConfirm(confirm: boolean) {
        if (confirm) {
            onConfirm()
        } else {
            onCancel();
        }
    }


    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby={`${id}Label`}
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id={`${id}Label`}
                        >
                            {title}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                handleConfirm(false);
                            }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                handleConfirm(false);
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                handleConfirm(true);
                            }}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent;