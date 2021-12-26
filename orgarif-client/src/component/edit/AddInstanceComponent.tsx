/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import { SimpleForm } from '../base-component/SimpleForm';
import { TextInput } from '../base-component/TextInput';

export const AddInstanceComponent = (props: {
  addInstance: (nom: string) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          flex: 25%;
          font-size: 1rem;
          text-align: right;
          padding: 19px 10px 0 0;
        `}
      >
        Ajouter une instance
      </div>
      <div
        css={css`
          flex: 75%;
          padding: 8px 6px 0 4px;
        `}
      >
        <SimpleForm
          forwardRef={formRef}
          onSubmit={e => {
            props.addInstance(e.nom);
          }}
        >
          <TextInput name="nom" label="Nouvelle instance" />
        </SimpleForm>
      </div>
    </div>
  );
};
