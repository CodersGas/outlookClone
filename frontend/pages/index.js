import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box, Typography, InputAdornment, IconButton, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import Cookie from 'js-cookie';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Layout from 'components/layout';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ValidationSchema = yup.object().shape({
  email: yup
        .string()
        .email('Enter valid Email')
        .required('Email is required'),
  password: yup
            .string()
            .required('Password is required')
})

const useStyles = makeStyles(theme => ({
  containerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    width: '150px',
    backgroundColor: '#fff',
    color: '#2196f3',
    '&:hover': {
      backgroundColor: '#2196f3',
      color: '#fff'
    }
  }
}))

const LoginPage = (props) => {

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [showButtonIcons, setShowButtonIcons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtonIcons(true);
  }

  const handleMouseLeave = () => {
    setShowButtonIcons(false);
  }

  const handlePasswordVisibility = () => {
    if(showPassword) {
      setShowPassword(false);
    }else {
      setShowPassword(true);
    }
  }

  return(
    <Layout {...props} >
      <Grid container className={classes.containerStyle} >
        <Grid item md={4} xs={12} sm={12} >
          <Grid container >

            <Grid item md={12} xs={12} sm={12} >
              <Box my={2} width={1} display='flex' justifyContent='center' >
                <Zoom timeout={1200} in={true} >
                  <img 
                    src='/images/outlook.png'
                    style={{
                      width: '200px',
                      height: '200px'
                    }}
                  />
                </Zoom>
              </Box>

              <Box width={1} my={2} textAlign='center' >
                <Typography className="fontLarge fontBold welcomemessage" >
                  Welcome to Outlook, Login to continue
                </Typography>
              </Box>
            </Grid>

            <Formik
              initialValues={{
                email: '',
                password: ''
              }}

              validationSchema={ValidationSchema}

              validateOnChange={true}

              onSubmit = {async(values, {setSubmitting}) => {
                Cookie.set('user', values, { expires: 7 });
                Router.push('/home');
              }}

            >
              {({errors, touched, handleChange, isSubmitting, values, setFieldValue}) => (
                <Form style={{width: "100%"}} >
                  <Grid item md={12} xs={12} sm={12} >
                    <Box width={1} p={1} >
                      <TextField 
                        id="email"
                        name="email"
                        variant='outlined'
                        color='primary'
                        fullWidth
                        placeholder='Enter email'
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email ? errors.email : ''}
                      />
                    </Box>
                  </Grid>

                  <Grid item md={12} xs={12} sm={12} >
                    <Box width={1} width={1} p={1} >
                      <TextField 
                        id="password"
                        name="password"
                        variant='outlined'
                        color='primary'
                        fullWidth
                        placeholder='Enter password'
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password ? errors.password : ''}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: 
                          <InputAdornment position='end' >
                            <IconButton onClick={handlePasswordVisibility} >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item md={12} xs={12} sm={12} >
                    <Box width={1} display='flex' justifyContent='center' my={2} >
                      <Button 
                        variant='outlined' 
                        color='primary' 
                        size='large' 
                        type='submit' 
                        className={classes.buttonStyle} 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave} 
                        endIcon={ showButtonIcons && <ArrowForwardIcon /> }
                      >
                        Login
                      </Button>
                    </Box>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default LoginPage;