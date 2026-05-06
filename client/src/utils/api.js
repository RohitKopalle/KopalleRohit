const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all projects from the backend API.
 */
export async function fetchProjects() {
  const response = await fetch(`${API_BASE}/projects`);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Send contact form data to the backend API.
 */
export async function sendContactMessage({ name, email, message }) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to send message');
  }
  return response.json();
}
