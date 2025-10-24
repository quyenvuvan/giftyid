import re
from bs4 import BeautifulSoup

with open('page.html', 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# Check for blog-item
blog_items = soup.select('div.blog-item')
print(f"Found {len(blog_items)} blog-item divs")

if blog_items:
    for item in blog_items[:5]:  # First 5
        title = item.select_one('.blog-item-title a')
        if title:
            print(f"Title: {title.get_text(strip=True)}")
            print(f"Link: {title['href']}")

# Check for other possible selectors
possible_selectors = [
    'div.item',
    'div.article',
    'div.post',
    'div.entry',
    'h2 a',
    'h3 a',
    'a[href*="/nhan-vat/"]'
]

for selector in possible_selectors:
    elements = soup.select(selector)
    if elements:
        print(f"Selector '{selector}': {len(elements)} elements")
        for elem in elements[:3]:
            if elem.name == 'a':
                print(f"  Link: {elem.get_text(strip=True)} -> {elem.get('href')}")
            else:
                link = elem.select_one('a')
                if link:
                    print(f"  {elem.get_text(strip=True)[:50]} -> {link.get('href')}")

# Check for pagination
pagination = soup.select('ul.pagination a')
print(f"Pagination links: {len(pagination)}")
for p in pagination:
    print(f"  {p.get_text(strip=True)} -> {p.get('href')}")

# Check for any links containing 'anh-hung' or 'nhan-vat'
hero_links = soup.find_all('a', href=re.compile(r'/anh-hung|/nhan-vat'))
print(f"Hero-related links: {len(hero_links)}")
for link in hero_links[:10]:
    print(f"  {link.get_text(strip=True)} -> {link['href']}")
