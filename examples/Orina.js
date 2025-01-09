import mongoose from "mongoose";

const {Schema,model} = mongoose;

const cristales = new Schema({
    nombre: String,
    valor: String
})

const cFisica = new Schema({
    color: {type: String, default: ""},
    ph: {type: String, default : ""},
    aspecto: {type: String, default: ""},
    densidad: {type: String, default: ""}
})

const cQuimica = new Schema({
    proteinas: {type: String, default: ""},
    qleucocitos: {type: String, default: ""},
    glucosa: {type: String, default: ""},
    hb: {type: String, default: ""},
    bilirrubina: {type: String, default: ""},
    nitritos: {type: String, default: ""},
    urobilinogeno: {type: String, default: ""},
    cetona: {type: String, default: ""},
    pig_biliares: {type: String, default: ""}
})

const micro = new Schema({
    hematies: {type: String, default: ""},
    mleucocitos: {type: String, default: ""},
    celulas_epiteliales: {type: String, default: ""},
    trichomona_vaginalis: {type: String, default: ""},
    bacterias: {type: String, default: ""},
    piocitos: {type: String, default: ""},
    blastoconidias: {type: String, default: ""},
    fmucina: {type: String, default: ""},
    cristales: cristales,
    celulas_redondas: {type: String, default: ""},
    espermatozoides: {type: String, default: ""},
    blastosporas: {type: String, default: ""},
    levaduras: {type: String, default: ""},
    


})

const orinaSchema = new Schema({

    cFisica: {type: cFisica, default: ()=>({})},
    cQuimica: {type: cQuimica, default: ()=>({})},
    micro: {type: micro, default: ()=>({})},
    nota: {type: String, default: ""}

})

export default model("Orinas", orinaSchema);