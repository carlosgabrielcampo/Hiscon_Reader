const page2CC = {
    3: "NOME",
    5: "TIPO BENEFÍCIO",
    7: "Nº BENEFÍCIO",
    9: "SITUAÇÃO",
    11: "MEIO",
    13: "PAGO EM",
    15: "AGÊNCIA",
    17: "CONTA CORRENTE",
    18: "PROCURADOR",
    19: "REPRESENTANTE",
    20: "PENSÃO ALIMENTÍCIA",
    21: "LIBERADO EMPRÉSTIMO",
    22: "ELEGÍVEL EMPRÉSTIMO",
    27: "BASE DE CÁLCULO EMPRÉSTIMOS",
    28: "MARGEM CONSIGNÁVEL EMPRÉSTIMOS",
    30: "MARGEM UTILIZADA EMPRÉSTIMOS",
    32: "MARGEM RESERVADA EMPRÉSTIMOS",
    29: "MARGEM DISPONÍVEL EMPRÉSTIMOS",
    34: "MARGEM EXTRAPOLADA EMPRÉSTIMOS",
    39: "BASE DE CÁLCULO RMC",
    36: "MARGEM CONSIGNÁVEL RMC",
    41: "MARGEM UTILIZADA RMC",
    40: "MARGEM RESERVADA RMC",
    37: "MARGEM DISPONÍVEL RMC",
    38: "MARGEM EXTRAPOLADA RMC",
    45: "BASE DE CÁLCULO RCC",
    46: "MARGEM CONSIGNÁVEL RCC",
    47: "MARGEM UTILIZADA RCC",
    48: "MARGEM RESERVADA RCC",
    49: "MARGEM DISPONÍVEL RCC",
    50: "MARGEM EXTRAPOLADA RCC",
    60: "DATA"
}
const page2CM = {
    3: "NOME",
    5: "TIPO BENEFÍCIO",
    7: "Nº BENEFÍCIO",
    9: "SITUAÇÃO",
    11: "MEIO",
    13: "PAGO EM",
    14: "PROCURADOR",
    15: "REPRESENTANTE",
    16: "PENSÃO ALIMENTÍCIA",
    17: "LIBERADO EMPRÉSTIMO",
    18: "ELEGÍVEL EMPRÉSTIMO",
    23: "BASE DE CÁLCULO EMPRÉSTIMOS",
    24: "MARGEM CONSIGNÁVEL EMPRÉSTIMOS",
    26: "MARGEM UTILIZADA EMPRÉSTIMOS",
    28: "MARGEM RESERVADA EMPRÉSTIMOS",
    25: "MARGEM DISPONÍVEL EMPRÉSTIMOS",
    30: "MARGEM EXTRAPOLADA EMPRÉSTIMOS",
    35: "BASE DE CÁLCULO RMC",
    32: "MARGEM CONSIGNÁVEL RMC",
    37: "MARGEM UTILIZADA RMC",
    36: "MARGEM RESERVADA RMC",
    33: "MARGEM DISPONÍVEL RMC",
    34: "MARGEM EXTRAPOLADA RMC",
    41: "BASE DE CÁLCULO RCC",
    42: "MARGEM CONSIGNÁVEL RCC",
    43: "MARGEM UTILIZADA RCC",
    44: "MARGEM RESERVADA RCC",
    45: "MARGEM DISPONÍVEL RCC",
    46: "MARGEM EXTRAPOLADA RCC",
    56: "DATA"
}
const iof_regex = [
    /^R\$\d{1,3}\,\s\d{0,2}$/, 
    /^R\$\d{1,3}$/, 
    /^R\$\d{1,3}\s\d+\,\d{0,2}$/, 
    /^R\$\d{1,3}\,\d{1}\s\d{1}$/
]
const banco_regex = [/^\d{3}\s-\s[A-Z\s|\d]+$/]
const month_year_regex = [/^\d{1,2}\/\d{4}$/]
const value_regex = [/^R\$\d{1,3}(.\d{1,3})*(\,\d{0,2})?$/, /^R\$\d{1,3}(.\d{1,3})*(\,\d{0,2})\s\d+$/]
const only_text_regex = [/^\D+$/]
const date_regex = [/^\d{2}\/\d{2}\/\d{2}$/]
const next_page_regex = [/\d+\s\/\s\d+$/]
const orgin_regex = [...only_text_regex, /^Migrado do contrato.+$$/]
const situation_regex = [/Ativo|Suspenso Banco|Suspenso Inss/i]
const two_digit_regex = [/^\d{1,2}?$/]
const contract_regex = [
    /^\d+\-(\s*)\d+$/, 
    /^\d{3,}$/, 
    /^\d+\s\d+\w+$/, 
    /^\d+\-\s\d+\/\d+$/, 
    /^\d+\-\s\d+\/\d+\_\s\d+$/,
    /^\d{3,}(\s)\d$/, 
    /^\d+\-\s\d+\_\d+$/, 
    /^\d+\w+\s\w+$/, 
    /^\d{2,}\-\d+\/\d+$/, 
    /^\d{4,}\w{0,3}$/ 
]
const card_contract_regex = [
    /^\d+\-\d+\/\d+$/, 
    /^\d+\-(\s*)\d+$/, 
    /^\d{3,}$/, 
    /^\d{3,}\s\d+$/, 
    /^\d+\-\d+\/\d+\_\d+$/
]
const loanKeys = [
    {type: "CONTRATO", regex: contract_regex, fixed: true },
    {type: "BANCO" , regex: banco_regex , fixed: true },
    {type: "INÍCIO DE DESCONTO" , regex: month_year_regex, fixed: true },
    {type: "FIM DE DESCONTO" , regex: month_year_regex, fixed: true },
    {type: "QUANTIDADE DE PARCELAS" , regex: two_digit_regex, fixed: true },
    {type: "PARCELA" , regex: value_regex, fixed: true },
    {type: "EMPRESTADO" , regex: value_regex, fixed: true },
    {type: "IOF" , regex: iof_regex, fixed: false },
    {type: "SITUAÇÃO", regex: situation_regex, fixed: true },
    {type: "ORIGEM DA AVERBAÇÃO", regex: orgin_regex, fixed: false },
    {type: "DATA INCLUSÃO" , regex: date_regex, fixed: true },
    {type: "LIBERADO", regex: value_regex, fixed: false },
]
const cardKeys = [
    {type: "CONTRATO", regex: card_contract_regex },
    {type: "BANCO" , regex: banco_regex , fixed: true },
    {type: "LIMITE CARTÃO" , regex: value_regex, fixed: true },
    {type: "SITUAÇÃO", regex: situation_regex, fixed: true },
    {type: "ORIGEM DA AVERBAÇÃO", regex: orgin_regex, fixed: false },
    {type: "DATA INCLUSÃO" , regex: date_regex, fixed: true },
    {type: "RESERVADO" , regex: value_regex, fixed: true },
]
const regexTest = (regex, string) => new RegExp(regex).test(string)
const regexArrayValidation = (regex, str) => regex.find((e) => regexTest(e, str))
const joiningStrings = (filtered) => {
    const array = []
    let lastObject = {}
    for (let index = 0; index < filtered.length; index++) {
        const element = filtered[index]
        const { width, transform, str } = element
        const x = transform[5]
        const center = (width/2) + x
        const centerCompare = lastObject.center - center
        if(-1 < centerCompare && centerCompare < 1){
            const last = array.at(-1)
            last.str = `${last.str} ${str}`
            filtered[index].str = ""
        } else {
            lastObject.center = center
            array.push(element)
        }
    }
    return array
}
const createPage2 = (index, text, pageObject, alle) => {
    let page2 = page2CC
    console.log(text, index)
    if(alle[11].str === "Cartão Magnético") page2 = page2CM
    const key = page2[index]
    if(key) pageObject[key] = text
}
const next_text_validation = (data, regex, str, type, fixed) => {
    let { loanObject, pageObject, loanTable, typeArray } = data
    const findSuccessfulTest = regexArrayValidation(regex, str)
    if(findSuccessfulTest){
        loanObject[type] = str
        data.counter += 1
    } else if(!findSuccessfulTest && !fixed){
        data.counter += 1
        loanObject[type] = ""
        let newRegex = loanTable[data.counter]?.regex
        if(newRegex){
            const findSuccessfulTest = regexArrayValidation(newRegex, str)
            if(findSuccessfulTest){
                loanObject[loanTable[data.counter].type] = str
                data.counter += 1
            }
        } else if(!newRegex && regexArrayValidation(date_regex, str)){
            data.counter = data.counter > 11 ? 11 : data.counter
        } else {
            const newContract = Object.assign({}, loanObject)
            pageObject[typeArray].push(newContract)
            data.counter = 0
            return handleLoanTable(data)
        }

    }
}

