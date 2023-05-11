<template>
  <q-page class="row column q-pa-lg bg-primary text-white justify-center items-center">
    <p v-if="user" class="text-h5 col-12">{{ user.user_metadata.name }}</p>
  </q-page>
</template>

<script setup>
import useAuthUser from 'src/composables/UseAuthUser';
const {user} = useAuthUser()


</script>
