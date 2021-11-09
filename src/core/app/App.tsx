import { Switch } from '@hipo/react-ui-toolkit';
import { useAppContext } from 'core/context/AppContext';

function App() {
  const { appState, dispatchAppStateReducerAction } = useAppContext();

  return (
    <div className="App">
      <div style={{ display: 'flex', gap: '8px' }}>
        <span>{'Dark Theme'}</span>

        <Switch
          isToggledOn={appState.theme === 'dark-theme'}
          onToggle={handleSwitch}
        />
      </div>
    </div>
  );

  function handleSwitch() {
    dispatchAppStateReducerAction({
      type: 'CHANGE_THEME',
    });
  }
}

export default App;
