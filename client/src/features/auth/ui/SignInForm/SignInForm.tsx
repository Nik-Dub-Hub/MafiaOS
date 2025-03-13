
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


// import  { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
// } from "@mui/material";
// import { schema } from "./schema";
// import { IUserSignInData, signInThunk } from "@/entities/user";
// import { useAppDispatch } from "@/shared/hooks/reduxHooks";

// export default function SignUpForm() {
//    const [open, setOpen] = useState(false);
//    const dispatch = useAppDispatch()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm<IUserSignInData>({
//     resolver: yupResolver(schema),mode:'onChange'
//   });

//   const onSubmit:SubmitHandler<IUserSignInData> = async(data) => {
//     try {
//         const response = await dispatch(signInThunk(data))

//         if(response.payload?.error){
//             //! Переделать на Alert
//             console.log('Ошибка при входе');
//             return
//         }

//         if(response.payload?.statusCode === 200){
//             //! Переделать на Alert
//             console.log('Вы успешно вошли в систему');
//             reset()
//         }
//     } catch  {
//         //! Переделать на Alert
//         console.log('Не удалось войти');
        
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Container>
//       <Button variant="contained" onClick={handleOpen}>
//         Open Login Form
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" component="h2" gutterBottom>
//             Registration Form
//           </Typography>

//           <form onSubmit={handleSubmit(onSubmit)}>
            
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               {...register('email')}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//               margin="normal"
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               {...register('password')}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               margin="normal"
//             />

//             <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//               Register
//             </Button>
//           </form>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };