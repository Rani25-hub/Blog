
// NOCTRA blog website - basic JavaScript
// The sample blogs are stored in an array. New blogs are saved in localStorage.

const blogs = [
  {
    title: "The next era of smart cities",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    category: "Technology",
    author: "NOCTRA Team",
    summary: "How technology can help make cities cleaner, safer and easier to live in.",
    body: "Technology is changing the way cities work. Sensors, smart traffic lights and better public transport can help reduce problems in busy areas.\n\nHowever, a smart city is not only about technology. It should also have clean spaces, good roads and services that are useful for everyone."
  },
  {
    title: "Will AI change the way we learn?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    category: "AI",
    author: "NOCTRA Team",
    summary: "A look at how artificial intelligence is becoming part of education.",
    body: "Artificial intelligence is becoming a useful tool for students and teachers. It can explain difficult topics, help with research and provide practice questions.\n\nStudents still need to think for themselves and check the information they receive. AI works best when it supports learning instead of replacing it."
  },
  {
    title: "Why curiosity matters in science",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    category: "Science",
    author: "NOCTRA Team",
    summary: "Many discoveries begin with a simple question about the world around us.",
    body: "Science starts with observation and questions. When people notice something unusual, they try to understand why it happens.\n\nExperiments and evidence help us test our ideas. Curiosity encourages us to keep learning and improve our understanding."
  },
  {
    title: "The influence of music on culture",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    category: "Culture",
    author: "NOCTRA Team",
    summary: "Music connects people and reflects the traditions of different communities.",
    body: "Music is an important part of many cultures. Songs can share stories, celebrate events and express feelings that are difficult to explain in words.\n\nAs people and technology connect, music styles also travel between countries and communities."
  },
  {
    title: "Small habits for a better day",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    category: "Lifestyle",
    author: "NOCTRA Team",
    summary: "Simple everyday habits can help us use our time in a better way.",
    body: "A good routine does not need to be complicated. Planning a few tasks, taking short breaks and keeping some time for hobbies can make a day feel more organised.\n\nSmall changes become useful when we follow them regularly."
  },
  {
    title: "How websites are built",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    category: "Technology",
    author: "NOCTRA Team",
    summary: "HTML, CSS and JavaScript work together to create websites.",
    body: "HTML gives a webpage its structure. CSS controls how the page looks, including colours, spacing and layout.\n\nJavaScript adds actions such as searching, opening forms and changing page content. These three technologies are a common starting point for learning web development."
  }
];

const blogList = document.getElementById("blog-list");
const searchInput = document.getElementById("search-input");
const emptyMessage = document.getElementById("empty-message");
const resultMessage = document.getElementById("result-message");
const writeDialog = document.getElementById("write-dialog");
const readDialog = document.getElementById("read-dialog");

let selectedCategory = "All";
let userBlogs = JSON.parse(localStorage.getItem("noctraBlogs")) || [];
let allBlogs = blogs.concat(userBlogs);

// Display blogs on the page
function showBlogs() {
  const searchText = searchInput.value.toLowerCase();

  const filteredBlogs = allBlogs.filter(function(blog) {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchText) ||
      blog.summary.toLowerCase().includes(searchText) ||
      blog.author.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  blogList.innerHTML = "";

  filteredBlogs.forEach(function(blog) {
    const card = document.createElement("article");
    card.className = "blog-card";

    const thumbnail = document.createElement("img");
    thumbnail.className = "card-thumbnail";
    thumbnail.src = blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";
    thumbnail.alt = blog.title;
    thumbnail.loading = "lazy";

    const content = document.createElement("div");
    content.className = "blog-card-content";

    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = blog.category;

    const title = document.createElement("h3");
    title.textContent = blog.title;

    const summary = document.createElement("p");
    summary.textContent = blog.summary;

    const byline = document.createElement("p");
    byline.className = "byline";
    byline.textContent = "By " + blog.author;

    const readButton = document.createElement("button");
    readButton.className = "read-button";
    readButton.textContent = "Read more";
    readButton.addEventListener("click", function() {
      openBlog(blog);
    });

    content.append(category, title, summary, byline, readButton);
    card.append(thumbnail, content);
    blogList.appendChild(card);
  });

  emptyMessage.hidden = filteredBlogs.length !== 0;
  resultMessage.textContent = "Showing " + filteredBlogs.length + " stor" +
    (filteredBlogs.length === 1 ? "y" : "ies");
}

// Open a blog in a dialog
function openBlog(blog) {
  document.getElementById("read-category").textContent = blog.category;
  document.getElementById("read-title").textContent = blog.title;
  document.getElementById("read-byline").textContent = "Written by " + blog.author;
  document.getElementById("read-summary").textContent = blog.summary;

  const body = document.getElementById("read-body");
  body.innerHTML = "";
  blog.body.split("\n\n").forEach(function(paragraph) {
    const p = document.createElement("p");
    p.textContent = paragraph;
    body.appendChild(p);
  });

  readDialog.showModal();
}

// Search blogs as the user types
searchInput.addEventListener("input", showBlogs);

// Filter blogs by category
document.querySelectorAll(".category-button").forEach(function(button) {
  button.addEventListener("click", function() {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category-button").forEach(function(item) {
      item.classList.remove("selected");
    });
    button.classList.add("selected");
    showBlogs();
  });
});

// Open and close the write blog form
document.getElementById("write-button").addEventListener("click", function() {
  writeDialog.showModal();
});

document.getElementById("close-dialog").addEventListener("click", function() {
  writeDialog.close();
});

document.getElementById("close-read").addEventListener("click", function() {
  readDialog.close();
});

// Add a new blog and save it in this browser
document.getElementById("blog-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const newBlog = {
    title: document.getElementById("title").value.trim(),
    category: document.getElementById("category").value,
    author: document.getElementById("author").value.trim(),
    summary: document.getElementById("summary").value.trim(),
    body: document.getElementById("body").value.trim()
  };

  if (!newBlog.title || !newBlog.author || !newBlog.summary || !newBlog.body) {
    showMessage("Please fill in all the fields.");
    return;
  }

  userBlogs.unshift(newBlog);
  localStorage.setItem("noctraBlogs", JSON.stringify(userBlogs));
  allBlogs = blogs.concat(userBlogs);

  document.getElementById("blog-form").reset();
  writeDialog.close();
  showBlogs();
  showMessage("Your blog has been published on this browser.");
});

// Change between light and dark mode
document.getElementById("theme-button").addEventListener("click", function() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  this.textContent = isDark ? "Light mode" : "Dark mode";
});

// Show a small message at the bottom of the page
function showMessage(message) {
  const messageBox = document.getElementById("message");
  messageBox.textContent = message;
  messageBox.classList.add("show");

  setTimeout(function() {
    messageBox.classList.remove("show");
  }, 2500);
}

// Show the sample blogs when the page first loads
showBlogs();
