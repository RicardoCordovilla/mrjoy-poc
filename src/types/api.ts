export interface ErrorApiResponse {
    response: {
        data: {
            error: string;
            errorCode: string;
        }
    }
}