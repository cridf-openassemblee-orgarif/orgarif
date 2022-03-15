/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { InView } from 'react-intersection-observer';
import { deliberations } from '../data/deliberation';
import * as breakpoint from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { HystoryItem } from './HystoryItem';

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

function TabPanel(props: TabPanelProps) {
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
}

// TODO: dynamization
export const RightPanel = () => {
  const [value, setValue] = React.useState(0);
  const [yearInView, setYearInview] = React.useState('2021');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // grouping deliberations per year to be able to properly sorting the items by year + adding property color to style the avatar
  const deliberationsByYear = Object.entries(
    deliberations.reduce((r: any, a: any) => {
      r[a.year] = r[a.year] || [];

      if (r[a.year].length === 0) {
        a.color = colors.dark;
      } else {
        a.color = colors.white;
      }
      r[a.year].push(a);
      return r;
    }, Object.create(null))
  ).sort((a: any, b: any) => b[0] - a[0]);

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
        padding: 1em 1em 3em;

        @media (${breakpoint.LAPTOP}) {
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
          onChange={handleChange}
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
          {/* // NOTE : Disabling tabs for now */}
          {/* <StyledTab
            icon={CustomRadio(value - 1)}
            iconPosition="end"
            label="Instance"
          /> */}
        </Tabs>
        <Box>
          <Typography variant="body2">DERNIÈRE MISE À JOUR</Typography>
          <Typography variant="body2">LE 26/03/21</Typography>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        {deliberationsByYear.map((yearlyDelib: any, i: any) => {
          return yearlyDelib[1].map((d: any, idx: any) => (
            <InView
              as="div"
              key={d.title}
              threshold={1}
              onChange={(inView, entry) => {
                setYearInview(prevState =>
                  inView ? yearlyDelib[0] : prevState
                );
              }}
            >
              <HystoryItem
                delib={d}
                yearlyDelib={yearlyDelib}
                lastItem={deliberations.length - 1 === idx && 'last'}
              />
            </InView>
          ));
        })}
        <div
          css={css`
            display: none;

            @media (${breakpoint.LAPTOP}) {
              position: fixed;
              width: 60px;
              height: fit-content;
              right: 30px;
              top: 40%;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          `}
        >
          {deliberationsByYear.map((yearlyDelib: any) => {
            const [year, delibs] = yearlyDelib;

            return (
              <React.Fragment key={year}>
                <Chip
                  label={year}
                  size="small"
                  css={css`
                    background-color: ${year === yearInView
                      ? colors.white
                      : colors.dark};
                    margin-top: 0.3em;
                    margin-bottom: 0.3em;
                    color: ${year === yearInView ? colors.dark : colors.white};
                    border: 1px solid white;
                  `}
                />
                {delibs.map((i: any) => (
                  <div
                    key={i.title}
                    css={css`
                      width: 0.5em;
                      height: 0.5em;
                      background-color: ${colors.white};
                      border-radius: 5em;
                      margin: 0.25em;
                    `}
                  ></div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </TabPanel>

      {/* 
      // NOTE : Disabling tabs for now 
      <TabPanel value={value} index={1}>
        Instance
      </TabPanel> */}
    </Box>
  );
};
