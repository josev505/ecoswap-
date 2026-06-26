You are editing the EcoSwap Figma project.
STRICT RULE: Do NOT remove, move, resize, recolor, or restyle any existing element.
ONLY ADD new elements as described below. Every addition must match the existing visual style: white/light gray backgrounds, teal green (#1A9E80) as primary color, dark navy (#0D3B4F) for text, rounded corners (8-12px), clean minimalist style.

════════════════════════════════════════
SCREEN 1 — Feed de productos
════════════════════════════════════════

ADD 1 — Location filter chip:
In the filter chips row (Estado, Todos, Tecnología, Música, Gaming, Hogar, Deportes, Otros), add a new chip button before "Estado" labeled "Ubicación" with a dropdown arrow. When tapped, it shows a scrollable list of city options: Chimbote, Lima, Trujillo, Arequipa. Same style as the "Estado" chip (white background, border, rounded corners, dark navy text).

ADD 2 — Rating filter chip:
In the same filter chips row, add another chip button after "Estado" labeled "Valoración ⭐" with a dropdown arrow. When tapped, shows options: 5 estrellas, 4+ estrellas, 3+ estrellas. Same chip style as existing filters.

ADD 3 — Heart/favorite button on each product card:
On each product card (Bicicleta de Montaña, Laptop HP Core i5, Guitarra Acústica), add a heart icon (♡) in the top-left corner of the product image, inside a small white circular button (28px diameter, white background, subtle shadow). On tap, the heart fills in teal green (#1A9E80).

ADD 4 — Seller profile photo on each product card:
At the bottom of each product card, below the product title and category tag, add a small row showing: a circular seller avatar (24px), the seller's name in small text (10px, #6B7280), same font as existing UI. Example: for Bicicleta de Montaña show "JV" avatar + "Jose V.", for Laptop show "AT" avatar + "Ana T.", for Guitarra show "SR" avatar + "Sofia R."

ADD 5 — Bolder product title typography:
Make the product title text on each card (Bicicleta de Montaña, Laptop HP Core i5, Guitarra Acústica) bold and increase font size by 2px compared to current. Do not change color or font family.

ADD 6 — Search bar auto-hide on scroll:
Add a scroll behavior property to the search bar frame so that it hides (opacity 0, slides up) when the user scrolls down, and reappears when scrolling up. This is a prototype/interaction behavior, not a visual change.

════════════════════════════════════════
SCREEN 2 — Detalle del producto (Laptop HP Core i5)
════════════════════════════════════════

ADD 1 — Beige background:
Change the screen background color from white (#FFFFFF) to warm beige (#FAF7F2). Apply only to the screen background frame, not to any card or component inside it.

ADD 2 — Comments/reviews section:
Below the "Ubicación en Chimbote" map card, add a new section titled "Reseñas del vendedor" with the same section title style as "Descripción" (bold, dark navy, #0D3B4F). Inside, add 2 sample review cards, each containing: a circular user avatar (32px), username in bold (12px), star rating (1-5 yellow stars), and a short review text (11px, gray #6B7280). Example reviews: "María G. ⭐⭐⭐⭐⭐ Excelente vendedor, producto tal como se describe." and "Carlos M. ⭐⭐⭐⭐ Buen intercambio, muy puntual."

ADD 3 — Seller public profile link:
In the existing "Vendedor Verificado" card (where Ana Torres appears), add a small teal green text link below her name that says "Ver perfil completo →" (11px, #1A9E80). On tap, it navigates to the Perfil de usuario screen.

ADD 4 — Related products vertical carousel:
Below the "Reseñas del vendedor" section, add a new section titled "Productos relacionados" with the same title style. Inside, add a vertical list of 2 small product cards, each showing: a small product image (60x60px, rounded 8px), product name in bold (12px), category tag, and distance badge. Match the card style of the main feed.

════════════════════════════════════════
SCREEN 3 — Inicio de sesión
════════════════════════════════════════

ADD 1 — Beige background:
Change the screen background color from white/light gray to warm beige (#FAF7F2). Apply only to the screen background, not to the login card.

ADD 2 — Remember session checkbox:
Below the password field and above the "¿Olvidaste tu contraseña?" link, add a row with a checkbox (16px, rounded 4px, teal green when checked) and the label "Recordar sesión" (12px, #0D3B4F). Default state: unchecked.

════════════════════════════════════════
SCREEN 4 — Chat de negociación
(locate this screen in the Figma file and apply)
════════════════════════════════════════

ADD 1 — Product image in chat header:
In the chat header bar (where the other user's name and avatar appear), add a small product thumbnail image (40x40px, rounded 8px) to the right of the user's name, showing the product being negotiated. Below the thumbnail add a tiny label "Negociando:" in gray (10px).

════════════════════════════════════════
SCREEN 5 — Perfil de usuario (Jose Villanueva)
════════════════════════════════════════

ADD 1 — Additional badges in "Logros Desbloqueados":
In the existing "Logros Desbloqueados" section, add 2 more badge cards in the unlocked style (teal green background): "Vendedor Estrella" with subtitle "Recibiste 10 reseñas positivas" and "Cuenta Verificada" with subtitle "Identidad confirmada". Match exact style of existing unlocked badges (Primera Estrella, Intercambiador Frecuente, Confianza Total).

ADD 2 — Verified identity badge on profile header:
In the profile header (next to "Jose Villanueva ○"), replace the existing empty circle icon with a filled teal green checkmark badge (✓) labeled "Verificado" in small text (10px, white). Same position, just enhanced visually.

ADD 3 — Editar Perfil button interaction:
Add a prototype connection to the "Editar Perfil" button so that on click it navigates to a new screen that is a duplicate of this profile screen, where the name field, photo, and bio become editable input fields with a "Guardar cambios" button at the bottom.

════════════════════════════════════════
SCREEN 6 — Logística del Intercambio
════════════════════════════════════════

No changes needed on this screen.

════════════════════════════════════════
SCREEN 7 — Comunidad (PageTurners Chimbote)
════════════════════════════════════════

ADD 1 — Online activity indicators:
Next to each user avatar in the chat (Sofia R., Marco D., Ana P., Luis V., Carmen T.), add a small green dot (8px, #1A9E80) at the bottom-right of the avatar circle to indicate online status.

ADD 2 — Date separators:
Between message groups from different times, add a horizontal date separator. Between early messages (09:14-09:25) and later messages (09:40-09:48), insert a centered text label "Hoy" with a horizontal line on each side. Style: small gray text (10px, #9CA3AF), thin gray lines (#E5E7EB).

ADD 3 — Swap offer detection badge:
On the message from Marco D. that says "Me quedo con Sapiens! Sofía coordinamos por privado 😊", add a small teal pill badge above or beside the message bubble labeled "🔄 Oferta detectada" (10px, white text, #1A9E80 background, rounded 12px). Same for Luis V.'s message "Me parece genial! Los clásicos de Alan Moore son una joya."

ADD 4 — Community alerts button:
Above the "Unirte a la comunidad" green button, add a secondary outlined button (white background, teal border #1A9E80, teal text) labeled "🔔 Activar alertas de la comunidad". Same width as the "Unirte" button, 8px gap between them.
