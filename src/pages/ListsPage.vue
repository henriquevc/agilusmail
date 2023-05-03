<template>
  <q-page padding>
    <h4>Listas</h4>
    <div>
      <q-btn color="primary" label="Incluir Lista" @click="addList" />

      <q-table class="q-mt-lg"></q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const addList = () => {
  router.push('listDetail')
}
</script>
