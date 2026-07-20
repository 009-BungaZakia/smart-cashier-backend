export default function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        minWidth: "220px",
        background: "#fff",
        color: "#000",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "16px",
          color: "#666",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "10px",
          marginBottom: 0,
          fontSize: "36px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}