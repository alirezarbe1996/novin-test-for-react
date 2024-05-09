import React, {ReactNode} from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="my-modal-overlay ">
            <div className="my-modal d-flex justify-content-center fadeInUp-animation">
                <div className="col-12 row p-0">
                    <div className="d-flex justify-content-end p-0">
                        <AiFillCloseCircle size={30} color={"#311e06"} className="my-modal-close-button" onClick={onClose}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;