export interface ComplaintGet {
    id: string;
    serialNumber: number;
    clientType: string;
    identifications: string;
    clientName: string;
    address: string | null;
    email: string;
    phoneNumber: string | null;
    contactPerson: string | null;
    invoiceReference: string | null;
    eventDate: Date;
    description: string;
    requireSolution: boolean;
    attachments: string | null;
    observations: string | null;
    channel: string;
}