const handleLoanTable = (data) => {
    let { e, index, length, counter, loanObject, pageObject, loanTable, typeArray } = data
    try {
        const table_legth = loanTable.length
        const table = loanTable[counter]
        const [type, regex, fixed] = [table?.type, table?.regex, table?.fixed]
        let { str } = e
        if(counter === 0) {
            if(regexArrayValidation(regex, str)){
                loanObject[type] = str
                data.counter += 1
            }
        }
        else if(counter === table_legth){
            if(!!regexArrayValidation(loanTable[0].regex, str) || (index + 1) === length || regexArrayValidation(next_page_regex, str)) {
                const newContract = Object.assign({}, loanObject)
                pageObject[typeArray].push(newContract)
                data.counter = 0
                return handleLoanTable(data)
            }
        }
        else if(counter >= 1){
            next_text_validation(data, regex, str, type, fixed)
        }
    } catch(err) {
        console.error(err)
    }
    return data.counter
}
const createContractTable = (filtered, pageObject) => {
    let active = false
    let type = false
    let counter = 0
    let loanObject = {}
    let length = filtered.length
    for (let index = 0; index < filtered.length; index++) {
        const e = filtered[index]
        const string = e.str
        if(["CONTRATOS ATIVOS E SUSPENSOS*"].includes(string)) active = true
        if(["EMPRÉSTIMOS BANCÁRIOS"].includes(string)) type = "EMPRESTIMOS"
        if(["CARTÃO DE CRÉDITO - RMC"].includes(string)) type = "CARTAO_RMC"
        if(["CARTÃO DE CRÉDITO - RCC"].includes(string)) type = "CARTAO_RCC"
        if(["DESCONTOS DE CARTÃO", "CONTRATOS EXCLUÍDOS E ENCERRADOS"].includes(string)) active = false
        if(["*Contratos que comprometem a margem consignável."].includes(string)){length = index + 1}
        const tableData = {e, index, length, counter, loanObject, pageObject, loanTable: loanKeys, typeArray: type}
        if(type === "EMPRESTIMOS" && active) {
            // console.log(e.str, index, length, counter)
            counter = handleLoanTable(tableData)
        } else if(type && active){
            // console.log(e.str, index, length, counter)
            tableData.loanTable = cardKeys
            counter = handleLoanTable(tableData)
        } 
    }
}
const handlePage = (objects, page, pageObject) => {
    const filtered = objects.filter((e) => e.str && e.str !== " ")
    if(page === 0){ filtered?.map((e, i, alle) => {
        createPage2(i, e.str, pageObject, alle)
    })
    } else {
        const joinedStrings = joiningStrings(filtered)
        createContractTable(joinedStrings.filter((e) => e.str), pageObject)
    }
}

export { handlePage }