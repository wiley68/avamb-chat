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
				<div class="flex -space-x-3 -ml-px">
					<svg class="w-8 h-8" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z"
						/>
					</svg>
				</div>
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
