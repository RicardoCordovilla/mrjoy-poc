import { useEffect, useState } from "react";
import { useGetData } from "../../utils/api/hooks/useGetData";
import { IssueGet } from "../../types/issues";
import { Example } from "./Example";

const Container = () => {

    const { data: issues, refetch } = useGetData<IssueGet[]>('/issues', ['issues'])
    const [changedData, setChangedData] = useState<string>('');

    useEffect(() => {
        refetch()
    }, [issues, changedData, refetch])

    return (
        <div className="App">
            {
                issues &&
                <Example
                    issues={issues}
                    setChangedData={setChangedData}
                />
            }
        </div>
    )
}

export default Container