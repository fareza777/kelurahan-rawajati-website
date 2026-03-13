# -*- coding: utf-8 -*-
import os

content = """// AI Chatbot Kelurahan Rawajati - Hybrid Architecture
const CHATBOT_CONFIG={ALIBABA_CLOUD_API_KEY:'',ALIBABA_CLOUD_ENDPOINT:'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',MODEL:'qwen-max',CONFIDENCE_THRESHOLD:0.6,WELCOME_MESSAGE:'Halo! Saya Asisten Virtual Kelurahan Rawajati. Saya bisa membantu Anda dengan informasi persyaratan surat, jadwal pelayanan, dan kegiatan kelurahan. Silakan tanyakan sesuatu!'};

const FAQ_DATABASE=[
{keywords:['ktp','kartu tanda penduduk'],answer:'**Syarat KTP:** 1) Fotokopi KK, 2) Surat Pengantar RT/RW, 3) KTP lama, 4) Pas foto 3x4. Proses: 1-3 hari. Biaya: GRATIS.'},
{keywords:['kk','kartu keluarga'],answer:'**Syarat KK:** 1) Surat Pengantar RT/RW, 2) Fotokopi KTP, 3) Fotokopi buku nikah. Proses: 1 hari. Biaya: GRATIS.'},
{keywords:['domisili','surat domisili'],answer:'**Syarat Surat Domisili:** 1) Fotokopi KTP, 2) Fotokopi KK, 3) Surat Pengantar RT/RW. Proses: 1 hari. Biaya: GRATIS.'},
{keywords:['sku','surat keterangan usaha'],answer:'**Syarat SKU:** 1) Surat Pengantar RT/RW, 2) Fotokopi KTP, 3) Fotokopi KK, 4) Fotokopi PBB. Proses: 1-2 hari. Biaya: GRATIS.'},
{keywords:['skck'],answer:'**Syarat SKCK:** 1) Fotokopi KTP, 2) Fotokopi KK, 3) Fotokopi Ijazah, 4) Pas foto 4x6 (6 lembar, latar kuning). Biaya: Rp 30.000.'},
{keywords:['akta kelahiran','kelahiran'],answer:'**Syarat Akta Kelahiran:** 1) Fotokopi KTP orang tua, 2) Fotokopi KK, 3) Fotokopi Buku Nikah, 4) Surat Keterangan Kelahiran. Proses: 3-5 hari. Biaya: GRATIS.'},
{keywords:['akta kematian','kematian'],answer:'**Syarat Akta Kematian:** 1) Fotokopi KTP almarhum, 2) Fotokopi KK, 3) Surat Keterangan Kematian. Proses: 2-3 hari. Biaya: GRATIS.'},
{keywords:['pindah','surat pindah'],answer:'**Syarat Surat Pindah:** 1) Fotokopi KTP & KK, 2) Surat Pengantar RT/RW. Proses: 1-2 hari. Biaya: GRATIS.'},
{keywords:['sktm','tidak mampu'],answer:'**Syarat SKTM:** 1) Surat Pengantar RT/RW, 2) Fotokopi KTP, 3) Fotokopi KK, 4) Surat pernyataan tidak mampu. Proses: 1-2 hari. Biaya: GRATIS.'},
{keywords:['ahli waris'],answer:'**Syarat Ahli Waris:** 1) Surat Pengantar RT/RW, 2) Fotokopi KTP semua ahli waris, 3) Fotokopi Akta Kematian. Proses: 3-5 hari. Biaya: GRATIS.'},
{keywords:['jam pelayanan','jam buka'],answer:'**Jam Pelayanan:** Senin-Kamis 08.00-15.00, Jumat 08.00-15.30. Sabtu-Minggu: TUTUP.'},
{keywords:['alamat','lokasi'],answer:'**Alamat:** Jl. Rawajati Barat No. 1, Pancoran, Jakarta Selatan 12750. Patokan: Dekat Flyover Kalibata.'},
{keywords:['kontak','telepon'],answer:'**Kontak:** Email: kelurahan.rawajati@jaksel.go.id. Jam: Senin-Kamis 08.00-15.00, Jumat 08.00-15.30.'},
{keywords:['kegiatan','agenda'],answer:'**Kegiatan Rutin:** Minggu: Senam Pagi (06.00). Senin: Upacara (07.30). Rabu: Posyandu. Jumat: Kerja Bakti.'},
{keywords:['biaya','bayar'],answer:'**Biaya:** Semua layanan GRATIS kecuali SKCK (Rp 30.000) dan materai (Rp 10.000). Tidak ada pungutan liar!'}
];

function normalizeText(t){return t.toLowerCase().replace(/[^\\w\\s]/g,' ').replace(/\\s+/g,' ').trim()}
function calculateSimilarity(q,keywords){let s=0;const nq=normalizeText(q);keywords.forEach(k=>{const nk=normalizeText(k);if(nq.includes(nk))s+=1;else{const qw=nq.split(' '),kw=nk.split(' ');kw.forEach(w=>{if(w.length>3&&qw.some(x=>x.includes(w)))s+=0.5})}});return Math.min(s/keywords.length,1)}
function findFAQMatch(q){const m=FAQ_DATABASE.map((f,i)=>({i,score:calculateSimilarity(q,f.keywords),f}));m.sort((a,b)=>b.score-a.score);return m.filter(x=>x.score>=CHATBOT_CONFIG.CONFIDENCE_THRESHOLD)}
function formatAnswer(a){return a.replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>').replace(/\\n/g,'<br>')}

async function callQwenAPI(msg,history=[]){
if(!CHATBOT_CONFIG.ALIBABA_CLOUD_API_KEY)throw new Error('API Key belum dikonfigurasi');
const sys='Anda Asisten Virtual Kelurahan Rawajati. Jawab dengan sopan dan profesional.';
const messages=[{role:'system',content:sys},...history,{role:'user',content:msg}];
try{const r=await fetch(CHATBOT_CONFIG.ALIBABA_CLOUD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+CHATBOT_CONFIG.ALIBABA_CLOUD_API_KEY},body:JSON.stringify({model:CHATBOT_CONFIG.MODEL,messages,max_tokens:500,temperature:0.7})});
if(!r.ok)throw new Error('API Error');const d=await r.json();return d.choices[0].message.content}catch(e){console.error(e);throw e}}

function getCurrentTime(){const n=new Date();return n.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}

function initChatbotUI(){
const html='<div id="chatbot-container" class="chatbot-container"><button id="chatbot-toggle" class="chatbot-toggle"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="9" cy="9" r="1.5" fill="#fff"/><circle cx="15" cy="9" r="1.5" fill="#fff"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#fff" stroke-width="2" fill="none"/></svg></button><div id="chatbot-window" class="chatbot-window" style="display:none"><div class="chatbot-header"><div class="chatbot-header-info"><h4>Asisten Virtual</h4><span class="chatbot-status">Online</span></div><button id="chatbot-close" class="chatbot-close"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L12 12z" fill="currentColor"/></svg></button></div><div id="chatbot-messages" class="chatbot-messages"><div class="chatbot-message bot"><div class="message-content">'+CHATBOT_CONFIG.WELCOME_MESSAGE+'</div><span class="message-time">'+getCurrentTime()+'</span></div></div><div class="chatbot-input-container"><input type="text" id="chatbot-input" class="chatbot-input" placeholder="Tulis pertanyaan..."/><button id="chatbot-send" class="chatbot-send"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21z" fill="currentColor"/></svg></button></div></div></div>';
document.body.insertAdjacentHTML('beforeend',html);
document.getElementById('chatbot-toggle').onclick=toggleChat;
document.getElementById('chatbot-close').onclick=toggleChat;
document.getElementById('chatbot-send').onclick=sendMessage;
document.getElementById('chatbot-input').onkeypress=e=>{if(e.key==='Enter')sendMessage()}}

function toggleChat(){const w=document.getElementById('chatbot-window'),t=document.getElementById('chatbot-toggle');if(w.style.display==='none'){w.style.display='flex';t.style.display='none';document.getElementById('chatbot-input').focus()}else{w.style.display='none';t.style.display='flex'}}
function addMessage(c,bot){const m=document.getElementById('chatbot-messages'),cls=bot?'bot':'user';m.insertAdjacentHTML('beforeend','<div class="chatbot-message '+cls+'"><div class="message-content">'+c+'</div><span class="message-time">'+getCurrentTime()+'</span></div>');m.scrollTop=m.scrollHeight}
function showTyping(){document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend','<div id="typing" class="chatbot-message bot typing"><div class="typing-dots"><span></span><span></span><span></span></div></div>')}
function hideTyping(){const t=document.getElementById('typing');if(t)t.remove()}

async function sendMessage(){
const i=document.getElementById('chatbot-input'),msg=i.value.trim();
if(!msg)return;
addMessage(msg,false);i.value='';showTyping();
try{const m=findFAQMatch(msg);
if(m.length>0){setTimeout(()=>{hideTyping();addMessage(formatAnswer(m[0].f.answer),true)},500)}
else{try{const r=await callQwenAPI(msg);hideTyping();addMessage(formatAnswer(r),true)}catch(e){hideTyping();addMessage('Maaf, saya tidak dapat memproses pertanyaan. Hubungi kelurahan: Senin-Kamis 08.00-15.00, Jumat 08.00-15.30',true)}}
}catch(e){hideTyping();addMessage('Maaf terjadi kesalahan.',true)}}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initChatbotUI);else initChatbotUI();
"""

os.chdir(r'D:\deer-flow\backend\.deer-flow\threads\33f57155-5772-4a26-8653-d7b4298b13d0\user-data\workspace\kelurahan-rawajati-website')
with open('chatbot.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("chatbot.js created!")
