import requests
from bs4 import BeautifulSoup

url = 'https://nguoikesu.com/anh-hung-dan-toc?types[0]=1'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
    'Connection': 'keep-alive'
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# Find the main div with hero links
main_div = soup.find('div', class_='main')
if main_div:
    hero_links = main_div.find_all('a', href=lambda h: h and '/nhan-vat/' in h)
    print(f'Found {len(hero_links)} hero links')

    for i, link in enumerate(hero_links[:10]):  # First 10
        name = link.get_text(strip=True)
        href = link['href']
        print(f'{i+1}. {name} -> {href}')

    # Check if there are duplicates (some links appear twice)
    unique_links = set()
    for link in hero_links:
        href = link['href']
        if href not in unique_links:
            unique_links.add(href)
            name = link.get_text(strip=True)
            print(f'Unique: {name} -> {href}')
        else:
            print(f'Duplicate: {link.get_text(strip=True)} -> {href}')
else:
    print('No main div found')
