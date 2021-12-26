/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { SharedConstants } from '../../constants';
import { DeliberationId } from '../../domain/ids';
import { LienDeliberationDto } from '../../domain/organisme';
import { LocalDate } from '../../domain/time';
import { Errors } from '../../errors';
import { colors } from '../../styles/vars';
import { defer } from '../../utils';
import { CreateDeliberationAndAddLienComponent } from './CreateDeliberationAndAddLienComponent';

interface DeliberationItem {
  id?: DeliberationId;
  libelle: string;
  deliberationDate?: LocalDate;
}

export const AddLienDeliberationComponent = (props: {
  alreadySetLienDeliberations: LienDeliberationDto[];
  onNewLienDeliberation: (id: DeliberationId) => void;
  onNewDeliberationAndLien: (
    libelle: string,
    deliberationDate: LocalDate
  ) => void;
}) => {
  // react wants null to reset correctly the input
  const [value, setValue] = useState<DeliberationItem | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogLibelle, setDialogLibelle] = useState('');
  const [alreadySet, setAlreadySet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliberations, setDeliberations] = useState<DeliberationItem[]>([]);

  // search suggestions
  // TODO plutot prévenir si delib déjà liée
  const onInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
    if (value.length >= SharedConstants.deliberationSearchLengthLimit) {
      setLoading(true);
      setAlreadySet(false);
      setDeliberations([]);
      appContext
        .queryService()
        .searchDeliberationQuery({
          searchToken: value
        })
        .then(r => {
          setLoading(false);
          const alreadySet = props.alreadySetLienDeliberations.map(
            l => l.deliberation.id
          );
          const results = r.results.filter(r => !alreadySet.includes(r.id));
          const libelles = r.results.map(r => r.libelle);
          if (libelles.includes(value) && results.length === 0) {
            setAlreadySet(true);
          } else {
            if (libelles.includes(value)) {
              setDeliberations(results);
            } else {
              setDeliberations([
                ...results,
                {
                  id: undefined,
                  libelle: value
                }
              ]);
            }
          }
        });
    }
  };
  const openDialog = (libelle: string) => {
    setValue(null);
    setInputValue('');
    setDeliberations([]);
    setDialogLibelle(libelle);
    // without it popup is directly submitted when user use 'enter'
    defer(() => setDisplayDialog(true));
  };
  const onChange = (
    event: ChangeEvent<{}>,
    newValue: string | DeliberationItem | null
  ) => {
    if (typeof newValue === 'string') {
      openDialog(newValue);
    } else if (newValue) {
      const deliberationId = newValue.id;
      const deliberationDate = newValue.deliberationDate;
      if (!deliberationId) {
        openDialog(newValue.libelle);
      } else {
        if (!deliberationDate) {
          throw Errors._82c7652b();
        }
        // appContext
        //   .commandService()
        //   .addLienDeliberationCommand({
        //     deliberationId, //: newValue.id,
        //     organismeId: props.organismeId,
        //     instanceId: props.instanceId
        //   })
        //   .then(r => {
        //     const deliberation: LienDeliberationDto = {
        //       id: r.lienDeliberationId,
        //       deliberationId,
        //       libelle: newValue.libelle,
        //       deliberationDate
        //     };
        //     addDeliberation({
        //       id: r.lienDeliberationId,
        //       deliberation
        //     });
        //     setInputValue('');
        //     setValue(null);
        //   });
      }
    }
  };
  const handleClose = () => {
    setDisplayDialog(false);
  };
  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionLabel={(option: string | DeliberationItem) => {
          if (typeof option === 'string') {
            return option;
          } else {
            return option.libelle;
          }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        options={deliberations}
        style={{ width: 300 }}
        renderInput={params => (
          <div>
            <TextField
              {...params}
              label="Ajouter délibération"
              variant="outlined"
              size={'small'}
              css={css`
                background: ${colors.white};
              `}
            />
            {loading && (
              <div
                css={css`
                  position: absolute;
                  top: 50%;
                  right: 9px;
                  margin-top: -12px;
                  margin-left: -12px;
                `}
              >
                <CircularProgress size={24} />
              </div>
            )}
            {alreadySet && (
              <div
                css={css`
                  font-size: 0.8rem;
                `}
              >
                La délibération est déjà liée
              </div>
            )}
          </div>
        )}
        renderOption={(props, option: DeliberationItem) => (
          <li {...props}>
            {!option.id && (
              <span
                css={css`
                  font-weight: bold;
                  margin-right: 6px;
                `}
              >
                [ajouter]
              </span>
            )}
            {option.libelle}
            {option.deliberationDate ? (
              <span
                css={css`
                  font-size: 0.8rem;
                `}
              >
                {' '}
                (du {option.deliberationDate})
              </span>
            ) : null}
          </li>
        )}
      />
      <CreateDeliberationAndAddLienComponent
        libelle={dialogLibelle}
        display={displayDialog}
        close={handleClose}
        onNewLienDeliberation={props.onNewLienDeliberation}
        onNewDeliberationAndLien={props.onNewDeliberationAndLien}
      />
    </React.Fragment>
  );
};
