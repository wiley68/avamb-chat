<script setup>
import { computed, ref } from 'vue'
import { useStateStore } from '../store'
import moment from 'moment'
import ModalBlank from './ModalBlank.vue'

const store = useStateStore()
const delete_message_id = ref(0)

const messages = computed(() => {
	return store.state.messages.filter((element) => {
		let result = []
		if (store.state.search) {
			result =
				element.offer_id == store.state.offer_id &&
				element.body.includes(store.state.search)
		} else {
			result = element.offer_id == store.state.offer_id
		}
		return result
	})
})

const messages_today = computed(() => {
	return store.state.messages.filter((element) => {
		let result = []
		if (store.state.search) {
			result =
				moment(element.created_at).date() == moment().date() &&
				((element.from_user_id == store.state.current_user_id &&
					element.to_user_id == store.state.user.id) ||
					(element.to_user_id == store.state.current_user_id &&
						element.from_user_id == store.state.user.id)) &&
				(element.body.includes(store.state.search) ||
					element.offer_idnomber.includes(store.state.search))
		} else {
			result =
				moment(element.created_at).date() == moment().date() &&
				((element.from_user_id == store.state.current_user_id &&
					element.to_user_id == store.state.user.id) ||
					(element.to_user_id == store.state.current_user_id &&
						element.from_user_id == store.state.user.id))
		}
		return result
	})
})

const formatDateTime = (value) => {
	if (value) {
		return moment(String(value)).format('DD.MM.YYYY hh:mm')
	}
}

const deleteMessageCheck = (_delete_message_id) => {
	delete_message_id.value = _delete_message_id
	store.state.deleteMessage = true
}

const changeStatus = (_change_message_id) => {
	store.changeStatus(_change_message_id)
}

const today = () => {
	return moment().format('dddd, MMMM DD.MM.YYYY HH:mm')
}

const messages_old = computed(() => {
	return store.state.messages.filter((element) => {
		let result = []
		if (store.state.search) {
			result =
				moment(element.created_at).date() < moment().date() &&
				((element.from_user_id == store.state.current_user_id &&
					element.to_user_id == store.state.user.id) ||
					(element.to_user_id == store.state.current_user_id &&
						element.from_user_id == store.state.user.id)) &&
				(element.body.includes(store.state.search) ||
					element.offer_idnomber.includes(store.state.search))
		} else {
			result =
				moment(element.created_at).date() < moment().date() &&
				((element.from_user_id == store.state.current_user_id &&
					element.to_user_id == store.state.user.id) ||
					(element.to_user_id == store.state.current_user_id &&
						element.from_user_id == store.state.user.id))
		}
		return result
	})
})

const deleteMessage = () => {
	store.deleteMessage(delete_message_id.value)
	delete_message_id.value = 0
}
</script>

