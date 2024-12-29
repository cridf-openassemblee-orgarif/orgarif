/** @jsxImportSource @emotion/react */
import {
  AdminUpdateSessions,
  CommandResponse
} from '../../generated/command/Commands.generated';
import { RequestError } from '../../generated/error/Exceptions.generated';
import { appContext } from '../../services/ApplicationContext';
import { MainContainer } from '../containers/MainContainer';
import { css } from '@emotion/react';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useRef, useState } from 'react';

const sampleAdminUpdateSessions: AdminUpdateSessions = {
  objectType: 'AdminUpdateSessions'
};

/** Should explain data in the response */
const docResponse = (response: CommandResponse) => {
  const objectType = response.objectType;
  switch (objectType) {
    default:
      return <>Résultat :</>;
  }
};

export const AdminManualCommandView = () => {
  const commandTextArea = useRef<HTMLTextAreaElement | null>(null);
  const [previousSubmitedValue, setPreviousSubmitedValue] = useState<string>();
  const [okCommandCount, setOkCommandCount] = useState<number>();
  const [totalCommandCount, setTotalCommandCount] = useState<number>();
  const [commandResults, setCommandResults] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleCommand = async () => {
    const textCommand = commandTextArea.current?.value;
    if (!textCommand) {
      enqueueSnackbar('No command.', {
        variant: 'error'
      });
      return;
    }
    if (textCommand === previousSubmitedValue) {
      enqueueSnackbar('Command already handled.', {
        variant: 'error'
      });
      return;
    }
    let command;
    try {
      command = JSON.parse(textCommand);
    } catch (e) {
      enqueueSnackbar('Invalid JSON.', {
        variant: 'error'
      });
      return;
    }
    const commands = [];
    if (!Array.isArray(command)) {
      commands.push(command);
    } else {
      command.forEach(c => commands.push(c));
    }
    setPreviousSubmitedValue(textCommand);
    setTotalCommandCount(commands.length);
    let okCommands = 0;
    setOkCommandCount(okCommands);
    let results: any[] = [];
    setCommandResults(results);
    // commands.forEach will send all commands at the same time
    commands.forEach(async c => {
      await appContext.httpService
        .post('/command', c)
        .then(r => {
          okCommands++;
          setOkCommandCount(okCommands);
          results = [...results, r.body];
          setCommandResults(results);
        })
        .catch((e: RequestError) =>
          enqueueSnackbar('Server error : ' + e.id, {
            variant: 'error'
          })
        );
    });
  };

  return (
    <MainContainer>
      <div
        css={css`
          display: flex;

          & > div {
            margin: 0 5px;
          }

          pre {
            padding: 10px;
            color: #333;
            word-break: break-all;
            word-wrap: break-word;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          h3 {
            font-size: 1.1rem;
          }
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <h1>Command :</h1>
          <textarea
            ref={commandTextArea}
            rows={16}
            css={css`
              width: 100%;
            `}
          />
          <br />
          <button onClick={handleCommand}>handleCommand</button>
          {okCommandCount !== undefined && totalCommandCount !== undefined && (
            <p
              css={css`
                font-weight: bold;
              `}
            >
              {okCommandCount} / {totalCommandCount} ok
            </p>
          )}
          {commandResults.map((r, i) => (
            <p key={i}>
              <h3>{docResponse(r)}</h3>
              <pre>{JSON.stringify(r, null, 2)}</pre>
            </p>
          ))}
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <h2>Commands</h2>
          <h3>Update sessions</h3>
          <pre>{JSON.stringify(sampleAdminUpdateSessions, null, 2)}</pre>
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <h2>"Batch" commands</h2>
          <p>
            Commands can be sent in group (they are sent & handled one by one to
            the backend)
          </p>
          <pre>
            {JSON.stringify(
              [sampleAdminUpdateSessions, sampleAdminUpdateSessions],
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </MainContainer>
  );
};
