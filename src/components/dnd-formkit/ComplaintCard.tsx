import React, { useState } from "react";
import "./complaintCard.css";
import { ComplaintGet } from "../../types/complaint";
import ReactTimeAgo from 'react-time-ago'
import Modal from "./Modal";
import NewIssueForm from "./FormNewIssue";

const ComplaintCard: React.FC<{ data: ComplaintGet }> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="complaint-card">
                <div className="complaint-header">
                    <h3>Reclamo #{data.serialNumber.toString().padStart(5, "0")}</h3>
                    <div className="icons">
                        <button className="menu-btn" onClick={handleOpenModal}>📝</button>
                    </div>
                </div>
                <p className="complaint-subtitle">{data.clientName} -
                    <ReactTimeAgo date={data.eventDate} locale="es-US" />
                </p>
                <p className="complaint-description">
                    <strong>Descripción:</strong> {data.description}
                </p>
                {data.observations && (
                    <p className="complaint-observations">
                        <strong>Observaciones:</strong> {data.observations}
                    </p>
                )}
                <div className="complaint-tags">
                    <span className="tag">{data.clientType}</span>
                    <span className={`tag ${data.requireSolution ? "no" : "yes"}`}>
                        {data.requireSolution ? "SI" : "NO"}
                    </span>
                    <span className="tag">Web</span>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="modal-header">
                    <h2>Nuevo Problema para Reclamo #{data.serialNumber.toString().padStart(5, "0")}</h2>
                    <button className="close-btn" onClick={handleCloseModal}>✖</button>
                </div>
                <NewIssueForm 
                    associatedComplaintId={data.id} 
                    onClose={handleCloseModal}
                />
            </Modal>
        </>
    );
};

export default ComplaintCard;