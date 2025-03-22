let video;
let bodyPose;
let poses = [];
let connections;

let showKeypoints = false;
let showSkeleton = false;
let selectedImage = null;
let overlayImage;

// let bald_hair_img, bald_img, cat_img, dog_img, evil_horn_eye_img, eye_img, flower_hairband_img, neon_facemask_img, glass_img, skeleton_mask_img;


let selectKeypoints = {
    nose: true,
    left_eye: true,
    right_eye: true,
    left_ear: true,
    right_ear: true,
    left_shoulder: true,
    right_shoulder: true,
    left_elbow: true,
    right_elbow: true,
    left_wrist: true,
    right_wrist: true,
    left_hip: true,
    right_hip: true,
    left_knee: true,
    right_knee:true,
    left_ankle: true,
    right_ankle: true
}

function preload() {
    // Load the bodyPose model
    bodyPose = ml5.bodyPose("MoveNet");
}

// function mousePressed() {
//     console.log(poses);
// }

document.addEventListener("DOMContentLoaded", function () {
    setupEventListeners();
});

// Setup event listeners for the buttons/UI
// function setupEventListeners() {
//     document.getElementById("toggleKeypoints").addEventListener("change", function () {
//         showKeypoints = this.checked;
//     });

//     document.getElementById("toggleSkeleton").addEventListener("change", function () {
//         showSkeleton = this.checked;
//     });

//     let keypointsList = ["nose", "left_eye", "right_eye", "left_ear", "right_ear", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle"];
    
//     Object.keys(selectKeypoints).forEach(keypoint => {
//         document.getElementById(keypoint).addEventListener("change", function () {
//             selectedKeypoints[keypoint] = this.checked;
//         });
//     });
// }

function setupEventListeners() {
    let toggleKeypoints = document.getElementById("toggleKeypoints");
    let toggleSkeleton = document.getElementById("toggleSkeleton");
    let imageOptions = document.querySelectorAll(".image-option");

    if (toggleKeypoints) {
        toggleKeypoints.addEventListener("change", function () {
            showKeypoints = this.checked; // 🔹 Updates keypoint visibility
        });
    } else {
        console.error("Element with ID 'toggleKeypoints' not found."); // 🔹 Logs error if element is missing
    }

    if (toggleSkeleton) {
        toggleSkeleton.addEventListener("change", function () {
            showSkeleton = this.checked; // 🔹 Updates skeleton visibility
        });
    } else {
        console.error("Element with ID 'toggleSkeleton' not found."); // 🔹 Logs error if element is missing
    }

    imageOptions.forEach(img => {
        img.addEventListener("click", function(){
            document.querySelectorAll(".image-option").forEach(img => img.classList.remove("selected"));
            this.classList.add("selected");
            selectedImage = this.getAttribute("data-image");  
            overlayImage = loadImage(selectedImage);
        });
    });
}

function gotPoses(results) {
    poses = results;
    // console.log(poses);
}

function setup() {
    createCanvas(640, 480);

    // Create the video and hide it
    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 480);

    // Start continously detecting poses in the webcam video 
    bodyPose.detectStart(video, gotPoses);

    // Get the skeleton connection information
    connections = bodyPose.getSkeleton();

    setupEventListeners();

}

function draw() {
    image(video, 0, 0, width, height);
    
    // if (selectedImage) {
    //     let img = loadImage(selectedImage);
    //     image(img, pose.keypoints[0].x, pose.keypoints[0].y, 100, 100);
    // }

    if (poses.length > 0 && poses[0] !== undefined) {
        let pose = poses[0];
        // let pose = poses[0].keypoints;


        // console.log(poses[0].keypoints);

        // Get facial keypoints (eyes, nose )
        let nose = pose.keypoints[0];  // Nose
        let left_eye = pose.keypoints[1];   // Left eye
        let right_eye = pose.keypoints[2];  // Right eye

        // Get face center and scaling
        if (nose.confidence > 0.1 && left_eye.confidence > 0.1 && right_eye.confidence > 0.1) {
            let faceCenterX = nose.x;
            let faceCenterY = nose.y;
            let faceWidth = dist(left_eye.x, left_eye.y, right_eye.x, right_eye.y) * 2;
            let faceHeight = faceWidth * 1.8;

            // Draw the overlay image on face
            if (overlayImage) {
                image(overlayImage, faceCenterX - faceWidth / 2, faceCenterY - faceWidth /2, faceWidth, faceHeight);
            }
        }

        // let nose_x = pose.keypoints[0].x;
        // let nose_y = pose.keypoints[0].y;
        // fill(255, 45, 60)
        // circle(nose_x,nose_y, 20)

        // let left_wrist_x = pose.left_wrist.x;
        // let left_wrist_y = pose.left_wrist.y;

        // let right_wrist_x = pose.right_wrist.x;
        // let right_wrist_y = pose.right_wrist.y;

        // if (pose.left_wrist.confidence > 0.30) {
        //     fill(50, 50, 50);
        //     circle(left_wrist_x, left_wrist_y, 20);
        // }
        
        // if (pose.right_wrist.confidence > 0.30) {
        //     fill(50, 50, 50);
        //     circle(right_wrist_x, right_wrist_y, 20);
        // }

        // let d = dist(left_wrist_x, left_wrist_y, right_wrist_x, right_wrist_y);
        
        // fill(0, 255, 0);
        // circle(nose_x, nose_y, 0.95*d);
        

        // Draw the keypoints
        if (showKeypoints) {
            for (let i = 0; i < pose.keypoints.length; i++) {
                let keypoint = pose.keypoints[i];
                fill(36, 200, 50);
    
                if (keypoint.confidence > 0.1) {
                    circle(keypoint.x, keypoint.y, 20);
                }   
    
            }
        }
        

        // Draw the skeleton
        if (showSkeleton) {
            for (let i = 0; i < connections.length; i++ ) {
                let connection = connections[i];
                let pointAIndex = connection[0];
                let pointBIndex = connection[1];
                let pointA = pose.keypoints[pointAIndex];
                let pointB = pose.keypoints[pointBIndex];
                
                if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                    stroke(90, 90, 90);
                    strokeWeight(6);
                    line(pointA.x, pointA.y, pointB.x, pointB.y);
                }
    
            }
        }
        
    } else {
        console.warn("No pose detected yet...");
    }
}


