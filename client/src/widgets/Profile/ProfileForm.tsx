import { TextField, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { IUser, IUserUpdateData, updateUserThunk } from "@/entities/user";
import { showAlert } from "@/features/alerts";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const schema = yup.object().shape({
   username: yup
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .matches(
        /^[a-zA-Z0-9_.]+$/,
        "Username can only contain letters, numbers, underscores, and dots"
      ),
  email:yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
});

interface UserProfileUpdateFormProps {
  onClose: () => void;
  user: IUser 
}

export default function UserProfileUpdateForm({
  onClose,
  user,
}: UserProfileUpdateFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUserUpdateData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, [user, setValue]);

  const onSubmit: SubmitHandler<IUserUpdateData> = async (data) => {
    try {
      const response = await dispatch(
        updateUserThunk({ id: user.id, updateData: data })
      );
      if (response.payload?.error) {
        console.log(response.payload.error);
      }

      if (response.payload?.statusCode === 200) {
        dispatch(
          showAlert({
            message: "Данные успешно обновлены",
            status: "success",
          })
        );
        navigate(CLIENT_ROUTES.MAIN);
        reset();
        onClose();
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({
          message: "Не удалось обновить данные",
          status: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ color: "#E1CC4F" }}
      >
        Обновление ваших данных
      </Typography>
      <TextField
        fullWidth
        label="Имя"
        type="text"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
        margin="normal"
        sx={{
          background: "gray",
          borderRadius: "12px",
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
        label="Электронная почта"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        sx={{
          background: "gray",
          borderRadius: "12px",
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

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, width: "100%", background: "#E1CC4F", color: "#343E40" }}
      >
        Обновить
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, width: "100%", background: "#E1CC4F", color: "#343E40" }}
        onClick={() => onClose()}
      >
        Отменить
      </Button>
    </form>
  );
}
