<template>
    <q-page padding>
        <q-input v-model="list.name" label="Nome da lista"></q-input>
        <q-input v-model="list.emails" type="textarea" rows="30"></q-input>
    </q-page>
</template>
<script setup>
const list = ref({
    name: '',
    emails: ''
})
</script>
