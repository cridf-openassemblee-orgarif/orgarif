/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';
import { MainContainer } from '../container/MainContainer';
import { OrganismeListDto } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/colors';
import { asString } from '../utils/nominal-class';

export const ListOrganismesView = () => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[] | undefined>(
    undefined
  );
  useEffect(() => {
    appContext
      .queryService()
      .listOrganismesQuery()
      .then(r => {
        setOrganismes(r.organismes);
      });
  }, []);
  const newOrganismeOnSubmit = (dto: { nom: string }) => {
    if (dto.nom !== '') {
      appContext
        .commandService()
        .createOrganismeCommand(dto)
        .then(r => {
          appContext.applicationHistory().goTo({
            name: 'EditOrganismeRoute',
            id: r.id
          });
        });
    }
  };
  return (
    <MainContainer>
      <h1>Liste des organismes</h1>
      <SimpleForm onSubmit={newOrganismeOnSubmit}>
        <TextInput name="nom" label="Nouvel organisme" />
        <Button type="submit" color="primary">
          ok
        </Button>
      </SimpleForm>
      {!organismes && <div>Chargement...</div>}
      {organismes &&
        organismes.map(o => (
          <div
            key={asString(o.id)}
            css={css`
              background: ${colors.clearGrey};
              margin: 2px 0;
              padding: 4px;
            `}
          >
            <h2>{o.nom}</h2>
            {/*<RouteLink route={{ name: 'OrganismeRoute', id: o.id }}>*/}
            {/*  view*/}
            {/*</RouteLink>*/}
            {/*<br />*/}
            <RouteLink route={{ name: 'EditOrganismeRoute', id: o.id }}>
              Éditer
            </RouteLink>
          </div>
        ))}
    </MainContainer>
  );
};
