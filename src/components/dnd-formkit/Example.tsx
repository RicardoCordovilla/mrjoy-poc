import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IssueGet } from "../../types/issues";
import { usePatchData } from "../../utils/api/hooks/usePatchData";
import "./example2.css";
import IssueCard from "./IssueCard";

interface Props {
    issues: IssueGet[] | undefined;
    setChangedData?: (data: string) => void;
}

export const Example = ({ issues, setChangedData }: Props) => {
    const [columns, setColumns] = useState({
        todo: issues?.filter((issue) => issue.statusId === 1) || [],
        inProgress: issues?.filter((issue) => issue.statusId === 2) || [],
        done: issues?.filter((issue) => issue.statusId === 3) || [],
    });

    const queryClient = useQueryClient();
    const { mutate } = usePatchData();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (result: any, newStatusId: number, columnKey: keyof typeof columns) => {
        const { draggedNode } = result;
        const Item: IssueGet = draggedNode.data.value as IssueGet;
        setChangedData?.(`Moved ${Item.serial} to ${columnKey}`);
        console.log(`Moved ${Item.serial} to ${columnKey}`);

        mutate(
            {
                url: "issues",
                id: Item.id,
                data: { statusId: newStatusId },
            },
            {
                onSuccess: () => {
                    setChangedData?.(`Moved ${Item.serial} to ${columnKey}`);
                    // Immediately update the local state
                    setColumns(prev => ({
                        todo: prev.todo.filter(i => i.id !== Item.id),
                        inProgress: prev.inProgress.filter(i => i.id !== Item.id),
                        done: prev.done.filter(i => i.id !== Item.id),
                        [columnKey]: [...(prev[columnKey]), { ...Item, statusId: newStatusId }]
                    }));
                    // Then invalidate the query to sync with server
                    queryClient.invalidateQueries({ queryKey: ["issues"] });
                },
            }
        );
    };

    const [todoList, todos] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.todo, {
        group: "kanban",
        onDragend: (result) => handleDragEnd(result, 2, "inProgress"),
    });

    const [inProgressList, inProgress] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.inProgress, {
        group: "kanban",
        onDragend: (result) => handleDragEnd(result, 3, "done"),
    });

    const [doneList, dones] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.done, {
        group: "kanban",
        onDragend: (result) => handleDragEnd(result, 1, "todo"),
    });

    useEffect(() => {
        setColumns({
            todo: issues?.filter((issue) => issue.statusId === 1) || [],
            inProgress: issues?.filter((issue) => issue.statusId === 2) || [],
            done: issues?.filter((issue) => issue.statusId === 3) || [],
        });
    }, [issues]);

    return (
        <div className="kanban-board">
            <div className="kanban-column">
                <h3 className="columnTitle">Registro</h3>
                <ul ref={todoList} className="kanban-list">
                    {todos.map((todo) => (
                        <li className="kanban-item" key={todo.id}>
                            <IssueCard data={todo} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="kanban-column">
                <h3 className="columnTitle">Resolviendo</h3>
                <ul ref={inProgressList} className="kanban-list">
                    {inProgress.map((progress) => (
                        <li className="kanban-item" key={progress.id}>
                            <IssueCard data={progress} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="kanban-column">
                <h3 className="columnTitle">Resuelto</h3>
                <ul ref={doneList} className="kanban-list">
                    {dones.map((done) => (
                        <li className="kanban-item" key={done.id}>
                            <IssueCard data={done} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
