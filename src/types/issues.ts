export interface IssueGet {
    id: string;
    serial: string;
    registeredDate: Date;
    priority: string;
    satisfactionLevel: string | null;
    associatedCosts: string | null;
    affectedPeople: number | null;
    registeredBy: string;
    classifiedBy: string | null;
    assignedTo: string | null;
    associatedComplaint: AssociatedComplaint | null;
    statusId: number;
    status: string | null;
    issueType: string | null;
    product: string | null;
    actionPlan: string | null;
    supplier: string | null;
}


export interface AssociatedComplaint {
    clientName: string;
    serialNumber: number;
    description: string;
    eventDate: Date;
}
