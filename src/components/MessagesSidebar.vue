<script setup>
import { useStateStore } from '../store'
import DirectMessages from './DirectMessages.vue'

const store = useStateStore()
const props = defineProps(['msgSidebarOpen'])
</script>

<template>
  <div
    id="messages-sidebar"
    class="absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out"
    :class="msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div
      class="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-gray-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]"
    >
      <div>
        <div class="sticky top-0 z-10">
          <div
            class="flex items-center bg-white border-b border-gray-200 px-5 h-16"
          >
            <div class="w-full flex items-center justify-start">
              <img
                v-if="store.state.user_gravatar != ''"
                class="w-8 h-8 rounded-full mr-2"
                :src="
                  'https://www.gravatar.com/avatar/' + store.state.user_gravatar
                "
              />
              <svg
                v-if="store.state.user_gravatar == ''"
                class="w-8 h-8 mr-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                />
              </svg>
              <div class="truncate">
                <span class="font-semibold text-gray-800">{{
                  store.state.user.username
                }}</span
                >&nbsp;<span class="text-sm text-gray-400"
                  >({{ store.state.user.dlaznost }})</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="px-5 py-4">
          <DirectMessages
            :msgSidebarOpen="msgSidebarOpen"
            @close-msgsidebar="$emit('close-msgsidebar')"
          ></DirectMessages>
        </div>
      </div>
    </div>
  </div>
</template>
