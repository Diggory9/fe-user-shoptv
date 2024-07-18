export interface AuthModel {
    id?: string;
    userName?: string;
    email?: string;
    role?: string[];
    jwToken?: string;
    refreshToken?: string;
}
