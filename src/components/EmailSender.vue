<template>
  <div class="full-width">
    <h4>Enviar e-mails</h4>
    <div class="row q-col-gutter-md items-center">
      <div class="row col-8 q-col-gutter-md">
        <q-input outlined v-model="Email.Remetente" class="col-12" label="Remetente"></q-input>
        <q-select
          outlined
          v-model="Email.Destinatarios"
          :options="listaDestinatarios"
          multiple
          use-chips
          use-input
          stack-label
          class="col-12"
          label="Destinatários"
          @new-value="criarDestinatario"
        />
      </div>
      <div class="col-4">
        <q-btn @click="enviar" color="primary" icon="send">Enviar</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Email } from '../models/Email';

const Email = ref({
  Remetente: 'comercial@agilus.com.br',
  Destinatarios: [{Endereco: 'henrique@agilus.com.br', label: 'henrique@agilus.com.br', value: 1}]
})

const listaDestinatarios = ref([])

onMounted(() => {
  listaDestinatarios.value.push({label: 'claudio@agilus.com.br', value: 2})
  listaDestinatarios.value.push({label: 'allan@agilus.com.br', value: 3})
  listaDestinatarios.value.push({label: 'clayton@agilus.com.br', value: 4})
  listaDestinatarios.value.push({label: 'felippe@agilus.com.br', value: 5})
  listaDestinatarios.value.push({label: 'renan@agilus.com.br', value: 6})
})

const criarDestinatario = (val) => {
    let newId = listaDestinatarios.value[listaDestinatarios.value.length]
    listaDestinatarios.value.push({label: val, value: newId})
}

const enviar = () => {
  console.log('clicou em enviou')
}

</script>
