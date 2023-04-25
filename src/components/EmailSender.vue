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
              @click.stop.prevent="showDialogLists"
            />
          </template>
        </q-select>
      </div>
      <div class="col-4 row justify-center">
        <q-btn @click="send" color="primary" icon="send" label="Enviar" />
      </div>
      <div class="col-12">
        <ag-editor :message="email.message" class="q-ma-md"></ag-editor>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AgEditor from 'src/components/AgEditor.vue'
// import { api } from 'src/boot/axios';
const email = ref({
  sender: 'comercial@agilus.com.br',
  recipients: [],
  message: ''
})

const listRecipients = ref([])

onMounted(() => {
  listRecipients.value.push('henrique@agilus.com.br')
  listRecipients.value.push('henriquevc93@gmail.com')
})


const showDialogLists = ref(false)

const send = () => {
  listRecipients.value.forEach(recipient => {
    console.log('mensagem', email.value)
    // api.post('email/send', {
    //   api_key: 'api-8EE83DF07ECE11E8A036F23C91C88F4E',
    //   to: [recipient],
    //   sender: email.value.sender,
    //   subject: 'Cliente interessado no Agilus CRM - contato pelo site',
    //   html_body: email.value.message
    // }).then(response => {
    //   console.log('email enviado com sucesso!', response)
    // })
  })
}
</script>
