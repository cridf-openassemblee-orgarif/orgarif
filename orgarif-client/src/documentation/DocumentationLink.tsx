/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useState } from 'react';
import { colors } from '../styles/colors';
import {
  DocumentationHeadline,
  documentationHeadlines
} from './documentation-headlines';

const useStyles = makeStyles(() => ({
  paper: { minWidth: '80%', minHeight: '80%' }
}));

// no cache, re-download à chaque fois, on pourrait utiliser hash git mais pas bien grave
const random = Math.random();

export const DocumentationLink = (props: {
  documentationHealine?: DocumentationHeadline;
}) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const onClose = () => setDisplay(false);
  const [headline, setHeadline] = useState<DocumentationHeadline | undefined>(
    props.documentationHealine
  );
  const iframeSrc =
    '/static/Documentation%20Siger/DocumentationSiger.html?' +
    random +
    (headline ? '#' + headline.id : '');
  return (
    <>
      <div onClick={() => setDisplay(true)}>doc</div>
      <Dialog
        open={display}
        onClose={onClose}
        fullWidth={true}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle>Documentation</DialogTitle>
        <DialogContent
          css={css`
            display: table;
            height: 100%;
          `}
        >
          <div
            css={css`
              display: flex;
              height: 100%;
            `}
          >
            <div
              css={css`
                width: 25%;
              `}
            >
              {Object.values(documentationHeadlines).map(h => (
                <div
                  onClick={() => setHeadline(h)}
                  css={css`
                    cursor: pointer;
                    padding: 10px 0;
                    padding-left: ${h.level * 10}px;
                    font-size: ${1.2 - h.level / 20}rem;
                  `}
                >
                  {h.label}
                </div>
              ))}
            </div>
            <div
              css={css`
                width: 75%;
              `}
            >
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                frameBorder={0}
                css={css`
                  border: 1px solid ${colors.grey2};
                  display: table-cell;
                  height: 100%;
                `}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
