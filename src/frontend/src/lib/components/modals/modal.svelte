<script lang="ts">
	export let isOpen: boolean = false;
	export const closeOnOutsideClick = true;
	let dialog: HTMLDialogElement | undefined;
	let dialogContent: HTMLDivElement | undefined;

	function handleClick(event: MouseEvent) {
		// First check that the dialog content does not contiain the click
		if (!dialogContent?.contains(event.target as HTMLElement)) {
			// Then check if the dialog is open AND if closeOnOutsideClick is true
			if (isOpen && closeOnOutsideClick) {
				// Then check if the dialog overlay was clicked
				/* We need this extra statement because without this
			 it'll also close button that was supposed to open the dialog in the first place */
				if (dialog?.contains(event.target as HTMLElement)) {
					isOpen = false;
				}
			}
		}
	}
	function closeDialog() {
		const closeAnimation = dialog?.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200
		});
		closeAnimation?.addEventListener('finish', () => dialog?.close());
		closeAnimation?.addEventListener('cancel', () => dialog?.close());
	}
	$: {
		if (isOpen) {
			dialog?.showModal();
		} else {
			closeDialog();
		}
	}
</script>

<svelte:window on:click={handleClick} />
<dialog bind:this={dialog} class:open={isOpen} on:cancel|preventDefault={() => (isOpen = false)}>
	<!-- Have an inner div so outside clicks can be detected -->
	<div bind:this={dialogContent} class="contents">
		<slot />
	</div>
</dialog>

<style lang="postcss">
	dialog {
		@apply p-0 opacity-0 rounded-lg -translate-y-3 bg-[#313338]
				 transition-all duration-200;
	}
	dialog.open {
		@apply opacity-100 translate-y-0 bg-[#313338] text-white;
	}
	dialog::backdrop {
		@apply bg-gray-400 opacity-0
				  transition-opacity duration-200;
	}
	.contents {
		@apply flex flex-col mx-8 my-3 gap-2;
	}
	dialog.open::backdrop {
		@apply opacity-40;
	}
</style>
