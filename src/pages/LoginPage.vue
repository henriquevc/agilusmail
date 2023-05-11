<template>
    <q-page class="bg-primary window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Agilus Mail</h5>
            </div>
            <div class="row">
                <q-card class="q-pa-lg shadow-24">
                <q-card-section>
                    <q-form class="q-gutter-md">
                        <q-input filled clearable v-model="form.email" type="email" label="Email">
                            <template #prepend><q-icon name="mail"/></template>
                        </q-input>
                        <q-input filled clearable v-model="form.password" :type="viewPassword ? 'text' : 'password'" label="Senha">
                            <template #prepend><q-icon name="lock"/></template>
                            <template #append><q-btn flat :icon="viewPassword ? 'visibility_off' : 'visibility'" round @click.stop="viewPassword = !viewPassword"/></template>
                        </q-input>
                    </q-form>
                </q-card-section>
                <q-card-actions class="q-px-md">
                    <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" no-caps  @click="sigin"/>
                </q-card-actions>
                <q-card-section class="text-center q-pt-lg">
                    <q-btn class="text-grey-7" flat no-caps to="/register">Criar uma conta</q-btn>
                </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

const router = useRouter()

const { login } = useAuthUser()

const form = ref({
    email: '',
    password: ''
})
const viewPassword = ref(false)

const sigin = async () => {
    try {
        await login(form.value)
        router.push({name: 'email-sender'})
    } catch (error: any) {
        alert(error.message)
    }
}

</script>
<style>
.q-card {
  width: 360px;
}
</style>
