import { readdir } from "fs/promises";
import { readPDF } from "./src/readPDF.js";
import fs from 'fs/promises'
import { handlePage } from "./src/pagesHandler.js";
const dir = "./docs/pdfs"

const handleDocuments = (document, index) => {
    const pageObject = {EMPRESTIMOS: [], CARTAO_RMC: [], CARTAO_RCC: []}
    document?.map((e, i) => handlePage(e, i, pageObject))
    fs.writeFile(`./docs/json/${index}_EXTRATO_${document[0]?.[6]?.str}_${Date.now()}.json`, JSON.stringify([pageObject]))
}
const createPDFArray = async () => {
    const dirFiles = await readdir(dir)
    const array = []
    for (let index = 0; index < dirFiles.length; index++) {
        const element = dirFiles[index];
        array.push(await readPDF(`${dir}/${element}`))
    }
    return array
}
const handlePDF = async() => {
    const array = await createPDFArray()
    console.log(array?.length)
    array.map((e, i) => handleDocuments(e, i))
}

handlePDF()