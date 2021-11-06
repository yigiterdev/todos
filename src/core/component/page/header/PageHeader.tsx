import './_page-header.scss';

import { Switch } from '@hipo/react-ui-toolkit';
import { useAppContext } from 'core/context/AppContext';

function PageHeader() {
  const { appState, dispatchAppStateReducerAction } = useAppContext();

  return (
    <header className={'page-header'}>
      <div className={'page-header__theme-select'}>
        <span className={'typography--body-semibold'}>{'Dark Theme'}</span>

        <Switch
          isToggledOn={appState.theme === 'dark-theme'}
          onToggle={handleSwitch}
        />
      </div>
    </header>
  );

  function handleSwitch() {
    dispatchAppStateReducerAction({
      type: 'CHANGE_THEME',
    });
  }
}

export default PageHeader;
