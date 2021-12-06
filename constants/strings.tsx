import * as React from "react";

// To use a string in a file, do
// import i18n from "i18n-js";
//then where the string goes put i18n.t("variable_name")
export const strings = {
  "en-US": {
    all_podcasts: "All Podcasts",
    browse: "Browse",
    favorites: "Favorites",
    settings: "Settings",
    loading: "Loading...",
    language: "Language",
    volume_analysis: "Volume Analysis",
    sentiment_analysis: "Sentiment Analysis",
    pitch_analysis: "Pitch Analysis",
    logout: "Logout", 
    favorite_podcasts: "Your Favorite Podcasts"
  },
  en: {
    all_podcasts: "All Podcasts",
    browse: "Browse",
    favorites: "Favorites",
    settings: "Settings",
    loading: "Loading...",
    language: "Language",
    volume_analysis: "Volume Analysis",
    sentiment_analysis: "Sentiment Analysis",
    pitch_analysis: "Pitch Analysis",
    logout: "Logout",
    favorite_podcasts: "Your Favorite Podcasts"
  },
  es: {
    all_podcasts: "Todos Los Podcasts",
    browse: "Navegar",
    favorites: "Favoritos",
    settings: "Configuración",
    loading: "Cargando...",
    language: "Lenguaje",
    volume_analysis: "Análisis de Volumen",
    sentiment_analysis: "Análisis de Sentimiento",
    pitch_analysis: "Análisis de Tono",
    logout: "Cerrar Sesión",
    favorite_podcasts: "Tus Podcasts Favoritos"
  }
};

export const languages_supported = [
  { code: "en-US", name: "English" },
  { code: "es", name: "Español" }
];
