export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    token: string;
}