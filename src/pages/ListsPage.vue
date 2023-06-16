<template>
  <q-page padding>
    <h4>Listas</h4>
    <div>
      <q-btn color="primary" label="Incluir Lista" @click="addList" />

      <q-table
        class="q-mt-lg"
        :rows="lists"
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

const addList = () => {
  router.push('listDetail')
}

const paginationConfig = ref({ rowsPerPage: 0 })

const columns = [
  { name: 'name', required: true, label: 'Nome da lista', field: 'name', align: 'center', sortable: true },
  { name: 'actions', label: '', field: 'actions', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const lists = ref([])
const { list, remove } = useApi()
const loading = ref(true)

const handleLoadLists = async () => {
  try {
    loading.value = true
    lists.value = await list('lists')
    loading.value = false
  } catch(error) {
    console.error(error)
  }
}

onMounted(() => {
  handleLoadLists()
})

const onRowClick = (item) => {
  router.push({ path: `listDetail/${item.id}` })
}

const deleteItem = async (item) => {
  try {
    await remove('lists', item.id)
    let index = lists.value.findIndex(l => l.id === item.id)
    lists.value.splice(index, 1)
  } catch (error) {
    console.error(error)
  }
}
</script>
