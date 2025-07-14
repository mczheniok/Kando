"use client"
import { useState, useEffect } from 'react'

export default function Error() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dotAnimation, setDotAnimation] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setDotAnimation(prev => (prev + 1) % 4)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const floatingElements = ['🔧', '⚙️', '🛠️', '💻', '🔄']

  return (
    <>
      <style jsx>{`
        .maintenance-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, #ff7f00 0%, #ff4500 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          opacity: 0.1;
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          top: 35%;
          right: 15%;
          animation-delay: 1s;
        }

        .floating-element:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }

        .floating-element:nth-child(4) {
          bottom: 45%;
          right: 10%;
          animation-delay: 3s;
        }

        .floating-element:nth-child(5) {
          top: 60%;
          left: 5%;
          animation-delay: 4s;
        }

        .floating-circle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: bounce 4s ease-in-out infinite;
        }

        .circle-1 {
          top: 10%;
          left: 20%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }

        .circle-2 {
          top: 30%;
          right: 20%;
          width: 60px;
          height: 60px;
          animation-delay: 1s;
        }

        .circle-3 {
          bottom: 20%;
          left: 10%;
          width: 40px;
          height: 40px;
          animation-delay: 2s;
        }

        .circle-4 {
          bottom: 40%;
          right: 15%;
          width: 100px;
          height: 100px;
          animation-delay: 0.5s;
        }

        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .main-icon {
          font-size: 6rem;
          margin-bottom: 2rem;
          opacity: 0;
          transform: scale(0.5);
          animation: iconAppear 1s ease-out 0.5s forwards;
        }

        .main-title {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 0.8s forwards;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          font-weight: 300;
          line-height: 1.4;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 1.1s forwards;
        }

        .status-card {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 1.4s forwards;
        }

        .status-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          background: #ff4444;
          border-radius: 50%;
          margin-right: 12px;
          animation: pulse 2s infinite;
        }

        .status-text {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .working-text {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffcc80;
          font-size: 1.1rem;
        }

        .loading-dots {
          display: flex;
          margin-left: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          margin: 0 2px;
          transition: opacity 0.3s ease;
        }

        .dot.active {
          opacity: 1;
        }

        .dot.inactive {
          opacity: 0.3;
        }

        .info-section {
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 1.7s forwards;
        }

        .info-text {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .contact-link {
          color: white;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          margin-left: 8px;
          transition: all 0.3s ease;
        }

        .contact-link:hover {
          color: #ffcc80;
          border-bottom-color: #ffcc80;
        }

        .action-button {
          background: rgba(0, 0, 0, 0.9);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 16px 32px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 2s forwards;
        }

        .action-button:hover {
          background: rgba(0, 0, 0, 1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .decorative-dots {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: ping 2s infinite;
        }

        .dot-1 {
          top: 25%;
          left: 25%;
          animation-delay: 2s;
        }

        .dot-2 {
          top: 75%;
          right: 25%;
          animation-delay: 3s;
        }

        .dot-3 {
          top: 50%;
          right: 30%;
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconAppear {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1.2rem;
          }
          
          .main-icon {
            font-size: 4rem;
          }
          
          .status-card {
            padding: 1.5rem;
          }
          
          .content {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.5rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .main-icon {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="maintenance-container">
        {/* Animated Background */}
        <div className="animated-bg">
          {floatingElements.map((element, index) => (
            <div key={index} className="floating-element">
              {element}
            </div>
          ))}
          
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-circle circle-4"></div>
          
          <div className="decorative-dots dot-1"></div>
          <div className="decorative-dots dot-2"></div>
          <div className="decorative-dots dot-3"></div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="main-icon">🔧</div>
          
          <h1 className="main-title">
            Нажаль наш сайт поки що не доступний
          </h1>
          
          <p className="subtitle">
            Ми проводимо технічне обслуговування для покращення якості роботи сайту
          </p>
          
          <div className="status-card">
            <div className="status-header">
              <div className="status-indicator"></div>
              <span className="status-text">Статус: Технічне обслуговування</span>
            </div>
            
            <div className="working-text">
              <span>Працюємо над відновленням</span>
              <div className="loading-dots">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`dot ${dotAnimation > dot ? 'active' : 'inactive'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <p className="info-text">
              Очікуваний час відновлення: найближчим часом
            </p>
          </div>
          
          <button 
            className="action-button"
            onClick={() => window.location.reload()}
          >
            Оновити сторінку
          </button>
        </div>
      </div>
    </>
  )
}