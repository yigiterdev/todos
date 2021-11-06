import './core/ui/style/_global.scss';
import './core/ui/style/_align.scss';
import './core/ui/style/_media-queries.scss';
import './core/ui/style/colors/_global-colors.scss';
import './core/ui/style/colors/_theme.scss';
import './core/ui/typography/_typography.scss';
import './core/ui/typography/_fonts.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './core/app/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
