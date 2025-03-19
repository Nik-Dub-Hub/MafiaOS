import { TextField, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { IUserUpdateData } from "@/entities/user";
import { showAlert } from "@/features/alerts";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  username: yup.string().required("Имя обязательно"),
  email: yup
    .string()
    .email("Неверный формат электронной почты")
    .required("Электронная почта обязательна"),
  password: yup.string().required("Имя обязательно"),
});

interface UserProfileUpdateFormProps {
  onClose: () => void;
  userId: number;
}

export default function UserProfileUpdateForm({
  onClose,

}: UserProfileUpdateFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserUpdateData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUserUpdateData> = async () => {
    try {
      // const response = await dispatch(
      //   updateUserThunk()
      // );
      console.log(Response)
      navigate(CLIENT_ROUTES.MAIN);
      dispatch(
          showAlert({
            message: "Данные успешно обновлены",
            status: "success",
          })
        );
        reset();
        onClose();
    } catch (error) {
      console.log(error)
      dispatch(
        showAlert({
          message: "Не удалось обновить данные",
          status: "error",
        })
      );
    }
  };

  return (
    <form>
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
        // onClick={handleNavigate}
        onSubmit={handleSubmit(onSubmit)}
      >
        Обновить
      </Button>
    </form>
  );
}
