# FaceUp

FaceUp is a web-based application that allows users to overlay different facial accessories on their images using **p5.js** and **ml5.js** for pose detection. The project detects **13 keypoints of the body** and uses **facial key points** to accurately overlay face accessories.

## 🚀 Features
- **Full-body keypoint detection** using **ml5.js**
- **Facial keypoint tracking** for accurate placement of overlays
- Various face accessories (glasses, masks, etc.) to choose from
- Interactive UI with toggleable keypoints and skeleton visualization
- Simple and lightweight, built with HTML, CSS, and JavaScript

## 📁 Project Structure
```
FaceUp/
├── index.html        # Main HTML file
├── public/
│   └── images/       # Image assets (overlays like glasses, masks, etc.)
├── src/
│   ├── sketch.js     # JavaScript file handling pose detection and image overlays
│   └── style.css     # Styling for the project
└── README.md         # Project documentation
```

## 📦 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Sourabh-Kumar04/FaceUp.git
   ```
2. Navigate to the project directory:
   ```sh
   cd FaceUp
   ```
3. Open `index.html` in a browser to run the application locally.

## 🚀 Deployment
You can deploy FaceUp on **Vercel** by following these steps:
1. Install Vercel CLI (if not installed):
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```
Follow the CLI instructions to complete deployment.

## 📷 Usage
- Open the webpage.
- Select an image overlay from the provided options.
- Enable or disable full-body keypoints and skeleton for visualization.
- Apply facial overlays (glasses, masks, etc.) precisely using facial keypoints.

## 🛠️ Technologies Used
- **p5.js** - For canvas rendering
- **ml5.js** - For body and face keypoint detection
- **HTML, CSS, JavaScript** - Frontend development

## 📜 License
This project is open-source and available under the **Apache License 2.0**.

---
Made with ❤️ by [Sourabh Kumar](https://linkedin.com/in/sourabh-kumar04)

