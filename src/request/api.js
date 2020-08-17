import {get,post} from './http'

export const aiAddress = p => get('/sys/questionnaire/getTitleInfo',p)
export const Questionnaireinfo = p => post('/sys/questionnaire/getQuestionnaireInfo',p)