/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */

/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in allah and he is enough for me */

import EventEmitter from 'events'
import pdfjs from 'pdfjs-dist/legacy/build/pdf.js'
import sharp from 'sharp'
import Path from 'path'
import { error, log } from 'console'

const { getDocument, OPS } = pdfjs

 function exportImagesEvents (src, dst) {
  const ee = new EventEmitter()
  const promise = exportImages(src, dst, (name, event) => ee.emit(name, event))
  // The promise consumer can register event hanlders to
  // observe the promise progression details
  promise.on = (name, handler) => {
    ee.on(name, handler)
    return promise
  }
  return promise
}

 async function sepImageToPdf (src, dst, emit = () => {}) {
  const doc = await getDocument(src).promise
  const pageCount = doc._pdfInfo.numPages
  emit('load', { pageCount })
  const images = [];
  for (let p = 1; p <= pageCount; p++) {
    const page = await doc.getPage(p)
    const ops = await page.getOperatorList()

    for (let i = 0; i < ops.fnArray.length; i++) {
      try {
        if (
          ops.fnArray[i] === OPS.paintJpegXObject ||
          ops.fnArray[i] === OPS.paintImageXObject ||
          ops.fnArray[i] === OPS.paintInlineImageXObject) {
          let fileName = (Date.now() + "-" + Math.floor(Math.random()*100000));
          let name = ops.argsArray[i][0]
          let img = await page.objs.get(name)
          let { width, height, kind } = img
          let bytes = img.data.length
          let channels = bytes / width / height
          let file = Path.join(dst, `${fileName}.png`)
          await sharp(img.data, {
            raw: { width, height, channels }
          }).toFile(file)
          const event = { fileName, name, kind, width, height, channels, bytes, file }
          emit('image', event)
          images.push(event)
        }
      } catch (error) {
        //emit('error', error)
      }
    }
  }
  emit('done', images)
  return images
}
sepImageToPdf("uploads/pdf/1719831460347-96976.pdf" , "uploads/pdf_Image").then((images) => {
  console.log(images);
}).catch((error)=> {
  console.log(error);
})
 

export default sepImageToPdf;

