import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Contoh:* ${usedPrefix + command} siapa itu siputzx?`;

    // Kirim reaksi sebagai tanda memproses
    conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        }
    });

    try {
        // Ambil respon dari API baru
        const apiRes = await fetch(`https://api.siputzx.my.id/api/ai/bard?query=${encodeURIComponent(text)}`);
        const apiData = await apiRes.json();

        // Debug API response
        console.log('API Response:', apiData);

        if (!apiData.status || !apiData.data) {
            throw 'Respon dari API tidak valid.';
        }

        const response = apiData.data;

        // Kirim respons ke pengguna
        await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        conn.sendMessage(m.chat, { text: `Terjadi kesalahan: ${error.message}` }, { quoted: m });
    }
};

handler.help = ['bardai'];
handler.tags = ['ai'];
handler.command = /^(bardai|bard)$/i;
handler.premium = false;

export default handler;

/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/