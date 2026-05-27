import os, re

correct_url = "https://tixgzezefjjsyuzgdhcd.supabase.co"
correct_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"

wrong_url = "https://atnupgbwvxrfhkbppmoy.supabase.co"
wrong_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bnVwZ2J3dnhyZmhrYnBwbW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzE4NjAsImV4cCI6MjA2Mjk0Nzg2MH0.GCmSBFpVCHKQwqgf_MNNgfAMBFr9NgjG4KAyqiJDODs"

files = ["scripts/seed-batch-w2.mjs", "scripts/seed-batch-w3.mjs", "scripts/seed-batch-w4.mjs", "scripts/seed-batch-w5.mjs"]

for f in files:
    with open(f) as fp:
        txt = fp.read()
    txt = txt.replace(wrong_url, correct_url)
    txt = txt.replace(wrong_key, correct_key)
    with open(f, "w") as fp:
        fp.write(txt)
    print(f"fixed: {f}")

print("All done!")