<template>
	<div
		class="grow px-4 sm:px-6 md:px-5 py-6 h-[calc(100vh-250px)] overflow-y-auto"
	>
		<div
			v-if="
				parseInt(store.state.current_user_id) === 0 &&
				parseInt(store.state.offer_id) === 0
			"
			class="w-full text-center font-bold text-3xl text-red-600"
		>
			Изберете номер на оферта за кореспонденция!
		</div>
		<div
			v-if="
				parseInt(store.state.current_user_id) === 0 &&
				parseInt(store.state.offer_id) !== 0
			"
			v-for="message in messages"
			:key="message.id"
			class="flex items-center justify-start mb-4 last:mb-0"
		>
			<img
				v-if="store.getUserById(message.from_user_id).user_gravatar != ''"
				class="w-12 h-12 rounded-full mr-2"
				:src="
					'https://www.gravatar.com/avatar/' +
					store.getUserById(message.from_user_id).user_gravatar
				"
			/>
			<svg
				v-if="store.getUserById(message.from_user_id).user_gravatar == ''"
				class="w-12 h-12 mr-2"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
				/>
			</svg>
			<div>
				<div class="flex items-center">
					<span class="text-lg text-red-600 font-bold">{{
						message.offer_idnomber
					}}</span>
					<span class="ml-2 text-base text-gray-500 font-medium">{{
						store.getUserById(message.from_user_id).username
					}}</span
					><svg
						class="w-6 h-6 ml-2 text-gray-400"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z"
						/></svg
					><span class="ml-2 text-base text-gray-500 font-medium">{{
						store.getUserById(message.to_user_id).username
					}}</span>
				</div>
				<div
					class="p-4 rounded-lg rounded-tl-none border border-gray-200 shadow-md mb-1 min-w-80"
					:class="
						message.from_user_id == store.state.current_user_id
							? 'bg-indigo-500 text-white'
							: 'bg-white text-gray-800'
					"
				>
					{{ message.body }}
				</div>
				<div class="flex items-center">
					<div class="flex-grow text-sm text-gray-500 font-medium">
						{{ formatDateTime(message.created_at) }}
					</div>
					<svg
						class="w-4 h-4 shrink-0 fill-current text-gray-400"
						viewBox="0 0 12 12"
					>
						<path
							d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
						/>
					</svg>
					<button
						@click.stop="deleteMessageCheck(message.id)"
						title="Изтрий избраното съобщение"
					>
						<svg
							class="w-8 h-8 text-red-400 hover:text-red-600"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div
			v-for="message in messages_today"
			:key="message.id"
			class="flex items-center mb-4 last:mb-0"
			:class="
				message.from_user_id == store.state.current_user_id
					? 'justify-end'
					: 'justify-start'
			"
		>
			<img
				v-if="store.getUserById(message.from_user_id).user_gravatar != ''"
				class="w-12 h-12 rounded-full mr-2"
				:src="
					'https://www.gravatar.com/avatar/' +
					store.getUserById(message.from_user_id).user_gravatar
				"
			/>
			<svg
				v-if="store.getUserById(message.from_user_id).user_gravatar == ''"
				class="w-12 h-12 mr-2"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
				/>
			</svg>
			<div>
				<div class="flex items-center">
					<span class="text-lg text-red-600 font-bold">{{
						message.offer_idnomber
					}}</span>
					<span class="ml-2 text-base text-gray-500 font-medium">{{
						store.getUserById(message.from_user_id).username
					}}</span>
				</div>
				<div
					class="p-4 rounded-lg rounded-tl-none border border-gray-200 shadow-md mb-1 min-w-80"
					:class="
						message.from_user_id == store.state.current_user_id
							? 'bg-indigo-500 text-white'
							: 'bg-white text-gray-800'
					"
				>
					{{ message.body }}
				</div>
				<div class="flex items-center">
					<div class="flex-grow text-sm text-gray-500 font-medium">
						{{ formatDateTime(message.created_at) }}
					</div>
					<button
						@click.stop="changeStatus(message.id)"
						title="Промени статуса"
					>
						<svg
							class="w-4 h-4 shrink-0 fill-current"
							:class="message.status == 0 ? 'text-gray-400' : 'text-green-400'"
							viewBox="0 0 12 12"
						>
							<path
								d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
							/>
						</svg>
					</button>
					<button
						@click.stop="deleteMessageCheck(message.id)"
						title="Изтрий избраното съобщение"
					>
						<svg
							class="w-8 h-8 text-red-400 hover:text-red-600"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="flex justify-center">
			<div
				class="inline-flex items-center justify-center text-sm font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full my-5"
			>
				{{ today() }}
			</div>
		</div>
		<div
			v-for="message_old in messages_old"
			:key="message_old.id"
			class="flex items-center mb-4 last:mb-0"
			:class="
				message_old.from_user_id == store.state.current_user_id
					? 'justify-end'
					: 'justify-start'
			"
		>
			<img
				v-if="store.getUserById(message_old.from_user_id).user_gravatar != ''"
				class="w-12 h-12 rounded-full mr-2"
				:src="
					'https://www.gravatar.com/avatar/' +
					store.getUserById(message_old.from_user_id).user_gravatar
				"
			/>
			<svg
				v-if="store.getUserById(message_old.from_user_id).user_gravatar == ''"
				class="w-12 h-12 mr-2"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
				/>
			</svg>
			<div>
				<div class="flex items-center">
					<span class="text-lg text-red-600 font-bold">{{
						message_old.offer_idnomber
					}}</span>
					<div class="ml-2 text-base text-gray-500 font-medium">
						{{ store.getUserById(message_old.from_user_id).username }}
					</div>
				</div>
				<div
					class="p-4 rounded-lg rounded-tl-none border border-gray-200 shadow-md mb-1 min-w-80"
					:class="
						message_old.from_user_id == store.state.current_user_id
							? 'bg-indigo-500 text-white'
							: 'bg-white text-gray-800'
					"
				>
					{{ message_old.body }}
				</div>
				<div class="flex items-center">
					<div class="flex-grow text-sm text-gray-500 font-medium">
						{{ formatDateTime(message_old.created_at) }}
					</div>
					<button
						@click.stop="changeStatus(message_old.id)"
						title="Промени статуса"
					>
						<svg
							class="w-4 h-4 shrink-0 fill-current text-gray-400"
							:class="
								message_old.status == 0 ? 'text-gray-400' : 'text-green-400'
							"
							viewBox="0 0 12 12"
						>
							<path
								d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
							/>
						</svg>
					</button>
					<button
						@click.stop="deleteMessageCheck(message_old.id)"
						itle="Изтрий избраното съобщение"
					>
						<svg
							class="w-8 h-8 text-red-400 hover:text-red-600"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<ModalBlank
			id="danger-modal"
			:modalOpen="store.state.deleteMessage"
			@close-modal="store.state.deleteMessage = false"
		>
			<div class="p-10 flex space-x-8">
				<div
					class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-red-100"
				>
					<svg
						class="w-6 h-6 shrink-0 fill-current text-red-600"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
						/>
					</svg>
				</div>
				<div>
					<div class="mb-2">
						<div class="text-xl font-semibold text-gray-800">
							Желаете ли да изтриете съобщението?
						</div>
					</div>
					<div class="mb-10">
						<div class="space-y-2">
							<p>
								Това съобщение ще бъде изтрито. Тази операция не може да се
								прекъсне!
							</p>
						</div>
					</div>
					<div class="flex flex-wrap justify-end space-x-2">
						<button
							class="btn-lg border-gray-200 hover:border-gray-300 text-gray-600"
							@click.stop="store.state.deleteMessage = false"
						>
							Откажи
						</button>
						<button
							class="btn-lg bg-red-500 hover:bg-red-600 text-white"
							@click.stop="deleteMessage()"
						>
							Да, Изтрий го!
						</button>
					</div>
				</div>
			</div>
		</ModalBlank>
	</div>
</template>
