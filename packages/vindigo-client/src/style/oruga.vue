<style lang="postcss">
.o-input {
	@apply ring-4 ring-white ring-opacity-30 text-sm py-2;
 
	&__icon-right {
		@apply mr-2;

		.mdi-eye-off, .mdi-eye {
			opacity: 0.65;
		}
	}

	&--rounded {
		@apply rounded-full px-4 ;
	}

	&-iconspace-right {
		@apply pr-10;
	}
}

.o-chk {
    &__check {
        @apply rounded-full border-white border-2;

		background: transparent;
		width: 18px;
		height: 18px;

		&::before {
			@apply bg-white rounded-full opacity-0 transition-opacity;
			width: 10px;
			height: 10px;
			content: '';
		}

        &--checked {
			@apply flex items-center justify-center;
			

			&::before {
				@apply opacity-75;
			}
		}
    }

    &__label {
        @apply pl-3;
    }

    &--disabled {
        opacity: 0.7;
    }
}

.o-btn {
	@apply bg-black bg-opacity-30 text-sm py-2 transition-all;
	outline: none !important;

	&:hover {
		@apply bg-opacity-40;
	}

	&--rounded {
		@apply rounded-full px-4;
	}
}
</style>