import RNHTMLtoPDF from 'react-native-html-to-pdf';
import data from './data';

function readData() {
  let celda = '';
  data.checklist.forEach((element) => {
    celda =
      celda +
      `<tr style="font-size:120%;">
        <td style="width: 70%">${element.pregunta}</td>
        <td style="width: 30%">${element.respuesta}</td>
       </tr>`;
  });
  return celda;
}

const createPDF = async (callback) => {
  //   const titulo = 'PDF para cehcklist';
  let options = {
    //Content to print
    html: `<div style="flex-direction: row; justify-content: space-between; display: flex; background: red; margin: 0px 10px 0px 10px" >
              <h2 style="text-align: center;"><strong>Orden: ${
                data.orden
              }</strong></h2>
              <h2 style="text-align: center;"><strong>${
                data.tecnico //fecha Ojo que no se pase
              }</strong></h2>
              <h2 style="text-align: center;"><strong>Creado por: ${
                data.tecnico
              }</strong></h2>
            </div>

            <div style="text-align: center;">
              <table style="text-align: center; width: 90%; margin: 0 auto" border="3">
                <tr style="font-size:150%;">
                    <th style="width: 70%">Pregunta</th>
                    <th style="width: 30%">Respuesta</th>
                </tr>
                ${readData()}
              </table>
            </div>`,
    //File Name
    fileName: 'orden',
    //File directory
    directory: 'docs',
  };
  let file = await RNHTMLtoPDF.convert(options);
  callback(file.filePath);
};

export default createPDF;
