<template>
  <q-page padding>
    <h4>Templates de email</h4>
    <div>
      <q-btn color="primary" label="Incluir template" @click="addTemplate" />

      <q-table
        class="q-mt-lg"
        :rows="templates"
        :columns="columns"
        row-key="name"
        :loading="loading"
        :pagination="paginationConfig"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)" class="cursor-pointer">
            <q-td key="name" class="text-center">{{ props.row.name }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn icon="delete" flat round color="negative" @click.stop="deleteItem(props.row)"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import useApi from 'src/composables/UseApi';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const addTemplate = () => {
  router.push('templateDetail')
}

const paginationConfig = ref({ rowsPerPage: 0 })

const columns = [
  { name: 'name', required: true, label: 'Nome do template', field: 'name', align: 'center', sortable: true },
  { name: 'actions', label: '', field: 'actions', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const templates = ref([])
const { list, remove } = useApi()
const loading = ref(true)

const handleLoadTemplates = async () => {
  try {
    loading.value = true
    templates.value = await list('templates')
    loading.value = false
  } catch(error) {
    console.log(error)
  }
}

onMounted(() => {
  handleLoadTemplates()
})

const onRowClick = (item) => {
  router.push({ path: `templateDetail/${item.id}` })
}

const deleteItem = async (item) => {
  try {
    await remove('templates', item.id)
    let index = templates.value.findIndex(l => l.id === item.id)
    templates.value.splice(index, 1)
  } catch (error) {
    console.error(error)
  }
}
</script>
