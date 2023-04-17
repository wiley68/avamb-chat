<script setup>
import { ref } from 'vue'
import { useStateStore } from '../store'

const store = useStateStore()
const message = ref('')
const offer_id = ref(0)

const sendMessage = () => {
	if (message.value.length > 0) {
		store.state.users.find(
			(element) => element.id == store.state.current_user_id
		).checked = true
		const users_checked = store.state.users.filter((element) => {
			return element.id != store.state.user.id && element.checked
		})
		users_checked.forEach((element) => {
			store.createMessage(
				store.state.user.id,
				element.id,
				message.value,
				offer_id.value
			)
		})
		message.value = ''
		store.state.users
			.filter((element) => {
				return element.id != store.state.current_user_id
			})
			.forEach((element) => {
				element.checked = false
			})
	}
}
</script>

<template>
	<div class="sticky bottom-0">
		<div
			class="flex items-center justify-between bg-white border-t border-gray-200 px-4 sm:px-6 md:px-5 h-16"
		>
			<div class="grow h-12 flex">
				<div class="grow flex">
					<input
						:disabled="store.state.current_user_id === 0"
						id="message-input"
						class="grow pl-2 border border-gray-200 py-1 rounded hover:border-indigo-200 hover:bg-gray-50 focus:border-indigo-200 focus:bg-gray-50 outline-none"
						type="text"
						placeholder="Aa"
						v-model="message"
						v-on:keyup.enter="sendMessage()"
					/>
				</div>
			</div>
		</div>
		<div
			class="flex items-center justify-between bg-white px-4 sm:px-6 md:px-5 h-16"
		>
			<div class="flex grow">
				<select
					:disabled="store.state.current_user_id === 0"
					id="offer_id"
					v-model="offer_id"
					name="offer_id"
					class="grow h-12 pl-2 border border-gray-200 py-1 rounded hover:border-indigo-200 hover:bg-gray-50 focus:border-indigo-200 focus:bg-gray-50 outline-none"
				>
					<option value="0">Избери номер на оферта</option>
					<option
						v-for="offer in store.state.offers"
						:key="offer.id"
						:value="offer.id"
					>
						{{ offer.idnomber }} - {{ offer.client_name }}
					</option>
				</select>
			</div>
			<div class="ml-2 h-12 flex">
				<button
					:disabled="store.state.current_user_id === 0 || offer_id === 0"
					type="submit"
					title="Изпрати текста като съобщение"
					class="btn btn-lg bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
					@click.stop="sendMessage()"
				>
					<svg class="w-6 h-6 mr-1" viewBox="0 0 24 24">
						<path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
					</svg>
					Изпрати
				</button>
			</div>
		</div>
	</div>
</template>
