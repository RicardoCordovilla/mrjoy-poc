import ReactTimeAgo from "react-time-ago";
import { IssueGet } from "../../types/issues";
import "./issueCard.css";

interface ComplaintCardProps {
    data: IssueGet;
}

export const IssueCard = ({ data }: ComplaintCardProps) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className=
                    {`status-tag ${data.priority}`}
                ></span>
                <span>{data.serial}</span>
                <button className="edit-button">✏️</button>
            </div>
            <p className="card-subtitle">{data.associatedComplaint?.clientName} -
                <ReactTimeAgo date={data.registeredDate} locale="es-US" />
            </p>
            <p className="card-details">
                <strong>Detalles:</strong>
                {data.associatedComplaint?.description}
            </p>
            <div className="tags-container">
                <span className="tag">
                    {
                        data.issueType
                    }
                </span>
                <span className="tag">
                    {
                        data.product
                    }
                </span>
            </div>
        </div>
    );
};

export default IssueCard;
