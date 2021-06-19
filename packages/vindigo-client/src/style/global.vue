<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

/* Custom utilities */
@layer utilities {
	@variants responsive {
		.text-shadow {
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.35);
		}
		
		.text-shadow-none {
			text-shadow: none;
		}
	} 
}

/* Stupid chrome stuff */

</style>