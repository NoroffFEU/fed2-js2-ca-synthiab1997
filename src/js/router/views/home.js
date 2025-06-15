import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { onReadAllPosts } from "../../api/post/read.js";

authGuard(); // Ensure the user is logged in before accessing home
setLogoutListener(); // Attach logout functionality

// Load all posts initially
onReadAllPosts();

// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  onReadAllPosts(query); // Reload posts with search term
});
