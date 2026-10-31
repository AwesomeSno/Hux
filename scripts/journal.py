#!/usr/bin/env python3
"""
Hux Journal Manager
-------------------
Manages devlog entries in `journal/*.md`, validates linked engineering sketches
in `journal/images/`, guards root `JOURNAL.md` from accidental overwrites, and
helps sync/push updates to GitHub.

Usage:
    python3 scripts/journal.py status
    python3 scripts/journal.py verify
    python3 scripts/journal.py new <slug> [--hours H]
    python3 scripts/journal.py export <slug>
    python3 scripts/journal.py push [commit message]
"""

import sys
import os
import re
import argparse
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
JOURNAL_DIR = REPO_ROOT / "journal"
IMAGES_DIR = JOURNAL_DIR / "images"
ROOT_JOURNAL = REPO_ROOT / "JOURNAL.md"

HALF_LIFE_PLACEHOLDER_SNIPPET = "Edits here are overwritten on the next sync."

def check_root_journal_guard():
    """Warns if root JOURNAL.md has been modified away from Half Life sync format."""
    if not ROOT_JOURNAL.exists():
        return
    content = ROOT_JOURNAL.read_text(encoding="utf-8")
    if HALF_LIFE_PLACEHOLDER_SNIPPET not in content:
        print("\033[93m[WARNING] Root JOURNAL.md appears modified. Remember that Half Life's bot\n"
              "          overwrites JOURNAL.md on sync. Store local entries in journal/*.md!\033[0m\n")


def scan_entries():
    """Returns list of devlog metadata from journal/*.md."""
    if not JOURNAL_DIR.exists():
        return []
    entries = []
    for md_file in sorted(JOURNAL_DIR.glob("*.md")):
        text = md_file.read_text(encoding="utf-8")
        title_match = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else md_file.stem
        
        # Extract hours if specified (e.g., **5h** or Hours: 5)
        hours_match = re.search(r"\*\*(\d+)h\*\*", text) or re.search(r"(\d+)\s*hours?", text, re.IGNORECASE)
        hours = int(hours_match.group(1)) if hours_match else 0
        
        # Find all referenced images
        image_refs = re.findall(r"!\[(.*?)\]\((.*?)\)", text)
        words = len(re.findall(r"\b\w+\b", text))
        
        # Verify images on disk
        valid_images = 0
        missing_images = []
        for alt, path_str in image_refs:
            # Normalize path: handles 'images/foo.png' or 'journal/images/foo.png'
            clean_path = path_str.split("?")[0].strip()
            if clean_path.startswith("journal/"):
                target = REPO_ROOT / clean_path
            elif clean_path.startswith("images/"):
                target = JOURNAL_DIR / clean_path
            else:
                target = JOURNAL_DIR / clean_path
            
            if target.exists():
                valid_images += 1
            else:
                missing_images.append(clean_path)
                
        entries.append({
            "path": md_file,
            "filename": md_file.name,
            "title": title,
            "hours": hours,
            "words": words,
            "image_refs": image_refs,
            "valid_images": valid_images,
            "missing_images": missing_images
        })
    return entries


def cmd_status(args):
    check_root_journal_guard()
    entries = scan_entries()
    print("\033[1;36m=== Hux Devlog Status ===\033[0m")
    if not entries:
        print("No entries found in journal/*.md.")
        return
        
    total_hours = sum(e["hours"] for e in entries)
    total_words = sum(e["words"] for e in entries)
    total_imgs = sum(len(e["image_refs"]) for e in entries)
    
    for e in entries:
        print(f"\n\033[1m[{e['filename']}]\033[0m")
        print(f"  Title:  {e['title']}")
        print(f"  Words:  {e['words']:,}")
        print(f"  Images: {e['valid_images']}/{len(e['image_refs'])} verified on disk")
        if e['missing_images']:
            for m in e['missing_images']:
                print(f"    \033[91m✖ Missing: {m}\033[0m")
        else:
            print(f"    \033[92m✔ All images verified in {IMAGES_DIR.name}/\033[0m")
            
    print("\n-------------------------------------------")
    print(f"Total Entries: {len(entries)} | Total Words: {total_words:,} | Total Images: {total_imgs}")
    print("-------------------------------------------")


def cmd_verify(args):
    check_root_journal_guard()
    entries = scan_entries()
    print("\033[1;34m=== Running Devlog Integrity Checks ===\033[0m")
    has_errors = False
    
    for e in entries:
        print(f"\nChecking {e['filename']}...")
        if len(e["image_refs"]) < 10:
            print(f"  \033[93m⚠ Warning: {len(e['image_refs'])} images linked (target: 10 images)\033[0m")
        else:
            print(f"  \033[92m✔ Image count: {len(e['image_refs'])} images\033[0m")
            
        if e["missing_images"]:
            has_errors = True
            for m in e["missing_images"]:
                print(f"  \033[91m✖ Broken image link: {m}\033[0m")
        else:
            print(f"  \033[92m✔ All linked images exist on disk\033[0m")
            
        text = e["path"].read_text(encoding="utf-8")
        if "$65" in text:
            print(f"  \033[92m✔ Strict budget citation verified ($65 Half Life cap)\033[0m")
        else:
            print(f"  \033[93m⚠ Note: $65 budget cap not explicitly mentioned\033[0m")

    if has_errors:
        print("\n\033[91mVerification failed with errors.\033[0m")
        sys.exit(1)
    else:
        print("\n\033[92mAll verification checks passed successfully!\033[0m")


