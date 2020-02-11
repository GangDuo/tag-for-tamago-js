import React, { Fragment } from 'react';

function Caremark(props) {
  const color = props.color || '#f00'
  const fontSize = props.fontSize || '1.2rem'
  const verticalAlign = props.verticalAlign || 'top'

  return (
    <Fragment>
      <div className="stamp vertical">{props.children}</div>
      <style jsx>{`
.vertical {
  writing-mode: vertical-rl;
  vertical-align: ${verticalAlign};
}

.stamp{
  transform: rotate(14deg);
  color: ${color};
  border-radius: 1rem;
  font-size: ${fontSize};
  font-weight: 700;
  border: 0.25rem solid ${color};
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
}
      `}</style>
    </Fragment>
  )
}

export default Caremark;