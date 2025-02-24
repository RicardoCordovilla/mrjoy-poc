import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./NewIssueForm.css";
import { usePostData } from "../../utils/api/hooks/usePostData";
import { ErrorApiResponse } from "../../types/api";
import { useQueryClient } from "@tanstack/react-query";

interface IssueFormData {
    issueTypeId: number;
    associatedComplaintId: string;
}

interface NewIssueFormProps {
    associatedComplaintId: string;
    onClose?: () => void;
}

const NewIssueForm: React.FC<NewIssueFormProps> = ({ associatedComplaintId, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>(
        { defaultValues: { associatedComplaintId } }
    );

    const queryClient = useQueryClient();
    const { mutate } = usePostData('issues', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues', 'complaints'] });
            onClose?.();
            window.location.reload();
        },
        onError: (error: ErrorApiResponse) => {
            console.log(error);
        }
    });

    const onSubmit: SubmitHandler<IssueFormData> = (data) => {
        mutate({
            registeredById: "009a262a-7131-42ee-a948-b24a14b30926",
            issueTypeId: data.issueTypeId,
            associatedComplaintId: data.associatedComplaintId,
            statusId: 1,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="issue-form">
            <h2>Registrar Nuevo Problema</h2>

            <div className="form-group">
                <label>Tipo de Problema</label>
                <select {...register("issueTypeId", { required: true })}>
                    <option value="">Selecciona un tipo</option>
                    <option value="1">Limpieza</option>
                    <option value="2">Mantenimiento</option>
                    <option value="3">Restaurante</option>
                    <option value="3">Administración</option>
                    <option value="3">Atención al cliente</option>
                    <option value="3">Otro</option>
                </select>
                {errors.issueTypeId && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>ID de Reclamo Asociado</label>
                <input
                    type="text"
                    {...register("associatedComplaintId", { required: true })}
                    placeholder="Ejemplo: 577c30bb-9392-4e02-913b-17b79b2c5077"
                />
                {errors.associatedComplaintId && <span>Campo obligatorio</span>}
            </div>

            <button type="submit" className="submit-btn">Enviar</button>
        </form>
    );
};

export default NewIssueForm;
