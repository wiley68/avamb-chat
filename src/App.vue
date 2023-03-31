<script setup>
import { ref, onMounted } from 'vue'
import { useStateStore } from './store/index'
import MessagesHeader from './components/MessagesHeader.vue'
import MessagesSidebar from './components/MessagesSidebar.vue'
import MessagesBody from './components/MessagesBody.vue'
import MessagesFooter from './components/MessagesFooter.vue'

const msgSidebarOpen = ref(true)
const store = useStateStore()

onMounted(() => {
  store.loadData()
})
</script>

<template>
  <main>
    <div class="relative flex">
      <MessagesSidebar
        :msgSidebarOpen="msgSidebarOpen"
        @close-msgsidebar="msgSidebarOpen = false"
      >
        <div
          class="grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out"
          :class="msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'"
        >
          <MessagesHeader
            :msgSidebarOpen="msgSidebarOpen"
            @toggle-msgsidebar="msgSidebarOpen = !msgSidebarOpen"
          ></MessagesHeader>
          <MessagesBody></MessagesBody>
          <MessagesFooter></MessagesFooter>
        </div>
      </MessagesSidebar>
    </div>
  </main>
</template>
