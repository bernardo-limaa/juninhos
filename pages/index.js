import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  return (
    <div style={{
      fontFamily: `'Cinzel', serif`, // Fonte mais "épica"
      background: 'linear-gradient(135deg, #0f0f0f, #1c1c1c)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      color: 'white'
    }}>
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
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <button
            onClick={startMusic}
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '30px 60px',
              fontSize: '2rem',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            ▶️
          </button>
        </div>
      )}

      {/* Logo */}
      <header style={{
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <img src="/logo.gif" alt="Logo" style={{
          maxWidth: '300px',
          marginBottom: '20px'
        }} />
        <h1 style={{
          fontSize: '4rem',
          textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
          letterSpacing: '2px'
        }}>
          JUNINHOS DA CAIXA XXV
        </h1>
        <p style={{
          fontSize: '1.5rem',
          marginTop: '10px',
          textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
          fontStyle: 'italic',
          color: '#cccccc'
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
        <p style={{
          maxWidth: '800px',
          textAlign: 'center',
          fontSize: '1.8rem',
          lineHeight: '1.6',
          color: '#dddddd',
          textShadow: '1px 1px 5px rgba(0,0,0,0.5)'
        }}>
          Em um mundo onde apenas os verdadeiros podem carregar o estandarte, surge JUNINHOS DA CAIXA XXV. Uma saga de honra, amizade e caixas... muitas caixas. 📦🗡️
        </p>

        <button style={{
          marginTop: '40px',
          backgroundColor: '#ffffff',
          color: '#000000',
          border: 'none',
          padding: '15px 30px',
          fontSize: '1.5rem',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
          transition: 'background-color 0.3s'
        }}
          onClick={() => window.location.href = 'https://www.omfgdogs.com/'}
          onMouseOver={(e) => e.target.style.backgroundColor = '#dddddd'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Avançar no Destino ⚔️
        </button>
      </main>

      {/* Rodapé */}
      <footer style={{
        backgroundColor: '#1c1c1c',
        padding: '15px',
        textAlign: 'center',
        color: '#aaaaaa',
        fontSize: '1.2rem',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        © 2025 JUNINHOS DA CAIXA XXV - Estandarte da CIA 2025
      </footer>
    </div>
  );
}
