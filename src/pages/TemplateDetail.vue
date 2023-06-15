<template>
    <q-page padding>
        <div class="row justify-center q-gutter-lg q-mt-md q-mb-xl">
            <q-btn label="cancelar" flat color="negative" @click="cancel"></q-btn>
            <q-btn label="salvar" color="positive" @click="save"></q-btn>
        </div>
        <div class="row q-col-gutter-md">
            <q-input v-model="template.name" label="Nome da lista" outlined class="col-12" :rules="[val => (val && val.length > 0) || 'Campo obrigatório']" />
            <ag-editor v-model="template.body" label="template" rules="[val => (val && val.length > 0) || 'Campo obrigatório']"  />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import useApi from 'src/composables/UseApi'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { post, getById } = useApi()
const router = useRouter()
const route = useRoute()

const template = ref({
    name: '',
    body: ''
})

const isUpdate = computed(() => route.params.id)

onMounted(() => {
    if (isUpdate.value) {
        handleGetTemplate(Number(route.params.id))
    }
})

const handleGetTemplate = async (id: number) => {
    try {
        let templateHandle = await getById('templates', id)
        template.value = templateHandle
    } catch (error) {
        console.error(error)
    }
}

const save = async () => {
    //salvar no banco de dados
    try {
        if (isUpdate.value) {
            return
        }
        else {
            const data = await post('templates', {name: template.value.name, body: template.value.body})
            console.log(data)
            router.push({name: 'templates'})
        }
    } catch (error) {
        console.log(error)
    }
}

const cancel = () => {
    router.back()
}

</script>
