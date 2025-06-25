import { useRef, useState } from 'react';

export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const secondaryColor = isDarkMode ? '#f0f0f0' : '#333333';
  const buttonBg = isDarkMode ? '#ffffff' : '#000000';
  const buttonHoverBg = isDarkMode ? '#dddddd' : '#333333';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      color: textColor,
      overflow: 'hidden'
    }}>
      {/* Background Image */}
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
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)', // Filtros leves
        backdropFilter: 'blur(2px)', // Suaviza o fundo sem apagar a imagem
        zIndex: -1
      }}></div>

      {/* Importação das fontes */}
      <style jsx>{`
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

      {/* Música */}
      <audio ref={audioRef} loop>
        <source src="/musiquinha.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      {/* Tela de Bloqueio */}
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

      {/* Botão de Dark Mode */}
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
