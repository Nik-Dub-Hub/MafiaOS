import { Modal, Box, Typography } from "@mui/material";
import RulesModal from "./RulesModal";

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
  onOpenStatisticsModal: () => void;
}

export default function RulesGame({ open, onClose }: RulesModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "#343E40",
          boxShadow: 34,
          p: 3,
          borderRadius: 8,
          overflowX: 'auto',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "#E1CC4F" }}
        >
          Правила игры Мафия
        </Typography>
        <RulesModal />
      </Box>
    </Modal>
  );
}
