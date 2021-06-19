<template>
	<div class="kanban__container" style="max-width: calc(100vw - 56px); overflow-x: auto">
		<div
			v-for="(header, index) in headers" :key="index"
			class="kanban__item"
		>
			<div class="kanban__item_header">
				<div class="kanban__item_header_left">
					<icon class="mr-3" :icon="header.icon" />
					<h1 class="font-bold">
						{{ header.title }} - {{ index }}
					</h1>
				</div>
				<div class="kanban__item_header_right">
					<icon class="text-[rgba(255,255,255,0.8)]" icon="mdi-plus" />
					<icon class="text-[rgba(255,255,255,0.8)]" icon="mdi-chevron-down" />
				</div>
				<div v-if="index !== headers.length - 1" class="absolute right-0 top-[4px] h-[40px] w-[2px] bg-[rgba(255,255,255,0.4)]" />
			</div>
			<div class="kanban__item_body" style="height: 94.3189%" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KanbanOverview',
	data: () => ({
		headers: [
			{ title: 'Completed', icon: 'mdi-check', order: 0, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] },
			{ title: 'In progress', icon: 'mdi-check', order: 1, items: [] }
		]
	})
};
</script>

<style lang="postcss" scoped>

    .kanban__container {

        @apply flex h-full max-w-[100%] overflow-y-hidden;

        .kanban__item {

            @apply min-w-[400px];

            .kanban__item_header {
                @apply flex items-center justify-between bg-[#14A7F4] h-12 relative text-white px-5;

                .kanban__item_header_left {
                    @apply flex items-center;

                    h1 {
                        @apply text-[1.21rem] mt-[-3px];
                    }
                }
                
                .kanban__item_header_right {
                    @apply flex items-center;
                }
            }

            &:nth-child(odd) {
                .kanban__item_body {
                    @apply bg-[#F1F2F6] p-4;
                }
            }

            &:nth-child(even) {
                .kanban__item_body {
                    @apply bg-[#EAECF2] p-4;
                }
            }
        }
    }

</style>