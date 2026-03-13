// AI Chatbot Kelurahan Rawajati
// Hybrid Architecture: FAQ + Alibaba Cloud Qwen API

const CHATBOT_CONFIG = {
    ALIBABA_CLOUD_API_KEY: 'sk-sp-886dbc40872f4c52ba707842b5196e4f',
    ALIBABA_CLOUD_ENDPOINT: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    MODEL: 'qwen-plus',
    CONFIDENCE_THRESHOLD: 0.6,
    WELCOME_MESSAGE: 'Halo! Saya Asisten Virtual Kelurahan Rawajati. Ada yang bisa saya bantu?'
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
        answer: 'Jam Pelayanan Kelurahan Rawajati:\nSenin - Kamis: 08.00 - 16.00 WIB\nJumat: 08.00 - 11.30 WIB\nSabtu - Minggu: TUTUP\n\nIstirahat: 12.00 - 13.00 WIB (Senin-Kamis)'
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 8H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 16H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div id="chatbot-window" style="display: none;">
                <div id="chatbot-header">
                    <span>Asisten Virtual Rawajati</span>
                    <button onclick="toggleChat()" id="close-chat">X</button>
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
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
        }
        
        #chatbot-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(220, 38, 38, 0.5);
        }
        
        #chatbot-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        #chatbot-header {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
        }
        
        #close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 4px 8px;
        }
        
        #chatbot-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f9fafb;
        }
        
        .message {
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
        }
        
        .user-message {
            align-items: flex-end;
        }
        
        .bot-message {
            align-items: flex-start;
        }
        
        .message-content {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            line-height: 1.5;
            white-space: pre-line;
        }
        
        .user-message .message-content {
            background: #dc2626;
            color: white;
            border-bottom-right-radius: 4px;
        }
        
        .bot-message .message-content {
            background: white;
            color: #1f2937;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .message-time {
            font-size: 11px;
            color: #9ca3af;
            margin-top: 4px;
            padding: 0 4px;
        }
        
        #chatbot-input-container {
            padding: 12px;
            background: white;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
        }
        
        #chatbot-input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
        }
        
        #chatbot-input:focus {
            border-color: #dc2626;
        }
        
        #chatbot-send {
            width: 40px;
            height: 40px;
            background: #dc2626;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        #chatbot-send:hover {
            background: #b91c1c;
        }
        
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-4px);
            }
        }
        
        @media (max-width: 480px) {
            #chatbot-window {
                width: 300px;
                height: 450px;
                right: -20px;
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
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message
    setTimeout(() => {
        const response = processMessage(message);
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
function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Try FAQ matching first
    const faqMatch = findFAQMatch(lowerMessage);
    if (faqMatch) {
        return faqMatch;
    }
    
    // Fallback to AI
    return callQwenAI(message);
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

// Call Alibaba Cloud Qwen API
async function callQwenAI(message) {
    try {
        const response = await fetch(CHATBOT_CONFIG.ALIBABA_CLOUD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATBOT_CONFIG.ALIBABA_CLOUD_API_KEY}`
            },
            body: JSON.stringify({
                model: CHATBOT_CONFIG.MODEL,
                input: {
                    messages: [
                        {
                            role: 'system',
                            content: 'Anda adalah asisten virtual Kelurahan Rawajati yang ramah dan membantu. Jawab pertanyaan dengan informatif, singkat, dan jelas. Gunakan bahasa Indonesia yang sopan dan mudah dipahami. Jika ditanya tentang pelayanan surat, berikan informasi lengkap tentang syarat, biaya, dan lama proses. Jika tidak tahu jawabannya, arahkan pengguna untuk menghubungi kelurahan langsung.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ]
                },
                parameters: {
                    max_tokens: 500,
                    temperature: 0.7,
                    top_p: 0.8
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.output.choices[0].message.content;
        
    } catch (error) {
        console.error('AI Error:', error);
        return 'Maaf, saya mengalami kesulitan untuk memproses pertanyaan Anda. Silakan hubungi kelurahan langsung di nomor telepon atau email yang tersedia untuk bantuan lebih lanjut.';
    }
}
