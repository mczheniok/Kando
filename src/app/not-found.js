import Logo from "@/shared/blocks/Logo";

export default function NotFound() {
  return (
    <>
        <div style={{ 
          width: '100%', 
          height: "600px", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ 
            width: "50%", 
            padding: "1rem", 
            display: "flex",
            alignItems: "center" 
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "flex-start" 
            }}>
              <Logo type={true} size={"h1-text"} />
              <div style={{ 
                display: "flex", 
                marginTop: "1.5rem",
                alignItems: "baseline",
                gap: "0.5rem"
              }}>
                <p style={{ fontSize: '1.7rem', color: "var(--orange)" }}>404 &#32;</p>
                <p>&#32;</p>
                <p style={{ fontSize: '1.7rem' }}>Сторінку Не знайдено</p>
              </div>
              <p style={{ color: "#666", marginTop: "1.5rem" }}>
                Упс! Схоже, ви заблукали. Товар, який ви шукаєте, можливо, був переміщений, видалений або ніколи не існував.
              </p>
            </div>
            <img 
              src="/assets/who.png" 
              alt="Page not found"
              width={150} 
              height={150}  
              decoding="async"
              style={{
                height: "auto",
                maxWidth: "150px",
                objectFit: "contain"
              }}
            />
          </div>
        </div>
    </>
  );
}   