/** @jsxImportSource @emotion/react */
import { DeliberationId } from '../../generated/domain/Ids';
import {
  DeliberationDto,
  OrganismeDto
} from '../../generated/domain/Organisme';
import useEventListener from '../../hooks/useEventListener';
import { isMobile } from '../../utils/viewport-utils';
import { HistoryItem } from '../root/singleOrganisme/HistoryItem';
import { breakpoints } from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

// TODO: complete dynamization once last updated date is available
export const RightPanel = (props: { organisme: OrganismeDto }) => {
  const [value, setValue] = useState(0);
  const [yearInView, setYearInview] = useState('');
  const [scrolling, setScrolling] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Flattening deliberations from organisme and instances
  const orgDelibs = props.organisme.lienDeliberations;
  const instancesDelibs = props.organisme.instances
    .map(i => i.lienDeliberations)
    .flat();
  const allDelibs = [orgDelibs, instancesDelibs].flat();

  // grouping deliberations per year to be able to properly sort the deliberations per year + adding property color to style the avatar
  const deliberationsByYear = Object.entries(
    allDelibs.reduce((r: any, a: any) => {
      r[a.deliberation.deliberationDate.substring(0, 4)] =
        r[a.deliberation.deliberationDate.substring(0, 4)] || [];

      if (r[a.deliberation.deliberationDate.substring(0, 4)].length === 0) {
        a.color = colors.dark;
      } else {
        a.color = colors.white;
      }
      r[a.deliberation.deliberationDate.substring(0, 4)].push(a);
      return r;
    }, Object.create(null))
  ).sort((a: any, b: any) => b[0] - a[0]);

  // basic logic to handle side chips displaying yearly delibs to update their background color when they enter the viewport
  useEffect(() => {
    setYearInview(
      Math.max
        .apply(0, deliberationsByYear.map((item: any) => item[0]).map(Number))
        .toString()
    );
  }, [deliberationsByYear]);
  useEventListener('wheel', () => {
    setScrolling(true);
  });

  const CustomRadio = (value: number) =>
    value === 0 ? (
      <Radio
        checked={true}
        value="Historique"
        name="radio-button"
        inputProps={{ 'aria-label': 'Historique' }}
        css={css`
          padding-top: 0.3em;
          > span {
            color: ${colors.white};
            > svg {
              font-size: 1em;
            }
          }
        `}
      />
    ) : (
      <Radio
        checked={false}
        value="Instance"
        name="radio-button"
        inputProps={{ 'aria-label': 'Instance' }}
        css={css`
          padding-top: 0.3em;
          > span {
            color: ${colors.white};
            > svg {
              font-size: 1em;
            }
          }
        `}
      />
    );

  return (
    <Box
      css={css`
        background-color: ${colors.dark};
        color: ${colors.white};
        padding: 1em 1em 10em;
        overflow-y: hidden;

        @media (${breakpoints.LAPTOP}) {
          height: 99vh;
          padding: 1em 2vw 3em;
          overflow-y: auto;
        }
      `}
    >
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid ${colors.white};
          margin-bottom: 2em;
        `}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <StyledTab
            icon={CustomRadio(value)}
            iconPosition="end"
            label="Historique"
            css={css`
              font-size: clamp(1.5em, 2.4vw, 36px);
            `}
          />
        </Tabs>
        <Box>
          <Typography variant={isMobile() ? 'caption' : 'body2'}>
            DERNIÈRE MISE À JOUR
          </Typography>
          <Typography variant="body2">LE 26/03/21</Typography>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        {allDelibs.length === 0 && (
          <Typography variant="h5" mt={1}>
            Aucune délibération pour l'instant
          </Typography>
        )}

        {allDelibs.length > 0 &&
          deliberationsByYear.map((yearlyDelib: any, i: number) => {
            return yearlyDelib[1].map((d: any, idx: any) => (
              <InView
                as="div"
                key={d.id}
                threshold={0.8}
                onChange={inView => {
                  scrolling &&
                    setYearInview(prevState =>
                      inView ? yearlyDelib[0] : prevState
                    );
                }}
              >
                <HistoryItem
                  delib={d}
                  yearlyDelib={yearlyDelib}
                  lastItem={
                    deliberationsByYear.length > 1
                      ? deliberationsByYear.length - 1 === i
                      : yearlyDelib[1].length - 1 === idx
                  }
                />
              </InView>
            ));
          })}
        {allDelibs.length > 1 && (
          <div
            css={css`
              display: none;

              @media (min-width: 1170px) {
                position: fixed;
                width: 60px;
                height: fit-content;
                right: 25px;
                top: 45%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            `}
          >
            {deliberationsByYear.map((yearlyDelib: any) => {
              const [year, delibs] = yearlyDelib;

              return (
                <React.Fragment key={delibs[0].id}>
                  <Chip
                    label={year}
                    size="small"
                    css={css`
                      background-color: ${year === yearInView
                        ? colors.white
                        : colors.dark};
                      margin-top: 0.3em;
                      margin-bottom: 0.3em;
                      color: ${year === yearInView
                        ? colors.dark
                        : colors.white};
                      border: 1px solid white;
                    `}
                  />
                  {delibs.map(
                    (d: {
                      id: DeliberationId;
                      deliberation: DeliberationDto;
                      comment?: string;
                      color?: string;
                    }) => (
                      <div
                        key={d.id}
                        css={css`
                          width: 0.5em;
                          height: 0.5em;
                          background-color: ${colors.white};
                          border-radius: 5em;
                          margin: 0.25em;
                        `}
                      ></div>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </TabPanel>
    </Box>
  );
};

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 'clamp(20px, 2em, 2vw);',
  '&:first-of-type': {
    marginLeft: '-1rem'
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