def cmd_new(args):
    slug = args.slug.lower().replace("-", "_")
    if not slug.endswith(".md"):
        target_file = JOURNAL_DIR / f"{slug}.md"
    else:
        target_file = JOURNAL_DIR / slug
        
    if target_file.exists():
        print(f"\033[91mError: {target_file} already exists!\033[0m")
        sys.exit(1)
        
    hours = args.hours or 5
    title = slug.replace(".md", "").replace("_", " ").title()
    
    template = f"""# Hux - Devlog: {title}

**{hours}h**

[Short personal intro about what was built in this session, the hands-on hardware testing, and design considerations.]

---

### 01: [Milestone Title]
[Details about the schematic, layout, or firmware step.]
![Fig 01](images/{slug}_01.png)

---

### 02: [Milestone Title]
[Details]
![Fig 02](images/{slug}_02.png)

---

### 03: [Milestone Title]
[Details]
![Fig 03](images/{slug}_03.png)

---

### 04: [Milestone Title]
[Details]
![Fig 04](images/{slug}_04.png)

---

### 05: [Milestone Title]
[Details]
![Fig 05](images/{slug}_05.png)

---

### 06: [Milestone Title]
[Details]
![Fig 06](images/{slug}_06.png)

---

### 07: [Milestone Title]
[Details]
![Fig 07](images/{slug}_07.png)

---

### 08: [Milestone Title]
[Details]
![Fig 08](images/{slug}_08.png)

---

### 09: [Milestone Title]
[Details]
![Fig 09](images/{slug}_09.png)

---

### 10: [Milestone Title]
[Details & BOM verification under $65 budget cap.]
![Fig 10](images/{slug}_10.png)

---

### Summary & Next Steps
- [ ] [Next action item 1]
- [ ] [Next action item 2]
"""
    JOURNAL_DIR.mkdir(parents=True, exist_ok=True)
    target_file.write_text(template, encoding="utf-8")
    print(f"\033[92m✔ Created new journal template: {target_file.relative_to(REPO_ROOT)}\033[0m")


def cmd_export(args):
    slug = args.slug
    target_file = JOURNAL_DIR / f"{slug}.md" if not slug.endswith(".md") else JOURNAL_DIR / slug
    if not target_file.exists():
        print(f"\033[91mError: {target_file} not found.\033[0m")
        sys.exit(1)
        
    content = target_file.read_text(encoding="utf-8")
    print(content)


def cmd_push(args):
    """Stages journal, scripts, and pushes to git."""
    check_root_journal_guard()
    cmd_verify(args)
    
    commit_msg = args.message or "Update devlog and engineering sketches"
    print(f"\n\033[1;36mStaging and committing to git...\033[0m")
    
    subprocess.run(["git", "add", "journal/", "scripts/", "JOURNAL.md", ".gitignore"], check=True, cwd=REPO_ROOT)
    
    # Check if there are changes to commit
    status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, cwd=REPO_ROOT)
    if not status.stdout.strip():
        print("No changes to commit.")
        return
        
    subprocess.run(["git", "commit", "-m", commit_msg], check=True, cwd=REPO_ROOT)
    print("\033[1;36mPushing to origin main...\033[0m")
    subprocess.run(["git", "push", "origin", "main"], check=True, cwd=REPO_ROOT)
    print("\033[92m✔ Pushed successfully to GitHub!\033[0m")


def main():
    parser = argparse.ArgumentParser(description="Hux Devlog Manager")
    subparsers = parser.add_subparsers(dest="command")
    
    # status
    p_status = subparsers.add_parser("status", help="Show overview of devlog entries and image verification")
    p_status.set_defaults(func=cmd_status)
    
    # verify
    p_verify = subparsers.add_parser("verify", help="Strict verification of images and budget citations")
    p_verify.set_defaults(func=cmd_verify)
    
    # new
    p_new = subparsers.add_parser("new", help="Create a new journal entry template")
    p_new.add_argument("slug", help="Slug name for entry (e.g. first_5_hours)")
    p_new.add_argument("--hours", type=int, default=5, help="Hours logged (default: 5)")
    p_new.set_defaults(func=cmd_new)
    
    # export
    p_export = subparsers.add_parser("export", help="Print entry markdown for copy-pasting to Half Life")
    p_export.add_argument("slug", help="Slug of entry (e.g. initial)")
    p_export.set_defaults(func=cmd_export)
    
    # push
    p_push = subparsers.add_parser("push", help="Commit and push journal updates to GitHub")
    p_push.add_argument("message", nargs="?", default=None, help="Git commit message")
    p_push.set_defaults(func=cmd_push)
    
    args = parser.parse_args()
    if not args.command:
        cmd_status(args)
    else:
        args.func(args)

if __name__ == "__main__":
    main()
