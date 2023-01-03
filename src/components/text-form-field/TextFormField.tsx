import { FieldProps, getIn } from 'formik';
import type { FC } from 'react';

interface TextFormFieldProps extends FieldProps {
	label: string;
}

const TextFormField: FC<TextFormFieldProps> = ({
	field,
	form,
	label,
	...props
}) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	return (
		<>
			<div className="flex flex-col gap-1">
				<label
					className="text-sm font-medium text-[#A1A0AB]"
					htmlFor={field.name}
				>
					{label}
				</label>
				<input
					className={`${
						errorText ? '!border border-red-600 ' : ''
					}border rounded-md border-[#211F2D] bg-primary py-2 px-3 text-[#abb2bf] outline-none`}
					id={field.name}
					{...field}
					{...props}
				/>
				<p className="text-sm text-red-600">{errorText}</p>
			</div>
		</>
	);
};

export default TextFormField;
