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
          style="max-height: 200px; overflow-y: auto;"
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
        <q-btn @click="send" color="primary" icon="send" label="Enviar" :loading="sendingEmails" :percentage="percentageSending">
        </q-btn>
      </div>
      <div class="col-12 row q-gutter-md">
        <div class="col-2">
          <q-btn color="primary" label="Carregar Template" outline no-caps size="12px" @click="openDialogTemplates"></q-btn>
        </div>
        <div class="col-11">
          <ag-editor v-model="email.message"></ag-editor>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="showDialogLists">
    <q-card style="min-width: 320px">
      <q-card-section class="row items-center">
        <div class="text-h6">Lista de destinatários</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row">
          <q-select label="selecione uma lista" outlined class="col-12" :options="listsOptions" v-model="emailsModal" hint="* exibindo somente os 10 primeiros e-mail de cada lista">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" style="max-width: 320px">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption lines="4">{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn @click="okModalLists" label="Salvar" color="secondary"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showDialogTemplates">
    <q-card style="min-width: 320px">
      <q-card-section class="row items-center">
        <div class="text-h6">Selecione um template:</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-list padding>
          <q-item v-for="template in listTemplates" :key="template.id" clickable @click="templateSelectedId = template.id">
            <q-item-section side>
              <q-radio v-model="templateSelectedId" :val="template.id"></q-radio>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ template.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="listTemplates.length === 0">
            <q-item-label class="text-center">Nenhum template encontrado</q-item-label>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn @click="okModalTemplates" label="Carregar" color="secondary"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import AgEditor from './AgEditor.vue';
import useApi from 'src/composables/UseApi';
import { useQuasar } from 'quasar'

const $q = useQuasar()

interface ListOptions {
  label: string;
  value?: number;
  description: string;
}

interface Email {
  email: string
}

interface ListWithEMails {
  id: number
  name: string
  emails: Email[]
}

interface ListTemplates {
  id: number
  name: string
  body: string
}

const email = ref({
  sender: 'comercial@agilus.com.br',
  recipients: [] as string[],
  subject: '',
  message: ''
})

const listRecipients = ref<string[]>([])
const emailsModal = ref<ListOptions>({label: '', description:''})
const listsOptions = ref<ListOptions[]>([])
const listsWithEmails = ref<ListWithEMails[]>([])
const listTemplates = ref<ListTemplates[]>([])

const { getListsWithEmails, list } = useApi()

onMounted(async () => {
  listsWithEmails.value = (await getListsWithEmails()).map(e => ({id: e.id as number, name: e.name as string, emails: e.emails as Email[]}))
  listsOptions.value = listsWithEmails.value.map(e => ({
    label: e.name,
    value: e.id,
    description: e.emails.map(em => em.email).slice(0, 10).join(', ')}))

  listTemplates.value = (await list('templates')) as ListTemplates[]
})

const showDialogLists = ref(false)
const openDialogLists = () => {
  showDialogLists.value = true
}

const showDialogTemplates = ref(false)
const openDialogTemplates = () => {
  templateSelectedId.value = 0
  showDialogTemplates.value = true
}

const okModalLists = () => {
  let listSelected = listsWithEmails.value.find(ls => ls.id === emailsModal.value.value)
  listSelected?.emails.forEach(em => {
    email.value.recipients.push(em.email)
  })
  showDialogLists.value = false
}

const templateSelectedId = ref(0)
const okModalTemplates = () => {
  email.value.message = ''
  let templateSelected = listTemplates.value.find(ls => ls.id === templateSelectedId.value)
  email.value.message = templateSelected?.body || ''
  showDialogTemplates.value = false
}

const sendingEmails = ref(false)
const percentageSending = ref(0.0)

const send = async () => {
  try {
    if (!email.value.recipients.length) {
      $q.notify({
        type: 'negative',
        message: 'Nenhum destinatário para enviar email.'
      })
      return
    }
    sendingEmails.value = true
    let count = 0.0
    for (const recipient of email.value.recipients) {
      await api.post('email/send', {
        api_key: process.env.APIKEY_SMTP,
        to: [recipient],
        sender: email.value.sender,
        subject: email.value.subject,
        html_body: email.value.message
      })
      count += 1
      percentageSending.value = (count / email.value.recipients.length) * 100
    }
    if (count === email.value.recipients.length) {
      sendingEmails.value = false
      $q.notify({
        type: 'positive',
        message: 'Emails enviado com sucesso.'
      })
    }
  } catch (e) {
    console.error(e)
    sendingEmails.value = false
  }
}
</script>
