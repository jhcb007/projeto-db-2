<template>
  <div>
    <div class="relative bg-blueGray-100">
      <admin-navbar/>
      <header-stats/>
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
                <div class="block w-full">
                  <div class="relative flex flex-col break-words bg-white rounded">
                    <div class="flex-auto px-4 mb-3">
                      <div class="flex flex-wrap">
                        <div class="relative w-full pr-4 max-w-full flex-grow flex-1"><h5
                            class="text-blueGray-400 uppercase font-bold text-xs">Saldo</h5><span
                            class="font-semibold text-3xl text-blueGray-700">R$ 30,00</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="px-3">
                    <h3 class="font-semibold text-base text-blueGray-700 mb-1">Valor</h3>
                    <div class="relative flex w-full flex-wrap items-stretch mb-3">
  <span
      class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
    <i class="fas fa-money-bill"></i>
  </span><input type="text"
                v-model="operacao.valor"
                placeholder="R$ 0,00"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
                    </div>
                  </div>
                  <div class="px-3">
                    <h3 class="font-semibold text-base text-blueGray-700 mb-1">Operação</h3>
                    <select
                        v-model="operacao.tipo"
                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                      <option value="Depósito">Depósito</option>
                      <option value="Saque">Saque</option>
                    </select>
                  </div>
                  <div class="px-3 py-2">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <h3 v-show="sel_transacao && sel_transacao.length > 0"
                            class="font-semibold text-base text-blueGray-700 mb-1">Transação</h3>
                        <select
                            v-show="sel_transacao && sel_transacao.length > 0"
                            v-model="operacao.transacao"
                            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-800 relative bg-white bg-white rounded border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
                          <option value="-1">Nova Transação</option>
                          <option v-for="t in sel_transacao" :key="t" v-bind:value="t">T{{ t }}</option>
                        </select>
                      </div>
                      <div class="md:w-6/12 text-right mt-2">
                        <button
                            @click="salvaOperacao()"
                            class="bg-lightBlue-500 mt-5 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 py-2">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <button
                            @click="commit()"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Commit
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
                        <button
                            @click="saveCheckpoint()"
                            class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Checkpoint
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 py-1">
                    <div class="flex flex-wrap">
                      <div class="md:w-6/12">
                        <button
                            class="bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                          Abort
                        </button>
                      </div>
                      <div class="md:w-6/12 text-right">
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
                            Logs
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
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          pAnt
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          pProx
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
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.pAnt }}
                        </td>
                        <td class=" border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          {{ l.pProx }}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="md:w-4/12 mb-1 xl:mb-0 px-2">
                  <div class="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                            Transações
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
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          START
                        </td>
                      </tr>
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          UPDATE
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
                          Partição
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Dirty Bit
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Valor Item
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          START
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          30
                        </td>
                      </tr>
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          UPDATE
                        </td>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          20
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
                            Diretório da Cache
                          </h3>
                        </div>
                      </div>
                    </div>
                    <table class="table bg-transparent border-collapse">
                      <thead>
                      <tr>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Nome Item
                        </th>
                        <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                          Partição
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          START
                        </td>
                      </tr>
                      <tr>
                        <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          T1
                        </th>
                        <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                          UPDATE
                        </td>
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
                        Disco
                      </h3>
                    </div>
                  </div>
                </div>
                <table class="table bg-transparent border-collapse">
                  <thead>
                  <tr>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Código
                    </th>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Operação
                    </th>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Valor
                    </th>
                    <th class="bg-blueGray-200 border border-solid border-blueGray-200 border-l-0 border-r-0 text-xs">
                      Tempo
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="b in banco" :key="b.codigo">
                    <th class="border border-solid border-blueGray-300 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      1
                    </th>
                    <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {{ b.op }}
                    </td>
                    <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {{ b.valor }}
                    </td>
                    <td class="border border-solid border-blueGray-300 border-t-0 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {{ b.tempo }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <footer-admin/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//Documentação
//https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import {save_banco, t_checkep, t_commit, t_insert, t_start} from "../controller/controller";
import {createDB, getToken} from "../model/model";
import FooterAdmin from "../components/Footers/FooterAdmin";

export default {
  name: "app-banco",
  components: {
    FooterAdmin,
    AdminNavbar,
    HeaderStats
  },
  data() {
    return {
      tipo: 1,
      saldo: 0.00,
      operacao: {
        valor: 0.00,
        tipo: "Depósito",
        transacao: -1,
      },
      sel_transacao: [],
      logs: [],
      transacoes: [],
      cache: [],
      banco: []
    };
  },
  created() {
    createDB();
    this.getDB();
  },
  computed: {},
  watch: {
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
    },
  },
  methods: {
    salvaOperacao() {
      if (this.operacao.transacao < 1) {
        this.operacao.transacao = this.novaTransacao();
      }
      if (this.tipo === 1) {
        this.saveLog();
      }
    },
    novaTransacao() {
      if (this.sel_transacao.length < 1) {
        return 1;
      }
      const ut = this.sel_transacao[this.sel_transacao.length - 1]
      return ut + 1;
    },
    removeTransacao(transacao) {
      return this.sel_transacao.filter(function (el) {
        return el !== transacao;
      });
    },
    commit() {
      let t_op = [];
      let trans = parseInt(this.operacao.transacao);
      this.logs.forEach(function (v) {
        if (v.operacao === 'INSERT' && v.tid === trans) {
          t_op.push(v)
        }
      });
      if (t_op.length < 1) {
        return
      }
      this.logs.push(t_commit(this.operacao));
      this.sel_transacao = this.removeTransacao(this.operacao.transacao);
    },
    saveLog() {
      this.logs.push(t_start(this.operacao));
      this.logs.push(t_insert(this.operacao));
    },
    saveCheckpoint() {
      const trans = this.sel_transacao;
      if (trans.length < 1) {
        return
      }
      this.logs.push(t_checkep(this.sel_transacao));
    },
    getDB() {
      this.banco = JSON.parse(getToken());
    },
    saveDB(t_op) {
      save_banco(this.operacao.transacao, t_op);
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