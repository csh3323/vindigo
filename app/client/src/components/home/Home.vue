<template>
	<v-app>

		<!-- Toolbar -->
		<v-app-bar app color="rgba(0, 0, 0, 0.3)" class="app-titlebar elevation-0">
			<span class="white--text title">
				Homepage
			</span>
			<v-spacer/>
			<v-text-field
				prepend-icon="mdi-magnify"
				style="max-width: 250px"
				placeholder="Search"
				hide-details
				dark
			/>
		</v-app-bar>

		<!-- Telescope Board -->
		<v-content class="homepage red">
			<div class="pa-5">
				<v-card class="mb-3">
					<v-card-text>
						Homepage is unfinished
					</v-card-text>
				</v-card>
				<v-btn to="/board/123" color="primary">
					Open board
				</v-btn>
			</div>
		</v-content>
	</v-app>
</template>