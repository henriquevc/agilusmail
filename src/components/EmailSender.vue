<template>
  <div class="full-width">
    <h4>Enviar e-mails</h4>
    <div class="row q-col-gutter-md items-center">
      <div class="row col-8 q-col-gutter-md">
        <q-input outlined v-model="Email.Remetente" class="col-12" label="Remetente"></q-input>
        <q-input outlined v-model="Email.Destinatarios[0].Endereco" class="col-12" label="Destinatários"></q-input>
      </div>
      <div class="col-4">
        <q-btn @click="enviar" color="primary" icon="send">Enviar</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Email } from '../models/Email';

const Email = ref({
  Remetente: 'comercial@agilus.com.br',
  Destinatarios: [{Endereco: 'henrique@agilus.com.br'}]
})

const enviar = () => {
  console.log('clicou em enviou')
}

</script>
