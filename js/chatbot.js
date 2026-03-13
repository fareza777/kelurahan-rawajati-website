// AI Chatbot Kelurahan Rawajati - Premium Design
// Hybrid Architecture: FAQ + Alibaba Cloud Qwen API

const CHATBOT_CONFIG = {
    API_ENDPOINT: '/api/chat',
    CONFIDENCE_THRESHOLD: 0.6,
    WELCOME_MESSAGE: 'Halo! Saya Rawajati AI. Ada yang bisa saya bantu?'
};

// FAQ Database - 15+ entries
const FAQ_DATABASE = [
    {
        question: 'Syarat pembuatan KTP',
        keywords: ['ktp', 'kartu tanda penduduk', 'buat ktp', 'pembuatan ktp', 'syarat ktp'],
        answer: 'Syarat pembuatan KTP:\n1. Fotokopi KK (Kartu Keluarga)\n2. Surat Pengantar dari RT/RW\n3. KTP lama (untuk perpanjangan)\n4. Pas foto 3x4 (2 lembar, background merah)\n5. Mengisi formulir\n\nBiaya: GRATIS\nProses: 1-3 hari kerja'
    },
    {
        question: 'Syarat pembuatan KK',
        keywords: ['kk', 'kartu keluarga', 'buat kk', 'pembuatan kk', 'syarat kk'],
        answer: 'Syarat pembuatan KK:\n1. Surat Pengantar dari RT/RW\n2. Fotokopi KTP semua anggota keluarga\n3. Akta Kelahiran semua anggota keluarga\n4. Surat Nikah/Akta Perkawinan (untuk kepala keluarga baru)\n5. KK lama (jika ada perubahan data)\n\nBiaya: GRATIS\nProses: 1 hari kerja'
    },
    {
        question: 'Syarat Surat Keterangan Domisili',
        keywords: ['domisili', 'surat domisili', 'keterangan domisili', 'syarat domisili'],
        answer: 'Syarat Surat Keterangan Domisili:\n1. Fotokopi KTP\n2. Fotokopi KK\n3. Surat Pengantar dari RT/RW\n4. Surat Keterangan Pindah (untuk pendatang)\n5. Pas foto 3x4 (2 lembar)\n\nBiaya: GRATIS\nProses: 1 hari kerja'
    },
    {
        question: 'Syarat SKU (Surat Keterangan Usaha)',
        keywords: ['sku', 'surat usaha', 'keterangan usaha', 'syarat sku'],
        answer: 'Syarat pembuatan SKU:\n1. Fotokopi KTP\n2. Fotokopi KK\n3. Surat Pengantar dari RT/RW\n4. Foto tempat usaha\n5. NPWP (jika ada)\n\nBiaya: GRATIS\nProses: 1-2 hari kerja'
    },
    {
        question: 'Syarat SKCK',
        keywords: ['skck', 'surat catatan kepolisian', 'syarat skck'],
        answer: 'Syarat pembuatan SKCK:\n1. Fotokopi KTP\n2. Fotokopi KK\n3. Fotokopi Akta Kelahiran\n4. Pas foto 3x4 (6 lembar, background kuning)\n5. Surat Pengantar dari RT/RW\n6. Sidik jari (dilakukan di Polresta)\n\nBiaya: Rp 30.000\nProses: 1-2 hari kerja (di Polresta)'
    },
    {
        question: 'Syarat Akta Kelahiran',
        keywords: ['akta kelahiran', 'buat akta kelahiran', 'syarat akta kelahiran'],
        answer: 'Syarat pembuatan Akta Kelahiran:\n1. Surat Keterangan Kelahiran dari Bidan/RS\n2. Fotokopi KTP orang tua\n3. Fotokopi KK\n4. Surat Nikah/Akta Perkawinan\n5. Fotokopi KTP 2 saksi\n6. Pas foto 3x4 (2 lembar)\n\nBiaya: GRATIS\nProses: 3-5 hari kerja'
    },
    {
        question: 'Syarat Akta Kematian',
        keywords: ['akta kematian', 'buat akta kematian', 'syarat akta kematian'],
        answer: 'Syarat pembuatan Akta Kematian:\n1. Surat Keterangan Kematian dari RS/Kelurahan\n2. Fotokopi KTP almarhum\n3. Fotokopi KK\n4. Fotokopi KTP pelapor\n5. Surat Nikah/Akta Perkawinan almarhum\n\nBiaya: GRATIS\nProses: 1-3 hari kerja'
    },
    {
        question: 'Syarat Surat Pindah',
        keywords: ['pindah', 'surat pindah', 'pindah datang', 'syarat surat pindah'],
        answer: 'Syarat Surat Pindah:\n1. Fotokopi KTP\n2. Fotokopi KK\n3. Surat Pengantar dari RT/RW\n4. Surat Keterangan dari tempat tujuan (jika ada)\n5. Pas foto 3x4 (2 lembar)\n\nBiaya: GRATIS\nProses: 1-2 hari kerja'
    },
    {
        question: 'Syarat SKTM',
        keywords: ['sktm', 'surat tidak mampu', 'keterangan tidak mampu', 'syarat sktm'],
        answer: 'Syarat pembuatan SKTM:\n1. Surat Pengantar dari RT/RW\n2. Fotokopi KTP\n3. Fotokopi KK\n4. Surat Keterangan Tidak Mampu dari tempat kerja (jika bekerja)\n5. Pas foto 3x4 (2 lembar)\n\nBiaya: GRATIS\nProses: 1 hari kerja'
    },
    {
        question: 'Syarat Surat Keterangan Ahli Waris',
        keywords: ['ahli waris', 'surat ahli waris', 'keterangan ahli waris', 'syarat ahli waris'],
        answer: 'Syarat Surat Keterangan Ahli Waris:\n1. Surat Pengantar dari RT/RW\n2. Fotokopi KTP almarhum\n3. Fotokopi KTP semua ahli waris\n4. Fotokopi KK\n5. Akta Kematian almarhum\n6. Surat Pernyataan Ahli Waris (ditandatangani semua ahli waris)\n7. Pas foto 3x4 (2 lembar per ahli waris)\n\nBiaya: GRATIS\nProses: 2-3 hari kerja'
    },
    {
        question: 'Jam Pelayanan',
        keywords: ['jam', 'jam pelayanan', 'jam buka', 'jam operasional', 'jam kerja'],
        answer: 'Jam Pelayanan Kelurahan Rawajati:\nSenin - Kamis: 08.00 - 16.00 WIB\nJumat: 08.00 - 11.30 WIB\nSabtu - Minggu: TUTUP\n\nIstirahat: 12.00 - 13.00 WIB (Senin-Kamus)'
    },
    {
        question: 'Alamat Kelurahan',
        keywords: ['alamat', 'lokasi', 'dimana', 'letak', 'posisi'],
        answer: 'Alamat Kelurahan Rawajati:\nJl. Rawajati Raya No. 1\nKecamatan Pancoran Mas\nKota Depok\nJawa Barat 16432\n\nPatokan: Dekat Masjid Al-Hidayah Rawajati'
    },
    {
        question: 'Kontak Kelurahan',
        keywords: ['kontak', 'telepon', 'email', 'hubungi', 'no telpon'],
        answer: 'Kontak Kelurahan Rawajati:\nTelepon: (021) 777-XXXX\nEmail: kelurahan.rawajati@depok.go.id\nWhatsApp: 08XX-XXXX-XXXX\n\nMedia Sosial:\nInstagram: @kelurahanrawajati\nFacebook: Kelurahan Rawajati Official'
    },
    {
        question: 'Kegiatan Rutin',
        keywords: ['kegiatan', 'acara', 'agenda', 'rutin', 'program'],
        answer: 'Kegiatan Rutin Kelurahan Rawajati:\n1. Senam Pagi (Setiap Minggu, 06.00 WIB)\n2. Posyandu (Setiap bulan, minggu ke-2)\n3. Kerja Bakti (Setiap Minggu terakhir)\n4. Pengajian Rutin (Setiap Jumat malam)\n5. Pelayanan Keliling (Setiap bulan)\n\nInfo lebih lanjut di papan pengumuman atau media sosial kelurahan.'
    },
    {
        question: 'Biaya Pelayanan',
        keywords: ['biaya', 'harga', 'bayar', 'gratis', 'tarif'],
        answer: 'Biaya Pelayanan di Kelurahan Rawajati:\n\nSEMUA PELAYANAN SURAT = GRATIS!\n\nTermasuk:\n- KTP\n- KK\n- Surat Domisili\n- SKU\n- SKCK (hanya biaya kepolisian Rp 30.000)\n- Akta Kelahiran/Kematian\n- Surat Pindah\n- SKTM\n- Ahli Waris\n\nPungutan liar (pungli) = ILEGAL!\nLapor jika ada pungli: 021-XXXXXXX'
    }
];

