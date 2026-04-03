# RohanOS v3.0.1 - Developer Portfolio

Welcome to **RohanOS**, an immersive, interactive developer portfolio built to resemble a fully functional desktop operating system right in your browser.

![RohanOS Desktop](./public/window.svg)  <!-- Update this later with a screenshot of your OS -->

## 🌐 Live Demo

Check out the live version: [https://rohan3k49.vercel.app/](https://rohan3k49.vercel.app/)

## 🚀 Features

RohanOS isn't just a static page; it's a dynamic experience packed with features:

- **Interactive Desktop GUI:** Complete with draggable windows, a functioning taskbar, a real-time system clock, and CPU/RAM monitors.
- **Boot Sequence & Under Construction Warning:** Authentic terminal-like startup screen sequence.
- **Working Terminal App:** A powerful terminal simulation. Try commands like `neofetch`, `help`, `whoami`, `clear`, and `sudo hire rohan`.
- **Applications:**
  - **Projects Directory:** View my latest work, tech stacks, and Git repositories.
  - **Web Browser:** An immersive way to explore external links and embedded experiences.
  - **Settings App:** Tweak system aesthetics like theme color and wallpaper (Matrix Rain, Solid, etc.).
- **Easter Eggs & Mini-Games:** Windowed playable versions of classic games like **Snake** and **Pong**. Hidden commands and interactions throughout.
- **3D Interactive Elements:** An interactive 3D WebGL Resume Orb using Three.js mapping that lets you download my CV directly.
- **Rich Tech Stack:** Built using modern web development practices and tools, optimized for performance and experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/) with `@react-three/fiber` and `@react-three/drei`
- **Icons:** `lucide-react`
- **Language:** TypeScript

## 💻 Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohan1205/PORTFOLIO-1.git
   ```
2. Navigate to the project directory:
   ```bash
   cd PORTFOLIO-1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

- `/app` - Next.js 14 App Router layout and entry pages.
- `/components` - Modular React components.
  - `/apps` - Contains individual windowed applications like `ProjectsApp`, `TerminalApp`, `SettingsApp`.
  - `/3d` - Contains Three.js components such as `ResumeOrb`.
- `/public` - Static assets, fonts, icons, and downloadable files like `resume.pdf`.

## 🤝 Contact / Hiring

Interested in working together or hiring me? Use the terminal and type `sudo hire rohan` to find out how to reach me! 

---
_A creative portfolio experience designed and built by Rohan Yadav._
