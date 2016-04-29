# Uncontested Candidates

A story about uncontested seats in the N.C. General Assembly using AngularJS, D3, HTML/CSS, JavaScript/jQuery, LeafletJS and R.

#Install instructions: 

1. Download the ZIP file, cd into the main directory with the terminal or command line.
2. Run "npm install"
3. Run project on local NodeJS or Python server. Node: "serve -p 3000", Python: "Python -m SimpleHTTPServer 3000"

#About the data: 

This project's data was collected from the North Carolina State Board of Elections. Their full data site can be found <a href="http://dl.ncsbe.gov/">here</a>. The data was analyzed using the R scripts "house_script.R" and "senate_script.R" in the <a href="https://github.com/lindsaycarbonell/uncontested-candidates/tree/master/assets">assets folder</a>. The specific raw files used can be found in the <a href="https://github.com/lindsaycarbonell/uncontested-candidates/tree/master/assets/priprecinct">priprecinct folder</a>.

The district map used in this project was found in the <a href="http://www.ncleg.net/representation/Content/Archives.aspx">NCGA Redistricting Archives</a> and translated from a shapefile into geoJSON via ArcQGIS. 
