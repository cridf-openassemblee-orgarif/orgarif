/** @jsx jsx */
import { jsx } from '@emotion/core';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { instanciateNominalNumber } from '../domain/nominal-class';
import { Instant } from '../domain/time';

export const RootView = () => {
  return (
    <MainContainer>
      <div>Root view</div>
      <div>
        <button
          onClick={() => {
            appContext.commandService().testCommand({});
          }}
        >
          test
        </button>
        <br />
        <button
          onClick={() => {
            appContext.queryService().exceptionQuery({
              i: instanciateNominalNumber<Instant>(1601899371000),
            });
          }}
        >
          test backend exception
        </button>
        <br />
        <button
          onClick={() => {
            appContext.queryService().runtimeExceptionQuery();
          }}
        >
          test backend runtime exception
        </button>
        <br />
        <button
          onClick={() => {
            appContext.notificationService().displayNotification('coucou');
          }}
        >
          coucou
        </button>
      </div>
    </MainContainer>
  );
};
