<template>
    <q-page padding class="row items-center justify-center full-height full-width bg-primary">
        <q-card class="col-xs-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 bg-white q-pa-lg shadow-24">
            <h4 class="q-px-md">Registre-se</h4>
            <q-card-section>
                <q-form class="q-gutter-md">
                    <q-input filled label="Nome" v-model="form.name"></q-input>
                    <q-input filled label="Email" v-model="form.email"></q-input>
                    <q-input filled label="Senha" v-model="form.password" type="password"></q-input>
                    <q-input filled label="Chave agilus" v-model="agilusKey" type="password"></q-input>
                </q-form>
            </q-card-section>
            <q-card-actions class="q-pa-md">
                <q-btn unelevated color="primary" size="lg" class="full-width" label="Registrar" no-caps  @click="handleRegister"/>
            </q-card-actions>
        </q-card>
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

const router = useRouter()

const { register } = useAuthUser()

const form = ref({
    name: '',
    email: '',
    password: ''
})
const agilusKey = ref('')

const handleRegister =  async () => {
    if (agilusKey.value != process.env.KEY_AGILUS) {
        alert('chave agilus não confere')
        return
    }
    try {
        await register(form.value)
        router.push({
            name: 'email-confirmation',
            query: {email: form.value.email}
        })
    } catch (error: any) {
        alert(error.message)
    }
}

</script>
