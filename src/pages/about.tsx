import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Acerca de Nosotras
      </Typography>

      <Card sx={{ maxWidth: 800, padding: "1.5rem", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>

          <strong>  Nuestra Historia </strong>

          </Typography>
          <Typography variant="body1" gutterBottom>
        Somos un emprendimiento familiar que nació en 2022 como el sueño compartido entre madre e hija. Desde nuestros inicios, hemos trabajado juntas con dedicación y pasión, creando bisutería artesanal única. Cada pieza, ya sea una pulsera, collar, arete o anillo, está hecha 100% a mano, utilizando diversas técnicas que reflejan nuestra creatividad y amor por lo que hacemos. Además, hemos ampliado nuestra oferta para incluir productos como bolsos, billeteras, mochilas y salveques, siempre manteniendo nuestro compromiso con la calidad y el diseño original.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
          <strong>  Nuestra Misión</strong>
          </Typography>
          <Typography variant="body1" gutterBottom>
          Brindar a nuestros clientes productos únicos y de alta calidad, hechos con amor y dedicación. Nos enfocamos en promover la artesanía local y crear piezas que resalten la belleza y la individualidad de cada persona. Nuestro objetivo es fusionar creatividad y funcionalidad, aportando valor a cada accesorio que diseñamos.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
          <strong>Nuestros Valores</strong>  
          </Typography>
          <Typography variant="body1" gutterBottom>
            - <strong>Artesanía:</strong> Valoramos el trabajo manual y la dedicación detrás de cada pieza.
            <br />
            - <strong>Creatividad:</strong> Nos esforzamos por innovar en cada diseño, ofreciendo productos únicos.
            <br />
            - <strong>Calidad:</strong> Cada detalle cuenta; trabajamos con materiales de primera para garantizar la excelencia.
            - <strong>Cercanía:</strong> Somos una familia al servicio de nuestros clientes, ofreciendo atención personalizada.

            - <strong>Sostenibilidad:</strong> Promovemos la producción responsable y consciente.

          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
          <strong> ¿Por qué Elegirnos?</strong>
          </Typography>
          <Typography variant="body1">
          Porque somos más que un negocio; somos una familia que trabaja con pasión y amor por lo que hace. Cada uno de nuestros productos es único, hecho a mano con dedicación y técnicas artesanales que garantizan su calidad y originalidad. Además, nuestra variedad de productos no solo embellece, sino que también aporta funcionalidad a la vida diaria. Elegirnos es apoyar un emprendimiento local comprometido con la creatividad y el buen gusto. ¡Déjate sorprender por el detalle y la exclusividad que ponemos en cada creación!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
