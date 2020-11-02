/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import { createStyles, FormControl, Select, Theme } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { stringifyNominalString } from '../domain/nominal-class';
import { clientUid } from '../utils';
import {Organisme} from "../domain/organisme";
import {colors} from "../styles/vars";

export const SelectInput = (props: {
    organisme: Organisme
}) => {
    const organisme = props.organisme;
  return (
      <div>
    <div css={css`
padding: 10px 0 1px 40px;
        background: $blue;
`}>

        <h2 css={css`
            color: $white;
`}>{organisme.nom}</h2>
            <p css={css`
font-size: 0.8rem;
            color: ${colors.clearGrey};
`}>Nature juridique : { organisme.natureJuridiqueId }</p>
        </div>
        <div css={css`
display: flex;
border: 2px solid ${colors.blue};
`}>
            <div css={css`
display: flex;
`}>
                <p>Secteur : {organisme.secteurId}</p>
                <p>Type de structure : {organisme.typeStructureId}</p>
                <p>{organisme.nombreRepresentants } réprésentants</p>
            </div>
            <div >
                <h3>Représentants / suppléants</h3>
                <div css={css`
display: flex;
`}>

                </div>
            </div>
            <div >
                <h3>Délibérations</h3>
                <p *ngFor="let d of organisme.deliberations" class="deliberation">{{ d.label }} du {{ d.date | date: 'd/M/yy' }}</p>
            </div>
            <div *ngFor="let i of organisme.instances" class="content-block flex-block-3">
                <h3>{{ i.nom }}</h3>
                <div style="display: flex">
                    <div class="content-block flex-block-2 first">
                        <h4>Représentants / suppléants</h4>
                        <div style="display: flex">
                            <div class="content-block flex-block-1 first" *ngIf="i.representants">
                                <jhi-orgarif-representants-block [representants]="i.representants"></jhi-orgarif-representants-block>
                            </div>
                            <div class="content-block flex-block-1" *ngIf="i.suppleants">
                                <jhi-orgarif-representants-block [representants]="i.suppleants"></jhi-orgarif-representants-block>
                            </div>
                        </div>
                    </div>
                    <div class="content-block flex-block-1">
                        <h4>Délibérations</h4>
                        <p *ngFor="let d of i.deliberations" class="representants">{{ d.label }} du {{ d.date | date: 'd/M/yy' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};
