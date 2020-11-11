/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { InstanceId, OrganismeId, RepresentantListId } from '../../domain/id';
import { Dict } from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { AddRepresentantComponent } from './AddRepresentantComponent';
import { DragableRepresentantsListComponent } from './DragableRepresentantsListComponent';

export const EditRepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => (
  <React.Fragment>
    <DragableRepresentantsListComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      lists={props.lists}
    />
    <AddRepresentantComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      lists={props.lists}
      setLists={props.setLists}
    />
  </React.Fragment>
);
