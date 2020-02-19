import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Select, RadioGroup, CheckboxWithLabel  } from 'formik-material-ui';
import { Button, FormControlLabel, Radio } from '@material-ui/core';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';
import jaJP from "date-fns/locale/ja";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaJP}>
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
        {({submitForm, isSubmitting, ...props}) => (
          <form onSubmit={props.handleSubmit}>
            <p><Button variant="contained" color="primary"
                       disabled={isSubmitting}
                       onClick={submitForm}><i className="cil-print"></i>&nbsp;プレビュー</Button></p>
            <p>
              <Field component={DatePicker} name="shippedAt" label="出荷日" />
            </p>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <p>
                  <Field component={TextField} label="あなたの名前：" name="yourName" type="text" size="10" />
                </p>
                <FormControl>
                  <InputLabel htmlFor="from-native">どこから送る</InputLabel>
                  <Field
                    component={Select}
                    name="from"
                    inputProps={{
                      id: 'from-native',
                    }}
                  >
                    <MenuItem value="本社">本社</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div className="d-flex flex-column">
                <p>
                  <Field component={TextField} label="相手の名前：" type="text" name="recipientName" size="10" />
                </p>
                <p>
                  <FormControl error={!!props.errors.to}>
                    <InputLabel shrink htmlFor="to-native">
                      どこへ送る
                    </InputLabel>
                    <Field component={Select}
                           name="to"
                           native={true}
                           multiple={true}
                           inputProps={{
                             id: 'to-native',
                             size: 10,
                             style: {width: "200px"}
                           }}
                    >
                    {
                      destinations.map((x, i) => <option key={i} value={x}>{x}</option>)
                    }
                    </Field>
                    { props.errors.to ? <FormHelperText>{props.errors.to}</FormHelperText> : null }
                  </FormControl>
                </p>
              </div>
            </div>
            <div className="d-flex">
              <fieldset>
                <legend>品名</legend>
                <Field component={RadioGroup} name="content">
                {
                  ['客注', '返品', 'その他']
                  .map((x, i) => <FormControlLabel key={i}
                                                   control={<Radio disabled={isSubmitting} />}
                                                   value={x}
                                                   label={x}
                                                   disabled={isSubmitting}/>)
                }
                </Field>
              </fieldset>

              <fieldset>
                <legend>ケアマーク</legend>
                <Grid container
                      direction="column"
                      justify="space-around"
                      alignItems="flex-start"
                >
                {
                  ['取扱注意', '壊れもの', '水濡れ防止', '横積禁止', '踏つけ厳禁', 'カッター注意', '積段数制限', '直射日光・熱遮へい']
                  .map((x, i) => <Field key={i}
                                        component={CheckboxWithLabel}
                                        name="caremark"
                                        type="checkbox"
                                        value={x}
                                        Label={{ label: x }} />)
                }
                </Grid>
              </fieldset>

              <Field component={TextField}
                     multiline
                     label="備考"
                     name="description"
                     size="10"
                     variant="outlined" />
            </div>
          </form>
        
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  </div>
);
}
export default TamagoStickerGenForm;