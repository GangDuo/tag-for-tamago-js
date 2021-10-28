import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const destinations = [
  "本社","前橋本店","伊勢崎店","上中居店","上並榎店","太田飯塚店","熊谷肥塚店",
  "鶴ヶ島店","岡崎店","浜松店","小山城南店","宇都宮IP店","ｽﾏｰｸ店",
  "新座店","東松山店","相模原店","FKD店","並木店","大宮ｽﾃﾗ店","ひたちなか","新前橋店",
  "京都桂川店","上尾店","北大路店","海老名店","松山店","守谷店","橿原店","ｱﾘｵ柏店","ｱﾘｵ橋本店",
  "長岡店","ﾁﾋﾞ","HDｱｳﾄﾚｯﾄ","物流"
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (      
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TamagoStickerGenForm = (props) => {
  const {handleSubmit, initialValues} = props
  const [tabIndex, setTabIndex] = React.useState(0);
  const [tabCnt, setTabCnt] = React.useState(1);

  const handleChangeTabIndex = (event, newValue) => {
    setTabIndex(newValue);
  };

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
          {({submitForm, isSubmitting, values, ...props }) => (
            <form onSubmit={props.handleSubmit}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  <i className="cil-print"></i>&nbsp;プレビュー
                </Button>
                <Field component={DatePicker} name="shippedAt" label="出荷日" />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <Field
                  component={TextField}
                  label="あなたの名前："
                  name="yourName"
                  type="text"
                />
                <FormControl style={{ width: "200px" }}>
                  <InputLabel htmlFor="from-native">どこから送る</InputLabel>
                  <Field
                    component={Select}
                    name="from"
                    inputProps={{
                      id: "from-native",
                    }}
                  >
                    <MenuItem value="本社">本社</MenuItem>
                  </Field>
                </FormControl>
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <Field
                  component={TextField}
                  label="相手の名前："
                  type="text"
                  name="recipientName"
                />

                <FormControl error={!!props.errors.to}>
                  <InputLabel shrink htmlFor="to-native">
                    どこへ送る
                  </InputLabel>
                  <Field
                    component={Select}
                    name="to"
                    native={true}
                    multiple={true}
                    inputProps={{
                      id: "to-native",
                      size: 10,
                      style: { width: "175px" },
                    }}
                  >
                    {destinations.map((x, i) => (
                      <option key={i} value={x}>
                        {x}
                      </option>
                    ))}
                  </Field>
                  {props.errors.to ? (
                    <FormHelperText>{props.errors.to}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <FieldArray name="payloads">
                {({ insert, remove, push }) => (
                  <div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start"
                    >
                      <Tabs
                        value={tabIndex}
                        onChange={handleChangeTabIndex}
                        scrollButtons="auto"
                        variant="scrollable"
                      >
                        {values.payloads.length > 0 &&
                          values.payloads.map((payload, index) => (
                            <Tab key={index} label={`${index + 1}`} />
                          ))}
                      </Tabs>
                      <Button
                        onClick={() => {
                          push({
                            content: "その他",
                            description: "",
                            caremark: [],
                          });
                          setTabIndex((prevCount) => prevCount + 1);
                          setTabCnt((prevCount) => prevCount + 1);
                        }}
                      >
                        +
                      </Button>
                    </Grid>
                    {values.payloads.length > 0 &&
                      values.payloads.map((payload, index) => (
                        <TabPanel value={tabIndex} index={index} key={index}>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>

                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                          >
                            <fieldset>
                              <legend>品名</legend>
                              <Field
                                component={RadioGroup}
                                name={`payloads.${index}.content`}
                              >
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="flex-start"
                                >
                                  {["客注", "返品", "その他"].map((x, i) => (
                                    <FormControlLabel
                                      key={i}
                                      control={
                                        <Radio disabled={isSubmitting} />
                                      }
                                      value={x}
                                      label={x}
                                      disabled={isSubmitting}
                                    />
                                  ))}
                                </Grid>
                              </Field>
                            </fieldset>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                          >
                            <fieldset>
                              <legend>ケアマーク</legend>
                              <Grid
                                container
                                direction="column"
                                justify="space-around"
                                alignItems="flex-start"
                              >
                                {[
                                  "取扱注意",
                                  "壊れもの",
                                  "水濡れ防止",
                                  "横積禁止",
                                  "踏つけ厳禁",
                                  "カッター注意",
                                  "積段数制限",
                                  "直射日光・熱遮へい",
                                ].map((x, i) => (
                                  <Field
                                    key={i}
                                    component={CheckboxWithLabel}
                                    name={`payloads.${index}.caremark`}
                                    type="checkbox"
                                    value={x}
                                    Label={{ label: x }}
                                  />
                                ))}
                              </Grid>
                            </fieldset>

                            <Field
                              component={TextField}
                              multiline
                              label="備考"
                              name={`payloads.${index}.description`}
                              variant="outlined"
                            />
                          </Grid>
                        </TabPanel>
                      ))}
                  </div>
                )}
              </FieldArray>
            </form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </div>
  );
}
export default TamagoStickerGenForm;