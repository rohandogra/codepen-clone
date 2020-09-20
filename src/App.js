import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import useLocalStorage from './components/hooks/useLocalStorage';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App(props) {
  const [html, setHtml] = useLocalStorage('html', '');
  const [javascript, setJavascript] = useLocalStorage('javascript', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${javascript}</script>
  </html>`
      );
    }, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [html, css, javascript]);
  console.log(html.length, css.length);

  return (
    <>
      <div className='header'>
        <FontAwesomeIcon icon={faCode} />
        <div className='header-text-container'>
          <div className='header-text-1'>
            Untitled
            {/* <input placeholder='new' /> */}
          </div>
          <div className='header-text-2'>Captain Anonymous</div>
        </div>
      </div>
      <div className='pane top-pane'>
        <Editor
          displayName='Html'
          language='xml'
          value={html}
          onChange={setHtml}
        />
        <Editor
          displayName='css'
          language='css'
          value={css}
          onChange={setCss}
        />
        <Editor
          displayName='Javascript'
          language='javascript'
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div
        className={`iframe-container ${
          html.length > 0
            ? 'iframe-container-color-white'
            : 'iframe-container-color'
        }`}
      >
        <iframe
          title='output'
          srcDoc={srcDoc}
          sandbox='allow-scripts'
          frameBorder='0'
          width='100%'
          height='100vh'
        />
      </div>
    </>
  );
}

export default App;
