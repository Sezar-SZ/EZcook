export interface RefreshResponse {
    accessToken: string;
}

export interface loginResponse {
    accessToken: string;
}

export interface AuthError {
    message: string;
    statusCode: number;
}
