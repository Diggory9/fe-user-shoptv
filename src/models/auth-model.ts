export interface AuthModel {
    id?: string;
    userName?: string;
    email?: string;
    displayName?: string;
    role?: string[];
    jwToken?: string;
    refreshToken?: string;
}
