/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ClientUid } from '../../domain/client-id';
import { clientUid } from '../../utils';
import {
  HeightContext,
  SharedHeightContextInterface
} from './SharedHeightContainerContext';

const ContainerWrapped = (
  props: PropsWithChildren<
    SharedHeightContextInterface & {
      groupId: ClientUid;
    }
  >
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [componentId] = useState(clientUid());
  const heights = props.getHeights(props.groupId, componentId);
  useEffect(() => {
    const current = ref.current;
    if (current) {
      const clientHeight = current.clientHeight;
      if (
        heights === undefined ||
        current.clientHeight !== heights.componentHeight
      ) {
        props.pushHeight(props.groupId, componentId, clientHeight);
      }
    }
  });
  return (
    <div
      css={css`
        min-height: ${heights?.groupHeight ?? 0}px;
      `}
    >
      <div ref={ref}>{props.children}</div>
    </div>
  );
};

export const SharedHeightContainer = (
  props: PropsWithChildren<{
    groupId: ClientUid;
  }>
) => {
  return (
    <HeightContext.Consumer>
      {({ getHeights, pushHeight }) => (
        <ContainerWrapped
          getHeights={getHeights}
          pushHeight={pushHeight}
          groupId={props.groupId}
        >
          {props.children}
        </ContainerWrapped>
      )}
    </HeightContext.Consumer>
  );
};
