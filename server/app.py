import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from skimage import metrics

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def compare_images():
    data = request.get_json()
    ai_image_base64 = data.get('aiImage', '')
    normal_image_base64 = data.get('normalImage', '')

    ai_image_data = np.frombuffer(base64.b64decode(ai_image_base64), dtype=np.uint8)
    normal_image_data = np.frombuffer(base64.b64decode(normal_image_base64), dtype=np.uint8)

    ai_image_data = cv2.imdecode(ai_image_data, cv2.IMREAD_COLOR)
    normal_image_data = cv2.imdecode(normal_image_data, cv2.IMREAD_COLOR)
    
    normal_image_data = cv2.resize(normal_image_data, (ai_image_data.shape[1], ai_image_data.shape[0]), interpolation = cv2.INTER_AREA)
    print(ai_image_data.shape, normal_image_data.shape)
   
    ai_image_data_gray = cv2.cvtColor(ai_image_data, cv2.COLOR_BGR2GRAY)
    normal_image_data_gray = cv2.cvtColor(normal_image_data, cv2.COLOR_BGR2GRAY)

    ssim_score = metrics.structural_similarity(ai_image_data_gray, normal_image_data_gray, full=True)
    print(f"SSIM Score: ", round(ssim_score[0], 2))

    return jsonify({"SSIM Score": round(ssim_score[0], 2)})

    ########

    # ai_image_data = np.frombuffer(base64.b64decode(ai_image_base64), dtype=np.uint8)
    # normal_image_data = np.frombuffer(base64.b64decode(normal_image_base64), dtype=np.uint8)

   
    # normal_image = cv2.imdecode(normal_image_data, cv2.IMREAD_COLOR)

    # ai_image = cv2.imread('download.jpeg')

  
    # hist_img1 = cv2.calcHist([ai_image], [0, 1, 2], None, [256, 256, 256], [0, 256, 0, 256, 0, 256])
    # hist_img1[255, 255, 255] = 0  # Ignore all white pixels
    # cv2.normalize(hist_img1, hist_img1, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    # hist_img2 = cv2.calcHist([normal_image], [0, 1, 2], None, [256, 256, 256], [0, 256, 0, 256, 0, 256])
    # hist_img2[255, 255, 255] = 0  # Ignore all white pixels
    # cv2.normalize(hist_img2, hist_img2, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    # # Find the metric value
    # metric_val = cv2.compareHist(hist_img1, hist_img2, cv2.HISTCMP_CORREL)
    
    # print(f"Similarity Score: ", round(metric_val, 2))
    
    # return jsonify({'similarityScore': round(metric_val, 2)})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
