import os
import subprocess
import glob
import re

# Source directory
source_dir = "/Users/julas/Desktop/Websites Geral/Al Durr/Hero/Images/Images2"
# Target directory
target_dir = "/Users/julas/Desktop/Websites Geral/Al Durr/public/hero-sequence-v2"

# Create target dir
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

# Get all tiff files
files = glob.glob(os.path.join(source_dir, "*.tiff"))

# Sort files naturally
def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

files.sort(key=natural_sort_key)

print(f"Found {len(files)} files. Converting to PNG to preserve transparency...")

# Convert
for i, file_path in enumerate(files):
    # Output name: frame_000.png (PNG for transparency)
    output_name = f"frame_{str(i).zfill(3)}.png"
    output_path = os.path.join(target_dir, output_name)
    
    # Use sips to convert to png and resize to max width 1600 (slightly smaller for PNG performance)
    cmd = [
        "sips", 
        "-s", "format", "png", 
        "-Z", "1600", 
        file_path, 
        "--out", output_path
    ]
    
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)
        if i % 10 == 0:
            print(f"Converted {i}/{len(files)}: {output_name}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {file_path}: {e}")

print("Conversion complete.")
