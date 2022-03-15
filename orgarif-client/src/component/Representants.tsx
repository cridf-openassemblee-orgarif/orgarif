/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { isTabletAndMore } from '../utils/viewport-utils';
import { SingleEmptyRepresentant } from './SingleEmptyRepresentant';
import { SingleRepresentant } from './SingleRepresentant';

// TODO: dynamization
export const Representants = ({ reps, type }: any) => {
  let ListOfReps: React.ReactElement;
  if (type === 'ag') {
    ListOfReps = (
      <Grid container spacing={1}>
        {reps.map((r: any, idx: number) => (
          <React.Fragment key={r.id}>
            <SingleRepresentant representant={r} type={type} />
            {isTabletAndMore() && (
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
                style={{ marginRight: '-1px' }}
              />
            )}
            {r.suppleant && Object.values(r.suppleant)[0] !== '' ? (
              <React.Fragment>
                <SingleRepresentant
                  representant={r.suppleant}
                  type={type}
                  suppleant
                />

                <Divider
                  orientation="horizontal"
                  css={css`
                    width: 100%;
                    padding: 0.5em 0em;
                    margin-bottom: ${reps.length - 1 > idx && '1em'};
                  `}
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={r.id}>
                <SingleEmptyRepresentant />
                <Divider
                  orientation="horizontal"
                  css={css`
                    width: 100%;
                    padding: 0.5em 0em;
                    margin-bottom: ${reps.length - 1 > idx && '1em'};
                  `}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </Grid>
    );
  } else {
    ListOfReps = (
      <Grid container spacing={1}>
        {reps.map((r: any, idx: number) => (
          <React.Fragment key={r.id}>
            <SingleRepresentant representant={r} type={type} />
            <Divider
              orientation="horizontal"
              css={css`
                width: 100%;
                padding: 0.5em 0em;
                margin-bottom: ${reps.length - 1 > idx && '1em'};
              `}
            />
          </React.Fragment>
        ))}
      </Grid>
    );
  }

  return (
    <Box
      css={css`
        padding: 1em 0em 1em 0.5em;
      `}
    >
      {ListOfReps}
    </Box>
  );
};
