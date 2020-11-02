/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { stringifyNominalString } from '../domain/nominal-class';
import { state } from '../state/state';

export const ListOrganismesView = () => {
  const [organismes, setOrganismes] = useRecoilState(state.organismes);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    appContext
      .actions()
      .listOrganismes()
      .then((r) => {
        setOrganismes(r.organismes);
        setIsLoading(false);
      });
  }, []);
  return (
    <MainContainer>
      Liste des organismes
      {isLoading && <div>Mise à jour de la liste</div>}
      {organismes.map((o) => (
        <div key={stringifyNominalString(o.id)}>{o.nom}</div>
      ))}
    </MainContainer>
  );
};
