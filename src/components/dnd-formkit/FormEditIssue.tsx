import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IssueGet } from "../../types/issues";
import { usePatchData } from "../../utils/api/hooks/usePatchData";
import "./EditIssueForm.css";

interface EditIssueFormData {
    priority: string;
    assignedToId: string | null;
    issueType: string | null;
}

interface EditIssueFormProps {
    issue: IssueGet;
    onClose?: () => void;
    onOpen?: (data: IssueGet) => void;
}

const EditIssueForm: React.FC<EditIssueFormProps> = ({ issue, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditIssueFormData>({
        defaultValues: {
            priority: issue.priority,
            assignedToId: issue.assignedTo,
            issueType: issue.issueType,
        }
    });

    const queryClient = useQueryClient();
    const { mutate } = usePatchData<EditIssueFormData>({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            onClose?.();
        }
    });

    const onSubmit: SubmitHandler<EditIssueFormData> = (data) => {
        mutate({
            url: 'issues',
            id: issue.id,
            data: {
                priority: data.priority,
                assignedToId: data.assignedToId,
                issueType: data.issueType,
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="issue-form">
            <h2>Editar Problema #{issue.id}</h2>

            <div className="form-group">
                <label>Tipo de Problema</label>
                <select {...register("issueType", { required: true })}>
                    <option value="">Selecciona un tipo</option>
                    <option value="1">Limpieza</option>
                    <option value="2">Mantenimiento</option>
                    <option value="3">Restaurante</option>
                    <option value="4">Administración</option>
                    <option value="5">Atención al cliente</option>
                    <option value="6">Otro</option>
                </select>
                {errors.issueType && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Prioridad</label>
                <select {...register("priority", { required: true })}>
                    <option value="">Selecciona prioridad</option>
                    <option value="1">Baja</option>
                    <option value="2">Media</option>
                    <option value="3">Alta</option>
                    <option value="4">Urgente</option>
                </select>
                {errors.priority && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Asignar a</label>
                <select {...register("assignedToId", { required: true })}>
                    <option value="">Selecciona responsable</option>
                    <option value="user1">Juan Pérez</option>
                    <option value="user2">María García</option>
                    <option value="user3">Carlos López</option>
                </select>
                {errors.assignedToId && <span>Campo obligatorio</span>}
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="submit-btn">
                    Guardar Cambios
                </button>
            </div>
        </form>
    );
};

export default EditIssueForm;