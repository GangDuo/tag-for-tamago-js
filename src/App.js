import React, { useEffect } from 'react';
import logo from './logo.svg';
// https://github.com/necolas/normalize.css
import './normalize.css';
// https://github.com/cognitom/paper-css
import './paper.css';
import './App.css';
import './bootstrap.css';
import './half-line.css';

const PAPER_SIZE = "A4";

function App() {
  useEffect(() => {
    document.body.classList.add(PAPER_SIZE);
  }, []);

  return (
    <section className="sheet padding-10mm d-flex flex-column justify-content-between">

      {/* Write HTML just like a web page */}
      <article>上</article>
      <hr className="dotted-line" />
      <article>下</article>  
    </section>
  );
}

export default App;
