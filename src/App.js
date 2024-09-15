import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    taxa_crime_p_cidade: 0.00632,
    proporcao_terreno_zoneados: 18.0,
    proporcao_negocios_p_cidade: 2.31,
    rio_charles: 1,
    concentracao_oxidos_nitricos: 0.469,
    numero_medio_comodos: 7.147,
    proporcao_proprietarios_casas_1940: 78.9,
    distancia_centro_empresarial: 4.0900,
    indice_accessibilidade_rodovias: 3,
    taxa_imposto: 273.0,
    proporcao_alunos_x_professor_p_cidade: 18.7,
    proporcao_comunidade_negra_p_cidade: 394.63,
    proporcao_pobreza: 9.67,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://housing-price-serc.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      alert('Erro ao enviar os dados');
      console.error('Erro ao enviar os dados', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Previsão de Preço de Residência em Boston
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              name={key}
              label={key.replace(/_/g, ' ')}  // Formata o nome do campo removendo os underscores
              value={formData[key]}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ))}

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </form>

      {prediction && (
        <Typography variant="h6" sx={{ mt: 4, color: 'green' }}>
          O preço médio de uma residência em Boston com as informações fornecidas é de USD {prediction.toFixed(2)}
        </Typography>
      )}
    </Container>
  );
}

export default App;
