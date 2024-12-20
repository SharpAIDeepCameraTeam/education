import fs from 'fs';
import path from 'path';

const analyticsCode = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-1CWFC073F2"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-1CWFC073F2');
  </script>`;

const files = ['static/index.html', 'static/login.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<meta name="keywords".*?>/, `$&\n${analyticsCode}`);
  fs.writeFileSync(file, content);
});
