const API_URL = "https://devlog-3mh9.onrender.com/posts";

const feed = document.getElementById("feed");
const categoryFilter = document.getElementById("categoryFilter");
const form = document.getElementById("postForm");

async function loadPosts(category = "All") {
  const res = await fetch(API_URL);
  let posts = await res.json();

  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (category !== "All") {
    posts = posts.filter(p => p.category === category);
  }

  if (feed) {
    feed.innerHTML = "";
    posts.forEach(post => {
      feed.innerHTML += `
        <div class="post-card">
          <span class="category ${post.category}">${post.category}</span>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <small>Posted at ${new Date(post.timestamp).toLocaleString()}</small><br>
          <button onclick="deletePost(${post.id})">Delete</button>
        </div>
      `;
    });
  }
}

async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  loadPosts(categoryFilter ? categoryFilter.value : "All");
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    loadPosts(categoryFilter.value);
  });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        category: category.value
      })
    });

    window.location.href = "index.html";
  });
}

loadPosts();
