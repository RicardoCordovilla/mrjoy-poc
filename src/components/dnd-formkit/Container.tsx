import { useEffect, useState } from "react";
import { useGetData } from "../../utils/api/hooks/useGetData";
import { IssueGet } from "../../types/issues";
import { Example } from "./Example";
import ComplaintCard from "./ComplaintCard";
import { ComplaintGet } from "../../types/complaint";

export const Container = () => {
    const { data: issues, refetch } = useGetData<IssueGet[]>('/issues', ['issues'], {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const { data: complaints } = useGetData<ComplaintGet[]>('/complaints', ['complaints']);

    const [changedData, setChangedData] = useState<string>('');

    useEffect(() => {
        console.log('Data has changed:', changedData);
        refetch();
    }, [changedData, refetch]);

    return (
        <div className="App">
            <div className="dashboard">
                <div className="complaints-column">
                    <h3 className="columnTitle">Bandeja de entrada-RECLAMOS</h3>
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
        </div>
    );
}