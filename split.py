from PIL import Image

img = Image.open('images/rafaella.png')
w, h = img.size

left = img.crop((0, 0, w//2, h))
right = img.crop((w//2, 0, w, h))

left.save('images/rafaella_antes.jpg')
right.save('images/rafaella_depois.jpg')
