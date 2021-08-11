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
        tid: valor.transacao,
        operacao: "commit",
        valor: "T" + valor.transacao,
        texto: "commit, T" + valor.transacao,
    }
}

//Quando fazer o cheponk pegar todas as transacoes com commit e gravar no banco
//Adicionar no log a tag chepont com as transacoes com commit
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
        dadosdb.push({op: v.objeto, valor: v.valor});
    } else {
        dadosdb[achou].valor = v.valor;
    }
    setToken(JSON.stringify(dadosdb))
}

/*
logs: {
    handler: function (val) {
        let aux_array = [];
        let t_commit = [];
        val.forEach(function (v) {
            if (v.operacao === 'COMMIT') {
                t_commit.push(v.tid)
            }
        });
        val.forEach(function (v) {
            aux_array.push(v.tid);
        });
        let aux_R = [...new Set(aux_array)];
        t_commit.forEach(function (c) {
            aux_R.splice(aux_R.findIndex(r => r === c), 1)
        });
        this.sel_transacao = aux_R;
        if (this.sel_transacao && this.sel_transacao.length > 0) {
            this.operacao.transacao = this.sel_transacao[0];
        } else {
            this.operacao.transacao = -1;
        }
    },
    deep: true
},*/