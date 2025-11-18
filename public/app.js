let currentSessionId = null;
let currentMarkdown = '';
let pollInterval = null;

// Check API status on load
async function checkApiStatus() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();

        const statusEl = document.getElementById('apiStatus');
        const statusText = document.getElementById('statusText');

        if (data.hasApiKey) {
            statusEl.classList.remove('error');
            statusText.textContent = `✓ Ready to use with ${data.provider}`;
        } else {
            statusEl.classList.add('error');
            statusText.textContent = '⚠ No API key configured. Please add an API key to your .env file.';
        }
    } catch (error) {
        console.error('Failed to check API status:', error);
        const statusEl = document.getElementById('apiStatus');
        const statusText = document.getElementById('statusText');
        statusEl.classList.add('error');
        statusText.textContent = '⚠ Server connection error';
    }
}

// Fill example company name
function fillExample(companyName) {
    document.getElementById('companyName').value = companyName;
    document.getElementById('companyName').focus();
}

// Handle form submission
document.getElementById('researchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    if (!companyName) return;

    // Hide other sections
    document.getElementById('errorSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';

    // Show progress
    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;

    try {
        // Start research
        const response = await fetch('/api/research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Research failed');
        }

        const { sessionId } = await response.json();
        currentSessionId = sessionId;

        // Start polling for status
        pollStatus();
    } catch (error) {
        showError(error.message);
    }
});

// Poll research status
async function pollStatus() {
    if (!currentSessionId) return;

    try {
        const response = await fetch(`/api/research/${currentSessionId}`);
        const data = await response.json();

        // Update progress text
        document.getElementById('progressText').textContent = data.progress;

        if (data.status === 'completed') {
            stopPolling();
            showResults(data.result);
        } else if (data.status === 'error') {
            stopPolling();
            showError(data.error || 'Research failed');
        } else {
            // Continue polling
            pollInterval = setTimeout(pollStatus, 1000);
        }
    } catch (error) {
        stopPolling();
        showError('Failed to get research status');
    }
}

// Stop polling
function stopPolling() {
    if (pollInterval) {
        clearTimeout(pollInterval);
        pollInterval = null;
    }
}

// Show error
function showError(message) {
    document.getElementById('progressSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('errorText').textContent = message;
    document.getElementById('submitBtn').disabled = false;
}

// Show results
function showResults(result) {
    document.getElementById('progressSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';

    currentMarkdown = result.markdown;

    // Render markdown preview (simple conversion)
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = markdownToHTML(result.markdown);

    // Show raw markdown
    document.getElementById('markdownContent').textContent = result.markdown;

    document.getElementById('submitBtn').disabled = false;
}

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^\*(.*)$/gim, '<em>$1</em>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');

    return `<div>${html}</div>`;
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}Tab`).classList.add('active');
    event.target.classList.add('active');
}

// Download markdown
function downloadMarkdown() {
    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-research-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Reset form
function resetForm() {
    document.getElementById('researchForm').reset();
    document.getElementById('errorSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('progressSection').style.display = 'none';
    currentSessionId = null;
    currentMarkdown = '';
    stopPolling();
}

// Initialize
checkApiStatus();
