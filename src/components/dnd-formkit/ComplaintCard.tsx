import React from "react";
import "./complaintCard.css";
import { ComplaintGet } from "../../types/complaint";
import ReactTimeAgo from 'react-time-ago'


const ComplaintCard: React.FC<{ data: ComplaintGet }> = ({ data }) => {
    const formattedDate = new Date(data.eventDate).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="complaint-card">
            <div className="complaint-header">
                <h3>Reclamo #{data.serialNumber.toString().padStart(5, "0")}</h3>
                <div className="icons">
                    <button className="edit-btn">✏️</button>
                    <button className="menu-btn">☰</button>
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
    );
};

export default ComplaintCard;
