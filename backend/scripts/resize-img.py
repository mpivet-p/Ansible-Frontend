#!/usr/bin/env python3

from PIL import Image
import sys
import os


def resize_image(img_path, img_name):
	basewidth = 140
	img = Image.open(img_path)
	height = int(float(basewidth * img.size[1]) / img.size[0])
	if height > 79:
		height = 79
	img = img.resize((basewidth, height), Image.Resampling.LANCZOS)
	img.save(f"{OUTPUT_PATH}/{img_name}")

if __name__ == "__main__":
	if len(sys.argv) < 3:
		print("./script OUPUT_PATH IMG [..]")
	else:
		OUTPUT_PATH=sys.argv[1]
		for arg in sys.argv[2:]:
			try:
				resize_image(arg, os.path.basename(arg))
			except:
				print(f"Resize failed for {arg}")
