import type { SpecificIconProps } from './Icon';

export type IconElement = (
  props: SpecificIconProps
) => React.ReactElement<SpecificIconProps>;

export * from './collection';
export * from './Icon';
export * from './InlineSvg';
export * from './SizedSvg';
