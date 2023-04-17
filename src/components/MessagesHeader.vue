<script setup>
import { useStateStore } from '../store'

const props = defineProps(['msgSidebarOpen'])
const store = useStateStore()
</script>

<template>
	<div class="sticky top-0">
		<div
			class="flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 md:px-5 h-16"
		>
			<div class="flex items-center">
				<button
					class="md:hidden text-gray-400 hover:text-gray-500 mr-4"
					@click.stop="$emit('toggle-msgsidebar')"
					aria-controls="messages-sidebar"
					:aria-expanded="msgSidebarOpen"
				>
					<span class="sr-only">Затвори</span>
					<svg
						class="w-6 h-6 fill-current"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
						/>
					</svg>
				</button>
				<div class="h-12 flex">
					<input
						:disabled="
							parseInt(store.state.current_user_id) === 0 &&
							parseInt(store.state.offer_id) === 0
						"
						class="min-w-56 pl-2 border border-gray-200 py-1 rounded hover:border-indigo-200 hover:bg-gray-50 focus:border-indigo-200 focus:bg-gray-50 outline-none"
						type="text"
						placeholder="Търси ..."
						v-model="store.state.search"
					/>
					<button
						@click="store.state.search = ''"
						class="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm ml-2"
					>
						<svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
							<path
								d="M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="flex">
				<a
					href="/cp.php"
					class="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm ml-2"
				>
					<svg class="w-8 h-8 fill-current text-red-500" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</template>
