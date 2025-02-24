import { useEffect, useState } from "react";
import { ComplaintGet } from "../../types/complaint";
import { IssueGet } from "../../types/issues";
import { useGetData } from "../../utils/api/hooks/useGetData";
import ComplaintCard from "./ComplaintCard";
import { Example } from "./Example";
import NewClaimForm from "./FormNewComplaint";
import Modal from "./Modal";

export const Container = () => {
    const { data: issues, refetch } = useGetData<IssueGet[]>('/issues', ['issues'], {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const { data: complaints } = useGetData<ComplaintGet[]>('/complaints', ['complaints']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changedData, setChangedData] = useState<string>('');

    useEffect(() => {
        console.log('Data has changed:', changedData);
        refetch();
    }, [changedData, refetch]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    return (
        <div className="App">
            <div className="dashboard">
                <div className="complaints-column">
                    <div className="complaints-header">
                        <h3 className="columnTitle">Bandeja de entrada-RECLAMOS</h3>
                        <button className="add-btn" onClick={handleOpenModal}>
                            ➕
                        </button>
                    </div>
                    <div className="complaintsList">
                        {complaints && complaints.map((todo) => (
                            <ComplaintCard data={todo} />
                        ))}
                    </div>
                </div>
                {issues && (
                    <Example
                        issues={issues}
                        setChangedData={setChangedData}
                    />
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <NewClaimForm onClose={handleCloseModal} />
            </Modal>
        </div>
    );
}