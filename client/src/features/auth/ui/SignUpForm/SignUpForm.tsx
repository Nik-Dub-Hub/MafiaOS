import  { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { schema } from "./schema";
import { IUserSignUpData, signUpThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";

export default function SignUpForm() {
   const [open, setOpen] = useState(false);
   const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IUserSignUpData>({
    resolver: yupResolver(schema),mode:'onChange'
  });

  const onSubmit:SubmitHandler<IUserSignUpData> = async(data) => {
    try {
        const response = await dispatch(signUpThunk(data))

        if(response.payload?.error){
            //! Переделать на Alert
            console.log('Ошибка при регистрации');
            return
        }

        if(response.payload?.statusCode === 201){
            //! Переделать на Alert
            console.log('Вы успешно зарегистрированы');
            reset()
        }
    } catch  {
        //! Переделать на Alert
        console.log('Не удалось зарегистрироваться');
        
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Button variant="contained" onClick={handleOpen}>
        Open Registration Form
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Registration Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

