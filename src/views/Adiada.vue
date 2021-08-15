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
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700 mb-1">Segundos</h3>
                      <div class="relative flex w-full flex-wrap items-stretch">
                        <input type="number" min="1" v-model="segundos"
                               class="placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="block w-full mb-2">
                  <div class="px-3 mb-2">
                    <div class="flex flex-wrap">
                      <h3 class="font-semibold text-base text-blueGray-700 mb-1">Tipo</h3>
                      <select v-model="tipo"
                              @change="selTipo()"
                              class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                        <option value="adiada">Adiada</option>
                        <option value="imediata_undo_no_redo">Imediata UNDO/NO-REDO</option>
                        <option disabled value="imediata_undo_redo">Imediata UNDO/REDO</option>
                      </select>
                    </div>
                  </div>
                  <div class="px-3">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <h3 class="font-semibold text-base text-blueGray-700 mb-1">Operação</h3>
                        <select v-model="operacao.tipo"
                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option value="read_item">Read</option>
                          <option v-bind:disabled="temLeitura" value="write_item">Write</option>
                        </select>
                      </div>
                      <div class="md:w-6/12 pl-4">
                        <h3 class="font-semibold text-base text-blueGray-700 mb-1">Transação</h3>
                        <select v-model="operacao.transacao"
                                @change="selTransacao()"
                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option value="">Nova</option>
                          <option v-for="t in sel_transacao" :key="t" v-bind:value="t">
                            T{{ t.tid }}
                          </option>
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
                      </span>
                          <input type="number" min="1" v-model="operacao.valor"
                                 class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 mt-3">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12 ">
                        <button
                            v-show="(sel_transacao && sel_transacao.length > 0) && operacao.transacao"
                            @click="finalizar()"
                            v-bind:disabled="!operacao.transacao.ativa || bloqueio.finalizar"
                            class="bg-indigo-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Finalizar
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
                        <button
                            @click="executar()"
                            v-bind:disabled="bloqueio.executar"
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
                      <div class="md:w-6/12">
                        <button
                            @click="commit()"
                            v-bind:disabled="bloqueio.commit"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Commit
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
                        <button
                            @click="saveCheckpoint()"
                            v-bind:disabled="bloqueio.checkpoint"
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
                      <div class="md:w-6/12">
                        <button
                            v-bind:disabled="bloqueio.abort"
                            @click="abortaTransacao()"
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Abort
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
                        <button
                            @click="falha()"
                            v-bind:disabled="bloqueio.falha"
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Falha
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
                          Valor
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
                      <transition-group :duration="500" enter-active-class="show_td" leave-active-class="end_td"
                                        tag="tbody">
                        <tr v-for="t in transacoes_ativas" :key="t.tid+'ta'">
                          <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tid">T{{ t.tid }}</span>
                          </th>
                          <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tempo">{{ t.tempo }}</span>
                          </td>
                        </tr>
                      </transition-group>
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
                      <transition-group :duration="500" enter-active-class="show_td" leave-active-class="end_td"
                                        tag="tbody">
                        <tr v-for="t in transacoes_consolidadas" :key="t.tid+'tc'">
                          <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tid">T{{ t.tid }}</span>
                          </th>
                          <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tempo">{{ t.tempo }}</span>
                          </td>
                        </tr>
                      </transition-group>
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
                      <transition-group :duration="500" enter-active-class="show_td" leave-active-class="end_td"
                                        tag="tbody">
                        <tr v-for="t in transacoes_abortadas" :key="t.tid+'to'">
                          <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tid">T{{ t.tid }}</span>
                          </th>
                          <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="t.tempo">{{ t.tempo }}</span>
                          </td>
                        </tr>
                      </transition-group>
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
                      <transition-group :duration="500" enter-active-class="show_td" leave-active-class="end_td"
                                        tag="tbody">
                        <tr v-for="c in cache" :key="c.tid+'c'">
                          <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="c.objeto">{{ c.objeto }}</span>
                          </th>
                          <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="c.valor">{{ c.valor }}</span>
                          </td>
                        </tr>
                      </transition-group>
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
                      <transition-group :duration="500" enter-active-class="show_td" tag="tbody">
                        <tr v-for="l in log_disco" :key="l.codigo+'d'">
                          <th class="border border-solid border-blueGray-300 border-t-0 text-left align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                            <span v-show="l.texto">{{ l.texto }}</span>
                          </th>
                        </tr>
                      </transition-group>
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
                  <transition-group :duration="500" enter-active-class="show_td" leave-active-class="end_td"
                                    tag="tbody">
                    <tr v-for="b in banco" :key="b.codigo+'db'">
                      <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                        {{ b.op }}
                      </th>
                      <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                        {{ b.valor }}
                      </td>
                    </tr>
                  </transition-group>
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
import {
  save_banco,
  t_abort,
  t_checkep,
  t_commit,
  t_end,
  t_insert,
  t_log_disco,
  t_start
} from "../controller/controller";
import {createDB, getToken, objetos} from "../model/model";
import {tempo} from "../util";

