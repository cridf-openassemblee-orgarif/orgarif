/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/SimpleForm';
import { TextInput } from '../component/TextInput';
import { MainContainer } from '../container/MainContainer';
import { stringifyNominalString } from '../domain/nominal-class';
import { OrganismeInfos } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/vars';

export const ListOrganismesView = () => {
  const [organismes, setOrganismes] = useState<OrganismeInfos[] | undefined>(
    undefined
  );
  useEffect(() => {
    appContext
      .queryService()
      .listOrganismesQuery()
      .then((r) => {
        setOrganismes(r.organismes);
      });
  }, []);
  const newOrganismeOnSubmit = (dto: { nom: string }) => {
    appContext
      .commandService()
      .createOrganismeCommand(dto)
      .then((r) => {
        appContext.applicationHistory().goTo({
          name: 'EditOrganismeRoute',
          id: r.id,
        });
      });
  };
  return (
    <MainContainer>
      <h1>Liste des organismes</h1>
      {!organismes && <div>Chargement...</div>}
      <SimpleForm onSubmit={newOrganismeOnSubmit}>
        <TextInput
          name={'nom'}
          label="Nouvel organisme"
          onChange={() => {}}
          initialValue=""
        />
        <button>ok</button>
      </SimpleForm>
      {organismes &&
        organismes.map((o) => (
          <div
            key={stringifyNominalString(o.id)}
            css={css`
              background: ${colors.clearGrey};
              margin: 2px 0;
              padding: 4px;
            `}
          >
            <h2>{o.nom}</h2>
            <RouteLink route={{ name: 'EditOrganismeRoute', id: o.id }}>
              edit
            </RouteLink>
          </div>
        ))}
    </MainContainer>
  );
};
