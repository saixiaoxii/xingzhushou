from orc.ocr import ocr
import numpy as np
from PIL import Image



def single_pic_proc(image_file):
    image = np.array(Image.open(image_file).convert('RGB'))
    result, image_framed = ocr(image)
    return result, image_framed


if __name__ == '__main__':
    image_file = './test_images/t1.png'
    result, image_framed = single_pic_proc(image_file)
    for key in result:
        print(result[key][1])
