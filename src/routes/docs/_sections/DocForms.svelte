<script lang="ts">
	import DocHeader from '../_components/DocHeader.svelte';
	import DocSandbox from '../_components/DocSandbox.svelte';
	import DocPropsTable from '../_components/DocPropsTable.svelte';
	import FormField from '$lib/components/forms/FormField.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import Switch from '$lib/components/forms/Switch.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import RadioGroup from '$lib/components/forms/RadioGroup.svelte';
	import Slider from '$lib/components/forms/Slider.svelte';
	import ColorPicker from '$lib/components/forms/ColorPicker.svelte';

	let sampleEmail = $state('user@sven-ui.dev');
	let sampleBio = $state('Building high-converting web apps with SvelteKit.');
	let sampleRole = $state('developer');
	let enableTelemetry = $state(true);
	let acceptTerms = $state(true);
	let selectedTier = $state('pro');
	let volume = $state(75);
	let chosenHex = $state('#ff3e00');

	const roleOptions = [
		{ label: 'Frontend Developer', value: 'developer' },
		{ label: 'Product Designer', value: 'designer' },
		{ label: 'Engineering Manager', value: 'manager' }
	];

	const tierOptions = [
		{ label: 'Free Tier', value: 'free', description: 'Up to 3 projects, community support.' },
		{ label: 'Pro Plan', value: 'pro', description: 'Unlimited projects, priority SLA.' },
		{ label: 'Enterprise', value: 'enterprise', description: 'Custom SSO, dedicated support.' }
	];

	const formSnippet = `<FormField label="Email Address" required hint="We will never share your email">
  <Input type="email" bind:value={email} placeholder="you@company.com" icon="envelope" />
</FormField>

<FormField label="Bio" hint="Max 200 characters">
  <Textarea bind:value={bio} maxCount={200} showCount />
</FormField>`;
</script>

<DocHeader
	title="Forms, Inputs & FormFields"
	description="Typed FormFields with validation states, character counters, switches, checkboxes, sliders, radio cards, and color pickers."
	badge="Forms"
	source="src/lib/components/forms/FormField.svelte"
	category="Components"
/>

<div class="space-y-8">
	<!-- FormField & Inputs Sandbox -->
	<DocSandbox title="FormField, Input & Textarea" code={formSnippet}>
		<div class="w-full max-w-lg space-y-4">
			<FormField label="Work Email Address" required hint="We'll send your activation key here">
				<Input
					type="email"
					bind:value={sampleEmail}
					placeholder="name@company.com"
					icon="envelope"
				/>
			</FormField>

			<FormField label="Select Role" required>
				<Select options={roleOptions} bind:value={sampleRole} />
			</FormField>

			<FormField label="Developer Bio" hint="Describe your tech stack">
				<Textarea bind:value={sampleBio} rows={3} />
			</FormField>
		</div>
	</DocSandbox>

	<!-- Switches, Checkboxes & Sliders Sandbox -->
	<DocSandbox title="Switches, Checkboxes & Sliders">
		<div class="w-full max-w-lg space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<div class="text-sm font-semibold text-zinc-900 dark:text-white">
						Telemetry & Analytics
					</div>
					<div class="text-xs text-zinc-500">Allow anonymous usage telemetry</div>
				</div>
				<Switch bind:checked={enableTelemetry} />
			</div>

			<div class="flex items-center gap-3">
				<Checkbox bind:checked={acceptTerms} label="I accept the open source license terms" />
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between text-xs">
					<span class="font-semibold text-zinc-700 dark:text-zinc-300">Layout Scale / Density</span>
					<span class="font-mono text-primary-600 dark:text-primary-400">{volume}%</span>
				</div>
				<Slider bind:value={volume} min={0} max={100} step={5} />
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between text-xs">
					<span class="font-semibold text-zinc-700 dark:text-zinc-300">Custom Brand Color</span>
					<span class="font-mono text-primary-600 dark:text-primary-400">{chosenHex}</span>
				</div>
				<ColorPicker bind:value={chosenHex} />
			</div>
		</div>
	</DocSandbox>

	<!-- RadioGroup Card Sandbox -->
	<DocSandbox title="RadioGroup Selection Cards">
		<div class="w-full max-w-lg">
			<RadioGroup options={tierOptions} bind:value={selectedTier} name="subscriptionTier" />
		</div>
	</DocSandbox>

	<!-- Props Table -->
	<DocPropsTable
		items={[
			{
				name: 'label',
				type: 'string',
				default: "''",
				description: 'Visible label text displayed above the control.'
			},
			{
				name: 'required',
				type: 'boolean',
				default: 'false',
				description: 'Renders a primary colored asterisk and marks accessibility required.'
			},
			{
				name: 'error',
				type: 'string',
				default: "''",
				description: 'Validation error message to display in red below the input.'
			},
			{
				name: 'hint',
				type: 'string',
				default: "''",
				description: 'Helper guidance text displayed below the field.'
			}
		]}
	/>
</div>
