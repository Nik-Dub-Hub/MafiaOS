
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
} from "@mui/material";
import { schema } from "./schema";
import { IUserSignInData, signInThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";

interface SignInFormProps {
  onClose: () => void;
}

export default function SignInForm({ onClose }: SignInFormProps) {
   const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IUserSignInData>({
    resolver: yupResolver(schema),mode:'onChange'
  });

  const onSubmit:SubmitHandler<IUserSignInData> = async(data) => {
    try {
        const response = await dispatch(signInThunk(data))

        if(response.payload?.error){
            //! Переделать на Alert
            console.log('Ошибка при входе');
            return
        }

        if(response.payload?.statusCode === 200){
            //! Переделать на Alert
            console.log('Вы успешно вошли в систему');
            reset()
            onClose();
        }
    } catch  {
        //! Переделать на Alert
        console.log('Не удалось войти');
        
    }
  };


  return (
        
          <form onSubmit={handleSubmit(onSubmit)}>
            
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
              Login
            </Button>
          </form>
  );
};
