import { Container, Grid, Typography, Button, Paper, FormControl, Alert} from '@mui/material'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import CheckBoxController from '~/components/CheckBoxController'
import InputController from '~/components/InputController'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    _password: yup.string().required('Password is required'),
    checkbox: yup.boolean().isTrue('Please check box').required('Please check box')
})

type loginInputs = yup.InferType<typeof schema>

export default function LoginPage() {
    const methods = useForm<loginInputs>({
        defaultValues: {
            email: "",
            _password: ""
        },
        resolver: yupResolver(schema)
    })
    const { handleSubmit } = methods
    const onSubmit: SubmitHandler<loginInputs> = (props) => {
        console.log(props)
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
                                    <FormControl margin={'dense'} fullWidth>
                                        <InputController name='email' label='Email' />
                                    </FormControl>
                                    <FormControl margin={'dense'} fullWidth>
                                        <InputController name='_password' label='Pasword' />
                                    </FormControl>
                                    <FormControl margin={'dense'} fullWidth>
                                        <CheckBoxController label='Checkbox' name='checkbox' />
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
