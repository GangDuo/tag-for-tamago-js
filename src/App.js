import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import * as moment from 'moment';
// https://github.com/necolas/normalize.css
import './normalize.css';
// https://github.com/cognitom/paper-css
import './paper.css';
import './App.css';
import './bootstrap.css';
import './half-line.css';
import TamagoSticker from './components/TamagoSticker';
import TamagoStickerGenForm from './components/TamagoStickerGenForm';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

const PAPER_SIZE = "A4";

function App() {
  const [isPreview, setIsPreview] = useState(false);
  const [context, setContext] = useState(null)
  useEffect(() => {
    document.title = 'たまご便'
    document.body.classList.add(PAPER_SIZE);
  }, []);

  const pairs = () => {
    return context.to.reduce((ax, v, i) => {
      const index = Math.trunc(i/2)
      ax[index] =  ax[index] || []
      ax[index].push(v)
      return ax
    }, [])
  }

  if(isPreview) {
    const {shippedAt, yourName, recipientName, content, caremark, from, description} = context
    /* yyyy.m.d */
    const shippedAtForDisplay = shippedAt.replace(/([0-9])-0?([0-9])-0?([0-9])/, '$1.$2.$3')
    return (
      <>
        <form>
          <Button variant="contained" color="primary" onClick={() => setIsPreview(false)}>
            <i className="cil-arrow-circle-left"></i>
            &nbsp;
            戻る
          </Button>
        </form>

        {
          pairs().map((pair, i) => {
            return(
              <section key={i} className="sheet padding-10mm d-flex flex-column justify-content-between">
                {/* Write HTML just like a web page */}
                <article>
                  <TamagoSticker shippedAt={shippedAtForDisplay}
                                 senderName={yourName}
                                 whereToSend={from}
                                 recipientName={recipientName || "　"}
                                 whereToReceive={pair[0]}
                                 content={content}
                                 caremark={caremark}
                                 description={description} />
                </article>
                <hr className="dotted-line" />
                {
                pair[1] &&
                <article>
                  <TamagoSticker shippedAt={shippedAtForDisplay}
                                 senderName={yourName}
                                 whereToSend={from}
                                 recipientName={recipientName || "　"}
                                 whereToReceive={pair[1]}
                                 content={content}
                                 caremark={caremark}
                                 description={description} />
                </article>
                }
              </section>
            )})
        }
      </>
    );
  } else {
    const tomorrow = moment().add(1, 'days')

    return (
      <Container maxWidth="sm">
        <TamagoStickerGenForm initialValues={context || {
            shippedAt: tomorrow.format('YYYY-MM-DD'),
            yourName: '',
            recipientName: '',
            from: '本社',
            content: 'その他'
          }}
          handleSubmit={(values, actions) => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            setContext(values)
            setIsPreview(true)
          }}/>
      </Container>
    )
  }
}

export default App;
