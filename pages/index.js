import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const audioRef = useRef(null);
  const cursorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const colors = [
    "#FFD700",
    "#FF8C00",
    "#FF4500",
    "#FB68EE",
    "#FF69B4",
    "#00CED1"
  ];

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const createSparkle = (x, y) => {
    const id = Date.now() + Math.random();
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 15 + 5;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 10;

    const sparkle = { id, x, y, color, size, angle, distance };
    setSparkles((prev) => [...prev, sparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      createSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (cursorRef.current) {
        cursorRef.current.style.left = `${touch.clientX}px`;
        cursorRef.current.style.top = `${touch.clientY}px`;
      }
      createSparkle(touch.clientX, touch.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const secondaryColor = isDarkMode ? '#f0f0f0' : '#333333';
  const buttonBg = isDarkMode ? '#ffffff' : '#000000';
  const buttonHoverBg = isDarkMode ? '#dddddd' : '#333333';

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      color: textColor,
      overflow: 'hidden'
    }}>
      {/* Cursor */}
      <div ref={cursorRef} className="cursor"></div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="cursor-trail"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 10px ${sparkle.color}`,
            animation: `sparkleMove 1s forwards cubic-bezier(0.4, 0, 0.2, 1)`,
            '--dx': `${Math.cos(sparkle.angle) * sparkle.distance}px`,
            '--dy': `${Math.sin(sparkle.angle) * sparkle.distance}px`
          }}
        ></div>
      ))}

      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }}></div>

      {/* Overlay Filter */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(2px)',
        zIndex: -1
      }}></div>

      {/* CSS Global + Local */}
      <style jsx global>{`
        body {
          cursor: none;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <style jsx>{`
        .cursor-trail {
          position: fixed;
          pointer-events: none;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
        }

        @keyframes sparkleMove {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
          }
        }

        @font-face {
          font-family: 'FFSymbols';
          src: url('/fonts/FFSymbols.ttf') format('truetype');
        }

        @font-face {
          font-family: 'FinalFantasyElements';
          src: url('/fonts/FinalFantasyElements.TTF') format('truetype');
        }

        @font-face {
          font-family: 'FinalFantasy';
          src: url('/fonts/Final-Fantasy.ttf') format('truetype');
        }

        @font-face {
          font-family: 'FinalF';
          src: url('/fonts/FANTASYMAGIST.otf') format('truetype');
        }

        .ff-symbols {
          font-family: 'FFSymbols';
        }

        .ff-elements {
          font-family: 'FinalFantasyElements';
        }

        .ff-final {
          font-family: 'FinalFantasy';
        }

        .ff-f {
          font-family: 'FinalF';
        }
      `}</style>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/musiquinha.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      {/* Overlay Inicial */}
      {showOverlay && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <button
            onClick={startMusic}
            className="ff-symbols"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              color: '#ffffff',
              border: 'none',
              padding: '1px 10px',
              fontSize: '24rem',
              borderRadius: '60%',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            h
          </button>
        </div>
      )}

      {/* Botão Dark Mode */}
      <button style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: buttonBg,
        color: isDarkMode ? '#000000' : '#ffffff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s'
      }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverBg}
        onMouseOut={(e) => e.target.style.backgroundColor = buttonBg}
      >
        {isDarkMode ? '☀︎' : '⋆⁺‧₊☽◯☾₊‧⁺⋆'}
      </button>

      {/* Logo */}
      <header style={{
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <img src="/logo.png" alt="Logo" style={{
          maxWidth: '1200px',
          marginBottom: '20px'
        }} />
        <h1 className="ff-f" style={{
          fontSize: '10rem',
          textShadow: '2px 2px 10px rgba(0,0,0,0.1)',
          letterSpacing: '2px'
        }}>
          JUNINHOS DA CAIXA XXV
        </h1>
        <p className="ff-final" style={{
          fontSize: '1.5rem',
          marginTop: '10px',
          fontStyle: 'bold',
          color: textColor
        }}>
          Estandarte da CIA 2025
        </p>
      </header>

      {/* Corpo Principal */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <p className="ff-f" style={{
          maxWidth: '800px',
          textAlign: 'center',
          fontSize: '1.8rem',
          lineHeight: '1.6',
          color: textColor
        }}>
          Em um mundo onde apenas os verdadeiros podem carregar o estandarte, surge JUNINHOS DA CAIXA XXV. Uma saga de honra, amizade e caixas... muitas caixas. 📦🗡️
        </p>

        <button className="ff-symbols" style={{
          marginTop: '40px',
          backgroundColor: buttonBg,
          color: isDarkMode ? '#000000' : '#ffffff',
          border: 'none',
          padding: '15px 30px',
          fontSize: '1.5rem',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s'
        }}
          onClick={() => window.location.href = 'https://www.omfgdogs.com/'}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverBg}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonBg}
        >
          Avançar no Destino ⚔️
        </button>
      </main>

      {/* Rodapé */}
      <footer style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: '15px',
        textAlign: 'center',
        color: secondaryColor,
        fontSize: '1.2rem',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        © 2025 JUNINHOS DA CAIXA XXV - Estandarte da CIA 2025
      </footer>
    </div>
  );
}
