/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { InstanceDto, RepresentationDto } from '../domain/organisme';
import { isTabletAndMore } from '../utils/viewport-utils';
import { SingleEmptyRepresentant } from './SingleEmptyRepresentant';
import { SingleRepresentant } from './SingleRepresentant';

export const Representants = (props: {
  reps: RepresentationDto[] | InstanceDto[];
  supp: boolean;
}) => {
  return (
    <Box
      css={css`
        padding: 1em 0em 0em 0.5em;
      `}
    >
      <Grid container spacing={1}>
        {props.reps.map((r: any, idx: number) => (
          <React.Fragment key={r.id}>
            {r.suppleance ? (
              <React.Fragment>
                <SingleRepresentant
                  representation={r}
                  isTitulaire
                  hasSuppleance={props.supp || r.suppleance}
                />
                {isTabletAndMore() && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    variant="middle"
                    css={css`
                      margin-right: -1px;
                    `}
                  />
                )}
                <SingleRepresentant
                  representation={r.suppleance}
                  hasSuppleance={props.supp || r.suppleance}
                />
                <Divider
                  orientation="horizontal"
                  css={css`
                    width: 100%;
                    padding: 0.5em 0em;
                    margin-bottom: ${props.reps.length - 1 > idx && '1em'};
                  `}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SingleRepresentant
                  representation={r}
                  isTitulaire
                  hasSuppleance={props.supp || r.suppleance}
                />
                {isTabletAndMore() && props.supp && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    variant="middle"
                    css={css`
                      margin-right: -1px;
                    `}
                  />
                )}
                {props.supp && <SingleEmptyRepresentant />}

                <Divider
                  orientation="horizontal"
                  css={css`
                    width: 100%;
                    padding: 0.5em 0em;
                    margin-bottom: ${props.reps.length - 1 > idx && '1em'};
                  `}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};
