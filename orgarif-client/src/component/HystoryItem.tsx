/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { colors } from '../styles/colors';

// TODO : typing props
export const HystoryItem = ({ delib, yearlyDelib }: any) => {
  const TextContentRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      css={css`
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: repeat(1fr);
        grid-template-rows: repeat(2, fit-content);
        gap: 1em;
        padding: 0 5vw 0 1vw;
        margin-bottom: 1em;
      `}
      ref={TextContentRef}
    >
      <Box
        css={css`
          grid-column: 1;
          grid-row: 1/3;
          align-self: center;
          border-radius: 5em;
          border: 1px solid ${colors.white};
          margin-right: clamp(1em, 1.4vw, 1.6rem);

          // FIXME : find solution for not adding after element on last item
          ::after {
            content: '';
            position: absolute;
            border: 0.5px solid ${colors.white};
            ${TextContentRef.current
              ? `height: ${
                  TextContentRef.current.getBoundingClientRect().height + 100
                }px;`
              : `height: 50vh;`}

            top: 50%;
            left: 50%;
            z-index: 0;
          }
        `}
      >
        <Avatar
          css={css`
            width: 4em;
            height: 4em;
            background-color: ${delib.color};
            border-color: ${colors.white};
            font-weight: 600;
            color: ${colors.white};
            z-index: 1;
          `}
        >
          {yearlyDelib[0]}
        </Avatar>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={delib.title}
          size="small"
          css={css`
            color: ${colors.white};
          `}
        />
      </Box>
      <Box
        css={css`
          justify-self: center;
        `}
      >
        <Chip
          label={delib.type.toUpperCase()}
          size="small"
          css={css`
            background-color: ${colors.white};
            color: ${colors.dark};
          `}
        />
      </Box>
      <Box
        css={css`
          justify-self: flex-end;
        `}
      >
        <Chip
          variant="outlined"
          label={delib.date}
          size="small"
          css={css`
            color: ${colors.white};
          `}
        />
      </Box>
      <Box
        css={css`
          grid-column: 2 / 5;
          grid-row: 2 / 3;
        `}
      >
        <Typography
          variant="body1"
          gutterBottom
          component="div"
          css={css`
            font-size: clamp(16px, 1.1vw, 1.6rem);
            line-height: 1.3em;
            text-align: left;
            color: ${colors.white};
            border-bottom: 1px solid ${colors.white};
            padding-bottom: 1em;
          `}
        >
          {delib.content}
        </Typography>
      </Box>
    </Box>
  );
};
