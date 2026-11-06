# Alexander Ezra Alma — Portfolio

A responsive, single-page personal portfolio for a Data Analyst & Accounting Professional.
Built with plain HTML, CSS and JavaScript — no frameworks or build step.

## Features
- Responsive layout with a mobile dropdown menu
- Light / dark theme toggle (remembers your choice)
- Scroll progress bar, active nav highlighting and back-to-top button
- Fade-in section animations and a rotating job-title effect
- One-click "Copy email" button
- Print-friendly styles

## Project structure
```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── profile-photo.jpg
├── .gitignore
└── README.md
```

## Run locally
Open `index.html` in any browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy with GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` after a minute or two.

## Customize
- Text and sections: edit `index.html`
- Colors and fonts: edit the CSS variables at the top of `css/style.css`
- Rotating titles: change the `data-words` attribute on the `#typed` element in `index.html`
- Photo: replace `images/profile-photo.jpg`

## Contact
alexanderalma43@gmail.com