// Chat state
let chatHistory = [];
let isChatOpen = false;

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    createChatWidget();
});

// Create chat widget
function createChatWidget() {
    const chatHTML = `
        <div id="chatbot-container">
            <div id="chatbot-button" onclick="toggleChat()">
                <div class="ai-bubble">AI</div>
                <svg class="robot-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="white" opacity="0.95"/>
                    <circle cx="35" cy="40" r="8" fill="#dc2626"/>
                    <circle cx="65" cy="40" r="8" fill="#dc2626"/>
                    <path d="M 30 65 Q 50 80 70 65" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <line x1="50" y1="5" x2="50" y2="15" stroke="white" stroke-width="4"/>
                    <circle cx="50" cy="5" r="6" fill="#ef4444"/>
                </svg>
            </div>
            <div id="chatbot-window" style="display: none;">
                <div id="chatbot-header">
                    <div class="header-content">
                        <span class="bot-name">Rawajati AI</span>
                        <div class="online-indicator">
                            <div class="pulse-dot"></div>
                            <span>Online</span>
                        </div>
                    </div>
                    <button onclick="toggleChat()" id="close-chat">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div id="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-content">${CHATBOT_CONFIG.WELCOME_MESSAGE}</div>
                        <div class="message-time">${getCurrentTime()}</div>
                    </div>
                </div>
                <div id="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Tulis pertanyaan Anda..." onkeypress="handleKeyPress(event)" />
                    <button onclick="sendMessage()" id="chatbot-send">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    addChatStyles();
}

// Add CSS styles
function addChatStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        #chatbot-button {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.5);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: all;
            position: relative;
            animation: buttonFloat 3s ease-in-out infinite;
        }
        
        #chatbot-button::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c, #ef4444);
            border-radius: 50%;
            z-index: -1;
            animation: gradientRotate 3s linear infinite;
            opacity: 0.7;
        }
        
        #chatbot-button::after {
            content: '';
            position: absolute;
            top: -6px;
            left: -6px;
            right: -6px;
            bottom: -6px;
            background: transparent;
            border: 2px solid rgba(239, 68, 68, 0.3);
            border-radius: 50%;
            z-index: -2;
            animation: pulse 2s ease-out infinite;
        }
        
        .robot-icon {
            width: 40px;
            height: 40px;
            transition: transform 0.3s ease;
        }
        
        #chatbot-button:hover .robot-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        #chatbot-button:hover {
            transform: scale(1.15);
            box-shadow: 0 8px 30px rgba(220, 38, 38, 0.7);
        }
        
        .ai-bubble {
            position: absolute;
            top: -5px;
            right: -5px;
            background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
            color: #dc2626;
            font-size: 11px;
            font-weight: 800;
            padding: 5px 10px;
            border-radius: 16px;
            box-shadow: 0 3px 12px rgba(220, 38, 38, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8);
            font-family: 'Segoe UI', Arial, sans-serif;
            z-index: 10;
            animation: aiPulse 2s ease-in-out infinite;
            letter-spacing: 0.5px;
        }
        
        #chatbot-window {
            position: absolute;
            bottom: 90px;
            right: 0;
            width: 380px;
            height: 550px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
            display: none;
            flex-direction: column;
            overflow: hidden;
            pointer-events: all;
            animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        #chatbot-header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
            color: white;
            padding: 18px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 12px rgba(220, 38, 38, 0.3);
        }
        
        .header-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .bot-name {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .online-indicator {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            opacity: 0.95;
        }
        
        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: onlinePulse 2s ease-in-out infinite;
            box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
        }
        
        #close-chat {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        #close-chat:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        
        #chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
        }
        
        #chatbot-messages::-webkit-scrollbar {
            width: 6px;
        }
        
        #chatbot-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        #chatbot-messages::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
        }
        
        #chatbot-messages::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
        }
        
        .message {
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
            animation: messageFadeIn 0.3s ease-out;
        }
        
        .user-message {
            align-items: flex-end;
        }
        
        .bot-message {
            align-items: flex-start;
        }
        
        .message-content {
            max-width: 80%;
            padding: 14px 18px;
            border-radius: 16px;
            line-height: 1.6;
            white-space: pre-line;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .user-message .message-content {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border-bottom-right-radius: 4px;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        .bot-message .message-content {
            background: white;
            color: #1f2937;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }
        
        .message-time {
            font-size: 11px;
            color: #9ca3af;
            margin-top: 6px;
            padding: 0 4px;
            font-weight: 500;
        }
        
        .user-message .message-time {
            text-align: right;
        }
        
        #chatbot-input-container {
            padding: 16px;
            background: white;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 10px;
            box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
        }
        
        #chatbot-input {
            flex: 1;
            padding: 12px 18px;
            border: 2px solid #e5e7eb;
            border-radius: 24px;
            outline: none;
            font-size: 14px;
            transition: all 0.3s ease;
            font-family: inherit;
        }
        
        #chatbot-input:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }
        
        #chatbot-input::placeholder {
            color: #9ca3af;
        }
        
        #chatbot-send {
            width: 46px;
            height: 46px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        #chatbot-send:hover {
            transform: scale(1.12) rotate(-10deg);
            box-shadow: 0 6px 18px rgba(220, 38, 38, 0.5);
        }
        
        #chatbot-send:active {
            transform: scale(0.95);
        }
        
        .typing-indicator {
            display: flex;
            gap: 5px;
            padding: 14px 18px;
            background: white;
            border-radius: 16px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            width: fit-content;
        }
        
        .typing-dot {
            width: 9px;
            height: 9px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.7;
            }
            30% {
                transform: translateY(-6px) scale(1.1);
                opacity: 1;
            }
        }
        
        @keyframes buttonFloat {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-8px);
            }
        }
        
        @keyframes gradientRotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.5;
            }
            100% {
                transform: scale(1.15);
                opacity: 0;
            }
        }
        
        @keyframes aiPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 3px 12px rgba(220, 38, 38, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 4px 16px rgba(220, 38, 38, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.9);
            }
        }
        
        @keyframes onlinePulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.3);
                opacity: 0.7;
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes messageFadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 480px) {
            #chatbot-button {
                width: 65px;
                height: 65px;
            }
            
            #chatbot-window {
                width: 340px;
                height: 500px;
                right: -10px;
            }
            
            .message-content {
                max-width: 85%;
            }
        }
    `;
    document.head.appendChild(style);
}

