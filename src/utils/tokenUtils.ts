import { DecodedToken } from '@/models/jwt-model';
import { jwtDecode } from 'jwt-decode'
export function checkIfTokenExpired(token: string): boolean {
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp ? decodedToken.exp < currentTime : true;
    }
    return false;
}