/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FormEvent, PropsWithChildren, Ref } from 'react';

export const SimpleForm = (
  props: PropsWithChildren<{
    forwardRef?: Ref<HTMLFormElement>;
    onSubmit: (data: any) => void;
  }>
) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as HTMLFormElement;
    const dto: any = {};
    Array.from(form.elements).forEach((e) => {
      if (e instanceof HTMLInputElement && e.type === 'text') {
        dto[e.name] = e.value;
      }
    });
    props.onSubmit(dto);
  };

  return (
    <form ref={props.forwardRef} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};
