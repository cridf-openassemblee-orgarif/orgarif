/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import * as React from 'react';
import { appContext } from '../ApplicationContext';
import { OrganismeDto } from '../domain/organisme';
import * as breakpoint from '../styles/breakpoints';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

// TODO : dynamization
export const SingleOrganisme = () => {
  const [organisme, setOrganisme] = React.useState<OrganismeDto>();
  const id = 'c8c3972565c24bdcaeefc6414745ab11';

  React.useEffect(() => {
    appContext
      .queryService()
      //@ts-ignore
      .getOrganismeQuery({ id })
      .then(r => {
        setOrganisme(r.organisme);
      });
  }, [id]);

  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns: 1fr;

        @media (${breakpoint.LAPTOP}) {
          grid-template-columns: 51% 49%;
        }
      `}
    >
      {organisme && (
        <>
          <LeftPanel organisme={organisme} />
          <RightPanel organisme={organisme} />
        </>
      )}
    </Box>
  );
};
