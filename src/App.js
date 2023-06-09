import React, { useState } from 'react';

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex', 
  justifyContent: 'center',
};

const contentStyle = {
  textAlign: 'center',
  display: 'flex', 
  flexDirection: 'column',
  width: '30%',
  padding: '80px 80px'
}

const titleStyle = {
  fontSize: '30px',
  marginBottom: '20px',
};

const fileInputLabelStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#533d8b',
  color: '#fff',
  fontSize: '16px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const resultContainerStyle = {
  marginTop: '40px',
};

const resultTitleStyle = {
  fontSize: '20px',
  marginBottom: '10px',
};

const resultTextStyle = {
  fontSize: '16px',
};

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPrediction(data);
      setImage(URL.createObjectURL(file)); 
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Coloque uma imagem de como você <br/> está se sentindo hoje:  </h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="upload-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-input" style={fileInputLabelStyle}>
          Selecionar Imagem
        </label>

        {image && <img src={image} alt="Imagem selecionada" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '20px' }} />}

        {prediction && (
          <div style={resultContainerStyle}>
            <h2 style={resultTitleStyle}>Resultado da Previsão:</h2>
            <p style={resultTextStyle}>{prediction.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;