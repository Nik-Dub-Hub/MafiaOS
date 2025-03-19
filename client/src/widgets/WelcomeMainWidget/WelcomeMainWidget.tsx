import React from "react";


const Welcome: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "0 20px" }}>
      <h1 style={{ color: " #FFB300" }}>Добро пожаловать в MafiaOS !</h1>
      <p style={{ color: "rgba(243, 200, 11, 0.75)" }}>
        Присоединяйтесь к нашей захватывающей игре, где каждый ход может стать
        решающим. Ваша команда ждет вас!
      </p>
    </div>
  );
};

export default Welcome;
