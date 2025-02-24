import ReactTimeAgo from "react-time-ago";
import { IssueGet } from "../../types/issues";
import "./issueCard.css";

interface ComplaintCardProps {
    data: IssueGet;
    handleOpenModal?: (data: IssueGet) => void;
}

export const IssueCard = ({ data }: ComplaintCardProps) => {

    const handleOpenModal = (data: IssueGet) => {
        if (handleOpenModal) {
            handleOpenModal(data);
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <span className=
                    {`status-tag ${data.priority}`}
                ></span>
                <div className="card-header-content">
                    <span className="card-title">{data.serial}</span>
                    <span className="card-date">
                        <ReactTimeAgo date={data.registeredDate} locale="es-US" />
                    </span>
                </div>
                <button onClick={() => handleOpenModal(data)} className="menu-btn">🖊</button>
            </div>
            {
                data.associatedComplaint &&
                <p className="card-subtitle">{data.associatedComplaint?.clientName}
                    <ReactTimeAgo date={data.associatedComplaint?.eventDate} locale="es-US" />
                </p>
            }
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
                <span className="tag">
                    {data.associatedComplaint?.channel &&
                        data.associatedComplaint?.channel.toUpperCase()
                    }
                </span>
            </div>

        </div>
    );
};

export default IssueCard;
