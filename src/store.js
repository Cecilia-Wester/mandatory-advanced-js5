import {BehaviorSubject} from 'rxjs';
export const token$ = new BehaviorSubject(window.localStorage.getItem('token'));

export function updateToken(token){
    if (token) {
        window.localStorage.setItem('token', token)
    } else {
        window.localStorage.removeItem('token');
    }
    token$.next(token);
}
