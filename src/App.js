import React, { useEffect } from 'react';
import logo from './logo.svg';
// https://github.com/necolas/normalize.css
import './normalize.css';
// https://github.com/cognitom/paper-css
import './paper.css';
import './App.css';
import './bootstrap.css';
import './half-line.css';
import TamagoSticker from './components/TamagoSticker';

const PAPER_SIZE = "A4";

function App() {
  useEffect(() => {
    document.title = '印刷プレビュー'
    document.body.classList.add(PAPER_SIZE);
  }, []);

  return (
    <section className="sheet padding-10mm d-flex flex-column justify-content-between">

      {/* Write HTML just like a web page */}
      <article>
        <TamagoSticker shippedAt="2020.1.29"
                       senderName="差出人名"
                       whereToSend="差出店名"
                       recipientName="受取人名 様"
                       whereToReceive="受取店名"
                       description="パソコン" />
      </article>
      <hr className="dotted-line" />
      <article>
        <TamagoSticker shippedAt="2020.1.29"
                       senderName="差出人名"
                       whereToSend="差出店名"
                       recipientName="受取人名 様"
                       whereToReceive="受取店名"
                       description="パソコン" />
      </article>
    </section>
  );
}

export default App;
