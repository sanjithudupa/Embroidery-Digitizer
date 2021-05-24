import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory, make_response, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import sys
sys.path.append(os.getcwd() + "/EmbroideryDigitizer/python/")
from embroidery import createEmbroidery, cleanup # type: ignore
import uuid

app = Flask(__name__)
cors = CORS(app)

app.config["IMAGE_UPLOADS"] = "uploads"
app.config["OUTPUT_FOLDER"] = "outputFolder"
app.config["TEMP_FOLDER"] = "tempFolder"
app.config["ALLOWED_IMAGE_EXT"] = ["SVG"]
app.config["MAX_FILE_SIZE"] = 0.25 * 1024 * 1024
app.config['CORS_HEADERS'] = 'Content-Type'

result = ""

file_ids = {}

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

def convert_to_array(gcode):
    full = []
    for line in gcode.splitlines():
        if "G00" in line:
            x = float(line[line.index('X') + 1: line.index(' ', line.index('X'))])
            y = float(line[line.index("Y") + 1:])
            full.append([x,y])
        elif "M00" in line:
            full.append([500000000,500000000])
    return (full)

@app.route("/")
def home():
    return redirect(url_for("about"))

@app.route("/upload", methods=["GET"])
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

@app.route("/preview", methods=["POST"])
def process_image():
    if request.files:
        
        ext = request.form["extension"]

        repetitions = 0

        fillcheck = request.form.get("fill")

        fill = False

        image = request.files["image"]

        if fillcheck == "on":
            repetitions = request.form["repetitions"]
            fill = True

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

            # print(createEmbroidery(filename, ext, int(repetitions), fill))
            embroideryDone = createEmbroidery(filename, ext, int(repetitions), fill)

            print(embroideryDone)

            gfile = open("tempFolder/" + filename + ".gcode")

            gcodeArray = convert_to_array(gfile.read())

            cleanup(filename)

            return render_template("preview.html", fname=filename, gcode_array=gcodeArray, fext=ext, toast_message=embroideryDone)

        print('image saved')
        # return redirect(request.url)

    return render_template("process.html", fname="upload failed", gcodeArray="", fext="")

@app.route("/download", methods=["POST"])
def download_file():
    x = send_from_directory(app.config["OUTPUT_FOLDER"], request.form["file_name"], as_attachment=True)
    os.remove(app.config["OUTPUT_FOLDER"] + "/" + request.form["file_name"])

    # print(os.system("ls " + app.config["OUTPUT_FOLDER"]))
    # print('/download')
    
    return x

@app.route("/about", methods=["GET"])
def about():
    return render_template("about.html")
# @app.route("/sim", methods=["GET"])
# def sim():
#     return render_template("sim.html")

@app.route("/api/digitize", methods=["POST"])
@cross_origin() 
def upload():
    if request.files:
        ext = request.form["extension"]
        fillcheck = request.form.get("fill")

        fill = fillcheck == "true"
        image = request.files["image"]

        if not allowed_file_size(image):
            return make_response(
                "Error: Filesize too large",
                400
            )

        if image.filename == "":
            return make_response(
                "Error: Image must have a filename",
                400
            )

        if not allowed_image(image.filename):
            return make_response(
                "Error: Uploading image",
                400
            )
        else:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))

            print("saved into " + app.config["IMAGE_UPLOADS"])

            embroideryDone = createEmbroidery(filename, ext, 12, fill)
            gfile = open("tempFolder/" + filename + ".gcode")
            gcodeArray = convert_to_array(gfile.read())

            uid = str(uuid.uuid4())

            file_ids[uid] = [filename, ext]

            resp = {
                "file": filename + ext,
                "gcode": gcodeArray,
                "uid": uid,
                "toast": embroideryDone
            }

            return jsonify(resp)

    return make_response(
        "Error: Upload Failed",
        400
    )
@app.route("/api/download", methods=["POST"])
def download_api():
    if not file_ids[request.form["uid"]]:
        return make_response(
            "Error: File Not Found",
            400
        )

    fname = file_ids[request.form["uid"]][0]
    ext = file_ids[request.form["uid"]][1]
    
    print("removing " + fname)

    x = send_from_directory(app.config["OUTPUT_FOLDER"], fname + ext, as_attachment=True)
    os.remove(app.config["OUTPUT_FOLDER"] + "/" + fname + ext)
    os.remove(app.config["IMAGE_UPLOADS"] + "/" + fname)

    gcode = fname + ".gcode"

    os.remove(app.config["TEMP_FOLDER"] + "/" + gcode)

    del file_ids[request.form["uid"]]

    # print(os.system("ls " + app.config["OUTPUT_FOLDER"]))
    # print('/download')
    
    return x
if __name__ == '__main__':
    # print(os.getcwd() + "../../python")
    # print(app.root_path)
    app.run()
