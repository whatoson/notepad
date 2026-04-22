import { useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

interface Props {
  label: string;
  name: string;
  value?: string;
  error?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  placeholder?: string;
}

export function TextField({
  label,
  name,
  value,
  error,
  placeholder,
  autoComplete = "off",
}: Props) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel>{label}</FieldLabel>
      <Input
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
