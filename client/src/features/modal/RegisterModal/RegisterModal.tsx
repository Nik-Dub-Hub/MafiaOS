
import SignUpForm from "@/features/auth/ui/SignUpForm/SignUpForm";
import {
  Modal,
  Box,
  Typography,
} from "@mui/material";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  openLoginModal: () => void;
}

export default function RegisterModal({ open, onClose, openLoginModal }: RegisterModalProps) {
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
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ color: "#E1CC4F" }}
        >
          Register
        </Typography>
        <SignUpForm onClose={onClose} openLoginModal={openLoginModal} />
      </Box>
    </Modal>
  );
}