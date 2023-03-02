import * as icon from '../Icon';
import styled from '@emotion/styled';

export const Share = styled(function Share(
  props: icon.SpecificIconProps
): React.ReactElement {
  return (
    <icon.Icon {...props} name="partager" viewBox="-10 0 989 800">
      <path d="m456 55 178 178-39 38-112-111v388h-54V160L310 278l-38-39zm301 695H155V312h110v54h-55v330h493V366h-55v-54h109v438z" />
    </icon.Icon>
  );
})``;
