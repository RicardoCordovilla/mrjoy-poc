import { IssueGet } from "../../types/issues";
import "./complaintCard.css";

interface ComplaintCardProps {
    data: IssueGet;
}

export const IssueCard = ({ data }: ComplaintCardProps) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className=
                    {`status-tag ${data.statusId === 1 ? "todo" : data.statusId === 2 ? "in-progress" : "done"}`}
                ></span>
                <span>{data.serial}</span>
                <button className="edit-button">✏️</button>
            </div>
            <p className="card-subtitle">{data.registeredBy} - hace 2 días</p>
            <p className="card-details">
                <strong>Detalles:</strong> La máquina expendedora de snacks no está entregando los productos después del pago, algunos clientes han reportado dinero perdido..
            </p>
            <div className="tags-container">
                <span className="tag">Equipos</span>
                <span className="tag">Cafetería</span>
            </div>
        </div>
    );
};

export default IssueCard;
