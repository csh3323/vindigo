<template>
	<dragfield class="pa-5">
		<transition-group appear name="slide-fade">
			<v-card
				v-for="list in board.lists" :key="list.id" 
				width="300"
				class="board-content__list d-inline-block elevation-4"
			>
				<v-card-title class="body-1 pl-3 pt-3 pr-3 pb-0">
					<div class="text-truncate">
						{{list.title}}
					</div>
					<v-spacer/>
					<v-btn icon small @click="removeList(list.id)">
						<v-icon small>mdi-dots-vertical</v-icon>
					</v-btn>
				</v-card-title>
				<div class="board-content__list-content pl-3 pr-3 pb-3 pt-1">
					<task v-for="task in list.tasks" :key="task.id" :data="task"></task>
				</div>
				<div class="pl-3 pr-3 pb-3">
					<v-btn outlined small block color="blue" @click="addTask(list.id)">
						<v-icon left>
							mdi-plus
						</v-icon>
						Add task
					</v-btn>
				</div>
			</v-card>
		</transition-group>
	</dragfield>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "@vue/composition-api";
import { StoreKey, injectKey, RouterKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";
import * as debug from '../../common/Debug';
import { isHexColor } from '../../common/Utility';
import { random } from 'faker';
import Task from './Task.vue';
import _ from 'lodash';

export default defineComponent({
	name: 'board-lists',
	components: {
		Task
	},
	props: {
		board: { required: true },
		controls: { required: true, type: Object }
	},
	setup(props, ctx) {
		return {
			...props.controls
		}
	}
});
</script>