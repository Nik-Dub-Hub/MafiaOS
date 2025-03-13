import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,

} from "@mui/material";
import { schema } from "./schema";
import { IUserSignInData, signInThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { showAlert } from "@/features/alerts";


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
            dispatch(showAlert({message:'Ошибка при входе',status:'error'}));
            return
        }

        if(response.payload?.statusCode === 200){
            dispatch(showAlert({ message: "Вы успешно вошли в систему",status:'success' }));
            reset()
            onClose();
        }
    } catch  {
        dispatch(showAlert({ message: "Не удалось войти", status: "error" }));        
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
