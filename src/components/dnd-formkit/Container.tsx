import { useEffect, useState } from "react";
import { useGetData } from "../../utils/api/hooks/useGetData";
import { IssueGet } from "../../types/issues";
import { Example } from "./Example";

export const Container = () => {
    const { data: issues, refetch } = useGetData<IssueGet[]>('/issues', ['issues'], {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 2000, // Refetch every 2 seconds
        staleTime: 1000,
    });

    const [changedData, setChangedData] = useState<string>('');

    useEffect(() => {
        console.log('Data has changed:', changedData);
        refetch();
    }, [changedData, refetch]);

    return (
        <div className="App">
            {issues && (
                <Example
                    issues={issues}
                    setChangedData={setChangedData}
                />
            )}
        </div>
    );
}