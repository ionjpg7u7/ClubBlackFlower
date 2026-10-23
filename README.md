# Black Flower (Astro)

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # genera /dist

- Eventos: `src/data/events.json`
- Campañas / diseños: copia los archivos a `public/campanas/` y regístralos en `src/data/campanas.json`
  (`tamano`: "grande", "ancho", "alto" o vacío; `video` opcional, se reproduce solo y sin sonido)
- Paleta: atributo `data-theme` en `src/layouts/Layout.astro`.
  Temas: plata (por defecto), acero, hielo, medianoche, magenta, rubi, violeta.
  Vista previa rápida: añade `?tema=hielo` a la URL.
- WhatsApp: `CONFIG` en `src/scripts/main.js` y el enlace `tel:` en `src/components/Contact.astro`
