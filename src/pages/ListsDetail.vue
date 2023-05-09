<template>
    <q-page padding>
        <div class="row justify-center q-gutter-lg q-mt-md q-mb-xl">
            <q-btn label="cancelar" flat color="negative" @click="cancel"></q-btn>
            <q-btn label="salvar" color="positive" @click="save"></q-btn>
        </div>
        <div class="row q-col-gutter-md">
            <q-input v-model="list.name" label="Nome da lista" outlined class="col-12" />
            <q-input v-model="emailsArray" label="Emails" type="textarea" rows="10" outlined class="col-12" hint="coloque os emails separados por virgula ou enter" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from 'vue-router'
const list = ref({
    name: '',
    emails: [] as string[]
})
const emailsArray = ref('')

const router = useRouter()

const cancel = () => {
    router.back()
}

const save = () => {
  //separar os emails por ; e enter
  list.value.emails = emailsArray.value
    .split('\n')
    .map(item => item.split(';'))
    .reduce((acc, cur) => cur.concat(acc), []).filter(e => !!e)
}
</script>
