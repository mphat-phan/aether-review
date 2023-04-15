import React, { useEffect } from 'react'
import { Container, Grid, Typography, Button, Paper, FormControl, Alert} from '@mui/material'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputController from '~/components/InputController'
import { registerInputs } from '~/services/user.service'
import { registerAction } from '~/store/actions/user.action'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { RootState } from '~/store'
import { useLocation, Navigate, useNavigate } from "react-router-dom"
export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const methods = useForm<registerInputs>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });
    const { handleSubmit, getValues, control } = methods;
    const onSubmit:SubmitHandler<registerInputs> = ({email, password, name}) => {
        dispatch(registerAction({email, password, name}))
    }
    const { loading, status, message, isLogged, userInfo }:any = useAppSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if(isLogged && userInfo){
            navigate("/")
        }
    },[isLogged,userInfo])
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
                                        <FormControl margin={'dense'} fullWidth>
                                            <InputController
                                                name='name'
                                                label='Name'
                                                required
                                                rules={{ minLength: {value: 6, message: "Nhập 6 kí tự"} }}
                                                disable={(!!loading)}
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
                                                disable={(!!loading)}
                                            />
                                        </FormControl>
                                        <FormControl margin={'dense'} fullWidth>
                                            <InputController
                                                name='password'
                                                label='Pasword'
                                                required
                                                rules={{ minLength: {value: 6, message: "Nhập 6 kí tự"} }}
                                                disable={(!!loading)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    { status === "fail" && 
                                        <Grid item>
                                            <Alert severity="error">{message}</Alert>
                                        </Grid>
                                    }
                                    <Grid item>
                                        <Button variant='contained' type='submit' disabled={(!!loading)}>{loading ? "Loading..." : "Submit"}</Button>
                                    </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </Grid>
        </Container>
    )
}
