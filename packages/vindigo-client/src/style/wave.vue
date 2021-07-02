<style lang="postcss">

/* Input fields */
.w-input__input-wrap {
	@apply border-none ring-4 ring-white bg-white ring-opacity-30 text-sm h-9;

	&--round input {
		@apply rounded-full;
	}

	&::after {
		display: none;
	}
}

/* Checkboxes */
.w-checkbox__input {
	@apply text-red-500;

	&::after {
		@apply border-white;
	}
}

.w-button {
	&--round .w-button__loader {
		@apply rounded-full;
	}
}

</style>