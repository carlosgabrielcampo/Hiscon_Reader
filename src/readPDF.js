import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js"
import fs from "fs/promises"

const readPDF = async(filePath) => {
    const file = await fs.readFile(filePath) 
    if (!file) {
        console.error("Error reading PDF")
        return
    }
    return await new Promise((resol, rej) => {
        pdfjsLib.getDocument({ data: file }).promise.then(pdf => {
            const numPages = pdf.numPages
            const getPageText = (pageNum) => {
                return new Promise((resolve, reject) => {
                    pdf.getPage(pageNum).then(page => {
                        page.getTextContent().then(textContent => {
                            const items = textContent.items
                            resolve(items)
                        })
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        
            const pagePromises = []
            for (let i = 1; i <= numPages; i++) {
                pagePromises.push(getPageText(i))
            }
        
            Promise.all(pagePromises).then(pages => resol(pages))
                .catch(err => rej("Error reading pages:", err))
                .catch(err =>rej("Error loading PDF:", err))
        })
    })

}

export { readPDF }