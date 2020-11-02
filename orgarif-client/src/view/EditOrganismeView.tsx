/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilState } from 'recoil';
import { SelectInput, SelectOption } from '../component/SelectInput';
import { MainContainer } from '../container/MainContainer';
import { EditOrganismeRoute } from '../routing/routes';
import { state } from '../state/state';

export const EditOrganismeView = (props: {
  routeParams: EditOrganismeRoute;
}) => {
  const [userInfos] = useRecoilState(state.userInfos);
  const [organismes] = useRecoilState(state.organismes);
  const onChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log(event.target.value);
  };
  const options: SelectOption[] = [
    { value: undefined, label: 'rien' },
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ];
  return (
    <MainContainer>
      <SelectInput
        label={'test'}
        value={options[0]}
        options={options}
        onChange={onChange}
      />
    </MainContainer>
  );
};
