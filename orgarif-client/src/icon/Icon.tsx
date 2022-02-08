import styled from '@emotion/styled';
import { SizedSvg } from './SizedSvg';

export type IconProps = React.SVGAttributes<SVGElement> & {
  children: React.ReactNode;
  className?: string;
  height?: number;
  name: string;
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  /** @default 32 */
  size?: number | string;
  title?: string;
  /** @default '0 0 32 32' */
  viewBox?: string;
  width?: number;
};

export type SpecificIconProps = Omit<IconProps, 'children' | 'name'> & {
  children?: React.ReactNode;
};

/** Base SVG Icon Component */
function IconComponent({
  children,
  className,
  height,
  name,
  onClick,
  size = 32,
  title,
  viewBox = `0 0 ${size} ${size}`,
  width
}: IconProps): React.ReactElement<IconProps> {
  return (
    <SizedSvg
      aria-labelledby={title && 'title'}
      className={className}
      clipRule="evenodd"
      fillRule="evenodd"
      height={height ? height : size}
      id={`icon-${name}`}
      onClick={onClick}
      preserveAspectRatio="xMidYMid meet"
      viewBox={viewBox}
      width={width ? width : size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title id="title">{name}</title>}
      {children}
    </SizedSvg>
  );
}

export const Icon = styled(IconComponent)<IconProps>``;
