/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Add, CloudUpload } from '@mui/icons-material';
import { FileUploadResultComponent } from './FileUploadResultComponent';
import { appContext } from '../../ApplicationContext';
import { UploadResult } from '../../services/UploadService';
import { LoadingState } from '../../interfaces';
import { colors } from '../../styles/colors';
import { LoadingStateButton } from './LoadingButton';

const preventDragDefault = (event: React.DragEvent<HTMLDivElement>) => {
  // see https://www.html5rocks.com/en/tutorials/dnd/basics/
  // https://css-tricks.com/drag-and-drop-file-uploading/
  event.preventDefault(); // Stops some browsers from redirecting.
  event.stopPropagation();
};

const dragProps = (
  handleFileList: (fileList: FileList) => void,
  setDragInProgress: (dragInProgress: boolean) => void
) => {
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(event);
    setDragInProgress(false);
    handleFileList(event.dataTransfer.files);
  };

  const onDragInProgress = (event: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(event);
    setDragInProgress(true);
  };

  const onDragFinished = (event: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(event);
    setDragInProgress(false);
  };

  return {
    onDrop,
    onDragEnter: onDragInProgress,
    onDragOver: onDragInProgress,
    onDragEnd: onDragFinished,
    onDragLeave: onDragFinished,
    onDrag: preventDragDefault,
    onDragStart: preventDragDefault,
    onDragExit: preventDragDefault
  };
};

export const FileDropZone = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragInProgress, setDragInProgress] = useState(false);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [uploadResults, setUploadResults] = useState<
    {
      filename: string;
      uploadResult: Promise<UploadResult>;
    }[]
  >([]);
  const handleFileList = (fileList: FileList) => {
    setLoading('loading');
    const results = Array.from(fileList).map(file => {
      // TODO size check
      return {
        filename: file.name,
        uploadResult: appContext.uploadService().uploadFile(file)
      };
    });
    setUploadResults(results);
    Promise.all(results.map(r => r.uploadResult)).then(() =>
      setLoading('idle')
    );
  };
  return (
    <div
      css={css`
        margin: 10px;
        padding: 50px 50px 30px 50px;
        text-align: center;
        color: ${dragInProgress ? colors.wipColor : colors.grey};
        border: 2px dashed ${dragInProgress ? colors.wipColor : colors.grey};
        border-radius: 10px;
      `}
      {...dragProps(handleFileList, setDragInProgress)}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={event => {
          if (event.target.files) {
            handleFileList(event.target.files);
          }
        }}
        style={{ display: 'none' }}
      />
      <CloudUpload
        css={css`
          font-size: 10rem;
        `}
      />
      {/* [doc] is first because of smartphones */}
      <div>
        <LoadingStateButton
          variant="outlined"
          startIcon={<Add />}
          onClick={() => inputRef.current?.click()}
          loadingState={loading}
        >
          Ajouter le fichier
        </LoadingStateButton>
      </div>
      {uploadResults.length === 0 && (
        <>
          <p
            css={css`
              text-transform: uppercase;
              margin: 30px 0;
            `}
          >
            <div
              css={css`
                position: absolute;
                top: 0.5rem;
                height: 1px;
                width: 40%;
                margin: 0 30%;
                background: ${colors.grey2};
              `}
            />
            <span
              css={css`
                background: ${colors.white};
                padding: 0 20px;
              `}
            >
              ou
            </span>
          </p>
          <p>Glissez-déposez votre facture dans la zone</p>
        </>
      )}
      {uploadResults.length !== 0 && (
        <div
          css={css`
            margin: 30px 20px 0 20px;
          `}
        >
          {uploadResults.map(r => (
            <FileUploadResultComponent
              filename={r.filename}
              result={r.uploadResult}
            />
          ))}
        </div>
      )}
    </div>
  );
};
