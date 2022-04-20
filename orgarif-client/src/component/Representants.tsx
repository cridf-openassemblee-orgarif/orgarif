/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { DesignationDto } from '../domain/organisme';
import * as breakpoint from '../styles/breakpoints';
import { asString } from '../utils/nominal-class';
import { SingleEmptyRepresentant } from './SingleEmptyRepresentant';
import { SingleRepresentant } from './SingleRepresentant';

export const Representants = (props: {
  reps: (DesignationDto | undefined)[];
  supps: (DesignationDto | undefined)[];
  hasSuppleance: boolean;
}) => {
  const designations: {
    representant: DesignationDto | undefined;
    suppleant: DesignationDto | undefined;
  }[] = [];
  for (let i = 0; i < props.reps.length || i < props.supps.length; i++) {
    designations.push({
      representant: props.reps[i],
      suppleant: props.supps[i]
    });
  }

  return (
    <Box
      css={css`
        padding: 1em 0em 0em;
        display: flex;
        justify-content: space-around;
        margin-bottom: 1em;
        flex-direction: column;

        @media (${breakpoint.LAPTOP}) {
          flex-direction: row;
        }
      `}
    >
      {props.hasSuppleance || props.supps.length > 0 ? (
        <>
          <Box
            css={css`
              width: 100%;
            `}
          >
            <Grid direction="column" container>
              {designations.map((rep, index) =>
                rep.representant !== undefined ? (
                  <Grid item key={asString(rep.representant.id)}>
                    <SingleRepresentant
                      representation={rep.representant}
                      isTitulaire
                      hasSuppleance={props.hasSuppleance}
                    />
                    {designations.length - 1 > index && (
                      <Divider
                        orientation="horizontal"
                        css={css`
                          width: 100%;
                          padding: 0.5em 0em;
                          margin-bottom: 1em;
                        `}
                      />
                    )}
                  </Grid>
                ) : (
                  <Grid item key={index}>
                    <SingleEmptyRepresentant
                      hasSuppleance={props.hasSuppleance}
                    />
                    {designations.length - 1 > index && (
                      <Divider
                        orientation="horizontal"
                        css={css`
                          width: 100%;
                          padding: 0.5em 0em;
                          margin-bottom: 1em;
                        `}
                      />
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </Box>
          <Box
            css={css`
              width: 100%;
            `}
          >
            <Grid direction="column" container>
              {designations.map((rep, index) =>
                props.hasSuppleance && rep.suppleant !== undefined ? (
                  <Grid item key={asString(rep.suppleant.id)}>
                    <SingleRepresentant
                      representation={rep.suppleant}
                      hasSuppleance={props.hasSuppleance}
                    />
                    {designations.length - 1 > index && (
                      <Divider
                        orientation="horizontal"
                        css={css`
                          width: 100%;
                          padding: 0.5em 0em;
                          margin-bottom: 1em;
                        `}
                      />
                    )}
                  </Grid>
                ) : (
                  <Grid item key={index}>
                    <SingleEmptyRepresentant />
                    {designations.length - 1 > index && (
                      <Divider
                        orientation="horizontal"
                        css={css`
                          width: 100%;
                          padding: 0.5em 0em;
                          margin-bottom: 1em;
                        `}
                      />
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </>
      ) : (
        <Box
          css={css`
            width: 100%;
          `}
        >
          <Grid direction="column" container>
            {designations.map((rep, index) =>
              rep.representant !== undefined ? (
                <Grid item key={asString(rep.representant.id)}>
                  <SingleRepresentant
                    representation={rep.representant}
                    isTitulaire
                    hasSuppleance={props.hasSuppleance}
                  />
                  {designations.length - 1 > index && (
                    <Divider
                      orientation="horizontal"
                      css={css`
                        width: 100%;
                        padding: 0.5em 0em;
                        margin-bottom: 1em;
                      `}
                    />
                  )}
                </Grid>
              ) : (
                <Grid item key={index}>
                  <SingleEmptyRepresentant
                    hasSuppleance={props.hasSuppleance}
                  />
                  {designations.length - 1 > index && (
                    <Divider
                      orientation="horizontal"
                      css={css`
                        width: 100%;
                        padding: 0.5em 0em;
                        margin-bottom: 1em;
                      `}
                    />
                  )}
                </Grid>
              )
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
