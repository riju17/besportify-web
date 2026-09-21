import { cloneElement, isValidElement, useId, type ReactElement } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { cx } from '@/lib/utils';

type FieldShellProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FieldShell({
  label,
  hint,
  error,
  children,
  className,
}: FieldShellProps) {
  const generatedId = useId();
  const child = isValidElement(children)
    ? (children as ReactElement<InputHTMLAttributes<HTMLInputElement>>)
    : null;
  const id = child?.props.id || generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [
      child?.props['aria-describedby'],
      hint ? hintId : null,
      error ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={cx('block space-y-2', className)}>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-white-100">
          {label}
        </label>
        {error ? (
          <span id={errorId} className="text-sm font-medium text-danger">
            {error}
          </span>
        ) : null}
      </div>
      {child
        ? cloneElement(child, {
            id,
            'aria-describedby': describedBy,
            'aria-invalid': error ? true : child.props['aria-invalid'],
          })
        : children}
      {hint ? (
        <p id={hintId} className="text-sm leading-6 text-grey-300">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  'w-full rounded-[0.75rem] border border-grey-300 bg-ink-900 px-4 py-3 text-base text-white-100 placeholder:text-grey-300 shadow-[0_1px_0_rgba(20,20,20,0.04)] transition duration-200 ease-out focus-visible:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none';

export function TextField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(controlClasses, props.className)} />;
}

export function TextAreaField(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cx(controlClasses, 'min-h-[10rem] resize-y', props.className)}
    />
  );
}

export function SelectField(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(controlClasses, props.className)} />;
}

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function CheckboxField({
  label,
  hint,
  className,
  ...props
}: CheckboxFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <label className="flex gap-3 rounded-[0.75rem] border border-slate-700 bg-slate-800/60 p-4">
      <input
        {...props}
        aria-describedby={
          [props['aria-describedby'], hint ? hintId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        aria-label={props['aria-label'] || label}
        className={cx(
          'mt-1 h-4 w-4 rounded border-slate-700 bg-ink-900 text-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          className,
        )}
        type="checkbox"
      />
      <span className="space-y-1">
        <span className="block text-sm font-semibold text-white-100">
          {label}
        </span>
        {hint ? (
          <span id={hintId} className="block text-sm leading-6 text-grey-300">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}
