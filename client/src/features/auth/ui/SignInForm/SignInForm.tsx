import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { schema } from "./schema";
import { IUserSignInData, signInThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { showAlert } from "@/features/alerts";
import { useEffect } from "react";

interface SignInFormProps {
  onClose: () => void;
  onOpenRegisterModal: () => void;
}

export default function SignInForm({ onClose,onOpenRegisterModal }: SignInFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<IUserSignInData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");


  useEffect(() => {
       const debounceTimeout = setTimeout(() => {
         trigger([ "email", "password"]); 
       }, 2000); 
       return () => clearTimeout(debounceTimeout); 
     }, [email, password, trigger]);

  const onSubmit: SubmitHandler<IUserSignInData> = async (data) => {
    try {
      const response = await dispatch(signInThunk(data));

      if (response.payload?.error) {
        dispatch(showAlert({ message: "Ошибка при входе", status: "error" }));
        return;
      }

      if (response.payload?.statusCode === 200) {
        dispatch(
          showAlert({
            message: "Вы успешно вошли в систему",
            status: "success",
          })
        );
        reset();
        onClose();
      }
    } catch {
      dispatch(showAlert({ message: "Не удалось войти", status: "error" }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        sx={{
          background: "gray",
          borderRadius: "12px",
          color: "yellow",
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "&:hover fieldset": {
            borderColor: "green",
            borderWidth: "2px",
            borderRadius: "12px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "8px",
              borderWidth: "2px",
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
        sx={{
          background: "gray",
          borderRadius: "12px",
          color: "yellow",
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "&:hover fieldset": {
            borderColor: "green",
            borderWidth: "2px",
            borderRadius: "12px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "8px",
              borderWidth: "2px",
            },
          },
        }}
      />
      <div>
        <span>Нет учетной записи?</span>
        <span
          style={{ color: "gold" }}
          onClick={() => {
            onClose();
            onOpenRegisterModal();
          }}
        >
          Регистрация
        </span>
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, width: "100%", background: "#E1CC4F", color: "#343E40" }}
      >
        Login
      </Button>
    </form>
  );
}
