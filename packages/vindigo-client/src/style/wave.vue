<style lang="postcss">

/* Input fields */
.w-input {
	@apply overflow-hidden;
}

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

/* Buttons */
.w-button {
	@apply leading-none;

	&:not(&--outline) {
		@apply border-none;
	}

	&--round .w-button__loader {
		@apply rounded-full;
	}

	&--icon {
		@apply bg-transparent border-none !important;
	}
}

</style>