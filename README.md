# Weslen Py — Portfolio

Personal portfolio site for **Weslen Py**, Backend Developer specialized in Python, Go and TypeScript. Static site, no build step, no framework — plain HTML/CSS/JS.

🔗 Sections: Home · About · Selected Work · Services · Skills · Contact

## Features

- Fully responsive, dark purple theme with CSS custom properties for easy re-theming (`--hue` in `assets/css/styles.css`).
- Home hero with a fake terminal window and a typed-text effect (Typed.js).
- **Selected Work** — infinite auto-scrolling marquee of real projects, pauses on hover, cards grow/elevate on hover.
- **Services** — accordion list.
- **Skills** — categorized icon grid (via [skillicons.dev](https://skillicons.dev), with a manual icon fallback for logos that render blank on that service).
- **Contact** — typographic call-to-action instead of boxed cards.
- Easter egg: click the Python skill card.
- Scroll-triggered reveal animations (ScrollReveal), active nav-link highlighting, mobile menu, scroll-to-top button.

## Stack

- HTML5 / CSS3 (custom properties, Grid, Flexbox) / vanilla JavaScript — no build tooling required.
- [Remix Icon](https://remixicon.com/), [Typed.js](https://github.com/mattboldt/typed.js/), [ScrollReveal](https://scrollrevealjs.org/) via CDN.
- [skillicons.dev](https://skillicons.dev) for technology badges in the Skills section.

## Run locally

No build step — serve the folder statically and open it:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`. Opening `index.html` directly in a browser also works, since there's no bundler involved.

## Project structure

```text
index.html
assets/
  css/styles.css
  js/main.js
  img/            # favicon, decorative images
robots.txt
```

## Credits

Originally scaffolded from the **Bianca** template by [Bedimcode](https://www.youtube.com/@Bedimcode) ([original tutorial repo](https://github.com/bedimcode/responsive-porfolio-website-Bianca)). Content, design system, and most section layouts (Work marquee, Services accordion, Skills grid, Contact) have since been rewritten.
