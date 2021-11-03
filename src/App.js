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
    return context.to.flatMap(to => context.payloads.map(payload => ({...payload, to})))
    .reduce((ax, v, i) => {
      const index = Math.trunc(i/2)
      const currentPackage = i % context.payloads.length + 1
      ax[index] =  ax[index] || []
      ax[index].push({currentPackage, ...v})
      return ax
    }, [])
  }
 
  if(isPreview) {
    const {shippedAt, yourName, recipientName, from} = context
    const shippedAtForDisplay = moment(shippedAt).format("YYYY.M.D")
    const totalPackage = context.payloads.length
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
                                 whereToReceive={pair[0].to}
                                 content={pair[0].content}
                                 caremark={pair[0].caremark}
                                 description={pair[0].description}
                                 currentPackage={pair[0].currentPackage}
                                 totalPackage={totalPackage} />
                </article>
                <hr className="dotted-line" />
                {
                pair[1] &&
                <article>
                  <TamagoSticker shippedAt={shippedAtForDisplay}
                                 senderName={yourName}
                                 whereToSend={from}
                                 recipientName={recipientName || "　"}
                                 whereToReceive={pair[1].to}
                                 content={pair[1].content}
                                 caremark={pair[1].caremark}
                                 description={pair[1].description}
                                 currentPackage={pair[1].currentPackage}
                                 totalPackage={totalPackage} />
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
            payloads: [
              {
                content: "その他",
                description: "",
                caremark: [],
              },
            ]
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
