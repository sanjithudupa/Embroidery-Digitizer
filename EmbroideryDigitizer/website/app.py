import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)

app.config["IMAGE_UPLOADS"] = "/Users/sanjithudupa/Documents/GitHub/Embroidery-Digitizer/EmbroideryDigitizer/uploads"
app.config["ALLOWED_IMAGE_EXT"] = ["SVG"]
app.config["MAX_FILE_SIZE"] = 0.25 * 1024 * 1024

result = ""

def allowed_image(filename):
    if not "." in filename:
        return False
    ext = filename.rsplit(".", 1)[1]
    if ext.upper() in app.config["ALLOWED_IMAGE_EXT"]:
        return True
    else:
        return False

def allowed_file_size(f):
    f.seek(0, os.SEEK_END)
    size = f.tell()
    f.seek(0)  
    
    if(size <= app.config["MAX_FILE_SIZE"]):
        return True
    else:
        return  False



@app.route("/upload-image", methods=["GET"])
def upload_image():
 
    # if request.method == "POST":
    #     if request.files:
            
    #         image = request.files["image"]

    #         if not allowed_file_size(image):
    #             print("file is too big")
    #             return redirect(request.url)

    #         if image.filename == "":
    #             print("image must have a filename")
    #             return redirect(request.url)

    #         if not allowed_image(image.filename):
    #             print("image extension not allowed")
    #             return redirect(request.url)
    #         else:
    #             filename = secure_filename(image.filename)
    #             print(type(image))

    #             image.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
                
    #         print('image saved')
    #         return redirect(request.url)

    return render_template("upload.html", result=result)

@app.route("/process-image", methods=["POST"])
def process_image():

    if request.files:
        
        image = request.files["image"]

        if not allowed_file_size(image):
            print("file is too big")
            result = "File exceeds maximum size allowed"
            return redirect(url_for('upload_image'))
            # return render_template("upload.html", result="File exceeds maximum size allowed")

        if image.filename == "":
            print("image must have a filename")
            result = "File exceeds maximum size allowed"
            return redirect(url_for('upload_image'))
            # return render_template("upload.html", result="Image must have a filename")
 
        if not allowed_image(image.filename):
            result = "File exceeds maximum size allowed"
            return redirect(url_for('upload_image'))
            # return render_template("upload.html", result="Extension not allowed")

        else:
            filename = secure_filename(image.filename)
            print(type(image))

            image.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))

            return render_template("process.html", fname=filename)
            
        print('image saved')
        # return redirect(request.url)

    return render_template("process.html", fname="upload failed")


if __name__ == '__main__':
   app.run(debug = True)