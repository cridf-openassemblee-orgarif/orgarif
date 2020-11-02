/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { stringifyNominalString } from '../domain/nominal-class';
import { state } from '../state/state';

export const ListOrganismesView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const organismesQueryInfos = appContext.queryService().listOrganismesQuery();
  // FIXMENOW pas ouf
  if (!organismesQueryInfos.data) {
    return <div>Loading</div>;
  }
  return (
    <MainContainer>
      Ma belle liste d'organismes
      {organismesQueryInfos.data.organismes.map((o) => (
        <div key={stringifyNominalString(o.id)}>{o.nom}</div>
      ))}
    </MainContainer>
  );
};
