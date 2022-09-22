import React from "react";
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useFormFields } from "../Libs/hook";
import { onError } from "../Libs/error";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './style.css';

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });


function validateForm() {
    return fields.email.length > 0 && fields.password.length >0;
}

async function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = fields; 

    try {
        await Auth.signIn(email, password);

        navigate('/home');

    } catch(e) {
        onError(e);
    }
};


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                        sx={{
                            marginTop: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                    
                    <Box>
                        <a href='/'><img src='./images/logo.png' alt='logo' className='img_login'></img></a>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={fields.email}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={fields.password}
                            onChange={handleFieldChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color='primary'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!validateForm()}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href="/signup" variant="body2" >
                                    Cadastre-se
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
);
}