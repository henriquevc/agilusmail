<template>
  <q-page padding>
    <h4>Listas</h4>
    <div>
      <q-btn color="primary" label="Incluir Lista" @click="addList" />

      <q-table
        class="q-mt-lg"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)" class="cursor-pointer">
            <q-td key="name">{{ props.row.name }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn icon="edit" flat round color="primary"></q-btn>
              <q-btn icon="delete" flat round color="negative"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const addList = () => {
  router.push('listDetail')
}

const columns = [
  { name: 'name', required: true, label: 'Dessert (100g serving)', field: 'name', align: 'left', sortable: true },
  { name: 'actions', label: '', field: 'actions', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
  },
  {
    name: 'Ice cream sandwich',
  },
  {
    name: 'Eclair',
  },
  {
    name: 'Cupcake',
  },
  {
    name: 'Gingerbread',
  },
  {
    name: 'Jelly bean',
  },
  {
    name: 'Lollipop',
  },
]

const onRowClick = (item) => {
  console.log(item)
}
</script>
