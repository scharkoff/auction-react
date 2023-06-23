export interface IResponse {
    error?: {
        message: string;
        name: string;
        stack: string;
    };
    message: string;
    payload: Record<string, unknown>;
    type: string;
}
