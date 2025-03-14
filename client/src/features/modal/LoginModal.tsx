
import {
  Modal,
  Box,
  Typography,
} from "@mui/material";
import SignInForm from "../auth/ui/SignInForm/SignInForm";


interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenRegisterModal: () => void;
}

export default function LoginModal({ open, onClose, onOpenRegisterModal }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "#343E40",
          boxShadow: 34,
          p: 3,
          borderRadius: 8,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "#E1CC4F" }}
        >
          Login
        </Typography>
        <SignInForm
          onClose={onClose}
          onOpenRegisterModal={onOpenRegisterModal}
        />
      </Box>
    </Modal>
  );
}