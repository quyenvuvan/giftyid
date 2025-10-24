import re
from bs4 import BeautifulSoup

with open('page.html', 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# Check for any div with class containing 'item' or 'card'
item_divs = soup.find_all('div', class_=re.compile(r'\bitem\b|\bcard\b'))
print(f"Item/card divs: {len(item_divs)}")
for div in item_divs[:5]:
    print(f"  Class: {div.get('class')} - Text: {div.get_text(strip=True)[:100]}")

# Check for any h2, h3, h4 tags
headers = soup.find_all(['h2', 'h3', 'h4'])
print(f"Headers: {len(headers)}")
for h in headers[:10]:
    print(f"  {h.name}: {h.get_text(strip=True)}")

# Check for any links with title or alt containing hero names
all_links = soup.find_all('a', href=True)
hero_name_links = [link for link in all_links if re.search(r'[A-Z][a-z]+ [A-Z][a-z]+', link.get_text(strip=True))]
print(f"Links with potential names: {len(hero_name_links)}")
for link in hero_name_links[:10]:
    print(f"  {link.get_text(strip=True)} -> {link['href']}")

# Check if content is loaded via JS
scripts = soup.find_all('script')
js_content = ' '.join([str(s) for s in scripts])
if 'ajax' in js_content.lower() or 'fetch' in js_content.lower():
    print("Page likely loads content via AJAX/JS")

# Check for any JSON data in scripts
json_scripts = soup.find_all('script', type='application/json')
for js in json_scripts:
    print(f"JSON script: {js.get_text()[:200]}...")
