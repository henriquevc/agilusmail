<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Agilus Mail
        </q-toolbar-title>

        <q-item class="q-mr-sm" dark>
          <q-item-section>
            <q-item-label>{{ user?.user_metadata.name }}</q-item-label>
            <q-item-label caption> {{ user?.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-btn icon="logout" round flat @click="handleLogout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import useAuthUser from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router'

const router = useRouter()
const { user, logout } = useAuthUser()

const essentialLinks = [
  {
    title: 'Emails',
    caption: 'para enviar',
    icon: 'mail',
    link: '/email-sender'
  },
  {
    title: 'Listas',
    caption: 'grupos de destinatários',
    icon: 'list',
    link: '/lists'
  }
];

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleLogout = async () => {
  await logout()
  router.replace({name: 'login'})
}


</script>
