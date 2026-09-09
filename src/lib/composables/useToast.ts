import { toast } from 'svelte-sonner';

export interface ToastAction {
	label: string;
	onClick: () => void;
}

export interface ToastOptions {
	title?: string;
	description?: string;
	color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
	duration?: number;
	action?: ToastAction;
}

export function useToast() {
	return {
		add: (options: ToastOptions | string) => {
			if (typeof options === 'string') {
				return toast(options);
			}
			const { title, description, color = 'neutral', duration = 4000, action } = options;

			const actionObj = action
				? {
						label: action.label,
						onClick: action.onClick
					}
				: undefined;

			switch (color) {
				case 'success':
					return toast.success(title || '', { description, duration, action: actionObj });
				case 'error':
					return toast.error(title || '', { description, duration, action: actionObj });
				case 'warning':
					return toast.warning(title || '', { description, duration, action: actionObj });
				case 'primary':
				case 'neutral':
				default:
					return toast.info(title || '', { description, duration, action: actionObj });
			}
		},
		success: (title: string, description?: string) => toast.success(title, { description }),
		error: (title: string, description?: string) => toast.error(title, { description }),
		warning: (title: string, description?: string) => toast.warning(title, { description }),
		info: (title: string, description?: string) => toast.info(title, { description }),
		dismiss: (id?: number | string) => toast.dismiss(id)
	};
}
