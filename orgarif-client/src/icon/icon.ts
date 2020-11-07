export interface IconProps {
  size: number;
  sizeAxe: 'width' | 'height';
  // FIXMENOW ?
  sizeUnit?: 'px' | '%';
}

export const svgProps = (props: IconProps, ratio: number) => {
  const unit = props.sizeUnit ? props.sizeUnit : 'px';
  return props.sizeAxe === 'width'
    ? {
        width: props.size + unit,
        height: props.size / ratio + unit,
      }
    : {
        width: props.size * ratio + unit,
        height: props.size + unit,
      };
};
