
import {
  Modal,
  Box,
  Typography,
} from "@mui/material";
import SignUpForm from "../auth/ui/SignUpForm/SignUpForm";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
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
          Register
        </Typography>
        <SignUpForm onClose={onClose} />
      </Box>
    </Modal>
  );
}