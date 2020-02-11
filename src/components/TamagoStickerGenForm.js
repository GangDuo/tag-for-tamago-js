import React from 'react';
import { Formik, useField, Field } from 'formik';
import * as Yup from 'yup';

const TextBox = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const Radiobox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <>
      <label className="radio">
        <input type="radio" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const destinations = [
  "本社","前橋本店","伊勢崎店","上中居店","上並榎店","太田飯塚店","熊谷肥塚店",
  "鶴ヶ島店","岡崎店","浜松店","小山城南店","宇都宮IP店","ｽﾏｰｸ店",
  "新座店","東松山店","相模原店","FKD店","並木店","大宮ｽﾃﾗ店","ひたちなか","新前橋店",
  "京都桂川店","上尾店","北大路店","海老名店","松山店","守谷店","橿原店","ｱﾘｵ柏店","ｱﾘｵ橋本店",
  "長岡店","ﾁﾋﾞ","HDｱｳﾄﾚｯﾄ","物流"
];

const TamagoStickerGenForm = (props) => {
  const {handleSubmit, initialValues} = props
  
  return (
  <div>
    <h1>たまご便</h1>
    <Formik
      initialValues={initialValues}
      validationSchema = {Yup.object({
        shippedAt: Yup.string()
          .required('必須'),
        yourName: Yup.string()
          .required('必須'),
        to: Yup.string()
          .required('必須'),
      })}
      onSubmit={handleSubmit}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <p><button type="submit">プレビュー</button></p>
          <p>
            <TextBox label="出荷日：" name="shippedAt" type="date" placeholder="Jane"/>
          </p>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <p>
                <TextBox label="あなたの名前：" name="yourName" type="text" size="10" />
              </p>
              <p>
                <label htmlFor="from">どこから送る：</label>
                <Field name="from" as="select">
                  <option value="本社">本社</option>
                </Field>
              </p>
            </div>
            <div className="d-flex flex-column">
              <p>
                <TextBox label="相手の名前：" type="text" name="recipientName" size="10" />
              </p>
              <p>
                <label htmlFor="to">{props.errors.to ? <span className="text-danger">{props.errors.to}</span> : null}どこへ送る：</label>
                <Field name="to" as="select" multiple size="10">
                {
                  destinations.map((x, i) => <option key={i} value={x}>{x}</option>)
                }
                </Field>
              
              </p>
            </div>
          </div>
          <div className="d-flex">
            <fieldset>
              <legend>品名</legend>
              {
                ['客注', '返品', 'その他']
                .map((x, i) => <p key={i}><Radiobox name="content" value={x}>{x}</Radiobox></p>)
              }
            </fieldset>
            <fieldset>
              <legend>ケアマーク</legend>
              {
                ['取扱注意', '壊れもの', '水濡れ防止', '横積禁止', '踏つけ厳禁', 'カッター注意', '積段数制限', '直射日光・熱遮へい']
                .map((x, i) => <p key={i}><Checkbox name="caremark" value={x}>{x}</Checkbox></p>)
              }
            </fieldset>
            <p>
              <label htmlFor="description">備考：</label><br />
              <Field as="textarea" name="description" rows="20" cols="40" />
            </p>
          </div>
        </form>
      
      )}
    </Formik>
  </div>
);
}
export default TamagoStickerGenForm;