export default {
  name: "app-banco",
  components: {},
  data() {
    return {
      segundos: 1,
      tipo: "adiada",
      list_objetos: [],
      operacao: {
        valor: "",
        tipo: "read_item",
        objeto: {item: "A", transacao: 0, ativa: false, valor: null},
        transacao: "",
      },
      bloqueio: {
        executar: false,
        finalizar: false,
        commit: false,
        checkpoint: false,
        abort: false,
        falha: false
      },
      ultima_transacao: {
        valor: 0
      },
      sel_transacao: [],
      logs: [],
      transacoes_ativas: [],
      transacoes_consolidadas: [],
      transacoes_abortadas: [],
      transacoes: [],
      cache: [],
      log_disco: [],
      banco: [],
      checkpoint_realizados: [],
      transacoes_refeitas: [],
      timeouts: []
    };
  },
  created() {
    createDB();
    this.getDB();
    this.populaObjetos();
  },
  computed: {
    temLeitura: {
      get: function () {
        const leitura = this.logs.filter(l => l.operacao === 'read_item' && l.tid === parseInt(this.operacao.objeto.transacao));
        return leitura.length < 1;
      },
    },
  },
  watch: {},
  methods: {
    selTipo() {
      this.$router.push({name: this.tipo})
    },
    read() {
      this.bloqueio.finalizar = true;
      this.bloqueio.executar = true;

      this.startTransacao();
      this.atualizaTransacoes();
      this.objetoTransacao();
      this.selTransacao();

      const tem_log_memoria = this.logs.filter(l => l.operacao === 'write_item'
          && l.tid === parseInt(this.operacao.objeto.transacao)
          && l.objeto === this.operacao.objeto.item);
      if (tem_log_memoria.length > 0) {
        const memoria = tem_log_memoria[tem_log_memoria.length - 1];
        const new_valor = this.operacao;
        new_valor.valor = memoria.valor;
        const insert = t_insert(new_valor);
        this.logs.push(insert);
        this.bloqueio.finalizar = false;
        this.bloqueio.executar = false;
      } else {
        const tem_chache = this.cache.map(function (c) {
          return c.objeto;
        }).indexOf(this.operacao.objeto.item);
        if (tem_chache < 0) {
          const start = t_start(this.operacao);
          this.timeouts.push(setTimeout(() => {
            this.log_disco.push(start);
          }, (1000 * parseInt(this.segundos))));

          const tem_banco = this.banco.map(function (b) {
            return b.op;
          }).indexOf(this.operacao.objeto.item);

          if (tem_banco < 0) {
            alert("Objeto não cadastrado no banco de dados")
            this.abortaTransacao();
          } else {
            const dado = this.banco[tem_banco];
            const obj = {
              tid: this.operacao.objeto.transacao,
              tipo: "read_item",
              antes: "",
              objeto: dado.op,
              valor: dado.valor,
            }
            const op = t_log_disco(obj);
            this.timeouts.push(setTimeout(() => {
              this.log_disco.push(op);
            }, (2000 * parseInt(this.segundos))));

            this.timeouts.push(setTimeout(() => {
              this.setCache(op);
            }, (4000 * parseInt(this.segundos))));

            const old = this.retornaValorAnterior(this.operacao);

            const new_valor = this.operacao;

            this.timeouts.push(setTimeout(() => {
              new_valor.valor = op.valor;
              const insert = t_insert(new_valor, old);
              this.logs.push(insert);
              this.bloqueio.finalizar = false;
              this.bloqueio.executar = false;
            }, (4000 * parseInt(this.segundos))));

          }

        } else {
          const cache = this.cache[tem_chache];
          const new_valor = this.operacao;
          new_valor.valor = cache.valor;
          const insert = t_insert(new_valor);
          this.logs.push(insert);
          this.bloqueio.finalizar = false;
          this.bloqueio.executar = false;
        }
      }

    },
    write() {
      this.startTransacao();
      const old = this.retornaValorAnterior(this.operacao);
      const insert = t_insert(this.operacao, old);
      this.logs.push(insert);
      this.atualizaTransacoes();
      this.objetoTransacao();
      this.selTransacao();
    },
    executar() {
      if (this.operacao.transacao === '') {
        if (this.ultima_transacao.valor > 0) {
          this.operacao.transacao = this.geraTransacao();
        } else {
          this.operacao.transacao = this.initTransacao();
        }
      }
      if (this.operacao.transacao.ativa === false) {
        return;
      }
      if (this.operacao.tipo === 'write_item') {
        this.write();
      } else {
        this.read();
      }
    },
    finalizar() {
      if (this.operacao.transacao.ativa === false) {
        return;
      }
      const ultima = this.logs[this.logs.length - 1];
      if (ultima) {
        if (ultima.operacao === 'end_transaction' && ultima.tid === this.operacao.transacao.tid) {
          return
        }
      }

      const end = t_end(this.operacao);
      this.logs.push(end);

      if (this.operacao.tipo === 'write_item') {
        const t_op = this.listTransacoesCommit();
        const op = t_log_disco(t_op[t_op.length - 1]);
        this.timeouts.push(setTimeout(() => {
          this.setCache(op);
        }, (1000 * parseInt(this.segundos))));
      }

      this.descartaTransacao(end.tid);
      this.selTransacao();

      if (this.operacao.tipo === 'read_item') {
        this.removeTransacao(end.tid);
        const i = this.list_objetos.map(function (l) {
          return l.item;
        }).indexOf(this.operacao.objeto.item);
        this.list_objetos[i].transacao = 0;
        this.list_objetos[i].ativa = false;
        this.consolidaTransacao();
      }

    },
    commit() {
      if (this.bloqueio.commit) {
        return;
      }
      if (this.verificaTransacaoFinalizada()) {
        return;
      }
      const t_op = this.listTransacoesCommit();
      if (t_op.length < 1) {
        return
      }
      this.bloqueio.commit = true;
      this.bloqueio.checkpoint = true;

      const op = t_log_disco(t_op[t_op.length - 1]);

      const ja_ativa = this.startTransacao();

      if (ja_ativa.length < 1) {
        const start = t_start(this.operacao);
        this.timeouts.push(setTimeout(() => {
          this.log_disco.push(start)
        }, (1000 * parseInt(this.segundos))));
        this.timeouts.push(setTimeout(() => {
          this.log_disco.push(op)
        }, (2000 * parseInt(this.segundos))));
      } else {
        this.timeouts.push(setTimeout(() => {
          this.log_disco.push(op)
        }, (1000 * parseInt(this.segundos))));
      }

      this.timeouts.push(setTimeout(() => {
        this.log_disco.push(t_end(this.operacao))
      }, (2000 * parseInt(this.segundos))));

      const commit = t_commit(this.operacao);
      this.timeouts.push(setTimeout(() => {
        this.log_disco.push(commit)
        this.removeTransacao(commit.tid);
        this.operacao.objeto = this.list_objetos.find(el => !el.ativa);
        const i = this.list_objetos.map(function (l) {
          return l.item;
        }).indexOf(op.objeto);
        this.list_objetos[i].transacao = 0;
        this.list_objetos[i].ativa = false;
      }, (4000 * parseInt(this.segundos))));

      this.timeouts.push(setTimeout(() => {
        this.consolidaTransacao();
        this.bloqueio.commit = false;
        this.bloqueio.checkpoint = false;
      }, (5000 * parseInt(this.segundos))));

      this.operacao.tipo = 'read_item';

    },
    saveCheckpoint() {
      let commits = this.log_disco.filter(l => l.operacao === 'commit');
      if (commits.length < 1) {
        return
      }
      const checkpoints = this.log_disco.filter(l => l.operacao === 'checkpoint');
      checkpoints.forEach(function (c) {
        c.objeto.forEach(function (t) {
          const i = commits.map(function (l) {
            return l.valor;
          }).indexOf(t);
          commits.splice(i, 1);
        })
      });
      if (commits.length < 1) {
        return
      }
      this.timeouts.push(setTimeout(() => {
        this.saveDB(commits);
      }, (1000 * parseInt(this.segundos))));
      this.timeouts.push(setTimeout(() => {
        this.log_disco.push(t_checkep(commits));
      }, (2000 * parseInt(this.segundos))));
      this.timeouts.push(setTimeout(() => {
        this.transacoes_consolidadas = [];
        this.transacoes_abortadas = [];
      }, (3000 * parseInt(this.segundos))));

    },
    abortaTransacao(insert_log = true) {

      if (this.transacoes_ativas.length < 1) {
        return
      }

      for (let i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i]);
      }

      this.transacoes_ativas = this.removeTransacaoAtivas(this.operacao.transacao.tid);
      this.setTransacaoAbort(this.operacao);
      this.descartaTransacao(this.operacao.transacao.tid);
      const i = this.list_objetos.map(function (l) {
        return l.item;
      }).indexOf(this.operacao.objeto.item);
      this.list_objetos[i].transacao = 0;
      this.list_objetos[i].ativa = false;

      if (insert_log) {
        this.logs.push(t_abort(this.operacao));
      }

      this.removeTransacao(this.operacao.transacao.tid);
      this.selTransacao();
      this.operacao.transacao = "";
      this.bloqueio.finalizar = false;
      this.bloqueio.executar = false;
    },
    falha() {

      for (let i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i]);
      }

      this.resetLogsMemoria();
      this.resetCache();

      if (this.log_disco.length < 1) {
        return;
      }

      const verifica_checkpoints = this.log_disco[this.log_disco.length - 1];

      if (verifica_checkpoints.operacao === "checkpoint") {
        return
      }

      const commits = this.log_disco.filter(l => l.operacao === 'commit');
      const writes = this.log_disco.filter(l => l.operacao === 'write_item' || l.operacao === 'checkpoint');
      let operacoes = [];

      commits.forEach(function (c) {
        writes.forEach(function (w) {
          if (c.tid === w.tid || w.operacao === 'checkpoint') {
            operacoes.push(w);
          }
        });
      });
      operacoes.reverse()
      let objetos = [];
      let cache = [];
      operacoes.forEach(function (o) {
        if (o.operacao === 'checkpoint') {
          return
        }
        let i = objetos.findIndex(l => l === o.objeto);
        if (i < 0) {
          save_banco(o);
          cache.push(o);
          objetos.push(o.objeto)
        }
      });

      this.cache = cache;
      this.getDB();
      this.abortaTransacao(false);
    },
    startTransacao() {
      const ja_ativa = this.transacoes_ativas.filter(t => t.tid === parseInt(this.operacao.transacao.tid));
      if (ja_ativa.length < 1) {
        const start = t_start(this.operacao);
        this.logs.push(start);
        this.setTransacaoAtivas(start);
      }
      return ja_ativa;
    },
    selTransacao() {
      const i = this.list_objetos.map(function (l) {
        return l.transacao;
      }).indexOf(parseInt(this.operacao.transacao.tid));
      if (i < 0) {
        this.operacao.objeto = this.list_objetos.find(el => !el.ativa);
        this.operacao.tipo = 'read_item';
      } else {
        this.operacao.objeto = this.list_objetos[i];
      }
    },
    objetoTransacao() {
      const i = this.list_objetos.map(function (l) {
        return l.item;
      }).indexOf(this.operacao.objeto.item);
      this.list_objetos[i].transacao = this.operacao.transacao.tid;
      this.list_objetos[i].ativa = true;
      this.operacao.objeto = this.list_objetos[i];
    },
    atualizaTransacoes() {
      if (this.sel_transacao.length < 1) {
        let t = null;
        if (this.ultima_transacao.valor > 0) {
          t = {tid: this.ultima_transacao.valor, ativa: true, abort: false};
        } else {
          t = this.initTransacao();
        }
        this.sel_transacao.push(t);
        if (t.tid === 1) {
          this.ultima_transacao.valor = 1;
        }
      } else {
        const ja_existe = this.sel_transacao.map(function (c) {
          return c.tid;
        }).indexOf(this.operacao.transacao.tid);
        if (ja_existe < 0) {
          this.sel_transacao.push(this.operacao.transacao)
        }
      }
    },
    setCache(operacao) {
      const obj = {objeto: operacao.objeto, valor: operacao.depois}
      const ja_existe = this.cache.map(function (c) {
        return c.objeto;
      }).indexOf(operacao.objeto);
      if (ja_existe < 0) {
        this.cache.push(obj);
      } else {
        this.cache[ja_existe] = obj;
      }
    },
    listTransacoesCommit() {
      let t_op = [];
      let trans = parseInt(this.operacao.transacao.tid);
      this.logs.forEach(function (v) {
        if (v.operacao === 'write_item' && v.tid === trans) {
          t_op.push(v)
        }
      });
      return t_op;
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
      const d = {tid: operacao.transacao.tid, tempo: tempo()}
      this.transacoes_consolidadas.push(d);
    },
    setTransacaoAbort(operacao) {
      const d = {tid: operacao.transacao.tid, tempo: tempo()}
      this.transacoes_abortadas.push(d);
    },
    retornaValorAnterior(p) {
      let old = "";
      this.logs.forEach(function (v) {
        if (v.operacao !== 'start_transaction' && v.tid === p.transacao && v.objeto === p.objeto) {
          old = v.valor;
        }
      });
      return old;
    },
    consolidaTransacao() {
      this.transacoes_ativas = this.removeTransacaoAtivas(this.operacao.transacao.tid);
      this.setTransacaoConsolidadas(this.operacao);
      this.operacao.transacao = "";
    },
    descartaTransacao(tid) {
      const transacao = this.sel_transacao.map(function (t) {
        return t.tid;
      }).indexOf(parseInt(tid));
      this.sel_transacao[transacao].ativa = false;
      this.operacao.transacao = this.sel_transacao[transacao];
    },
    removeTransacao(tid) {
      const transacao = this.sel_transacao.map(function (t) {
        return t.tid;
      }).indexOf(parseInt(tid));
      this.sel_transacao.splice(transacao, 1)
    },
    verificaTransacaoFinalizada() {
      let end = [];
      let trans = parseInt(this.operacao.transacao.tid);
      this.logs.forEach(function (v) {
        if (v.operacao === 'end_transaction' && v.tid === trans) {
          end.push(v)
        }
      });
      return (end.length < 1);
    },
    resetLogsMemoria() {
      this.logs = [];
    },
    resetTransacoes() {
      this.transacoes = [];
    },
    resetCache() {
      this.cache = [];
    },
    initTransacao() {
      return {tid: 1, ativa: true, abort: false};
    },
    geraTransacao() {
      this.ultima_transacao.valor = this.ultima_transacao.valor + 1;
      return {tid: this.ultima_transacao.valor, ativa: true, abort: false};
    },
    populaObjetos() {
      this.list_objetos = objetos();
    },
    getDB() {
      this.banco = JSON.parse(getToken());
    },
    saveDB(commits) {
      const log_disco = this.log_disco;
      commits.forEach(function (c) {
        const w = log_disco.filter(l => l.operacao === 'write_item' && l.tid === c.tid);
        w.forEach(function (v) {
          save_banco(v);
        });
      });
      this.getDB();
    },
  }
};


</script>
<style>
.show_td {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.end_td {
  background-color: #b91c1c;
  color: white;
  font-weight: bold;
}

.end_td_text {
  background-color: white;
  color: white;
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

input:disabled,
input[disabled] {
  background-color: #cccccc;
}
</style>