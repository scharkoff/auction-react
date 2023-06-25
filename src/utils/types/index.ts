export interface IResponse {
    error?: {
        message: string;
        name: string;
        stack: string;
    };
    message: string;
    payload: {
        message: string;
        data: Record<string, unknown>;
    };
    type: string;
}