// Toggle chat window
function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    isChatOpen = !isChatOpen;
    chatWindow.style.display = isChatOpen ? 'flex' : 'none';
    
    if (isChatOpen) {
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 100);
    }
}

// Handle Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

// Send message
async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message
    setTimeout(async () => {
        const response = await processMessage(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 500);
}

// Add message to chat
function addMessage(content, type) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageHTML = `
        <div class="message ${type}-message">
            <div class="message-content">${content}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const indicatorHTML = `
        <div class="message bot-message" id="typing-indicator">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', indicatorHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Process message - FAQ matching + AI fallback
async function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Try FAQ matching first
    const faqMatch = findFAQMatch(lowerMessage);
    if (faqMatch) {
        return faqMatch;
    }
    
    // Fallback to AI
    return await callQwenAI(message);
}

// Find FAQ match with keyword matching
function findFAQMatch(message) {
    let bestMatch = null;
    let bestScore = 0;
    
    for (const faq of FAQ_DATABASE) {
        let score = 0;
        
        for (const keyword of faq.keywords) {
            if (message.includes(keyword)) {
                score += 1;
            }
        }
        
        // Boost score if question contains multiple keywords
        if (score > 0) {
            const keywordCount = message.split(' ').filter(word => 
                faq.keywords.some(kw => kw.includes(word) || word.includes(kw))
            ).length;
            score += keywordCount * 0.5;
        }
        
        if (score > bestScore && score >= CHATBOT_CONFIG.CONFIDENCE_THRESHOLD) {
            bestScore = score;
            bestMatch = faq.answer;
        }
    }
    
    return bestMatch;
}

// Call Alibaba Cloud Qwen API via proxy
async function callQwenAI(message) {
    try {
        const response = await fetch(CHATBOT_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
        
    } catch (error) {
        console.error('AI Error:', error);
        return 'Maaf, saya mengalami kesulitan untuk memproses pertanyaan Anda. Silakan hubungi kelurahan langsung di nomor telepon atau email yang tersedia untuk bantuan lebih lanjut.';
    }
}
