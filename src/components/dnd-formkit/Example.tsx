import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IssueGet } from "../../types/issues";
import { usePatchData } from "../../utils/api/hooks/usePatchData";
import "./example2.css";
import IssueCard from "./IssueCard";
import Modal from "./Modal";
import EditIssueForm from "./FormEditIssue";

interface Props {
    issues: IssueGet[] | undefined;
}

export const Example = ({ issues }: Props) => {
    const [columns, setColumns] = useState({
        todo: issues?.filter((issue) => issue.statusId === 1) || [],
        inProgress: issues?.filter((issue) => issue.statusId === 2) || [],
        done: issues?.filter((issue) => issue.statusId === 3) || [],
    });

    const queryClient = useQueryClient();
    const { mutate } = usePatchData();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (result: any, newStatusId: number) => {
        const { draggedNode } = result;
        const Item: IssueGet = draggedNode.data.value as IssueGet;
        console.log(`Moved ${Item.serial} to ${newStatusId}, new statusId: ${newStatusId}`);

        mutate(
            {
                url: "issues",
                id: Item.id,
                data: { statusId: newStatusId },
            },
            {
                onSuccess: () => {
                    // Immediately update the local state
                    setColumns(prev => ({
                        todo: prev.todo.filter(i => i.id !== Item.id),
                        inProgress: prev.inProgress.filter(i => i.id !== Item.id),
                        done: prev.done.filter(i => i.id !== Item.id),
                        // [columnKey]: [...(prev[columnKey]), { ...Item, statusId: newStatusId }]
                    }));
                    // Then invalidate the query to sync with server
                    queryClient.invalidateQueries({ queryKey: ["issues"] });
                },
            }
        );
    };

    const [todoList, todos] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.todo, {
        group: "kanban",
        onDragend: (result) => {
            const { parent } = result;
            const columnId = parent.el.classList[1];
            const newStatusId = parseInt(columnId);
            handleDragEnd(result, newStatusId);
        },
    });

    const [inProgressList, inProgress] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.inProgress, {
        group: "kanban",
        onDragend: (result) => {
            const { parent } = result;
            const columnId = parent.el.classList[1];
            const newStatusId = parseInt(columnId);
            handleDragEnd(result, newStatusId);
        }
    });

    const [doneList, dones] = useDragAndDrop<HTMLUListElement, IssueGet>(columns.done, {
        group: "kanban",
        onDragend: (result) => {
            const { parent } = result;
            const columnId = parent.el.classList[1];
            const newStatusId = parseInt(columnId);
            handleDragEnd(result, newStatusId);
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


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
                <ul ref={todoList} className="kanban-list 1" data-id={1}>
                    {todos.map((todo) => (
                        <li className="kanban-item" key={todo.id}>
                            <IssueCard data={todo} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="kanban-column">
                <h3 className="columnTitle">Resolviendo</h3>
                <ul ref={inProgressList} className="kanban-list 2" data-id={2}>
                    {inProgress.map((progress) => (
                        <li className="kanban-item" key={progress.id}>
                            <IssueCard data={progress} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="kanban-column">
                <h3 className="columnTitle">Resuelto</h3>
                <ul ref={doneList} className="kanban-list 3" data-id={3}>
                    {dones.map((done) => (
                        <li className="kanban-item" key={done.id}>
                            <IssueCard data={done} />
                        </li>
                    ))}
                </ul>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <EditIssueForm
                    // issue={data}
                    onClose={handleCloseModal}
                    onOpen={handleOpenModal}
                />
            </Modal>
        </div>
    );
};
