<template>
    <q-page padding>
        <div class="row justify-center q-gutter-lg q-mt-md q-mb-xl">
            <q-btn label="cancelar" flat color="negative" @click="cancel"></q-btn>
            <q-btn label="salvar" color="positive" @click="save"></q-btn>
        </div>
        <div class="row q-col-gutter-md">
            <q-input v-model="list.name" label="Nome da lista" outlined class="col-12" :rules="[val => (val && val.length > 0) || 'Campo obrigatório']" />
            <q-input v-model="emailsArray" label="Emails" type="textarea" rows="10" outlined class="col-12" hint="coloque os emails separados por ponto e virgula (;) ou enter" :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"  />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import useApi from 'src/composables/UseApi'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { post, getById, listDependency } = useApi()
const router = useRouter()
const route = useRoute()

const list = ref({
    name: '',
    emails: [] as string[]
})
const emailsArray = ref('')
const isUpdate = computed(() => route.params.id)

onMounted(() => {
    if (isUpdate.value) {
        handleGetList(Number(route.params.id))
    }
})

const handleGetList = async (id: number) => {
    try {
        let listHandled = await getById('lists', id)
        list.value.name = listHandled.name
        let emailsList = await listDependency('emails', 'list_id', id)
        list.value.emails = emailsList.map(e => e.email)
        emailsList.forEach(item => {
            emailsArray.value += item.email + ';\n'
        })
    } catch (error) {
        console.error(error)
    }
}


const save = async () => {
  //separar os emails por ; e enter
    list.value.emails = emailsArray.value
        .split('\n')
        .map(item => item.split(';'))
        .reduce((acc, cur) => cur.concat(acc), [])
        .filter(e => !!e)

    if (!list.value.name || !list.value.emails) return

    //salvar no banco de dados
    try {
        if (isUpdate.value) {
            return
        }
        else {
            const data = await post('lists', {name: list.value.name})
            if (list.value.emails.length) {
                list.value.emails.forEach(async (email) => {
                    await post('emails', {email, list_id: data[0].id})
                })
            }
            router.push({name: 'lists'})
        }
    } catch (error) {
        console.log(error)
    }
}

const cancel = () => {
    router.back()
}

</script>
