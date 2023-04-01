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
			class="sticky top-0 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-gray-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]"
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
							<button
								class="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm ml-2"
								@click="store.loadData()"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 96 960 960"
									class="w-4 h-4"
								>
									<path
										d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z"
									/>
								</svg>
							</button>
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
