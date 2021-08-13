import {v4 as uuidv4} from "uuid";
import {tempo} from "@/util";
import {getToken, setToken} from "../model/model";

export function t_start(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao.tid,
        tempo: tempo(),
        operacao: "start_transaction",
        objeto: "",
        antes: "",
        depois: "",
        valor: "T" + valor.transacao.tid,
        pAnt: 0,
        pProx: 0,
        texto: "start_transaction, T" + valor.transacao.tid
    }
}

export function t_end(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao.tid,
        tempo: tempo(),
        operacao: "end_transaction",
        objeto: "",
        antes: "",
        depois: "",
        valor: "T" + valor.transacao.tid,
        pAnt: 0,
        pProx: 0,
        texto: "end_transaction, T" + valor.transacao.tid
    }
}

export function t_abort(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao.tid,
        tempo: tempo(),
        operacao: "abort_transaction",
        objeto: "",
        antes: "",
        depois: "",
        valor: "T" + valor.transacao.tid,
        pAnt: 0,
        pProx: 0,
        texto: "abort_transaction, T" + valor.transacao.tid
    }
}

export function t_insert(valor, old = "") {
    return {
        codigo: uuidv4(),
        tid: valor.transacao.tid,
        tempo: tempo(),
        operacao: valor.tipo,
        objeto: valor.objeto.item,
        tipo: valor.tipo,
        valor: valor.valor,
        antes: old,
        depois: valor.valor
    }
}

export function t_log_disco(valor, old = "") {
    return {
        codigo: uuidv4(),
        tid: valor.tid,
        operacao: valor.tipo,
        objeto: valor.objeto,
        tipo: valor.tipo,
        valor: valor.valor,
        antes: old,
        depois: valor.valor,
        texto: "   " + valor.tipo + ", T" + valor.tid + ", " + valor.objeto + ", " + valor.valor
    }
}

export function t_commit(valor) {
    return {
        codigo: uuidv4(),
        tid: valor.transacao.tid,
        operacao: "commit",
        valor: "T" + valor.transacao.tid,
        texto: "commit, T" + valor.transacao.tid,
    }
}

export function t_checkep(commit) {
    let trans = [];
    commit.forEach(function (c) {
        trans.push(c.valor);
    });
    return {
        codigo: uuidv4(),
        operacao: "checkpoint",
        objeto: trans,
        tipo: "",
        valor: "",
        texto: "checkpoint, " + trans.join(' ')
    }
}

export function save_banco(v) {
    let dadosdb = JSON.parse(getToken());
    const achou = dadosdb.map(function (db) {
        return db.op;
    }).indexOf(v.objeto);
    if (achou < 0) {
        dadosdb.push({codigo: uuidv4(), op: v.objeto, valor: v.valor});
    } else {
        dadosdb[achou].valor = v.valor;
        dadosdb[achou].codigo = uuidv4();
    }
    setToken(JSON.stringify(dadosdb))
}