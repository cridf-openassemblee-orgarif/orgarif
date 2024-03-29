/** @jsxImportSource @emotion/react */
import { DeliberationId } from '../../../generated/domain/Ids';
import { DeliberationDto } from '../../../generated/domain/Organisme';
import { formatLocaleDate } from '../../../simple-fr';
import { breakpoints } from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { Avatar, Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useRef } from 'react';

interface HistoryItemProps {
  delib: {
    id: DeliberationId;
    deliberation: DeliberationDto;
    comment?: string;
    color?: string;
  };
  yearlyDelib: string[];
  lastItem: boolean;
}

export const HistoryItem = ({
  delib,
  yearlyDelib,
  lastItem
}: HistoryItemProps) => {
  const TextContentRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      css={css`
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: auto 1fr;
        gap: 0.5em;
        padding: 0 5vw 0 0;
        margin-bottom: 1em;

        @media (${breakpoints.TABLET}) {
          padding: 0 5vw 0 1vw;
          gap: 1em;
        }
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
          margin-right: 0;
          position: relative;

          @media (${breakpoints.LAPTOP_L}) {
            margin-right: clamp(1em, 1.4vw, 1.6rem);
          }

          // FIXME : hacky solution to hide after element on last item
          ::after {
            content: '';
            position: absolute;
            ${TextContentRef.current
              ? `height: ${
                  TextContentRef.current.getBoundingClientRect().height + 200
                }px;`
              : `height: 50vh;`}

            top: 50%;
            left: 50%;
            z-index: 0;
            ${lastItem
              ? `border: 0.5px solid ${colors.dark};`
              : `border: 0.5px solid ${colors.white};`}
          }
        `}
      >
        <Avatar
          css={css`
            width: 2.5em;
            height: 2.5em;
            background-color: ${delib.color};
            border-color: ${colors.white};
            font-weight: 600;
            color: ${colors.white};
            z-index: 1;
            font-size: 0.8em;
            padding: 1.75em;

            @media (${breakpoints.TABLET}) {
              width: 4em;
              height: 4em;
              font-size: 1.2em;
            }
          `}
        >
          {yearlyDelib[0]}
        </Avatar>
      </Box>
      <Box
        css={css`
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          justify-content: center;
          grid-column: 2/5;

          @media (${breakpoints.MOBILE_L}) {
            flex-wrap: nowrap;
            justify-content: space-between;
          }
        `}
      >
        <Chip
          variant="outlined"
          label={delib.deliberation.libelle}
          size="small"
          css={css`
            color: ${colors.white};
            width: fit-content;
            margin-bottom: 0.5em;

            @media (${breakpoints.TABLET}) {
              margin-bottom: 0;
            }
          `}
        />
        <Chip
          variant="outlined"
          label={formatLocaleDate(delib.deliberation.deliberationDate)}
          size="small"
          css={css`
            color: ${colors.white};
            width: fit-content;
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
            text-align: justify;
            color: ${colors.white};
            border-bottom: 1px solid ${colors.white};
            padding-bottom: 1em;
          `}
        >
          {delib.comment}
        </Typography>
      </Box>
    </Box>
  );
};
