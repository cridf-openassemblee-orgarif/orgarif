/** @jsxImportSource @emotion/react */
import { clientUid } from '../../utils';
import { pipe } from '../../utils/Pipe';
import { NominalString } from '../../utils/nominal-class';
import { css } from '@emotion/react';
import { FileCopy } from '@mui/icons-material';
import { useRef, useState } from 'react';

const uuidClass = 'uuidClass-' + clientUid();
const copyContainerClass = 'copyContainer-' + clientUid();
const iconWidth = 40;

export const CopyContentWidget = (props: {
  text: string | NominalString<any>;
  limitChars?: number;
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [copyEffectId, setCopyEffectId] = useState(clientUid());

  const onCopyClick = () => {
    inputElement.current!.focus();
    inputElement.current!.select();
    document.execCommand('copy');
    setCopyEffectId(clientUid());
  };
  const display = pipe(props.text)
    .map(d => (props.limitChars ? d.substring(0, props.limitChars) : d))
    .unwrap();
  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
        cursor: pointer;
        &:hover {
          .${uuidClass} {
            opacity: 0.25;
          }

          .${copyContainerClass} {
            opacity: 1;
          }
        }
      `}
      onClick={onCopyClick}
    >
      <div
        css={css`
          // [doc] sans css de cette div + input, bugs graphiques au select dans onCopyClick()
          opacity: 0;
          overflow: hidden;
        `}
      >
        <input
          css={css`
            position: absolute;
          `}
          ref={inputElement}
          value={props.text}
          readOnly
        />
      </div>
      <span className={uuidClass}>{display}</span>
      <span
        css={css`
          position: absolute;
          top: -4px;
          left: 50%;
          width: ${iconWidth}px;
          height: 28px;
          text-align: center;
          margin-left: -${iconWidth / 2}px;
          padding: 5px;
          opacity: 0;
        `}
        className={copyContainerClass}
      >
        <FileCopy
          key={copyEffectId}
          css={css`
            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }
            opacity: 0;
            animation: fadeIn 0.8s ease forwards;
            font-size: 20px;
          `}
        />
      </span>
    </div>
  );
};
