import React from 'react';
import Stamp from './Stamp';
import Caremark from './Caremark';

function TamagoSticker(props) {
  const { senderName, whereToSend, recipientName, whereToReceive, shippedAt, contents, caremark, description } = props

  return (
    <>
      <style jsx="true">{`
.mv-info {
  font-size: 30px;
}
      `}</style>
      <div className="row text-center">
        <div className="col-3 border align-self-center">
          <div className="p-2 row border-bottom">
            <div className="col align-self-center">出荷日</div>
          </div>
          <div className="p-2 row"><div className="col align-self-center">
            <Stamp top="出荷日" middle={shippedAt} bottom={senderName} />
          </div></div>
        </div>
        <div className="col-6 align-self-center">
          <b style={{fontSize: "80px"}}>たまご便</b>
        </div>
        <div className="col-3 border align-self-center" style={{height: "117px"}}>
          <div className="p-2 row border-bottom">
            <div className="col align-self-center">口数</div>
          </div>
          <div className="p-2 row align-self-center" style={{height: "80px"}}>
            <div className="col align-self-center">1-1</div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-4 text-right">
          <div className="row"><div className="col border-bottom mv-info">
            <i className="cil-flag-alt"></i>&nbsp;{whereToSend}</div>
          </div>
          <div className="row mt-3">
            <div className="col border-bottom mv-info">&nbsp;{senderName}</div>
          </div>
        </div>
        <div className="col-4 text-center align-self-center">
          <i className="cil-arrow-thick-right c-icon-4xl"></i>
        </div>
        <div className="col-4 text-right">
          <div className="row"><div className="col border-bottom mv-info">
            <i className="cil-flag-alt"></i>&nbsp;{whereToReceive}</div>
          </div>
          <div className="row mt-3">
            <div className="col border-bottom mv-info">&nbsp;{recipientName}</div>
          </div>
        </div>
      </div>

      <div className="row  border mt-5">
        <div className="col-4 text-center align-self-center">{contents || "その他"}</div>
        <div className="col-8 border-left">
          <div className="row"><div className="col">
            <i className="cil-pencil"></i>&nbsp;<b>商品名・備考</b></div>
          </div>
          <div className="row" style={{height: "120px"}}>
            <div className="col">
              <div dangerouslySetInnerHTML={{__html: description}} />
              {caremark &&
               caremark.map((x, i) => <Caremark key={i}>{x}</Caremark>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TamagoSticker;