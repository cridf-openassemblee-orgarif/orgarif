import * as icon from '../Icon';
import styled from '@emotion/styled';

export const Mail = styled(function Mail(
  props: icon.SpecificIconProps
): React.ReactElement {
  return (
    <icon.Icon {...props} name="mail" viewBox="-10 0 963 800">
      <path d="M772 150v493H170V150h602zm-55 55H225v383h492V205zm-427 42 183 157 183-157 36 42-219 187-218-187z" />
    </icon.Icon>
  );
})``;
