export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call Alibaba Cloud Qwen API
    const response = await fetch('https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-sp-886dbc40872f4c52ba707842b5196e4f'
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        input: {
          messages: [
            {
              role: 'system',
              content: 'Anda adalah Rawajati AI, asisten virtual Kelurahan Rawajati yang ramah dan membantu. Jawab pertanyaan dengan informatif, singkat, dan jelas. Gunakan bahasa Indonesia yang sopan dan mudah dipahami. Jika ditanya tentang pelayanan surat, berikan informasi lengkap tentang syarat, biaya, dan lama proses. Jika tidak tahu jawabannya, arahkan pengguna untuk menghubungi kelurahan langsung.'
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
      const errorData = await response.json();
      console.error('Alibaba Cloud API Error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI', details: errorData }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ 
        response: data.output.choices[0].message.content 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
