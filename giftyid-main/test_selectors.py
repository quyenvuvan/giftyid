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

# Look for divs that might contain the hero list
# Try different selectors
selectors = [
    'div.blog-item',
    'div.item',
    'div.card',
    'div.article',
    'div.post',
    'div.entry',
    '.blog-item',
    '.item',
    '.card'
]

for selector in selectors:
    elements = soup.select(selector)
    if elements:
        print(f'Selector "{selector}": {len(elements)} elements')
        for elem in elements[:3]:
            link = elem.find('a')
            if link:
                print(f'  {elem.get_text(strip=True)[:100]} -> {link.get("href")}')
        if len(elements) > 0:
            break

# If no selectors work, look for any div with many child links
all_divs = soup.find_all('div')
for div in all_divs:
    links = div.find_all('a', href=lambda h: h and '/nhan-vat/' in h)
    if len(links) > 5:
        print(f'Div with {len(links)} hero links found')
        print('Classes:', div.get('class'))
        for link in links[:5]:
            print(f'  {link.get_text(strip=True)} -> {link["href"]}')
        break
