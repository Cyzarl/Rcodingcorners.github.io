document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Capture form data
    const mood = document.getElementById("mood").value;
    const comment = document.getElementById("comment").value;
    const imageUrl = document.getElementById("imageUrl").value; // Capture the image URL
    let videoUrl = document.getElementById("videoUrl").value; // Capture the video URL

    // Convert YouTube or Vimeo link into an iframe embed (if it's a valid video URL)
    if (videoUrl) {
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            videoUrl = videoUrl.replace("watch?v=", "embed/");
            videoUrl = `<iframe width="360" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
        } else if (videoUrl.includes("vimeo.com")) {
            videoUrl = videoUrl.replace("vimeo.com", "player.vimeo.com/video");
            videoUrl = `<iframe width="360" height="315" src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
    }

    // Create a post object with the data
    const postData = {
        mood: mood,
        comment: comment,
        image: imageUrl ? imageUrl : null, // Use the URL if provided, else null
        video: videoUrl ? videoUrl : null // Store video iframe code if available
    };

    // Get existing posts from localStorage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postData); // Add new post to the array

    // Save the updated posts array back to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Redirect to index.html to show the post
    window.location.href = "index.html";
});