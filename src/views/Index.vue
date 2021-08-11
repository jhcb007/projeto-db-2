<template>
  <div>
    <div class="relative bg-blueGray-100">
      <div class="relative bg-red-700 pb-64 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div>
            <div class="flex flex-wrap">
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto w-full -mt-64">
        <div>
          <div class="flex flex-wrap">
            <div class="md:w-4/12 mb-1 px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700">
                        Operações
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="block w-full mb-2">
                  <div class="px-3 mb-2">
                    <div class="flex flex-wrap">
                      <h3 class="font-semibold text-base text-blueGray-700 mb-1">Tipo</h3>
                      <select v-model="tipo"
                              class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                        <option value="Adiada">Adiada</option>
                        <option value="Imediata_redo">Imediata UNDO/REDO</option>
                        <option value="Imediata_noredo">Imediata UNDO/NO-REDO</option>
                      </select>
                    </div>
                  </div>
                  <div class="px-3">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <h3 class="font-semibold text-base text-blueGray-700 mb-1">Operação</h3>
                        <select v-model="operacao.tipo"
                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option value="write_item">Write</option>
                          <option value="READ">Read</option>
                        </select>
                      </div>
                      <div class="md:w-6/12 pl-4">
                        <h3 v-show="sel_transacao && sel_transacao.length > 0"
                            class="font-semibold text-base text-blueGray-700 mb-1">Transação</h3>
                        <select
                            v-show="sel_transacao && sel_transacao.length > 0"
                            v-model="operacao.transacao"
                            @change="selTransacao()"
                            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option value="-1">Nova</option>
                          <option v-for="t in sel_transacao" :key="t" v-bind:value="t">T{{ t }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 mt-2">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <h3 class="font-semibold text-base text-blueGray-700 mb-1">Objeto</h3>
                        <select v-model="operacao.objeto"
                                v-bind:disabled="operacao.objeto.ativa"
                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option v-for="o in list_objetos" v-bind:disabled="o.ativa" :key="o" v-bind:value="o">
                            {{ o.item }}
                          </option>
                        </select>
                      </div>
                      <div class="md:w-6/12 pl-4 ">
                        <h3 class="font-semibold text-base text-blueGray-700 mb-1">Valor</h3>
                        <div class="relative flex w-full flex-wrap items-stretch mb-3">
  <span
      class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
    </span><input type="number"
                  min="1"
                  v-model="operacao.valor"
                  class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 mt-3">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12 ">
                        <button
                            v-show="(sel_transacao && sel_transacao.length > 0) && tipo !=='Adiada'"
                            @click="finalizar()"
                            class="bg-indigo-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Finalizar
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
                        <button
                            @click="executar()"
                            v-show="operacao.transacao"
                            class="bg-lightBlue-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Executar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="block w-full">
                  <div class="px-3 py-2">
                    <div class="flex flex-wrap">
                      <div class="md:w-4/12">
                        <button
                            @click="commit()"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Commit
                        </button>
                      </div>
                      <div class="md:w-4/12">
                        <button
                            v-show="tipo =='Imediata_redo'"                         
                            @click="estouro()"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Mem
                        </button>
                      </div>
                      <div class="md:w-4/12 text-right">
                        <button
                            @click="saveCheckpoint()"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Checkpoint
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr class="py-1">
                  <div class="px-3 py-1">
                    <div class="flex flex-wrap">
                      <div class="md:w-4/12">
                        <button
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Abort
                        </button>
                      </div>
                      <div class="md:w-4/12">
                        <button
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Falha
                        </button>
                      </div>
                      <div class="md:w-4/12 text-right">
                        <button
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Restart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:w-8/12 mb-1 xl:mb-0">
              <div class="flex flex-wrap">
                <div class="md:w-8/12 mb-1">
                  <div class="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Logs da Memória
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          TID
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Tempo
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Operação
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Objeto
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Antes
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Depois
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="l in logs" :key="l.codigo">
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="l.tid">T{{ l.tid }}</span>
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.tempo }}
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.operacao }}
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.objeto }}
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.antes }}
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.depois }}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="md:w-4/12 mb-1 xl:mb-0 px-2">
                  <div class="relative flex flex-col min-w-0 break-words bg-white mb-2 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Transações Ativas
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          TID
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Tempo
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="t in transacoes_ativas" :key="t.tid">
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tid">T{{ t.tid }}</span>
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tempo">{{ t.tempo }}</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="relative flex flex-col min-w-0 break-words bg-white mb-2 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Transações Consolidadas
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          TID
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Tempo
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="t in transacoes_consolidadas" :key="t.tid">
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tid">T{{ t.tid }}</span>
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tempo">{{ t.tempo }}</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="relative flex flex-col min-w-0 break-words bg-white mb-2 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Transações Abortadas
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          TID
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Status
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="t in transacoes_abortadas" :key="t.tid">
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tid">T{{ t.tid }}</span>
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="t.tempo">{{ t.tempo }}</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="md:w-6/12 mb-1 xl:mb-0 px-3">
              <div class="flex flex-wrap">
                <div class="md:w-6/12 mb-1">
                  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Cache
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Objeto
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Valor
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="c in cache" :key="c.tid">
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="c.ob">{{ c.ob }}</span>
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="c.valor">{{ c.valor }}</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="md:w-6/12 mb-1 px-4">
                  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Log do Disco
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="l in log_disco" :key="l.codigo">
                        <th class="border border-solid border-blueGray-300 border-t-0 text-left align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          <span v-show="l.texto">{{ l.texto }}</span>
                        </th>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:w-6/12 mb-1 xl:mb-0 pr-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700">
                        Banco de Dados
                      </h3>
                    </div>
                  </div>
                </div>
                <table class="table bg-transparent border-collapse">
                  <thead>
                  <tr>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Objeto
                    </th>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Valor
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="b in banco" :key="b.codigo">
                    <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {{ b.op }}
                    </th>
                    <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {{ b.valor }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <footer class="block py-40">
            <div class="container mx-auto px-4">
              <hr class="mb-4 border-b-1 border-blueGray-200"/>
              <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                  <div class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                    IN0940 (BD) / 2021-1
                    <a href="https://github.com/jhcb007/projeto-db-2"
                       class="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1">
                      GitHub
                    </a>
                  </div>
                </div>
                <div class="w-full md:w-8/12 px-4"></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {save_banco, t_checkep, t_commit, t_insert, t_log_disco, t_log_disco_imediata, t_start} from "../controller/controller";
import {createDB, getToken, objetos} from "../model/model";
import {tempo} from "../util";

export default {
  name: "app-banco",
  components: {},
  data() {
    return {
      tipo: "Adiada",
      list_objetos: [],
      operacao: {
        valor: 1,
        tipo: "write_item",
        objeto: {item: "A", transacao: 0, ativa: false},
        transacao: -1,
      },
      sel_transacao: [],
      logs: [],
      transacoes_ativas: [],
      transacoes_consolidadas: [],
      transacoes_abortadas: [],
      transacoes: [],
      cache: [],
      log_disco: [],
      banco: []
    };
  },
  created() {
    createDB();
    this.getDB();
    this.populaObjetos();
  },
  computed: {},
  watch: {},
  methods: {
    executar() {
      if (this.operacao.transacao < 1) {
        this.operacao.transacao = this.novaTransacao();
      }
      this.saveLog();
      this.atualizaTransacoes();
      this.objetoTransacao();
    },
    finalizar() {
      this.transacoes_ativas = this.removeTransacaoAtivas(this.operacao.transacao);
      this.atualizaTransacoes();
      this.setTransacaoConsolidadas(this.operacao);
      this.operacao.transacao = -1;
    },
    commit() {
      let t_op = [];
      let trans = parseInt(this.operacao.transacao);
      this.logs.forEach(function (v) {
        if (v.operacao === 'write_item' && v.tid === trans) {
          t_op.push(v)
        }
      });
      if (t_op.length < 1) {
        return
      }
      const op = t_log_disco(t_op[t_op.length - 1]);
      this.log_disco.push(op)
      this.log_disco.push(t_commit(this.operacao))
      this.finalizar();
      this.operacao.objeto = this.list_objetos.find(el => !el.ativa);
      const i = this.list_objetos.map(function (l) {
        return l.item;
      }).indexOf(op.objeto);
      this.list_objetos[i].transacao = 0;
      this.list_objetos[i].ativa = false;
    },
    estouro() {
      const commits = this.log_disco.filter(l => l.operacao === 'commit');
      this.saveDB();
      this.log_disco.push(t_checkep(commits));
    },
    saveLog() {
      const ja_ativa = this.transacoes_ativas.filter(t => t.tid === parseInt(this.operacao.transacao));
      if (ja_ativa.length < 1) {
        const start = t_start(this.operacao);
        this.logs.push(start);
        this.setTransacaoAtivas(start);
        //Adiada
        this.log_disco.push(start)
      }
      const old = this.retornaValorAnterior(this.operacao);
      const insert = t_insert(this.operacao, old);
      this.logs.push(insert);
      if (this.tipo == 'Imediata_redo'){
        // let t_op = [];
        // let trans = parseInt(this.operacao.transacao);
        // this.logs.forEach(function (v) {
        //   if (v.operacao === 'write_item' && v.tid === trans) {
        //     t_op.push(v)
        //   }
        // });
        // if (t_op.length < 1) {
        //   return
        // }
        // const op = t_log_disco(t_op[t_op.length - 1]);
        const insert_disco = t_log_disco_imediata(this.logs[this.logs.length - 1], old);
        this.log_disco.push(insert_disco)
      }
      this.setCache(insert);
    },
    saveCheckpoint() {
      const commits = this.log_disco.filter(l => l.operacao === 'commit');
      this.saveDB();
      this.log_disco.push(t_checkep(commits));
    },
    selTransacao() {
      const i = this.list_objetos.map(function (l) {
        return l.transacao;
      }).indexOf(parseInt(this.operacao.transacao));
      if (i < 0) {
        this.operacao.objeto = this.list_objetos.find(el => !el.ativa);
      } else {
        this.operacao.objeto = this.list_objetos[i];
      }
    },
    objetoTransacao() {
      const i = this.list_objetos.map(function (l) {
        return l.item;
      }).indexOf(this.operacao.objeto.item);
      this.list_objetos[i].transacao = this.operacao.transacao;
      this.list_objetos[i].ativa = true;
      this.operacao.objeto = this.list_objetos[i];
    },
    novaTransacao() {
      if (this.transacoes_ativas.length < 1 && this.transacoes_consolidadas < 1) {
        return 1;
      } else {
        return this.retornaMaiorTransacao() + 1;
      }
    },
    atualizaTransacoes() {
      let t = [];
      this.transacoes_ativas.forEach(function (v) {
        t.push(v.tid);
      });
      this.sel_transacao = t;
    },
    setCache(operacao) {
      const obj = {ob: operacao.objeto, valor: operacao.depois}
      const ja_existe = this.cache.map(function (c) {
        return c.ob;
      }).indexOf(operacao.objeto);
      if (ja_existe < 0) {
        this.cache.push(obj);
      } else {
        this.cache[ja_existe] = obj;
      }
    },
    setTransacaoAtivas(operacao) {
      const d = {tid: operacao.tid, tempo: operacao.tempo}
      this.transacoes_ativas.push(d);
    },
    removeTransacaoAtivas(transacao) {
      return this.transacoes_ativas.filter(function (el) {
        return el.tid !== transacao;
      });
    },
    setTransacaoConsolidadas(operacao) {
      const d = {tid: operacao.transacao, tempo: tempo()}
      this.transacoes_consolidadas.push(d);
    },
    retornaMaiorTransacao() {
      let maior = 1;
      //verificar as demais transacoes
      this.transacoes_ativas.forEach(function (v) {
        if (v.tid > maior) {
          maior = v.tid;
        }
      });
      this.transacoes_consolidadas.forEach(function (v) {
        if (v.tid > maior) {
          maior = v.tid;
        }
      });
      return maior;
    },
    retornaValorAnterior(p) {
      let old = "";
      //this.logs.forEach(function (v) {
        // if (v.operacao !== 'start_transaction' && v.tid === p.transacao && v.objeto === p.objeto) {
        //   old = v.valor;
        // }
      this.cache.forEach(function (v) {
        if (v.ob  === p.objeto.item) {
          old = v.valor;
        }
      });
      return old;
    },
    populaObjetos() {
      this.list_objetos = objetos();
    },
    getDB() {
      this.banco = JSON.parse(getToken());
    },
    saveDB() {
      const w = this.log_disco.filter(l => l.operacao === 'write_item');
      w.forEach(function (v) {
        save_banco(v);
      });
      this.getDB();
    },
    resetLogs() {
      this.logs = [];
    },
    resetTransacoes() {
      this.transacoes = [];
    },
    resetCache() {
      this.cache = [];
    },
  }
};
</script>