/** @jsxImportSource @emotion/react */
import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, ReactElement } from 'react';

interface TabPanelProps extends PropsWithChildren<{}> {
  label: string;
}

export const TabPanel = (props: TabPanelProps): ReactElement<TabPanelProps> => (
  <React.Fragment>{props.children}</React.Fragment>
);

export const TabsContainer = (props: PropsWithChildren<{}>) => {
  const tabs = Array.from(
    props.children as Iterable<ReactElement<TabPanelProps>>
  )
    // dans le cas d'une tab conditionnelle, on a un undefined dans les children
    .filter(t => !!t);
  const labels = tabs.map(n => n.props.label);
  const [containerValue, setContainerValue] = React.useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={containerValue}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setContainerValue(newValue)
          }
        >
          {labels.map((l, i) => (
            <Tab key={i} label={l} />
          ))}
        </Tabs>
      </Box>
      {tabs
        .filter((_, i) => containerValue === i)
        .map((c, i) => (
          <Box key={i} sx={{ p: 3 }}>
            {c}
          </Box>
        ))}
    </Box>
  );
};
