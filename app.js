document.addEventListener('DOMContentLoaded', () => {
 const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById('downloadBtn');
  const preview = document.getElementById('preview');

  generateBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value.trim();
    const about = document.getElementById('about').value.trim();
    const github = document.getElementById('github').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const skillsInput = document.getElementById('skills').value.trim();

    if (!name || !role || !about) {
      alert('Please fill Name, Role and About fields.');
      return;
    }

    const skills = skillsInput ? skillsInput.split(',').map(s => s.trim()).filter(Boolean) : [];

    const portfolioHTML = `
      <div class="portfolio">
        <h1>${escapeHtml(name)}</h1>
        <h3>${escapeHtml(role)}</h3>
        <p>${escapeHtml(about)}</p>

        <h4>Skills</h4>
        <div class="skills">
          ${skills.map(s => `<span>${escapeHtml(s)}</span>`).join('')}
        </div>

        <h4>Links</h4>
        <p>${github ? `<a href="${escapeAttr(github)}" target="_blank">GitHub</a>` : ''}</p>
        <p>${linkedin ? `<a href="${escapeAttr(linkedin)}" target="_blank">LinkedIn</a>` : ''}</p>
      </div>
    `;

    preview.innerHTML = portfolioHTML;
    downloadBtn.style.display = 'inline-block';
    prepareDownload(portfolioHTML);
  });

  function prepareDownload(htmlContent) {
    const fullHTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Portfolio</title>
<style>
body{font-family:Arial;padding:20px;}
.skills span{display:inline-block;margin-right:6px;padding:6px 8px;border-radius:6px;background:#007BFF;color:#fff;}
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;

    const blob = new Blob([fullHTML], {type:'text/html'});
    const url = URL.createObjectURL(blob);

    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio.html';
      a.click();
    };
  }

  // small helper to avoid injection when inserting user input
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
    });
  }
  function escapeAttr(str) {
    return str.replace(/"/g, '%22');
  }
});
