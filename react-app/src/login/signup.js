import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useFormFields } from "../Libs/hook";
import { onError } from "../Libs/error";
import Form from "react-bootstrap/Form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(null);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmationCode: "",
    });

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password
            );
        }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
        }

async function handleSubmit(event) {
    event.preventDefault();

    try {
        const novoUsuario = await Auth.signUp({
            username: fields.email,
            password: fields.password,
            attributes: {
                name: fields.name
            }
        });

        setNewUser(novoUsuario);
    } catch(e) {
        if (e.code === "UsernameExistsException") {
            const retentativa = await Auth.resendSignUp(fields.email);
        setNewUser({
            newUser: retentativa
        });
        } else {
            onError(e);
        }
    }
}

async function handleConfirmationSubmit(event) {
    event.preventDefault();

    try {
        await Auth.confirmSignUp(fields.email, fields.confirmationCode);
        await Auth.signIn(fields.email, fields.password);

        navigate('/home');

    } catch (e) {
        onError(e);
    }
}

function renderConfirmationForm() {
    return (
        <Form  onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" size="lg">
                <Form.Label>Código de Confirmação</Form.Label>
                <Form.Control
                    autoFocus
                    type="tel"
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                />
                <Form.Text muted>
                    O código foi enviado para o e-mail cadastrado
                </Form.Text>
            </Form.Group>
            <Button
                block
                size="lg"
                type="submit"
                variant="success"
                disabled={!validateConfirmationForm()}
            >
            Verificar
            </Button>
        </Form>
    );
}

function renderForm() {  
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome Completo"
                                autoFocus
                                value={fields.name}
                                onChange={handleFieldChange}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={fields.password}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disable={!validateForm()}
                    >
                        Cadastrar
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item onClick={() => navigate('/signin')}>
                            <Link href="#" variant="body2">
                                Já possui uma conta? Entrar
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
);
}

return (
    <div className="Signup">
    {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
);

}