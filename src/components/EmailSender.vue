<template>
  <div class="full-width">
    <h4>Enviar e-mails</h4>
    <div class="row q-col-gutter-md items-center justify-end">
      <div class="row col-8 q-col-gutter-md">
        <q-input outlined v-model="email.sender" class="col-12" label="Remetente"></q-input>
        <q-select
          outlined
          v-model="email.recipients"
          :options="listRecipients"
          multiple
          new-value-mode="toggle"
          use-chips
          use-input
          hide-dropdown-icon
          stack-label
          input-debounce="0"
          class="col-12"
          label="Destinatários"
        >
          <template v-slot:append>
            <q-btn
              flat
              round
              class="cursor-pointer"
              name="clear"
              icon="playlist_add"
              @click.stop.prevent="openDialogLists"
            />
          </template>
        </q-select>
        <q-input v-model="email.subject" label="Assunto" outlined class="col-12"/>
      </div>
      <div class="col-4 row justify-center">
        <q-btn @click="send" color="primary" icon="send" label="Enviar" />
      </div>
      <div class="col-12">
        <ag-editor v-model="email.message" class="q-ma-md"></ag-editor>
      </div>
    </div>
  </div>
  <q-dialog v-model="showDialogLists">dialog quasar v2</q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AgEditor from 'src/components/AgEditor.vue'
import { api } from 'src/boot/axios';

const email = ref({
  sender: 'comercial@agilus.com.br',
  recipients: [],
  subject: '',
  message: ''
})

const listRecipients = ref([])

onMounted(() => {
  listRecipients.value.push('henrique@agilus.com.br')
  listRecipients.value.push('henriquevc93@gmail.com')
})

const showDialogLists = ref(false)

const openDialogLists = () => {
  showDialogLists.value = true
}

const send = () => {
  listRecipients.value.forEach(recipient => {
    api.post('email/send', {
      api_key: process.env.APIKEY_SMTP,
      to: [recipient],
      sender: email.value.sender,
      subject: email.value.subject,
      html_body: email.value.message
    }).then(response => {
      console.log('email enviado com sucesso!', response)
    })
  })
}
</script>
