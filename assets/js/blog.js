// JavaScript for Modal Pop-up on blog.html
function openModal(blogId) {
    // Show the modal
    const modal = document.getElementById("blogModal");
    modal.style.display = "flex";

    // Hide all blog content in modal first
    const blogContents = document.querySelectorAll(".modal-blog-content");
    blogContents.forEach(content => content.style.display = "none");

    // Show the selected blog content
    const selectedBlogContent = document.getElementById(blogId);
    if (selectedBlogContent) {
        selectedBlogContent.style.display = "block";
    }
}

function closeModal() {
    const modal = document.getElementById("blogModal");
    modal.style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("blogModal");
    if (event.target === modal) {
        closeModal();
    }
}
