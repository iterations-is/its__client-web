import { Field } from "./Field";

export const TypeResolver = ({ form, fieldData }) => {
  const { label, name, type, defaultValue } = fieldData;
  if (type === 'text') {
    return (
      <Field.Input label={label} name={name} form={form} type="text" defaultValue={defaultValue} />
    );
  }
  if (type === 'number') {
    return (
      <Field.Input
        label={label}
        name={name}
        form={form}
        type="number"
        defaultValue={defaultValue}
      />
    );
  }

  return <>Bad field</>;
};
