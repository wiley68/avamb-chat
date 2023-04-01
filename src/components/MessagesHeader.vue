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
			</div>
			<div class="flex">
				<button
					class="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm ml-2"
				>
					<svg class="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>
