<script setup>
import { ref, computed } from 'vue'
import { useStateStore } from '../store'
import moment from 'moment'

const props = defineProps(['msgSidebarOpen'])
const emit = defineEmits(['close-msgsidebar'])
const store = useStateStore()

const checked_all = ref(false)

const checkedAll = () => {
	if (checked_all.value) {
		store.state.users
			.filter((element) => {
				return element.id != store.state.user.id
			})
			.forEach((element) => {
				element.checked = false
			})
		if (store.state.current_user_id) {
			store.state.users.find(
				(element) => element.id == store.state.current_user_id
			).checked = true
		}
	} else {
		store.state.users
			.filter((element) => {
				return element.id != store.state.user.id
			})
			.forEach((element) => {
				element.checked = true
			})
	}
}

const getUsers = computed(() => {
	return store.state.users.filter((element) => {
		return element.id != store.state.user.id
	})
})

const changeUser = (user_id) => {
	store.state.current_user_id = user_id
	store.state.offer_id = 0
	store.state.users.find((element) => element.id == user_id).checked = true
	emit('close-msgsidebar')
}

const changeAllUsers = () => {
	store.state.current_user_id = 0
	store.state.users
		.filter((element) => {
			return element.id != store.state.user.id
		})
		.forEach((element) => {
			element.checked = false
		})
	store.state.users[1].checked = true
	emit('close-msgsidebar')
}

const getMessagesByUserLength = (user_id) => {
	return store.state.messages.filter((element) => {
		return (
			element.from_user_id == user_id &&
			element.to_user_id == store.state.user.id &&
			element.status == 0
		)
	}).length
}

const getMessagesByAllUsersLength = () => {
	return store.state.messages.filter((element) => {
		return element.offer_id == store.state.offer_id
	}).length
}
</script>

<template>
	<div class="mt-4">
		<div
			class="flex flex-col space-y-1 text-lg font-semibold text-gray-400 mb-3 border-b border-gray-100 pb-4"
		>
			<select
				id="offer_id"
				@change="changeAllUsers()"
				v-model="store.state.offer_id"
				name="offer_id"
				class="grow pl-2 border border-gray-200 py-1 rounded hover:border-indigo-200 hover:bg-gray-50 focus:border-indigo-200 focus:bg-gray-50 outline-none"
			>
				<option value="0">Избери номер на оферта</option>
				<option
					v-for="offer in store.state.offers"
					:key="offer.id"
					:value="offer.id"
				>
					{{ offer.idnomber }}
				</option>
			</select>
			<button
				class="flex items-center justify-between grow p-2 rounded hover:bg-indigo-100"
				:class="0 == store.state.current_user_id ? 'bg-indigo-100' : ''"
				@click.stop="changeAllUsers()"
			>
				<div class="flex items-center truncate">
					<svg
						class="w-10 h-10 mr-2 text-red-700"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M15,4V11H5.17L4,12.17V4H15M16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12V3A1,1 0 0,0 16,2M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"
						/>
					</svg>
					<div class="truncate">
						<span class="font-medium text-gray-800"
							>Към обща кореспонденция</span
						>
					</div>
				</div>
				<div class="flex items-center ml-2">
					<svg
						v-if="getMessagesByAllUsersLength() == 0"
						class="w-5 h-5 shrink-0 fill-current text-gray-400"
						viewBox="0 0 12 12"
					>
						<path
							d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
						/>
					</svg>
					<div
						v-else
						class="text-sm inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-4"
					>
						{{ getMessagesByAllUsersLength() }}
					</div>
				</div>
			</button>
		</div>
		<div class="text-lg font-semibold text-gray-400 uppercase mb-3">
			<input
				type="checkbox"
				class="mr-2 w-5 h-5"
				title="Смени избраните съвкупно"
				v-model="checked_all"
				@click.stop="checkedAll()"
			/>&nbsp;&nbsp;&nbsp;Потребители
		</div>
		<ul class="mb-6">
			<li
				class="flex flex-row justify-left items-center -mx-2 mb-1 w-full"
				v-for="user in getUsers"
				:key="user.id"
			>
				<input type="checkbox" class="mr-2 w-5 h-5" v-model="user.checked" />
				<button
					class="flex items-center justify-between grow p-2 rounded hover:bg-indigo-100"
					:class="user.id == store.state.current_user_id ? 'bg-indigo-100' : ''"
					@click.stop="changeUser(user.id)"
				>
					<div class="flex items-center truncate">
						<img
							v-if="user.user_gravatar != ''"
							class="w-10 h-10 rounded-full mr-2"
							:src="'https://www.gravatar.com/avatar/' + user.user_gravatar"
						/>
						<svg
							v-if="user.user_gravatar == ''"
							class="w-10 h-10 mr-2"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
							/>
						</svg>
						<div class="truncate">
							<span class="font-medium text-gray-800"
								>{{ user.username }}
								<span class="text-sm text-gray-400"
									>({{ user.dlaznost }})</span
								></span
							>
						</div>
					</div>
					<div class="flex items-center ml-2">
						<svg
							v-if="getMessagesByUserLength(user.id) == 0"
							class="w-5 h-5 shrink-0 fill-current text-gray-400"
							viewBox="0 0 12 12"
						>
							<path
								d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
							/>
						</svg>
						<div
							v-if="getMessagesByUserLength(user.id) > 0"
							class="text-sm inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-4"
						>
							{{ getMessagesByUserLength(user.id) }}
						</div>
					</div>
				</button>
			</li>
		</ul>
	</div>
</template>
