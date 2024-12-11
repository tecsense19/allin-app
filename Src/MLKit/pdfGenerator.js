import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { recognizeImages } from '.';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const pdfGenerator = async (uri, flag) => {
  try {
    if (!uri) {
      console.error('No image URI provided');
      return;
    }

    if (flag === 1) {
        return await createPDF(uri, flag);  
    } 
    else if (flag === 2) {
        const response = await recognizeImages(uri);    
        if (response?.blocks?.length > 0) {
          return await createPDF(response, flag);  
        } else {
          console.log('No text blocks found');
        }
    }
    else {
        console.error('Invalid flag provided');
      return;
    }
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

const createPDF = async (response, flag) => {
  try {
    let htmlContent;

    if (flag === 1) {
        htmlContent = imageToHtml(response);
    } 
    else if (flag === 2) {
        const scales = width / response.width;
        htmlContent = textToHtml(response, scales);
    }
    else {
    }

    const options = {
      html: htmlContent,
      fileName: `Document_${Date.now()}`,
      directory: "Documents",
    };

    const pdfFile = await RNHTMLtoPDF.convert(options);
    console.log('PDF File:', pdfFile);   

    return pdfFile;

  } catch (error) {
    console.error('Error generating PDF', error);
  }
};

const textToHtml = (normalText, scale) => {
  return `
    <html>
      <head>
        <title>Converted Text</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .text-content {
            color: black;
            font-size: 11px;
            text-align: justify;
            text-justify: inter-word;
            margin: 0;
          }
        </style>
      </head>
      <body>
        ${normalText.blocks.map((block) => {
          return `<div style="position: absolute; top: ${block.rect.top * 1.7}px; left: ${block.rect.left * 1.8}px; height: ${block.rect.height}px;">
            ${block.lines.map((line) => {
              return `<div style="position: relative; top: 0; left: 0; ">
                <p class="text-content">${line.text}</p>
              </div>`;
            }).join('')}
          </div>`;
        }).join('')}
      </body>
    </html>
  `;
};


const imageToHtml = (imageUrl) => {
    console.log("imageUrl--------->>>>", imageUrl);
    return `
        <html>
        <head>
            <title>Converted Image</title>
            <style>
            body { margin: 0; padding: 0; height: 100%; display: flex; justify-content: center; align-items: center; }
            img { object-fit: contain; height: ${width / 6.5}em; }
            </style>
        </head>
        <body>
            <img src="${imageUrl}" alt="image"/>
        </body>
        </html>
    `;
};
