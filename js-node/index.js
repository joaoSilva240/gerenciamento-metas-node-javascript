const {select,input,checkbox}=require('@inquirer/prompts')

let meta ={
    value:"dormir cedo",
    checked:false,
}
let metas=[meta]

const cadastrarMeta=async()=>{
    const meta=await input({message:"digite a meta"})

    if(meta.length==0){
        console.log('a meta nao pode ser vazia.')
        return 
    }
    metas.push(
        {value:meta, checked:false}

    )
}
const listarMetas=async ()=>{
    const respostas=await checkbox({
        message:"use as setas para mudar de meta, o espaço para selecionar e o emter para finalizar a etapa",
        choices: [...metas],
        instructions:false

    })
    metas.forEach((m)=>{
        m.checked=false
    })

    if(respostas.length==0){
        console.log('nenhuma meta selecionada')
        return
    }

   
    
    respostas.forEach((resposta)=>{
        const meta=metas.find((m)=>{return m.value==resposta})
        meta.checked=true
    })
    console.log('metas concluidas')
}
const mostrarRealizadas=async()=>{
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length==0)
    return console.log("não ha metas realizadas")

    await select({
        message:"realizadas",
        choices:[...realizadas]
    })
}
const metasAbertas=async()=>{
    const abertas=metas.filter((m)=>{
        return meta.checked !=true
    })

    if(abertas.length==0){
        return console.log("não existem metas abertas!")
    }
    await select({
        message:"total de metas abertas:"+ metas.length,
        choices:[...abertas]
    })
}

const start =async()=>{
    while(true){
        const opcao= await select({
            message:"Menu >",
            choices:[
                {
                    name:"cadastrar meta",
                    value:"cadastrar"
                },
                {
                    name:"vamos listar",
                    value:"listar"
                },
                {
                    name:"metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"metas abertas",
                    value:"abertas"
                },
                
                {
                    name:"sair",
                    value:"sair"
                }

            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await mostrarRealizadas()
                break
            case "abertas":
                await mostrarAbertas()
                break
            case "sair":
                console.log("tchau")
                return
        }
    }
}
start()