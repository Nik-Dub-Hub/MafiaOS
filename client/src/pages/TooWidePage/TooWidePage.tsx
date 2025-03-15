export default function TooWidePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        width: "100vw", 
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "80%", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Ошибка: Слишком широкая страница
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
          Мы работаем, пока что, только на мобильных устройствах. Перейдите на
          мобильное устройство или переверните экран.
        </p>
      </div>
    </div>
  );
}
