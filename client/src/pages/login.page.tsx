import React from 'react'
import { Box, Container, Grid, Typography, TextField, Button, Paper, FormControl} from '@mui/material'
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form'
import InputController from '~/components/InputController'
import { LoginInputs } from '~/store/actions/user.action'
import { loginAction } from '~/store/actions/user.action'
import { useAppDispatch } from '~/store/hooks'
export default function LoginPage() {
    const dispatch = useAppDispatch();
    const methods = useForm<LoginInputs>({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });
    const { handleSubmit, getValues, control } = methods;
    const onSubmit:SubmitHandler<LoginInputs> = ({username, email, password}) => {
        dispatch(loginAction({username, email, password}))
    }
    
    return (
        <Container maxWidth="sm">
            <Grid container flexDirection="column" justifyContent="center" height="100vh">
                <Paper elevation={3}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container flexDirection="column" spacing={2} padding={5} >
                                    <Grid item>
                                        <Typography variant='h3'>Login</Typography>
                                    </Grid>
                                    <Grid item>
                                        <FormControl fullWidth>
                                            <InputController
                                                name='username'
                                                label='Username'
                                                required
                                                rules={{ minLength: {value: 6, message: "Nhập 6 kí tự"} }}
                                            />
                                        </FormControl>
                                        <FormControl margin={'dense'} fullWidth>
                                            <InputController
                                                name='email'
                                                label='Email'
                                                required
                                                rules={{
                                                    pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Địa chỉ email không hợp lệ",
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl margin={'dense'} fullWidth>
                                            <InputController
                                                name='password'
                                                label='Pasword'
                                                required
                                                rules={{ minLength: {value: 6, message: "Nhập 6 kí tự"} }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='contained' type='submit'>Submit</Button>
                                    </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </Grid>
        </Container>
    )
}
