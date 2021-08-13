import Cookies from 'js-cookie'

const TokenKey = 'DB-Token';

export function createDB() {
    let db = getToken();
    if (!db) {
        setToken(JSON.stringify(initBanco()));
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
        {item: 'A', transacao: 0, ativa: false, valor: null},
        {item: 'B', transacao: 0, ativa: false, valor: null},
        {item: 'C', transacao: 0, ativa: false, valor: null},
        {item: 'D', transacao: 0, ativa: false, valor: null},
        {item: 'E', transacao: 0, ativa: false, valor: null},
        {item: 'F', transacao: 0, ativa: false, valor: null},
        {item: 'G', transacao: 0, ativa: false, valor: null},
        {item: 'H', transacao: 0, ativa: false, valor: null},
        {item: 'I', transacao: 0, ativa: false, valor: null},
        {item: 'J', transacao: 0, ativa: false, valor: null},
        {item: 'K', transacao: 0, ativa: false, valor: null},
    ]
}

export function initBanco() {
    return [
        {
            codigo: "4df6690e-5b02-41b9-9fb1-28bc4ab83f41",
            op: "A",
            valor: 15
        },
        {
            codigo: "c807777d-6244-4ad8-9841-bdc6c08a97ee",
            op: "B",
            valor: 5
        },
        {
            codigo: "08392a81-3aa3-4536-8891-8de5dc7b6e0a",
            op: "C",
            valor: 3
        },
        {
            codigo: "74a6bc12-3774-4af3-b6dd-f2023ab39e31",
            op: "D",
            valor: 17
        },
        {
            codigo: "eeda313d-d833-435e-a24d-848121694e3a",
            op: "E",
            valor: 20
        }
    ]
}


