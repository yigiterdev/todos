import './_page-header.scss';

import { Switch } from '@hipo/react-ui-toolkit';
import { MdModeNight } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';

import { useAppContext } from 'core/context/AppContext';

function PageHeader() {
  const {
    appState: { theme },
    dispatchAppStateReducerAction,
  } = useAppContext();

  return (
    <header className={'page-header'}>
      <div className={'page-header__theme-select'}>
        <Switch isToggledOn={theme === 'dark-theme'} onToggle={handleSwitch} />

        {theme === 'dark-theme' ? <BsSunFill /> : <MdModeNight />}
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
