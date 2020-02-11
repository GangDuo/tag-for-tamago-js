import React, { Fragment } from 'react';

function Stamp(props) {
  const { top, middle, bottom } = props
  const color = props.color || '#f00'

  return (
    <Fragment>
      <div className="stamp">
        <span>{top}</span>
        <span>{middle}</span>
        <span>{bottom}</span>
      </div>
      <style jsx="true">{`
.stamp{
  font-size: 10px;
  border: 3px double #f00;
  border-radius: 50%;
  color: ${color};
  width: 64px;
  height: 64px;
  position: relative;
  margin: auto;
  /* d-flex */
  display: -ms-flexbox!important;
  display: flex!important;
  /* flex-column */
  -ms-flex-direction: column!important;
  flex-direction: column!important;
  /* justify-content-around */
  -ms-flex-pack: distribute!important;
  justify-content: space-around!important;
}
.stamp span {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 4px 0;
  /* align-self-center */
  -ms-flex-item-align: center!important;
  align-self: center!important;
}
.stamp span:nth-child(2) {
  border-top: 1px solid #f00;
  border-bottom: 1px solid #f00;
  line-height: 1;
}
      `}</style>
    </Fragment>
  )
}

export default Stamp;