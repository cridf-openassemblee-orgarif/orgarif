/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';
import { MainContainer } from '../container/MainContainer';
import { OrganismeInfos } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { ListOrganismesBySecteurRoute } from '../routing/routes';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { get, stringifyNominalString } from '../utils/nominal-class';

export const ListOrganismesBySecteurView = (props: {
  routeParams: ListOrganismesBySecteurRoute;
}) => {
  const [organismes, setOrganismes] = useState<OrganismeInfos[] | undefined>(
    undefined
  );
  const secteurById = useRecoilValue(state.secteursById);
  const secteur = get(secteurById, props.routeParams.secteurId);
  useEffect(() => {
    appContext
      .queryService()
      .listOrganismesBySecteurQuery({
        secteurId: props.routeParams.secteurId
      })
      .then(r => {
        setOrganismes(r.organismes);
      });
  }, [props.routeParams.secteurId]);
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
      <h1>{secteur.libelle}</h1>
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
            key={stringifyNominalString(o.id)}
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
