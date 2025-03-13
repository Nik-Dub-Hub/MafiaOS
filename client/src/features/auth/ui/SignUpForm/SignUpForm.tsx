import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { schema } from "./schema";
import { IUserSignUpData, signUpThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { showAlert } from "@/features/alerts";

interface SignUpFormProps {
  onClose: () => void;
}

export default function SignUpForm({ onClose }: SignUpFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserSignUpData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUserSignUpData> = async (data) => {
    try {
      const response = await dispatch(signUpThunk(data));

      if (response.payload?.error) {
        dispatch(
          showAlert({ message: "Ошибка при регистрации", status: "error" })
        );
        return;
      }

      if (response.payload?.statusCode === 201) {
        dispatch(
          showAlert({
            message: "Вы успешно зарегистрированы",
            status: "success",
          })
        );
        reset();
        onClose();
      }
    } catch {
      dispatch(
        showAlert({
          message: "Не удалось зарегистрироваться",
          status: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Username"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Register
      </Button>
    </form>
  );
}
