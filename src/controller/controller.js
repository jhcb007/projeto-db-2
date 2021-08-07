import {v4 as uuidv4} from "uuid";
import {tempo} from "@/util";
import {getToken, setToken} from "../model/model";


export function t_start(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao,
        tempo: tempo(),
        operacao: "START",
        objeto: "",
        antes: "",
        depois: "",
        pAnt: 0,
        pProx: 0
    }
}

export function t_insert(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao,
        tempo: tempo(),
        operacao: "INSERT",
        objeto: valor.tipo + ', ' + valor.valor,
        tipo: valor.tipo,
        valor: valor.valor,
        antes: "",
        depois: "NEWV",
        pAnt: 0,
        pProx: 0
    }
}

export function save_banco(t, logs) {
    let dadosdb = JSON.parse(getToken());
    logs.forEach(function (v) {
        dadosdb.push({op: v.tipo, valor: v.valor, tempo: tempo()});
    });
    setToken(JSON.stringify(dadosdb))
}

