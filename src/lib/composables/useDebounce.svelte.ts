export function useDebounce<T>(getValue: () => T, delay = 300) {
	let debouncedValue = $state<T>(getValue());
	let timer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		const current = getValue();
		clearTimeout(timer);
		timer = setTimeout(() => {
			debouncedValue = current;
		}, delay);

		return () => clearTimeout(timer);
	});

	return {
		get value() {
			return debouncedValue;
		}
	};
}
