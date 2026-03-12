import os

files = ['profil.html', 'struktur.html', 'kontak.html', 'data.html', 'kesiapsiagaan.html', 'berita.html', 
         'pelayanan-kependudukan.html', 'pelayanan-pm1.html', 'pelayanan-ahli-waris.html']

old_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Emblem_of_Jakarta.svg/1200px-Emblem_of_Jakarta.svg.png'
new_url = 'assets/images/logo-jakarta.png'

for file in files:
    filepath = f'/mnt/user-data/workspace/kelurahan-rawajati-website/{file}'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(old_url, new_url)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {file}')

print('All files updated!')
