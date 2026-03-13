# -*- coding: utf-8 -*-
import os
import re

os.chdir(r'D:\deer-flow\backend\.deer-flow\threads\33f57155-5772-4a26-8653-d7b4298b13d0\user-data\workspace\kelurahan-rawajati-website')

# Chatbot CSS
chatbot_css = """
/* Chatbot Styles */
.chatbot-container{position:fixed;bottom:20px;right:20px;z-index:9999;font-family:system-ui,-apple-system,sans-serif}
.chatbot-toggle{width:60px;height:60px;border-radius:50%;background:#dc2626;color:#fff;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;transition:transform 0.2s}
.chatbot-toggle:hover{transform:scale(1.1);background:#b91c1c}
.chatbot-window{position:absolute;bottom:70px;right:0;width:350px;max-height:500px;background:#fff;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.2);display:flex;flex-direction:column;overflow:hidden}
.chatbot-header{background:#dc2626;color:#fff;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
.chatbot-header-info h4{margin:0;font-size:14px;font-weight:600}
.chatbot-status{font-size:11px;opacity:0.9}
.chatbot-close{background:none;border:none;color:#fff;cursor:pointer;padding:4px}
.chatbot-messages{flex:1;overflow-y:auto;padding:16px;background:#f9fafb}
.chatbot-message{margin-bottom:12px;display:flex;flex-direction:column}
.chatbot-message.user{align-items:flex-end}
.chatbot-message.bot{align-items:flex-start}
.message-content{max-width:80%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.5}
.chatbot-message.user .message-content{background:#dc2626;color:#fff;border-bottom-right-radius:4px}
.chatbot-message.bot .message-content{background:#e5e7eb;color:#1f2937;border-bottom-left-radius:4px}
.message-time{font-size:10px;color:#9ca3af;margin-top:4px;padding:0 4px}
.chatbot-input-container{display:flex;border-top:1px solid #e5e7eb;padding:12px;background:#fff}
.chatbot-input{flex:1;border:1px solid #e5e7eb;border-radius:20px;padding:8px 14px;font-size:13px;outline:none}
.chatbot-input:focus{border-color:#dc2626}
.chatbot-send{background:#dc2626;color:#fff;border:none;border-radius:50%;width:36px;height:36px;margin-left:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s}
.chatbot-send:hover{background:#b91c1c}
.typing-dots{display:flex;gap:4px}
.typing-dots span{width:6px;height:6px;background:#9ca3af;border-radius:50%;animation:typing 1.4s infinite}
.typing-dots span:nth-child(2){animation-delay:0.2s}
.typing-dots span:nth-child(3){animation-delay:0.4s}
@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.chatbot-message.bot .message-content strong{color:#dc2626;font-weight:600}
@media(max-width:480px){.chatbot-window{width:calc(100vw - 40px);right:-10px;bottom:80px}}
"""

# Read CSS file
with open('css/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Add chatbot CSS if not exists
if '/* Chatbot Styles */' not in css_content:
    css_content = css_content.rstrip() + '\n' + chatbot_css
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("Added chatbot CSS to style.css")
else:
    print("Chatbot CSS already exists")

# HTML files to update
html_files = ['index.html', 'berita.html', 'data.html', 'pelayanan.html', 'kontak.html', 'tentang.html', 'struktur.html', 'visi-misi.html', 'ppid.html', 'transparansi.html']

for html_file in html_files:
    if not os.path.exists(html_file):
        print(f"Skipping {html_file} - not found")
        continue
    
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Add chatbot script before closing body tag
    if '<script src="js/chatbot.js"></script>' not in html_content:
        html_content = html_content.replace('</body>', '<script src="js/chatbot.js"></script>\n</body>')
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Updated {html_file}")
    else:
        print(f"Skipping {html_file} - already updated")

print("\nDone!")
