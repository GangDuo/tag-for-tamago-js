import React, { useState, useEffect } from 'react';
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
  const [isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    document.title = '印刷プレビュー'
    document.body.classList.add(PAPER_SIZE);
  }, []);

  if(isPreview) {
    return (
      <>
        <form>
          <button onClick={() => setIsPreview(false)}>戻る</button>
        </form>

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
      </>
    );
  } else {
    return (
      <>
        <form>
          <p><button onClick={() => setIsPreview(true)}>プレビュー</button></p>
          <p>
            <label htmlFor="shippedAt">出荷日：</label>
            <input id="shippedAt" type="date" name="shippedAt" size="40" />
          </p>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <p>
                <label htmlFor="yourName">あなたの名前：</label>
                <input id="yourName" type="text" name="yourName" size="10" />
              </p>
              <p><label htmlFor="from">どこから送る：</label>
                <select id="from" name="from">
                  <option value="本社">本社</option>
                </select>
              </p>
            </div>
            <div className="d-flex flex-column">
              <p>
                <label htmlFor="recipientName">相手の名前：</label>
                <input id="recipientName" type="text" name="recipientName" size="10" />
              </p>
              <p>
                <label htmlFor="to">どこへ送る：</label>
                <select id="to" name="to" multiple size="10">
                {
                  ["本社","前橋本店","伊勢崎店","上中居店","上並榎店","太田飯塚店","熊谷肥塚店",
                  "鶴ヶ島若葉店","岡崎店","浜松志都呂店","小山城南店","宇都宮ｲﾝﾀｰﾊﾟｰｸ店","ｽﾏｰｸ店",
                  "新座店","東松山ﾋﾟｵﾆｳｫｰｸ","相模原","FKD","並木","大宮ｽﾃﾗ","ひたちなか","新前橋",
                  "京都桂川店","上尾店","北大路店","海老名","松山","守谷","橿原","ｱﾘｵ柏","ｱﾘｵ橋本",
                  "長岡","ﾁﾋﾞ","HDｱｳﾄﾚｯﾄ","物流"]
                  .map((x, i) => <option key={i} value={x}>{x}</option>)
                }
                </select>
              </p>
            </div>
          </div>
          <div className="d-flex">
            <fieldset>
              <legend>品名</legend>
              {
                ['客注', '返品', 'その他']
                .map((x, i) => <p key={i}><label><input type="radio" name="content" value={x} />{x}</label></p>)
              }
            </fieldset>
            <fieldset>
              <legend>ケアマーク</legend>
              {
                ['取扱注意', '壊れもの', '水濡れ防止', '横積禁止', '踏つけ厳禁', 'カッター注意', '積段数制限', '直射日光・熱遮へい']
                .map((x, i) => <p key={i}><label><input type="checkbox" name="caremark" value={x} />{x}</label></p>)
              }
            </fieldset>
            <p><label htmlFor="description">備考：</label><br />
              <textarea id="description" name="description" rows="20" cols="40"></textarea>
            </p>
          </div>
        </form>
      </>
    )
  }
}

export default App;
