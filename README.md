# Vibe Coding – Interactive Web Presentation

This project is an interactive web-based presentation about **Vibe Coding**, created as a **college multimedia course project**.
Instead of building a traditional PowerPoint presentation, the entire presentation was designed and implemented as a **live website**.

The goal was to explore how modern web technologies can turn a presentation into a more engaging and interactive experience.

## Overview

The website explains the concept of **Vibe Coding** — guiding AI tools with natural language prompts to generate and iterate on code.
It also explores how this workflow changes the way developers approach building software.

The presentation is structured like a slide deck, but implemented as a full web application with animations, smooth navigation, and interactive elements.

## Features

* Slide-style navigation using full-page scrolling
* Smooth animated transitions built with Framer Motion
* Dark cinematic UI design
* Arabic interface with full **RTL (Right-to-Left)** support
* Animated background elements and geometric shapes
* Interactive **Ask the Engineer** Q&A system
* Responsive layout for different screen sizes

## Ask the Engineer (Live Q&A)

The final section of the presentation includes a live interactive Q&A feature.

Users can:

* Submit a question with their name
* View questions submitted by others
* Open a question to view answers
* Add answers to existing questions

Questions and answers are stored in **MongoDB**, making the presentation interactive rather than static.

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **@fullpage/react-fullpage**
* **MongoDB**
* **Mongoose**
* **Vercel**

## Project Structure (simplified)

```
app/
components/
models/
api/
public/
```

Key parts of the project:

* `app/` – Next.js App Router pages and layout
* `components/` – reusable UI components
* `models/` – MongoDB models for questions and answers
* `api/` – API routes for handling questions and answers

## Running the Project Locally

1. Clone the repository

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file

```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

## Deployment

The project is deployed using **Vercel**.

Vercel automatically builds and deploys the app when changes are pushed to the GitHub repository.

## Purpose of the Project

This project was created to experiment with turning a traditional presentation into an interactive web experience while also exploring modern web development tools.

It demonstrates:

* Frontend animation and UI design
* Full-stack integration with a database
* Interactive user features
* Modern deployment workflows

## Feedback

Suggestions and feedback are always welcome.
