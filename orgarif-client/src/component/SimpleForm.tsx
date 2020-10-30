/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { FormEvent } from 'react';

interface Props {
  onSubmit: (data: any) => void;
}

export class SimpleForm extends React.PureComponent<Props> {
  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as HTMLFormElement;
    const dto: any = {};
    Array.from(form.elements).forEach((e) => {
      if (e instanceof HTMLInputElement && e.type === 'text') {
        dto[e.name] = e.value;
      }
    });
    this.props.onSubmit(dto);
  };

  render() {
    return <form onSubmit={this.onSubmit}>{this.props.children}</form>;
  }
}
