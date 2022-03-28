/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CircularProgress } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Check, Error } from '@mui/icons-material';
import { UploadResult } from '../../services/UploadService';
import { assertUnreachable } from '../../utils';
import { colors } from '../../styles/colors';

const isError = (result: UploadResult['result'] | undefined) => {
  switch (result) {
    case 'successed':
    case undefined:
      return false;
    case 'failed':
    case 'file too big':
      return true;
    default:
      assertUnreachable(result);
  }
};
export const FileUploadResultComponent = (props: {
  filename: string;
  result: Promise<UploadResult>;
}) => {
  const [uploadResult, setUploadResult] = useState<UploadResult>();
  useEffect(() => {
    props.result.then(setUploadResult);
  }, [props.result]);
  const result = uploadResult?.result;
  return (
    <div
      css={css`
        color: ${isError(result) ? colors.errorRed : colors.grey};
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          padding-top: 4px;
        `}
      >
        {props.filename}
      </div>
      <div>
        {(() => {
          switch (result) {
            case 'successed':
              return (
                <Check
                  css={css`
                    color: ${colors.dragableMoving};
                  `}
                />
              );
            case 'failed':
            case 'file too big':
              return (
                <div
                  css={css`
                    font-weight: bold;
                    text-align: right;
                  `}
                >
                  <Error />
                  <br />
                  <span
                    css={css`
                      font-size: 0.8rem;
                      top: -0.3rem;
                    `}
                  >
                    {result === 'failed' && <>Échec de l'envoi</>}
                    {result === 'file too big' && (
                      <>Fichier trop gros (10Mo max)</>
                    )}
                  </span>
                </div>
              );
            case undefined:
              return (
                <CircularProgress
                  size={18}
                  css={css`
                    color: ${colors.grey};
                  `}
                />
              );
            default:
              assertUnreachable(result);
          }
        })()}
      </div>
    </div>
  );
};
