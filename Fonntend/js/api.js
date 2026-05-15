// API Configuration
const BASE_URL = "https://codekids-dm8b.onrender.com/api";
const TOKEN_KEY = "codekids_token";
const USER_KEY = "codekids_user";

// Get Token from localStorage
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Set Token in localStorage
function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Remove Token from localStorage
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Check if user is authenticated
function isAuthenticated() {
  return !!getToken();
}

// Get Current User Data
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY)) || null;
}

// Set User Data
function setUserData(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ==================== AUTH ENDPOINTS ====================

// Register User
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      setUserData(data.user);
    }
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Login User
async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      setUserData(data.user);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Get Current User Profile
async function getUserProfile() {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    setUserData(data.user);
    return data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
}

// Update User Profile
async function updateUserProfile(username, age) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        age,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    setUserData(data.user);
    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}

// ==================== LEVELS ENDPOINTS ====================

// Get All Levels for a Category (scratch, python, html)
async function getLevelsByCategory(category) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/levels/${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch levels");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get levels error:", error);
    throw error;
  }
}

// Get Single Level Details
async function getLevelDetails(category, levelNumber) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `${BASE_URL}/levels/${category}/${levelNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch level details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get level details error:", error);
    throw error;
  }
}

// Save Code (Auto-save every 2 seconds)
async function saveCode(category, levelNumber, code) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `${BASE_URL}/levels/${category}/${levelNumber}/save`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save code");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Save code error:", error);
    throw error;
  }
}

// Get Hint
async function getHint(category, levelNumber) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `${BASE_URL}/levels/${category}/${levelNumber}/hint`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get hint");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get hint error:", error);
    throw error;
  }
}

// ==================== PROGRESS ENDPOINTS ====================

// Submit Code for Grading
async function submitCode(category, levelNumber, code) {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `${BASE_URL}/progress/${category}/${levelNumber}/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit code");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Submit code error:", error);
    throw error;
  }
}

// Logout
function logout() {
  removeToken();
  window.location.href = "index.html";
}
