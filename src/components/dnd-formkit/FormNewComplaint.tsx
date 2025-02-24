import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorApiResponse } from "../../types/api";
import { usePostData } from "../../utils/api/hooks/usePostData";
import "./NewClaimForm.css";

interface ClaimFormData {
    clientType: "particular" | "empresa";
    identifications: string;
    clientName: string;
    address: string;
    email: string;
    phoneNumber: string;
    contactPerson: string;
    invoiceReference: string;
    eventDate: string;
    description: string;
    requireSolution: boolean;
    attachments: string[];
    observations: string;
}
interface NewClaimFormProps {
    onClose?: () => void;
}

const NewClaimForm: React.FC<NewClaimFormProps> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClaimFormData>();

    const queryClient = useQueryClient();

    const { mutate } = usePostData('complaints', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['complaints'] });
            onClose?.();
        },
        onError: (error: ErrorApiResponse) => {
            console.log(error);
        }
    });

    const onSubmit: SubmitHandler<ClaimFormData> = (data) => {
        const body={
            identifications: data.identifications,
            clientName: data.clientName,
            email: data.email,
            eventDate: data.eventDate,
            description: data.description,
        }
        console.log(body);
        mutate(body);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="claim-form">
            <div className="form-header">
                <h2>NUEVO RECLAMO</h2>
                <button type="button" className="close-btn" onClick={onClose}>✖</button>
            </div>

            <div className="form-group">
                <label>Identificación</label>
                <input {...register("identifications", { required: true })} />
                {errors.identifications && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Nombre</label>
                <input {...register("clientName", { required: true })} />
                {errors.clientName && <span>Campo obligatorio</span>}
            </div>


            <div className="form-group">
                <label>Email</label>
                <input type="email" {...register("email", { required: true })} />
                {errors.email && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" {...register("phoneNumber", { required: true })} />
                {errors.phoneNumber && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Fecha</label>
                <input type="date" {...register("eventDate", { required: true })} />
                {errors.eventDate && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Dirección</label>
                <input {...register("address")} />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea {...register("description", { required: true })}></textarea>
                {errors.description && <span>Campo obligatorio</span>}
            </div>

            <div className="form-group">
                <label>Factura de referencia</label>
                <input {...register("invoiceReference")} />
            </div>

            <div className="form-group switch-group">
                <label>Requiere solución</label>
                <input type="checkbox" {...register("requireSolution")} />
            </div>

            <div className="form-group">
                <label>Observaciones adicionales</label>
                <input {...register("observations")} />
            </div>

            <div className="attachments">
                <h3>Adjuntos</h3>
                <div className="upload-placeholder">📷</div>
            </div>

            <button type="submit" className="submit-btn">Enviar</button>
        </form>
    );
};

export default NewClaimForm;
