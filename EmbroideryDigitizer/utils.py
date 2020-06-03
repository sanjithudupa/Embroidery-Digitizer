from xml.dom import minidom
from svgpathtools import parse_path, Line, Path, wsvg, svg2paths

def fixGcode(fname):
    #input file
    fin = open(fname + ".gcode", "rt")
    #output file to write the result to
    fout = open(fname + "_changed.gcode", "wt")

    began = False

    #for each line in the input file
    for line in fin.readlines():
        #read replace the string and write to output file
        if not began:
            if "; cut" in line:
                began = True
        else:
            fout.write(line.replace('G1', 'G00'))

    #close input and output files
    fin.close()
    fout.close()
def writeGcode(gcode_file, svg_path):
    gcodeString = ""

    doc = minidom.parse(svg_path)
    path_strings = [path.getAttribute('d') for path
                    in doc.getElementsByTagName('path')]
    doc.unlink()

    # print the line draw commands
    for path_string in path_strings:
        p = parse_path(path_string)
        for i in range(0,int(p.length()),2):
            div = (i/p.length())
            point = p.point(div)
            x = point.real
            y = point.imag
            gcodeString += ("G00 X" + str(x) + " Y" + str(y)) + "\n"
        if(len(path_strings) > 1):
            gcodeString += "\nM00"

    gcodeString += "\nM30"

    f = open(gcode_file, "w")
    f.write(gcodeString)
    f.close()
