import re, os

files = [f"seed-batch-u{i}.mjs" for i in range(1,7)]
base = "/Users/lym/Documents/code/aiastrum/tarot-ui/scripts/"

for fn in files:
    path = base + fn
    with open(path, "r") as f:
        txt = f.read()
    # Remove image_url lines
    txt = re.sub(r'\s*image_url:\s*"[^"]*",?\n', '\n', txt)
    # Remove published: true lines
    txt = re.sub(r'\s*published:\s*true,?\n', '\n', txt)
    # Replace published: true occurrences
    txt = txt.replace('published: true,', '')
    txt = txt.replace('published: true', '')
    # Add published_at field after category field
    txt = re.sub(
        r"(category:\s*\"[^\"]+\",)",
        r'\1\n    published_at: new Date().toISOString(),',
        txt
    )
    with open(path, "w") as f:
        f.write(txt)
    print(f"Fixed {fn}")
