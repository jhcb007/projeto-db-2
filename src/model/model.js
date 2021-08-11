import Cookies from 'js-cookie'

const TokenKey = 'DB-Token';

export function createDB() {
    let db = getToken();
    if (!db) {
        setToken(JSON.stringify([]));
    }
}

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {expires: 180})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function objetos() {
    return [
        {item: 'A', transacao: 0, ativa: false},
        {item: 'B', transacao: 0, ativa: false},
        {item: 'C', transacao: 0, ativa: false},
        {item: 'D', transacao: 0, ativa: false},
        {item: 'E', transacao: 0, ativa: false},
        {item: 'F', transacao: 0, ativa: false},
        {item: 'G', transacao: 0, ativa: false},
        {item: 'H', transacao: 0, ativa: false},
        {item: 'I', transacao: 0, ativa: false},
        {item: 'J', transacao: 0, ativa: false},
        {item: 'K', transacao: 0, ativa: false},
    ]
}