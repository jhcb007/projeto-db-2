import {v4 as uuidv4} from "uuid";
import {tempo} from "@/util";
import {getToken, setToken} from "../model/model";

export function t_start(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao,
        tempo: tempo(),
        operacao: "start_transaction",
        objeto: "",
        antes: "",
        depois: "",
        valor: "T" + valor.transacao,
        pAnt: 0,
        pProx: 0,
        texto: "start_transaction, T" + valor.transacao
    }
}

export function t_insert(valor, old = "") {
    return {
        codigo: uuidv4(),
        tid: valor.transacao,
        tempo: tempo(),
        operacao: valor.tipo,
        objeto: valor.objeto,
        tipo: valor.tipo,
        valor: valor.valor,
        antes: old,
        depois: valor.valor,
        texto: valor.tipo + ", T" + valor.tid + ", " + valor.objeto + ", " + valor.valor
    }
}

export function t_commit(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao,
        operacao: "commit",
        valor: "T" + valor.transacao,
        texto: "commit, T" + valor.transacao,
    }
}

export function t_checkep(valor) {
    valor = valor.map(function (num) {
        return 'T' + num;
    });
    return {
        codigo: uuidv4(),
        tid: "",
        tempo: tempo(),
        operacao: "CHECKP",
        objeto: valor.join(', '),
        tipo: "",
        valor: "",
        antes: "",
        depois: "",
        pAnt: "",
        pProx: ""
    }
}

export function save_banco(v) {
    let dadosdb = JSON.parse(getToken());
    let achou = false;
    dadosdb.forEach(function (d) {
        if (d.op === v.objeto) {
            d.valor = v.valor
            achou = true;
        }
    });
    if (!achou) {
        dadosdb.push({op: v.objeto, valor: v.valor});
    }
    setToken(JSON.stringify(dadosdb))
}

